"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { getSceneExamples, getSceneStyles } from "@/lib/scene/scene-examples"
import type { SceneTemplateId } from "@/services/ai/types"
import type { SceneStyleVariant } from "@/lib/images"
import { Image, Sparkles, Wand2 } from "lucide-react"

interface Props {
  templateId: SceneTemplateId
  /** 选择风格后回调，填入提示词 */
  onSelectStyle?: (suffix: string) => void
}

/**
 * 案例展示面板 — 用于侧边栏
 *
 * - 3 组 Before/After 缩略图（hover 放大）
 * - 3 种风格标签（点击填入提示词）
 * - 紧凑布局适配侧边栏
 */
export function CaseShowcase({ templateId, onSelectStyle }: Props) {
  const examples = getSceneExamples(templateId)
  const styles = getSceneStyles(templateId)
  const [activeTab, setActiveTab] = useState<"examples" | "styles">("examples")

  return (
    <div className="space-y-4">
      {/* 标签切换 */}
      <div className="flex bg-muted rounded-lg p-0.5">
        <button
          onClick={() => setActiveTab("examples")}
          className={cn(
            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5",
            activeTab === "examples"
              ? "bg-white dark:bg-gray-800 shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Image className="h-3.5 w-3.5" />
          案例
        </button>
        <button
          onClick={() => setActiveTab("styles")}
          className={cn(
            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5",
            activeTab === "styles"
              ? "bg-white dark:bg-gray-800 shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Wand2 className="h-3.5 w-3.5" />
          风格
        </button>
      </div>

      {/* 案例列表 */}
      {activeTab === "examples" && (
        <div className="space-y-3">
          {examples.map((example, i) => (
            <Card
              key={i}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex h-24">
                {/* Before */}
                <div className="w-1/2 relative overflow-hidden border-r">
                  <ImageWithFallback
                    src={example.before}
                    alt="原始照片"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-1 left-1 text-[9px] bg-black/60 text-white/70 px-1.5 py-0.5 rounded">
                    原图
                  </span>
                </div>
                {/* After */}
                <div className="w-1/2 relative overflow-hidden">
                  <ImageWithFallback
                    src={example.after}
                    alt="AI效果"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(1.1) contrast(1.05) saturate(1.15)" }}
                  />
                  <span className="absolute top-1 right-1 text-[9px] bg-amber-500/80 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Sparkles className="h-2 w-2" />
                    AI
                  </span>
                </div>
              </div>
              <CardContent className="p-2.5">
                <p className="text-xs font-medium leading-tight">{example.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                  {example.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 风格选择 */}
      {activeTab === "styles" && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            点击风格标签，自动填入提示词
          </p>
          {styles.map((style) => (
            <StyleCard
              key={style.name}
              style={style}
              onClick={() => onSelectStyle?.(style.promptSuffix)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** 风格卡片 */
function StyleCard({
  style,
  onClick,
}: {
  style: SceneStyleVariant
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-amber-500/30 cursor-pointer transition-all group"
    >
      {/* 预览图 */}
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200">
        <ImageWithFallback
          src={style.preview}
          alt={style.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{style.name}</p>
        <p className="text-xs text-muted-foreground">{style.description}</p>
      </div>
      {/* 添加指示 */}
      <Badge
        variant="outline"
        className="text-[10px] px-1.5 py-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        + 填入
      </Badge>
    </div>
  )
}
