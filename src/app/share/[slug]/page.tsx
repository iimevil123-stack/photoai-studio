import { Metadata } from "next"
import { notFound } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { Camera, Share2, Palette, Tag, Download, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ============================================================
// 公开作品集展示页 — 无需登录即可访问
// ============================================================

interface SharePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const portfolio = await getPortfolioBySlug(params.slug)
  if (!portfolio) {
    return { title: "作品集未找到 - PhotoAI Studio" }
  }
  const style = portfolio.styleAnalysis as Record<string, any> | null
  return {
    title: `${portfolio.name} - PhotoAI Studio`,
    description: portfolio.description || `由 AI 生成的${style?.detectedStyle || "摄影"}风格作品集`,
    openGraph: {
      title: portfolio.name,
      description: portfolio.description || undefined,
      type: "website",
    },
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const portfolio = await getPortfolioBySlug(params.slug)

  if (!portfolio) {
    notFound()
  }

  const style = (portfolio.styleAnalysis || {}) as Record<string, any>

  return (
    <div className="min-h-screen bg-background">
      {/* ---- Hero Banner ---- */}
      <div className="relative">
        {/* 色彩条 */}
        <div className="flex h-64 sm:h-80">
          {(style.colorPalette || ["#1a1a2e", "#2d2d44", "#8b7d6b", "#d4c5b9", "#f5f0eb"]).map(
            (color: string, i: number) => (
              <div
                key={i}
                className="flex-1 transition-all duration-500 hover:flex-[1.5] cursor-default relative group"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white/70 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 font-mono">
                    {color}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* 渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
          <div className="w-full max-w-5xl mx-auto px-6 pb-8 sm:pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight">
                  {portfolio.name}
                </h1>
                {portfolio.description && (
                  <p className="text-white/65 text-base sm:text-lg max-w-xl">
                    {portfolio.description}
                  </p>
                )}
                {style.detectedStyle && (
                  <Badge className="mt-3 bg-white/15 backdrop-blur-sm text-white border-white/20 text-sm px-3 py-1.5">
                    ✨ {style.detectedStyle}
                  </Badge>
                )}
              </div>

              {/* 品牌标识 */}
              <div className="flex items-center gap-2 text-white/60 text-sm shrink-0">
                <span>Powered by</span>
                <Link href="/" className="flex items-center gap-1.5 font-semibold text-white hover:text-amber-400 transition-colors">
                  <Camera className="h-4 w-4" />
                  光影智助
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- 主体内容 ---- */}
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 space-y-12">
        {/* 色彩分析 */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-500" />
            色彩风格
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(style.colorPalette || []).map((color: string, i: number) => (
              <div key={i} className="space-y-2">
                <div
                  className="aspect-square rounded-2xl shadow-photo-md ring-1 ring-black/5 transition-transform hover:scale-105"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-center text-muted-foreground font-mono">{color}</p>
              </div>
            ))}
          </div>

          {/* 风格属性 */}
          {(style.detectedStyle || style.saturationLevel) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {style.detectedStyle && (
                <div className="rounded-xl bg-surface-1 p-4">
                  <p className="text-xs text-muted-foreground mb-1">AI 检测风格</p>
                  <p className="text-lg font-bold">{style.detectedStyle}</p>
                </div>
              )}
              {style.saturationLevel && (
                <div className="rounded-xl bg-surface-1 p-4">
                  <p className="text-xs text-muted-foreground mb-1">饱和度</p>
                  <p className="text-lg font-bold">{style.saturationLevel}</p>
                </div>
              )}
              {(style.keywords || []).length > 0 && (
                <div className="rounded-xl bg-surface-1 p-4">
                  <p className="text-xs text-muted-foreground mb-1">关键词</p>
                  <p className="text-lg font-bold">{(style.keywords || []).length} 个标签</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 关键词 */}
        {(style.keywords || []).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-amber-500" />
              风格标签
            </h2>
            <div className="flex flex-wrap gap-2">
              {(style.keywords || []).map((kw: string) => (
                <Badge key={kw} variant="secondary" className="text-sm px-3 py-1.5">
                  {kw}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* 作品展示区 */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            作品展示
          </h2>

          {/* 占位 — 未来接入真实图片 */}
          <div className="rounded-2xl border-2 border-dashed border-border/50 bg-surface-1 p-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">即将展示作品图片</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              摄影师正在整理作品集，精彩作品即将上线。敬请期待。
            </p>
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="text-center pt-8 border-t">
          <p className="text-muted-foreground mb-4">
            想要创建你自己的作品集？
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/auth/register">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                免费注册
                <Camera className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">了解更多</Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground/50 mt-6">
            Powered by 光影智助 PhotoAI Studio · AI 摄影创作助手
          </p>
        </section>
      </div>
    </div>
  )
}

// ============================================================
// 数据获取
// ============================================================

async function getPortfolioBySlug(slug: string) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("site_slug", slug)
      .eq("is_published", true)
      .single()

    if (error || !data) return null

    // Map DB fields to Portfolio type
    return {
      id: data.id,
      userId: data.user_id,
      projectId: data.project_id,
      name: data.name,
      description: data.description,
      styleAnalysis: data.style_analysis || {},
      templateId: data.template_id,
      siteSlug: data.site_slug,
      isPublished: data.is_published ?? false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch {
    return null
  }
}
