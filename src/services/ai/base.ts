// ============================================================
// BaseAIService — AI 服务抽象基类
// 所有 AI 服务（Mock / OpenAI / Claude / SD）均继承此类
// 确保接口一致，方便未来替换
// ============================================================

import type {
  GenerateImageInput,
  GenerateVideoInput,
  GenerateResult,
  GenerateProgress,
  ModelInfo,
  AIServiceConfig,
} from "./types"

export type ProgressCallback = (progress: GenerateProgress) => void

export abstract class BaseAIService {
  protected config: AIServiceConfig

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      timeoutMs: 60000,
      maxRetries: 2,
      ...config,
    }
  }

  /** 服务名称 */
  abstract readonly name: string
  /** 服务提供商 */
  abstract readonly provider: string

  /**
   * 图片生成 — 根据场景模板和提示词生成新图片
   * @param input 生成输入参数
   * @param onProgress 进度回调
   */
  abstract generateImage(
    input: GenerateImageInput,
    onProgress?: ProgressCallback
  ): Promise<GenerateResult>

  /**
   * 视频生成 — 基于图片生成动态视频效果
   * @param input 视频生成参数
   * @param onProgress 进度回调
   */
  abstract generateVideo(
    input: GenerateVideoInput,
    onProgress?: ProgressCallback
  ): Promise<GenerateResult>

  /**
   * 获取可用模型列表
   */
  abstract getAvailableModels(): ModelInfo[]

  /**
   * 健康检查 — 服务是否可用
   */
  abstract healthCheck(): Promise<boolean>
}
