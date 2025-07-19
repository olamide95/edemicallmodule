"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GoalProgressBar } from "@/components/admin/referral/goals/goal-progress-bar"
import { CheckCircle, Clock, Target, Users } from "lucide-react"

// Mock data for completed goals
const completedGoals = [
  {
    id: 5,
    name: "New Parent Orientation",
    targetType: "Conversions",
    targetValue: 30,
    actualValue: 30,
    startDate: "2023-01-01",
    endDate: "2023-02-28",
    userType: "Parent",
    status: "Completed",
    progress: 100,
    completedOn: "2023-02-25",
    daysToComplete: 55,
  },
  {
    id: 6,
    name: "End of Year Staff Challenge",
    targetType: "Revenue",
    targetValue: 3000000,
    actualValue: 1200000,
    startDate: "2022-10-01",
    endDate: "2022-12-31",
    userType: "Staff",
    status: "Partially Completed",
    progress: 40,
    completedOn: "2022-12-31",
    daysToComplete: 91,
  },
  {
    id: 7,
    name: "Summer Enrollment Drive",
    targetType: "Referrals",
    targetValue: 200,
    actualValue: 215,
    startDate: "2022-05-01",
    endDate: "2022-08-31",
    userType: "All",
    status: "Exceeded",
    progress: 108,
    completedOn: "2022-08-15",
    daysToComplete: 106,
  },
  {
    id: 8,
    name: "Alumni Fundraising Campaign",
    targetType: "Revenue",
    targetValue: 10000000,
    actualValue: 12500000,
    startDate: "2022-01-15",
    endDate: "2022-06-30",
    userType: "Alumni",
    status: "Exceeded",
    progress: 125,
    completedOn: "2022-06-20",
    daysToComplete: 156,
  },
]

export function CompletedGoals() {
  const [goals] = useState(completedGoals)

  const formatValue = (type: string, value: number) => {
    if (type === "Revenue") {
      return `₦${value.toLocaleString()}`
    }
    return value
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600"
      case "Exceeded":
        return "bg-purple-500 hover:bg-purple-600"
      case "Partially Completed":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">Total completed campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((goals.filter((g) => g.progress >= 100).length / goals.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Goals that met or exceeded targets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(goals.reduce((acc, goal) => acc + goal.daysToComplete, 0) / goals.length)}
            </div>
            <p className="text-xs text-muted-foreground">Average days to complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Alumni</div>
            <p className="text-xs text-muted-foreground">Highest goal achievement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Goals</CardTitle>
          <CardDescription>Review of past referral campaign goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Name</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Time Period</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">{goal.name}</TableCell>
                  <TableCell>{formatValue(goal.targetType, goal.targetValue)}</TableCell>
                  <TableCell>{formatValue(goal.targetType, goal.actualValue)}</TableCell>
                  <TableCell>{goal.userType}</TableCell>
                  <TableCell>
                    {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <GoalProgressBar value={goal.progress} />
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
