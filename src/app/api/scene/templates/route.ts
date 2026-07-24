import { NextResponse } from "next/server"
import { SCENE_TEMPLATES } from "@/lib/scene/templates"

/**
 * GET /api/scene/templates
 * 返回所有可用的场景模板列表
 */
export async function GET() {
  const templates = SCENE_TEMPLATES.map(
    ({ id, name, subtitle, description, icon, gradient, defaultPrompt, promptPlaceholder, suggestedStrength, tags, features }) => ({
      id,
      name,
      subtitle,
      description,
      icon,
      gradient,
      defaultPrompt,
      promptPlaceholder,
      suggestedStrength,
      tags,
      features,
    })
  )

  return NextResponse.json({ templates })
}
