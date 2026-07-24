// ============================================================
// AI Service Registry — 自动选择可用的 AI 服务
// ============================================================

import { BaseAIService } from "./base"
import { MockAIService } from "./mock-service"
import { OpenAIService } from "./openai-service"
import type { AIServiceConfig } from "./types"

// ---- 检测 API Key 可用性 ----

const HAS_OPENAI_KEY =
  !!process.env.OPENAI_API_KEY &&
  !process.env.OPENAI_API_KEY.startsWith("your_")

const HAS_ANTHROPIC_KEY =
  !!process.env.ANTHROPIC_API_KEY &&
  !process.env.ANTHROPIC_API_KEY.startsWith("your_")

// ---- 服务实例（单例） ----

let _imageService: BaseAIService | null = null
let _videoService: BaseAIService | null = null

/**
 * 获取图片生成服务实例
 * 优先级：OpenAI > Mock
 */
export function getImageService(config?: AIServiceConfig): BaseAIService {
  if (!_imageService) {
    if (HAS_OPENAI_KEY) {
      console.log("[AI Service] 使用 OpenAI 图片生成服务")
      _imageService = new OpenAIService({
        apiKey: process.env.OPENAI_API_KEY,
        ...config,
      })
    } else {
      console.log("[AI Service] 使用 Mock 图片生成服务（演示模式）")
      _imageService = new MockAIService(config)
    }
  }
  return _imageService
}

/**
 * 获取视频生成服务实例
 * 优先级：未来 Runway > Mock
 */
export function getVideoService(config?: AIServiceConfig): BaseAIService {
  if (!_videoService) {
    console.log("[AI Service] 使用 Mock 视频生成服务（演示模式）")
    _videoService = new MockAIService(config)
  }
  return _videoService
}

/**
 * 获取所有可用模型
 */
export function getAvailableModels() {
  const services = [getImageService(), getVideoService()]
  return services.flatMap((s) => s.getAvailableModels())
}

export { BaseAIService, MockAIService, OpenAIService }
export type { ProgressCallback } from "./base"
export * from "./types"
