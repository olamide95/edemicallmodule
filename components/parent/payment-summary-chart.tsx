"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart2"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data
const data = [
  { term: "Term 1", paid: 250000, pending: 0 },
  { term: "Term 2", paid: 250000, pending: 0 },
  { term: "Term 3", paid: 180000, pending: 70000 },
  { term: "Term 4", paid: 0, pending: 250000 },
]

export function PaymentSummaryChart() {
  // Format currency in Naira
  const formatCurrency = (value: number) => {
    return `₦${value.toLocaleString("en-NG")}`
  }

  return (
    <Card className="col-span-4 bg-card dark:bg-card-dark">
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
        <CardDescription>Overview of payments by term</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            paid: {
              label: "Paid Amount",
              color: "hsl(160, 84%, 39%)",
            },
            pending: {
              label: "Pending Amount",
              color: "hsl(340, 82%, 52%)",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(340, 82%, 52%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(340, 82%, 52%)" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis
                dataKey="term"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-primary, #2E263D)" }}
                className="dark:text-text-primary-dark"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-primary, #2E263D)" }}
                className="dark:text-text-primary-dark"
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm dark:bg-card-dark">
                        <div className="grid grid-cols-2 gap-2">
                          {payload.map((entry, index) => (
                            <div key={`item-${index}`} className="flex flex-col">
                              <span className="text-xs font-medium" style={{ color: entry.color }}>
                                {entry.name}
                              </span>
                              <span className="text-xs font-bold">{formatCurrency(entry.value as number)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="paid"
                fill="url(#colorPaid)"
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="Paid Amount"
                stackId="a"
              />
              <Bar
                dataKey="pending"
                fill="url(#colorPending)"
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="Pending Amount"
                stackId="a"
              />
              <Legend
                layout="horizontal"
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "10px" }}
                formatter={(value) => <span className="text-text-primary dark:text-text-primary-dark">{value}</span>}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
