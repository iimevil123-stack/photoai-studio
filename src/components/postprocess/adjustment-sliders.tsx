import type { PostProcessResponse } from "@/lib/ai/types"

interface AdjustmentSlidersProps {
  adjustments: PostProcessResponse["adjustments"]
}

interface ParamConfig {
  key: keyof PostProcessResponse["adjustments"]
  label: string
  min: number
  max: number
  unit: string
  color: string
}

const paramConfigs: ParamConfig[] = [
  { key: "exposure", label: "曝光", min: -5, max: 5, unit: "", color: "bg-amber-500" },
  { key: "contrast", label: "对比度", min: -100, max: 100, unit: "", color: "bg-blue-500" },
  { key: "highlights", label: "高光", min: -100, max: 100, unit: "", color: "bg-sky-400" },
  { key: "shadows", label: "阴影", min: -100, max: 100, unit: "", color: "bg-purple-500" },
  {
    key: "colorTemperature",
    label: "色温",
    min: -2000,
    max: 2000,
    unit: "K",
    color: "bg-orange-500",
  },
  { key: "saturation", label: "饱和度", min: -100, max: 100, unit: "", color: "bg-pink-500" },
  { key: "vibrance", label: "自然饱和度", min: -100, max: 100, unit: "", color: "bg-rose-400" },
]

export function AdjustmentSliders({ adjustments }: AdjustmentSlidersProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">参数调整建议</h3>
      <div className="space-y-4">
        {paramConfigs.map((config) => {
          const value = adjustments[config.key]
          const range = config.max - config.min
          const percent = ((value - config.min) / range) * 100

          return (
            <div key={config.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{config.label}</span>
                <span className="font-mono text-xs tabular-nums">
                  {value > 0 ? "+" : ""}
                  {value}
                  {config.unit}
                </span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`absolute h-full rounded-full ${config.color} transition-all duration-500`}
                  style={{
                    left: `${Math.min(50, percent)}%`,
                    right: `${Math.max(0, 100 - Math.max(50, percent))}%`,
                    width: `${Math.abs(percent - 50)}%`,
                  }}
                />
                <div
                  className="absolute h-3 w-3 rounded-full bg-white border-2 border-muted-foreground/30 -top-0.5 shadow-sm transition-all duration-500"
                  style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
