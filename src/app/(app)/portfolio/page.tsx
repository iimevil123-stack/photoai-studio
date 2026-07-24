"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PortfolioGenerator } from "@/components/portfolio/portfolio-generator"
import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import { FolderOpen } from "lucide-react"
import type { Portfolio } from "@/types"

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showGenerator, setShowGenerator] = useState(false)

  const fetchPortfolios = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio")
      if (res.ok) {
        const data = await res.json()
        setPortfolios(data.portfolios || [])
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPortfolios()
  }, [fetchPortfolios])

  const handleGenerated = () => {
    setShowGenerator(false)
    fetchPortfolios()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">我的作品集</h1>
          <p className="text-muted-foreground mt-1">
            上传代表作品，AI 分析风格并生成在线展示网站
          </p>
        </div>
        {!showGenerator && (
          <button
            onClick={() => setShowGenerator(true)}
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 text-white px-4 py-2 text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            创建作品集
          </button>
        )}
      </div>

      <Separator />

      {showGenerator && (
        <PortfolioGenerator onGenerated={handleGenerated} />
      )}

      {/* Existing portfolios */}
      {!isLoading && portfolios.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">已生成的作品集</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map((p) => (
              <PortfolioCard key={p.id} portfolio={p} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && portfolios.length === 0 && !showGenerator && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">还没有作品集</h3>
            <p className="text-muted-foreground mb-4">
              上传一组作品照片，AI 帮你生成专业的在线作品集
            </p>
            <button
              onClick={() => setShowGenerator(true)}
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 text-white px-6 py-2.5 text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              创建第一个作品集
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
