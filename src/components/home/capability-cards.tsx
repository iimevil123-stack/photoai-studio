import { Card, CardContent } from "@/components/ui/card"
import { Camera, Smartphone, Palette } from "lucide-react"

const capabilities = [
  {
    icon: Camera,
    title: "AI 摄影策划师",
    subtitle: "拍摄前",
    input: "女生 · 咖啡馆 · 法式复古",
    output: ["场景建议", "服装搭配", "动作指导", "镜头推荐"],
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-500",
  },
  {
    icon: Smartphone,
    title: "AI 现场助手",
    subtitle: "拍摄中",
    input: "上传现场照片",
    output: ["光线变化检测", "背景优化建议", "动作实时调整", "备选方案推荐"],
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Palette,
    title: "AI 后期顾问",
    subtitle: "拍摄后",
    input: "智能调色分析",
    output: ["曝光 +0.3", "阴影 +25", "色温 +400K", "对比度优化"],
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-500",
  },
]

export function CapabilityCards() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            覆盖摄影全流程
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            从拍摄策划到后期出片，AI 在每个环节为你提供专业建议
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <Card
              key={cap.title}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${cap.gradient} hover:shadow-lg transition-all duration-300`}
            >
              <CardContent className="p-6">
                {/* Badge */}
                <span className="inline-block text-xs font-medium text-muted-foreground mb-3 bg-background/80 rounded-full px-3 py-1">
                  {cap.subtitle}
                </span>

                {/* Icon */}
                <div className={`mb-4 ${cap.iconColor}`}>
                  <cap.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>

                {/* Input demo */}
                <div className="mb-4">
                  <span className="text-xs text-muted-foreground">输入：</span>
                  <p className="text-sm font-medium mt-1">{cap.input}</p>
                </div>

                {/* Output demo */}
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">输出：</span>
                  <ul className="space-y-1">
                    {cap.output.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-foreground/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
