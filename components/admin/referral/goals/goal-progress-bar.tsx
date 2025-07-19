"use client"

import { Progress } from "@/components/ui/progress"

interface GoalProgressBarProps {
  value: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function GoalProgressBar({ value, showLabel = false, size = "md" }: GoalProgressBarProps) {
  const getProgressColor = (value: number) => {
    if (value < 25) return "bg-red-500"
    if (value < 50) return "bg-amber-500"
    if (value < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const getProgressHeight = (size: string) => {
    switch (size) {
      case "sm":
        return "h-2"
      case "lg":
        return "h-4"
      default:
        return "h-3"
    }
  }

  return (
    <div className="space-y-1">
      <Progress value={value} className={`${getProgressHeight(size)} ${getProgressColor(value)}`} />
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{value}%</span>
        </div>
      )}
    </div>
  )
}
