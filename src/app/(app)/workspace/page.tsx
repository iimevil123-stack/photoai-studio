"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectCard } from "@/components/workspace/project-card"
import { CreateProjectDialog } from "@/components/workspace/create-project-dialog"
import { FolderOpen, Upload, TrendingUp } from "lucide-react"
import type { Project } from "@/types"

export default function WorkspacePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(data.projects || [])
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const stats = {
    totalProjects: projects.length,
    totalImages: projects.reduce((sum, p) => sum + (p.imageCount || 0), 0),
    analyzedImages: projects.length, // Simplified - would need actual counts
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">我的工作空间</h1>
          <p className="text-muted-foreground mt-1">管理你的摄影项目和 AI 分析记录</p>
        </div>
        <CreateProjectDialog onCreated={fetchProjects} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
              <p className="text-sm text-muted-foreground">项目</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalImages}</p>
              <p className="text-sm text-muted-foreground">照片</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.analyzedImages}</p>
              <p className="text-sm text-muted-foreground">AI分析</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-64 animate-pulse bg-muted/30" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">还没有项目</h3>
            <p className="text-muted-foreground mb-4">
              上传你的第一张照片，AI 将为你生成专业的摄影分析报告
            </p>
            <CreateProjectDialog onCreated={fetchProjects} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
