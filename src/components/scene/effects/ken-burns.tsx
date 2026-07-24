"use client"

import { cn } from "@/lib/utils"

interface Props {
  imageUrl: string
  className?: string
  duration?: number
}

/**
 * Ken Burns 效果 — 缓慢缩放和平移
 * 模拟视频动态效果，图片慢慢放大并轻微平移
 * 加上景深虚化遮罩，模拟镜头感
 */
export function KenBurns({ imageUrl, className, duration = 8 }: Props) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio: "16/9" }}>
      {/* 动态缩放图片 */}
      <div
        className="absolute inset-0"
        style={{
          animation: `kenBurnsZoom ${duration}s ease-in-out infinite alternate`,
        }}
      >
        <img
          src={imageUrl}
          alt="动态效果预览"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 景深虚化遮罩 — 四角模糊 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* 渐入边框 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 100px 40px rgba(0,0,0,0.15)",
        }}
      />

      <style jsx>{`
        @keyframes kenBurnsZoom {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(-1%, 0.5%); }
          100% { transform: scale(1.15) translate(0.5%, -0.5%); }
        }
      `}</style>
    </div>
  )
}
