import { Star } from "lucide-react"
import type { TechnicalAnalysis as TechnicalAnalysisType } from "@/types"

interface TechnicalAnalysisProps {
  data: TechnicalAnalysisType | null
}

function StarRating({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < score
              ? "fill-amber-500 text-amber-500"
              : "fill-muted/30 text-muted/30"
          }`}
        />
      ))}
    </div>
  )
}

export function TechnicalAnalysis({ data }: TechnicalAnalysisProps) {
  if (!data) return null

  const dimensions = [
    { key: "clarity", data: data.clarity },
    { key: "exposure", data: data.exposure },
    { key: "color", data: data.color },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">技术分析</h3>
      <div className="space-y-3">
        {dimensions.map((dim) => (
          <div
            key={dim.key}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
          >
            <div>
              <p className="font-medium text-sm">{dim.data.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {dim.data.comment}
              </p>
            </div>
            <StarRating score={dim.data.score} />
          </div>
        ))}
      </div>
    </div>
  )
}
