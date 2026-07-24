"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Palette } from "lucide-react"
import { ImageUploadZone } from "@/components/shared/image-upload-zone"
import type { PortfolioResponse } from "@/lib/ai/types"

interface PortfolioGeneratorProps {
  onGenerated: (result: PortfolioResponse) => void
}

export function PortfolioGenerator({ onGenerated }: PortfolioGeneratorProps) {
  const [name, setName] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("上传失败")
      const data = await res.json()
      setImageUrls((prev) => [...prev, data.url])
      toast.success(`已添加 ${imageUrls.length + 1} 张照片`)
    } catch {
      toast.error("上传失败")
    } finally {
      setIsUploading(false)
    }
  }

  const handleGenerate = async () => {
    if (imageUrls.length === 0) return
    setIsGenerating(true)
    try {
      // Create portfolio first
      const createRes = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "未命名作品集" }),
      })
      if (!createRes.ok) throw new Error("创建作品集失败")
      const { portfolio } = await createRes.json()

      // Generate AI analysis
      const genRes = await fetch("/api/portfolio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrls, portfolioId: portfolio.id }),
      })
      if (!genRes.ok) {
        const err = await genRes.json()
        throw new Error(err.error?.message || "生成失败")
      }
      const data = await genRes.json()
      onGenerated(data.result)
      toast.success("作品集生成成功！")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "生成失败")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left: Upload photos */}
      <div className="lg:col-span-3 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pname">作品集名称</Label>
          <Input
            id="pname"
            placeholder="例如：2024 年度精选"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <ImageUploadZone onUpload={handleUpload} isUploading={isUploading} />

        {/* Photo thumbnails */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border relative group">
                <img src={url} alt={`照片 ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => setImageUrls((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground">
              <span className="text-xs">{imageUrls.length} 张</span>
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || imageUrls.length === 0}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI正在分析风格...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              生成作品集 ({imageUrls.length} 张照片)
            </>
          )}
        </Button>
      </div>

      {/* Right: Instructions */}
      <div className="lg:col-span-2">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-500" />
              如何生成作品集
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. 给你的作品集起个名字</p>
            <p>2. 上传至少 5 张代表作品（建议 10-20 张）</p>
            <p>3. AI 会分析你的摄影风格和色彩偏好</p>
            <p>4. 自动推荐最适合的展示模板</p>
            <p>5. 生成一个可以在线展示的作品集网站</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
