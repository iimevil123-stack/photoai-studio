import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/constants"

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateImageFile(file: File): ValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `文件大小不能超过10MB，当前文件大小：${(file.size / (1024 * 1024)).toFixed(1)}MB`,
    }
  }

  if (file.size === 0) {
    return { valid: false, error: "文件为空，请选择有效的图片文件" }
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `不支持的图片格式，支持的格式：JPEG、PNG、WebP、HEIC`,
    }
  }

  return { valid: true }
}

export function validateImageBuffer(buffer: Buffer, mimeType: string): ValidationResult {
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `文件大小超过限制`,
    }
  }

  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return { valid: false, error: `不支持的图片格式` }
  }

  return { valid: true }
}
