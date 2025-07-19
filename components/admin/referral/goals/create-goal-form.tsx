"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Bell } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { NotificationSettings } from "@/components/admin/referral/goals/notification-settings"

export function CreateGoalForm() {
  const [goalType, setGoalType] = useState("referrals")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [notifyParticipants, setNotifyParticipants] = useState(true)
  const [showOnDashboard, setShowOnDashboard] = useState(true)
  const [activeTab, setActiveTab] = useState("basic")
  const [userTypes, setUserTypes] = useState({
    parent: true,
    staff: true,
    student: false,
    alumni: false,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Referral Goal</CardTitle>
        <CardDescription>Set up a new goal for your referral campaign</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="rewards">Rewards & Incentives</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input id="goal-name" placeholder="e.g. Q2 Parent Referral Drive" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                placeholder="Brief description of this goal and its purpose"
                className="min-h-[100px]"
              />
            </div>

            <Tabs defaultValue="referrals" onValueChange={setGoalType} className="space-y-4">
              <div className="space-y-2">
                <Label>Goal Type</Label>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="referrals">Referrals</TabsTrigger>
                  <TabsTrigger value="conversions">Conversions</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="referrals" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-target">Target Number of Referrals</Label>
                  <Input id="referral-target" type="number" min="1" placeholder="e.g. 100" />
                </div>
              </TabsContent>

              <TabsContent value="conversions" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conversion-target">Target Number of Conversions</Label>
                  <Input id="conversion-target" type="number" min="1" placeholder="e.g. 50" />
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue-target">Target Revenue Amount (₦)</Label>
                  <Input id="revenue-target" type="number" min="1" placeholder="e.g. 5000000" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target User Types</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parent"
                    checked={userTypes.parent}
                    onCheckedChange={(checked) => setUserTypes({ ...userTypes, parent: checked === true })}
                  />
                  <Label htmlFor="parent">Parents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="staff"
                    checked={userTypes.staff}
                    onCheckedChange={(checked) => setUserTypes({ ...userTypes, staff: checked === true })}
                  />
                  <Label htmlFor="staff">Staff</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="student"
                    checked={userTypes.student}
                    onCheckedChange={(checked) => setUserTypes({ ...userTypes, student: checked === true })}
                  />
                  <Label htmlFor="student">Students</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="alumni"
                    checked={userTypes.alumni}
                    onCheckedChange={(checked) => setUserTypes({ ...userTypes, alumni: checked === true })}
                  />
                  <Label htmlFor="alumni">Alumni</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Additional Options</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-dashboard">Show on Dashboard</Label>
                  <Switch id="show-dashboard" checked={showOnDashboard} onCheckedChange={setShowOnDashboard} />
                </div>
                <p className="text-xs text-muted-foreground">Display this goal on the main referral dashboard</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="space-y-2">
              <Label>Milestone Rewards</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reward program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No rewards</SelectItem>
                  <SelectItem value="cash">Cash Payout Program</SelectItem>
                  <SelectItem value="tuition">Tuition Discount Program</SelectItem>
                  <SelectItem value="custom">Custom Rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Reward Milestones</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="reward-25" />
                  <Label htmlFor="reward-25">25% Completion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reward-50" defaultChecked />
                  <Label htmlFor="reward-50">50% Completion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reward-75" defaultChecked />
                  <Label htmlFor="reward-75">75% Completion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reward-100" defaultChecked />
                  <Label htmlFor="reward-100">100% Completion</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="completion-bonus">Completion Bonus</Label>
              <Input id="completion-bonus" type="number" placeholder="e.g. 5000" />
              <p className="text-xs text-muted-foreground">
                Additional bonus amount for completing the entire goal (in ₦)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reward-description">Reward Description</Label>
              <Textarea
                id="reward-description"
                placeholder="Describe the rewards for this goal..."
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <div className="flex gap-2">
          {activeTab === "basic" ? (
            <Button onClick={() => setActiveTab("notifications")}>Next: Notifications</Button>
          ) : activeTab === "notifications" ? (
            <>
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("rewards")}>Next: Rewards</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setActiveTab("notifications")}>
                Back
              </Button>
              <Button>Create Goal</Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
