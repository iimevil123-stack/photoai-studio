"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { GripHorizontal } from "lucide-react"

interface Props {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = "原图",
  afterLabel = "AI 生成",
}: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      handleMove(e.clientX)
    }
    const handleMouseUp = () => {
      isDragging.current = false
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      handleMove(e.touches[0].clientX)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMove])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none bg-muted"
      style={{ aspectRatio: "4/3" }}
    >
      {/* After (full) — 底层 */}
      <img
        src={afterImage}
        alt="AI 生成结果"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* Before (clipped) — 上层 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="原始图片"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle */}
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center cursor-ew-resize">
          <GripHorizontal className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Labels */}
      <div
        className={cn(
          "absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm transition-opacity",
          position < 15 && "opacity-0"
        )}
      >
        {beforeLabel}
      </div>
      <div
        className={cn(
          "absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm transition-opacity",
          position > 85 && "opacity-0"
        )}
      >
        {afterLabel}
      </div>
    </div>
  )
}
