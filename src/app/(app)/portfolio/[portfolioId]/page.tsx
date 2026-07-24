"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Globe,
  Palette,
  Tag,
  Calendar,
  ImageIcon,
  Sparkles,
  Edit3,
  Trash2,
  CheckCircle2,
  Copy,
  Eye,
  Camera,
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Portfolio } from "@/types"

export default function PortfolioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.portfolioId as string

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/portfolio")
        if (res.ok) {
          const data = await res.json()
          const found = (data.portfolios || []).find(
            (p: Portfolio) => p.id === portfolioId
          )
          if (found) {
            setPortfolio(found)
          } else {
            setNotFound(true)
          }
        } else {
          setNotFound(true)
        }
      } catch {
        setNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPortfolio()
  }, [portfolioId])

  const handleDelete = async () => {
    if (!confirm("确定删除这个作品集吗？此操作不可恢复。")) return
    try {
      // Note: DELETE endpoint not yet implemented in API
      toast.error("删除功能即将上线")
    } catch {
      toast.error("删除失败")
    }
  }

  const handleCopyLink = () => {
    const link = portfolio?.siteSlug
      ? `${window.location.origin}/share/${portfolio.siteSlug}`
      : window.location.href
    navigator.clipboard.writeText(link).then(
      () => toast.success("链接已复制"),
      () => toast.error("复制失败")
    )
  }

  // ---- Loading ----
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  // ---- Not Found ----
  if (notFound || !portfolio) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Camera className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <h2 className="text-xl font-bold mb-2">作品集不存在</h2>
        <p className="text-muted-foreground mb-6">
          该作品集可能已被删除，或你没有访问权限
        </p>
        <Link href="/portfolio">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回作品集列表
          </Button>
        </Link>
      </div>
    )
  }

  const style = portfolio.styleAnalysis

  return (
    <div className="space-y-8">
      {/* ---- 顶部导航 ---- */}
      <div className="flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回作品集列表
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyLink}>
            <Share2 className="mr-1.5 h-4 w-4" />
            分享
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="mr-1.5 h-4 w-4" />
            删除
          </Button>
        </div>
      </div>

      {/* ---- 色彩展示 Hero ---- */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* 色彩条背景 */}
        <div className="flex h-48 sm:h-56">
          {(style?.colorPalette || ["#1a1a2e", "#2d2d44", "#8b7d6b", "#d4c5b9", "#f5f0eb"]).map(
            (color: string, i: number) => (
              <div
                key={i}
                className="flex-1 relative group cursor-default"
                style={{ backgroundColor: color }}
              >
                {/* 色号提示 */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/70 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {color}
                </div>
              </div>
            )
          )}
        </div>

        {/* 渐变叠加 + 标题 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between w-full gap-4">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{portfolio.name}</h1>
                {portfolio.isPublished ? (
                  <Badge className="bg-green-500/90 text-white border-0 text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    已发布
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <Edit3 className="h-3 w-3 mr-1" />
                    草稿
                  </Badge>
                )}
              </div>
              {portfolio.description && (
                <p className="text-white/70 text-sm max-w-lg">{portfolio.description}</p>
              )}
            </div>
            {style?.detectedStyle && (
              <Badge className="self-start bg-white/15 backdrop-blur-sm text-white border-white/20 text-sm px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {style.detectedStyle}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ---- 主体内容 ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左：风格分析详情 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 色彩分析 */}
          <Card>
            <CardContent className="p-5 sm:p-6 space-y-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500" />
                色彩分析
              </h2>

              {style ? (
                <>
                  {/* 色板 */}
                  <div className="flex gap-1.5">
                    {style.colorPalette.map((color: string, i: number) => (
                      <div key={i} className="flex-1 space-y-2">
                        <div
                          className="h-16 rounded-lg ring-1 ring-border/30 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-[10px] text-muted-foreground text-center font-mono">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 饱和度信息 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-surface-1 p-3">
                      <p className="text-xs text-muted-foreground mb-1">饱和度</p>
                      <p className="text-lg font-bold">{style.saturationLevel}</p>
                    </div>
                    <div className="rounded-lg bg-surface-1 p-3">
                      <p className="text-xs text-muted-foreground mb-1">风格标签</p>
                      <p className="text-lg font-bold">{style.detectedStyle}</p>
                    </div>
                  </div>

                  {/* 关键词 */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      风格关键词
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {style.keywords.map((kw: string) => (
                        <Badge key={kw} variant="secondary" className="text-xs">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Palette className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">AI 尚未生成风格分析</p>
                  <p className="text-xs">返回作品集列表，使用生成器创建</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 作品图片区 */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-amber-500" />
                  作品图片
                </h2>
                <Badge variant="secondary" className="text-xs">0 张</Badge>
              </div>

              {/* 空图片状态 */}
              <div className="rounded-xl border-2 border-dashed border-border/50 p-10 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">暂无作品图片</p>
                <p className="text-xs text-muted-foreground/60 mb-4">
                  上传图片后将在此展示，并自动进行风格分析
                </p>
                <Link href="/analyze">
                  <Button variant="outline" size="sm">
                    去上传分析
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右：信息侧栏 */}
        <div className="space-y-4">
          {/* 基本信息 */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-sm">作品集信息</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    创建时间
                  </span>
                  <span className="font-medium">{formatDate(portfolio.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Edit3 className="h-3.5 w-3.5" />
                    最后更新
                  </span>
                  <span className="font-medium">{formatDate(portfolio.updatedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    发布状态
                  </span>
                  {portfolio.isPublished ? (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      已发布
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">草稿</Badge>
                  )}
                </div>
              </div>

              <Separator />

              {/* 分享链接 */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">分享链接</p>
                {portfolio.siteSlug ? (
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-muted rounded-lg px-3 py-2 truncate">
                      /share/{portfolio.siteSlug}
                    </code>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleCopyLink}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/60">
                    发布后将生成专属分享链接
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 预览按钮 */}
          {portfolio.isPublished && portfolio.siteSlug && (
            <Link href={`/share/${portfolio.siteSlug}`}>
              <Button className="w-full gap-2" variant="outline">
                <Eye className="h-4 w-4" />
                预览公开页面
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}

          {/* 发布按钮 */}
          {!portfolio.isPublished && (
            <Button
              className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => toast.error("发布功能即将上线")}
            >
              <Globe className="h-4 w-4" />
              发布作品集
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
