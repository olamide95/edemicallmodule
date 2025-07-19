"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Check, Clock, Filter, MoreHorizontal, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Goal Milestone Reached",
    description: "Q1 Parent Referral Drive has reached 50% completion.",
    details: "Current progress: 75 out of 150 Referrals",
    time: "2 hours ago",
    type: "milestone",
    read: false,
    goalId: 1,
  },
  {
    id: 2,
    title: "Goal Reminder",
    description: "Staff Referral Challenge is at 84% with 7 days remaining.",
    details: "Current progress: 42 out of 50 Conversions",
    time: "Yesterday",
    type: "reminder",
    read: false,
    goalId: 2,
  },
  {
    id: 3,
    title: "Goal at Risk",
    description: "Student Ambassador Program is behind schedule.",
    details: "Current progress: 35 out of 100 Referrals (35%)",
    time: "2 days ago",
    type: "alert",
    read: true,
    goalId: 4,
  },
  {
    id: 4,
    title: "Goal Approaching Completion",
    description: "Alumni Network Growth is at 90% completion.",
    details: "Current progress: 4,500,000 out of 5,000,000 Revenue",
    time: "3 days ago",
    type: "milestone",
    read: true,
    goalId: 3,
  },
  {
    id: 5,
    title: "New Goal Created",
    description: "End of Year Staff Challenge has been created.",
    details: "Target: 3,000,000 Revenue by December 31, 2023",
    time: "1 week ago",
    type: "info",
    read: true,
    goalId: 6,
  },
  {
    id: 6,
    title: "Goal Completed",
    description: "New Parent Orientation goal has been completed successfully!",
    details: "Final result: 30 out of 30 Conversions (100%)",
    time: "2 weeks ago",
    type: "completion",
    read: true,
    goalId: 5,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-green-500"
      case "reminder":
        return "bg-blue-500"
      case "alert":
        return "bg-red-500"
      case "completion":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Bell className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      case "alert":
        return <X className="h-4 w-4" />
      case "completion":
        return <Check className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>View and manage your goal notifications</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All Read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
            Clear All
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All Notifications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("unread")}>Unread Only</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("milestone")}>Milestones</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("reminder")}>Reminders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("alert")}>Alerts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("completion")}>Completions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="milestone">Milestones</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="completion">Completions</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[400px] pr-4">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 transition-colors ${notification.read ? "" : "bg-muted/50"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/abstract-geometric-shapes.png?height=40&width=40&query=${notification.type}`}
                              alt={notification.type}
                            />
                            <AvatarFallback className={getTypeColor(notification.type)}>
                              {getTypeIcon(notification.type)}
                            </AvatarFallback>
                          </Avatar>
                          {!notification.read && (
                            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.time}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    Mark as {notification.read ? "unread" : "read"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View Goal</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm">{notification.description}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{notification.details}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        {!notification.read && (
                          <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm">View Goal</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "all"
                      ? "You don't have any notifications yet."
                      : `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
