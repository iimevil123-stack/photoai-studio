import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface RegisterPromptProps {
  onDismiss?: () => void
}

export function RegisterPrompt({ onDismiss }: RegisterPromptProps) {
  return (
    <div className="relative">
      {/* Blurred content hint */}
      <div className="space-y-4 pointer-events-none select-none opacity-20 blur-sm">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">构图分析</h3>
          <p className="text-sm">主体突出，视觉中心明确</p>
          <p className="text-sm">背景元素略多，可通过调整角度优化</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">提升建议</h3>
          <p className="text-sm">降低机位10cm可以获得更好的视角</p>
          <p className="text-sm">人物向左移动以平衡画面</p>
          <p className="text-sm">使用逆光增加画面的氛围感</p>
        </div>
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent rounded-lg">
        <div className="text-center space-y-4 p-6">
          <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
            <Lock className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-lg">注册后查看完整报告</p>
            <p className="text-sm text-muted-foreground mt-1">
              包含构图分析和专业提升建议
            </p>
          </div>
          <Link href="/auth/register?redirect=/analyze">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              免费注册查看完整报告
            </Button>
          </Link>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="block mx-auto text-xs text-muted-foreground hover:text-foreground mt-2"
            >
              以后再说
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
