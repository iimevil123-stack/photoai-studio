/**
 * 客户端图片上传辅助 — 支持进度回调
 *
 * 用法：
 *   const { promise, xhr } = uploadWithProgress(file, {
 *     onProgress: (pct, speed) => { ... },
 *     onSuccess: (data) => { ... },
 *     onError: (err) => { ... },
 *   })
 */

export interface UploadProgressCallbacks {
  onProgress?: (percent: number, speedBytesPerSec: number) => void
  onSuccess?: (data: { id: string; url: string; thumbnailUrl: string | null; width: number; height: number }) => void
  onError?: (error: Error) => void
}

export function uploadFileWithProgress(
  file: File,
  callbacks: UploadProgressCallbacks
): XMLHttpRequest {
  const formData = new FormData()
  formData.append("file", file)

  const xhr = new XMLHttpRequest()
  let startTime = Date.now()
  let lastLoaded = 0
  let lastTime = startTime

  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable && callbacks.onProgress) {
      const percent = (e.loaded / e.total) * 100

      // 计算上传速度（每秒更新一次）
      const now = Date.now()
      const timeDiff = (now - lastTime) / 1000
      if (timeDiff >= 1) {
        const bytesDiff = e.loaded - lastLoaded
        const speed = bytesDiff / timeDiff
        lastLoaded = e.loaded
        lastTime = now
        callbacks.onProgress(percent, speed)
      } else {
        callbacks.onProgress(percent, 0)
      }
    }
  })

  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText)
        callbacks.onSuccess?.(data)
      } catch {
        callbacks.onError?.(new Error("解析服务器响应失败"))
      }
    } else {
      try {
        const err = JSON.parse(xhr.responseText)
        callbacks.onError?.(new Error(err.error?.message || `上传失败 (${xhr.status})`))
      } catch {
        callbacks.onError?.(new Error(`上传失败 (${xhr.status})`))
      }
    }
  })

  xhr.addEventListener("error", () => {
    callbacks.onError?.(new Error("网络连接失败，请检查网络后重试"))
  })

  xhr.addEventListener("abort", () => {
    callbacks.onError?.(new Error("上传已取消"))
  })

  xhr.open("POST", "/api/upload")
  xhr.send(formData)

  return xhr
}
