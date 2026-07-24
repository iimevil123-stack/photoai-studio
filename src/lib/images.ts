// ============================================================
// PhotoAI Studio — Centralized Image Resources
// ============================================================
// 所有图片 URL 统一管理，支持外部图片和本地 fallback。
//
// 未来接入 AI 生成图片时：
//   1. 将 `primary` 设为由 API 返回的生成结果 URL
//   2. `fallback` 保持为 Unsplash 素材或本地占位图
//   3. 组件中的 <ImageWithFallback> 自动处理加载失败降级
//
// 更换图片来源：只需修改本文件的 URL，所有组件自动更新。
// ============================================================

// ---- 类型定义 ----

export interface ImageSource {
  /** 主图片 URL（外部 CDN 或 API 返回） */
  primary: string
  /** 加载失败时的 fallback（CSS 渐变或本地图片） */
  fallback: string
  /** 是否为 CSS 渐变 fallback（用于设置 background-image） */
  fallbackIsGradient: boolean
  /** Unsplash 图片参数：宽度、质量等 */
  unsplashParams?: string
}

export interface BeforeAfterPair {
  id: string
  label: string
  category: string
  before: ImageSource
  after: ImageSource
}

export interface GalleryItem {
  id: string
  src: ImageSource
  title: string
  category: string
  aspectRatio: "square" | "portrait" | "landscape" | "wide"
}

// ---- Unsplash 基础 URL 工具 ----

const UNSPLASH_BASE = "https://images.unsplash.com"
const UNSPLASH_PARAMS = "w=800&q=80&fit=crop&auto=format"

function unsplash(photoId: string, params?: string): string {
  return `${UNSPLASH_BASE}/${photoId}?${params || UNSPLASH_PARAMS}`
}

// ---- CSS 渐变 Fallback 生成器 ----

/** 为每个场景生成独特的渐变 fallback */
function sceneGradient(colors: string[]): string {
  return `linear-gradient(135deg, ${colors.join(", ")})`
}

/** 普通图片加载失败时使用的灰色渐变 */
function imageFallback(): string {
  return "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
}

// ============================================================
// 0. Hero 区域 — 背景大图
// ============================================================

/** Hero 全屏背景：高质量摄影作品 */
export const HERO_BG_IMAGE: ImageSource = {
  primary: unsplash("photo-1542038784456-1ea8e935640e", "w=1920&q=85&fit=crop&auto=format"),
  fallback: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #0d0d1f 100%)",
  fallbackIsGradient: true,
}

