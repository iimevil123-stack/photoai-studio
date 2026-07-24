"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { getSceneExample } from "@/lib/scene/scene-examples"
import { SCENE_COVERS } from "@/lib/images"
import type { SceneTemplate } from "@/lib/scene/templates"
import type { SceneTemplateId } from "@/services/ai/types"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * 场景模板卡片 — 新设计
 *
 * - 真实封面图片（非渐变色）
 * - 场景名称 + 效果描述
 * - 迷你 Before/After 预览条
 * - Hover 放大封面 + 显示 CTA
 */
export function TemplateCard({ template }: { template: SceneTemplate }) {
  const router = useRouter()
  const cover = SCENE_COVERS[template.id]
  const example = getSceneExample(template.id as SceneTemplateId, 0)

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
      onClick={() => router.push(`/scene/${template.id}`)}
    >
      {/* ---- 封面图 ---- */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        {cover && (
          <ImageWithFallback
            src={cover}
            alt={template.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* 渐变叠加 — 确保文字可读 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 渐变条（保留原设计的品牌识别） */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80"
          style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
        />

        {/* 场景名 + 副标题 */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-xl drop-shadow-lg">
            {template.name}
          </h3>
          <p className="text-white/80 text-sm mt-0.5 drop-shadow-md">
            {template.subtitle}
          </p>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1.5 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl">
            开始创作
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* ---- 底部信息 ---- */}
      <div className="p-4 space-y-3">
        {/* 效果描述 */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* 迷你 Before/After 预览条 */}
        {example && (
          <div className="flex items-center gap-1 rounded-lg overflow-hidden h-12 bg-gray-100 dark:bg-gray-800">
            {/* Before 缩略图 */}
            <div className="w-1/2 h-full relative">
              <ImageWithFallback
                src={example.before}
                alt="原图"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 text-[9px] bg-black/60 text-white/70 px-1 leading-tight">
                原图
              </span>
            </div>
            {/* 箭头分隔 */}
            <div className="shrink-0 w-5 flex items-center justify-center">
              <span className="text-[10px] text-amber-500">→</span>
            </div>
            {/* After 缩略图 */}
            <div className="w-1/2 h-full relative">
              <ImageWithFallback
                src={example.after}
                alt="AI效果"
                fill
                className="object-cover"
                style={{ filter: "brightness(1.1) contrast(1.05) saturate(1.15)" }}
              />
              <span className="absolute bottom-0 right-0 text-[9px] bg-amber-500/80 text-white px-1 leading-tight flex items-center gap-0.5">
                <Sparkles className="h-2 w-2" />
                AI
              </span>
            </div>
          </div>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-2 py-0"
            >
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0 text-muted-foreground"
            >
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
