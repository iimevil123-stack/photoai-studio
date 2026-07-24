"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PlanInputForm } from "@/components/plan/plan-input-form"
import { PlanResults } from "@/components/plan/plan-results"
import { ReportSkeleton } from "@/components/analyze/report-skeleton"
import { Separator } from "@/components/ui/separator"
import type { PlanResponse } from "@/lib/ai/types"

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [plan, setPlan] = useState<PlanResponse | null>(null)

  const handleSubmit = async (data: {
    theme: string
    scene: string
    subjectType: string
    style: string
  }) => {
    setIsLoading(true)
    setPlan(null)
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "生成失败")
      }
      const result = await res.json()
      setPlan(result.plan)
      toast.success("策划方案生成成功")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "生成失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI 拍摄策划</h1>
        <p className="text-muted-foreground mt-1">
          输入拍摄主题和场景，AI 为你生成专业的拍摄策划方案
        </p>
      </div>

      <Separator />

      <PlanInputForm onSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8">
          <ReportSkeleton />
        </div>
      )}

      {plan && (
        <div className="mt-8">
          <PlanResults data={plan} />
        </div>
      )}
    </div>
  )
}
