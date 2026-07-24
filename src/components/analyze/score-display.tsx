"use client"

import { useEffect, useState } from "react"

interface ScoreDisplayProps {
  score: number // 0-100
  size?: "sm" | "lg"
}

export function ScoreDisplay({ score, size = "lg" }: ScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const dimensions = size === "lg" ? "h-36 w-36" : "h-24 w-24"
  const fontSize = size === "lg" ? "text-3xl" : "text-xl"
  const strokeWidth = size === "lg" ? 6 : 4
  const radius = size === "lg" ? 58 : 40
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  // Color based on score
  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-green-500"
    if (s >= 75) return "text-blue-500"
    if (s >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getProgressColor = (s: number) => {
    if (s >= 90) return "stroke-green-500"
    if (s >= 75) return "stroke-blue-500"
    if (s >= 60) return "stroke-amber-500"
    return "stroke-red-500"
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${dimensions}`}>
        {/* Background circle */}
        <svg className="absolute inset-0" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={getProgressColor(score)}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * animatedScore) / 100}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-bold ${getScoreColor(score)}`}>
            {animatedScore}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground mt-3">综合评分</p>
    </div>
  )
}
