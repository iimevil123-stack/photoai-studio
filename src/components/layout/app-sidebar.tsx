"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-56 lg:w-60 border-r bg-muted/20 h-screen sticky top-0 flex-col">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Camera className="h-5 w-5 text-amber-500" />
          <span>光影智助</span>
        </Link>
      </div>

      <Separator />

      {/* Main nav */}
      <nav className="flex-1 p-3 space-y-1">
        {mainNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-normal",
                pathname === item.href && "bg-accent font-medium"
              )}
            >
              <item.icon className={cn("h-4 w-4", pathname === item.href && "text-amber-500")} />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <Separator />

      {/* Bottom nav */}
      <nav className="p-3 space-y-1">
        {bottomNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-normal",
                pathname === item.href && "bg-accent font-medium"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-3">
        <form action={signOut}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" type="submit">
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </form>
      </div>
    </aside>
  )
}
