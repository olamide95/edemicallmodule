"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { Calendar, Clock, Plus, Search, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Mock data for appointments
const mockAppointments = [
  {
    id: "appt-001",
    visitorName: "John Smith",
    purpose: "Parent Teacher Meeting",
    date: new Date(2025, 4, 25, 10, 30),
    status: "confirmed",
    host: "Ms. Sarah Johnson",
    hostDepartment: "English Department",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    visitors: 1,
    location: "Main Building, Room 105",
    notes: "Discussing student progress in English literature",
    visitorPhoto: "/placeholder.svg?height=40&width=40&query=JS",
  },
  {
    id: "appt-002",
    visitorName: "Maria Garcia",
    purpose: "School Tour",
    date: new Date(2025, 4, 25, 14, 0),
    status: "pending",
    host: "Mr. Robert Chen",
    hostDepartment: "Admissions",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 987-6543",
    visitors: 3,
    location: "Administration Building, Lobby",
    notes: "Prospective student and parents",
    visitorPhoto: "/placeholder.svg?height=40&width=40&query=MG",
  },
  {
    id: "appt-003",
    visitorName: "David Wilson",
    purpose: "Vendor Meeting",
    date: new Date(2025, 4, 26, 11, 0),
    status: "confirmed",
    host: "Ms. Patricia Lee",
    hostDepartment: "Procurement",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    visitors: 2,
    location: "Administration Building, Conference Room B",
    notes: "Discussing new cafeteria supplies",
    visitorPhoto: "/placeholder.svg?height=40&width=40&query=DW",
  },
  {
    id: "appt-004",
    visitorName: "Sophia Martinez",
    purpose: "Alumni Visit",
    date: new Date(2025, 4, 27, 15, 30),
    status: "confirmed",
    host: "Dr. James Wilson",
    hostDepartment: "Principal's Office",
    email: "sophia.martinez@example.com",
    phone: "+1 (555) 234-5678",
    visitors: 1,
    location: "Main Building, Principal's Office",
    notes: "Class of 2015 alumna, discussing donation",
    visitorPhoto: "/placeholder.svg?height=40&width=40&query=SM",
  },
  {
    id: "appt-005",
    visitorName: "Michael Johnson",
    purpose: "Facility Inspection",
    date: new Date(2025, 4, 28, 9, 0),
    status: "cancelled",
    host: "Mr. Thomas Brown",
    hostDepartment: "Facilities",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 876-5432",
    visitors: 2,
    location: "Campus-wide",
    notes: "Annual safety inspection",
    visitorPhoto: "/placeholder.svg?height=40&width=40&query=MJ",
  },
]

