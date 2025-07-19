"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Week 1",
    present: 5,
    absent: 0,
  },
  {
    name: "Week 2",
    present: 4,
    absent: 1,
  },
  {
    name: "Week 3",
    present: 5,
    absent: 0,
  },
  {
    name: "Week 4",
    present: 3,
    absent: 2,
  },
  {
    name: "Week 5",
    present: 5,
    absent: 0,
  },
  {
    name: "Week 6",
    present: 4,
    absent: 1,
  },
]

export function StudentAttendanceChart() {
  return (
    <ChartContainer
      config={{
        present: { label: "Present", color: "#10b981" },
        absent: { label: "Absent", color: "#ef4444" },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="present" stackId="a" fill="var(--color-present, #10b981)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" stackId="a" fill="var(--color-absent, #ef4444)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
