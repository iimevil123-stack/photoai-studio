"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProjectCard } from "@/components/workspace/project-card"
import { CreateProjectDialog } from "@/components/workspace/create-project-dialog"
import {
  FolderOpen,
  Upload,
  TrendingUp,
  Sparkles,
  Camera,
  Wand2,
  ClipboardList,
  Search,
  X,
  ArrowRight,
  ImageIcon,
  Zap,
} from "lucide-react"
import { toast } from "sonner"
import type { Project } from "@/types"

const PROJECT_TYPES = ["general", "portrait", "wedding", "landscape", "commercial", "event", "street"] as const
const TYPE_LABELS: Record<string, string> = {
  general: "通用", portrait: "人像", wedding: "婚礼", landscape: "风景",
  commercial: "商业", event: "活动", street: "街拍",
}

export default function WorkspacePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

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

  const handleDelete = useCallback(async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId))
        toast.success("项目已删除")
      } else {
        toast.error("删除失败")
      }
    } catch {
      toast.error("删除失败")
    }
  }, [])

  // 筛选
  const filteredProjects = useMemo(() => {
    let result = projects
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }
    if (typeFilter) {
      result = result.filter((p) => p.type === typeFilter)
    }
    return result
  }, [projects, search, typeFilter])

  // 统计
  const stats = useMemo(() => {
    const totalProjects = projects.length
    const totalImages = projects.reduce((sum, p) => sum + (p.imageCount || 0), 0)
    const recentProjects = projects.filter((p) => {
      const updated = new Date(p.updatedAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return updated > weekAgo
    }).length
    return { totalProjects, totalImages, recentProjects }
  }, [projects])

  return (
    <div className="space-y-8">
      {/* ---- Header ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">我的工作空间</h1>
          <p className="text-muted-foreground mt-1">管理你的摄影项目和 AI 分析记录</p>
        </div>
        <CreateProjectDialog onCreated={fetchProjects} />
      </div>

      {/* ---- 快速入口 ---- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            href: "/analyze",
            icon: Camera,
            label: "照片分析",
            desc: "AI 评分诊断",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            href: "/scene",
            icon: Wand2,
            label: "场景创作",
            desc: "风格化生成",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            href: "/plan",
            icon: ClipboardList,
            label: "拍摄策划",
            desc: "AI 方案生成",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            href: "/portfolio",
            icon: FolderOpen,
            label: "我的作品集",
            desc: "展示分享",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="group hover:shadow-photo-md card-lift cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Separator />

      {/* ---- 统计卡片 ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <FolderOpen className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{stats.totalProjects}</p>
              <p className="text-sm text-muted-foreground">全部项目</p>
            </div>
            {stats.recentProjects > 0 && (
              <Badge variant="secondary" className="ml-auto shrink-0 text-[10px]">
                <TrendingUp className="h-3 w-3 mr-1" />
                本周 +{stats.recentProjects}
              </Badge>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <ImageIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{stats.totalImages}</p>
              <p className="text-sm text-muted-foreground">照片总数</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-xl font-bold tabular-nums">{stats.totalProjects}</p>
              <p className="text-sm text-muted-foreground">AI 分析报告</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---- 搜索 + 筛选 ---- */}
      {projects.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索项目名称或描述..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={typeFilter === null ? "default" : "outline"}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setTypeFilter(null)}
            >
              全部
            </Badge>
            {PROJECT_TYPES.map((t) => (
              <Badge
                key={t}
                variant={typeFilter === t ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setTypeFilter(typeFilter === t ? null : t)}
              >
                {TYPE_LABELS[t]}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* ---- 项目列表 ---- */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-64 animate-pulse bg-muted/30" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">没有匹配的项目</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => { setSearch(""); setTypeFilter(null) }}
              >
                清除筛选
              </Button>
            </div>
          )}
        </>
      ) : (
        /* ---- 引导式空状态 ---- */
        <Card className="border-dashed">
          <CardContent className="p-8 sm:p-12">
            <div className="max-w-lg mx-auto text-center">
              <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
                <Sparkles className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">开始你的创作之旅</h3>
              <p className="text-muted-foreground mb-8">
                三步开启 AI 摄影工作流
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { step: "1", icon: Upload, title: "上传照片", desc: "拖拽或点击上传", href: "/analyze" },
                  { step: "2", icon: Sparkles, title: "AI 分析", desc: "获取专业诊断报告", href: "/analyze" },
                  { step: "3", icon: Wand2, title: "创作出片", desc: "风格化场景生成", href: "/scene" },
                ].map((item) => (
                  <Link
                    key={item.step}
                    href={item.href}
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-surface-1 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 rounded-full w-5 h-5 flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <CreateProjectDialog onCreated={fetchProjects} />
                <Link href="/analyze">
                  <Button variant="outline" className="gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    直接开始分析
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
