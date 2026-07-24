// ============================================================
// 动画效果配置 — 各类视觉效果的参数
// ============================================================

/** 光效扫描动画参数 */
export const LIGHT_SCAN_CONFIG = {
  duration: 3,          // 秒
  beamWidth: 60,        // 光束宽度 px
  color: "rgba(255,255,255,0.15)",
  direction: "left-to-right", // left-to-right | diagonal
} as const

/** 粒子爆发动画参数 */
export const PARTICLE_CONFIG = {
  count: 30,
  minSize: 3,           // px
  maxSize: 12,          // px
  colors: [
    "rgba(251, 191, 36, 0.8)",   // amber
    "rgba(255, 255, 255, 0.6)",  // white
    "rgba(168, 85, 247, 0.6)",   // purple
    "rgba(59, 130, 246, 0.6)",   // blue
  ],
  duration: 2000,       // ms
  spread: 300,          // px max distance
} as const

/** Ken Burns 效果参数 */
export const KEN_BURNS_CONFIG = {
  zoomScale: 1.15,      // max zoom-in ratio
  duration: 8,          // seconds per cycle
  panDistance: 5,       // % translate
} as const

/** 景深变化参数 */
export const DEPTH_OF_FIELD_CONFIG = {
  blurMax: 8,           // px max blur
  blurMin: 0,
  transitionMs: 3000,
  focalRange: [0.2, 0.8], // normalized focal points
} as const

/** 图片渐变出现参数 */
export const IMAGE_REVEAL_CONFIG = {
  initialOpacity: 0,
  initialScale: 0.92,
  duration: 1200,       // ms
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

/** 生成进度步骤动画 */
export const PROGRESS_STEP_CONFIG = {
  stepTransitionMs: 600,
  pulseIntervalMs: 2000,
} as const

/** 前后对比滑动器参数 */
export const COMPARE_SLIDER_CONFIG = {
  defaultPosition: 50,  // % — slider starts at middle
  handleSize: 40,       // px
  lineColor: "white",
  lineWidth: 2,         // px
} as const

// ---- 辅助函数 ----

/** 生成随机粒子位置 */
export function generateParticlePositions(
  count: number,
  spread: number
): Array<{ x: number; y: number; size: number; color: string; delay: number }> {
  const { colors, minSize, maxSize } = PARTICLE_CONFIG
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spread * 2,
    y: (Math.random() - 0.5) * spread * 2,
    size: minSize + Math.random() * (maxSize - minSize),
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 800,
  }))
}
