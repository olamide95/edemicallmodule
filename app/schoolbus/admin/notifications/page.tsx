"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Bell,
  Plus,
  Search,
  Filter,
  Send,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  CalendarIcon,
  Tag,
  Users,
  Save,
  Eye,
  Trash2,
  Edit,
  X,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  status: "draft" | "sent" | "scheduled"
  recipients: number
  channels: string[]
  createdAt: string
  scheduledAt?: string
}

interface Template {
  id: string
  name: string
  subject: string
  content: string
  category: string
}

interface DocType {
  id: string
  name: string
  fields: { name: string; label: string; tag: string }[]
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Bus Route Change - Route A",
    message: "Due to road construction, Route A will have a temporary detour starting tomorrow.",
    type: "warning",
    status: "sent",
    recipients: 45,
    channels: ["push", "email", "sms"],
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "School Bus Service Resumption",
    message: "School bus services will resume normal operations from Monday, January 22nd.",
    type: "info",
    status: "scheduled",
    recipients: 120,
    channels: ["push", "email"],
    createdAt: "2024-01-14T14:20:00Z",
    scheduledAt: "2024-01-22T07:00:00Z",
  },
  {
    id: "3",
    title: "Weather Advisory",
    message: "Due to heavy rainfall expected tomorrow, bus services may experience delays.",
    type: "warning",
    status: "draft",
    recipients: 0,
    channels: ["push", "sms"],
    createdAt: "2024-01-13T16:45:00Z",
  },
]

const templates: Template[] = [
  {
    id: "1",
    name: "Bus Delay Alert",
    subject: "Bus Delay Notification - {bus_number}",
    content:
      "Dear Parent, Bus {bus_number} on Route {route_name} is delayed by {delay_minutes} minutes due to {reason}. Expected arrival time: {expected_time}.",
    category: "delay",
  },
  {
    id: "2",
    name: "Route Change Notice",
    subject: "Route Change - {route_name}",
    content:
      "Important: Route {route_name} has been modified. New pickup time for {student_name} is {new_time}. Please check the updated schedule.",
    category: "route",
  },
  {
    id: "3",
    name: "Enrollment Reminder",
    subject: "Bus Enrollment Reminder",
    content:
      "Dear {parent_name}, the enrollment for {student_name} for bus service is pending. Please complete the enrollment by {deadline_date}.",
    category: "enrollment",
  },
  {
    id: "4",
    name: "Weather Advisory",
    subject: "Weather Advisory - Bus Service Update",
    content:
      "Due to {weather_condition}, bus services may experience delays or cancellations on {date}. Please stay updated through our app.",
    category: "weather",
  },
  {
    id: "5",
    name: "Rule Violation Notice",
    subject: "Bus Conduct Notice - {student_name}",
    content:
      "Dear {parent_name}, {student_name} has violated bus rule: {violation_type} on {date}. This is violation #{violation_count}. Please discuss bus conduct with your child.",
    category: "violation",
  },
]

