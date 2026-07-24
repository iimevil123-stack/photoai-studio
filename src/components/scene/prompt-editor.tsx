"use client"

import { useState } from "react"
import { Wand2, RefreshCw, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  value: string
  onChange: (value: string) => void
  defaultPrompt: string
  placeholder: string
  disabled?: boolean
  tags?: string[]
}

/** 快速填充建议词 */
const QUICK_WORDS: Record<string, string[]> = {
  portrait: ["柔光", "浅景深", "日系清新", "复古胶片", "黑白质感", "自然妆感"],
  ecommerce: ["纯白背景", "金属质感", "柔和阴影", "场景搭配", "微距细节"],
  landscape: ["黄金时刻", "HDR增强", "通透大气", "冷暖对比", "长曝光"],
  anime: ["新海诚风格", "吉卜力", "赛博朋克", "水彩手绘", "清新少女"],
  cinematic: ["青橙色调", "宽银幕", "胶片颗粒", "变形光晕", "暗调情绪"],
  poster: ["视觉冲击", "极简排版", "复古大字报", "霓虹灯效", "双重曝光"],
  social: ["小红书风格", "Ins风", "清新明亮", "高级灰", "美食暖调"],
}

export function PromptEditor({
  value,
  onChange,
  defaultPrompt,
  placeholder,
  disabled,
  tags = [],
}: Props) {
  const [isFocused, setIsFocused] = useState(false)

  const handleUseDefault = () => {
    onChange(defaultPrompt)
  }

  const handleAddWord = (word: string) => {
    const current = value.trim()
    onChange(current ? `${current}，${word}` : word)
  }

  const handleClear = () => {
    onChange("")
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-amber-500" />
          创作提示词
        </label>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={handleUseDefault}
            disabled={disabled}
          >
            <RefreshCw className="h-3 w-3" />
            填入默认
          </Button>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1 text-muted-foreground"
              onClick={handleClear}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
              清空
            </Button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div
        className={cn(
          "relative rounded-lg border transition-all",
          isFocused
            ? "ring-2 ring-amber-500/20 border-amber-500/50"
            : "border-input"
        )}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[100px] resize-none border-0 focus-visible:ring-0"
        />
        {/* Char count */}
        <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
          {value.length} 字
        </div>
      </div>

      {/* Quick words */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {QUICK_WORDS[tags[0]]?.map((word) => (
            <Badge
              key={word}
              variant="outline"
              className="cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/50 transition-colors text-xs"
              onClick={() => !disabled && handleAddWord(word)}
            >
              + {word}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
