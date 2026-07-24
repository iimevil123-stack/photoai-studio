import sharp from "sharp"
import { PROCESSED_IMAGE_MAX_DIMENSION, THUMBNAIL_MAX_DIMENSION } from "@/lib/constants"

export interface ProcessedImage {
  buffer: Buffer
  width: number
  height: number
  mimeType: string
}

export interface ThumbnailResult {
  buffer: Buffer
  width: number
  height: number
}

/**
 * Process uploaded image:
 * 1. Convert to WebP
 * 2. Resize to max 2048px longest edge
 * 3. Strip EXIF metadata
 */
export async function processImage(inputBuffer: Buffer): Promise<ProcessedImage> {
  const image = sharp(inputBuffer)
  const metadata = await image.metadata()

  // Calculate resize dimensions
  let width = metadata.width || PROCESSED_IMAGE_MAX_DIMENSION
  let height = metadata.height || PROCESSED_IMAGE_MAX_DIMENSION

  if (Math.max(width, height) > PROCESSED_IMAGE_MAX_DIMENSION) {
    const ratio = PROCESSED_IMAGE_MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const buffer = await image
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()

  return {
    buffer,
    width,
    height,
    mimeType: "image/webp",
  }
}

/**
 * Generate thumbnail (400px max dimension)
 */
export async function generateThumbnail(inputBuffer: Buffer): Promise<ThumbnailResult> {
  const image = sharp(inputBuffer)
  const metadata = await image.metadata()

  let width = metadata.width || THUMBNAIL_MAX_DIMENSION
  let height = metadata.height || THUMBNAIL_MAX_DIMENSION

  if (Math.max(width, height) > THUMBNAIL_MAX_DIMENSION) {
    const ratio = THUMBNAIL_MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const buffer = await image
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer()

  return { buffer, width, height }
}

/**
 * Get image dimensions from buffer
 */
export async function getImageDimensions(
  inputBuffer: Buffer
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(inputBuffer).metadata()
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  }
}
