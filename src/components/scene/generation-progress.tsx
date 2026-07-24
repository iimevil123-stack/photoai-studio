"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import {
  Scan,
  Palette,
  Wand2,
  Sparkles,
  Image,
  CheckCircle2,
  Move,
  Layers,
  Film,
  Video,
} from "lucide-react"
import type { GenerationStep } from "@/services/ai/types"

const STEP_ICONS: Record<string, React.ElementType> = {
  Scan,
  Palette,
  Wand2,
  Sparkles,
  Image,
  CheckCircle2,
  Move,
  Layers,
  Film,
  Video,
}

interface Props {
  steps: GenerationStep[]
  currentStepIndex: number
  percent: number
  isComplete: boolean
  mode: "image" | "video"
}

export function GenerationProgress({
  steps,
  currentStepIndex,
  percent,
  isComplete,
  mode,
}: Props) {
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percent), 100)
    return () => clearTimeout(timer)
  }, [percent])

  return (
    <div className="space-y-6">
      {/* ---- 头部状态 ---- */}
      <div className="text-center space-y-2">
        {/* 动画图标 */}
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-2">
          {/* 外环旋转 */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin" />
          {/* 内环反向旋转 */}
          <div
            className="absolute inset-2 rounded-full border border-purple-500/20"
            style={{ animation: "progressSpinReverse 3s linear infinite" }}
          />
          {/* 中间图标 */}
          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
            {isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-white" />
            ) : (
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold">
          {isComplete
            ? "生成完成！"
            : `AI 正在${mode === "video" ? "制作视频" : "创作图片"}...`}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isComplete
            ? "AI 已完成所有处理步骤，你可以查看和下载结果"
            : "AI 正在分析你的图片并应用场景风格，请稍候"}
        </p>
      </div>

      {/* ---- 进度条 ---- */}
      <div className="space-y-1.5">
        <div className="relative">
          <Progress value={animatedPercent} className="h-2.5" />
          {/* 光效扫描线 */}
          {!isComplete && (
            <div
              className="absolute top-0 bottom-0 w-8 rounded-full opacity-50"
              style={{
                left: `${animatedPercent}%`,
                transform: "translateX(-50%)",
                background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)",
                transition: "left 0.5s ease-out",
              }}
            />
          )}
        </div>
        <span className="text-xs text-muted-foreground block text-right">
          {animatedPercent}%
        </span>
      </div>

      {/* ---- 步骤列表 ---- */}
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const StepIcon = STEP_ICONS[step.icon] || Sparkles
          const isActive = i === currentStepIndex && !isComplete
          const isDone = i < currentStepIndex || (isComplete && i === currentStepIndex)
          const isPending = i > currentStepIndex

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-500",
                isActive && "bg-amber-500/10 border border-amber-500/20 shadow-sm",
                isDone && "opacity-60"
              )}
            >
              {/* 步骤图标 */}
              <div
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                  isActive && "bg-amber-500 text-white shadow-md shadow-amber-500/30",
                  isDone && "bg-emerald-500 text-white",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <StepIcon
                    className={cn(
                      "h-4 w-4",
                      isActive && "animate-pulse"
                    )}
                  />
                )}
              </div>

              {/* 步骤文字 */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive && "text-amber-600 dark:text-amber-400",
                    isDone && "text-emerald-600 dark:text-emerald-400",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-xs text-amber-500/70 mt-0.5 animate-pulse">
                    处理中...
                  </p>
                )}
              </div>

              {/* 状态指示 */}
              <div className="shrink-0">
                {isActive && (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                  </span>
                )}
                {isPending && (
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/20 block" />
                )}
                {isDone && (
                  <span className="h-3 w-3 rounded-full bg-emerald-400 block" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ---- 底部提示 ---- */}
      {!isComplete && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {mode === "video" ? "视频生成需要更多时间，请耐心等待" : "AI 正在精细处理每个细节"}
          </p>
        </div>
      )}

    </div>
  )
}
