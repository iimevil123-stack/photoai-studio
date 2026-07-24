import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

interface GuideResultProps {
  guideText: string
}

export function GuideResult({ guideText }: GuideResultProps) {
  if (!guideText) return null

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <BookOpen className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">{guideText}</p>
        </div>
      </CardContent>
    </Card>
  )
}
