// ============================================================
// AI 场景模板定义
// 7 个场景模板，每个包含默认参数、提示词和视觉配置
// ============================================================

import type { SceneTemplateId } from "@/services/ai/types"

export interface SceneTemplate {
  id: SceneTemplateId
  name: string
  subtitle: string
  description: string
  icon: string           // lucide icon name
  gradient: string       // Tailwind gradient class for card
  defaultPrompt: string  // 预填充的提示词
  promptPlaceholder: string
  suggestedStrength: number  // 0-1
  tags: string[]
  previewImage: string   // 用于卡片展示的预览图（使用占位渐变）
  features: string[]     // 功能亮点
}

export const SCENE_TEMPLATES: SceneTemplate[] = [
  {
    id: "portrait",
    name: "人像写真",
    subtitle: "AI 人像精修",
    description: "将普通照片转化为专业人像写真，自动美颜、背景虚化、光影重塑，呈现高级质感。",
    icon: "UserRound",
    gradient: "from-rose-400 via-pink-500 to-amber-400",
    defaultPrompt: "人像写真风格，柔和自然光，浅景深背景虚化，皮肤质感细腻，眼神有光彩，专业摄影棚效果",
    promptPlaceholder: "描述你想要的人像风格，如：日系清新、复古胶片、高级黑白...",
    suggestedStrength: 0.6,
    tags: ["美颜", "背景虚化", "光影重塑", "肤色优化"],
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&fit=crop&auto=format",
    features: [
      "智能美颜 — 保留皮肤质感同时自然美化",
      "背景虚化 — 精准主体识别，模拟大光圈效果",
      "光影重塑 — 3D 面部打光，专业棚拍质感",
      "风格迁移 — 日系/复古/黑白一键切换",
    ],
  },
  {
    id: "ecommerce",
    name: "电商产品图",
    subtitle: "产品视觉升级",
    description: "为电商产品生成专业白底图、场景图和细节增强，提升商品转化率和品牌质感。",
    icon: "ShoppingBag",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    defaultPrompt: "电商产品摄影，纯白背景，专业布光，材质纹理清晰，色彩还原准确，商业级品质",
    promptPlaceholder: "描述产品类型和想要的风格，如：化妆品高光、金属质感、场景搭配...",
    suggestedStrength: 0.7,
    tags: ["白底图", "材质增强", "阴影优化", "场景合成"],
    previewImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop&auto=format",
    features: [
      "智能抠图 — AI 精准分离主体与背景",
      "材质增强 — 金属/玻璃/布料质感提升",
      "场景合成 — 产品融入生活方式场景",
      "多角度生成 — 正面/45°/细节特写",
    ],
  },
  {
    id: "landscape",
    name: "旅游风景",
    subtitle: "风景大片一键生成",
    description: "将旅行随拍转化为风光大片，HDR 增强、天空替换、色彩分级，让每张风景都像国家地理。",
    icon: "Mountain",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    defaultPrompt: "壮丽风光摄影，高动态范围HDR，饱和色彩，清晰远景，黄金时刻光线，国家地理风格",
    promptPlaceholder: "描述场景特色，如：日落海滩、雪山日出、星空银河...",
    suggestedStrength: 0.65,
    tags: ["HDR增强", "天空替换", "色彩分级", "去雾增透"],
    previewImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop&auto=format",
    features: [
      "HDR 增强 — 暗部提亮+高光压制",
      "天空替换 — 智能识别并替换灰白天空",
      "色彩分级 — 电影级 LUT 预设",
      "去雾增透 — 提升远景清晰度和通透感",
    ],
  },
  {
    id: "anime",
    name: "动漫风格",
    subtitle: "二次元风格转换",
    description: "将真实照片转化为日系动漫、吉卜力风格或赛博朋克画风，创造独特的二次元视觉体验。",
    icon: "Zap",
    gradient: "from-purple-400 via-violet-500 to-fuchsia-500",
    defaultPrompt: "日系动漫风格，新海诚电影画面质感，柔和色调，细腻线条，唯美光影，场景氛围感",
    promptPlaceholder: "描述想要的动漫风格，如：吉卜力、新海诚、赛博朋克...",
    suggestedStrength: 0.75,
    tags: ["风格迁移", "线条提取", "色彩量化", "特效叠加"],
    previewImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80&fit=crop&auto=format",
    features: [
      "风格迁移 — 照片转二次元/吉卜力/赛博朋克",
      "线条提取 — AI 识别轮廓生成线稿",
      "色彩量化 — 动漫风格专属色板映射",
      "特效叠加 — 樱花/星空/光晕粒子",
    ],
  },
  {
    id: "cinematic",
    name: "电影感画面",
    subtitle: "电影级调色",
    description: "为照片赋予电影级色彩调性，宽幅裁切、颗粒质感、变形宽银幕光晕，让每帧都有故事感。",
    icon: "Film",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    defaultPrompt: "电影感画面，宽银幕比例，青橙色调，柔和高光，胶片颗粒感，变形镜头光晕，故事感氛围",
    promptPlaceholder: "描述电影风格，如：好莱坞大片、文艺片、复古胶片、科幻冷色调...",
    suggestedStrength: 0.7,
    tags: ["色调映射", "宽幅裁切", "颗粒感", "变形光晕"],
    previewImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80&fit=crop&auto=format",
    features: [
      "色调映射 — 好莱坞青橙/赛博蓝紫/复古暖黄",
      "宽幅裁切 — 2.35:1 / 16:9 自动构图",
      "胶片颗粒 — 模拟 35mm/中画幅质感",
      "变形光晕 — 蓝色拉丝高光和柔焦边缘",
    ],
  },
  {
    id: "poster",
    name: "海报设计",
    subtitle: "创意海报生成",
    description: "将照片转化为商业级海报，智能排版、文字叠加、色彩分级，适合活动宣传和社交媒体推广。",
    icon: "Layout",
    gradient: "from-red-500 via-rose-600 to-pink-600",
    defaultPrompt: "创意海报设计，大胆排版，视觉冲击力强，色彩对比鲜明，留白有设计感，商业级品质",
    promptPlaceholder: "描述海报用途，如：音乐节、电影海报、品牌宣传、活动预告...",
    suggestedStrength: 0.8,
    tags: ["排版设计", "文字叠加", "色彩分级", "视觉冲击"],
    previewImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&auto=format",
    features: [
      "智能排版 — AI 分析构图推荐文字位置",
      "字体推荐 — 根据风格推荐中英文字体",
      "色彩提取 — 从图片中提取主色调生成色板",
      "多尺寸输出 — 适应各社交平台尺寸",
    ],
  },
  {
    id: "social",
    name: "社交媒体图片",
    subtitle: "社媒内容优化",
    description: "针对小红书、Instagram、抖音等平台优化图片，智能裁剪、滤镜调色、边框设计，提升点击率。",
    icon: "Share2",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    defaultPrompt: "社交媒体风格，色彩鲜艳吸睛，适合信息流浏览，构图紧凑，画面干净有吸引力",
    promptPlaceholder: "描述发布平台和风格，如：小红书穿搭、Ins风美食、抖音封面...",
    suggestedStrength: 0.55,
    tags: ["智能裁切", "滤镜调色", "边框设计", "多平台适配"],
    previewImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&fit=crop&auto=format",
    features: [
      "平台适配 — 1:1/3:4/9:16/16:9 自动裁切",
      "滤镜调色 — 小红书/Ins/抖音热门滤镜",
      "边框设计 — 圆角/投影/留白边框",
      "文字贴纸 — 热门话题标签和装饰元素",
    ],
  },
]

/** 根据 ID 获取模板 */
export function getTemplateById(id: SceneTemplateId): SceneTemplate | undefined {
  return SCENE_TEMPLATES.find((t) => t.id === id)
}

/** 获取所有模板 ID */
export function getAllTemplateIds(): SceneTemplateId[] {
  return SCENE_TEMPLATES.map((t) => t.id)
}
