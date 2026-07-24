"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ImageUploadZone } from "@/components/shared/image-upload-zone"
import { ScoreDisplay } from "@/components/analyze/score-display"
import { TechnicalAnalysis } from "@/components/analyze/technical-analysis"
import { CompositionAnalysis } from "@/components/analyze/composition-analysis"
import { ImprovementSuggestions } from "@/components/analyze/improvement-suggestions"
import { ReportSkeleton } from "@/components/analyze/report-skeleton"
import { RegisterPrompt } from "@/components/analyze/register-prompt"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { uploadFileWithProgress } from "@/lib/image/client-upload"
import { formatFileSize } from "@/lib/utils"
import type { AnalyzeResponse, AIReport } from "@/types"
import {
  ImageIcon,
  FolderOpen,
  ClipboardList,
  Palette,
  Share2,
  Clock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Trash2,
} from "lucide-react"

// ---- 本地历史记录 ----
const HISTORY_KEY = "photoai_analysis_history"
const MAX_HISTORY = 10

interface HistoryEntry {
  id: string
  imageUrl: string
  overallScore: number | null
  summary: string
  timestamp: number
}

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(entry: HistoryEntry) {
  const history = loadHistory()
  // 去重（同 URL）
  const filtered = history.filter((h) => h.imageUrl !== entry.imageUrl)
  filtered.unshift(entry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_HISTORY)))
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export default function AnalyzePage() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState<AIReport | null>(null)
  const [isPartial, setIsPartial] = useState(false)
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  // Refresh history when report changes
  useEffect(() => {
    if (report && imageUrl) {
      setHistory(loadHistory())
    }
  }, [report, imageUrl])

  const handleUpload = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      setIsUploading(true)
      setUploadProgress(0)
      setUploadSpeed("")

      uploadFileWithProgress(file, {
        onProgress: (percent, speedBytesPerSec) => {
          setUploadProgress(Math.min(percent, 99))
          if (speedBytesPerSec > 0) {
            setUploadSpeed(formatFileSize(speedBytesPerSec) + "/s")
          }
        },
        onSuccess: async (data) => {
          setUploadProgress(100)
          setImageUrl(data.url)
          toast.success("图片上传成功")
          setIsUploading(false)
          resolve()
          await handleAnalyze(data.url)
        },
        onError: (error) => {
          toast.error(error.message)
          setIsUploading(false)
          setUploadProgress(0)
          reject(error)
        },
      })
    })
  }, [])

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true)
    setReport(null)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "分析失败")
      }

      const data = await res.json()
      const r = data.report as AIReport
      setReport(r)
      setIsPartial(data.isPartial)

      // 保存到本地历史
      saveHistory({
        id: crypto.randomUUID(),
        imageUrl: url,
        overallScore: r.overallScore,
        summary: getScoreVerdict(r.overallScore ?? 0),
        timestamp: Date.now(),
      })

      if (data.isPartial) {
        setShowRegisterPrompt(true)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI分析失败，请稍后重试")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleHistoryClick = (entry: HistoryEntry) => {
    setImageUrl(entry.imageUrl)
    setReport(null)
    handleAnalyze(entry.imageUrl)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistory([])
    toast.success("历史记录已清除")
  }

  return (
    <div className="space-y-6">
      {/* ---- Page Header ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">AI 照片分析</h1>
          <p className="text-muted-foreground mt-1">
            上传照片，AI 为你提供专业摄影评分和多维度分析报告
          </p>
        </div>
        {report && (
          <SaveToProjectButton imageUrl={imageUrl} report={report} />
        )}
      </div>

      <Separator />

      {/* ---- Main Content ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Photo + Re-upload */}
        <div className="lg:col-span-3 space-y-4">
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden border bg-muted/10 shadow-photo-sm">
              <img
                src={imageUrl}
                alt="待分析照片"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            </div>
          ) : (
            <ImageUploadZone
              onUpload={handleUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              uploadSpeed={uploadSpeed}
            />
          )}

          {/* Re-upload */}
          {imageUrl && !isAnalyzing && (
            <ImageUploadZone
              onUpload={handleUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              uploadSpeed={uploadSpeed}
            />
          )}

          {/* ---- History Section ---- */}
          {history.length > 0 && (
            <div className="rounded-xl border bg-surface-0 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">最近分析</span>
                  <Badge variant="secondary" className="text-[10px]">{history.length}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto py-1 px-2 text-xs text-muted-foreground hover:text-destructive"
                  onClick={handleClearHistory}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  清空
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleHistoryClick(entry)}
                    className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-500 transition-all duration-200 focus:outline-none focus:border-amber-500 relative group"
                  >
                    <img
                      src={entry.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-center p-1">
                      <span className="text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {entry.overallScore ?? "?"}分
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: AI Report */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardContent className="p-4 sm:p-6 space-y-5">
              {isAnalyzing ? (
                <ReportSkeleton />
              ) : report ? (
                <>
                  {/* ---- 报告摘要 ---- */}
                  {report.overallScore != null && (
                    <div className="space-y-4">
                      <ScoreDisplay score={report.overallScore} />
                      {/* 一句话评价 */}
                      <div className="text-center px-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {getScoreVerdict(report.overallScore)}
                        </p>
                      </div>
                      {/* 三项指标速览 */}
                      {"technicalAnalysis" in report && (
                        <div className="flex justify-center gap-4 text-center">
                          {(["clarity", "exposure", "color"] as const).map((key) => {
                            const dim = report.technicalAnalysis[key]
                            const labels = { clarity: "清晰度", exposure: "曝光", color: "色彩" }
                            const stars = dim?.score ?? 0
                            return (
                              <div key={key} className="flex flex-col items-center">
                                <span className="text-lg font-bold">{stars}</span>
                                <span className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <span
                                      key={s}
                                      className={`text-[10px] ${s <= stars ? "text-amber-400" : "text-muted/20"}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">
                                  {labels[key]}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <Separator />

                  {/* ---- 桌面端：直接展示 / 移动端：Tabs ---- */}
                  {/* 桌面端 */}
                  <div className="hidden sm:block space-y-5">
                    {"technicalAnalysis" in report && (
                      <>
                        <TechnicalAnalysis data={report.technicalAnalysis} />
                        <Separator />
                      </>
                    )}

                    {isPartial && showRegisterPrompt ? (
                      <RegisterPrompt onDismiss={() => setShowRegisterPrompt(false)} />
                    ) : (
                      <>
                        {"compositionAnalysis" in report && (
                          <>
                            <CompositionAnalysis data={report.compositionAnalysis} />
                            <Separator />
                          </>
                        )}
                        {"suggestions" in report && (
                          <ImprovementSuggestions suggestions={report.suggestions} />
                        )}
                      </>
                    )}
                  </div>

                  {/* 移动端：Tab 切换 */}
                  <div className="sm:hidden">
                    <Tabs defaultValue="tech">
                      <TabsList className="w-full">
                        <TabsTrigger value="tech" className="flex-1 text-xs">技术评分</TabsTrigger>
                        <TabsTrigger value="comp" className="flex-1 text-xs">构图</TabsTrigger>
                        <TabsTrigger value="sugg" className="flex-1 text-xs">建议</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tech" className="pt-3">
                        {"technicalAnalysis" in report && (
                          <TechnicalAnalysis data={report.technicalAnalysis} />
                        )}
                      </TabsContent>
                      <TabsContent value="comp" className="pt-3">
                        {isPartial && showRegisterPrompt ? (
                          <RegisterPrompt onDismiss={() => setShowRegisterPrompt(false)} />
                        ) : "compositionAnalysis" in report ? (
                          <CompositionAnalysis data={report.compositionAnalysis} />
                        ) : null}
                      </TabsContent>
                      <TabsContent value="sugg" className="pt-3">
                        {isPartial && showRegisterPrompt ? (
                          <RegisterPrompt onDismiss={() => setShowRegisterPrompt(false)} />
                        ) : "suggestions" in report ? (
                          <ImprovementSuggestions suggestions={report.suggestions} />
                        ) : null}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <Separator />

                  {/* ---- 操作栏 ---- */}
                  <PostAnalysisActions
                    imageUrl={imageUrl}
                    overallScore={report.overallScore ?? undefined}
                    router={router}
                  />
                </>
              ) : (
                /* Empty state */
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-muted-foreground">上传一张照片开始分析</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI 将提供综合评分、技术分析和改进建议
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 子组件
// ============================================================

/** 评分 → 一句话评价 */
function getScoreVerdict(score: number): string {
  if (score >= 90) return "✨ 优秀作品，各方面表现都很出色"
  if (score >= 80) return "👍 整体表现良好，部分细节可进一步优化"
  if (score >= 70) return "📷 不错的照片，光线和构图方面有提升空间"
  if (score >= 60) return "🔧 基础扎实，建议关注曝光和色彩调整"
  return "💡 有较大提升空间，查看下方建议了解如何改进"
}

/** 分析后操作栏 */
function PostAnalysisActions({
  imageUrl,
  overallScore,
  router,
}: {
  imageUrl: string | null
  overallScore?: number
  router: ReturnType<typeof useRouter>
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-muted-foreground tracking-wide">接下来</p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-9 text-xs"
          onClick={() => router.push("/plan")}
        >
          <ClipboardList className="h-3.5 w-3.5 text-blue-500" />
          生成拍摄计划
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-9 text-xs"
          onClick={() => router.push("/postprocess")}
        >
          <Palette className="h-3.5 w-3.5 text-purple-500" />
          后期处理建议
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-9 text-xs"
          onClick={() => {
            if (imageUrl) {
              navigator.clipboard.writeText(imageUrl).then(
                () => toast.success("图片链接已复制"),
                () => toast.error("复制失败")
              )
            }
          }}
        >
          <Share2 className="h-3.5 w-3.5 text-green-500" />
          复制图片链接
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-9 text-xs"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          上传新照片
        </Button>
      </div>
    </div>
  )
}

/** 保存到项目按钮 */
function SaveToProjectButton({
  imageUrl,
  report,
}: {
  imageUrl: string | null
  report: AIReport
}) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!imageUrl || saved) return
    setSaving(true)
    try {
      // 创建一个以分析日期命名的项目
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `AI分析 - ${new Date().toLocaleDateString("zh-CN")}`,
          type: "general",
        }),
      })
      if (res.ok) {
        setSaved(true)
        toast.success("已保存到工作空间")
      } else {
        const err = await res.json()
        throw new Error(err.error?.message || "保存失败")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "保存失败")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleSave}
      disabled={saving || saved}
    >
      {saved ? (
        <>✓ 已保存</>
      ) : saving ? (
        <>保存中...</>
      ) : (
        <>
          <FolderOpen className="h-4 w-4" />
          保存到工作空间
        </>
      )}
    </Button>
  )
}
