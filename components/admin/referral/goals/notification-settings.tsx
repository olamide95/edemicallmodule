"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Bell, Mail, MessageSquare, Users } from "lucide-react"

export function NotificationSettings({ goalId }: { goalId?: number }) {
  const [milestones, setMilestones] = useState([
    { id: 1, percentage: 25, notifyAdmin: true, notifyParticipants: true, channels: ["email", "in-app"] },
    { id: 2, percentage: 50, notifyAdmin: true, notifyParticipants: true, channels: ["email", "in-app"] },
    { id: 3, percentage: 75, notifyAdmin: true, notifyParticipants: true, channels: ["email", "in-app"] },
    { id: 4, percentage: 100, notifyAdmin: true, notifyParticipants: true, channels: ["email", "in-app", "sms"] },
  ])

  const [reminderSettings, setReminderSettings] = useState({
    enableReminders: true,
    reminderFrequency: "weekly",
    daysBeforeEnd: 7,
    notifyAdmin: true,
    notifyParticipants: true,
  })

  const [customMilestone, setCustomMilestone] = useState(0)
  const [selectedTab, setSelectedTab] = useState("milestones")

  const addMilestone = () => {
    if (customMilestone > 0 && customMilestone <= 100) {
      // Check if milestone already exists
      if (milestones.some((m) => m.percentage === customMilestone)) {
        return
      }

      const newMilestone = {
        id: Date.now(),
        percentage: customMilestone,
        notifyAdmin: true,
        notifyParticipants: true,
        channels: ["email", "in-app"],
      }

      setMilestones([...milestones, newMilestone].sort((a, b) => a.percentage - b.percentage))
      setCustomMilestone(0)
    }
  }

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const toggleChannel = (id: number, channel: string) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === id) {
          const channels = m.channels.includes(channel)
            ? m.channels.filter((c) => c !== channel)
            : [...m.channels, channel]
          return { ...m, channels }
        }
        return m
      }),
    )
  }

  const toggleNotifyAdmin = (id: number) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === id) {
          return { ...m, notifyAdmin: !m.notifyAdmin }
        }
        return m
      }),
    )
  }

  const toggleNotifyParticipants = (id: number) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === id) {
          return { ...m, notifyParticipants: !m.notifyParticipants }
        }
        return m
      }),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure when and how to send notifications about goal progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="milestones" onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="milestones">Progress Milestones</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="custom-milestone">Add Custom Milestone</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="custom-milestone"
                    value={[customMilestone]}
                    onValueChange={(value) => setCustomMilestone(value[0])}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{customMilestone}%</span>
                </div>
              </div>
              <Button onClick={addMilestone} disabled={customMilestone === 0}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Current Milestones</h3>
              {milestones.map((milestone) => (
                <div key={milestone.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Badge className="bg-primary mr-2">{milestone.percentage}%</Badge>
                      <h4 className="font-medium">
                        {milestone.percentage === 100
                          ? "Goal Completion"
                          : `${milestone.percentage}% Progress Milestone`}
                      </h4>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeMilestone(milestone.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Recipients</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Administrators</span>
                          </div>
                          <Switch
                            checked={milestone.notifyAdmin}
                            onCheckedChange={() => toggleNotifyAdmin(milestone.id)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Participants</span>
                          </div>
                          <Switch
                            checked={milestone.notifyParticipants}
                            onCheckedChange={() => toggleNotifyParticipants(milestone.id)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Notification Channels</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={milestone.channels.includes("email") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleChannel(milestone.id, "email")}
                          className="h-8"
                        >
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Button>
                        <Button
                          variant={milestone.channels.includes("in-app") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleChannel(milestone.id, "in-app")}
                          className="h-8"
                        >
                          <Bell className="mr-1 h-3 w-3" />
                          In-App
                        </Button>
                        <Button
                          variant={milestone.channels.includes("sms") ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleChannel(milestone.id, "sms")}
                          className="h-8"
                        >
                          <MessageSquare className="mr-1 h-3 w-3" />
                          SMS
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-reminders">Enable Periodic Reminders</Label>
                <Switch
                  id="enable-reminders"
                  checked={reminderSettings.enableReminders}
                  onCheckedChange={(checked) => setReminderSettings({ ...reminderSettings, enableReminders: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                <Select
                  value={reminderSettings.reminderFrequency}
                  onValueChange={(value) => setReminderSettings({ ...reminderSettings, reminderFrequency: value })}
                  disabled={!reminderSettings.enableReminders}
                >
                  <SelectTrigger id="reminder-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days-before-end">Days Before End Reminder</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="days-before-end"
                    value={[reminderSettings.daysBeforeEnd]}
                    onValueChange={(value) => setReminderSettings({ ...reminderSettings, daysBeforeEnd: value[0] })}
                    max={30}
                    step={1}
                    disabled={!reminderSettings.enableReminders}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{reminderSettings.daysBeforeEnd} days</span>
                </div>
                <p className="text-xs text-muted-foreground">Send a reminder when the goal is about to end</p>
              </div>

              <div className="space-y-2 pt-4">
                <Label className="text-sm">Recipients</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Administrators</span>
                    </div>
                    <Switch
                      checked={reminderSettings.notifyAdmin}
                      onCheckedChange={(checked) => setReminderSettings({ ...reminderSettings, notifyAdmin: checked })}
                      disabled={!reminderSettings.enableReminders}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Participants</span>
                    </div>
                    <Switch
                      checked={reminderSettings.notifyParticipants}
                      onCheckedChange={(checked) =>
                        setReminderSettings({ ...reminderSettings, notifyParticipants: checked })
                      }
                      disabled={!reminderSettings.enableReminders}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="milestone-template">Milestone Notification Template</Label>
                <Textarea
                  id="milestone-template"
                  className="min-h-[100px]"
                  placeholder="Write your milestone notification template here..."
                  defaultValue={`Congratulations! The referral goal "[Goal Name]" has reached [Percentage]% completion. 

Current progress: [Current] out of [Target] [Type]
Days remaining: [Days]

Keep up the great work!`}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: [Goal Name], [Percentage], [Current], [Target], [Type], [Days], [Start Date],
                  [End Date]
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-template">Reminder Notification Template</Label>
                <Textarea
                  id="reminder-template"
                  className="min-h-[100px]"
                  placeholder="Write your reminder notification template here..."
                  defaultValue={`Reminder: The referral goal "[Goal Name]" is currently at [Percentage]% completion.

Current progress: [Current] out of [Target] [Type]
Days remaining: [Days]

Let's work together to reach our target!`}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: [Goal Name], [Percentage], [Current], [Target], [Type], [Days], [Start Date],
                  [End Date]
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="completion-template">Goal Completion Template</Label>
                <Textarea
                  id="completion-template"
                  className="min-h-[100px]"
                  placeholder="Write your goal completion notification template here..."
                  defaultValue={`Congratulations! The referral goal "[Goal Name]" has been successfully completed!

Final result: [Current] out of [Target] [Type] ([Percentage]%)

Thank you for your contribution to this achievement!`}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: [Goal Name], [Percentage], [Current], [Target], [Type], [Days], [Start Date],
                  [End Date]
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button>Save Notification Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}
