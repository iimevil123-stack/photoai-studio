"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-50/20 to-background dark:from-background dark:via-amber-950/10 dark:to-background" />

      {/* 装饰光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(251,191,36,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center">
        {/* 图标 */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25 mb-6">
          <Zap className="h-8 w-8" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          开始你的 AI 创作之旅
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          免费体验 AI 场景创作，无需注册。选择场景，上传照片，AI 为你生成专业级视觉作品。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/scene">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-lg px-10 py-6 h-auto rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105 group"
            >
              免费开始使用
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="outline"
              className="font-medium text-base px-8 py-6 h-auto rounded-xl"
            >
              注册账号
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          无需信用卡 · 免费体验全部功能
        </p>
      </div>
    </section>
  )
}
