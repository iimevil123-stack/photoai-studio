"use client"

import { Sparkles, Image, Wand2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { TemplateGrid } from "@/components/scene/template-grid"

export default function ScenePage() {
  return (
    <div className="space-y-6">
      {/* Page Header — 产品风格 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
            AI 场景创作
          </span>
        </div>
        <h1 className="text-3xl font-bold">选择场景，AI 为你创作</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          上传一张照片，选择场景模板，AI 自动分析并生成专业级视觉作品。
          每个场景支持多种风格，满足不同创作需求。
        </p>

        {/* 快速引导标签 */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <Image className="h-3 w-3" />
            上传照片
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <Wand2 className="h-3 w-3" />
            输入想法
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <Sparkles className="h-3 w-3" />
            AI 生成
          </span>
        </div>
      </div>

      <Separator />

      {/* Template Grid */}
      <TemplateGrid />
    </div>
  )
}
