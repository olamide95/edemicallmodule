"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GoalProgressBar } from "@/components/admin/referral/goals/goal-progress-bar"
import { GoalChart } from "@/components/admin/referral/goals/goal-chart"
import { AlertCircle, Award, Calendar, CheckCircle, Clock, Target, TrendingUp, Users } from "lucide-react"

// Mock data for active goals
const activeGoals = [
  {
    id: 1,
    name: "Q1 Parent Referral Drive",
    targetType: "Referrals",
    targetValue: 150,
    currentValue: 87,
    startDate: "2023-01-01",
    endDate: "2023-03-31",
    userType: "Parent",
    status: "Active",
    progress: 58,
    trend: "up",
    trendValue: "+12%",
    daysLeft: 15,
    icon: Users,
  },
  {
    id: 2,
    name: "Staff Referral Challenge",
    targetType: "Conversions",
    targetValue: 50,
    currentValue: 42,
    startDate: "2023-02-15",
    endDate: "2023-05-15",
    userType: "Staff",
    status: "Active",
    progress: 84,
    trend: "up",
    trendValue: "+5%",
    daysLeft: 45,
    icon: Award,
  },
  {
    id: 3,
    name: "Alumni Network Growth",
    targetType: "Revenue",
    targetValue: 5000000,
    currentValue: 2750000,
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    userType: "Alumni",
    status: "Active",
    progress: 55,
    trend: "up",
    trendValue: "+8%",
    daysLeft: 92,
    icon: TrendingUp,
  },
  {
    id: 4,
    name: "Student Ambassador Program",
    targetType: "Referrals",
    targetValue: 100,
    currentValue: 35,
    startDate: "2023-03-01",
    endDate: "2023-05-31",
    userType: "Student",
    status: "At Risk",
    progress: 35,
    trend: "down",
    trendValue: "-3%",
    daysLeft: 61,
    icon: Target,
  },
]

export function ActiveGoals() {
  const formatValue = (type: string, value: number) => {
    if (type === "Revenue") {
      return `₦${value.toLocaleString()}`
    }
    return value
  }

  const getStatusColor = (status: string, progress: number, daysLeft: number) => {
    if (status === "At Risk") return "bg-amber-500 hover:bg-amber-600"
    if (progress > 75) return "bg-green-500 hover:bg-green-600"
    if (daysLeft < 30 && progress < 50) return "bg-red-500 hover:bg-red-600"
    return "bg-blue-500 hover:bg-blue-600"
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground">Across all user types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(activeGoals.reduce((acc, goal) => acc + goal.progress, 0) / activeGoals.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals at Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Completions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Within next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Goal Progress Trends</CardTitle>
            <CardDescription>Weekly progress for active goals</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <GoalChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Goals by User Type</CardTitle>
            <CardDescription>Distribution of active goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                  <span>Parent</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Staff</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-purple-500 mr-2"></div>
                  <span>Alumni</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
                  <span>Student</span>
                </div>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Active Goal Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {activeGoals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{goal.name}</CardTitle>
                  <Badge className={getStatusColor(goal.status, goal.progress, goal.daysLeft)}>{goal.status}</Badge>
                </div>
                <CardDescription>
                  Target: {formatValue(goal.targetType, goal.targetValue)} {goal.targetType}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <GoalProgressBar value={goal.progress} showLabel />

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center">
                        <Users className="mr-1 h-3 w-3" /> User Type
                      </span>
                      <span className="font-medium">{goal.userType}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> Days Left
                      </span>
                      <span className="font-medium">{goal.daysLeft}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center">
                        <TrendingUp className="mr-1 h-3 w-3" /> Trend
                      </span>
                      <span className={`font-medium ${goal.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {goal.trendValue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>
                        {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
