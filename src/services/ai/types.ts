// ============================================================
// AI Service Layer — 统一 AI 服务接口类型
// 设计目标：未来替换为 OpenAI / Claude / Stable Diffusion
// 当前使用 MockAIService
// ============================================================

// ---- 场景生成 ----

export type SceneTemplateId =
  | "portrait"
  | "ecommerce"
  | "landscape"
  | "anime"
  | "cinematic"
  | "poster"
  | "social"

export interface GenerateImageInput {
  templateId: SceneTemplateId
  imageUrl: string          // 用户上传的原始图片
  prompt: string            // 用户输入的提示词
  negativePrompt?: string   // 负面提示词
  strength?: number         // AI 创作强度 0-1
  seed?: number             // 随机种子（可复现）
  width?: number
  height?: number
}

export interface GenerateVideoInput {
  templateId: SceneTemplateId
  imageUrl: string
  prompt: string
  duration?: number         // 视频时长（秒）
  motionType?: "zoom" | "pan" | "parallax" | "depth"
  fps?: number
}

export interface GenerationStep {
  id: string
  label: string             // 中文步骤描述
  icon: string              // lucide icon name
  durationMs: number        // 该步骤模拟耗时
}

export interface GenerateResult {
  id: string
  status: "completed" | "failed"
  outputImageUrl: string    // 生成结果图（目前用原图+效果模拟）
  steps: GenerationStep[]
  totalDurationMs: number
  metadata: {
    templateId: SceneTemplateId
    prompt: string
    seed: number
    createdAt: string
  }
}

export interface GenerateProgress {
  stepId: string
  stepIndex: number
  totalSteps: number
  percent: number           // 0-100
  message: string
}

// ---- 模型信息 ----

export interface ModelInfo {
  id: string
  name: string
  provider: "openai" | "anthropic" | "stability" | "runway" | "mock"
  type: "image" | "video" | "multimodal"
  description: string
  available: boolean
}

// ---- Service 配置 ----

export interface AIServiceConfig {
  apiKey?: string
  baseUrl?: string
  timeoutMs?: number
  maxRetries?: number
}
