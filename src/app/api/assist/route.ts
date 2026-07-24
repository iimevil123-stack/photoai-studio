import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { callAI } from "@/lib/ai/client"
import { AssistResponseSchema } from "@/lib/ai/types"
import { ASSIST_SYSTEM_PROMPT } from "@/lib/ai/prompts/assist"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "请先登录" } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { imageUrl, imageId } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: { code: "NO_IMAGE", message: "请上传现场照片" } },
        { status: 400 }
      )
    }

    const aiResult = await callAI({
      schema: AssistResponseSchema,
      systemPrompt: ASSIST_SYSTEM_PROMPT,
      imageUrls: [imageUrl],
      mockType: "assist",
    })

    if (!aiResult.success) {
      return NextResponse.json(
        { error: { code: "AI_FAILED", message: aiResult.error } },
        { status: 503 }
      )
    }

    // Save to DB
    const { createAdminClient } = await import("@/lib/supabase/admin")
    const adminDb = createAdminClient()
    await adminDb.from("on_site_assessments").insert({
      user_id: user.id,
      image_id: imageId || null,
      conditions: aiResult.data.conditions,
      plans: aiResult.data.plans,
      ai_model: aiResult.model,
      ai_provider: aiResult.provider,
      token_usage: aiResult.tokenUsage,
    })

    return NextResponse.json({ assessment: aiResult.data })
  } catch (error) {
    console.error("Assist error:", error)
    return NextResponse.json(
      { error: { code: "ASSIST_FAILED", message: "环境分析失败，请稍后重试" } },
      { status: 500 }
    )
  }
}
