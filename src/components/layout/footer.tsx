import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-2">光影智助</h3>
            <p className="text-sm text-muted-foreground">
              PhotoAI Studio
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              从灵感到成片，让AI成为摄影师的创意搭档。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-3 text-sm">功能</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/analyze" className="hover:text-foreground transition-colors">AI照片分析</Link></li>
              <li><Link href="/plan" className="hover:text-foreground transition-colors">AI拍摄策划</Link></li>
              <li><Link href="/assist" className="hover:text-foreground transition-colors">AI现场助手</Link></li>
              <li><Link href="/postprocess" className="hover:text-foreground transition-colors">AI后期指导</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm">关于</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">关于我们</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">使用条款</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">隐私政策</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm">联系</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>邮箱: hello@photoai.studio</li>
              <li>小红书: @光影智助</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 光影智助 PhotoAI Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
