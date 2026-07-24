"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-8xl font-bold text-amber-500 mb-4">404</p>
          <h1 className="text-2xl font-bold mb-2">页面未找到</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            你访问的页面不存在或已被移动。请检查链接是否正确，或返回首页。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-white font-medium hover:bg-amber-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              返回首页
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 font-medium hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回上页
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
