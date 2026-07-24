"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { ArrowRight, Sparkles, Star, Upload, Zap, ChevronDown } from "lucide-react"
import { HERO_PREVIEW_STRIP } from "@/lib/images"

/**
 * Hero Section — 静态高级渐变背景
 *
 * 深色摄影工作室风格：
 * - 纯 CSS 多层渐变，零动画开销
 * - 金色顶部光 + 蓝色底部光模拟专业影棚布光
 * - 无闪烁、无重绘、无合成层问题
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ======== 静态多层渐变背景 ======== */}
      {/* 基础层：深色渐变 */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0f0f1a 0%, #141420 25%, #101018 50%, #0a0a10 100%)" }} />
      {/* 金色光晕：右上角，模拟暖色主光源 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 900px 700px at 80% 10%, rgba(251,191,36,0.07) 0%, transparent 100%)",
        }}
      />
      {/* 蓝色光晕：左下角，模拟补光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 700px 600px at 15% 90%, rgba(59,130,246,0.05) 0%, transparent 100%)",
        }}
      />
      {/* 琥珀暖光：中上区域，增强层次感 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 600px 400px at 50% 30%, rgba(251,191,36,0.04) 0%, transparent 100%)",
        }}
      />
      {/* 顶部边缘微光：模拟棚顶灯光 */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.15) 30%, rgba(251,191,36,0.15) 70%, transparent 100%)",
        }}
      />

      {/* ======== 主内容 ======== */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-20 pb-8 text-center">
        {/* 顶部标签 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 mb-10">
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
        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 text-balance leading-relaxed">
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
              className="border-white/10 text-white hover:bg-white/5 font-medium text-base px-8 py-7 h-auto rounded-2xl transition-colors duration-200 hover:border-white/20"
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
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* AI 能力预览条 */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <span className="text-xs text-white/30 font-medium tracking-wider uppercase">
            一键生成
          </span>
          <div className="flex items-center gap-3">
            {HERO_PREVIEW_STRIP.map((img, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg hover:ring-amber-500/50 hover:scale-110 transition-transform duration-200 cursor-default"
              >
                <ImageWithFallback src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-white/30 font-medium tracking-wider uppercase ml-2">
            7 种场景
          </span>
        </div>

        {/* 向下滚动 */}
        <div className="mt-14 flex justify-center">
          <ChevronDown className="h-6 w-6 text-white/15" />
        </div>
      </div>
    </section>
  )
}
