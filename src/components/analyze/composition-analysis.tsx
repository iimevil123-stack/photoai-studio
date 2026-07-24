import { CheckCircle2, AlertCircle } from "lucide-react"
import type { CompositionAnalysis as CompositionAnalysisType } from "@/types"

interface CompositionAnalysisProps {
  data: CompositionAnalysisType | null
}

export function CompositionAnalysis({ data }: CompositionAnalysisProps) {
  if (!data) return null

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">构图分析</h3>

      {/* Strengths */}
      {data.strengths.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            优点
          </p>
          <ul className="space-y-1.5">
            {data.strengths.map((s, i) => (
              <li
                key={i}
                className="text-sm pl-6 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-green-500"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {data.weaknesses.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4" />
            不足
          </p>
          <ul className="space-y-1.5">
            {data.weaknesses.map((w, i) => (
              <li
                key={i}
                className="text-sm pl-6 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber-500"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
