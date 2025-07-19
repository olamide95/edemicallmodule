"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Eye } from "lucide-react"
import { GoalProgressBar } from "@/components/admin/referral/goals/goal-progress-bar"

// Mock data for goals
const mockGoals = [
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
    status: "Active",
    progress: 35,
  },
  {
    id: 5,
    name: "New Parent Orientation",
    targetType: "Conversions",
    targetValue: 30,
    currentValue: 30,
    startDate: "2023-01-01",
    endDate: "2023-02-28",
    userType: "Parent",
    status: "Completed",
    progress: 100,
  },
  {
    id: 6,
    name: "End of Year Staff Challenge",
    targetType: "Revenue",
    targetValue: 3000000,
    currentValue: 1200000,
    startDate: "2022-10-01",
    endDate: "2022-12-31",
    userType: "Staff",
    status: "Completed",
    progress: 40,
  },
]

export function GoalsList() {
  const [goals, setGoals] = useState(mockGoals)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<any>(null)

  const handleEdit = (goal: any) => {
    setCurrentGoal(goal)
    setShowEditDialog(true)
  }

  const handleView = (goal: any) => {
    setCurrentGoal(goal)
    setShowViewDialog(true)
  }

  const handleDelete = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const saveGoal = () => {
    if (currentGoal) {
      setGoals(goals.map((goal) => (goal.id === currentGoal.id ? currentGoal : goal)))
      setShowEditDialog(false)
    }
  }

  const formatValue = (type: string, value: number) => {
    if (type === "Revenue") {
      return `₦${value.toLocaleString()}`
    }
    return value
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>All Referral Goals</CardTitle>
          <CardDescription>View and manage all your referral campaign goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Name</TableHead>
                <TableHead>Target</TableHead>
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
                  <TableCell>
                    {formatValue(goal.targetType, goal.currentValue)} / {formatValue(goal.targetType, goal.targetValue)}{" "}
                    {goal.targetType}
                  </TableCell>
                  <TableCell>{goal.userType}</TableCell>
                  <TableCell>
                    {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <GoalProgressBar value={goal.progress} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        goal.status === "Active"
                          ? "bg-green-500 hover:bg-green-600"
                          : goal.status === "Completed"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-amber-500 hover:bg-amber-600"
                      }
                    >
                      {goal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(goal)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(goal)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(goal.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Showing {goals.length} goals</div>
          <Button variant="outline">Export Goals</Button>
        </CardFooter>
      </Card>

      {/* Edit Goal Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>Make changes to the referral goal</DialogDescription>
          </DialogHeader>
          {currentGoal && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={currentGoal.name}
                  onChange={(e) => setCurrentGoal({ ...currentGoal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="target-type">Target Type</Label>
                  <Select
                    value={currentGoal.targetType}
                    onValueChange={(value) => setCurrentGoal({ ...currentGoal, targetType: value })}
                  >
                    <SelectTrigger id="target-type">
                      <SelectValue placeholder="Select target type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Referrals">Referrals</SelectItem>
                      <SelectItem value="Conversions">Conversions</SelectItem>
                      <SelectItem value="Revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="target-value">Target Value</Label>
                  <Input
                    id="target-value"
                    type="number"
                    value={currentGoal.targetValue}
                    onChange={(e) =>
                      setCurrentGoal({ ...currentGoal, targetValue: Number.parseInt(e.target.value, 10) || 0 })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={currentGoal.startDate}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={currentGoal.endDate}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-type">User Type</Label>
                  <Select
                    value={currentGoal.userType}
                    onValueChange={(value) => setCurrentGoal({ ...currentGoal, userType: value })}
                  >
                    <SelectTrigger id="user-type">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                      <SelectItem value="All">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentGoal.status}
                    onValueChange={(value) => setCurrentGoal({ ...currentGoal, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current-value">Current Value</Label>
                <Input
                  id="current-value"
                  type="number"
                  value={currentGoal.currentValue}
                  onChange={(e) =>
                    setCurrentGoal({
                      ...currentGoal,
                      currentValue: Number.parseInt(e.target.value, 10) || 0,
                      progress: Math.min(
                        100,
                        Math.round((Number.parseInt(e.target.value, 10) / currentGoal.targetValue) * 100),
                      ),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Goal Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Goal Details</DialogTitle>
            <DialogDescription>Detailed information about this goal</DialogDescription>
          </DialogHeader>
          {currentGoal && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{currentGoal.name}</h3>
                <GoalProgressBar value={currentGoal.progress} showLabel />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Target Type</p>
                  <p className="font-medium">{currentGoal.targetType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Value</p>
                  <p className="font-medium">{formatValue(currentGoal.targetType, currentGoal.targetValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="font-medium">{formatValue(currentGoal.targetType, currentGoal.currentValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Type</p>
                  <p className="font-medium">{currentGoal.userType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{new Date(currentGoal.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{new Date(currentGoal.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={
                      currentGoal.status === "Active"
                        ? "bg-green-500 hover:bg-green-600"
                        : currentGoal.status === "Completed"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-amber-500 hover:bg-amber-600"
                    }
                  >
                    {currentGoal.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="font-medium">
                    {Math.max(
                      0,
                      Math.ceil(
                        (new Date(currentGoal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
