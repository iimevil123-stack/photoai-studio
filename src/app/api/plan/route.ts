import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { callAI } from "@/lib/ai/client"
import { PlanResponseSchema } from "@/lib/ai/types"
import { PLAN_SYSTEM_PROMPT } from "@/lib/ai/prompts/plan"

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
    const { theme, scene, subjectType, style } = body

    if (!theme || !scene) {
      return NextResponse.json(
        { error: { code: "MISSING_FIELDS", message: "请填写主题和场景" } },
        { status: 400 }
      )
    }

    const aiResult = await callAI({
      schema: PlanResponseSchema,
      systemPrompt: `${PLAN_SYSTEM_PROMPT}\n\n用户输入：\n- 主题：${theme}\n- 场景：${scene}\n${subjectType ? `- 拍摄对象：${subjectType}\n` : ""}${style ? `- 风格：${style}` : ""}`,
      mockType: "plan",
      mockInput: { theme, scene, subjectType, style },
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
    await adminDb.from("shooting_plans").insert({
      user_id: user.id,
      theme,
      scene,
      subject_type: subjectType || null,
      style: style || null,
      plan_data: aiResult.data,
      ai_model: aiResult.model,
      ai_provider: aiResult.provider,
      token_usage: aiResult.tokenUsage,
    })

    return NextResponse.json({ plan: aiResult.data })
  } catch (error) {
    console.error("Plan generation error:", error)
    return NextResponse.json(
      { error: { code: "PLAN_FAILED", message: "策划生成失败，请稍后重试" } },
      { status: 500 }
    )
  }
}
