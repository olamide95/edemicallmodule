"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Search, Eye, ArrowUpDown } from "lucide-react"

// Mock data for notification history
const mockNotifications = [
  {
    id: 1,
    goalName: "Q1 Parent Referral Drive",
    type: "milestone",
    milestone: "50%",
    recipients: "Administrators, Participants",
    channels: ["email", "in-app"],
    sentAt: "2023-02-15T10:30:00Z",
    status: "Delivered",
  },
  {
    id: 2,
    goalName: "Staff Referral Challenge",
    type: "milestone",
    milestone: "75%",
    recipients: "Administrators",
    channels: ["email"],
    sentAt: "2023-03-10T14:45:00Z",
    status: "Delivered",
  },
  {
    id: 3,
    goalName: "Alumni Network Growth",
    type: "reminder",
    milestone: "Weekly",
    recipients: "Participants",
    channels: ["in-app"],
    sentAt: "2023-03-12T09:00:00Z",
    status: "Delivered",
  },
  {
    id: 4,
    goalName: "Student Ambassador Program",
    type: "end-approaching",
    milestone: "7 days left",
    recipients: "Administrators, Participants",
    channels: ["email", "in-app", "sms"],
    sentAt: "2023-03-24T16:20:00Z",
    status: "Delivered",
  },
  {
    id: 5,
    goalName: "Q1 Parent Referral Drive",
    type: "milestone",
    milestone: "75%",
    recipients: "Administrators, Participants",
    channels: ["email", "in-app"],
    sentAt: "2023-03-01T11:15:00Z",
    status: "Delivered",
  },
  {
    id: 6,
    goalName: "Staff Referral Challenge",
    type: "completion",
    milestone: "100%",
    recipients: "Administrators, Participants",
    channels: ["email", "in-app", "sms"],
    sentAt: "2023-04-05T13:30:00Z",
    status: "Pending",
  },
]

export function NotificationHistory() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.goalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    return matchesSearch && matchesType
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "in-app":
        return <Bell className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-green-500 hover:bg-green-600"
      case "reminder":
        return "bg-blue-500 hover:bg-blue-600"
      case "end-approaching":
        return "bg-amber-500 hover:bg-amber-600"
      case "completion":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification History</CardTitle>
        <CardDescription>View all notifications sent for goal milestones and reminders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by goal name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="milestone">Milestone</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="end-approaching">End Approaching</SelectItem>
              <SelectItem value="completion">Completion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Name</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Sent At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.goalName}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(notification.type)}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1).replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{notification.milestone}</TableCell>
                  <TableCell>{notification.recipients}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {notification.channels.map((channel) => (
                        <div key={channel} className="p-1 rounded-md bg-muted">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(notification.sentAt)}</TableCell>
                  <TableCell>
                    <Badge variant={notification.status === "Delivered" ? "outline" : "secondary"}>
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </p>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
