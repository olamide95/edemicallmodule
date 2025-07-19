"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface ReferralFinancialImpactProps {
  metric?: "roi" | "cpa"
}

export function ReferralFinancialImpact({ metric }: ReferralFinancialImpactProps) {
  // In a real app, this would come from an API
  const financialData = useMemo(
    () => [
      {
        month: "Jan",
        revenue: 4250000,
        costs: 850000,
        profit: 3400000,
        roi: 400,
        cpa: 42500,
      },
      {
        month: "Feb",
        revenue: 4850000,
        costs: 920000,
        profit: 3930000,
        roi: 427,
        cpa: 40000,
      },
      {
        month: "Mar",
        revenue: 5350000,
        costs: 980000,
        profit: 4370000,
        roi: 446,
        cpa: 38500,
      },
      {
        month: "Apr",
        revenue: 5750000,
        costs: 1050000,
        profit: 4700000,
        roi: 448,
        cpa: 37500,
      },
      {
        month: "May",
        revenue: 6250000,
        costs: 1120000,
        profit: 5130000,
        roi: 458,
        cpa: 35000,
      },
      {
        month: "Jun",
        revenue: 5850000,
        costs: 1080000,
        profit: 4770000,
        roi: 442,
        cpa: 36000,
      },
      {
        month: "Jul",
        revenue: 5450000,
        costs: 1020000,
        profit: 4430000,
        roi: 434,
        cpa: 37000,
      },
      {
        month: "Aug",
        revenue: 5150000,
        costs: 980000,
        profit: 4170000,
        roi: 425,
        cpa: 38000,
      },
      {
        month: "Sep",
        revenue: 5650000,
        costs: 1050000,
        profit: 4600000,
        roi: 438,
        cpa: 36500,
      },
      {
        month: "Oct",
        revenue: 6150000,
        costs: 1100000,
        profit: 5050000,
        roi: 459,
        cpa: 35500,
      },
      {
        month: "Nov",
        revenue: 6650000,
        costs: 1150000,
        profit: 5500000,
        roi: 478,
        cpa: 34000,
      },
      {
        month: "Dec",
        revenue: 7250000,
        costs: 1250000,
        profit: 6000000,
        roi: 480,
        cpa: 33500,
      },
    ],
    [],
  )

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`
  }

  const totalRevenue = useMemo(() => {
    return financialData.reduce((sum, item) => sum + item.revenue, 0)
  }, [financialData])

  const totalCosts = useMemo(() => {
    return financialData.reduce((sum, item) => sum + item.costs, 0)
  }, [financialData])

  const totalProfit = useMemo(() => {
    return totalRevenue - totalCosts
  }, [totalRevenue, totalCosts])

  const averageROI = useMemo(() => {
    return financialData.reduce((sum, item) => sum + item.roi, 0) / financialData.length
  }, [financialData])

  const averageCPA = useMemo(() => {
    return financialData.reduce((sum, item) => sum + item.cpa, 0) / financialData.length
  }, [financialData])

  if (metric === "roi") {
    return (
      <div className="space-y-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="roi"
                name="ROI (%)"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Average ROI</div>
              <div className="text-2xl font-bold mt-1">{averageROI.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground mt-1">
                Return on investment across all referral programs
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Best Month</div>
              <div className="text-2xl font-bold mt-1">
                {financialData.reduce((best, item) => (item.roi > best.roi ? item : best), financialData[0]).month} (
                {financialData.reduce((best, item) => (item.roi > best.roi ? item : best), financialData[0]).roi}%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">Month with highest return on investment</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (metric === "cpa") {
    return (
      <div className="space-y-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Cost per Acquisition"]} />
              <Legend />
              <Bar dataKey="cpa" name="Cost per Acquisition" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Average CPA</div>
              <div className="text-2xl font-bold mt-1">₦{averageCPA.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average cost to acquire one student through referrals
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Best Month</div>
              <div className="text-2xl font-bold mt-1">
                {financialData.reduce((best, item) => (item.cpa < best.cpa ? item : best), financialData[0]).month} ( ₦
                {financialData
                  .reduce((best, item) => (item.cpa < best.cpa ? item : best), financialData[0])
                  .cpa.toLocaleString()}
                )
              </div>
              <div className="text-xs text-muted-foreground mt-1">Month with lowest cost per acquisition</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => [formatCurrency(value), ""]} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="costs"
              name="Costs"
              stackId="2"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="Profit"
              stackId="3"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-muted-foreground mt-1">Revenue generated from referred students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">Total Costs</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(totalCosts)}</div>
            <div className="text-xs text-muted-foreground mt-1">Costs of referral program incentives</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground">Net Profit</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(totalProfit)}</div>
            <div className="text-xs text-muted-foreground mt-1">Net profit from referral program</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
