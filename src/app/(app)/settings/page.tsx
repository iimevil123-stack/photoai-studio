import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PreferencesForm } from "@/components/settings/preferences-form"
import { signOut } from "@/lib/auth/actions"
import { createClient } from "@/lib/supabase/server"
import {
  Mail,
  Shield,
  ChevronRight,
  Camera,
  Crown,
} from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const email = user?.email || "未知邮箱"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">设置</h1>
        <p className="text-muted-foreground mt-1">
          管理你的账户信息和摄影偏好
        </p>
      </div>

      {/* 账户信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Mail className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-lg">账户信息</CardTitle>
          </div>
          <CardDescription>你的账户基本信息和登录方式</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">登录方式</p>
              <p className="text-sm text-muted-foreground">邮箱账号</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              已绑定
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">邮箱地址</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">产品版本</p>
              <p className="text-sm text-muted-foreground">
                PhotoAI Studio V1.0
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              V1.0
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI 摄影偏好 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Camera className="h-4 w-4 text-blue-500" />
            </div>
            <CardTitle className="text-lg">AI 摄影偏好</CardTitle>
          </div>
          <CardDescription>自定义 AI 辅助摄影的风格和建议方式</CardDescription>
        </CardHeader>

        <CardContent>
          <PreferencesForm />
        </CardContent>
      </Card>

      {/* 会员计划 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Crown className="h-4 w-4 text-purple-500" />
            </div>
            <CardTitle className="text-lg">会员计划</CardTitle>
          </div>
          <CardDescription>查看你的当前套餐和升级选项</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">当前套餐</p>
              <p className="text-sm text-muted-foreground">
                免费版 — 每天 5 次 AI 分析，基础摄影建议
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              免费版
            </Badge>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <p className="text-sm font-semibold">升级至 Pro 版</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  无限 AI 分析 · 高级摄影方案 · 优先客服支持 · 作品集定制
                </p>
              </div>
              <Button
                size="sm"
                className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white"
                disabled
              >
                即将上线
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 账户安全 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-red-500" />
            </div>
            <CardTitle className="text-lg">账户安全</CardTitle>
          </div>
          <CardDescription>管理你的账户安全设置</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="w-full sm:w-auto justify-between gap-4 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                退出登录
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            退出后需要重新输入邮箱和密码才能登录
          </p>
        </CardContent>
      </Card>

      {/* Footer spacing */}
      <div className="pb-8" />
    </div>
  )
}
