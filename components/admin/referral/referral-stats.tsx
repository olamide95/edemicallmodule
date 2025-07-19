"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Users, Award, DollarSign, TrendingUp } from "lucide-react"

export function ReferralStats() {
  // In a real app, this would come from an API
  const stats = {
    totalReferrals: 156,
    activeReferrers: 42,
    conversionRate: 68,
    totalSavings: 78500,
    growthRate: 12,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          <Users className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="success" className="mr-1">
              +{stats.growthRate}%
            </Badge>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
          <Award className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeReferrers}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-[#56CA00] inline-flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +4
            </span>{" "}
            new this week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="success" className="mr-1">
              +5%
            </Badge>
            from previous quarter
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <DollarSign className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦{stats.totalSavings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="info" className="mr-1">
              +₦12,500
            </Badge>
            this month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
