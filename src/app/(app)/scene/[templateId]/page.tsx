"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SceneWorkspace } from "@/components/scene/scene-workspace"
import type { SceneTemplate } from "@/lib/scene/templates"

export default function SceneWorkspacePage() {
  const { templateId } = useParams<{ templateId: string }>()
  const [template, setTemplate] = useState<SceneTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const res = await fetch("/api/scene/templates")
        const data = await res.json()
        const found = (data.templates as SceneTemplate[]).find(
          (t) => t.id === templateId
        )
        if (found) {
          setTemplate(found)
        } else {
          setError("未找到该场景模板")
        }
      } catch {
        setError("加载失败，请刷新页面")
      } finally {
        setLoading(false)
      }
    }
    fetchTemplate()
  }, [templateId])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !template) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          {error || "模板不存在"}
        </p>
      </div>
    )
  }

  return <SceneWorkspace template={template} />
}
