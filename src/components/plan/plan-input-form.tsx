"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

interface PlanInputFormProps {
  onSubmit: (data: { theme: string; scene: string; subjectType: string; style: string }) => Promise<void>
  isLoading: boolean
}

export function PlanInputForm({ onSubmit, isLoading }: PlanInputFormProps) {
  const [theme, setTheme] = useState("")
  const [scene, setScene] = useState("")
  const [subjectType, setSubjectType] = useState("")
  const [style, setStyle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!theme || !scene) return
    onSubmit({ theme, scene, subjectType, style })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">拍摄主题 *</Label>
              <Input
                id="theme"
                placeholder="例如：法式复古、日系清新、商业人像..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scene">拍摄场景 *</Label>
              <Input
                id="scene"
                placeholder="例如：咖啡馆、公园草地、城市街道..."
                value={scene}
                onChange={(e) => setScene(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">拍摄对象</Label>
              <Select value={subjectType} onValueChange={(v) => setSubjectType(v || "")}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="选择拍摄对象" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="女生">女生</SelectItem>
                  <SelectItem value="男生">男生</SelectItem>
                  <SelectItem value="情侣">情侣</SelectItem>
                  <SelectItem value="儿童">儿童</SelectItem>
                  <SelectItem value="家庭">家庭</SelectItem>
                  <SelectItem value="产品">产品</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">拍摄风格</Label>
              <Select value={style} onValueChange={(v) => setStyle(v || "")}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="选择风格" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="人像写真">人像写真</SelectItem>
                  <SelectItem value="街拍人文">街拍人文</SelectItem>
                  <SelectItem value="婚礼纪实">婚礼纪实</SelectItem>
                  <SelectItem value="婚纱">婚纱</SelectItem>
                  <SelectItem value="产品摄影">产品摄影</SelectItem>
                  <SelectItem value="美食摄影">美食摄影</SelectItem>
                  <SelectItem value="风光摄影">风光摄影</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !theme || !scene}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI正在生成策划方案...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                生成拍摄策划
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
