import { BeforeAfterSlider } from "@/components/shared/before-after-slider"
import { BEFORE_AFTER_PAIRS } from "@/lib/images"

/**
 * 精选 AI 变换案例
 *
 * 3 组 Before/After 对比，展示 AI 在不同场景的实际效果。
 * 每组具有对应的 effect 类型，用于 CSS 模拟 AI 增强效果。
 * 接入真实 AI 图片后，替换 BEFORE_AFTER_PAIRS 中的 after URL 即可。
 */
export function FeaturedWorks() {
  return (
    <section id="featured" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full mb-4">
            ✨ 精选案例
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            看看 AI 能为你的照片做什么
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            拖动滑块，对比 AI 处理前后的变化。每张照片都能变成专业级作品。
          </p>
        </div>

        {/* 3 组对比 */}
        <div className="space-y-12 md:space-y-20">
          {BEFORE_AFTER_PAIRS.map((pair, index) => (
            <div key={pair.id}>
              {/* 标签 */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {pair.label}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {pair.category}
                  </span>
                </div>
              </div>

              {/* 对比滑块 */}
              <div className="aspect-[16/9] sm:aspect-[2/1] max-h-[500px]">
                <BeforeAfterSlider
                  before={pair.before}
                  after={pair.after}
                  beforeLabel="原始照片"
                  afterLabel="AI 增强效果"
                  effect={pair.id as "portrait" | "landscape" | "product"}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
