"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "@/lib/images"
import { X } from "lucide-react"

/**
 * AI 作品展示画廊 — 瀑布流网格
 *
 * 功能：
 * - 分类筛选（全部 / 人像 / 风景 / 产品 …）
 * - Hover 放大 + 标题浮层
 * - 点击灯箱预览
 * - 移动端适配（单列）
 */
export function ShowcaseGallery() {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // 筛选
  const filteredItems = useMemo(() => {
    if (activeCategory === "全部") return GALLERY_ITEMS
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full mb-4">
            🖼️ 作品画廊
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            AI 创作作品集
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            每一张作品都由 AI 精心优化。拖入照片，选择风格，即可生成属于你的大片。
          </p>
        </div>

        {/* 分类筛选标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 瀑布流网格 */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            该分类暂无作品展示
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() =>
                  setLightboxIndex(
                    GALLERY_ITEMS.findIndex((g) => g.id === item.id)
                  )
                }
              >
                {/* 图片 */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover 浮层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm drop-shadow-lg">
                        {item.title}
                      </p>
                      <span className="text-white/70 text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 查看更多提示 */}
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            以上为 AI 风格模拟作品，实际效果以生成结果为准
          </p>
        </div>
      </div>

      {/* ---- 灯箱预览 ---- */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* 图片 */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={GALLERY_ITEMS[lightboxIndex].src}
              alt={GALLERY_ITEMS[lightboxIndex].title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />

            {/* 信息 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white font-semibold text-lg">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <span className="text-white/60 text-sm">
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
            </div>

            {/* 前后切换 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(
                  (lightboxIndex - 1 + GALLERY_ITEMS.length) %
                    GALLERY_ITEMS.length
                )
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(
                  (lightboxIndex + 1) % GALLERY_ITEMS.length
                )
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
