# PhotoAI Studio V1.0 — 开发交接记录

> 记录日期：2026-07-23
> 项目状态：MVP 开发基本完成，Mock 演示模式运行中

---

## 一、当前已完成功能

### 公开页面
| 页面 | 路由 | 状态 |
|------|------|------|
| 首页（Hero + 能力卡片 + CTA） | `/` | ✅ 完成 |
| 登录页 | `/auth/login` | ✅ 完成 |
| 注册页 | `/auth/register` | ✅ 完成 |
| 认证回调 | `/auth/callback` | ✅ 完成 |

### 认证后页面
| 页面 | 路由 | 状态 |
|------|------|------|
| AI 照片分析（上传 + 评分 + 技术/构图/建议） | `/analyze` | ✅ 完成 (Mock) |
| AI 拍摄策划（表单 + 结果） | `/plan` | ✅ 完成 (Mock) |
| AI 现场助手（环境检测 + 方案 A/B） | `/assist` | ✅ 完成 (Mock) |
| AI 后期指导（7 项参数滑块） | `/postprocess` | ✅ 完成 (Mock) |
| 工作空间（项目列表 + 统计 + 新建） | `/workspace` | ✅ 完成 |
| 项目详情（照片画廊 + 报告展示） | `/workspace/[projectId]` | ✅ 完成 |
| 作品集列表 + 生成器 | `/portfolio` | ✅ 完成 (Mock) |
| 设置页（占位） | `/settings` | ⏸️ 占位 |

### API 端点（11 个）
| 端点 | 方法 | 状态 |
|------|------|------|
| `/api/upload` | POST | ✅ 完成 |
| `/api/analyze` | POST | ✅ 完成 (Mock) |
| `/api/plan` | POST | ✅ 完成 (Mock) |
| `/api/assist` | POST | ✅ 完成 (Mock) |
| `/api/postprocess` | POST | ✅ 完成 (Mock) |
| `/api/projects` | GET/POST | ✅ 完成 |
| `/api/projects/[id]` | GET/PATCH/DELETE | ✅ 完成 |
| `/api/portfolio` | GET/POST | ✅ 完成 |
| `/api/portfolio/generate` | POST | ✅ 完成 (Mock) |
| `/api/auth/login` | POST | ✅ 完成 |
| `/api/auth/register` | POST | ✅ 完成 |
| `/api/auth/logout` | POST | ✅ 完成 |

### 游客漏斗
- 游客可访问首页 → 进入 `/analyze` 上传 1 张照片 → 看到部分报告（评分 + 技术分析）→ 注册引导遮罩 → 注册后查看完整报告

### 基础设施
- 全局错误边界 (`error.tsx`)
- 认证区错误边界 (`(app)/error.tsx`)
- 加载骨架屏 (`loading.tsx`)
- SEO 基础 (`sitemap.ts`, `robots.ts`, metadata)
- 内存限流器 (`rate-limit.ts`)

---

## 二、技术架构

### 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 14.2.35 |
| 语言 | TypeScript | 5.x (Strict) |
| 样式 | Tailwind CSS + shadcn/ui (new-york) | 3.4.x |
| 数据库 | Supabase (PostgreSQL 15) | 托管 |
| ORM | Drizzle ORM | 0.33.x |
| 认证 | Supabase Auth (@supabase/ssr) | PKCE 流程 |
| 图片处理 | Sharp | 0.33.x |
| AI SDK | Vercel AI SDK v7 | Claude + GPT-4o |
| 校验 | Zod | 3.23.x |
| 状态管理 | TanStack Query + Zustand | 最新 |

### 数据库表（10 张，Drizzle Schema 已定义）

```
users, projects, images, ai_reports, shooting_plans,
on_site_assessments, postprocess_guides, portfolios,
analysis_cache, subscriptions
```

> 注意：Schema 已定义但**尚未执行 `drizzle-kit push`**，数据库中没有表。RLS 策略脚本在 `supabase-rls.sql`。

### AI 架构

```
callAI() → 检测 API Key 是否存在
  ├── 有 Key → Claude (主力) → GPT-4o (备用)
  └── 无 Key → Mock 模式（自动，零代码切换）
```

### 项目结构

```
photoai-studio/
├── drizzle/schema/index.ts    # 10 张表 Drizzle Schema
├── src/
│   ├── app/                   # 28 条路由
│   ├── components/            # 20+ 组件
│   │   ├── ui/                # shadcn/ui 基础组件
│   │   ├── analyze/           # AI 分析组件 (7个)
│   │   ├── plan/              # 拍摄策划组件 (2个)
│   │   ├── assist/            # 现场助手组件 (2个)
│   │   ├── postprocess/       # 后期指导组件 (2个)
│   │   ├── workspace/         # 工作空间组件 (2个)
│   │   ├── portfolio/         # 作品集组件 (2个)
│   │   ├── home/              # 首页组件 (3个)
│   │   ├── layout/            # 布局组件 (3个)
│   │   └── shared/            # 共享组件 (1个)
│   └── lib/
│       ├── ai/                # AI 客户端 + 5个Prompt + Mock
│       ├── supabase/          # 三端 Client (browser/server/admin)
│       ├── image/             # Sharp 处理管线
│       ├── db/                # Drizzle 客户端
│       └── auth/              # Server Actions
├── supabase-rls.sql           # RLS 策略（待执行）
└── .env.local                 # 环境变量
```

