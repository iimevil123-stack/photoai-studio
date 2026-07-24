import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "隐私政策",
  description: "光影智助 PhotoAI Studio 隐私政策",
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold mb-2">隐私政策</h1>
          <p className="text-muted-foreground mb-10">最后更新：2024 年 12 月</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. 信息收集
              </h2>
              <p>我们收集以下类型的信息：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>账户信息：</strong>注册时提供的邮箱地址和加密存储的密码。
                </li>
                <li>
                  <strong>使用数据：</strong>你上传的照片、AI
                  生成的结果、功能使用记录。
                </li>
                <li>
                  <strong>技术数据：</strong>IP 地址、浏览器类型、设备信息、访问日志。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. 信息使用
              </h2>
              <p>我们使用收集的信息来：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供、维护和改进 AI 摄影服务</li>
                <li>处理你的请求和生成 AI 分析结果</li>
                <li>向你发送服务相关的通知和更新</li>
                <li>分析和优化平台性能和用户体验</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. 照片数据处理
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  你上传的照片仅用于提供 AI 分析和创作服务，不会用于其他目的。
                </li>
                <li>
                  AI 处理过程中的照片数据会定期清理，不会永久存储原始照片。
                </li>
                <li>
                  我们不会将你的照片分享给第三方，除非获得你的明确授权或法律要求。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. 数据安全
              </h2>
              <p>
                我们采用行业标准的安全措施保护你的数据，包括加密传输（HTTPS）、
                数据库加密存储、访问控制和定期安全审计。
                但请注意，互联网传输不存在 100% 的安全保证。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. 第三方服务
              </h2>
              <p>
                我们使用以下第三方服务来支持平台运营：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Supabase — 提供认证和数据库服务</li>
                <li>AI API 服务商 — 提供 AI 模型推理服务</li>
              </ul>
              <p>这些服务商各自有独立的隐私政策。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. 联系我们
              </h2>
              <p>
                如果你对隐私政策有任何疑问，请通过以下方式联系我们：
              </p>
              <p>邮箱：hello@photoai.studio</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
