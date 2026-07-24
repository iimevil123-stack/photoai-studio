"use client"

import { useCallback, useState, useRef } from "react"
import { Upload, X, FileImage, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn, formatFileSize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MAX_FILE_SIZE_BYTES, ALLOWED_MIME_TYPES } from "@/lib/constants"

interface ImageUploadZoneProps {
  onUpload: (file: File) => Promise<void>
  isUploading: boolean
  /** 上传进度 0-100（可选，不传则显示旋转spinner） */
  uploadProgress?: number
  /** 上传速度，如 "2.4 MB/s"（可选） */
  uploadSpeed?: string
}

/**
 * 图片上传区域 — 拖拽/点击上传 + 预览 + 进度条 + 错误提示
 *
 * 状态流转：
 *   idle → dragging → preview → uploading(progress) → success ✓
 *                                              → error ✗ → retry
 */
export function ImageUploadZone({
  onUpload,
  isUploading,
  uploadProgress,
  uploadSpeed,
}: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // 清除状态
  const resetState = useCallback(() => {
    setPreview(null)
    setPreviewFile(null)
    setError(null)
    setUploadSuccess(false)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  // 验证文件
  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `文件过大（最大 ${formatFileSize(MAX_FILE_SIZE_BYTES)}，当前 ${formatFileSize(file.size)}）`
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
      return "不支持的图片格式，请上传 JPEG / PNG / WebP / HEIC"
    }
    return null
  }, [])

  const handleFile = useCallback(
    async (file: File) => {
      // 验证
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      setError(null)
      setUploadSuccess(false)

      // 显示预览
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
      setPreviewFile(file)

      // 上传
      try {
        await onUpload(file)
        setUploadSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "上传失败，请重试")
      }
    },
    [onUpload, validateFile]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    resetState()
  }

  // ---- 渲染逻辑 ----

  // 上传成功状态
  if (uploadSuccess) {
    return (
      <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10 p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center animate-fade-in-scale">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">上传成功</p>
            {previewFile && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {previewFile.name} · {formatFileSize(previewFile.size)}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetState} className="text-xs">
            重新上传
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* ---- 上传区域 ---- */}
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-amber-500 bg-amber-500/10 scale-[1.01] shadow-glow-amber"
            : error
              ? "border-red-400/50 bg-red-50/30 dark:bg-red-950/10"
              : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-surface-1",
          isUploading && "pointer-events-none"
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center py-10 px-6 text-center min-h-[200px]">
          {preview ? (
            /* ---- 预览模式 ---- */
            <div className="relative w-full max-w-sm">
              <img
                src={preview}
                alt="预览"
                className="w-full rounded-xl shadow-photo-md object-contain max-h-72 bg-black/5 dark:bg-white/5"
              />
              {/* 图片信息标签 */}
              {previewFile && (
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] bg-black/60 text-white rounded-full px-2 py-0.5 backdrop-blur-sm">
                    <FileImage className="h-3 w-3" />
                    {previewFile.name}
                  </span>
                  <span className="inline-flex items-center text-[10px] bg-black/60 text-white rounded-full px-2 py-0.5 backdrop-blur-sm">
                    {formatFileSize(previewFile.size)}
                  </span>
                </div>
              )}
              {/* 删除按钮 */}
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background shadow-md border border-border/50 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            /* ---- 空状态 ---- */
            <>
              {/* 上传图标 */}
              <div
                className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                  isDragging
                    ? "bg-amber-100 dark:bg-amber-900/30 scale-110 shadow-glow-amber"
                    : "bg-muted"
                )}
              >
                {isDragging ? (
                  <Upload className="h-7 w-7 text-amber-500 animate-bounce-slow" />
                ) : (
                  <Upload className="h-7 w-7 text-muted-foreground/60" />
                )}
              </div>

              {/* 提示文字 */}
              <p className="text-sm font-medium mb-1">
                {isDragging ? "松开即可上传" : "拖拽图片到此处，或点击选择"}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                支持 JPEG · PNG · WebP · HEIC，最大 {formatFileSize(MAX_FILE_SIZE_BYTES)}
              </p>

              {/* 支持的格式标签 */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {["JPEG", "PNG", "WebP", "HEIC"].map((fmt) => (
                  <span
                    key={fmt}
                    className="inline-flex text-[10px] text-muted-foreground/60 bg-surface-2 rounded-full px-2 py-0.5 font-medium"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ---- 上传中遮罩 ---- */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
            <div className="text-center px-6 w-full max-w-[240px]">
              {uploadProgress !== undefined && uploadProgress > 0 ? (
                /* 进度条模式 */
                <>
                  <Progress
                    value={uploadProgress}
                    className="h-2 mb-3"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      上传中
                    </span>
                    <span className="font-mono font-medium tabular-nums">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  {uploadSpeed && (
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{uploadSpeed}</p>
                  )}
                </>
              ) : (
                /* 旋转spinner模式（兼容旧版） */
                <>
                  <div className="h-10 w-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">上传中...</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---- 错误提示 ---- */}
      {error && (
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-sm animate-fade-in-up">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto py-0.5 px-2 text-xs text-red-600 hover:text-red-700 shrink-0"
            onClick={() => setError(null)}
          >
            关闭
          </Button>
        </div>
      )}
    </div>
  )
}
