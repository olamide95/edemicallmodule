"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartLegendContent } from "@/components/ui/chart2"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Tuition", value: 65, color: "#0ea5e9" },
  { name: "Facilities", value: 15, color: "#22c55e" },
  { name: "Technology", value: 10, color: "#f59e0b" },
  { name: "Extracurricular", value: 5, color: "#8b5cf6" },
  { name: "Library", value: 5, color: "#ec4899" },
]

// Create config object for the chart
const chartConfig = {
  tuition: { color: "#0ea5e9" },
  facilities: { color: "#22c55e" },
  technology: { color: "#f59e0b" },
  extracurricular: { color: "#8b5cf6" },
  library: { color: "#ec4899" },
}

export function FeeDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Distribution</CardTitle>
        <CardDescription>Breakdown of fee allocation by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <PieChart>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded" style={{ backgroundColor: payload[0].payload.color }} />
                              <span className="text-sm font-medium text-muted-foreground">{payload[0].name}</span>
                            </div>
                            <div className="text-right text-sm font-medium">{payload[0].value}%</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartLegendContent
                  payload={data.map((item) => ({
                    value: item.name,
                    color: item.color,
                    id: item.name,
                  }))}
                  verticalAlign="bottom"
                />
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
