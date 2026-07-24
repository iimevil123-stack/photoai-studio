"use client"

import { useState, useEffect } from "react"
import { TemplateCard } from "./template-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { SceneTemplate } from "@/lib/scene/templates"

/**
 * 场景模板网格 — 2 列更大卡片布局
 *
 * 移动端单列，平板及以上双列。
 * 更大的卡片尺寸适配封面图片 + Before/After 预览。
 */
export function TemplateGrid() {
  const [templates, setTemplates] = useState<SceneTemplate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/scene/templates")
        const data = await res.json()
        setTemplates(data.templates)
      } catch {
        // fallback: empty
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-52 sm:h-60 rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  )
}
