"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { HERO_FLOATING_CARDS } from "@/lib/images"

/**
 * Hero Section — 视觉冲击第一屏
 *
 * 元素：
 * - 动态粒子画布背景
 * - 3 张漂浮 AI 作品卡片
 * - 主标题 + 副标题 + CTA
 * - 底部功能标签
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* ---- 动态粒子背景 ---- */}
      <ParticleBackground />

      {/* ---- 渐变光晕 ---- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-float-slower"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ---- 漂浮 AI 作品卡片（桌面端） ---- */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_FLOATING_CARDS.map((img, i) => (
          <FloatingCard
            key={i}
            src={img}
            index={i}
          />
        ))}
      </div>

      {/* ---- 主内容 ---- */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
        {/* 顶部标签 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm mb-8">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          AI 驱动的智能图片创作平台
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance leading-tight">
          用 AI 将照片变
          <br />
          <span className="gradient-text bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400 bg-clip-text text-transparent">
            艺术作品
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
          上传一张照片，选择场景风格，AI 为你生成专业级视觉作品。
          <br className="hidden sm:block" />
          人像精修 · 风景增强 · 电商出图 · 风格转换，一键完成。
        </p>

        {/* CTA 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/scene">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-amber-500/40 group"
            >
              开始创作
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/analyze">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-medium text-base px-6 py-6 h-auto rounded-xl backdrop-blur-sm"
            >
              AI 照片分析
            </Button>
          </Link>
        </div>

        {/* 底部功能标签 */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/50 text-sm">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            7 种创作场景
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            AI 智能评分
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            Before/After 对比
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            免费开始使用
          </span>
        </div>

        {/* 向下滚动提示 */}
        <div className="mt-16 animate-bounce-slow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto text-white/30"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

// ---- 漂浮卡片 ----

function FloatingCard({
  src,
  index,
}: {
  src: { primary: string; fallback: string; fallbackIsGradient: boolean }
  index: number
}) {
  const positions = [
    "left-[8%] top-[15%] animate-float-card-1",
    "right-[10%] top-[20%] animate-float-card-2",
    "left-[60%] bottom-[22%] animate-float-card-3",
  ]

  const rotations = ["-rotate-3", "rotate-2", "-rotate-2"]
  const sizes = ["w-56 h-72", "w-48 h-64", "w-52 h-60"]
  const delays = ["", "animation-delay-2000", "animation-delay-4000"]

  return (
    <div
      className={`absolute ${positions[index]} ${rotations[index]} opacity-40 hover:opacity-80 transition-opacity duration-700`}
    >
      <div
        className={`${sizes[index]} ${delays[index]} rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10 bg-gray-900`}
      >
        <ImageWithFallback
          src={src}
          alt="AI作品展示"
          fill
          className="object-cover"
        />
        {/* 玻璃效果叠加 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </div>
  )
}

// ---- 动态粒子背景 ----

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const particles: Array<{
      x: number
      y: number
      radius: number
      dx: number
      dy: number
      opacity: number
      speed: number
    }> = []

    // 创建粒子
    const count = Math.min(60, Math.floor(window.innerWidth / 20))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // 绘制
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()

        // 移动
        p.x += p.dx * p.speed
        p.y += p.dy * p.speed

        // 边界检测
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // 脉冲透明度
        p.opacity += (Math.random() - 0.5) * 0.01
        p.opacity = Math.max(0.05, Math.min(0.5, p.opacity))
      })

      // 连接线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
