import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Camera, Users, Zap, Target, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解光影智助 PhotoAI Studio — 用 AI 技术赋能每一位摄影创作者",
}

const VALUES = [
  {
    icon: Target,
    title: "使命",
    description:
      "让每个人都能轻松创作出专业级别的摄影作品，用 AI 消除技术和设备的门槛。",
  },
  {
    icon: Zap,
    title: "愿景",
    description:
      "成为全球摄影创作者首选的 AI 辅助平台，推动摄影艺术与人工智能的深度融合。",
  },
  {
    icon: Users,
    title: "社区",
    description:
      "构建一个开放、互助的摄影 AI 社区，让创作者分享经验、共同成长。",
  },
]

const FEATURES = [
  {
    title: "AI 照片分析",
    description:
      "上传照片，AI 从构图、光影、色彩、情绪四个维度给出专业评分和改进建议。",
  },
  {
    title: "AI 场景创作",
    description:
      "7 种预设场景模板，一键将普通照片转化为影棚人像、电影调色、电商产品图等风格。",
  },
  {
    title: "AI 拍摄策划",
    description:
      "输入拍摄主题，AI 为你生成包含机位、光线、道具、构图的完整拍摄方案。",
  },
  {
    title: "AI 现场助手",
    description:
      "拍摄现场上传环境照片，AI 实时分析光线和背景条件，给出调整建议。",
  },
  {
    title: "AI 后期指导",
    description:
      "获取专业的后期处理建议，包括调色参数、裁剪方案、修复技巧。",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm text-amber-600 mb-6">
              <Camera className="h-4 w-4" />
              PhotoAI Studio
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              关于光影智助
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我们是一支热爱摄影和 AI 技术的团队，致力于用人工智能让摄影创作变得更简单、更专业。
            </p>
          </div>
        </section>

        {/* 故事 */}
        <section className="py-20">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">我们的故事</h2>
            <div className="prose prose-neutral max-w-none text-muted-foreground space-y-4">
              <p>
                光影智助诞生于一个简单的想法：<strong>摄影不应该被设备和技能所限制</strong>。
              </p>
              <p>
                在传统摄影领域，想要拍出专业级别的照片，需要昂贵的器材、多年的经验积累，
                以及专业的后期处理技能。这让很多有创意、有想法的人望而却步。
              </p>
              <p>
                2024 年，随着 AI 图像技术的突破性进展，我们看到了改变这一切的机会。
                我们将最先进的 AI 视觉模型与摄影领域的专业知识相结合，
                打造了光影智助 PhotoAI Studio — 一个让任何人都能轻松创作专业摄影作品的 AI 平台。
              </p>
              <p>
                今天，光影智助已经帮助数千位摄影爱好者提升了作品质量，
                从日常随拍到专业创作，AI 正在重新定义摄影的可能性。
              </p>
            </div>
          </div>
        </section>

        {/* 价值观 */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">我们的理念</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((item) => (
                <div
                  key={item.title}
                  className="text-center p-8 rounded-2xl bg-background border"
                >
                  <div className="h-14 w-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-7 w-7 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 功能 */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">产品功能</h2>
            <p className="text-muted-foreground text-center mb-12">
              五大 AI 模块，覆盖摄影创作全流程
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-card">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-amber-500/5">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">准备好开始创作了吗？</h2>
            <p className="text-muted-foreground mb-8">
              免费注册，体验 AI 驱动的摄影创作
            </p>
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
            >
              免费注册
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
