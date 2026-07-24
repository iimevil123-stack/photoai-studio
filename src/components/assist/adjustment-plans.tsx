import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, MoveRight } from "lucide-react"
import type { AssistResponse } from "@/lib/ai/types"

interface AdjustmentPlansProps {
  plans: AssistResponse["plans"]
}

export function AdjustmentPlans({ plans }: AdjustmentPlansProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">调整方案</h3>
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <Card key={index} className={index === 0 ? "border-amber-500/50" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={index === 0 ? "default" : "secondary"}
                  className={index === 0 ? "bg-amber-500" : ""}
                >
                  {plan.planLabel}
                </Badge>
                <CardTitle className="text-base">{plan.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Actions */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  操作建议
                </p>
                <ul className="space-y-1.5">
                  {plan.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pose adjustment */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <MoveRight className="h-3 w-3" />
                  姿势调整
                </p>
                <p className="text-sm bg-muted/30 rounded-lg p-2.5">
                  {plan.poseAdjustment}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
