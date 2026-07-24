import { Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Suggestion } from "@/types"

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[]
}

export function ImprovementSuggestions({ suggestions }: ImprovementSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        提升建议
      </h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3">
              <Badge
                variant="outline"
                className="mt-0.5 shrink-0 text-xs font-mono"
              >
                #{suggestion.priority}
              </Badge>
              <div>
                <p className="font-medium text-sm mb-1">{suggestion.title}</p>
                <p className="text-sm text-muted-foreground">{suggestion.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
