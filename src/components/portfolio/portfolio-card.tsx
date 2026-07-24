import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import type { Portfolio } from "@/types"

interface PortfolioCardProps {
  portfolio: Portfolio
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const style = portfolio.styleAnalysis

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardContent className="p-5">
        {/* Color palette preview */}
        <div className="flex gap-1 mb-4">
          {(style?.colorPalette || ["#2C2C2C", "#F5F0EB", "#8B7D6B"]).map(
            (color: string, i: number) => (
              <div
                key={i}
                className="h-8 flex-1 rounded-md first:rounded-l-lg last:rounded-r-lg"
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>

        <h3 className="font-semibold text-sm mb-1 group-hover:text-amber-500 transition-colors">
          {portfolio.name}
        </h3>

        {style?.detectedStyle && (
          <Badge variant="secondary" className="text-xs mb-2">
            {style.detectedStyle}
          </Badge>
        )}

        {style?.keywords && (
          <div className="flex flex-wrap gap-1 mb-2">
            {style.keywords.map((kw: string) => (
              <Badge key={kw} variant="outline" className="text-[10px]">
                {kw}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatRelativeTime(portfolio.createdAt)}</span>
          {portfolio.isPublished ? (
            <span className="flex items-center gap-1 text-green-500">
              <ExternalLink className="h-3 w-3" />
              已发布
            </span>
          ) : (
            <span className="text-muted-foreground">草稿</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
