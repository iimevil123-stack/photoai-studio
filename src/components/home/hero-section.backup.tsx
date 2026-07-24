"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { ArrowRight, Sparkles, Star, Upload, Zap, ChevronDown } from "lucide-react"
import { HERO_FLOATING_CARDS, HERO_BG_IMAGE, HERO_PREVIEW_STRIP } from "@/lib/images"

// ======== 临时诊断日志 ========
let renderCount = 0
let mountCount = 0

/**
 * Hero Section
 */
export function HeroSection() {
  renderCount++
  const renderId = useRef(0)
  renderId.current++
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      console.warn("⚠️ Hero RE-MOUNTED! mountCount:", ++mountCount, "renderCount:", renderCount)
    } else {
      isMounted.current = true
      mountCount++
      console.log("✅ Hero mounted (first time). renderCount:", renderCount, "mountCount:", mountCount)
    }
    return () => {
      console.log("🔄 Hero UNMOUNTING. renderCount at unmount:", renderCount)
    }
  }, [])

  console.log("🎨 Hero render #", renderId.current, "| total renders:", renderCount)

  const bgUrl = typeof HERO_BG_IMAGE === "string" ? HERO_BG_IMAGE : HERO_BG_IMAGE.primary

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* ======== 背景：图片 + 单层渐变（合并，减少图层） ======== */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      />
      {/* 唯一渐变层：同时处理暗化 + 底部加强 */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ======== 渐变光晕（纯装饰，不动画触发重绘） ======== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)",
            animation: "float-slow 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            animation: "float-slower 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* ======== 漂浮卡片（桌面端） ======== */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_FLOATING_CARDS.map((img, i) => (
          <FloatingCard key={i} src={img} index={i} />
        ))}
      </div>

      {/* ======== 主内容 ======== */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-20 pb-8 text-center">
        {/* 顶部标签 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2 text-sm text-white/85 mb-10">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          AI 驱动的智能图片创作平台
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 text-balance leading-[1.05]">
          让每一张照片
          <br />
          <span className="gradient-text bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400 bg-clip-text text-transparent">
            成为作品
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-base sm:text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-12 text-balance leading-relaxed">
          上传照片，AI 为你分析构图、优化光影、生成风格化创作
          <br className="hidden sm:block" />
          从拍摄到后期，覆盖摄影全流程的智能助手
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/scene">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-lg px-10 py-7 h-auto rounded-2xl shadow-xl shadow-amber-500/30 transition-colors duration-200 hover:scale-105"
            >
              <Upload className="mr-2.5 h-5 w-5" />
              开始创作
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/analyze">
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 text-white hover:bg-white/8 font-medium text-base px-8 py-7 h-auto rounded-2xl transition-colors duration-200 hover:border-white/25"
            >
              <Zap className="mr-2 h-5 w-5 text-amber-400" />
              AI 照片分析
            </Button>
          </Link>
        </div>

        {/* 社交证明 */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-12">
          {[
            { value: "10,000+", label: "摄影师信赖" },
            { value: "50,000+", label: "作品已生成" },
            { value: "4.9", label: "用户评分", icon: true },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-bold text-white">
                {stat.icon && <Star className="h-5 w-5 text-amber-400 fill-amber-400" />}
                {stat.value}
              </div>
              <div className="text-sm text-white/45 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* AI 能力预览条 */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <span className="text-xs text-white/35 font-medium tracking-wider uppercase">
            一键生成
          </span>
          <div className="flex items-center gap-3">
            {HERO_PREVIEW_STRIP.map((img, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-lg hover:ring-amber-500/50 hover:scale-110 transition-transform duration-200 cursor-default"
              >
                <ImageWithFallback src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-white/35 font-medium tracking-wider uppercase ml-2">
            7 种场景
          </span>
        </div>

        {/* 向下滚动 */}
        <div className="mt-14 flex justify-center">
          <ChevronDown className="h-6 w-6 text-white/20 animate-bounce-slow" />
        </div>
      </div>
    </section>
  )
}

// ---- 漂浮卡片 ----

let floatingRenderCounts = [0, 0, 0]

function FloatingCard({
  src,
  index,
}: {
  src: { primary: string; fallback: string; fallbackIsGradient: boolean }
  index: number
}) {
  floatingRenderCounts[index]++
  console.log(`🃏 FloatingCard[${index}] render #${floatingRenderCounts[index]}`)

  const animations = ["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"]
  const positions = ["left-[6%] top-[18%]", "right-[8%] top-[22%]", "left-[58%] bottom-[24%]"]
  const rotations = ["-rotate-3", "rotate-2", "-rotate-2"]
  const sizes = ["w-60 h-80", "w-52 h-68", "w-56 h-64"]

  return (
    <div className={`absolute ${positions[index]} ${rotations[index]} ${animations[index]} opacity-30`}>
      <div className={`${sizes[index]} rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10`}>
        <ImageWithFallback src={src} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </div>
  )
}
