// ============================================================
// Mock AI Responses — 演示用，不调用真实 API
// 当没有配置 AI API Key 时自动启用
// ============================================================

import type {
  AnalyzeResponse,
  PlanResponse,
  AssistResponse,
  PostProcessResponse,
  PortfolioResponse,
} from "./types"

/** 模拟 API 延迟 (ms) */
function delay(ms = 1500): Promise<void> {
  return new Promise((r) => setTimeout(r, ms + Math.random() * 1000))
}

// ---- 照片分析 Mock ----
export async function mockAnalyzePhoto(): Promise<AnalyzeResponse> {
  await delay()
  return {
    overallScore: 86,
    technicalAnalysis: {
      clarity: {
        score: 4,
        label: "清晰度",
        comment: "焦点准确，主体边缘锐利，细节表现良好",
      },
      exposure: {
        score: 4,
        label: "曝光",
        comment: "整体曝光均衡，高光区域控制得当，暗部略有不足",
      },
      color: {
        score: 5,
        label: "色彩",
        comment: "色彩还原准确，色调统一，饱和度适中，画面氛围感强",
      },
    },
    compositionAnalysis: {
      strengths: [
        "主体突出，视觉中心明确，构图重心稳定",
        "运用三分法构图，画面平衡感好",
        "前景与背景层次分明，空间感强",
      ],
      weaknesses: [
        "背景右侧元素略多，可通过调整角度简化",
        "画面底部留白稍多，建议适当裁剪",
      ],
    },
    suggestions: [
      {
        priority: 1,
        title: "降低机位 10cm",
        detail: "当前机位略高，降低10cm可以让主体更显挺拔，同时减少地面在画面中的占比，使构图更加紧凑。",
      },
      {
        priority: 2,
        title: "人物向左移动半步",
        detail: "将主体向左移动约30cm，让右侧留出呼吸空间，形成更经典的留白构图，视线方向的空间也会更加舒适。",
      },
      {
        priority: 3,
        title: "尝试逆光拍摄",
        detail: "当前为顺光，切换到逆光角度可以为人物轮廓增添发光效果，使照片更具氛围感和高级感。建议在黄金时段（日落前1小时）尝试。",
      },
      {
        priority: 4,
        title: "后期适当提亮阴影",
        detail: "暗部细节略有丢失，建议在后期中将阴影提升 +25，同时微调黑色色阶 -5 以保持对比度。",
      },
    ],
  }
}

// ---- 拍摄策划 Mock ----
export async function mockPlan(input: {
  theme: string
  scene: string
  subjectType?: string
  style?: string
}): Promise<PlanResponse> {
  await delay()
  const subject = input.subjectType || "人物"
  const sceneName = input.scene || input.theme

  return {
    outfitSuggestions: [
      `${subject}建议穿着浅色系简约风格服装，与"${input.theme}"主题相呼应`,
      `可搭配一件质感外套或配饰，增加画面层次感`,
      `避免过于复杂的图案，素色或小碎花效果更佳`,
      `根据${sceneName}环境，建议选择与环境形成互补色的服装`,
    ],
    poseSuggestions: [
      `${subject}可靠墙站立，身体侧转45°，一只脚微曲，自然放松`,
      `坐姿时可前倾身体，手自然放在膝盖或桌面，营造轻松氛围`,
      `走动抓拍，让${subject}自然行走，捕捉动态瞬间`,
      `运用道具互动，如咖啡杯、书本、花束等，增加故事感`,
    ],
    lensRecommendations: [
      "50mm f/1.4 — 经典人像焦段，虚化自然，视角接近人眼",
      "85mm f/1.8 — 压缩感强，适合半身和特写，背景分离效果好",
      "35mm f/1.4 — 环境人像首选，可带入更多场景元素",
    ],
    cameraSettings: {
      "光圈": "f/2.0 - f/2.8",
      "快门": "1/250s",
      "ISO": "200 - 400",
      "白平衡": "5500K（根据现场光线微调）",
      "测光模式": "点测光（对人物面部）",
    },
    lightingTips: [
      `优先利用${sceneName}的自然光线，避免正午强光直射`,
      "若室内光线不足，可使用反光板从侧面补光",
      "注意避免混合光源造成的色温不一致",
      "黄金时段（日出后1小时 / 日落前1小时）拍摄效果最佳",
      "阴天是拍摄人像的好天气，光线柔和均匀",
    ],
  }
}

