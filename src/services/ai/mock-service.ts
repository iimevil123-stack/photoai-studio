// ============================================================
// MockAIService — 模拟 AI 服务
// 不调用任何外部 API，所有生成过程均为模拟
// 提供完整的进度回调和结果数据，用于产品演示
// ============================================================

import { BaseAIService, type ProgressCallback } from "./base"
import type {
  GenerateImageInput,
  GenerateVideoInput,
  GenerateResult,
  GenerationStep,
  ModelInfo,
} from "./types"

// ---- 模拟生成步骤模板 ----

const IMAGE_GENERATION_STEPS: GenerationStep[] = [
  { id: "analyzing", label: "正在分析图片内容...", icon: "Scan", durationMs: 1800 },
  { id: "matching", label: "正在匹配场景风格...", icon: "Palette", durationMs: 1500 },
  { id: "generating", label: "正在生成场景画面...", icon: "Wand2", durationMs: 2200 },
  { id: "refining", label: "正在优化细节表现...", icon: "Sparkles", durationMs: 1800 },
  { id: "rendering", label: "正在渲染高清效果...", icon: "Image", durationMs: 1500 },
  { id: "finalizing", label: "正在完成最终处理...", icon: "CheckCircle2", durationMs: 800 },
]

const VIDEO_GENERATION_STEPS: GenerationStep[] = [
  { id: "analyzing", label: "正在分析画面内容...", icon: "Scan", durationMs: 2000 },
  { id: "motion", label: "正在计算运动轨迹...", icon: "Move", durationMs: 2500 },
  { id: "depth", label: "正在生成深度图...", icon: "Layers", durationMs: 3000 },
  { id: "frames", label: "正在渲染视频帧...", icon: "Film", durationMs: 4000 },
  { id: "encoding", label: "正在编码输出视频...", icon: "Video", durationMs: 2500 },
]

// ---- 模拟可用模型 ----

const MOCK_MODELS: ModelInfo[] = [
  {
    id: "mock-scene-v1",
    name: "PhotoAI Scene Engine v1",
    provider: "mock",
    type: "image",
    description: "基于场景模板的AI图片生成引擎（演示版）",
    available: true,
  },
  {
    id: "mock-video-v1",
    name: "PhotoAI Motion Engine v1",
    provider: "mock",
    type: "video",
    description: "图片转动态视频AI引擎（演示版）",
    available: true,
  },
  {
    id: "openai-dalle-3",
    name: "DALL·E 3",
    provider: "openai",
    type: "image",
    description: "OpenAI 最新图像生成模型（待接入）",
    available: false,
  },
  {
    id: "stability-sd3",
    name: "Stable Diffusion 3",
    provider: "stability",
    type: "image",
    description: "Stability AI 最新图像生成模型（待接入）",
    available: false,
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    provider: "runway",
    type: "video",
    description: "Runway 最新视频生成模型（待接入）",
    available: false,
  },
]

export class MockAIService extends BaseAIService {
  readonly name = "PhotoAI Mock Engine"
  readonly provider = "mock"

  private uid(): string {
    return `gen_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms + Math.random() * ms * 0.3))
  }

  /**
   * 模拟图片生成流程
   */
  async generateImage(
    input: GenerateImageInput,
    onProgress?: ProgressCallback
  ): Promise<GenerateResult> {
    const steps = [...IMAGE_GENERATION_STEPS]
    const startTime = Date.now()

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      // 回调进度
      if (onProgress) {
        onProgress({
          stepId: step.id,
          stepIndex: i,
          totalSteps: steps.length,
          percent: Math.round(((i + 1) / steps.length) * 100),
          message: step.label,
        })
      }

      await this.delay(step.durationMs)
    }

    // Mock 结果：返回原图 URL（模拟"生成完成了"）
    // 在实际产品中体验的视觉效果由前端组件负责
    return {
      id: this.uid(),
      status: "completed",
      outputImageUrl: input.imageUrl,
      steps,
      totalDurationMs: Date.now() - startTime,
      metadata: {
        templateId: input.templateId,
        prompt: input.prompt,
        seed: input.seed ?? Math.floor(Math.random() * 999999),
        createdAt: new Date().toISOString(),
      },
    }
  }

  /**
   * 模拟视频生成流程 — 时间更长，步骤不同
   */
  async generateVideo(
    input: GenerateVideoInput,
    onProgress?: ProgressCallback
  ): Promise<GenerateResult> {
    const steps = [...VIDEO_GENERATION_STEPS]
    const totalMs = steps.reduce((sum, s) => sum + s.durationMs, 0)

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      if (onProgress) {
        onProgress({
          stepId: step.id,
          stepIndex: i,
          totalSteps: steps.length,
          percent: Math.round(((i + 1) / steps.length) * 100),
          message: step.label,
        })
      }

      await this.delay(step.durationMs)
    }

    return {
      id: this.uid(),
      status: "completed",
      outputImageUrl: input.imageUrl,
      steps,
      totalDurationMs: totalMs,
      metadata: {
        templateId: input.templateId,
        prompt: input.prompt,
        seed: Math.floor(Math.random() * 999999),
        createdAt: new Date().toISOString(),
      },
    }
  }

  getAvailableModels(): ModelInfo[] {
    return [...MOCK_MODELS]
  }

  async healthCheck(): Promise<boolean> {
    await this.delay(300)
    return true
  }
}
