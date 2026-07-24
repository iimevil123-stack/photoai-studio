import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { createAdminClient } from "@/lib/supabase/admin"
import { callAI } from "@/lib/ai/client"
import { PortfolioResponseSchema } from "@/lib/ai/types"
import { PORTFOLIO_SYSTEM_PROMPT } from "@/lib/ai/prompts/portfolio"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return request.cookies.getAll() }, setAll() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "请先登录" } }, { status: 401 })
    }

    const body = await request.json()
    const { imageUrls, portfolioId } = body

    if (!imageUrls || imageUrls.length === 0) {
      return NextResponse.json({ error: { code: "NO_IMAGES", message: "请选择至少一张照片" } }, { status: 400 })
    }

    const aiResult = await callAI({
      schema: PortfolioResponseSchema,
      systemPrompt: `${PORTFOLIO_SYSTEM_PROMPT}\n\n共有${imageUrls.length}张照片需要分析。`,
      imageUrls,
      mockType: "portfolio",
      mockInput: { imageCount: imageUrls.length },
    })

    if (!aiResult.success) {
      return NextResponse.json({ error: { code: "AI_FAILED", message: aiResult.error } }, { status: 503 })
    }

    // Save to portfolio
    if (portfolioId) {
      const adminDb = createAdminClient()
      const siteSlug = `portfolio-${user.id.slice(0, 8)}-${Date.now()}`
      await adminDb
        .from("portfolios")
        .update({
          style_analysis: {
            detectedStyle: aiResult.data.detectedStyle,
            colorPalette: aiResult.data.colorPalette,
            saturationLevel: aiResult.data.saturationLevel,
            keywords: aiResult.data.keywords,
          },
          template_id: aiResult.data.templateRecommendation,
          site_slug: siteSlug,
          site_config: aiResult.data.siteData,
        })
        .eq("id", portfolioId)
        .eq("user_id", user.id)
    }

    return NextResponse.json({ result: aiResult.data })
  } catch (error) {
    console.error("Portfolio generation error:", error)
    return NextResponse.json(
      { error: { code: "PORTFOLIO_FAILED", message: "作品集生成失败" } },
      { status: 500 }
    )
  }
}
