"use client"

import Link from "next/link"
import { ArrowRight, Quote, Sparkles, Camera, Wand2, Palette, Upload, FileText, CheckCircle2 } from "lucide-react"

/**
 * AI 能力卡片 — "场景 → 痛点 → AI方案 → 效果" 四步叙事
 *
 * 每张卡片讲述一个完整的用户故事：
 * 1. 摄影师在什么场景下遇到什么问题
 * 2. AI 如何分析和解决
 * 3. 具体产出什么结果
 * 4. 引导进入对应功能页
 */

interface CapabilityStory {
  id: string
  scene: string
  icon: React.ElementType
  painPoint: string
  painQuote: string
  aiSolution: {
    steps: string[]
    output: string[]
  }
  effect: {
    metric: string
    label: string
  }
  gradient: string
  iconGradient: string
  href: string
  cta: string
}

const stories: CapabilityStory[] = [
  {
    id: "analyze",
    scene: "拍摄后回看",
    icon: Camera,
    painPoint: "拍了几百张，不知道哪些值得精修？",
    painQuote: "每次选片都要纠结好久，看不出问题在哪...",
    aiSolution: {
      steps: ["上传照片", "AI 多维分析", "生成专业报告"],
      output: ["构图评分", "光线诊断", "色彩评估", "改进建议"],
    },
    effect: {
      metric: "86",
      label: "综合评分",
    },
    gradient: "from-amber-500/10 via-amber-500/5 to-orange-500/10",
    iconGradient: "from-amber-400 to-orange-500",
    href: "/analyze",
    cta: "分析我的照片",
  },
  {
    id: "scene",
    scene: "创意创作",
    icon: Wand2,
    painPoint: "想要专业级大片，但不会后期和调色？",
    painQuote: "看到别人的大片很羡慕，自己调来调去都不满意...",
    aiSolution: {
      steps: ["选择风格模板", "上传原片", "AI 智能生成"],
      output: ["7种创作场景", "风格一键转换", "Before/After对比"],
    },
    effect: {
      metric: "7",
      label: "创作场景",
    },
    gradient: "from-purple-500/10 via-violet-500/5 to-blue-500/10",
    iconGradient: "from-purple-400 to-blue-500",
    href: "/scene",
    cta: "开始创作",
  },
  {
    id: "plan",
    scene: "拍摄前准备",
    icon: FileText,
    painPoint: "每次拍摄前不知道从何准备，经常遗漏关键细节？",
    painQuote: "服装搭配、机位选择、光线预判...每次都要临时抱佛脚...",
    aiSolution: {
      steps: ["输入拍摄需求", "AI 智能策划", "一键生成方案"],
      output: ["服装建议", "姿势指导", "镜头推荐", "光线规划"],
    },
    effect: {
      metric: "< 30s",
      label: "方案生成",
    },
    gradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
    iconGradient: "from-emerald-400 to-teal-500",
    href: "/plan",
    cta: "生成拍摄计划",
  },
]

export function CapabilityCards() {
  return (
    <section id="features" className="py-24 bg-surface-1">
      <div className="container mx-auto max-w-6xl px-4">
        {/* ---- Section Header ---- */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full mb-5 tracking-wide">
            <Sparkles className="h-3 w-3" />
            AI 核心能力
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            覆盖摄影
            <span className="gradient-text bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">全流程</span>
            的 AI 助手
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            无论你正在哪个阶段，AI 都能给你专业级的指导
          </p>
        </div>

        {/* ---- 故事卡片网格 ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, idx) => (
            <CapabilityStoryCard key={story.id} story={story} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityStoryCard({ story, index }: { story: CapabilityStory; index: number }) {
  const Icon = story.icon

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-border/40 bg-surface-0 p-6 sm:p-7 card-lift"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* ---- 顶部：场景标签 + 图标 ---- */}
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-surface-2 rounded-full px-3 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          {story.scene}
        </span>
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${story.iconGradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* ---- 痛点引用 ---- */}
      <div className="mb-5">
        <Quote className="h-4 w-4 text-muted-foreground/40 mb-2 -ml-0.5" />
        <p className="text-sm text-muted-foreground italic leading-relaxed pl-3 border-l-2 border-amber-500/30">
          {story.painQuote}
        </p>
      </div>

      {/* ---- 痛点标题 ---- */}
      <h3 className="text-base font-bold mb-4">{story.painPoint}</h3>

      {/* ---- AI解决方案流程 ---- */}
      <div className="bg-surface-1 rounded-xl p-4 mb-5 space-y-2.5">
        <span className="text-xs font-semibold text-muted-foreground tracking-wide">
          AI 工作流程
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {story.aiSolution.steps.map((step, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="text-xs font-medium text-foreground/80 bg-surface-2 rounded-full px-2.5 py-1">
                {step}
              </span>
              {i < story.aiSolution.steps.length - 1 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
              )}
            </span>
          ))}
        </div>

        {/* 输出标签 */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {story.aiSolution.output.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-full px-2.5 py-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ---- 底部：效果指标 + CTA ---- */}
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-extrabold bg-gradient-to-r ${story.iconGradient} bg-clip-text text-transparent`}>
            {story.effect.metric}
          </span>
          <span className="text-xs text-muted-foreground">{story.effect.label}</span>
        </div>

        <Link
          href={story.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          {story.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
