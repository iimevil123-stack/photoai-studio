import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedWorks } from "@/components/home/featured-works"
import { SceneShowcase } from "@/components/home/scene-showcase"
import { ShowcaseGallery } from "@/components/home/showcase-gallery"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 第一屏：Hero — 视觉冲击 + 漂浮AI作品卡 */}
        <HeroSection />

        {/* 第二屏：Before/After 精选案例 — 证明AI真实有效 */}
        <FeaturedWorks />

        {/* 第三屏：7个AI场景模板 — 告诉用户能做什么 */}
        <SceneShowcase />

        {/* 第四屏：AI作品画廊瀑布流 — 视觉展示 */}
        <ShowcaseGallery />

        {/* 第五屏：CTA — 引导注册 */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
