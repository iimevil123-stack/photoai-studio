"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Camera,
  LayoutDashboard,
  Mic,
  Smartphone,
  Palette,
  FolderOpen,
  Settings,
  LogOut,
  Sparkles,
  Menu,
} from "lucide-react"
import { signOut } from "@/lib/auth/actions"

const mainNavItems = [
  { href: "/workspace", label: "工作空间", icon: LayoutDashboard },
  { href: "/scene", label: "AI场景创作", icon: Sparkles },
  { href: "/analyze", label: "AI照片分析", icon: Camera },
  { href: "/plan", label: "AI拍摄策划", icon: Mic },
  { href: "/assist", label: "AI现场助手", icon: Smartphone },
  { href: "/postprocess", label: "AI后期指导", icon: Palette },
]

const bottomNavItems = [
  { href: "/portfolio", label: "我的作品集", icon: FolderOpen },
  { href: "/settings", label: "设置", icon: Settings },
]

/**
 * 应用侧边栏 — 桌面端固定侧栏 + 移动端 Sheet 抽屉
 *
 * 桌面端 (md+): sticky 左侧栏，56-60 列宽
 * 移动端 (<md): 顶部固定条 + Sheet 滑入式导航
 */
export function AppSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setMobileOpen(false)}>
          <Camera className="h-5 w-5 text-amber-500" />
          <span>光影智助</span>
        </Link>
      </div>

      <Separator />

      {/* Main nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal transition-all duration-200",
                  "hover:bg-accent hover:translate-x-0.5",
                  isActive
                    ? "bg-accent font-medium shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isActive ? "text-amber-500" : ""
                  )}
                />
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Bottom nav */}
      <nav className="p-3 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal transition-all duration-200",
                  "hover:bg-accent hover:translate-x-0.5",
                  isActive
                    ? "bg-accent font-medium shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isActive ? "text-amber-500" : ""
                  )}
                />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-3">
        <form action={signOut}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive transition-colors duration-200"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* ======== 桌面端：固定侧栏 ======== */}
      <aside className="hidden md:flex md:w-56 lg:w-60 border-r bg-muted/20 h-screen sticky top-0 flex-col">
        {navContent}
      </aside>

      {/* ======== 移动端：顶部条 + Sheet 抽屉 ======== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Camera className="h-5 w-5 text-amber-500" />
          <span>光影智助</span>
        </Link>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="打开菜单">
                <Menu className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
            {navContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* 移动端顶部条占位（防止内容被遮挡） */}
      <div className="md:hidden h-14" aria-hidden="true" />
    </>
  )
}
