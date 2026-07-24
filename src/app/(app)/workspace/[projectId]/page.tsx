"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ScoreDisplay } from "@/components/analyze/score-display"
import { TechnicalAnalysis } from "@/components/analyze/technical-analysis"
import { CompositionAnalysis } from "@/components/analyze/composition-analysis"
import { ImprovementSuggestions } from "@/components/analyze/improvement-suggestions"
import { formatDate } from "@/lib/utils"
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from "@/lib/constants"
import { ArrowLeft, ImageIcon, Calendar } from "lucide-react"
// Raw Supabase response shapes (snake_case from DB)
interface SupabaseProject {
  id: string
  name: string
  description?: string | null
  type: string
  status: string
  cover_image_url?: string | null
  image_count: number
  created_at: string
  updated_at: string
}

interface SupabaseImage {
  id: string
  public_url: string
  thumbnail_url?: string | null
  original_filename: string
}

interface SupabaseReport {
  id: string
  overall_score: number | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  technical_analysis: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  composition_analysis: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suggestions: any
}

interface ProjectDetail extends SupabaseProject {
  images?: SupabaseImage[]
  ai_reports?: SupabaseReport[]
}
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/projects/${params.projectId}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data.project)
        }
      } catch {
        // silently fail
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [params.projectId])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">项目不存在或无权访问</p>
        <Link href="/workspace">
          <Button variant="link" className="mt-2">返回工作空间</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link href="/workspace" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-3">
          <ArrowLeft className="h-3 w-3" />
          返回工作空间
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-muted-foreground mt-1">{project.description}</p>
            )}
          </div>
          <Badge>{PROJECT_STATUS_LABELS[project.status] || project.status}</Badge>
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            创建于 {formatDate(project.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <ImageIcon className="h-3 w-3" />
            {project.image_count || 0} 张照片
          </span>
          <Badge variant="outline" className="text-xs">
            {PROJECT_TYPE_LABELS[project.type] || project.type}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">照片</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {project.images.map((img) => (
              <div key={img.id} className="aspect-square rounded-lg overflow-hidden border bg-muted/10">
                <img
                  src={img.thumbnail_url || img.public_url}
                  alt={img.original_filename}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Reports */}
      {project.ai_reports && project.ai_reports.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">AI 分析报告</h2>
          {project.ai_reports.map((report) => (
            <Card key={report.id} className="mb-6">
              <CardContent className="p-6 space-y-6">
                {report.overall_score != null && (
                  <ScoreDisplay score={report.overall_score} size="sm" />
                )}
                <Separator />
                {report.technical_analysis && Object.keys(report.technical_analysis).length > 0 && (
                  <TechnicalAnalysis data={report.technical_analysis} />
                )}
                {report.composition_analysis && Object.keys(report.composition_analysis).length > 0 && (
                  <>
                    <Separator />
                    <CompositionAnalysis data={report.composition_analysis} />
                  </>
                )}
                {report.suggestions && report.suggestions.length > 0 && (
                  <>
                    <Separator />
                    <ImprovementSuggestions suggestions={report.suggestions} />
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(!project.images || project.images.length === 0) && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">项目中还没有照片</h3>
            <p className="text-muted-foreground mb-4">
              前往 AI 分析页面，上传照片并将分析结果保存到此项目
            </p>
            <Link href="/analyze">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                开始分析
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
