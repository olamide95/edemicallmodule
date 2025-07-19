"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ReferralConversionFunnel() {
  // In a real app, this would come from an API
  const data = useMemo(
    () => [
      {
        name: "Invitations Sent",
        value: 2150,
        fill: "#c7d2fe", // indigo-200
      },
      {
        name: "Link Clicked",
        value: 1680,
        fill: "#a5b4fc", // indigo-300
      },
      {
        name: "Form Completed",
        value: 1245,
        fill: "#818cf8", // indigo-400
      },
      {
        name: "Application Started",
        value: 980,
        fill: "#6366f1", // indigo-500
      },
      {
        name: "Application Completed",
        value: 854,
        fill: "#4f46e5", // indigo-600
      },
      {
        name: "Enrolled",
        value: 685,
        fill: "#4338ca", // indigo-700
      },
      {
        name: "Tuition Paid",
        value: 652,
        fill: "#3730a3", // indigo-800
      },
    ],
    [],
  )

  const conversionRates = useMemo(() => {
    const result = []
    for (let i = 1; i < data.length; i++) {
      const rate = ((data[i].value / data[i - 1].value) * 100).toFixed(1)
      result.push({
        from: data[i - 1].name,
        to: data[i].name,
        rate: `${rate}%`,
        absolute: `${data[i].value} / ${data[i - 1].value}`,
      })
    }
    return result
  }, [data])

  const overallRate = useMemo(() => {
    return ((data[data.length - 1].value / data[0].value) * 100).toFixed(1)
  }, [data])

  return (
    <div className="space-y-8">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip formatter={(value) => [`${value} users`, "Count"]} labelFormatter={(label) => `Stage: ${label}`} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">
            Overall Conversion Rate: <span className="font-bold text-indigo-600">{overallRate}%</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {data[data.length - 1].value} enrolled students from {data[0].value} invitations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {conversionRates.map((item, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">
                {item.from} → {item.to}
              </div>
              <div className="mt-1 text-xl font-bold">{item.rate}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.absolute}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
