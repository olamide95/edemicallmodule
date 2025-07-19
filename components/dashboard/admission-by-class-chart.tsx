"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart2"

// Sample data for the pie chart by class
const data = [
  { name: "Toddlers", value: 15 },
  { name: "Nursery 1", value: 20 },
  { name: "Nursery 2", value: 25 },
  { name: "Grade 1", value: 30 },
  { name: "Grade 2", value: 22 },
  { name: "Grade 3", value: 18 },
  { name: "Grade 4", value: 15 },
  { name: "Grade 5", value: 12 },
  { name: "Grade 6", value: 10 },
]

// Custom colors for the chart
const COLORS = ["#8C57FF", "#16B1FF", "#FFB400", "#56CA00", "#FF4C51", "#8A8D93", "#9747FF", "#F76E11", "#2196F3"]

export default function AdmissionByClassChart() {
  return (
    <ChartContainer
      config={{
        Toddlers: {
          label: "Toddlers",
          color: "hsl(262, 100%, 67%)",
        },
        "Nursery 1": {
          label: "Nursery 1",
          color: "hsl(201, 100%, 55%)",
        },
        "Nursery 2": {
          label: "Nursery 2",
          color: "hsl(40, 100%, 50%)",
        },
        "Grade 1": {
          label: "Grade 1",
          color: "hsl(120, 100%, 40%)",
        },
        "Grade 2": {
          label: "Grade 2",
          color: "hsl(0, 100%, 65%)",
        },
        "Grade 3": {
          label: "Grade 3",
          color: "hsl(220, 4%, 56%)",
        },
        "Grade 4": {
          label: "Grade 4",
          color: "hsl(270, 100%, 64%)",
        },
        "Grade 5": {
          label: "Grade 5",
          color: "hsl(25, 87%, 52%)",
        },
        "Grade 6": {
          label: "Grade 6",
          color: "hsl(201, 90%, 54%)",
        },
      }}
      className="h-[250px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name">
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
