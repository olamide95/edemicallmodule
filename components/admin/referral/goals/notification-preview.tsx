"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function NotificationPreview() {
  const [activeTab, setActiveTab] = useState("in-app")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preview</CardTitle>
        <CardDescription>Preview how notifications will appear to recipients</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="in-app" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="in-app">
              <Bell className="mr-2 h-4 w-4" />
              In-App
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquare className="mr-2 h-4 w-4" />
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-app" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/abstract-geometric.png" alt="Notification" />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Goal Milestone Reached</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">50%</Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Congratulations! The referral goal "Q1 Parent Referral Drive" has reached 50% completion.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">Current progress: 75 out of 150 Referrals</div>
                  <div className="mt-1 text-xs text-muted-foreground">Days remaining: 45</div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">View Goal</Button>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/abstract-geometric.png" alt="Notification" />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-amber-500 border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Goal Reminder</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">Reminder</Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reminder: The referral goal "Staff Referral Challenge" is currently at 84% completion.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">Current progress: 42 out of 50 Conversions</div>
                  <div className="mt-1 text-xs text-muted-foreground">Days remaining: 7</div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">View Goal</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted p-4 border-b">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">From: School Finance System &lt;noreply@school.edu&gt;</div>
                    <Badge>Email Preview</Badge>
                  </div>
                  <div className="text-sm">To: administrator@school.edu</div>
                  <div className="text-sm font-medium">
                    Subject: Goal Milestone Reached: Q1 Parent Referral Drive (50%)
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <Bell className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold">Goal Milestone Reached!</h2>
                </div>

                <p>Hello Administrator,</p>

                <p>
                  We're pleased to inform you that the referral goal <strong>"Q1 Parent Referral Drive"</strong> has
                  reached <strong>50%</strong> completion.
                </p>

                <div className="my-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Goal Progress Summary:</h3>
                  <ul className="space-y-2">
                    <li>
                      <strong>Current Progress:</strong> 75 out of 150 Referrals
                    </li>
                    <li>
                      <strong>Completion Rate:</strong> 50%
                    </li>
                    <li>
                      <strong>Days Remaining:</strong> 45
                    </li>
                    <li>
                      <strong>End Date:</strong> March 31, 2023
                    </li>
                  </ul>
                </div>

                <p>Keep up the great work! The goal is on track to be completed successfully.</p>

                <div className="text-center mt-6">
                  <Button className="mx-auto">View Goal Details</Button>
                </div>

                <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
                  <p>This is an automated message from the School Finance System. Please do not reply to this email.</p>
                  <p>To manage your notification preferences, please visit the settings page in your account.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="rounded-lg border p-6 max-w-md mx-auto">
              <div className="flex flex-col space-y-4">
                <div className="self-start bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    <span className="font-medium block">School Finance System</span>
                    Goal Milestone Reached: "Q1 Parent Referral Drive" has reached 50% completion (75/150 Referrals). 45
                    days remaining. Keep up the great work!
                  </p>
                </div>

                <div className="self-end bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Thanks for the update!</p>
                </div>

                <div className="self-start bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    <span className="font-medium block">School Finance System</span>
                    Reply VIEW to see goal details or STOP to unsubscribe from SMS notifications.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
