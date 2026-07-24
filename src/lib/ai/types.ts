import { z } from "zod"

// ---- AI Analysis Response Schemas ----

export const TechnicalDimensionSchema = z.object({
  score: z.number().min(1).max(5),
  label: z.string(),
  comment: z.string(),
})

export const TechnicalAnalysisSchema = z.object({
  clarity: TechnicalDimensionSchema,
  exposure: TechnicalDimensionSchema,
  color: TechnicalDimensionSchema,
})

export const CompositionAnalysisSchema = z.object({
  strengths: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()),
})

export const SuggestionSchema = z.object({
  priority: z.number().min(1),
  title: z.string(),
  detail: z.string(),
})

export const AnalyzeResponseSchema = z.object({
  overallScore: z.number().min(0).max(100),
  technicalAnalysis: TechnicalAnalysisSchema,
  compositionAnalysis: CompositionAnalysisSchema,
  suggestions: z.array(SuggestionSchema).min(1),
})

export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>

// ---- Shooting Plan Schema ----
export const PlanResponseSchema = z.object({
  outfitSuggestions: z.array(z.string()).min(1),
  poseSuggestions: z.array(z.string()).min(1),
  lensRecommendations: z.array(z.string()).min(1),
  cameraSettings: z.record(z.string(), z.string()),
  lightingTips: z.array(z.string()).min(1),
})

export type PlanResponse = z.infer<typeof PlanResponseSchema>

// ---- On-Site Assessment Schema ----
export const ConditionsSchema = z.object({
  weather: z.string(),
  lighting: z.string(),
  backgroundQuality: z.string(),
  colorTemperature: z.number(),
})

export const AdjustmentPlanSchema = z.object({
  planLabel: z.string(),
  title: z.string(),
  actions: z.array(z.string()),
  poseAdjustment: z.string(),
})

export const AssistResponseSchema = z.object({
  conditions: ConditionsSchema,
  plans: z.array(AdjustmentPlanSchema).min(1),
})

export type AssistResponse = z.infer<typeof AssistResponseSchema>

// ---- Post-Process Guide Schema ----
export const PostProcessResponseSchema = z.object({
  adjustments: z.object({
    exposure: z.number(),
    shadows: z.number(),
    colorTemperature: z.number(),
    contrast: z.number(),
    highlights: z.number(),
    saturation: z.number(),
    vibrance: z.number(),
  }),
  guideText: z.string(),
})

export type PostProcessResponse = z.infer<typeof PostProcessResponseSchema>

// ---- Portfolio Generator Schema ----
export const PortfolioResponseSchema = z.object({
  detectedStyle: z.string(),
  colorPalette: z.array(z.string()).min(2),
  saturationLevel: z.string(),
  keywords: z.array(z.string()).min(2),
  templateRecommendation: z.enum(["A", "B", "C"]),
  siteData: z.object({
    title: z.string(),
    subtitle: z.string(),
    bio: z.string(),
    sections: z.array(
      z.object({
        title: z.string(),
        imageIndices: z.array(z.number()),
      })
    ),
  }),
})

export type PortfolioResponse = z.infer<typeof PortfolioResponseSchema>