const docTypes: DocType[] = [
  {
    id: "student",
    name: "Student",
    fields: [
      { name: "name", label: "Student Name", tag: "{student_name}" },
      { name: "class", label: "Class", tag: "{student_class}" },
      { name: "section", label: "Section", tag: "{student_section}" },
      { name: "roll_number", label: "Roll Number", tag: "{roll_number}" },
    ],
  },
  {
    id: "parent",
    name: "Parent",
    fields: [
      { name: "name", label: "Parent Name", tag: "{parent_name}" },
      { name: "phone", label: "Phone Number", tag: "{parent_phone}" },
      { name: "email", label: "Email", tag: "{parent_email}" },
    ],
  },
  {
    id: "bus",
    name: "Bus",
    fields: [
      { name: "number", label: "Bus Number", tag: "{bus_number}" },
      { name: "driver_name", label: "Driver Name", tag: "{driver_name}" },
      { name: "capacity", label: "Capacity", tag: "{bus_capacity}" },
    ],
  },
  {
    id: "route",
    name: "Route",
    fields: [
      { name: "name", label: "Route Name", tag: "{route_name}" },
      { name: "pickup_time", label: "Pickup Time", tag: "{pickup_time}" },
      { name: "dropoff_time", label: "Dropoff Time", tag: "{dropoff_time}" },
    ],
  },
  {
    id: "enrollment",
    name: "Enrollment",
    fields: [
      { name: "enrollment_date", label: "Enrollment Date", tag: "{enrollment_date}" },
      { name: "fee_amount", label: "Fee Amount", tag: "{fee_amount}" },
      { name: "status", label: "Status", tag: "{enrollment_status}" },
    ],
  },
]

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [selectedDocType, setSelectedDocType] = useState<string>("")
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    channels: [] as string[],
    sendNow: true,
    scheduledDate: undefined as Date | undefined,
    scheduledTime: "",
  })
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)
  const [viewingNotification, setViewingNotification] = useState<Notification | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || notification.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setNotificationData((prev) => ({
        ...prev,
        title: template.subject,
        message: template.content,
      }))
    }
    setSelectedTemplate(templateId)
  }

  const insertFieldTag = (tag: string) => {
    setNotificationData((prev) => ({
      ...prev,
      message: prev.message + tag,
    }))
  }

  const handleChannelToggle = (channel: string) => {
    setNotificationData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }))
  }

  const handleSaveNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notificationData.title,
      message: notificationData.message,
      type: "info",
      status: "draft",
      recipients: 0,
      channels: notificationData.channels,
      createdAt: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
    setIsNewNotificationOpen(false)
    resetForm()
  }

  const handleSendNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notificationData.title,
      message: notificationData.message,
      type: "info",
      status: notificationData.sendNow ? "sent" : "scheduled",
      recipients: notificationData.sendNow ? 85 : 0,
      channels: notificationData.channels,
      createdAt: new Date().toISOString(),
      scheduledAt: notificationData.sendNow ? undefined : notificationData.scheduledDate?.toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
    setIsNewNotificationOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setNotificationData({
      title: "",
      message: "",
      channels: [],
      sendNow: true,
      scheduledDate: undefined,
      scheduledTime: "",
    })
    setSelectedTemplate("")
    setSelectedDocType("")
  }

  const handleEditNotification = (notification: Notification) => {
    setEditingNotification(notification)
    setNotificationData({
      title: notification.title,
      message: notification.message,
      channels: [...notification.channels],
      sendNow: notification.status !== "scheduled",
      scheduledDate: notification.scheduledAt ? new Date(notification.scheduledAt) : undefined,
      scheduledTime: notification.scheduledAt ? format(new Date(notification.scheduledAt), "HH:mm") : "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateNotification = () => {
    if (!editingNotification) return

    const updatedNotification: Notification = {
      ...editingNotification,
      title: notificationData.title,
      message: notificationData.message,
      channels: notificationData.channels,
      status: notificationData.sendNow ? "sent" : "scheduled",
      scheduledAt: notificationData.sendNow ? undefined : notificationData.scheduledDate?.toISOString(),
    }

    setNotifications((prev) =>
      prev.map((n) => (n.id === editingNotification.id ? updatedNotification : n))
    )
    setIsEditDialogOpen(false)
    setEditingNotification(null)
    resetForm()
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleViewNotification = (notification: Notification) => {
    setViewingNotification(notification)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getChannelIcon = (channel: string) => {
    const icons = {
      push: Bell,
      email: Mail,
      sms: MessageSquare,
      whatsapp: Smartphone,
    }
    const Icon = icons[channel as keyof typeof icons]
    return Icon ? <Icon key={channel} className="h-4 w-4" /> : null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and send notifications to parents and staff</p>
        </div>
        <Dialog open={isNewNotificationOpen} onOpenChange={setIsNewNotificationOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>Create a new notification using templates or from scratch</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="template">Use Template</TabsTrigger>
              </TabsList>

              <TabsContent value="template" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={cn(
                        "cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                        selectedTemplate === template.id && "ring-2 ring-purple-500",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {template.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{template.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compose" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <Label htmlFor="title">Notification Title</Label>
                      <Input
                        id="title"
                        value={notificationData.title}
                        onChange={(e) => setNotificationData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter notification title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={notificationData.message}
                        onChange={(e) => setNotificationData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Enter your message here..."
                        rows={8}
                      />
                    </div>

                    <div>
                      <Label>Notification Channels</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {[
                          { id: "push", label: "Push", icon: Bell },
                          { id: "email", label: "Email", icon: Mail },
                          { id: "sms", label: "SMS", icon: MessageSquare },
                          { id: "whatsapp", label: "WhatsApp", icon: Smartphone },
                        ].map(({ id, label, icon: Icon }) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox
                              id={id}
                              checked={notificationData.channels.includes(id)}
                              onCheckedChange={() => handleChannelToggle(id)}
                            />
                            <Label htmlFor={id} className="flex items-center space-x-1 cursor-pointer">
                              <Icon className="h-4 w-4" />
                              <span>{label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Send Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sendNow"
                            checked={notificationData.sendNow}
                            onCheckedChange={(checked) =>
                              setNotificationData((prev) => ({ ...prev, sendNow: checked as boolean }))
                            }
                          />
                          <Label htmlFor="sendNow">Send Now</Label>
                        </div>

                        {!notificationData.sendNow && (
                          <div className="flex items-center space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !notificationData.scheduledDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {notificationData.scheduledDate ? (
                                    format(notificationData.scheduledDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={notificationData.scheduledDate}
                                  onSelect={(date) => setNotificationData((prev) => ({ ...prev, scheduledDate: date }))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <Input
                              type="time"
                              value={notificationData.scheduledTime}
                              onChange={(e) =>
                                setNotificationData((prev) => ({ ...prev, scheduledTime: e.target.value }))
                              }
                              className="w-32"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Document Type</Label>
                      <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {docTypes.map((docType) => (
                            <SelectItem key={docType.id} value={docType.id}>
                              {docType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDocType && (
                      <div>
                        <Label>Available Fields</Label>
                        <div className="space-y-2 mt-2">
                          {docTypes
                            .find((dt) => dt.id === selectedDocType)
                            ?.fields.map((field) => (
                              <Button
                                key={field.name}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs bg-transparent"
                                onClick={() => insertFieldTag(field.tag)}
                              >
                                <Tag className="mr-2 h-3 w-3" />
                                {field.label}
                              </Button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsNewNotificationOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveNotification}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={handleSendNotification}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={
                  !notificationData.title || !notificationData.message || notificationData.channels.length === 0
                }
              >
                {notificationData.sendNow ? (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredNotifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{notification.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(notification.status)}
                    {getTypeBadge(notification.type)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewNotification(notification)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditNotification(notification)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{notification.message}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {notification.recipients} recipients
                  </span>
                  <div className="flex items-center gap-1">
                    {notification.channels.map((channel) => getChannelIcon(channel))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {notification.scheduledAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(notification.scheduledAt), "MMM dd, yyyy HH:mm")}
                    </span>
                  )}
                  <span>{format(new Date(notification.createdAt), "MMM dd, yyyy HH:mm")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Notification Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View Notification
            </DialogTitle>
            <DialogDescription>
              Details of the notification sent to recipients.
            </DialogDescription>
          </DialogHeader>
          
          {viewingNotification && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm">{viewingNotification.title}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Message</Label>
                <p className="text-sm whitespace-pre-wrap">{viewingNotification.message}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status & Type</Label>
                <div className="flex gap-2">
                  {getStatusBadge(viewingNotification.status)}
                  {getTypeBadge(viewingNotification.type)}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Channels</Label>
                <div className="flex gap-2">
                  {viewingNotification.channels.map(channel => (
                    <Badge key={channel} variant="outline" className="flex items-center gap-1">
                      {getChannelIcon(channel)}
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Recipients</Label>
                  <p className="text-sm flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {viewingNotification.recipients}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm">
                    {format(new Date(viewingNotification.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              </div>
              
              {viewingNotification.scheduledAt && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Scheduled For</Label>
                  <p className="text-sm flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {format(new Date(viewingNotification.scheduledAt), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notification Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Notification
            </DialogTitle>
            <DialogDescription>
              Make changes to your notification here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Notification Title</Label>
              <Input
                id="edit-title"
                value={notificationData.title}
                onChange={(e) => setNotificationData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter notification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-message">Message</Label>
              <Textarea
                id="edit-message"
                value={notificationData.message}
                onChange={(e) => setNotificationData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message here..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label>Notification Channels</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {[
                  { id: "push", label: "Push", icon: Bell },
                  { id: "email", label: "Email", icon: Mail },
                  { id: "sms", label: "SMS", icon: MessageSquare },
                  { id: "whatsapp", label: "WhatsApp", icon: Smartphone },
                ].map(({ id, label, icon: Icon }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${id}`}
                      checked={notificationData.channels.includes(id)}
                      onCheckedChange={() => handleChannelToggle(id)}
                    />
                    <Label htmlFor={`edit-${id}`} className="flex items-center space-x-1 cursor-pointer">
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Send Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-sendNow"
                    checked={notificationData.sendNow}
                    onCheckedChange={(checked) =>
                      setNotificationData((prev) => ({ ...prev, sendNow: checked as boolean }))
                    }
                  />
                  <Label htmlFor="edit-sendNow">Send Now</Label>
                </div>

                {!notificationData.sendNow && (
                  <div className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !notificationData.scheduledDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {notificationData.scheduledDate ? (
                            format(notificationData.scheduledDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={notificationData.scheduledDate}
                          onSelect={(date) => setNotificationData((prev) => ({ ...prev, scheduledDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={notificationData.scheduledTime}
                      onChange={(e) =>
                        setNotificationData((prev) => ({ ...prev, scheduledTime: e.target.value }))
                      }
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateNotification}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={
                !notificationData.title || !notificationData.message || notificationData.channels.length === 0
              }
            >
              <Save className="mr-2 h-4 w-4" />
              Update Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}