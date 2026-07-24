"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SceneHero } from "./scene-hero"
import { CaseShowcase } from "./case-showcase"
import { ImageUploadPanel } from "./image-upload-panel"
import { PromptEditor } from "./prompt-editor"
import { GenerateButton } from "./generate-button"
import type { GenerateState } from "./generate-button"
import { GenerationProgress } from "./generation-progress"
import { ResultViewer } from "./result-viewer"
import type { SceneTemplate } from "@/lib/scene/templates"
import type { GenerateResult, GenerationStep } from "@/services/ai/types"
import type { SceneTemplateId } from "@/services/ai/types"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  template: SceneTemplate
}

export function SceneWorkspace({ template }: Props) {
  // State
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [generateState, setGenerateState] = useState<GenerateState>("idle")
  const [mode, setMode] = useState<"image" | "video">("image")
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [progressPercent, setProgressPercent] = useState(0)
  const [steps, setSteps] = useState<GenerationStep[]>([])

  const canGenerate =
    imageUrl && prompt.trim() && generateState !== "generating"

  // 风格选择回调：追加风格提示词
  const handleSelectStyle = useCallback(
    (suffix: string) => {
      const current = prompt.trim()
      setPrompt(current ? `${current}，${suffix}` : suffix)
      toast.success("风格提示词已填入")
    },
    [prompt]
  )

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return

    setGenerateState("generating")
    setResult(null)
    setCurrentStepIndex(0)
    setProgressPercent(0)

    try {
      const mockSteps: GenerationStep[] =
        mode === "video"
          ? [
              { id: "analyzing", label: "正在分析画面内容...", icon: "Scan", durationMs: 2000 },
              { id: "motion", label: "正在计算运动轨迹...", icon: "Move", durationMs: 2500 },
              { id: "depth", label: "正在生成深度图...", icon: "Layers", durationMs: 3000 },
              { id: "frames", label: "正在渲染视频帧...", icon: "Film", durationMs: 4000 },
              { id: "encoding", label: "正在编码输出视频...", icon: "Video", durationMs: 2500 },
            ]
          : [
              { id: "analyzing", label: "正在分析图片内容...", icon: "Scan", durationMs: 1800 },
              { id: "matching", label: "正在匹配场景风格...", icon: "Palette", durationMs: 1500 },
              { id: "generating", label: "正在生成场景画面...", icon: "Wand2", durationMs: 2200 },
              { id: "refining", label: "正在优化细节表现...", icon: "Sparkles", durationMs: 1800 },
              { id: "rendering", label: "正在渲染高清效果...", icon: "Image", durationMs: 1500 },
              { id: "finalizing", label: "正在完成最终处理...", icon: "CheckCircle2", durationMs: 800 },
            ]

      setSteps(mockSteps)

      for (let i = 0; i < mockSteps.length; i++) {
        setCurrentStepIndex(i)
        setProgressPercent(Math.round(((i + 1) / mockSteps.length) * 100))
        await new Promise((r) => setTimeout(r, mockSteps[i].durationMs + Math.random() * 500))
      }

      const res = await fetch("/api/scene/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          imageUrl,
          prompt,
          mode,
          strength: template.suggestedStrength,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || "生成失败")
      }

      const data = await res.json()
      setResult(data.result)
      setProgressPercent(100)
      setGenerateState("completed")
      toast.success("AI 场景生成完成！")
    } catch (error) {
      setGenerateState("error")
      toast.error(error instanceof Error ? error.message : "生成失败，请重试")
    }
  }, [canGenerate, template, imageUrl, prompt, mode])

  return (
    <div className="space-y-6">
      {/* ---- 返回 + 页面标题 ---- */}
      <div>
        <Link
          href="/scene"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 -ml-2 px-2 py-1 rounded-md transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回场景列表
        </Link>
        <h1 className="text-2xl font-bold">{template.name}</h1>
        <p className="text-muted-foreground mt-1">{template.description}</p>
      </div>

      {/* ---- 顶部：动态案例横幅 ---- */}
      <SceneHero templateId={template.id as SceneTemplateId} sceneName={template.name} />

      <Separator />

      {/* ---- 主区域：左侧工作流 + 右侧案例参考 ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：核心工作流 (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          {/* 模式切换 */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1 w-fit">
            <Button
              variant={mode === "image" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("image")}
              className="h-8"
            >
              图片生成
            </Button>
            <Button
              variant={mode === "video" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("video")}
              className="h-8"
            >
              视频效果
            </Button>
          </div>

          {/* 上传区域 */}
          <ImageUploadPanel
            imageUrl={imageUrl}
            onImageChange={(url) => {
              setImageUrl(url)
              setResult(null)
              setGenerateState("idle")
            }}
            disabled={generateState === "generating"}
          />

          {/* 提示词编辑 */}
          <PromptEditor
            value={prompt}
            onChange={setPrompt}
            defaultPrompt={template.defaultPrompt}
            placeholder={template.promptPlaceholder}
            disabled={generateState === "generating"}
            tags={[template.id]}
          />

          {/* 生成按钮 */}
          <div className="flex justify-center">
            <GenerateButton
              state={generateState}
              onClick={handleGenerate}
              disabled={!canGenerate}
            />
          </div>

          {/* 生成进度 */}
          {generateState === "generating" && steps.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <GenerationProgress
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                  percent={progressPercent}
                  isComplete={false}
                  mode={mode}
                />
              </CardContent>
            </Card>
          )}

          {/* 结果展示 */}
          {result && generateState === "completed" && (
            <Card>
              <CardContent className="p-6">
                <ResultViewer
                  result={result}
                  originalImageUrl={imageUrl!}
                  onRegenerate={handleGenerate}
                  mode={mode}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧：案例参考 (1/4) */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                参考案例与风格
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                查看 AI 在这个场景的效果，选择你喜欢的风格
              </p>
            </div>
            <CaseShowcase
              templateId={template.id as SceneTemplateId}
              onSelectStyle={handleSelectStyle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
