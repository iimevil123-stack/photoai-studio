"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ImageUploadZone } from "@/components/shared/image-upload-zone"
import { ConditionDetector } from "@/components/assist/condition-detector"
import { AdjustmentPlans } from "@/components/assist/adjustment-plans"
import { ReportSkeleton } from "@/components/analyze/report-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Smartphone } from "lucide-react"
import type { AssistResponse } from "@/lib/ai/types"

export default function AssistPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [assessment, setAssessment] = useState<AssistResponse | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("上传失败")
      const data = await res.json()
      setImageUrl(data.url)
      toast.success("现场照片上传成功")
      await handleAnalyze(data.url)
    } catch {
      toast.error("上传失败，请重试")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true)
    setAssessment(null)
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "分析失败")
      }
      const data = await res.json()
      setAssessment(data.assessment)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "环境分析失败")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI 现场助手</h1>
        <p className="text-muted-foreground mt-1">
          上传当前拍摄环境照片，AI 检测光线和背景条件，提供实时调整方案
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Upload */}
        <div className="lg:col-span-3">
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border bg-muted/10">
              <img
                src={imageUrl}
                alt="现场环境"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>
          ) : (
            <ImageUploadZone onUpload={handleUpload} isUploading={isUploading} />
          )}
          {imageUrl && !isAnalyzing && (
            <div className="mt-4">
              <ImageUploadZone onUpload={handleUpload} isUploading={isUploading} />
            </div>
          )}
        </div>

        {/* Right: AI Analysis */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-6">
              {isAnalyzing ? (
                <ReportSkeleton />
              ) : assessment ? (
                <>
                  <ConditionDetector conditions={assessment.conditions} />
                  <Separator />
                  <AdjustmentPlans plans={assessment.plans} />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-muted-foreground">
                    上传现场环境照片
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI 将检测天气、光线和背景条件，并给出调整方案
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
