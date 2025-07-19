"use client"

import { ArrowUp } from "lucide-react"

export default function ConversionRateCard() {
  // Sample data
  const conversionRate = 68.5
  const previousRate = 62.3
  const percentageChange = (((conversionRate - previousRate) / previousRate) * 100).toFixed(1)

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-4xl font-bold">{conversionRate}%</span>
        <div className="flex items-center text-[#56CA00]">
          <ArrowUp className="mr-1 h-4 w-4" />
          <span>{percentageChange}%</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Average percentage of applicants who complete the admission process
      </p>
      <div className="mt-2 h-2 w-full rounded-full bg-[#8C57FF]/16">
        <div className="h-2 rounded-full bg-[#8C57FF]" style={{ width: `${conversionRate}%` }} />
      </div>
    </div>
  )
}