// Mock data for hosts
const mockHosts = [
  { id: "host-001", name: "Sarah Johnson", department: "English Department", available: true },
  { id: "host-002", name: "Robert Chen", department: "Admissions", available: true },
  { id: "host-003", name: "Patricia Lee", department: "Procurement", available: false },
  { id: "host-004", name: "James Wilson", department: "Principal's Office", available: true },
  { id: "host-005", name: "Thomas Brown", department: "Facilities", available: true },
  { id: "host-006", name: "Emily Davis", department: "Mathematics Department", available: true },
  { id: "host-007", name: "Michael Rodriguez", department: "Science Department", available: false },
  { id: "host-008", name: "Jennifer Taylor", department: "Student Affairs", available: true },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = ""
  switch (status) {
    case "confirmed":
      color = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      break
    case "pending":
      color = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      break
    case "cancelled":
      color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      break
    default:
      color = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
  return <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${color}`}>{status}</span>
}

// Calendar day component
const CalendarDay = ({ day, appointments }: { day: Date; appointments: any[] }) => {
  const dayAppointments = appointments.filter((appt) => isSameDay(appt.date, day))
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="p-2 border rounded-md h-32 overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
      <div className="space-y-1">
        {dayAppointments.length > 0 ? (
          dayAppointments.slice(0, 2).map((appt, index) => (
            <div
              key={index}
              className={`text-xs p-1 rounded truncate ${
                appt.status === "confirmed"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {format(appt.date, "h:mm a")} - {appt.visitorName}
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400">No appointments</div>
        )}
        {dayAppointments.length > 2 && (
          <div className="text-xs text-gray-500 dark:text-gray-400">+{dayAppointments.length - 2} more</div>
        )}
      </div>
    </div>
  )
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [appointmentTime, setAppointmentTime] = useState("10:00")

  // Get current week dates for calendar view
  const startDate = startOfWeek(selectedDate || new Date(), { weekStartsOn: 0 })
  const endDate = endOfWeek(selectedDate || new Date(), { weekStartsOn: 0 })
  const weekDays = eachDayOfInterval({ start: startDate, end: endDate })

  // Filter appointments based on search and status
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.host.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Group appointments by date for the list view
  const groupedAppointments = filteredAppointments.reduce((groups: any, appointment) => {
    const date = format(appointment.date, "yyyy-MM-dd")
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(appointment)
    return groups
  }, {})

  // Handle appointment selection for details
  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visitor Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage visitor appointments</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 2</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 font-medium">↑ 1</span> since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cancellation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.3%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↓ 2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setIsCalendarOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {Object.keys(groupedAppointments).length > 0 ? (
            Object.entries(groupedAppointments).map(([date, appointments]: [string, any]) => (
              <div key={date} className="space-y-2">
                <h3 className="font-medium">{format(new Date(date), "EEEE, MMMM d, yyyy")}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {appointments.map((appointment: any) => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div
                            className={`w-full md:w-1 h-1 md:h-auto ${
                              appointment.status === "confirmed"
                                ? "bg-green-500"
                                : appointment.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={appointment.visitorPhoto || "/placeholder.svg"}
                                    alt={appointment.visitorName}
                                  />
                                  <AvatarFallback>
                                    {appointment.visitorName
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{appointment.visitorName}</h4>
                                  <p className="text-sm text-muted-foreground">{appointment.purpose}</p>
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                                <div className="text-sm">{format(appointment.date, "h:mm a")}</div>
                                <StatusBadge status={appointment.status} />
                              </div>
                            </div>
                            <div className="mt-4 flex flex-col md:flex-row justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="mr-1 h-4 w-4" />
                                Host: {appointment.host}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1 md:mt-0">
                                <Users className="mr-1 h-4 w-4" />
                                Visitors: {appointment.visitors}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 md:mt-0"
                                onClick={() => handleAppointmentClick(appointment)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="text-muted-foreground">No appointments found</div>
            </div>
          )}
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <CalendarDay key={day.toString()} day={day} appointments={mockAppointments} />
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={() => setSelectedDate(addDays(startDate, -7))}>
              Previous Week
            </Button>
            <Button variant="outline" onClick={() => setSelectedDate(addDays(startDate, 7))}>
              Next Week
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Appointment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Create a new visitor appointment. Fill in all the required information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitor-name">Visitor Name</Label>
                <Input id="visitor-name" placeholder="Enter visitor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitor-email">Email</Label>
                <Input id="visitor-email" type="email" placeholder="visitor@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitor-phone">Phone Number</Label>
                <Input id="visitor-phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitors-count">Number of Visitors</Label>
                <Input id="visitors-count" type="number" min="1" defaultValue="1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input id="purpose" placeholder="Enter purpose of visit" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="appointment-date"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-time">Appointment Time</Label>
                <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                  <SelectTrigger id="appointment-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="09:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="12:30">12:30 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="14:30">2:30 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="15:30">3:30 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="16:30">4:30 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Select Host</Label>
              <Select>
                <SelectTrigger id="host">
                  <SelectValue placeholder="Select a host" />
                </SelectTrigger>
                <SelectContent>
                  {mockHosts.map((host) => (
                    <SelectItem key={host.id} value={host.id} disabled={!host.available}>
                      {host.name} - {host.department} {!host.available && "(Unavailable)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Meeting Location</Label>
              <Input id="location" placeholder="Enter meeting location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional information" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notify-host" />
              <Label htmlFor="notify-host">Notify host about this appointment</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>Schedule Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>View and manage appointment information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedAppointment.visitorPhoto || "/placeholder.svg"}
                      alt={selectedAppointment.visitorName}
                    />
                    <AvatarFallback>
                      {selectedAppointment.visitorName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{selectedAppointment.visitorName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.email}</p>
                  </div>
                </div>
                <StatusBadge status={selectedAppointment.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Appointment Time</h4>
                  <p className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {format(selectedAppointment.date, "PPP")}
                  </p>
                  <p className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {format(selectedAppointment.date, "h:mm a")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h4>
                  <p className="text-sm">{selectedAppointment.phone}</p>
                  <p className="text-sm">{selectedAppointment.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Purpose of Visit</h4>
                  <p>{selectedAppointment.purpose}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Number of Visitors</h4>
                  <p>{selectedAppointment.visitors}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Host Information</h4>
                <p>{selectedAppointment.host}</p>
                <p className="text-sm text-muted-foreground">{selectedAppointment.hostDepartment}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Meeting Location</h4>
                <p>{selectedAppointment.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                <p className="text-sm">{selectedAppointment.notes}</p>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedAppointment.status === "pending" && (
                <>
                  <Button variant="destructive" className="sm:mr-auto">
                    Reject
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                  <Button>Approve</Button>
                </>
              )}
              {selectedAppointment.status === "confirmed" && (
                <>
                  <Button variant="destructive" className="sm:mr-auto">
                    Cancel
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                  <Button>Check In</Button>
                </>
              )}
              {selectedAppointment.status === "cancelled" && (
                <>
                  <Button variant="outline" className="sm:mr-auto">
                    Reschedule
                  </Button>
                  <Button>Restore</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
