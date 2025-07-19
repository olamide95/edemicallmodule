"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const monthlyData = [
  { name: "Jan", amount: 180000 },
  { name: "Feb", amount: 220000 },
  { name: "Mar", amount: 280000 },
  { name: "Apr", amount: 250000 },
  { name: "May", amount: 300000 },
  { name: "Jun", amount: 260000 },
  { name: "Jul", amount: 320000 },
  { name: "Aug", amount: 290000 },
  { name: "Sep", amount: 350000 },
  { name: "Oct", amount: 380000 },
  { name: "Nov", amount: 420000 },
  { name: "Dec", amount: 450000 },
]

const weeklyData = [
  { name: "Mon", amount: 65000 },
  { name: "Tue", amount: 85000 },
  { name: "Wed", amount: 120000 },
  { name: "Thu", amount: 75000 },
  { name: "Fri", amount: 95000 },
  { name: "Sat", amount: 45000 },
  { name: "Sun", amount: 25000 },
]

const quarterlyData = [
  { name: "Q1", amount: 680000 },
  { name: "Q2", amount: 810000 },
  { name: "Q3", amount: 960000 },
  { name: "Q4", amount: 1250000 },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/NGN/g, "₦")
}

export function CollectionChart() {
  const [activeTab, setActiveTab] = useState("monthly")

  const data = activeTab === "monthly" ? monthlyData : activeTab === "weekly" ? weeklyData : quarterlyData

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Collection Trends</CardTitle>
        <CardDescription>Fee collection trends over time</CardDescription>
        <Tabs defaultValue="monthly" className="mt-3" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), "Amount"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
