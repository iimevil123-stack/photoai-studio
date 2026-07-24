# 光影智助 PhotoAI Studio

> 从灵感到成片，让AI成为摄影师的创意搭档。

面向摄影师的 AI 全流程创作辅助平台，覆盖拍摄策划、现场指导、后期修图。

## 快速开始

### 前提
- Node.js 18+, npm 9+
- [Supabase](https://supabase.com) 账号
- Anthropic API Key（主力 AI）+ OpenAI API Key（备用）

### 安装

```bash
git clone <repo-url> && cd photoai-studio
npm install
cp .env.example .env.local  # 编辑填入 API 密钥
npm run dev                  # http://localhost:3000
```

### 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 |
| `ANTHROPIC_API_KEY` | Claude API 密钥（主力） |
| `OPENAI_API_KEY` | OpenAI API 密钥（备用） |
| `DATABASE_URL` | PostgreSQL 连接字符串 |
| `AI_DAILY_BUDGET_USD` | AI 每日预算上限（默认 $10） |

### 数据库初始化

```bash
npx drizzle-kit push     # 创建表
# 在 Supabase SQL Editor 中运行 supabase-rls.sql 配置 RLS
# 在 Supabase Storage 创建桶: user-uploads, portfolios, thumbnails
```

## 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 14 (App Router) + TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 后端 | Supabase (Auth / DB / Storage) + Drizzle ORM |
| AI | Vercel AI SDK (Claude Opus 4.8 主 / GPT-4o 备) |
| 图片 | Sharp (WebP / EXIF / 缩略图) |
| 校验 | Zod (API 入参 + AI 响应) |

## 功能

- **AI 照片分析** — 综合评分 + 技术/构图分析 + 提升建议
- **AI 拍摄策划** — 主题/场景 → 服装/姿势/镜头建议
- **AI 现场助手** — 环境检测 → 多方案调整
- **AI 后期指导** — 7 项精确修图参数
- **AI 作品集** — 批量风格分析 → 在线展示网站
- **工作空间** — 项目管理 + 客户管理

## 部署

```bash
npm run build && vercel --prod
```

## 许可

© 2024 PhotoAI Studio
