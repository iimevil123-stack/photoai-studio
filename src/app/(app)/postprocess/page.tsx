"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ImageUploadZone } from "@/components/shared/image-upload-zone"
import { AdjustmentSliders } from "@/components/postprocess/adjustment-sliders"
import { GuideResult } from "@/components/postprocess/guide-result"
import { ReportSkeleton } from "@/components/analyze/report-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Palette } from "lucide-react"
import type { PostProcessResponse } from "@/lib/ai/types"

export default function PostProcessPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [guide, setGuide] = useState<PostProcessResponse | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("上传失败")
      const data = await res.json()
      setImageUrl(data.url)
      toast.success("图片上传成功")
      await handleAnalyze(data.url)
    } catch {
      toast.error("上传失败，请重试")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true)
    setGuide(null)
    try {
      const res = await fetch("/api/postprocess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "分析失败")
      }
      const data = await res.json()
      setGuide(data.guide)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "后期分析失败")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI 后期指导</h1>
        <p className="text-muted-foreground mt-1">
          上传照片，AI 分析并提供精确的后期修图参数建议
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border bg-muted/10">
              <img
                src={imageUrl}
                alt="待处理照片"
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

        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-6">
              {isAnalyzing ? (
                <ReportSkeleton />
              ) : guide ? (
                <>
                  <AdjustmentSliders adjustments={guide.adjustments} />
                  <Separator />
                  <GuideResult guideText={guide.guideText} />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-muted-foreground">
                    上传照片获取后期建议
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI 将给出曝光、对比度、色温等7项参数调整建议
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
