import { Skeleton } from "@/components/ui/skeleton"

export function ReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Score skeleton */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-36 w-36 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Technical analysis skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Composition skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Suggestions skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0ms]" />
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce [animation-delay:150ms]" />
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-bounce [animation-delay:300ms]" />
        <span>AI正在分析中...</span>
      </div>
    </div>
  )
}