// ---- 现场助手 Mock ----
export async function mockAssessEnvironment(): Promise<AssistResponse> {
  await delay()
  return {
    conditions: {
      weather: "阴天",
      lighting: "柔和散射光，光线均匀但略显平淡",
      backgroundQuality: "层次不足，背景元素较为杂乱",
      colorTemperature: 5800,
    },
    plans: [
      {
        planLabel: "方案A",
        title: "继续拍摄 — 利用阴天柔光优势",
        actions: [
          "利用阴天柔和光线，适合拍摄人像特写，皮肤质感细腻",
          "增加前景元素（树叶、窗框等）丰富画面层次",
          "曝光补偿 +0.7，提亮画面避免灰暗",
          "使用大光圈 (f/1.4-f/2.0) 虚化杂乱的背景",
          "开启相机的人像模式或色彩优化，增加画面通透感",
        ],
        poseAdjustment: "靠墙站立，身体侧转约45°，一只脚微曲踩墙，手自然垂放或插口袋，减少僵硬感。利用墙壁线条引导视线。",
      },
      {
        planLabel: "方案B",
        title: "改变地点 — 移动到建筑入口处",
        actions: [
          "建筑入口有天然遮光结构，光线更有方向性",
          "利用门框、拱门等建筑线条做框架构图",
          "门廊阴影可营造戏剧性的明暗对比",
          "调整白平衡至 5200K 左右，略微偏暖增加氛围",
        ],
        poseAdjustment: "站于门框中央，让门框自然地框住人物。可一手扶着门框，望向远方，营造电影感画面。",
      },
    ],
  }
}

// ---- 后期指导 Mock ----
export async function mockPostProcess(): Promise<PostProcessResponse> {
  await delay()
  return {
    adjustments: {
      exposure: 0.35,
      shadows: 22,
      colorTemperature: 380,
      contrast: 8,
      highlights: -12,
      saturation: 5,
      vibrance: 10,
    },
    guideText:
      "这张照片整体曝光略欠，暗部细节需要提亮。建议首先提升曝光 +0.35 使整体亮度适中，然后将阴影 +22 恢复暗部细节。高光区域需降低 -12 保留天空和亮部纹理。色调方面，增加色温 +380K 使画面偏暖，增添温馨感。最后通过自然饱和度 +10 而非直接加饱和度，让色彩更自然通透。",
  }
}

// ---- 作品集生成 Mock ----
export async function mockPortfolio(): Promise<PortfolioResponse> {
  await delay(2000)
  return {
    detectedStyle: "高级商业人像",
    colorPalette: ["#2C2C2C", "#F5F0EB", "#8B7D6B", "#C4A882", "#3D3D3D"],
    saturationLevel: "低饱和",
    keywords: ["简约", "高级", "质感", "商业", "大气"],
    templateRecommendation: "A",
    siteData: {
      title: "光影之间 · 人像摄影作品集",
      subtitle: "捕捉真实，呈现高级",
      bio: "专注于商业人像与时尚摄影，用镜头探索光影与情绪的交汇点。每一张照片背后，都是对美的执着追求。",
      sections: [
        { title: "精选人像", imageIndices: [0, 1, 2, 3, 4] },
        { title: "光影细节", imageIndices: [5, 6, 7, 8] },
        { title: "黑白情绪", imageIndices: [9, 10, 11, 12] },
        { title: "色彩故事", imageIndices: [13, 14, 15, 16, 17, 18, 19] },
      ],
    },
  }
}
