"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Camera className="h-6 w-6 text-amber-500" />
          <span>光影智助</span>
          <span className="text-muted-foreground font-normal text-sm hidden sm:inline">
            PhotoAI Studio
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            功能
          </Link>
          <Link href="/#workflow" className="text-muted-foreground hover:text-foreground transition-colors">
            工作流程
          </Link>
          <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
            关于
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              登录
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
              免费注册
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
