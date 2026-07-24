import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { uploadImage } from "@/lib/image/upload"
import { validateImageFile } from "@/lib/image/validation"
// import { STORAGE_BUCKET_UPLOADS } from "@/lib/constants"

export async function POST(request: NextRequest) {
  try {
    // Get user (optional - guests can upload too)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()

    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: { code: "NO_FILE", message: "请选择要上传的图片" } },
        { status: 400 }
      )
    }

    // Validate
    const validation = validateImageFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: validation.error } },
        { status: 400 }
      )
    }

    // Upload and process
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadImage(
      buffer,
      file.name,
      file.type,
      user?.id
    )

    // Return result
    return NextResponse.json({
      id: result.id,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      width: result.width,
      height: result.height,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: {
          code: "UPLOAD_FAILED",
          message: error instanceof Error ? error.message : "图片上传失败，请稍后重试",
        },
      },
      { status: 500 }
    )
  }
}
