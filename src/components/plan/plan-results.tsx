import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shirt, Users, Camera, Settings, Lightbulb } from "lucide-react"
import type { PlanResponse } from "@/lib/ai/types"

interface PlanResultsProps {
  data: PlanResponse
}

export function PlanResults({ data }: PlanResultsProps) {
  const sections = [
    {
      icon: Shirt,
      title: "服装建议",
      items: data.outfitSuggestions,
      color: "text-pink-500",
    },
    {
      icon: Users,
      title: "姿势指导",
      items: data.poseSuggestions,
      color: "text-blue-500",
    },
    {
      icon: Camera,
      title: "镜头推荐",
      items: data.lensRecommendations,
      color: "text-purple-500",
    },
    {
      icon: Lightbulb,
      title: "光线建议",
      items: data.lightingTips,
      color: "text-amber-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Camera Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            相机参数建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(data.cameraSettings).map(([key, value]) => (
              <div key={key} className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">{key}</p>
                <p className="font-mono font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <section.icon className={`h-4 w-4 ${section.color}`} />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="mt-0.5 shrink-0 text-xs font-mono">
                      {i + 1}
                    </Badge>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
