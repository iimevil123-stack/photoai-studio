"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CompareSlider } from "./compare-slider"
import { ImageReveal } from "./effects/image-reveal"
import { LightScan } from "./effects/light-scan"
import { ParticleBurst } from "./effects/particle-burst"
import { KenBurns } from "./effects/ken-burns"
import {
  Download,
  ImageIcon,
  Video,
  SlidersHorizontal,
  RefreshCw,
  Maximize2,
} from "lucide-react"
import type { GenerateResult } from "@/services/ai/types"

type ViewMode = "compare" | "single" | "video"

interface Props {
  result: GenerateResult
  originalImageUrl: string
  onRegenerate: () => void
  mode: "image" | "video"
}

export function ResultViewer({ result, originalImageUrl, onRegenerate, mode }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>(mode === "video" ? "video" : "single")
  const [showParticles, setShowParticles] = useState(true)

  return (
    <div className="space-y-4">
      {/* Result Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">生成结果</h3>
          <Badge variant="secondary" className="gap-1">
            <RefreshCw className="h-3 w-3" />
            Seed: {result.metadata.seed}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            {result.totalDurationMs < 1000
              ? `${result.totalDurationMs}ms`
              : `${(result.totalDurationMs / 1000).toFixed(1)}s`}
          </Badge>
        </div>

        {/* View mode toggles */}
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          <Button
            variant={viewMode === "single" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setViewMode("single")}
          >
            <ImageIcon className="h-3.5 w-3.5 mr-1" />
            单图
          </Button>
          <Button
            variant={viewMode === "compare" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setViewMode("compare")}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
            对比
          </Button>
          <Button
            variant={viewMode === "video" ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setViewMode("video")}
          >
            <Video className="h-3.5 w-3.5 mr-1" />
            动态
          </Button>
        </div>
      </div>

      {/* Result Display */}
      <div className="relative">
        {viewMode === "single" && (
          <div className="relative rounded-xl overflow-hidden border bg-muted/5">
            {showParticles && (
              <ParticleBurst
                onComplete={() => setShowParticles(false)}
              />
            )}
            <ImageReveal>
              <img
                src={result.outputImageUrl}
                alt="AI 生成结果"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </ImageReveal>
            <LightScan />
          </div>
        )}

        {viewMode === "compare" && (
          <CompareSlider
            beforeImage={originalImageUrl}
            afterImage={result.outputImageUrl}
            beforeLabel="原图"
            afterLabel="AI 生成"
          />
        )}

        {viewMode === "video" && (
          <div className="rounded-xl overflow-hidden border bg-black">
            <KenBurns imageUrl={result.outputImageUrl} />
            {/* Video overlay UI */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-white/80 font-medium">动态效果预览</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-white">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-center">
        <Button variant="outline" onClick={onRegenerate} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          重新生成
        </Button>
        <Button variant="outline" className="gap-2" disabled>
          <Download className="h-4 w-4" />
          下载（演示版暂不可用）
        </Button>
      </div>

      {/* Metadata Card */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-muted-foreground">场景模板</span>
              <p className="font-medium mt-0.5">{result.metadata.templateId}</p>
            </div>
            <div>
              <span className="text-muted-foreground">生成时间</span>
              <p className="font-medium mt-0.5">
                {new Date(result.metadata.createdAt).toLocaleString("zh-CN")}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">提示词</span>
              <p className="font-medium mt-0.5">{result.metadata.prompt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
