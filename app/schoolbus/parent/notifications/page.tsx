"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bell,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Shield,
  Filter,
  BookMarkedIcon as MarkAsUnreadIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock notifications data
const notifications = [
  {
    id: "1",
    type: "delay",
    title: "Bus Delay Alert",
    message:
      "Bus A is running 15 minutes late due to traffic on Victoria Island. Expected arrival at Main Street: 7:37 AM",
    timestamp: "2024-01-15T07:22:00Z",
    isRead: false,
    priority: "high",
    childName: "Alice Doe, Bob Doe",
    icon: Clock,
    color: "text-[#FFB400]",
    bgColor: "bg-[#FFB400]/10",
  },
  {
    id: "2",
    type: "route-change",
    title: "Route Modification",
    message:
      "North Route has been temporarily modified. Oak Avenue stop will be skipped today due to road construction. Alternative pickup at Pine Boulevard.",
    timestamp: "2024-01-14T16:30:00Z",
    isRead: false,
    priority: "medium",
    childName: "Alice Doe, Bob Doe",
    icon: MapPin,
    color: "text-[#16B1FF]",
    bgColor: "bg-[#16B1FF]/10",
  },
  {
    id: "3",
    type: "term-start",
    title: "Second Term Service Begins",
    message:
      "School bus service for Second Term 2023/2024 will commence on January 8, 2024. Please ensure your children are ready at their designated stops by 7:10 AM.",
    timestamp: "2024-01-05T09:00:00Z",
    isRead: true,
    priority: "medium",
    childName: "All Children",
    icon: Calendar,
    color: "text-[#56CA00]",
    bgColor: "bg-[#56CA00]/10",
  },
  {
    id: "4",
    type: "violation",
    title: "Bus Rule Violation - Alice Doe",
    message:
      "Alice Doe received a warning for not wearing seatbelt during transit. This is violation #2 for Alice. Please discuss bus safety rules with your child.",
    timestamp: "2024-01-12T14:45:00Z",
    isRead: false,
    priority: "high",
    childName: "Alice Doe",
    violationCount: 2,
    violationType: "Safety Violation",
    icon: AlertTriangle,
    color: "text-[#FF4C51]",
    bgColor: "bg-[#FF4C51]/10",
  },
  {
    id: "5",
    type: "violation",
    title: "Bus Rule Violation - Bob Doe",
    message:
      "Bob Doe was reported for excessive noise during transit. This is violation #1 for Bob. Please remind your child about maintaining discipline on the bus.",
    timestamp: "2024-01-10T15:20:00Z",
    isRead: true,
    priority: "medium",
    childName: "Bob Doe",
    violationCount: 1,
    violationType: "Behavioral Violation",
    icon: AlertTriangle,
    color: "text-[#FF4C51]",
    bgColor: "bg-[#FF4C51]/10",
  },
  {
    id: "6",
    type: "service-disruption",
    title: "Bus Service Temporarily Suspended",
    message:
      "Bus A service will be suspended on January 20, 2024 due to scheduled maintenance. Alternative arrangements have been made with Bus C for North Route students.",
    timestamp: "2024-01-18T10:15:00Z",
    isRead: false,
    priority: "high",
    childName: "Alice Doe, Bob Doe",
    icon: XCircle,
    color: "text-[#FF4C51]",
    bgColor: "bg-[#FF4C51]/10",
  },
  {
    id: "7",
    type: "general",
    title: "Payment Reminder",
    message: "Third Term bus fee payment is due by February 15, 2024. Outstanding balance: ₦30,000 for 2 children.",
    timestamp: "2024-01-25T11:00:00Z",
    isRead: true,
    priority: "medium",
    childName: "Alice Doe, Bob Doe",
    icon: MessageSquare,
    color: "text-[#8C57FF]",
    bgColor: "bg-[#8C57FF]/10",
  },
]

export default function ParentNotificationsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [selectedTab, setSelectedTab] = useState<string>("all")

  const getNotificationsByType = (type: string) => {
    if (type === "all") return notifications
    return notifications.filter((notification) => notification.type === type)
  }

  const getUnreadCount = (type = "all") => {
    const filteredNotifications = getNotificationsByType(type)
    return filteredNotifications.filter((n) => !n.isRead).length
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const markAsRead = (notificationId: string) => {
    // In a real app, this would update the backend
    console.log("Marking notification as read:", notificationId)
  }

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log("Marking all notifications as read")
  }

  const filteredNotifications = getNotificationsByType(selectedTab)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with bus service alerts and important information</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <MarkAsUnreadIcon className="h-4 w-4 text-[#FF4C51]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FF4C51]">{getUnreadCount()}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <Shield className="h-4 w-4 text-[#FFB400]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FFB400]">
              {notifications.filter((n) => n.type === "violation").length}
            </div>
            <p className="text-xs text-muted-foreground">Total violations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[#FF4C51]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FF4C51]">
              {notifications.filter((n) => n.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Manage Preferences
          </Button>
        </div>
      </div>

      {/* Notification Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" className="relative">
            All
            {getUnreadCount("all") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("all")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="delay" className="relative">
            Delays
            {getUnreadCount("delay") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("delay")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="route-change" className="relative">
            Routes
            {getUnreadCount("route-change") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("route-change")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="violation" className="relative">
            Violations
            {getUnreadCount("violation") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("violation")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="service-disruption" className="relative">
            Service
            {getUnreadCount("service-disruption") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("service-disruption")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="general" className="relative">
            General
            {getUnreadCount("general") > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getUnreadCount("general")}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground text-center">
                    You're all caught up! No {selectedTab === "all" ? "" : selectedTab} notifications at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all duration-200 hover:shadow-md ${
                      !notification.isRead ? "border-l-4 border-l-[#8C57FF] bg-[#8C57FF]/5" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${notification.bgColor}`}>
                          <IconComponent className={`h-5 w-5 ${notification.color}`} />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{notification.title}</h3>
                                {!notification.isRead && <div className="h-2 w-2 bg-[#8C57FF] rounded-full"></div>}
                                <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                                  {notification.priority.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Affects: {notification.childName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {!notification.isRead && (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          <p className="text-sm leading-relaxed">{notification.message}</p>

                          {notification.type === "violation" && (
                            <Alert className="mt-3">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Violation Details:</strong> {notification.violationType} • Total violations for{" "}
                                {notification.childName}: {notification.violationCount}
                                {notification.violationCount >= 3 && (
                                  <span className="text-[#FF4C51] font-medium">
                                    {" "}
                                    • Warning: Next violation may result in suspension
                                  </span>
                                )}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
