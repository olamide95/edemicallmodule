"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  X,
  Calendar,
  DollarSign,
  Users,
  UserPlus,
  Mail,
  Phone,
  User,
  Pencil,
  Trash2,
  CheckSquare,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function AfterSchoolEnrollmentPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentTab, setCurrentTab] = useState("active")
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock data for programs
  const programs = [
    {
      id: "prog1",
      name: "Robotics Club",
      category: "STEM",
      grades: "6-8",
      days: "Mon, Wed",
      time: "3:30 PM - 5:00 PM",
      instructor: "Dr. Robert Chen",
      location: "Science Lab 2",
      capacity: 20,
      enrolled: 18,
      waitlist: 3,
      fee: "$250",
      status: "Active",
      startDate: "Sep 5, 2023",
      endDate: "Dec 15, 2023",
    },
    {
      id: "prog2",
      name: "Creative Writing",
      category: "Arts",
      grades: "4-6",
      days: "Tue, Thu",
      time: "3:30 PM - 4:30 PM",
      instructor: "Ms. Sarah Johnson",
      location: "Library",
      capacity: 15,
      enrolled: 12,
      waitlist: 0,
      fee: "$180",
      status: "Active",
      startDate: "Sep 6, 2023",
      endDate: "Dec 14, 2023",
    },
    {
      id: "prog3",
      name: "Basketball",
      category: "Sports",
      grades: "7-9",
      days: "Mon, Wed, Fri",
      time: "4:00 PM - 5:30 PM",
      instructor: "Coach Mike Thompson",
      location: "Gymnasium",
      capacity: 24,
      enrolled: 24,
      waitlist: 5,
      fee: "$220",
      status: "Full",
      startDate: "Sep 4, 2023",
      endDate: "Dec 15, 2023",
    },
    {
      id: "prog4",
      name: "Chess Club",
      category: "Academic",
      grades: "3-8",
      days: "Friday",
      time: "3:30 PM - 5:00 PM",
      instructor: "Mr. David Fischer",
      location: "Room 105",
      capacity: 16,
      enrolled: 10,
      waitlist: 0,
      fee: "$150",
      status: "Active",
      startDate: "Sep 8, 2023",
      endDate: "Dec 15, 2023",
    },
    {
      id: "prog5",
      name: "Art Studio",
      category: "Arts",
      grades: "K-5",
      days: "Tue, Thu",
      time: "3:30 PM - 4:45 PM",
      instructor: "Ms. Emily Parker",
      location: "Art Room",
      capacity: 18,
      enrolled: 15,
      waitlist: 0,
      fee: "$200",
      status: "Active",
      startDate: "Sep 5, 2023",
      endDate: "Dec 14, 2023",
    },
    {
      id: "prog6",
      name: "Coding for Kids",
      category: "STEM",
      grades: "4-6",
      days: "Wed",
      time: "3:30 PM - 5:00 PM",
      instructor: "Mr. Jason Lee",
      location: "Computer Lab",
      capacity: 15,
      enrolled: 15,
      waitlist: 2,
      fee: "$275",
      status: "Full",
      startDate: "Sep 6, 2023",
      endDate: "Dec 13, 2023",
    },
  ]

  // Mock data for students
  const students = [
    {
      id: "S1001",
      name: "Emma Thompson",
      grade: "6",
      program: "Robotics Club",
      enrollmentDate: "Aug 15, 2023",
      status: "Active",
      paymentStatus: "Paid",
      parent: "Michael Thompson",
      email: "mthompson@example.com",
      phone: "(555) 123-4567",
      attendance: "95%",
    },
    {
      id: "S1002",
      name: "Noah Garcia",
      grade: "7",
      program: "Basketball",
      enrollmentDate: "Aug 10, 2023",
      status: "Active",
      paymentStatus: "Paid",
      parent: "Maria Garcia",
      email: "mgarcia@example.com",
      phone: "(555) 234-5678",
      attendance: "100%",
    },
    {
      id: "S1003",
      name: "Olivia Wilson",
      grade: "4",
      program: "Creative Writing",
      enrollmentDate: "Aug 18, 2023",
      status: "Active",
      paymentStatus: "Partial",
      parent: "James Wilson",
      email: "jwilson@example.com",
      phone: "(555) 345-6789",
      attendance: "85%",
    },
    {
      id: "S1004",
      name: "Liam Johnson",
      grade: "5",
      program: "Art Studio",
      enrollmentDate: "Aug 20, 2023",
      status: "Active",
      paymentStatus: "Unpaid",
      parent: "Sarah Johnson",
      email: "sjohnson@example.com",
      phone: "(555) 456-7890",
      attendance: "90%",
    },
    {
      id: "S1005",
      name: "Ava Martinez",
      grade: "8",
      program: "Robotics Club",
      enrollmentDate: "Aug 12, 2023",
      status: "Active",
      paymentStatus: "Paid",
      parent: "Carlos Martinez",
      email: "cmartinez@example.com",
      phone: "(555) 567-8901",
      attendance: "98%",
    },
    {
      id: "S1006",
      name: "Ethan Brown",
      grade: "3",
      program: "Chess Club",
      enrollmentDate: "Aug 22, 2023",
      status: "Waitlisted",
      paymentStatus: "N/A",
      parent: "David Brown",
      email: "dbrown@example.com",
      phone: "(555) 678-9012",
      attendance: "N/A",
    },
    {
      id: "S1007",
      name: "Sophia Davis",
      grade: "6",
      program: "Coding for Kids",
      enrollmentDate: "Aug 14, 2023",
      status: "Waitlisted",
      paymentStatus: "N/A",
      parent: "Jennifer Davis",
      email: "jdavis@example.com",
      phone: "(555) 789-0123",
      attendance: "N/A",
    },
    {
      id: "S1008",
      name: "Mason Miller",
      grade: "7",
      program: "Basketball",
      enrollmentDate: "Aug 11, 2023",
      status: "Active",
      paymentStatus: "Paid",
      parent: "Robert Miller",
      email: "rmiller@example.com",
      phone: "(555) 890-1234",
      attendance: "92%",
    },
    {
      id: "S1009",
      name: "Isabella Taylor",
      grade: "5",
      program: "Art Studio",
      enrollmentDate: "Aug 19, 2023",
      status: "Active",
      paymentStatus: "Paid",
      parent: "William Taylor",
      email: "wtaylor@example.com",
      phone: "(555) 901-2345",
      attendance: "88%",
    },
    {
      id: "S1010",
      name: "James Anderson",
      grade: "4",
      program: "Creative Writing",
      enrollmentDate: "Aug 21, 2023",
      status: "Pending",
      paymentStatus: "Unpaid",
      parent: "Elizabeth Anderson",
      email: "eanderson@example.com",
      phone: "(555) 012-3456",
      attendance: "N/A",
    },
  ]

  // Mock data for waitlist
  const waitlistStudents = students.filter((student) => student.status === "Waitlisted")

  // Mock data for pending enrollments
  const pendingStudents = students.filter((student) => student.status === "Pending")

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade
    const matchesStatus = filterStatus === "all" || student.status.toLowerCase() === filterStatus.toLowerCase()

    if (currentTab === "active") {
      return matchesSearch && matchesGrade && matchesStatus && student.status === "Active"
    } else if (currentTab === "pending") {
      return matchesSearch && matchesGrade && matchesStatus && student.status === "Pending"
    } else if (currentTab === "waitlist") {
      return matchesSearch && matchesGrade && matchesStatus && student.status === "Waitlisted"
    }

    return matchesSearch && matchesGrade && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "waitlisted":
        return <Badge className="bg-amber-500">Waitlisted</Badge>
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "partial":
        return <Badge className="bg-amber-500">Partial</Badge>
      case "unpaid":
        return <Badge className="bg-red-500">Unpaid</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
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
                <h1 className="text-2xl font-bold mb-1">Enrollment Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Apps</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">After School</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Enrollment</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Manage student enrollment in after-school programs. Process new enrollments, handle waitlists, track
                  payments, and monitor attendance all in one place.
                </p>

                <Button
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => setEnrollmentModalOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  New Enrollment
                </Button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=students+enrolling+in+after+school+programs"
                  alt="Enrollment Management Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Total Enrollments
                  </p>
                  <h3 className="text-3xl font-bold mt-1">94</h3>
                </div>
                <div className="p-2 bg-primary-light rounded-md">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+12</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last term</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Active Students
                  </p>
                  <h3 className="text-3xl font-bold mt-1">82</h3>
                </div>
                <div className="p-2 bg-success-light rounded-md">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">87%</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">enrollment rate</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Waitlisted
                  </p>
                  <h3 className="text-3xl font-bold mt-1">10</h3>
                </div>
                <div className="p-2 bg-warning-light rounded-md">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-warning font-medium">2</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">
                  programs with waitlists
                </span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Pending Payments
                  </p>
                  <h3 className="text-3xl font-bold mt-1">$2,450</h3>
                </div>
                <div className="p-2 bg-error-light rounded-md">
                  <DollarSign className="w-6 h-6 text-error" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-error font-medium">8</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">unpaid enrollments</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-divider flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-grow">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary h-4 w-4" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-10 bg-light-bg dark:bg-dark-bg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="p-2">
                      <Label htmlFor="grade-filter" className="text-xs font-medium">
                        Grade
                      </Label>
                      <Select value={filterGrade} onValueChange={setFilterGrade}>
                        <SelectTrigger id="grade-filter" className="mt-1">
                          <SelectValue placeholder="All Grades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          <SelectItem value="K">Kindergarten</SelectItem>
                          <SelectItem value="1">Grade 1</SelectItem>
                          <SelectItem value="2">Grade 2</SelectItem>
                          <SelectItem value="3">Grade 3</SelectItem>
                          <SelectItem value="4">Grade 4</SelectItem>
                          <SelectItem value="5">Grade 5</SelectItem>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Label htmlFor="status-filter" className="text-xs font-medium">
                        Status
                      </Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger id="status-filter" className="mt-1">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="waitlisted">Waitlisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Button
                  className="gap-2 bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    if (selectedStudents.length > 0) {
                      setBulkActionModalOpen(true)
                    } else {
                      setEnrollmentModalOpen(true)
                    }
                  }}
                >
                  {selectedStudents.length > 0 ? (
                    <>
                      <CheckSquare className="h-4 w-4" />
                      Bulk Actions ({selectedStudents.length})
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      New Enrollment
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" onValueChange={setCurrentTab}>
              <div className="px-4 pt-2">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="active" className="rounded-md">
                    Active Enrollments
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="rounded-md">
                    Pending ({pendingStudents.length})
                  </TabsTrigger>
                  <TabsTrigger value="waitlist" className="rounded-md">
                    Waitlist ({waitlistStudents.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="active" className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectAll}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all students"
                          />
                        </TableHead>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Enrollment Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onCheckedChange={() => handleSelectStudent(student.id)}
                                aria-label={`Select ${student.name}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{student.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    {student.parent}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.grade}</TableCell>
                            <TableCell>{student.program}</TableCell>
                            <TableCell>{student.enrollmentDate}</TableCell>
                            <TableCell>{getStatusBadge(student.status)}</TableCell>
                            <TableCell>{getPaymentStatusBadge(student.paymentStatus)}</TableCell>
                            <TableCell>
                              {student.attendance !== "N/A" ? (
                                <div className="flex flex-col gap-1">
                                  <div className="text-sm">{student.attendance}</div>
                                  <Progress
                                    value={Number.parseInt(student.attendance)}
                                    className="h-2"
                                    indicatorClassName={
                                      Number.parseInt(student.attendance) > 90
                                        ? "bg-green-500"
                                        : Number.parseInt(student.attendance) > 80
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                    }
                                  />
                                </div>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedStudent(student.id)
                                      // Open student details modal
                                    }}
                                  >
                                    <User className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedStudent(student.id)
                                      // Open edit enrollment modal
                                    }}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Enrollment
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedStudent(student.id)
                                      setPaymentModalOpen(true)
                                    }}
                                  >
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Record Payment
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                      // Open confirmation dialog for withdrawal
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Withdraw
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            No students found matching your criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingStudents.length > 0 ? (
                    pendingStudents.map((student) => (
                      <Card key={student.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{student.name}</CardTitle>
                              <CardDescription>
                                ID: {student.id} • Grade {student.grade}
                              </CardDescription>
                            </div>
                            <Badge className="bg-blue-500">Pending</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Program:</span>
                              <span className="font-medium">{student.program}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Applied:</span>
                              <span>{student.enrollmentDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Payment:</span>
                              <span>{getPaymentStatusBadge(student.paymentStatus)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Contact:</span>
                              <span className="flex items-center gap-2">
                                <Mail className="h-4 w-4 cursor-pointer text-primary" />
                                <Phone className="h-4 w-4 cursor-pointer text-primary" />
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button variant="outline" size="sm">
                            <User className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="destructive" size="sm">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90 text-white" size="sm">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-primary/10 p-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No Pending Enrollments</h3>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-center max-w-md">
                        All enrollment applications have been processed. New applications will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="waitlist" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {waitlistStudents.length > 0 ? (
                    waitlistStudents.map((student) => (
                      <Card key={student.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{student.name}</CardTitle>
                              <CardDescription>
                                ID: {student.id} • Grade {student.grade}
                              </CardDescription>
                            </div>
                            <Badge className="bg-amber-500">Waitlisted</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Program:</span>
                              <span className="font-medium">{student.program}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                Waitlisted:
                              </span>
                              <span>{student.enrollmentDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Position:</span>
                              <Badge variant="outline" className="font-medium">
                                #2 in line
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-light-text-secondary dark:text-dark-text-secondary">Contact:</span>
                              <span className="flex items-center gap-2">
                                <Mail className="h-4 w-4 cursor-pointer text-primary" />
                                <Phone className="h-4 w-4 cursor-pointer text-primary" />
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button variant="outline" size="sm">
                            <User className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="destructive" size="sm">
                              <X className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                            <Button
                              className="bg-primary hover:bg-primary/90 text-white"
                              size="sm"
                              onClick={() => setWaitlistModalOpen(true)}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Enroll
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-success/10 p-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-success" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No Waitlisted Students</h3>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-center max-w-md">
                        There are currently no students on the waitlist for any programs.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-divider">
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                <span className="font-medium">94</span> results
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
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

      {/* New Enrollment Modal */}
      <Dialog open={enrollmentModalOpen} onOpenChange={setEnrollmentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Student Enrollment</DialogTitle>
            <DialogDescription>
              Enroll a student in an after-school program. Fill out all required information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Student Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="student-select">Select Student</Label>
                  <Select>
                    <SelectTrigger id="student-select">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">+ Add New Student</SelectItem>
                      <SelectItem value="S1001">Emma Thompson (Grade 6)</SelectItem>
                      <SelectItem value="S1002">Noah Garcia (Grade 7)</SelectItem>
                      <SelectItem value="S1003">Olivia Wilson (Grade 4)</SelectItem>
                      <SelectItem value="S1004">Liam Johnson (Grade 5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input id="student-id" placeholder="Student ID" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="K">Kindergarten</SelectItem>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                      <SelectItem value="4">Grade 4</SelectItem>
                      <SelectItem value="5">Grade 5</SelectItem>
                      <SelectItem value="6">Grade 6</SelectItem>
                      <SelectItem value="7">Grade 7</SelectItem>
                      <SelectItem value="8">Grade 8</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent-name">Parent/Guardian Name</Label>
                  <Input id="parent-name" placeholder="Parent/Guardian name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-email">Email</Label>
                    <Input id="parent-email" type="email" placeholder="Email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-phone">Phone</Label>
                    <Input id="parent-phone" placeholder="Phone number" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Program Selection</h3>

                <div className="space-y-2">
                  <Label htmlFor="program-select">Select Program</Label>
                  <Select value={selectedProgram || undefined} onValueChange={(value) => setSelectedProgram(value)}>
                    <SelectTrigger id="program-select">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name} ({program.grades})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProgram && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {programs.find((p) => p.id === selectedProgram)?.name}
                      </CardTitle>
                      <CardDescription>
                        {programs.find((p) => p.id === selectedProgram)?.category} • Grades{" "}
                        {programs.find((p) => p.id === selectedProgram)?.grades}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Schedule:</span>
                          <span>
                            {programs.find((p) => p.id === selectedProgram)?.days} •{" "}
                            {programs.find((p) => p.id === selectedProgram)?.time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Location:</span>
                          <span>{programs.find((p) => p.id === selectedProgram)?.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Instructor:</span>
                          <span>{programs.find((p) => p.id === selectedProgram)?.instructor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Fee:</span>
                          <span className="font-medium">{programs.find((p) => p.id === selectedProgram)?.fee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Availability:</span>
                          <span>
                            {programs.find((p) => p.id === selectedProgram)?.enrolled}/
                            {programs.find((p) => p.id === selectedProgram)?.capacity} Enrolled
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light-text-secondary dark:text-dark-text-secondary">Status:</span>
                          <Badge
                            className={
                              programs.find((p) => p.id === selectedProgram)?.status === "Full"
                                ? "bg-amber-500"
                                : "bg-green-500"
                            }
                          >
                            {programs.find((p) => p.id === selectedProgram)?.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="enrollment-date">Enrollment Date</Label>
                  <div className="relative">
                    <Input id="enrollment-date" type="date" />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-status">Payment Status</Label>
                  <Select>
                    <SelectTrigger id="payment-status">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial Payment</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="waived">Fee Waived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent"
                    placeholder="Any special requirements or additional information..."
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" />
                  <label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Parent/guardian has provided consent for participation
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEnrollmentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                // Process enrollment
                setEnrollmentModalOpen(false)
              }}
            >
              {programs.find((p) => p.id === selectedProgram)?.status === "Full"
                ? "Add to Waitlist"
                : "Complete Enrollment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Action Modal */}
      <Dialog open={bulkActionModalOpen} onOpenChange={setBulkActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
            <DialogDescription>Apply actions to {selectedStudents.length} selected students</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Selected Students</Label>
              <div className="p-2 border rounded-md bg-light-bg dark:bg-dark-bg max-h-32 overflow-y-auto">
                <div className="space-y-1">
                  {selectedStudents.map((id) => {
                    const student = students.find((s) => s.id === id)
                    return (
                      <div key={id} className="flex items-center justify-between text-sm">
                        <span>
                          {student?.name} ({student?.id})
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleSelectStudent(id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-action">Select Action</Label>
              <Select>
                <SelectTrigger id="bulk-action">
                  <SelectValue placeholder="Choose an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="change-status">Change Status</SelectItem>
                  <SelectItem value="change-program">Change Program</SelectItem>
                  <SelectItem value="send-email">Send Email Notification</SelectItem>
                  <SelectItem value="generate-invoice">Generate Invoice</SelectItem>
                  <SelectItem value="withdraw">Withdraw from Program</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action-details">Action Details</Label>
              <Select disabled>
                <SelectTrigger id="action-details">
                  <SelectValue placeholder="Select an action first" />
                </SelectTrigger>
                <SelectContent>{/* Dynamic content based on selected action */}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk-notes">Notes</Label>
              <textarea
                id="bulk-notes"
                className="w-full min-h-[80px] p-3 rounded-md border border-input bg-transparent"
                placeholder="Add notes about this bulk action..."
              ></textarea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                // Process bulk action
                setBulkActionModalOpen(false)
                setSelectedStudents([])
                setSelectAll(false)
              }}
            >
              Apply to {selectedStudents.length} Students
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Waitlist Enrollment Modal */}
      <Dialog open={waitlistModalOpen} onOpenChange={setWaitlistModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll from Waitlist</DialogTitle>
            <DialogDescription>A spot has become available. Enroll this student from the waitlist.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Ethan Brown</CardTitle>
                    <CardDescription>ID: S1006 • Grade 3</CardDescription>
                  </div>
                  <Badge className="bg-amber-500">Waitlisted</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Program:</span>
                    <span className="font-medium">Chess Club</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Waitlisted Since:</span>
                    <span>Aug 22, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Waitlist Position:</span>
                    <Badge variant="outline" className="font-medium">
                      #1 in line
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="enrollment-date">Enrollment Date</Label>
              <div className="relative">
                <Input id="enrollment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-status">Payment Status</Label>
              <Select defaultValue="unpaid">
                <SelectTrigger id="payment-status">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="waived">Fee Waived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notify-parent">Notification</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-parent" defaultChecked />
                <label htmlFor="notify-parent" className="text-sm font-medium leading-none">
                  Send enrollment confirmation to parent/guardian
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setWaitlistModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                // Process enrollment from waitlist
                setWaitlistModalOpen(false)
              }}
            >
              Confirm Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>Record a payment for the selected student's program enrollment.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-light-bg dark:bg-dark-bg rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Student:</span>
                <span>Liam Johnson (S1004)</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Program:</span>
                <span>Art Studio</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total Fee:</span>
                <span>$200.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Amount Paid:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Balance Due:</span>
                <span className="text-red-500 font-medium">$200.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-amount">Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary h-4 w-4" />
                <Input id="payment-amount" className="pl-10" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <div className="relative">
                <Input id="payment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-reference">Reference/Receipt Number</Label>
              <Input id="payment-reference" placeholder="Enter reference number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-notes">Notes</Label>
              <textarea
                id="payment-notes"
                className="w-full min-h-[80px] p-3 rounded-md border border-input bg-transparent"
                placeholder="Add notes about this payment..."
              ></textarea>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="send-receipt" defaultChecked />
              <label htmlFor="send-receipt" className="text-sm font-medium leading-none">
                Send receipt to parent/guardian
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                // Process payment
                setPaymentModalOpen(false)
              }}
            >
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
