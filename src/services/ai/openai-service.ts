// ============================================================
// OpenAIService — 未来 OpenAI 接入桩
// 当前仅为骨架，待 API Key 就绪后实现
// ============================================================

import { BaseAIService, type ProgressCallback } from "./base"
import type {
  GenerateImageInput,
  GenerateVideoInput,
  GenerateResult,
  ModelInfo,
} from "./types"

export class OpenAIService extends BaseAIService {
  readonly name = "OpenAI"
  readonly provider = "openai"

  async generateImage(
    input: GenerateImageInput,
    _onProgress?: ProgressCallback
  ): Promise<GenerateResult> {
    void input; void _onProgress
    throw new Error("OpenAIService.generateImage() not implemented yet")
  }

  async generateVideo(
    input: GenerateVideoInput,
    _onProgress?: ProgressCallback
  ): Promise<GenerateResult> {
    void input; void _onProgress
    throw new Error("OpenAIService.generateVideo() not implemented yet")
  }

  getAvailableModels(): ModelInfo[] {
    return [
      {
        id: "openai-dalle-3",
        name: "DALL·E 3",
        provider: "openai",
        type: "image",
        description: "OpenAI 最新图像生成模型",
        available: true,
      },
    ]
  }

  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${this.config.apiKey}` },
      })
      return res.ok
    } catch {
      return false
    }
  }
}
