"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * 图片渐变出现效果
 * — 从透明度 0 + scale(0.92) → 1 + scale(1)
 * — 配合 blur 过渡增加质感
 */
export function ImageReveal({
  children,
  delay = 0,
  duration = 1200,
  className,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.92)",
        filter: visible ? "blur(0px)" : "blur(12px)",
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${duration * 0.7}ms ease-out`,
      }}
    >
      {children}
    </div>
  )
}
