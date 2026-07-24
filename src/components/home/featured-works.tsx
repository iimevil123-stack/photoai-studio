"use client"

import { useState } from "react"
import { BeforeAfterSlider } from "@/components/shared/before-after-slider"
import { BEFORE_AFTER_PAIRS } from "@/lib/images"
import { Sparkles, MessageCircle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"

/**
 * 精选作品展示 — "痛点 → AI方案 → 效果" 完整叙事
 *
 * 每个案例包含：
 * 1. 摄影师遇到的问题
 * 2. AI 如何分析和解决
 * 3. Before/After 视觉对比
 * 4. 用户评价（社交证明）
 */

interface CaseNarrative {
  painPoint: string
  aiActions: { icon: string; text: string }[]
  testimonial: {
    quote: string
    author: string
    role: string
  }
  resultMetric: { value: string; label: string }
}

const narratives: Record<string, CaseNarrative> = {
  portrait: {
    painPoint: "室内人像光线平淡，肤色发灰，背景杂乱没有氛围感",
    aiActions: [
      { icon: "☀️", text: "智能补光：识别人脸区域，模拟柔光箱效果" },
      { icon: "🎨", text: "肤色校正：AI 分析肤色，调整为健康自然的暖色调" },
      { icon: "🔍", text: "背景虚化：模拟 f/1.4 大光圈，突出主体" },
      { icon: "✨", text: "氛围增强：添加胶片颗粒感和暗角，营造情绪" },
    ],
    testimonial: {
      quote: "以前这类人像要花半小时调色磨皮，现在上传就出效果，微调一下就能交片。",
      author: "小林",
      role: "独立摄影师",
    },
    resultMetric: { value: "15s", label: "出片时间" },
  },
  landscape: {
    painPoint: "阴天拍的风景灰蒙蒙，天空过曝一片白，完全没有层次感",
    aiActions: [
      { icon: "🌤️", text: "天空替换：AI 识别天际线，无缝替换为戏剧性天空" },
      { icon: "📐", text: "构图优化：自动裁剪为三分法构图，增强视觉引导" },
      { icon: "🌈", text: "色彩分级：分离高光/阴影，分别调色增强层次" },
      { icon: "🏔️", text: "细节增强：锐化山体纹理，提升画面通透感" },
    ],
    testimonial: {
      quote: "去川西旅行遇到阴天，以为白去了。回来用AI一处理，朋友都问我是不是又去了一趟。",
      author: "阿杰",
      role: "旅行博主",
    },
    resultMetric: { value: "92", label: "AI 评分" },
  },
  product: {
    painPoint: "白底产品照太单调，搭建场景成本太高，缺乏视觉吸引力",
    aiActions: [
      { icon: "🎬", text: "场景合成：AI 自动抠图，生成高品质场景背景" },
      { icon: "💡", text: "光影重建：为产品添加真实的光影和反射效果" },
      { icon: "🎯", text: "构图优化：根据产品类型自动选择最佳展示角度" },
      { icon: "📱", text: "多尺寸出图：一键生成主图/详情页/社媒多尺寸" },
    ],
    testimonial: {
      quote: "以前拍一组产品要搭景半天，现在白底拍完，AI 出十几个场景图，效率提高了不止一倍。",
      author: "王姐",
      role: "电商卖家",
    },
    resultMetric: { value: "10x", label: "效率提升" },
  },
}

export function FeaturedWorks() {
  const [expandedCase, setExpandedCase] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedCase((prev) => (prev === id ? null : id))
  }

  return (
    <section id="featured" className="py-24 bg-surface-0">
      <div className="container mx-auto max-w-6xl px-4">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full mb-5 tracking-wide">
            <Sparkles className="h-3 w-3" />
            真实案例
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            看看 AI 能为你的
            <span className="gradient-text bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">照片</span>
            做什么
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            拖动滑块对比 AI 处理前后的变化，每张照片都能变成专业级作品
          </p>
        </div>

        {/* ---- 案例列表 ---- */}
        <div className="space-y-12 lg:space-y-20">
          {BEFORE_AFTER_PAIRS.map((pair, index) => {
            const narrative = narratives[pair.id]
            const isExpanded = expandedCase === pair.id
            const isEven = index % 2 === 0

            return (
              <article key={pair.id} className="group">
                {/* ---- 案例标签行 ---- */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-sm shadow-md">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">{pair.label}</h3>
                    <span className="text-sm text-muted-foreground">
                      {pair.category} · {narrative?.resultMetric.value} {narrative?.resultMetric.label}
                    </span>
                  </div>
                </div>

                {/* ---- 主内容：对比滑块 + 叙事区域 ---- */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start ${!isEven ? "lg:direction-rtl" : ""}`}
                >
                  {/* Before/After 对比滑块 */}
                  <div className="lg:col-span-3">
                    <div className="aspect-[16/9] sm:aspect-[3/2] max-h-[450px] rounded-2xl overflow-hidden shadow-photo-lg ring-1 ring-border/30">
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

                  {/* 叙事区域 */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* 痛点 */}
                    <div className="bg-surface-1 rounded-xl p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-semibold">摄影师痛点</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {narrative?.painPoint}
                      </p>
                    </div>

                    {/* AI 做了什么（可折叠） */}
                    <div className="bg-surface-1 rounded-xl p-4 sm:p-5">
                      <button
                        onClick={() => toggleExpand(pair.id)}
                        className="w-full flex items-center justify-between gap-2 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-semibold">AI 做了什么</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>

                      {/* 始终显示前2条 */}
                      <ul className="space-y-2">
                        {(isExpanded
                          ? narrative?.aiActions
                          : narrative?.aiActions?.slice(0, 2)
                        )?.map((action, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-0.5 shrink-0">{action.icon}</span>
                            <span>{action.text}</span>
                          </li>
                        ))}
                      </ul>

                      {!isExpanded && (narrative?.aiActions?.length ?? 0) > 2 && (
                        <p className="text-xs text-muted-foreground/60 mt-2 pl-6">
                          还有 {(narrative?.aiActions?.length ?? 0) - 2} 项优化...
                        </p>
                      )}
                    </div>

                    {/* 用户评价 */}
                    {narrative?.testimonial && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 rounded-xl p-4 sm:p-5 border border-amber-500/10">
                        <MessageCircle className="h-4 w-4 text-amber-500 mb-2" />
                        <p className="text-sm italic leading-relaxed mb-3">
                          &ldquo;{narrative.testimonial.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                            {narrative.testimonial.author[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {narrative.testimonial.author}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {narrative.testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
