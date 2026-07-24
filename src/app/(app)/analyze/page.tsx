"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ImageUploadZone } from "@/components/shared/image-upload-zone"
import { ScoreDisplay } from "@/components/analyze/score-display"
import { TechnicalAnalysis } from "@/components/analyze/technical-analysis"
import { CompositionAnalysis } from "@/components/analyze/composition-analysis"
import { ImprovementSuggestions } from "@/components/analyze/improvement-suggestions"
import { ReportSkeleton } from "@/components/analyze/report-skeleton"
import { RegisterPrompt } from "@/components/analyze/register-prompt"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { AnalyzeResponse } from "@/types"
import { ImageIcon } from "lucide-react"

export default function AnalyzePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState<AnalyzeResponse["report"] | null>(null)
  const [isPartial, setIsPartial] = useState(false)
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "上传失败")
      }

      const data = await res.json()
      setImageUrl(data.url)
      toast.success("图片上传成功")

      // Start analysis
      await handleAnalyze(data.url)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "上传失败")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true)
    setReport(null)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "分析失败")
      }

      const data = await res.json()
      setReport(data.report)
      setIsPartial(data.isPartial)

      if (data.isPartial) {
        setShowRegisterPrompt(true)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI分析失败，请稍后重试")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">AI 照片分析</h1>
        <p className="text-muted-foreground mt-1">
          上传照片，AI 为你提供专业摄影评分和多维度分析报告
        </p>
      </div>

      <Separator />

      {/* Main Content: Photo + Report */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Photo */}
        <div className="lg:col-span-3">
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border bg-muted/10">
              <img
                src={imageUrl}
                alt="待分析照片"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>
          ) : (
            <ImageUploadZone onUpload={handleUpload} isUploading={isUploading} />
          )}

          {/* Re-upload button when photo exists */}
          {imageUrl && !isAnalyzing && (
            <div className="mt-4">
              <ImageUploadZone onUpload={handleUpload} isUploading={isUploading} />
            </div>
          )}
        </div>

        {/* Right: AI Report */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-6">
              {isAnalyzing ? (
                <ReportSkeleton />
              ) : report ? (
                <>
                  {/* Score */}
                  {report.overallScore != null && (
                    <ScoreDisplay score={report.overallScore} />
                  )}

                  <Separator />

                  {/* Technical Analysis */}
                  {"technicalAnalysis" in report && (
                    <TechnicalAnalysis data={report.technicalAnalysis} />
                  )}

                  <Separator />

                  {/* Full report sections (registered users only) */}
                  {isPartial && showRegisterPrompt ? (
                    <RegisterPrompt onDismiss={() => setShowRegisterPrompt(false)} />
                  ) : (
                    <>
                      {"compositionAnalysis" in report && (
                        <>
                          <CompositionAnalysis
                            data={report.compositionAnalysis}
                          />
                          <Separator />
                        </>
                      )}
                      {"suggestions" in report && (
                        <ImprovementSuggestions
                          suggestions={report.suggestions}
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                /* Empty state */
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-muted-foreground">
                    上传一张照片开始分析
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI 将为你提供综合评分、技术分析和提升建议
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
