import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenAI } from "@ai-sdk/openai"
import { generateObject } from "ai"
import type { ZodSchema } from "zod"
import { AI_MODEL_PRIMARY, AI_MODEL_FALLBACK } from "@/lib/constants"

// ============================================================
// AI Client Factory - Claude primary, GPT-4o fallback
// Mock mode: auto-enabled when no API keys configured
// ============================================================

const HAS_ANTHROPIC_KEY = !!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.startsWith("your_")
const HAS_OPENAI_KEY = !!process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith("your_")

console.log(`[AI] Anthropic: ${HAS_ANTHROPIC_KEY ? "✅" : "❌"} | OpenAI: ${HAS_OPENAI_KEY ? "✅" : "❌"} | Mode: ${HAS_ANTHROPIC_KEY || HAS_OPENAI_KEY ? "REAL" : "MOCK"}`)

let anthropicClient: ReturnType<typeof createAnthropic> | null = null
let openaiClient: ReturnType<typeof createOpenAI> | null = null

if (HAS_ANTHROPIC_KEY) {
  anthropicClient = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}
if (HAS_OPENAI_KEY) {
  openaiClient = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

interface AICallOptions {
  schema: ZodSchema
  systemPrompt: string
  imageUrls?: string[]
  temperature?: number
  mockType?: "analyze" | "plan" | "assist" | "postprocess" | "portfolio"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockInput?: any
}

interface AISuccessResult {
  success: true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  model: string
  provider: string
  tokenUsage: { promptTokens: number; completionTokens: number } | null
  processingTimeMs: number
}

interface AIErrorResult {
  success: false
  error: string
}

export type AIResult = AISuccessResult | AIErrorResult

function buildUserContent(
  imageUrls?: string[]
): Array<{ type: "text"; text: string } | { type: "image"; image: URL }> {
  const parts: Array<{ type: "text"; text: string } | { type: "image"; image: URL }> = [
    { type: "text", text: "请按照要求分析并返回JSON格式的结果。" },
  ]
  if (imageUrls && imageUrls.length > 0) {
    for (const url of imageUrls) {
      parts.push({ type: "image", image: new URL(url) })
    }
  }
  return parts
}

async function tryGenerate(
  provider: "anthropic" | "openai",
  modelId: string,
  schema: ZodSchema,
  systemPrompt: string,
  userContent: ReturnType<typeof buildUserContent>,
  temperature: number
): Promise<AISuccessResult> {
  const client = provider === "anthropic" ? anthropicClient! : openaiClient!

  const startTime = Date.now()
  const result = await generateObject({
    model: client(modelId),
    schema,
    system: systemPrompt,
    messages: [{ role: "user" as const, content: userContent }],
    temperature,
    maxOutputTokens: 4096,
  })

  return {
    success: true,
    data: result.object,
    model: modelId,
    provider,
    tokenUsage: result.usage
      ? { promptTokens: result.usage.inputTokens ?? 0, completionTokens: result.usage.outputTokens ?? 0 }
      : null,
    processingTimeMs: Date.now() - startTime,
  }
}

export async function callAI(options: AICallOptions): Promise<AIResult> {
  const { schema, systemPrompt, imageUrls, temperature = 0.4, mockType, mockInput } = options

  // --- Mock mode: no real API keys configured ---
  if (!HAS_ANTHROPIC_KEY && !HAS_OPENAI_KEY) {
    return callMock(mockType, mockInput)
  }

  // --- Real mode ---
  const userContent = buildUserContent(imageUrls)

  // Try primary: Claude
  if (HAS_ANTHROPIC_KEY) {
    try {
      return await tryGenerate("anthropic", AI_MODEL_PRIMARY, schema, systemPrompt, userContent, temperature)
    } catch (e) {
      console.error("Primary AI (Claude) failed:", e)
    }
  }

  // Try fallback: GPT-4o
  if (HAS_OPENAI_KEY) {
    try {
      return await tryGenerate("openai", AI_MODEL_FALLBACK, schema, systemPrompt, userContent, temperature)
    } catch (e) {
      console.error("Fallback AI (GPT-4o) also failed:", e)
    }
  }

  return { success: false, error: "AI服务暂时不可用，请稍后重试" }
}

// ---- Mock dispatcher ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callMock(mockType?: string, mockInput?: any): Promise<AIResult> {
  const { mockAnalyzePhoto, mockPlan, mockAssessEnvironment, mockPostProcess, mockPortfolio } =
    await import("./mock")

  let data: unknown
  switch (mockType) {
    case "analyze":
      data = await mockAnalyzePhoto()
      break
    case "plan":
      data = await mockPlan(mockInput || {})
      break
    case "assist":
      data = await mockAssessEnvironment()
      break
    case "postprocess":
      data = await mockPostProcess()
      break
    case "portfolio":
      data = await mockPortfolio()
      break
    default:
      data = await mockAnalyzePhoto()
  }

  return {
    success: true,
    data,
    model: "mock-demo",
    provider: "mock",
    tokenUsage: null,
    processingTimeMs: 1500,
  }
}
