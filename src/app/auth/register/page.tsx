import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <Camera className="h-6 w-6 text-amber-500" />
            <span>光影智助</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">创建账号</CardTitle>
            <CardDescription>免费注册，开始你的 AI 摄影之旅</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/api/auth/register" method="post" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="最少8位字符"
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                注册
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              已有账号？{" "}
              <Link href="/auth/login" className="text-amber-500 hover:text-amber-600 font-medium">
                登录
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
