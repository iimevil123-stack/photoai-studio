"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { ImageSource } from "@/lib/images"
import { ImageWithFallback } from "./image-with-fallback"

interface BeforeAfterSliderProps {
  before: ImageSource
  after: ImageSource
  beforeLabel?: string
  afterLabel?: string
  /** AI效果模拟类型 — 未来接入真实AI图片后可移除该prop */
  effect?: "portrait" | "landscape" | "product"
  className?: string
  /** 滑块初始位置百分比，默认50 */
  initialPosition?: number
}

/**
 * Before/After 对比滑块
 *
 * 当前通过 CSS filter 模拟 AI 处理效果。
 * 未来接入真实 AI 图片时：
 *   1. 将 after.primary 改为 AI 生成图片 URL
 *   2. 移除 `effect` prop 和相关 CSS 模拟逻辑
 *   3. 组件 API 保持不变
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "原图",
  afterLabel = "AI 增强",
  effect,
  className,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)

  // ---- AI 效果模拟 (未来接入真实 AI 图片后可移除) ----
  const afterFilters = getEffectFilters(effect)

  // ---- 拖拽逻辑 ----
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl select-none",
        "bg-gray-900 shadow-2xl",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After 图片 (底层) */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={after}
          alt="AI增强效果"
          fill
          className="object-cover"
          style={afterFilters}
        />
        {/* AI滤镜标签 */}
        <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-lg z-10">
          {afterLabel}
        </span>
      </div>

      {/* Before 图片 (上层，被裁切) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-0 w-[100vw] max-w-none">
          <ImageWithFallback
            src={before}
            alt="原始照片"
            fill
            className="object-cover"
          />
        </div>
        {/* Before标签 */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-lg">
          {beforeLabel}
        </span>
      </div>

      {/* 拖拽手柄 */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* 分割线 */}
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />

        {/* 手柄圆 */}
        <div
          className={cn(
            "relative w-10 h-10 rounded-full bg-white shadow-xl",
            "flex items-center justify-center",
            "border-2 border-white/80",
            "cursor-grab active:cursor-grabbing",
            "transition-transform duration-150",
            isDragging && "scale-110 shadow-2xl"
          )}
        >
          {/* 左右箭头 */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-gray-400"
          >
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 4L2 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <span className="text-white/60 text-xs bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
          ← 拖动对比 →
        </span>
      </div>
    </div>
  )
}

// ---- AI 效果 CSS 模拟 (未来接入真实 AI 图片后可移除) ----

function getEffectFilters(effect?: string): React.CSSProperties {
  switch (effect) {
    case "portrait":
      return {
        filter: "brightness(1.1) contrast(1.05) saturate(0.95)",
        // 模拟柔焦 + 暖色调
      }
    case "landscape":
      return {
        filter: "brightness(1.15) contrast(1.1) saturate(1.3) hue-rotate(-5deg)",
        // 模拟 HDR + 鲜艳色彩
      }
    case "product":
      return {
        filter: "brightness(1.2) contrast(1.08) saturate(0.9)",
        // 模拟纯白背景 + 高清晰度
      }
    default:
      return {
        filter: "brightness(1.08) contrast(1.05) saturate(1.1)",
      }
  }
}
