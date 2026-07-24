"use client"

import { useCallback, useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatFileSize } from "@/lib/utils"
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants"

interface ImageUploadZoneProps {
  onUpload: (file: File) => Promise<void>
  isUploading: boolean
}

export function ImageUploadZone({ onUpload, isUploading }: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback(
    async (file: File) => {
      // Client-side validation
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return
      }
      // Show preview
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
      // Upload
      await onUpload(file)
    },
    [onUpload]
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

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-colors",
        isDragging
          ? "border-amber-500 bg-amber-500/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        isUploading && "opacity-50 pointer-events-none"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={isUploading}
      />

      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {preview ? (
          <div className="relative w-full max-w-sm">
            <img
              src={preview}
              alt="预览"
              className="w-full rounded-lg shadow-md object-contain max-h-64"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-background shadow border"
              onClick={(e) => { e.stopPropagation(); setPreview(null) }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">
              拖拽图片到此处，或点击选择
            </p>
            <p className="text-xs text-muted-foreground">
              支持 JPEG、PNG、WebP、HEIC，最大 {formatFileSize(MAX_FILE_SIZE_BYTES)}
            </p>
          </>
        )}
      </div>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">上传中...</p>
          </div>
        </div>
      )}
    </div>
  )
}
