"use client"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants"
import { formatFileSize } from "@/lib/utils"

interface Props {
  imageUrl: string | null
  onImageChange: (url: string | null) => void
  disabled?: boolean
}

export function ImageUploadPanel({ imageUrl, onImageChange, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE_BYTES) return

      setIsUploading(true)
      try {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) throw new Error("上传失败")

        const data = await res.json()
        onImageChange(data.url)
      } catch {
        // silent fail
      } finally {
        setIsUploading(false)
      }
    },
    [onImageChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile, disabled]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  if (imageUrl) {
    return (
      <div className="relative rounded-xl overflow-hidden border bg-muted/5 group">
        <img
          src={imageUrl}
          alt="原始图片"
          className="w-full h-auto max-h-[400px] object-contain"
        />
        {!disabled && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur shadow border opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onImageChange(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-colors min-h-[200px] flex items-center justify-center",
        isDragging
          ? "border-amber-500 bg-amber-500/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        (disabled || isUploading) && "opacity-50 pointer-events-none"
      )}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={disabled || isUploading}
      />

      <div className="text-center py-8 px-6">
        {isUploading ? (
          <>
            <div className="h-10 w-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">上传中...</p>
          </>
        ) : (
          <>
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">拖拽或点击上传图片</p>
            <p className="text-xs text-muted-foreground">
              JPEG、PNG、WebP，最大 {formatFileSize(MAX_FILE_SIZE_BYTES)}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
