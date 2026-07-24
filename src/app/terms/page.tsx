import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "使用条款",
  description: "光影智助 PhotoAI Studio 使用条款",
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold mb-2">使用条款</h1>
          <p className="text-muted-foreground mb-10">最后更新：2024 年 12 月</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. 服务说明
              </h2>
              <p>
                光影智助 PhotoAI Studio（以下简称&ldquo;本平台&rdquo;）是一个基于人工智能技术的摄影辅助工具。
                我们通过 AI 模型为用户提供照片分析、场景创作、拍摄策划、现场助手和后期指导等服务。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. 用户责任
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  你上传的照片必须是你拥有合法权利的内容，不得上传侵犯他人著作权、肖像权、隐私权的内容。
                </li>
                <li>
                  不得利用本平台生成或传播违法、色情、暴力、仇恨言论等违规内容。
                </li>
                <li>
                  你对自己的账户安全负责，不得将账户分享给他人使用。
                </li>
                <li>
                  免费账户的使用受每日配额限制，具体配额以产品页面显示为准。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. AI 生成内容
              </h2>
              <p>
                AI 生成的结果由机器学习模型自动产生，可能存在不准确或不完整的情况。
                本平台不对 AI 生成内容的准确性、完整性或适用性做任何保证。
                AI 生成内容的版权归属适用相关法律法规。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. 服务变更
              </h2>
              <p>
                我们保留随时修改、暂停或终止部分或全部服务的权利，无需事先通知。
                对于重大变更，我们将通过平台公告或邮件通知用户。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. 免责声明
              </h2>
              <p>
                本平台按&ldquo;现状&rdquo;提供服务，不做任何明示或暗示的保证。
                在任何情况下，本平台及其运营方不对因使用本服务而产生的任何直接、
                间接、附带或衍生损失承担责任。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