---

## 三、环境变量配置状态

| 变量 | 状态 | 备注 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ 已配置 | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ 已配置 | Anon Key（已脱敏） |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ 已配置 | Service Role Key（已脱敏） |
| `DATABASE_URL` | ✅ 已配置 | Session Pooler (ap-northeast-1) |
| `NEXT_PUBLIC_APP_URL` | ✅ 已配置 | `http://localhost:3000` |
| `AI_DAILY_BUDGET_USD` | ✅ 已配置 | `10` |
| `ANTHROPIC_API_KEY` | ❌ 未配置 | 主力 AI（Claude），占位值 |
| `OPENAI_API_KEY` | ❌ 未配置 | 备用 AI（GPT-4o），占位值 |

> 当前运行模式：**MOCK**（因 AI Key 未配置，所有 AI 功能返回模拟数据）

---

## 四、当前正在进行的任务

**Phase 4 打磨与上线** — 主体已完成，剩余：

| 项目 | 优先级 | 说明 |
|------|--------|------|
| 数据库建表 | 🔴 高 | `drizzle-kit push` 将 Schema 推送到 Supabase |
| RLS 策略执行 | 🔴 高 | 在 Supabase SQL Editor 执行 `supabase-rls.sql` |
| Storage 存储桶创建 | 🔴 高 | 在 Supabase 创建 `user-uploads`、`thumbnails`、`portfolios` 三个桶 |
| 图片上传端到端测试 | 🟡 中 | 验证 Sharp → Supabase Storage 完整管线 |
| 认证流程端到端测试 | 🟡 中 | 验证注册 → 登录 → 受保护路由 → 退出 |
| `<img>` → `<Image />` 替换 | 🟢 低 | 6 处性能优化 warning |
| AI Key 配置 | 🟢 低 | 将来按需配置，即可从 Mock 切换到真实 API |

---

## 五、下一步开发步骤

### 立即可做（不依赖外部）

1. **执行数据库建表**
   ```bash
   npx drizzle-kit push
   ```

2. **创建 Supabase Storage 存储桶**
   - 在 Supabase Dashboard → Storage 中创建三个桶
   - `user-uploads`（公开读）
   - `thumbnails`（公开读）
   - `portfolios`（公开读）

3. **执行 RLS 策略**
   - 在 Supabase SQL Editor 中运行 `supabase-rls.sql`

4. **测试完整流程**
   - 注册账号 → 上传照片 → 查看 AI 分析 → 保存到项目

### 第二阶段功能（产品蓝图 Phase 2-4）

| 功能 | 说明 |
|------|------|
| 摄影师工作台增强 | 客户管理、图片批量管理 |
| 作品集在线发布 | 生成的 HTML 网站部署到自定义域名 |
| 订阅支付 | 接入 Stripe / 支付宝 / 微信支付 |
| 社交分享 | 分析报告一键分享到小红书 |
| 历史记录对比 | 同一场景多次拍摄的进步追踪 |

---

## 六、遇到的问题和注意事项

### 已知问题

1. **数据库未建表** — Drizzle Schema 已写但未 push，数据库为空。需要先执行 `drizzle-kit push`。

2. **Supabase Storage 桶未创建** — 图片上传 API 会失败，因为 `user-uploads` 桶不存在。

3. **数据库直连 IPv6 不兼容** — 当前 Windows 环境 Node.js 无法通过 IPv6 连接 Supabase 直连数据库。**已解决**：使用 Session Pooler（ap-northeast-1, port 5432）。

4. **`NEXT_PUBLIC_SUPABASE_URL` 末尾不要加 `/rest/v1/`** — Supabase JS SDK 会自动追加，加了会导致 URL 异常。

5. **DATABASE_URL 密码不要加方括号** — `[password]` 格式在 PostgreSQL 连接字符串中无效。

### 技术注意事项

- **中间件保护**：`/workspace`、`/analyze`、`/plan`、`/assist`、`/postprocess`、`/portfolio` 路径需要登录
- **RLS 未执行前**：API 路由使用 `createAdminClient()`（service_role）绕过 RLS，执行 RLS 后建议切换为普通 client
- **Mock 模式**：AI Key 缺失时自动启用，返回模拟中文数据。配置真实 Key 后自动切换
- **Sharp 兼容性**：部分 HEIC 格式可能处理失败，已加 try-catch 兜底
- **shadcn/ui 版本差异**：当前版本的 `DialogTrigger` 不支持 `asChild`，`Select.onValueChange` 返回 `string | null`（需处理 null）

### 安全提醒

- `.env.local` 包含真实 Supabase 密钥，**不要提交到 Git**
- `.env.example` 是空模板，可以提交
- `SUPABASE_SERVICE_ROLE_KEY` 有完全数据库权限，仅用于服务端

---

## 附录：快速命令参考

```bash
cd D:\产品开发测试\photoai-studio

npm run dev          # 启动开发服务器
npm run build        # 生产构建
npx drizzle-kit push # 推送数据库 Schema
npx tsc --noEmit    # TypeScript 类型检查
```