/** Hero 底部预览条 — 展示 AI 能力缩略图 */
export const HERO_PREVIEW_STRIP: ImageSource[] = [
  {
    primary: unsplash("photo-1531746020798-e6953c6e8e04", "w=300&q=75&fit=crop&auto=format"),
    fallback: sceneGradient(["#2d1b69", "#e84393"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1506905925346-21bda4d32df4", "w=300&q=75&fit=crop&auto=format"),
    fallback: sceneGradient(["#0c0c3d", "#0984e3"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1518834107812-67b0b7c58434", "w=300&q=75&fit=crop&auto=format"),
    fallback: sceneGradient(["#1a3a1a", "#2d8a4e"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1554048612-b6a482bc67e5", "w=300&q=75&fit=crop&auto=format"),
    fallback: sceneGradient(["#3d1a1a", "#e17055"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1492691527719-9d1e07e534b4", "w=300&q=75&fit=crop&auto=format"),
    fallback: sceneGradient(["#1a2a3d", "#74b9ff"]),
    fallbackIsGradient: true,
  },
]

// ============================================================
// 1. Hero 区域 — 3 张漂浮 AI 作品卡片
// ============================================================

export const HERO_FLOATING_CARDS: ImageSource[] = [
  {
    primary: unsplash("photo-1531746020798-e6953c6e8e04"),
    fallback: sceneGradient(["#2d1b69", "#e84393", "#fd79a8"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1506905925346-21bda4d32df4"),
    fallback: sceneGradient(["#0c0c3d", "#0984e3", "#74b9ff"]),
    fallbackIsGradient: true,
  },
  {
    primary: unsplash("photo-1518834107812-67b0b7c58434"),
    fallback: sceneGradient(["#1a0a00", "#d35400", "#f39c12"]),
    fallbackIsGradient: true,
  },
]

// ============================================================
// 2. 场景模板封面 — 7 个场景
// ============================================================

export const SCENE_COVERS: Record<string, ImageSource> = {
  portrait: {
    primary: unsplash("photo-1544005313-94ddf0286df2"),
    fallback: sceneGradient(["#2d1b69", "#e84393", "#fd79a8"]),
    fallbackIsGradient: true,
  },
  ecommerce: {
    primary: unsplash("photo-1523275335684-37898b6baf30"),
    fallback: sceneGradient(["#0a1628", "#0984e3", "#74b9ff"]),
    fallbackIsGradient: true,
  },
  landscape: {
    primary: unsplash("photo-1469474968028-56623f02e42e"),
    fallback: sceneGradient(["#0d1b0e", "#00b894", "#55efc4"]),
    fallbackIsGradient: true,
  },
  anime: {
    primary: unsplash("photo-1578632767115-351597cf2477"),
    fallback: sceneGradient(["#1a0a2e", "#7c3aed", "#c084fc"]),
    fallbackIsGradient: true,
  },
  cinematic: {
    primary: unsplash("photo-1485846234645-a62644f84728"),
    fallback: sceneGradient(["#1a0a00", "#e17055", "#fab1a0"]),
    fallbackIsGradient: true,
  },
  poster: {
    primary: unsplash("photo-1507003211169-0a1dd7228f2d"),
    fallback: sceneGradient(["#1c0000", "#e74c3c", "#ff7675"]),
    fallbackIsGradient: true,
  },
  social: {
    primary: unsplash("photo-1558618666-fcd25c85f82e"),
    fallback: sceneGradient(["#1a1200", "#fdcb6e", "#ffeaa7"]),
    fallbackIsGradient: true,
  },
}

// ============================================================
// 3. Before / After 案例 — 3 组对比
// ============================================================

export const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [
  {
    id: "portrait",
    label: "人像精修 · AI光影重塑",
    category: "人像写真",
    before: {
      primary: unsplash("photo-1502823403499-6ccfcf4fb453"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    after: {
      // 未来替换为真实 AI 生成后的图片 URL
      primary: unsplash("photo-1502823403499-6ccfcf4fb453"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
  },
  {
    id: "landscape",
    label: "风景增强 · AI天空替换",
    category: "旅游风景",
    before: {
      primary: unsplash("photo-1500382017468-9049fed747ef"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    after: {
      primary: unsplash("photo-1500382017468-9049fed747ef"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
  },
  {
    id: "product",
    label: "产品升级 · AI场景合成",
    category: "电商产品",
    before: {
      primary: unsplash("photo-1542291026-7eec264c27ff"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    after: {
      primary: unsplash("photo-1542291026-7eec264c27ff"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
  },
]

// ============================================================
// 4. AI 作品展示画廊 — 12 张高质量摄影作品
// ============================================================

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g01",
    src: {
      primary: unsplash("photo-1515886657613-9f3515b0c78f"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "时尚人像 · 棚拍光影",
    category: "人像写真",
    aspectRatio: "portrait",
  },
  {
    id: "g02",
    src: {
      primary: unsplash("photo-1469334031218-e382a71b716b"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "时尚街拍 · 都市色彩",
    category: "人像写真",
    aspectRatio: "portrait",
  },
  {
    id: "g03",
    src: {
      primary: unsplash("photo-1507525428034-b723cf961d3e"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "海岛落日 · HDR增强",
    category: "旅游风景",
    aspectRatio: "landscape",
  },
  {
    id: "g04",
    src: {
      primary: unsplash("photo-1470071459604-3b5ec3a7fe05"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "迷雾山林 · 电影调色",
    category: "旅游风景",
    aspectRatio: "landscape",
  },
  {
    id: "g05",
    src: {
      primary: unsplash("photo-1525904097878-94fb15835963"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "艺术抽象 · 色彩实验",
    category: "海报设计",
    aspectRatio: "square",
  },
  {
    id: "g06",
    src: {
      primary: unsplash("photo-1491553895911-0055eca6402d"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "运动鞋 · 产品场景",
    category: "电商产品",
    aspectRatio: "square",
  },
  {
    id: "g07",
    src: {
      primary: unsplash("photo-1444703686981-a3abbc4d4fe3"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "星空银河 · 天文摄影",
    category: "电影感画面",
    aspectRatio: "landscape",
  },
  {
    id: "g08",
    src: {
      primary: unsplash("photo-1531306728370-e2ebd9d7bb99"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "极光之夜 · 梦幻色彩",
    category: "电影感画面",
    aspectRatio: "landscape",
  },
  {
    id: "g09",
    src: {
      primary: unsplash("photo-1506905925346-21bda4d32df4"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "群山晨曦 · 风光大片",
    category: "旅游风景",
    aspectRatio: "landscape",
  },
  {
    id: "g10",
    src: {
      primary: unsplash("photo-1565299624946-b28f40a0ae38"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "美食摄影 · 色彩还原",
    category: "社交媒体创作",
    aspectRatio: "square",
  },
  {
    id: "g11",
    src: {
      primary: unsplash("photo-1558618666-fcd25c85f82e"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "运动瞬间 · 动态捕捉",
    category: "社交媒体创作",
    aspectRatio: "square",
  },
  {
    id: "g12",
    src: {
      primary: unsplash("photo-1559825481-12a05cc00344"),
      fallback: imageFallback(),
      fallbackIsGradient: true,
    },
    title: "水下世界 · 创意摄影",
    category: "海报设计",
    aspectRatio: "portrait",
  },
]

// ============================================================
// 5. 场景案例 — Before/After 示例图片
// ============================================================
// 每个场景 3 组示例。`after` 与 `before` 使用同一图片，
// 组件通过 CSS filter 模拟 AI 处理效果。
// 未来接入真实 AI：将 `after.primary` 替换为 AI 生成的图片 URL。

export interface SceneExamplePair {
  before: ImageSource
  after: ImageSource
  label: string
  description: string
}

export interface SceneStyleVariant {
  name: string
  preview: ImageSource
  promptSuffix: string
  description: string
}

export const SCENE_EXAMPLES: Record<string, {
  pairs: SceneExamplePair[]
  styles: SceneStyleVariant[]
}> = {
  portrait: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1531746020798-e6953c6e8e04"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1531746020798-e6953c6e8e04"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "自然光 → 棚拍质感",
        description: "AI 重新打光，模拟专业摄影棚的柔光箱效��，皮肤质感细腻通透",
      },
      {
        before: {
          primary: unsplash("photo-1502823403499-6ccfcf4fb453"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1502823403499-6ccfcf4fb453"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "生活照 → 杂志封面",
        description: "背景虚化 + 光影重塑 + 色彩分级，普通人像秒变高级大片",
      },
      {
        before: {
          primary: unsplash("photo-1438761681033-6461ffad8d80"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1438761681033-6461ffad8d80"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "室内光 → 自然窗光",
        description: "模拟大面积落地窗柔光效果，温暖自然的日系写真质感",
      },
    ],
    styles: [
      {
        name: "日系清新",
        preview: SCENE_COVERS.portrait,
        promptSuffix: "日系清新风格，柔光，低饱和，通透",
        description: "明亮柔和，低对比度",
      },
      {
        name: "复古胶片",
        preview: {
          primary: unsplash("photo-1531746020798-e6953c6e8e04"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "复古胶片风格，颗粒感，暖色调",
        description: "胶片颗粒，怀旧暖色",
      },
      {
        name: "高级黑白",
        preview: {
          primary: unsplash("photo-1502823403499-6ccfcf4fb453"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "高级黑白摄影，强对比，戏剧性光影",
        description: "黑白影调，强调光影结构",
      },
    ],
  },

  ecommerce: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1523275335684-37898b6baf30"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1523275335684-37898b6baf30"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "手机随拍 → 商业白底",
        description: "AI 智能抠图并生成纯白背景，均匀布光，材质纹理清晰可见",
      },
      {
        before: {
          primary: unsplash("photo-1542291026-7eec264c27ff"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1542291026-7eec264c27ff"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "平铺拍摄 → 场景展示",
        description: "AI 合成生活方式场景，产品自然融入使用环境，激发购买欲",
      },
      {
        before: {
          primary: unsplash("photo-1560343090-f0409e92791a"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1560343090-f0409e92791a"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "单一角度 → 多角度展示",
        description: "AI 生成不同角度的产品视图，正面 / 45° / 细节特写一键输出",
      },
    ],
    styles: [
      {
        name: "白底棚拍",
        preview: SCENE_COVERS.ecommerce,
        promptSuffix: "纯白背景，商业摄影，高清细节",
        description: "干净专业的商业摄影",
      },
      {
        name: "场景氛围",
        preview: {
          primary: unsplash("photo-1542291026-7eec264c27ff"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "生活方式场景，柔和自然光，氛围感",
        description: "产品融入真实场景",
      },
      {
        name: "极简风格",
        preview: {
          primary: unsplash("photo-1560343090-f0409e92791a"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "极简主义，几何构图，高级灰背景",
        description: "简约构图，突出产品本身",
      },
    ],
  },

  landscape: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1500382017468-9049fed747ef"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1500382017468-9049fed747ef"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "阴天平淡 → HDR 增强",
        description: "AI 提升动态范围，暗部提亮 + 高光压制，恢复天空和地面细节",
      },
      {
        before: {
          primary: unsplash("photo-1469474968028-56623f02e42e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1469474968028-56623f02e42e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "灰白天空 → 黄金时刻",
        description: "AI 天空替换 + 暖色调映射，模拟日落时分的金色光线",
      },
      {
        before: {
          primary: unsplash("photo-1470071459604-3b5ec3a7fe05"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1470071459604-3b5ec3a7fe05"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "雾霾远景 → 通透大片",
        description: "AI 去雾增透 + 色彩分级，远景清晰锐利，色彩饱满通透",
      },
    ],
    styles: [
      {
        name: "国家地理风",
        preview: SCENE_COVERS.landscape,
        promptSuffix: "国家地理风格，饱和色彩，宏大视角",
        description: "高饱和，宏大视觉",
      },
      {
        name: "电影风光",
        preview: {
          primary: unsplash("photo-1500382017468-9049fed747ef"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "电影级调色，青橙对比，宽幅构图",
        description: "青橙影调，电影质感",
      },
      {
        name: "清新自然",
        preview: {
          primary: unsplash("photo-1470071459604-3b5ec3a7fe05"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "明亮通透，自然色彩，清新风格",
        description: "明亮清新，还原自然本色",
      },
    ],
  },

  anime: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1518834107812-67b0b7c58434"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1518834107812-67b0b7c58434"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "街景照片 → 新海诚风格",
        description: "AI 转换为日系动漫质感：柔和色调、细腻光影、唯美天空",
      },
      {
        before: {
          primary: unsplash("photo-1441974231531-c6227db76b6e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1441974231531-c6227db76b6e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "真实森林 → 吉卜力世界",
        description: "AI 转换为宫崎骏风格的魔法森林，柔和的笔触和温暖的色彩",
      },
      {
        before: {
          primary: unsplash("photo-1578632767115-351597cf2477"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1578632767115-351597cf2477"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "城市夜景 → 赛博朋克",
        description: "AI 转换为赛博朋克风格：霓虹灯效、紫色调、科技感都市",
      },
    ],
    styles: [
      {
        name: "新海诚风格",
        preview: SCENE_COVERS.anime,
        promptSuffix: "新海诚动漫风格，唯美天空，细腻光影，柔和色调",
        description: "唯美光影，治愈系画风",
      },
      {
        name: "吉卜力风格",
        preview: {
          primary: unsplash("photo-1441974231531-c6227db76b6e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "吉卜力宫崎骏风格，手绘质感，温暖色调，魔法氛围",
        description: "手绘质感，温暖奇幻",
      },
      {
        name: "赛博朋克",
        preview: {
          primary: unsplash("photo-1578632767115-351597cf2477"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "赛博朋克风格，霓虹灯光，紫色调，未来都市",
        description: "霓虹灯效，科技都市感",
      },
    ],
  },

  cinematic: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1485846234645-a62644f84728"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1485846234645-a62644f84728"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "日常街景 → 好莱坞大片",
        description: "AI 应用青橙色调 + 宽幅裁切 + 变形光晕，普通街景变电影画面",
      },
      {
        before: {
          primary: unsplash("photo-1507003211169-0a1dd7228f2d"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1507003211169-0a1dd7228f2d"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "普通肖像 → 电影角色",
        description: "AI 电影级调色 + 胶片颗粒 + 柔焦，赋予人物故事感和情绪深度",
      },
      {
        before: {
          primary: unsplash("photo-1444703686981-a3abbc4d4fe3"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1444703686981-a3abbc4d4fe3"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "普通夜景 → 科幻电影感",
        description: "AI 冷色调映射 + 蓝紫对比 + 光晕扩散，营造科幻氛围",
      },
    ],
    styles: [
      {
        name: "好莱坞青橙",
        preview: SCENE_COVERS.cinematic,
        promptSuffix: "好莱坞青橙色调，2.35:1宽幅，变形镜头光晕",
        description: "经典青橙对比色调",
      },
      {
        name: "文艺胶片",
        preview: {
          primary: unsplash("photo-1507003211169-0a1dd7228f2d"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "文艺片风格，35mm胶片质感，柔焦，复古暖调",
        description: "胶片质感，人文情怀",
      },
      {
        name: "科幻冷调",
        preview: {
          primary: unsplash("photo-1444703686981-a3abbc4d4fe3"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "科幻风格，蓝紫冷色调，高对比，未来感",
        description: "冷峻蓝紫，未来科技感",
      },
    ],
  },

  poster: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1492691527719-9d1e07e534b4"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1492691527719-9d1e07e534b4"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "普通照片 → 电影海报",
        description: "AI 分析构图 + 智能排版 + 文字叠加，照片变身电影宣传海报",
      },
      {
        before: {
          primary: unsplash("photo-1525904097878-94fb15835963"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1525904097878-94fb15835963"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "平面素材 → 创意海报",
        description: "AI 色彩提取 + 图形化处理 + 大胆排版，生成视觉冲击力海报",
      },
      {
        before: {
          primary: unsplash("photo-1559825481-12a05cc00344"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1559825481-12a05cc00344"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "活动照片 → 宣传海报",
        description: "AI 自动生成多尺寸海报，适配不同社交平台，统一品牌视觉",
      },
    ],
    styles: [
      {
        name: "电影海报",
        preview: SCENE_COVERS.poster,
        promptSuffix: "电影海报设计，戏剧性光影，粗体排版，视觉冲击",
        description: "戏剧性，大标题排版",
      },
      {
        name: "极简设计",
        preview: {
          primary: unsplash("photo-1525904097878-94fb15835963"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "极简海报设计，大量留白，细字体，高级感",
        description: "留白美学，高级简约",
      },
      {
        name: "潮流风格",
        preview: {
          primary: unsplash("photo-1559825481-12a05cc00344"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "潮流海报，撞色设计，街头风格，大胆图形",
        description: "撞色大胆，潮流街头",
      },
    ],
  },

  social: {
    pairs: [
      {
        before: {
          primary: unsplash("photo-1565299624946-b28f40a0ae38"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1565299624946-b28f40a0ae38"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "随手拍 → 小红书爆款",
        description: "AI 调色 + 智能裁切 + 文字叠加，美食照片秒变小红书热门封面",
      },
      {
        before: {
          primary: unsplash("photo-1558618666-fcd25c85f82e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1558618666-fcd25c85f82e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "运动照 → Instagram大片",
        description: "AI 动态模糊 + 色彩增强 + 方形裁切，运动瞬间变社交爆款",
      },
      {
        before: {
          primary: unsplash("photo-1507525428034-b723cf961d3e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        after: {
          primary: unsplash("photo-1507525428034-b723cf961d3e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        label: "旅行照 → 抖音封面",
        description: "AI 竖屏裁切 + 鲜艳调色 + 大标题，旅行照片适配短视频封面",
      },
    ],
    styles: [
      {
        name: "小红书风",
        preview: SCENE_COVERS.social,
        promptSuffix: "小红书风格，清新明亮，暖色调，文字排版",
        description: "明亮清新，适合种草推荐",
      },
      {
        name: "Instagram风",
        preview: {
          primary: unsplash("photo-1558618666-fcd25c85f82e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "Instagram风格，高饱和，色彩鲜明，潮流感",
        description: "高饱和，潮流视觉",
      },
      {
        name: "抖音封面",
        preview: {
          primary: unsplash("photo-1507525428034-b723cf961d3e"),
          fallback: imageFallback(),
          fallbackIsGradient: true,
        },
        promptSuffix: "短视频封面风格，竖屏构图，大标题，视觉冲击",
        description: "竖屏构图，抓眼球标题",
      },
    ],
  },
}

// ============================================================
// 6. 辅助函数
// ============================================================

/** 将 ImageSource 转为可用于 <img> 的 src + onError fallback 逻辑 */
export function getImageSrc(source: ImageSource): string {
  return source.primary
}

/** 获取 CSS background-image 值（优先 primary，降级到 fallback） */
export function getBackgroundImage(source: ImageSource): string {
  if (source.fallbackIsGradient) {
    return `url(${source.primary}), ${source.fallback}`
  }
  return `url(${source.primary})`
}

/** 分类筛选标签列表 */
export const GALLERY_CATEGORIES = [
  "全部",
  "人像写真",
  "旅游风景",
  "电商产品",
  "电影感画面",
  "海报设计",
  "社交媒体创作",
]

/** 场景模板 ID → 路由映射 */
export function sceneRoute(templateId: string): string {
  return `/scene/${templateId}`
}
