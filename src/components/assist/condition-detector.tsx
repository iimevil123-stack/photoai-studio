import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, Palette, Thermometer } from "lucide-react"
import type { AssistResponse } from "@/lib/ai/types"

interface ConditionDetectorProps {
  conditions: AssistResponse["conditions"]
}

export function ConditionDetector({ conditions }: ConditionDetectorProps) {
  const items = [
    { icon: Cloud, label: "天气", value: conditions.weather, color: "text-sky-500" },
    { icon: Sun, label: "光线", value: conditions.lighting, color: "text-amber-500" },
    {
      icon: Palette,
      label: "背景",
      value: conditions.backgroundQuality,
      color: "text-purple-500",
    },
    {
      icon: Thermometer,
      label: "色温",
      value: `${conditions.colorTemperature}K`,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">环境检测结果</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
              <item.icon className={`h-5 w-5 ${item.color} mb-1`} />
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
