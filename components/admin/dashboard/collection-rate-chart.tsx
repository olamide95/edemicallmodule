"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart2"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", rate: 92 },
  { name: "Feb", rate: 88 },
  { name: "Mar", rate: 95 },
  { name: "Apr", rate: 90 },
  { name: "May", rate: 85 },
  { name: "Jun", rate: 94 },
]

// Create config object for the chart
const chartConfig = {
  rate: { color: "hsl(var(--primary))" },
}

export function CollectionRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Collection Rate</CardTitle>
        <CardDescription>Monthly fee collection rate percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded bg-primary" />
                              <span className="text-sm font-medium text-muted-foreground">{label}</span>
                            </div>
                            <div className="text-right text-sm font-medium">{payload[0].value}%</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="rate"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  name="Collection Rate"
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
