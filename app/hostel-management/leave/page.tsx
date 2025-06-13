"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"
import {
  ChevronRight,
  Download,
  Upload,
  Filter,
  Search,
  FileText,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Eye,
  MoreVertical,
  Plus,
  CalendarRange,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  Printer,
  Mail,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for demonstration
const leaveRequestsData = [
  {
    id: "LR-2024-001",
    studentId: "HS2024001",
    studentName: "John Smith",
    grade: "11",
    room: "A-101",
    block: "Block A",
    leaveType: "Home Visit",
    startDate: "2024-05-25",
    endDate: "2024-05-28",
    duration: "3 days",
    reason: "Family function",
    status: "approved",
    appliedOn: "2024-05-20",
    approvedBy: "Ms. Johnson",
    approvedOn: "2024-05-21",
    contactPerson: "Mr. Smith (Father)",
    contactNumber: "+1 234-567-8901",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy",
  },
  {
    id: "LR-2024-002",
    studentId: "HS2024005",
    studentName: "Emma Wilson",
    grade: "10",
    room: "B-203",
    block: "Block B",
    leaveType: "Medical",
    startDate: "2024-05-26",
    endDate: "2024-05-30",
    duration: "4 days",
    reason: "Dental surgery",
    status: "pending",
    appliedOn: "2024-05-24",
    approvedBy: "",
    approvedOn: "",
    contactPerson: "Mrs. Wilson (Mother)",
    contactNumber: "+1 234-567-8902",
    photo: "/placeholder.svg?height=40&width=40&query=student+girl",
  },
  {
    id: "LR-2024-003",
    studentId: "HS2024012",
    studentName: "Michael Brown",
    grade: "12",
    room: "A-105",
    block: "Block A",
    leaveType: "Emergency",
    startDate: "2024-05-25",
    endDate: "2024-05-26",
    duration: "1 day",
    reason: "Family emergency",
    status: "approved",
    appliedOn: "2024-05-24",
    approvedBy: "Mr. Thompson",
    approvedOn: "2024-05-24",
    contactPerson: "Mr. Brown (Father)",
    contactNumber: "+1 234-567-8903",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy+teen",
  },
  {
    id: "LR-2024-004",
    studentId: "HS2024018",
    studentName: "Sophia Garcia",
    grade: "9",
    room: "C-302",
    block: "Block C",
    leaveType: "Academic",
    startDate: "2024-05-27",
    endDate: "2024-05-29",
    duration: "2 days",
    reason: "Science competition",
    status: "pending",
    appliedOn: "2024-05-23",
    approvedBy: "",
    approvedOn: "",
    contactPerson: "Mrs. Garcia (Mother)",
    contactNumber: "+1 234-567-8904",
    photo: "/placeholder.svg?height=40&width=40&query=student+girl+teen",
  },
  {
    id: "LR-2024-005",
    studentId: "HS2024025",
    studentName: "David Lee",
    grade: "11",
    room: "B-210",
    block: "Block B",
    leaveType: "Home Visit",
    startDate: "2024-05-28",
    endDate: "2024-05-31",
    duration: "3 days",
    reason: "Sister's wedding",
    status: "rejected",
    appliedOn: "2024-05-22",
    approvedBy: "Ms. Johnson",
    approvedOn: "2024-05-23",
    contactPerson: "Mr. Lee (Father)",
    contactNumber: "+1 234-567-8905",
    rejectionReason: "Exam period - cannot approve long leave",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy+asian",
  },
  {
    id: "LR-2024-006",
    studentId: "HS2024031",
    studentName: "Olivia Martinez",
    grade: "10",
    room: "C-305",
    block: "Block C",
    leaveType: "Medical",
    startDate: "2024-05-26",
    endDate: "2024-05-27",
    duration: "1 day",
    reason: "Doctor's appointment",
    status: "approved",
    appliedOn: "2024-05-24",
    approvedBy: "Mr. Thompson",
    approvedOn: "2024-05-24",
    contactPerson: "Mrs. Martinez (Mother)",
    contactNumber: "+1 234-567-8906",
    photo: "/placeholder.svg?height=40&width=40&query=student+girl+hispanic",
  },
  {
    id: "LR-2024-007",
    studentId: "HS2024042",
    studentName: "Ethan Johnson",
    grade: "12",
    room: "A-110",
    block: "Block A",
    leaveType: "Sports",
    startDate: "2024-05-29",
    endDate: "2024-06-02",
    duration: "4 days",
    reason: "State basketball tournament",
    status: "pending",
    appliedOn: "2024-05-23",
    approvedBy: "",
    approvedOn: "",
    contactPerson: "Coach Williams",
    contactNumber: "+1 234-567-8907",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy+basketball",
  },
]

// Mock students data
const studentsData = [
  {
    id: "HS2024001",
    name: "John Smith",
    grade: "11",
    room: "A-101",
    block: "Block A",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy",
  },
  {
    id: "HS2024005",
    name: "Emma Wilson",
    grade: "10",
    room: "B-203",
    block: "Block B",
    photo: "/placeholder.svg?height=40&width=40&query=student+girl",
  },
  {
    id: "HS2024012",
    name: "Michael Brown",
    grade: "12",
    room: "A-105",
    block: "Block A",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy+teen",
  },
  {
    id: "HS2024018",
    name: "Sophia Garcia",
    grade: "9",
    room: "C-302",
    block: "Block C",
    photo: "/placeholder.svg?height=40&width=40&query=student+girl+teen",
  },
  {
    id: "HS2024025",
    name: "David Lee",
    grade: "11",
    room: "B-210",
    block: "Block B",
    photo: "/placeholder.svg?height=40&width=40&query=student+boy+asian",
  },
]

export default function HostelLeaveManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedBlock, setSelectedBlock] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLeaveRequests, setSelectedLeaveRequests] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [showLeaveDetailsDialog, setShowLeaveDetailsDialog] = useState(false)
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<any>(null)
  const [showNewLeaveDialog, setShowNewLeaveDialog] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [approvalNotes, setApprovalNotes] = useState("")
  const [notifyParent, setNotifyParent] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // New leave request form state
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    studentId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    contactPerson: "",
    contactNumber: "",
    address: "",
    emergencyContact: "",
    travelDetails: "",
    notifyParent: true,
  })

  // Date picker states
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeaveRequests(leaveRequestsData.map((lr) => lr.id))
    } else {
      setSelectedLeaveRequests([])
    }
  }

  const handleSelectLeaveRequest = (leaveRequestId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeaveRequests([...selectedLeaveRequests, leaveRequestId])
    } else {
      setSelectedLeaveRequests(selectedLeaveRequests.filter((id) => id !== leaveRequestId))
    }
  }

  const handleViewLeaveDetails = (leaveRequest: any) => {
    setSelectedLeaveRequest(leaveRequest)
    setShowLeaveDetailsDialog(true)
  }

  const handleApproveLeaveRequest = (leaveRequest: any) => {
    setSelectedLeaveRequest(leaveRequest)
    setShowApproveDialog(true)
  }

  const handleRejectLeaveRequest = (leaveRequest: any) => {
    setSelectedLeaveRequest(leaveRequest)
    setShowRejectDialog(true)
  }

  const confirmApproval = () => {
    // In a real application, you would make an API call here
    console.log("Approving leave request:", selectedLeaveRequest.id, "with notes:", approvalNotes)
    setShowApproveDialog(false)
    // Reset form
    setApprovalNotes("")
    setNotifyParent(true)
  }

  const confirmRejection = () => {
    // In a real application, you would make an API call here
    console.log("Rejecting leave request:", selectedLeaveRequest.id, "with reason:", rejectionReason)
    setShowRejectDialog(false)
    // Reset form
    setRejectionReason("")
    setNotifyParent(true)
  }

  const handleNewLeaveSubmit = () => {
    // In a real application, you would make an API call here
    console.log("Creating new leave request:", newLeaveRequest)
    setShowNewLeaveDialog(false)
    // Reset form
    setNewLeaveRequest({
      studentId: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      contactPerson: "",
      contactNumber: "",
      address: "",
      emergencyContact: "",
      travelDetails: "",
      notifyParent: true,
    })
    setStartDate(undefined)
    setEndDate(undefined)
  }

  const handleStudentSelect = (studentId: string) => {
    const student = studentsData.find((s) => s.id === studentId)
    if (student) {
      setNewLeaveRequest({
        ...newLeaveRequest,
        studentId: student.id,
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>
      case "rejected":
        return <Badge className="bg-error/10 text-error border-error/20">Rejected</Badge>
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-success" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-error" />
      case "pending":
        return <Clock3 className="w-5 h-5 text-warning" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  // Filter leave requests based on active tab
  const filteredLeaveRequests = leaveRequestsData.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

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
                <h1 className="text-2xl font-bold mb-1">Leave Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Hostel Management</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Leave Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Manage student leave requests, approvals, and tracking. Keep records of student absences and ensure
                  proper authorization for all leaves from the hostel.
                </p>

                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowNewLeaveDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Leave Request
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=leave+management+illustration"
                  alt="Leave Management Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leaves</p>
                    <h3 className="text-2xl font-bold mt-1">124</h3>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-md">
                    <CalendarRange className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <h3 className="text-2xl font-bold mt-1">86</h3>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-success mr-1" />
                      <span className="text-success">69.4%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-success/10 rounded-md">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingDown className="w-3 h-3 text-error mr-1" />
                      <span className="text-error">9.7%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-error/10 rounded-md">
                    <XCircle className="w-5 h-5 text-error" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">26</h3>
                    <p className="text-xs text-muted-foreground mt-1">Requires action</p>
                  </div>
                  <div className="p-2 bg-warning/10 rounded-md">
                    <Clock3 className="w-5 h-5 text-warning" />
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

            {selectedLeaveRequests.length > 0 && (
              <div className="mt-4 flex items-center gap-4 p-3 bg-primary/5 rounded-md">
                <span className="text-sm font-medium">{selectedLeaveRequests.length} leave requests selected</span>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve Selected</SelectItem>
                    <SelectItem value="reject">Reject Selected</SelectItem>
                    <SelectItem value="export">Export Selected</SelectItem>
                    <SelectItem value="print">Print Selected</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">Apply</Button>
              </div>
            )}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full max-w-[600px] grid-cols-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>
                    {activeTab === "all"
                      ? "All leave requests"
                      : activeTab === "pending"
                        ? "Pending approval"
                        : activeTab === "approved"
                          ? "Approved leave requests"
                          : "Rejected leave requests"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={
                                selectedLeaveRequests.length === filteredLeaveRequests.length &&
                                filteredLeaveRequests.length > 0
                              }
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Leave Details</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied On</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeaveRequests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <CalendarRange className="w-12 h-12 mb-2 opacity-20" />
                                <p>No leave requests found</p>
                                <Button variant="link" className="mt-2" onClick={() => setShowNewLeaveDialog(true)}>
                                  Create a new leave request
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLeaveRequests.map((leaveRequest) => (
                            <TableRow key={leaveRequest.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedLeaveRequests.includes(leaveRequest.id)}
                                  onCheckedChange={(checked) =>
                                    handleSelectLeaveRequest(leaveRequest.id, checked as boolean)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={leaveRequest.photo || "/placeholder.svg"}
                                      alt={leaveRequest.studentName}
                                    />
                                    <AvatarFallback>
                                      {leaveRequest.studentName
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{leaveRequest.studentName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {leaveRequest.studentId} • Grade {leaveRequest.grade}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{leaveRequest.leaveType}</p>
                                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {leaveRequest.reason}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{leaveRequest.duration}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(leaveRequest.startDate).toLocaleDateString()} -{" "}
                                    {new Date(leaveRequest.endDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(leaveRequest.status)}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{new Date(leaveRequest.appliedOn).toLocaleDateString()}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {leaveRequest.approvedOn
                                      ? `${
                                          leaveRequest.status === "approved" ? "Approved" : "Rejected"
                                        } on ${new Date(leaveRequest.approvedOn).toLocaleDateString()}`
                                      : "Awaiting decision"}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleViewLeaveDetails(leaveRequest)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {leaveRequest.status === "pending" && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-success"
                                        onClick={() => handleApproveLeaveRequest(leaveRequest)}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-error"
                                        onClick={() => handleRejectLeaveRequest(leaveRequest)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleViewLeaveDetails(leaveRequest)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      {leaveRequest.status === "pending" && (
                                        <>
                                          <DropdownMenuItem
                                            onClick={() => handleApproveLeaveRequest(leaveRequest)}
                                            className="text-success"
                                          >
                                            <Check className="mr-2 h-4 w-4" />
                                            Approve
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => handleRejectLeaveRequest(leaveRequest)}
                                            className="text-error"
                                          >
                                            <X className="mr-2 h-4 w-4" />
                                            Reject
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Email
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Leave Details Dialog */}
          <Dialog open={showLeaveDetailsDialog} onOpenChange={setShowLeaveDetailsDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Leave Request Details</DialogTitle>
                <DialogDescription>
                  {selectedLeaveRequest?.id} • {selectedLeaveRequest?.leaveType}
                </DialogDescription>
              </DialogHeader>
              {selectedLeaveRequest && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Student Information */}
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Student Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={selectedLeaveRequest.photo || "/placeholder.svg"}
                              alt={selectedLeaveRequest.studentName}
                            />
                            <AvatarFallback>
                              {selectedLeaveRequest.studentName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{selectedLeaveRequest.studentName}</h3>
                            <p className="text-muted-foreground">
                              {selectedLeaveRequest.studentId} • Grade {selectedLeaveRequest.grade}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Room</span>
                            <span className="font-medium">
                              {selectedLeaveRequest.room}, {selectedLeaveRequest.block}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contact Person</span>
                            <span className="font-medium">{selectedLeaveRequest.contactPerson}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contact Number</span>
                            <span className="font-medium">{selectedLeaveRequest.contactNumber}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Leave Information */}
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Leave Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <CalendarRange className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedLeaveRequest.leaveType}</p>
                            <p className="text-sm text-muted-foreground">{selectedLeaveRequest.duration}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date</span>
                            <span className="font-medium">
                              {new Date(selectedLeaveRequest.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date</span>
                            <span className="font-medium">
                              {new Date(selectedLeaveRequest.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Applied On</span>
                            <span className="font-medium">
                              {new Date(selectedLeaveRequest.appliedOn).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <span>{getStatusBadge(selectedLeaveRequest.status)}</span>
                          </div>
                          {selectedLeaveRequest.approvedBy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {selectedLeaveRequest.status === "approved" ? "Approved By" : "Rejected By"}
                              </span>
                              <span className="font-medium">{selectedLeaveRequest.approvedBy}</span>
                            </div>
                          )}
                          {selectedLeaveRequest.approvedOn && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {selectedLeaveRequest.status === "approved" ? "Approved On" : "Rejected On"}
                              </span>
                              <span className="font-medium">
                                {new Date(selectedLeaveRequest.approvedOn).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Reason and Additional Information */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Reason and Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Reason for Leave</h4>
                          <p className="text-muted-foreground">{selectedLeaveRequest.reason}</p>
                        </div>
                        {selectedLeaveRequest.rejectionReason && (
                          <div>
                            <h4 className="font-medium mb-1 text-error">Reason for Rejection</h4>
                            <p className="text-muted-foreground">{selectedLeaveRequest.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    {selectedLeaveRequest.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          className="text-error border-error/20 hover:bg-error/10"
                          onClick={() => {
                            setShowLeaveDetailsDialog(false)
                            handleRejectLeaveRequest(selectedLeaveRequest)
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          className="bg-success hover:bg-success/90"
                          onClick={() => {
                            setShowLeaveDetailsDialog(false)
                            handleApproveLeaveRequest(selectedLeaveRequest)
                          }}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </>
                    )}
                    <Button variant="outline">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Approve Leave Dialog */}
          <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Leave Request</DialogTitle>
                <DialogDescription>
                  You are approving leave request for {selectedLeaveRequest?.studentName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-success/5 p-4 rounded-md flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Leave Details</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLeaveRequest?.leaveType} • {selectedLeaveRequest?.duration} (
                      {new Date(selectedLeaveRequest?.startDate || "").toLocaleDateString()} -{" "}
                      {new Date(selectedLeaveRequest?.endDate || "").toLocaleDateString()})
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
                  <Textarea
                    id="approval-notes"
                    placeholder="Add any notes or instructions..."
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-parent" checked={notifyParent} onCheckedChange={setNotifyParent as any} />
                  <Label htmlFor="notify-parent">Notify parent/guardian via email and SMS</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-success hover:bg-success/90" onClick={confirmApproval}>
                  Confirm Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Reject Leave Dialog */}
          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Leave Request</DialogTitle>
                <DialogDescription>
                  You are rejecting leave request for {selectedLeaveRequest?.studentName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-error/5 p-4 rounded-md flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error mt-0.5" />
                  <div>
                    <p className="font-medium">Leave Details</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLeaveRequest?.leaveType} • {selectedLeaveRequest?.duration} (
                      {new Date(selectedLeaveRequest?.startDate || "").toLocaleDateString()} -{" "}
                      {new Date(selectedLeaveRequest?.endDate || "").toLocaleDateString()})
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Provide a reason for rejecting this leave request..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-parent-reject" checked={notifyParent} onCheckedChange={setNotifyParent as any} />
                  <Label htmlFor="notify-parent-reject">Notify parent/guardian via email and SMS</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmRejection}>
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* New Leave Request Dialog */}
          <Dialog open={showNewLeaveDialog} onOpenChange={setShowNewLeaveDialog}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Leave Request</DialogTitle>
                <DialogDescription>Create a new leave request for a hostel student</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Student Information</h3>
                    <div>
                      <Label htmlFor="student-select">Select Student</Label>
                      <Select value={newLeaveRequest.studentId} onValueChange={handleStudentSelect}>
                        <SelectTrigger id="student-select">
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                        <SelectContent>
                          {studentsData.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                                  <AvatarFallback>
                                    {student.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {student.name} ({student.id})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {newLeaveRequest.studentId && (
                      <div className="bg-primary/5 p-4 rounded-md">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                studentsData.find((s) => s.id === newLeaveRequest.studentId)?.photo ||
                                "/placeholder.svg"
                              }
                              alt={studentsData.find((s) => s.id === newLeaveRequest.studentId)?.name || ""}
                            />
                            <AvatarFallback>
                              {(studentsData.find((s) => s.id === newLeaveRequest.studentId)?.name || "")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {studentsData.find((s) => s.id === newLeaveRequest.studentId)?.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Grade {studentsData.find((s) => s.id === newLeaveRequest.studentId)?.grade} •{" "}
                              {studentsData.find((s) => s.id === newLeaveRequest.studentId)?.room}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="leave-type">Leave Type</Label>
                      <Select
                        value={newLeaveRequest.leaveType}
                        onValueChange={(value) => setNewLeaveRequest({ ...newLeaveRequest, leaveType: value })}
                      >
                        <SelectTrigger id="leave-type">
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-visit">Home Visit</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Leave Duration</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="start-date" className="text-xs">
                            Start Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                id="start-date"
                              >
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={startDate}
                                onSelect={(date) => {
                                  setStartDate(date)
                                  if (date) {
                                    setNewLeaveRequest({
                                      ...newLeaveRequest,
                                      startDate: date.toISOString().split("T")[0],
                                    })
                                  }
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="end-date" className="text-xs">
                            End Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                id="end-date"
                              >
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={endDate}
                                onSelect={(date) => {
                                  setEndDate(date)
                                  if (date) {
                                    setNewLeaveRequest({
                                      ...newLeaveRequest,
                                      endDate: date.toISOString().split("T")[0],
                                    })
                                  }
                                }}
                                initialFocus
                                disabled={(date) => {
                                  if (!startDate) return false
                                  return date < startDate
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason for Leave</Label>
                      <Textarea
                        id="reason"
                        placeholder="Provide detailed reason for the leave request..."
                        value={newLeaveRequest.reason}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, reason: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Information</h3>
                    <div>
                      <Label htmlFor="contact-person">Contact Person</Label>
                      <Input
                        id="contact-person"
                        placeholder="Name of parent/guardian"
                        value={newLeaveRequest.contactPerson}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, contactPerson: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-number">Contact Number</Label>
                      <Input
                        id="contact-number"
                        placeholder="Phone number"
                        value={newLeaveRequest.contactNumber}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, contactNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address During Leave</Label>
                      <Textarea
                        id="address"
                        placeholder="Full address where the student will stay during leave"
                        value={newLeaveRequest.address}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-contact">Emergency Contact</Label>
                      <Input
                        id="emergency-contact"
                        placeholder="Alternative contact number"
                        value={newLeaveRequest.emergencyContact}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, emergencyContact: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="travel-details">Travel Details (Optional)</Label>
                      <Textarea
                        id="travel-details"
                        placeholder="Mode of transport, timings, etc."
                        value={newLeaveRequest.travelDetails}
                        onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, travelDetails: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="notify-parent-new"
                        checked={newLeaveRequest.notifyParent}
                        onCheckedChange={(checked) =>
                          setNewLeaveRequest({ ...newLeaveRequest, notifyParent: checked as boolean })
                        }
                      />
                      <Label htmlFor="notify-parent-new">Notify parent/guardian via email and SMS</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewLeaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewLeaveSubmit}>Create Leave Request</Button>
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
