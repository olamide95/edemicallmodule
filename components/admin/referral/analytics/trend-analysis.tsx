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

interface ReferralTrendAnalysisProps {
  metric?: "conversionTime" | "yoy"
}

export function ReferralTrendAnalysis({ metric }: ReferralTrendAnalysisProps) {
  // In a real app, this would come from an API
  const trendData = useMemo(
    () => [
      {
        month: "Jan",
        referrals: 125,
        conversions: 78,
        conversionTime: 16,
        thisYear: 125,
        lastYear: 95,
      },
      {
        month: "Feb",
        referrals: 145,
        conversions: 92,
        conversionTime: 15,
        thisYear: 145,
        lastYear: 105,
      },
      {
        month: "Mar",
        referrals: 165,
        conversions: 108,
        conversionTime: 14,
        thisYear: 165,
        lastYear: 115,
      },
      {
        month: "Apr",
        referrals: 185,
        conversions: 124,
        conversionTime: 14,
        thisYear: 185,
        lastYear: 125,
      },
      {
        month: "May",
        referrals: 205,
        conversions: 142,
        conversionTime: 13,
        thisYear: 205,
        lastYear: 135,
      },
      {
        month: "Jun",
        referrals: 185,
        conversions: 130,
        conversionTime: 13,
        thisYear: 185,
        lastYear: 130,
      },
      {
        month: "Jul",
        referrals: 165,
        conversions: 118,
        conversionTime: 14,
        thisYear: 165,
        lastYear: 125,
      },
      {
        month: "Aug",
        referrals: 155,
        conversions: 112,
        conversionTime: 14,
        thisYear: 155,
        lastYear: 120,
      },
      {
        month: "Sep",
        referrals: 175,
        conversions: 128,
        conversionTime: 13,
        thisYear: 175,
        lastYear: 130,
      },
      {
        month: "Oct",
        referrals: 195,
        conversions: 146,
        conversionTime: 12,
        thisYear: 195,
        lastYear: 140,
      },
      {
        month: "Nov",
        referrals: 215,
        conversions: 164,
        conversionTime: 12,
        thisYear: 215,
        lastYear: 150,
      },
      {
        month: "Dec",
        referrals: 235,
        conversions: 182,
        conversionTime: 11,
        thisYear: 235,
        lastYear: 160,
      },
    ],
    [],
  )

  if (metric === "conversionTime") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} days`, "Avg. Conversion Time"]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="conversionTime"
              name="Avg. Days to Convert"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (metric === "yoy") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="thisYear" name="This Year" fill="#3b82f6" />
            <Bar dataKey="lastYear" name="Last Year" fill="#9ca3af" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="referrals"
            name="Referrals"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="conversions"
            name="Conversions"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
