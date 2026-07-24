"use client"

import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

/**
 * 光效扫描动画
 * — 一道倾斜的光束从左上扫过到右下
 * — 叠加在图片上方，模拟 AI 处理中的视觉效果
 */
export function LightScan({ className }: Props) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden rounded-xl", className)}>
      {/* 扫描光束 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%, transparent 100%)",
          animation: "lightScan 3s ease-in-out infinite",
        }}
      />
      {/* CSS keyframes injected via style tag */}
      <style jsx>{`
        @keyframes lightScan {
          0% { transform: translateX(-100%) translateY(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) translateY(200%) skewX(-20deg); }
        }
      `}</style>
    </div>
  )
}
