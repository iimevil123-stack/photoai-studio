"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { ArrowRight, Sparkles, Star, Upload, Zap } from "lucide-react"
import { HERO_PREVIEW_STRIP } from "@/lib/images"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950">
      {/* 静态点阵纹理 — 模拟摄影棚吸光布质感 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 主内容 */}
      <div className="relative container mx-auto max-w-4xl px-6 py-20 text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 mb-12">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          AI 驱动的智能图片创作平台
        </div>

        {/* 标题 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          让每一张照片
          <br />
          <span className="text-amber-400">成为作品</span>
        </h1>

        {/* 副标题 */}
        <p className="text-base sm:text-lg text-neutral-400 max-w-lg mx-auto mb-12 leading-relaxed">
          上传照片，AI 分析构图、优化光影、生成风格化创作。覆盖摄影全流程。
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link href="/scene">
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-6 h-auto rounded-xl text-base">
              <Upload className="mr-2 h-5 w-5" />
              开始创作
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/analyze">
            <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 font-medium px-8 py-6 h-auto rounded-xl text-base">
              <Zap className="mr-2 h-5 w-5 text-amber-400" />
              AI 照片分析
            </Button>
          </Link>
        </div>

        {/* 社交证明 + 预览条 */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { value: "10,000+", label: "摄影师信赖" },
              { value: "50,000+", label: "作品已生成" },
              { value: "4.9", label: "用户评分", icon: true },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-bold text-white">
                  {stat.icon && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hidden sm:flex items-center justify-center gap-3">
            <span className="text-xs text-neutral-600 tracking-wider">一键生成</span>
            {HERO_PREVIEW_STRIP.map((img, i) => (
              <div key={i} className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-white/10">
                <ImageWithFallback src={img} alt="" fill className="object-cover" />
              </div>
            ))}
            <span className="text-xs text-neutral-600 tracking-wider">7 种场景</span>
          </div>
        </div>
      </div>
    </section>
  )
}
