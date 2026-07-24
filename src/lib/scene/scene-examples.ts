// ============================================================
// Scene Examples — 场景案例数据接口
// ============================================================
// 所有图片 URL 统一来自 @/lib/images，方便未来替换真实 AI 生成图。
//
// 替换为真实 AI 图片时：
//   1. 更新 images.ts 中对应 SCENE_EXAMPLES 的 after.primary
//   2. 所有组件自动显示真实 AI 效果
//   3. 无需修改任何组件代码
// ============================================================

import type { SceneTemplateId } from "@/services/ai/types"
import {
  SCENE_EXAMPLES,
  type SceneExamplePair,
  type SceneStyleVariant,
} from "@/lib/images"

// Re-export types
export type { SceneExamplePair, SceneStyleVariant }

/** 获取指定场景的所有案例（3 组 Before/After） */
export function getSceneExamples(scene: SceneTemplateId): SceneExamplePair[] {
  return SCENE_EXAMPLES[scene]?.pairs ?? []
}

/** 获取指定场景的风格变体（3 种风格） */
export function getSceneStyles(scene: SceneTemplateId): SceneStyleVariant[] {
  return SCENE_EXAMPLES[scene]?.styles ?? []
}

/** 获取指定场景第 N 个案例 */
export function getSceneExample(scene: SceneTemplateId, index: number): SceneExamplePair | undefined {
  return SCENE_EXAMPLES[scene]?.pairs[index]
}

/** 获取所有已定义案例的场景 ID 列表 */
export function getScenesWithExamples(): SceneTemplateId[] {
  return Object.keys(SCENE_EXAMPLES) as SceneTemplateId[]
}

/** 检查某场景是否有示例数据 */
export function hasExamples(scene: SceneTemplateId): boolean {
  return scene in SCENE_EXAMPLES
}
