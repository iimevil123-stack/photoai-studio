import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { callAI } from "@/lib/ai/client"
import { AnalyzeResponseSchema } from "@/lib/ai/types"
import { ANALYZE_SYSTEM_PROMPT } from "@/lib/ai/prompts/analyze"
import { createAdminClient } from "@/lib/supabase/admin"
// import { GUEST_MAX_ANALYSES } from "@/lib/constants"

export async function POST(request: NextRequest) {
  try {
    // Get user (optional)
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
    const isGuest = !user

    // Parse request
    const body = await request.json()
    const { imageUrl, imageId } = body as { imageUrl: string; imageId?: string }

    if (!imageUrl) {
      return NextResponse.json(
        { error: { code: "NO_IMAGE", message: "请提供图片URL" } },
        { status: 400 }
      )
    }

    // Check guest limits
    if (isGuest) {
      // Guests get partial report
      const aiResult = await callAI({
        schema: AnalyzeResponseSchema,
        systemPrompt: ANALYZE_SYSTEM_PROMPT,
        imageUrls: [imageUrl],
        mockType: "analyze",
      })

      if (!aiResult.success) {
        return NextResponse.json(
          { error: { code: "AI_FAILED", message: aiResult.error } },
          { status: 503 }
        )
      }

      // Return partial report (score + technical only, no composition or suggestions)
      return NextResponse.json({
        report: {
          overallScore: aiResult.data.overallScore,
          technicalAnalysis: aiResult.data.technicalAnalysis,
        },
        isPartial: true,
      })
    }

    // Registered user: full analysis
    const aiResult = await callAI({
      schema: AnalyzeResponseSchema,
      systemPrompt: ANALYZE_SYSTEM_PROMPT,
      imageUrls: [imageUrl],
      mockType: "analyze",
    })

    if (!aiResult.success) {
      return NextResponse.json(
        { error: { code: "AI_FAILED", message: aiResult.error } },
        { status: 503 }
      )
    }

    // Save to database (using admin client to bypass RLS)
    const adminDb = createAdminClient()

    // If imageId provided, update the image record
    if (imageId) {
      const { error: updateError } = await adminDb
        .from("images")
        .update({ is_analyzed: true })
        .eq("id", imageId)

      if (updateError) {
        console.error("Failed to update image:", updateError)
      }

      // Save AI report
      const { error: reportError } = await adminDb.from("ai_reports").insert({
        image_id: imageId,
        user_id: user.id,
        report_type: "analysis",
        overall_score: aiResult.data.overallScore,
        technical_analysis: aiResult.data.technicalAnalysis,
        composition_analysis: aiResult.data.compositionAnalysis,
        suggestions: aiResult.data.suggestions,
        raw_response: aiResult.data,
        ai_model: aiResult.model,
        ai_provider: aiResult.provider,
        token_usage: aiResult.tokenUsage,
        processing_time_ms: aiResult.processingTimeMs,
        is_partial: false,
      })

      if (reportError) {
        console.error("Failed to save report:", reportError)
      }
    }

    return NextResponse.json({
      report: aiResult.data,
      isPartial: false,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        error: {
          code: "ANALYSIS_FAILED",
          message: "AI分析失败，请稍后重试",
        },
      },
      { status: 500 }
    )
  }
}
