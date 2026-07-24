import { NextRequest, NextResponse } from "next/server"
import { getImageService, getVideoService } from "@/services/ai"
import type { SceneTemplateId } from "@/services/ai/types"

/**
 * POST /api/scene/generate
 * 模拟 AI 场景生成（当前使用 MockAIService）
 *
 * 请求体:
 * {
 *   templateId: "portrait" | "ecommerce" | ...,
 *   imageUrl: string,
 *   prompt: string,
 *   mode: "image" | "video",
 *   strength?: number,
 *   seed?: number
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      templateId,
      imageUrl,
      prompt,
      mode = "image",
      strength = 0.7,
      seed,
    } = body as {
      templateId: SceneTemplateId
      imageUrl: string
      prompt: string
      mode?: "image" | "video"
      strength?: number
      seed?: number
    }

    // 参数校验
    if (!templateId) {
      return NextResponse.json(
        { error: { code: "MISSING_TEMPLATE", message: "请选择场景模板" } },
        { status: 400 }
      )
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: { code: "MISSING_IMAGE", message: "请上传图片" } },
        { status: 400 }
      )
    }

    if (!prompt.trim()) {
      return NextResponse.json(
        { error: { code: "MISSING_PROMPT", message: "请输入提示词" } },
        { status: 400 }
      )
    }

    // 选择服务
    if (mode === "video") {
      const service = getVideoService()
      const result = await service.generateVideo({
        templateId,
        imageUrl,
        prompt,
        duration: 5,
        motionType: "parallax",
      })

      return NextResponse.json({ result })
    }

    // 默认：图片生成
    const service = getImageService()
    const result = await service.generateImage({
      templateId,
      imageUrl,
      prompt,
      strength,
      seed,
    })

    return NextResponse.json({ result })
  } catch (error) {
    console.error("[Scene Generate] Error:", error)
    return NextResponse.json(
      {
        error: {
          code: "GENERATION_FAILED",
          message: "场景生成失败，请稍后重试",
        },
      },
      { status: 500 }
    )
  }
}
