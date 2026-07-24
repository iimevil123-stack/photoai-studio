"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Camera, Sparkles } from "lucide-react"

const PHOTOGRAPHY_TYPES = [
  { value: "portrait", label: "人像摄影" },
  { value: "landscape", label: "风景摄影" },
  { value: "commercial", label: "商业摄影" },
]

const AI_MODES = [
  { value: "professional", label: "专业摄影师模式" },
  { value: "creative", label: "创意艺术模式" },
  { value: "balanced", label: "均衡模式" },
]

export function PreferencesForm() {
  const [photoType, setPhotoType] = useState("portrait")
  const [aiMode, setAiMode] = useState("professional")

  return (
    <div className="space-y-6">
      {/* 默认摄影类型 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-amber-500" />
          <Label className="text-sm font-medium">
            默认摄影类型
          </Label>
        </div>

        <p className="text-xs text-muted-foreground">
          选择你最常拍摄的摄影类型，AI 将优先提供相关建议
        </p>

        <Select
          value={photoType}
          onValueChange={(val) => val && setPhotoType(val)}
        >
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PHOTOGRAPHY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* AI 建议模式 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <Label className="text-sm font-medium">
            AI 建议模式
          </Label>
        </div>

        <p className="text-xs text-muted-foreground">
          选择 AI 提供摄影建议的风格和深度
        </p>

        <Select
          value={aiMode}
          onValueChange={(val) => val && setAiMode(val)}
        >
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODES.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
