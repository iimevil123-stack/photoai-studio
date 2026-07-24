import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, ImageIcon, Calendar } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from "@/lib/constants"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/workspace/${project.id}`}>
      <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full">
        <CardContent className="p-5">
          {/* Cover area */}
          <div className="aspect-video rounded-lg bg-gradient-to-br from-muted/50 to-muted mb-4 flex items-center justify-center overflow-hidden">
            {project.coverImageUrl ? (
              <img
                src={project.coverImageUrl}
                alt={project.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <FolderOpen className="h-10 w-10 text-muted-foreground/30" />
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-amber-500 transition-colors">
                {project.name}
              </h3>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {PROJECT_TYPE_LABELS[project.type] || project.type}
              </Badge>
            </div>

            {project.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                {project.imageCount} 张
              </span>
              <span className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">|</span>
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 font-normal"
                >
                  {PROJECT_STATUS_LABELS[project.status] || project.status}
                </Badge>
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatRelativeTime(project.updatedAt)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
