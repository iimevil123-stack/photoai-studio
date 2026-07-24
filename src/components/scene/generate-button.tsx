"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Wand2, Loader2 } from "lucide-react"

export type GenerateState = "idle" | "generating" | "completed" | "error"

interface Props {
  state: GenerateState
  onClick: () => void
  disabled?: boolean
}

const stateConfig: Record<GenerateState, { label: string; variant: "default" | "outline" | "destructive" }> = {
  idle: { label: "开始 AI 生成", variant: "default" },
  generating: { label: "AI 生成中...", variant: "default" },
  completed: { label: "重新生成", variant: "outline" },
  error: { label: "重试", variant: "destructive" },
}

export function GenerateButton({ state, onClick, disabled }: Props) {
  const config = stateConfig[state]
  const isLoading = state === "generating"

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size="lg"
      variant={config.variant}
      className={cn(
        "relative overflow-hidden transition-all duration-300 text-base font-medium px-8",
        state === "idle" &&
          "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40",
        state === "generating" &&
          "bg-gradient-to-r from-amber-500 to-orange-500 cursor-wait",
        state === "completed" &&
          "border-amber-500 text-amber-600 hover:bg-amber-50"
      )}
    >
      {/* 生成中的光效扫描动画 */}
      {isLoading && (
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      )}

      {isLoading ? (
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <Wand2 className={cn("h-5 w-5 mr-2", state === "completed" && "text-amber-500")} />
      )}
      {config.label}
    </Button>
  )
}
