"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Users, Wallet } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦45,231,890</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collection Today</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦1,245,000</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-3 w-3 text-[hsl(var(--success))]" />
            <span className="text-xs text-[hsl(var(--success))] font-medium">+15.8% from yesterday</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦12,234,500</div>
          <div className="flex items-center pt-1">
            <ArrowDown className="mr-1 h-3 w-3 text-[hsl(var(--error))]" />
            <span className="text-xs text-[hsl(var(--error))] font-medium">-2.5% from last week</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78.5%</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-3 w-3 text-[hsl(var(--success))]" />
            <span className="text-xs text-[hsl(var(--success))] font-medium">+4.3% from last term</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
