"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { getSceneExamples, getSceneStyles } from "@/lib/scene/scene-examples"
import type { SceneTemplateId } from "@/services/ai/types"
import type { SceneStyleVariant } from "@/lib/images"
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface Props {
  templateId: SceneTemplateId
  sceneName: string
}

/**
 * 场景顶部动态横幅
 *
 * - 3 组案例自动轮播，平滑过渡
 * - AI 扫描线光效
 * - 光晕移动动画
 * - hover 暂停轮播
 * - 风格标签选择
 */
export function SceneHero({ templateId, sceneName }: Props) {
  const examples = getSceneExamples(templateId)
  const styles = getSceneStyles(templateId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showAfter, setShowAfter] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const afterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentExample = examples[currentIndex] ?? examples[0]

  // 自动轮播
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTransitioning(true)
      setShowAfter(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(examples.length, 1))
        setTransitioning(false)
      }, 400)
    }, 5000)
  }, [examples.length])

  useEffect(() => {
    if (!isPaused) startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (afterTimerRef.current) clearTimeout(afterTimerRef.current)
    }
  }, [isPaused, startAutoPlay])

  // 2 秒后自动切换到 After 效果
  useEffect(() => {
    setShowAfter(false)
    afterTimerRef.current = setTimeout(() => {
      setShowAfter(true)
    }, 2000)
    return () => {
      if (afterTimerRef.current) clearTimeout(afterTimerRef.current)
    }
  }, [currentIndex])

  const goTo = useCallback((idx: number) => {
    setTransitioning(true)
    setShowAfter(false)
    setTimeout(() => {
      setCurrentIndex(idx)
      setTransitioning(false)
    }, 400)
  }, [])

  const goPrev = useCallback(() => {
    const idx = (currentIndex - 1 + examples.length) % examples.length
    goTo(idx)
  }, [currentIndex, examples.length, goTo])

  const goNext = useCallback(() => {
    const idx = (currentIndex + 1) % examples.length
    goTo(idx)
  }, [currentIndex, examples.length, goTo])

  if (!currentExample) return null

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gray-950 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ---- 主图区域 ---- */}
      <div className="relative aspect-[21/9] sm:aspect-[2.5/1] min-h-[280px] max-h-[450px]">
        {/* Before 图片 (底层) */}
        <ImageWithFallback
          src={currentExample.before}
          alt={`${sceneName} 原始照片示例`}
          fill
          className={cn(
            "object-cover transition-opacity duration-700",
            showAfter ? "opacity-0" : "opacity-100",
            transitioning && "opacity-50"
          )}
        />

        {/* After 图片 (叠加层，AI效果) */}
        <ImageWithFallback
          src={currentExample.after}
          alt={`${sceneName} AI 处理效果`}
          fill
          className={cn(
            "object-cover transition-all duration-1000",
            showAfter ? "opacity-100" : "opacity-0",
            transitioning && "opacity-50"
          )}
          style={{
            filter: "brightness(1.1) contrast(1.05) saturate(1.15)",
          }}
        />

        {/* 渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* ---- AI 扫描线效果 ---- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 0%, transparent 43%, rgba(255,255,255,0.06) 47%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 53%, transparent 57%, transparent 100%)",
              animation: "sceneLightScan 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* ---- 移动光晕 ---- */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
            animation: "sceneOrbFloat 8s ease-in-out infinite",
          }}
        />

        {/* ---- Before/After 状态指示 ---- */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-500",
              !showAfter
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/40"
            )}
          >
            原始照片
          </span>
          <span className="text-white/30 text-xs">→</span>
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-500 flex items-center gap-1",
              showAfter
                ? "bg-amber-500/80 text-white"
                : "bg-white/5 text-white/40"
            )}
          >
            <Sparkles className="h-3 w-3" />
            AI 增强
          </span>
        </div>

        {/* ---- 案例信息浮层 ---- */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-white text-lg sm:text-2xl font-bold drop-shadow-lg mb-1">
                {currentExample.label}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm max-w-lg drop-shadow-md line-clamp-2">
                {currentExample.description}
              </p>
            </div>

            {/* 导航控件 */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={goPrev}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              </button>
              <button
                onClick={goNext}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ---- 案例进度点 ---- */}
        <div className="absolute bottom-4 right-4 sm:right-20 flex gap-1.5">
          {examples.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-6 bg-amber-400"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      {/* ---- 底部风格标签栏 ---- */}
      <div className="relative px-4 sm:px-6 py-3 bg-gray-900/80 backdrop-blur-sm border-t border-white/5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-white/40 shrink-0">可选风格：</span>
          {styles.map((style) => (
            <StyleTag key={style.name} style={style} />
          ))}
        </div>
      </div>

    </div>
  )
}

/** 风格标签（hover 显示提示词） */
function StyleTag({ style }: { style: SceneStyleVariant }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <Badge
        variant="secondary"
        className="cursor-pointer bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border-white/10 transition-all text-xs"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {style.name}
      </Badge>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap z-20 border border-white/10">
          <p className="font-medium">{style.name}</p>
          <p className="text-white/50 mt-0.5">{style.description}</p>
        </div>
      )}
    </div>
  )
}
