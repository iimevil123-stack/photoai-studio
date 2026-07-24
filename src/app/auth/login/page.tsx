import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import { signIn } from "@/lib/auth/actions"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl"
          >
            <Camera className="h-6 w-6 text-amber-500" />
            <span>光影智助</span>
          </Link>
        </div>


        <Card>

          <CardHeader className="text-center">

            <CardTitle className="text-2xl">
              欢迎回来
            </CardTitle>

            <CardDescription>
              登录你的账号继续使用 AI 摄影助手
            </CardDescription>

          </CardHeader>


          <CardContent>

            <form action={signIn} className="space-y-4">


              <div className="space-y-2">
                <Label htmlFor="email">
                  邮箱
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>


              <div className="space-y-2">

                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    密码
                  </Label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    忘记密码？
                  </Link>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="至少8位字符"
                  minLength={8}
                  required
                />

              </div>


              <input
                type="hidden"
                name="redirect"
                value="/workspace"
              />


              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                登录
              </Button>


            </form>


            <div className="mt-6 text-center text-sm text-muted-foreground">

              还没有账号？

              {" "}

              <Link
                href="/auth/register"
                className="text-amber-500 hover:text-amber-600 font-medium"
              >
                免费注册
              </Link>

            </div>


          </CardContent>

        </Card>


      </div>
    </div>
  )
}
