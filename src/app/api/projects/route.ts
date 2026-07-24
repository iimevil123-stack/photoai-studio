import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { getAll() { return request.cookies.getAll() }, setAll() {} },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "请先登录" } }, { status: 401 })
  }

  const adminDb = createAdminClient()
  const { data: projects, error } = await adminDb
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: "获取项目列表失败" } }, { status: 500 })
  }

  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { getAll() { return request.cookies.getAll() }, setAll() {} },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "请先登录" } }, { status: 401 })
  }

  const body = await request.json()
  const { name, description, type } = body

  if (!name) {
    return NextResponse.json({ error: { code: "MISSING_NAME", message: "请输入项目名称" } }, { status: 400 })
  }

  const adminDb = createAdminClient()
  const { data: project, error } = await adminDb
    .from("projects")
    .insert({
      user_id: user.id,
      name,
      description: description || null,
      type: type || "general",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: "创建项目失败" } }, { status: 500 })
  }

  return NextResponse.json({ project })
}
