import { createAdminClient } from "@/lib/supabase/admin"
import { STORAGE_BUCKET_UPLOADS } from "@/lib/constants"
import { processImage, generateThumbnail, getImageDimensions } from "./process"
import { validateImageBuffer } from "./validation"

export interface UploadResult {
  id: string
  url: string
  thumbnailUrl: string | null
  storagePath: string
  width: number
  height: number
}

/**
 * Upload image to Supabase Storage:
 * 1. Process image (resize, convert to WebP, strip EXIF)
 * 2. Generate thumbnail
 * 3. Upload both to Supabase Storage
 * 4. Return public URLs
 */
export async function uploadImage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  userId?: string
): Promise<UploadResult> {
  // Validate
  const validation = validateImageBuffer(fileBuffer, mimeType)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  const supabase = createAdminClient()

  // Process
  const processed = await processImage(fileBuffer)
  const dimensions = await getImageDimensions(fileBuffer)
  const thumbnail = await generateThumbnail(fileBuffer)

  // Generate paths
  const imageId = crypto.randomUUID()
  const userPath = userId || "guests"
  const storagePath = `${userPath}/${imageId}.webp`
  const thumbPath = `${userPath}/${imageId}_thumb.webp`

  // Upload main image
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET_UPLOADS)
    .upload(storagePath, processed.buffer, {
      contentType: "image/webp",
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`图片上传失败: ${uploadError.message}`)
  }

  // Upload thumbnail
  const { error: thumbError } = await supabase.storage
    .from(STORAGE_BUCKET_UPLOADS)
    .upload(thumbPath, thumbnail.buffer, {
      contentType: "image/webp",
      upsert: false,
    })

  // Get public URLs
  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET_UPLOADS).getPublicUrl(storagePath)

  const {
    data: { publicUrl: thumbUrl },
  } = supabase.storage.from(STORAGE_BUCKET_UPLOADS).getPublicUrl(thumbPath)

  return {
    id: imageId,
    url: publicUrl,
    thumbnailUrl: thumbError ? null : thumbUrl,
    storagePath,
    width: dimensions.width,
    height: dimensions.height,
  }
}
