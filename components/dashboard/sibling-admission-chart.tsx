"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart2"

// Sample data for sibling vs single admission
const data = [
  { name: "Single Admission", value: 75 },
  { name: "Sibling Admission", value: 25 },
]

// Custom colors for the chart
const COLORS = ["#8C57FF", "#56CA00"]

export default function SiblingAdmissionChart() {
  return (
    <ChartContainer
      config={{
        single: {
          label: "Single Admission",
          color: "hsl(262, 100%, 67%)",
        },
        sibling: {
          label: "Sibling Admission",
          color: "hsl(120, 100%, 40%)",
        },
      }}
      className="h-[250px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
