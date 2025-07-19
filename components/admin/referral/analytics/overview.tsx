"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, UserCheck, DollarSign, Clock, BarChart3, Percent, Award } from "lucide-react"

export function ReferralAnalyticsOverview() {
  // In a real app, this would come from an API
  const metrics = useMemo(
    () => [
      {
        title: "Total Referrals",
        value: "1,248",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
      },
      {
        title: "Conversion Rate",
        value: "68.4%",
        change: "+5.2%",
        trend: "up",
        icon: Percent,
        color: "text-green-500",
        bgColor: "bg-green-100",
      },
      {
        title: "Avg. Time to Convert",
        value: "14 days",
        change: "-2.3 days",
        trend: "up",
        icon: Clock,
        color: "text-amber-500",
        bgColor: "bg-amber-100",
      },
      {
        title: "Revenue Generated",
        value: "₦42.5M",
        change: "+18.7%",
        trend: "up",
        icon: DollarSign,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
      },
      {
        title: "Active Referrers",
        value: "386",
        change: "+8.9%",
        trend: "up",
        icon: UserCheck,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
      },
      {
        title: "Referral ROI",
        value: "412%",
        change: "+24.5%",
        trend: "up",
        icon: TrendingUp,
        color: "text-rose-500",
        bgColor: "bg-rose-100",
      },
      {
        title: "Top Program",
        value: "Staff Cash",
        change: "No change",
        trend: "neutral",
        icon: Award,
        color: "text-teal-500",
        bgColor: "bg-teal-100",
      },
      {
        title: "Avg. Referrals/User",
        value: "3.2",
        change: "+0.4",
        trend: "up",
        icon: BarChart3,
        color: "text-cyan-500",
        bgColor: "bg-cyan-100",
      },
    ],
    [],
  )

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                <p
                  className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : "text-gray-500"}`}
                >
                  {metric.change}
                </p>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
