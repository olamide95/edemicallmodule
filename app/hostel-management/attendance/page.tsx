"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"
import {
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Download,
  Upload,
  Filter,
  Search,
  Bell,
  FileText,
  UserCheck,
  UserX,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Phone,
  Check,
  X,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration
const attendanceData = [
  {
    id: 1,
    studentId: "HS2024001",
    name: "John Smith",
    room: "A-101",
    bed: "A",
    block: "Block A",
    status: "present",
    checkIn: "06:45 AM",
    checkOut: "-",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    studentId: "HS2024002",
    name: "Emma Johnson",
    room: "B-205",
    bed: "B",
    block: "Block B",
    status: "absent",
    checkIn: "-",
    checkOut: "-",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    studentId: "HS2024003",
    name: "Michael Brown",
    room: "A-102",
    bed: "C",
    block: "Block A",
    status: "leave",
    checkIn: "-",
    checkOut: "-",
    leaveType: "Home Visit",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    studentId: "HS2024004",
    name: "Sarah Davis",
    room: "C-301",
    bed: "A",
    block: "Block C",
    status: "present",
    checkIn: "07:00 AM",
    checkOut: "-",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    studentId: "HS2024005",
    name: "James Wilson",
    room: "A-103",
    bed: "B",
    block: "Block A",
    status: "late",
    checkIn: "10:30 AM",
    checkOut: "-",
    photo: "/placeholder.svg?height=40&width=40",
  },
]

const roomWiseData = [
  {
    block: "Block A",
    rooms: [
      { room: "A-101", capacity: 4, present: 3, absent: 1, leave: 0 },
      { room: "A-102", capacity: 4, present: 2, absent: 0, leave: 2 },
      { room: "A-103", capacity: 4, present: 4, absent: 0, leave: 0 },
    ],
  },
  {
    block: "Block B",
    rooms: [
      { room: "B-201", capacity: 4, present: 3, absent: 1, leave: 0 },
      { room: "B-202", capacity: 4, present: 4, absent: 0, leave: 0 },
      { room: "B-203", capacity: 4, present: 2, absent: 1, leave: 1 },
    ],
  },
]

export default function HostelAttendancePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedBlock, setSelectedBlock] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [showMarkDialog, setShowMarkDialog] = useState(false)
  const [markingStudent, setMarkingStudent] = useState<any>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(attendanceData.map((s) => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-success/10 text-success border-success/20">Present</Badge>
      case "absent":
        return <Badge className="bg-error/10 text-error border-error/20">Absent</Badge>
      case "leave":
        return <Badge className="bg-info/10 text-info border-info/20">On Leave</Badge>
      case "late":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Late</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Page Header */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Hostel Attendance</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Hostel Management</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Attendance</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Record and monitor daily attendance for all hostel students. Track check-in/check-out times, manage
                  leaves, and generate attendance reports for better hostel management.
                </p>

                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Calendar className="w-4 h-4 mr-2" />
                    Mark Today's Attendance
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=attendance+tracking+illustration"
                  alt="Attendance Tracking Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <h3 className="text-2xl font-bold mt-1">486</h3>
                    <p className="text-xs text-muted-foreground mt-1">In hostel</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Present Today</p>
                    <h3 className="text-2xl font-bold mt-1">412</h3>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-success mr-1" />
                      <span className="text-success">84.8%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-success/10 rounded-md">
                    <UserCheck className="w-5 h-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <h3 className="text-2xl font-bold mt-1">28</h3>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingDown className="w-3 h-3 text-error mr-1" />
                      <span className="text-error">5.8%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-error/10 rounded-md">
                    <UserX className="w-5 h-5 text-error" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">On Leave</p>
                    <h3 className="text-2xl font-bold mt-1">46</h3>
                    <p className="text-xs text-muted-foreground mt-1">Approved</p>
                  </div>
                  <div className="p-2 bg-info/10 rounded-md">
                    <CalendarDays className="w-5 h-5 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Late Check-ins</p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                    <p className="text-xs text-muted-foreground mt-1">After 9 PM</p>
                  </div>
                  <div className="p-2 bg-warning/10 rounded-md">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="date" className="sr-only">
                    Select Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="block" className="sr-only">
                    Select Block
                  </Label>
                  <Select value={selectedBlock} onValueChange={setSelectedBlock}>
                    <SelectTrigger id="block">
                      <SelectValue placeholder="Select Block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blocks</SelectItem>
                      <SelectItem value="block-a">Block A</SelectItem>
                      <SelectItem value="block-b">Block B</SelectItem>
                      <SelectItem value="block-c">Block C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            {selectedStudents.length > 0 && (
              <div className="mt-4 flex items-center gap-4 p-3 bg-primary/5 rounded-md">
                <span className="text-sm font-medium">{selectedStudents.length} students selected</span>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mark-present">Mark as Present</SelectItem>
                    <SelectItem value="mark-absent">Mark as Absent</SelectItem>
                    <SelectItem value="mark-leave">Mark as Leave</SelectItem>
                    <SelectItem value="send-notification">Send Notification</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">Apply</Button>
              </div>
            )}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList className="grid w-full max-w-[600px] grid-cols-4">
              <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
              <TabsTrigger value="room-wise">Room Wise</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Daily Attendance -{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription>
                    Mark attendance for all hostel students. Use quick actions or individual marking.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={selectedStudents.length === attendanceData.length}
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Room/Bed</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-sm text-muted-foreground">{student.studentId}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{student.room}</p>
                                <p className="text-sm text-muted-foreground">
                                  Bed {student.bed} • {student.block}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(student.status)}
                              {student.leaveType && (
                                <p className="text-xs text-muted-foreground mt-1">{student.leaveType}</p>
                              )}
                            </TableCell>
                            <TableCell>{student.checkIn}</TableCell>
                            <TableCell>{student.checkOut}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    setMarkingStudent(student)
                                    setShowMarkDialog(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Check className="mr-2 h-4 w-4 text-success" />
                                      Mark Present
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <X className="mr-2 h-4 w-4 text-error" />
                                      Mark Absent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <CalendarDays className="mr-2 h-4 w-4 text-info" />
                                      Mark Leave
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View History
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Bell className="mr-2 h-4 w-4" />
                                      Send Notification
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="room-wise" className="space-y-4">
              {roomWiseData.map((block) => (
                <Card key={block.block}>
                  <CardHeader>
                    <CardTitle>{block.block}</CardTitle>
                    <CardDescription>Room-wise attendance overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {block.rooms.map((room) => (
                        <Card key={room.room}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold">{room.room}</h4>
                              <Badge variant="outline">
                                {room.present}/{room.capacity}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Present</span>
                                <span className="font-medium text-success">{room.present}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Absent</span>
                                <span className="font-medium text-error">{room.absent}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">On Leave</span>
                                <span className="font-medium text-info">{room.leave}</span>
                              </div>
                            </div>
                            <Progress value={(room.present / room.capacity) * 100} className="mt-3 h-2" />
                            <Button variant="link" className="w-full mt-2 h-auto p-0">
                              View Details →
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Summary</CardTitle>
                    <CardDescription>Overview of today's attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-success/10 rounded-md">
                            <UserCheck className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">Present Students</p>
                            <p className="text-sm text-muted-foreground">Checked in on time</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-success">412</p>
                          <p className="text-sm text-muted-foreground">84.8%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-error/10 rounded-md">
                            <UserX className="w-5 h-5 text-error" />
                          </div>
                          <div>
                            <p className="font-medium">Absent Students</p>
                            <p className="text-sm text-muted-foreground">Not checked in</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-error">28</p>
                          <p className="text-sm text-muted-foreground">5.8%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-info/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-info/10 rounded-md">
                            <CalendarDays className="w-5 h-5 text-info" />
                          </div>
                          <div>
                            <p className="font-medium">On Leave</p>
                            <p className="text-sm text-muted-foreground">Approved leaves</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-info">46</p>
                          <p className="text-sm text-muted-foreground">9.5%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-warning/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-warning/10 rounded-md">
                            <Clock className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <p className="font-medium">Late Check-ins</p>
                            <p className="text-sm text-muted-foreground">After 9:00 PM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-warning">12</p>
                          <p className="text-sm text-muted-foreground">2.5%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Absent Students Alert</CardTitle>
                    <CardDescription>Students requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {attendanceData
                        .filter((s) => s.status === "absent")
                        .slice(0, 5)
                        .map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{student.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {student.room} • {student.block}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-7 px-2">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 px-2">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                SMS
                              </Button>
                            </div>
                          </div>
                        ))}
                      <Button variant="outline" className="w-full">
                        View All Absent Students
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>View and analyze past attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Input type="date" placeholder="From Date" className="max-w-[200px]" />
                      <Input type="date" placeholder="To Date" className="max-w-[200px]" />
                      <Select>
                        <SelectTrigger className="max-w-[200px]">
                          <SelectValue placeholder="Select Student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students</SelectItem>
                          {attendanceData.map((student) => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Check In</TableHead>
                            <TableHead>Check Out</TableHead>
                            <TableHead>Remarks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2024-03-14</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>A-101</TableCell>
                            <TableCell>
                              <Badge className="bg-success/10 text-success border-success/20">Present</Badge>
                            </TableCell>
                            <TableCell>06:45 AM</TableCell>
                            <TableCell>10:30 PM</TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-03-13</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>A-101</TableCell>
                            <TableCell>
                              <Badge className="bg-success/10 text-success border-success/20">Present</Badge>
                            </TableCell>
                            <TableCell>07:00 AM</TableCell>
                            <TableCell>10:15 PM</TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2024-03-12</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>A-101</TableCell>
                            <TableCell>
                              <Badge className="bg-info/10 text-info border-info/20">Leave</Badge>
                            </TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>Home visit - approved</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Mark Attendance Dialog */}
          <Dialog open={showMarkDialog} onOpenChange={setShowMarkDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mark Attendance</DialogTitle>
                <DialogDescription>Update attendance status for {markingStudent?.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select defaultValue={markingStudent?.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="leave">On Leave</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Check In Time</Label>
                    <Input type="time" defaultValue="07:00" />
                  </div>
                  <div>
                    <Label>Check Out Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>Remarks</Label>
                  <Textarea placeholder="Add any remarks..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowMarkDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowMarkDialog(false)}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
