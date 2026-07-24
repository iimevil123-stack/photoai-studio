"use client"

import { useState, useCallback, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import type { ImageSource } from "@/lib/images"

interface ImageWithFallbackProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** 统一图片源（包含 primary 和 fallback） */
  src: ImageSource | string
  /** 是否使用 absolute fill 模式 */
  fill?: boolean
}

/**
 * 带 fallback 的图片组件
 *
 * - 加载失败时自动降级到 CSS 渐变背景
 * - 支持 ImageSource 对象或直接 URL 字符串
 * - fill 模式用于 BeforeAfterSlider 等容器
 */
export function ImageWithFallback({
  src,
  fill,
  className,
  alt = "",
  style,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  const primaryUrl = typeof src === "string" ? src : src.primary
  const fallbackStyle: React.CSSProperties | undefined =
    typeof src === "string"
      ? { background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" }
      : src.fallbackIsGradient
        ? { backgroundImage: src.fallback as string }
        : { backgroundColor: "#1a1a2e" }

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true)
      onError?.(e)
    },
    [onError]
  )

  // 图片加载失败 → 显示渐变背景
  if (hasError) {
    return (
      <div
        className={cn(
          fill && "absolute inset-0",
          "flex items-center justify-center",
          className
        )}
        style={{ ...fallbackStyle, ...style }}
        role="img"
        aria-label={alt}
      >
        {/* 小图标指示占位 */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          className="opacity-40"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    )
  }

  // 正常加载
  if (fill) {
    return (
      <img
        src={primaryUrl}
        alt={alt}
        onError={handleError}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        style={style}
        loading="lazy"
        suppressHydrationWarning
        {...rest}
      />
    )
  }

  return (
    <img
      src={primaryUrl}
      alt={alt}
      onError={handleError}
      className={className}
      style={style}
      loading="lazy"
      suppressHydrationWarning
      {...rest}
    />
  )
}
