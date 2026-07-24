"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { SCENE_COVERS, sceneRoute } from "@/lib/images"
import { SCENE_TEMPLATES } from "@/lib/scene/templates"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * 场景模板展示 — 7 个 AI 创作场景
 *
 * 每个卡片包含：
 * - 高质量封面图片
 * - 场景名称和描述
 * - 风格标签
 * - 点击跳转到 /scene/[id]
 */
export function SceneShowcase() {
  return (
    <section id="scenes" className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-3 py-1 rounded-full mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            AI 创作场景
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            选择场景，一键生成
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7 种专业场景模板，覆盖摄影创作所有需求。上传照片、输入想法，AI 为你生成惊艳作品。
          </p>
        </div>

        {/* 场景卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SCENE_TEMPLATES.map((template) => {
            const cover = SCENE_COVERS[template.id]
            return (
              <Link key={template.id} href={sceneRoute(template.id)}>
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer h-full">
                  {/* 封面图 */}
                  <div className="relative h-48 overflow-hidden">
                    {cover && (
                      <ImageWithFallback
                        src={cover}
                        alt={template.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    {/* 渐变叠加 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* 标题叠加在图片上 */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg drop-shadow-lg">
                        {template.name}
                      </h3>
                      <p className="text-white/70 text-xs mt-0.5 drop-shadow-md">
                        {template.subtitle}
                      </p>
                    </div>

                    {/* Hover 操作提示 */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-1.5 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        开始创作
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* 底部信息 */}
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>

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
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* 底部链接 */}
        <div className="text-center mt-10">
          <Link
            href="/scene"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors"
          >
            查看全部 7 个场景
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
