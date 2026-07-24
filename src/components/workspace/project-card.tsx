"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, ImageIcon, Calendar, Trash2, MoreHorizontal } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from "@/lib/constants"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  onDelete?: (projectId: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [showActions, setShowActions] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete && confirm(`确定删除项目「${project.name}」吗？此操作不可恢复。`)) {
      onDelete(project.id)
    }
  }

  return (
    <Link href={`/workspace/${project.id}`}>
      <Card
        className="group relative hover:shadow-card-hover card-lift cursor-pointer h-full overflow-hidden"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardContent className="p-0">
          {/* ---- 封面区域 ---- */}
          <div className="aspect-[16/10] bg-gradient-to-br from-muted/50 via-muted to-muted/30 flex items-center justify-center overflow-hidden relative">
            {project.coverImageUrl ? (
              <img
                src={project.coverImageUrl}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FolderOpen className="h-12 w-12 text-muted-foreground/25" />
                <span className="text-[10px] text-muted-foreground/40 font-medium">
                  {PROJECT_TYPE_LABELS[project.type] || project.type}
                </span>
              </div>
            )}

            {/* 悬停渐变叠加 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* 悬停快捷操作 */}
            <div
              className={`absolute top-3 right-3 flex gap-1.5 transition-all duration-200 ${
                showActions ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-red-500/80 text-white/80 hover:text-white transition-colors"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* 状态徽章（左上角） */}
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="text-[10px] px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white border-0"
              >
                {PROJECT_STATUS_LABELS[project.status] || project.status}
              </Badge>
            </div>

            {/* 照片数量（左下角） */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/80 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-0.5">
              <ImageIcon className="h-3 w-3" />
              {project.imageCount}
            </div>
          </div>

          {/* ---- 信息区域 ---- */}
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-amber-500 transition-colors">
                {project.name}
              </h3>
              <Badge variant="outline" className="shrink-0 text-[10px] px-1.5 py-0">
                {PROJECT_TYPE_LABELS[project.type] || project.type}
              </Badge>
            </div>

            {project.description ? (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground/50 italic">
                暂无描述
              </p>
            )}

            <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60 pt-1">
              <Calendar className="h-3 w-3" />
              {formatRelativeTime(project.updatedAt)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
