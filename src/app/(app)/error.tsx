"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold mb-2">页面加载失败</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        请尝试刷新页面，或返回工作空间。
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          重试
        </Button>
        <Link href="/workspace">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Home className="mr-2 h-4 w-4" />
            返回工作空间
          </Button>
        </Link>
      </div>
    </div>
  )
}
