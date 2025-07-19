"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
} from "recharts"

export {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RechartsLineChart as LineChart,
  RechartsLine as Line,
}

export function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md p-2 shadow-md">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={`item-${index}`} className="text-gray-700">
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  category: string
  index: string
  valueFormatter: (value: number) => string
  colors: string[]
  className?: string
  label?: string
  showAnimation?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  legendPosition?: "top" | "bottom" | "left" | "right"
}

export function DonutChart({
  data,
  category,
  index,
  valueFormatter,
  colors,
  className,
  label,
  showAnimation,
  showTooltip,
  showLegend,
  legendPosition,
}: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <PieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={2}
          labelLine={false}
          label={false}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip />}
        {showLegend && <Legend verticalAlign={legendPosition || "bottom"} height={36} />}
      </PieChart>
    </ResponsiveContainer>
  )
}
