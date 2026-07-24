"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, LogOut, Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { User } from "@supabase/supabase-js"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  // 锁定 body 滚动（移动端菜单打开时）
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMobileMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/85">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* ---- Logo ---- */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <Camera className="h-6 w-6 text-amber-500" />
          <span>光影智助</span>
          <span className="text-muted-foreground font-normal text-sm hidden sm:inline">
            PhotoAI Studio
          </span>
        </Link>

        {/* ---- 桌面端导航 ---- */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/#features", label: "功能" },
            { href: "/#featured", label: "案例" },
            { href: "/about", label: "关于" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </nav>

        {/* ---- 桌面端认证按钮 ---- */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-20 rounded-md bg-white/5" />
          ) : user ? (
            <>
              <Link href="/workspace">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-200 hover:shadow-md hover:shadow-amber-500/20 active:scale-95">
                  工作空间
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="transition-all duration-200 active:scale-95">
                  登录
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-200 hover:shadow-md hover:shadow-amber-500/20 active:scale-95">
                  免费注册
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* ---- 移动端汉堡按钮 ---- */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <div className="relative w-5 h-5">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300",
                mobileMenuOpen ? "top-2 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2 h-0.5 rounded-full bg-foreground transition-all duration-300",
                mobileMenuOpen ? "w-0 opacity-0" : "w-4"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-5 rounded-full bg-foreground transition-all duration-300",
                mobileMenuOpen ? "top-2 -rotate-45" : "top-4"
              )}
            />
          </div>
        </button>
      </div>

      {/* ======== 移动端全屏菜单 ======== */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-40 bg-neutral-950/95 transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-6 gap-1">
          {[
            { href: "/#features", label: "功能" },
            { href: "/#featured", label: "案例" },
            { href: "/about", label: "关于" },
          ].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-3 px-4 text-lg font-medium rounded-xl hover:bg-accent transition-all duration-200"
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 60}ms` : "0ms",
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(8px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pt-4 border-t border-border/50 mx-6">
          {loading ? (
            <div className="h-12 rounded-xl bg-white/5" />
          ) : user ? (
            <div className="space-y-3">
              <Link href="/workspace" onClick={closeMenu}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white active:scale-[0.98] transition-all">
                  工作空间
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full active:scale-[0.98] transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/auth/register" onClick={closeMenu}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white active:scale-[0.98] transition-all">
                  免费注册
                </Button>
              </Link>
              <Link href="/auth/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full active:scale-[0.98] transition-all">
                  登录
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
