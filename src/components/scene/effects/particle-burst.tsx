"use client"

import { useState, useEffect, useMemo } from "react"
import { generateParticlePositions } from "@/lib/scene/effects"
import { PARTICLE_CONFIG } from "@/lib/scene/effects"

interface Props {
  count?: number
  onComplete?: () => void
}

/**
 * 粒子爆发效果
 * — 30 个彩色粒子从中心向四周扩散
 * — 在 AI 生成完成时播放
 */
export function ParticleBurst({ count = PARTICLE_CONFIG.count, onComplete }: Props) {
  const [visible, setVisible] = useState(true)
  const particles = useMemo(
    () => generateParticlePositions(count, PARTICLE_CONFIG.spread),
    [count]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, PARTICLE_CONFIG.duration + 1000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            top: "50%",
            animation: `particleFly ${PARTICLE_CONFIG.duration}ms cubic-bezier(0, 0.7, 0.3, 1) ${p.delay}ms both`,
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
          } as React.CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes particleFly {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
