"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star, Upload, Zap, Camera, Sun, Palette, SlidersHorizontal } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-neutral-950 overflow-hidden">
      {/* 点阵纹理 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative container mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ======== 左侧：品牌信息 ======== */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              AI 驱动的智能图片创作平台
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.08]">
              让每一张照片
              <br />
              <span className="text-amber-400">成为作品</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-md mb-9 leading-relaxed">
              上传照片，AI 分析构图、优化光影、生成风格化创作。覆盖摄影全流程。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/scene">
                <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-7 py-5 h-auto rounded-xl text-sm">
                  <Upload className="mr-2 h-4 w-4" />
                  开始创作
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/analyze">
                <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 font-medium px-7 py-5 h-auto rounded-xl text-sm">
                  <Zap className="mr-2 h-4 w-4 text-amber-400" />
                  AI 照片分析
                </Button>
              </Link>
            </div>

            <div className="flex gap-8">
              {[
                { value: "10,000+", label: "摄影师信赖" },
                { value: "50,000+", label: "作品已生成" },
                { value: "4.9", label: "用户评分", star: true },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-1 text-lg font-bold text-white">
                    {s.star && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                    {s.value}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ======== 右侧：静态产品展示区 ======== */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* 主卡片 */}
              <div className="rounded-2xl bg-neutral-900 border border-white/8 overflow-hidden shadow-2xl shadow-black/50">
                {/* 照片预览区 */}
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 relative flex items-center justify-center">
                  {/* 模拟照片 */}
                  <div className="w-3/4 aspect-[3/4] rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 relative overflow-hidden shadow-lg">
                    {/* 人像剪影 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-10 w-10 text-neutral-600" />
                    </div>
                    {/* AI 评分徽章 */}
                    <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                      86
                    </div>
                    {/* 底部标签 */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
                      <span className="text-[9px] bg-black/50 text-white/70 rounded-full px-2 py-0.5 backdrop-blur-sm">人像</span>
                      <span className="text-[9px] bg-black/50 text-white/70 rounded-full px-2 py-0.5 backdrop-blur-sm">自然光</span>
                    </div>
                  </div>
                </div>

                {/* 参数分析区 */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    AI 智能分析结果
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: Sun, label: "光线", value: "优秀", score: 4, color: "bg-amber-400" },
                      { icon: Palette, label: "色彩", value: "良好", score: 4, color: "bg-amber-400" },
                      { icon: SlidersHorizontal, label: "构图", value: "可优化", score: 3, color: "bg-neutral-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-300 w-12">{item.label}</span>
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={`h-1.5 flex-1 rounded-full ${n <= item.score ? item.color : "bg-neutral-800"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-500 w-10 text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 装饰：偏移的第二张卡片 */}
              <div className="absolute -bottom-6 -right-6 w-40 h-52 rounded-2xl bg-neutral-900 border border-white/5 shadow-xl -z-10 overflow-hidden">
                <div className="p-3">
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-800 flex items-center justify-center">
                    <Camera className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-neutral-800" />
                    <div className="h-1.5 w-1/2 rounded-full bg-neutral-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
