"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSignIcon, TrendingUpIcon, BarChart3Icon } from "lucide-react"

export function AccountingOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,250,000</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              <span>+15% from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦850,000</div>
            <div className="flex items-center text-xs text-red-500">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              <span>+8% from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦400,000</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              <span>+32% from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦120,000</div>
            <div className="flex items-center text-xs text-amber-500">
              <span>5 invoices pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Club</CardTitle>
            <CardDescription>Top 5 clubs by revenue this term</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chess Club</p>
                  <p className="text-sm text-muted-foreground">25 students</p>
                </div>
                <div className="font-medium">₦375,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Robotics Club</p>
                  <p className="text-sm text-muted-foreground">15 students</p>
                </div>
                <div className="font-medium">₦300,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Science Club</p>
                  <p className="text-sm text-muted-foreground">22 students</p>
                </div>
                <div className="font-medium">₦220,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Art Club</p>
                  <p className="text-sm text-muted-foreground">18 students</p>
                </div>
                <div className="font-medium">₦180,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Music Club</p>
                  <p className="text-sm text-muted-foreground">15 students</p>
                </div>
                <div className="font-medium">₦175,000</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Last 5 financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vendor Payment - Chess Club</p>
                  <p className="text-sm text-muted-foreground">2023-11-15</p>
                </div>
                <div className="font-medium text-red-500">-₦150,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Club Fee - Robotics Club</p>
                  <p className="text-sm text-muted-foreground">2023-11-10</p>
                </div>
                <div className="font-medium text-green-500">+₦300,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Materials Purchase - Science Club</p>
                  <p className="text-sm text-muted-foreground">2023-11-05</p>
                </div>
                <div className="font-medium text-red-500">-₦45,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Club Fee - Art Club</p>
                  <p className="text-sm text-muted-foreground">2023-11-01</p>
                </div>
                <div className="font-medium text-green-500">+₦180,000</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vendor Payment - Music Club</p>
                  <p className="text-sm text-muted-foreground">2023-10-28</p>
                </div>
                <div className="font-medium text-red-500">-₦80,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
