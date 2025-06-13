"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  Users,
  Search,
  Filter,
  Plus,
  Home,
  User,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  AlertCircle,
  Download,
  Upload,
  Edit,
  Eye,
  UserPlus,
  UserMinus,
  Clock,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Student {
  id: string
  name: string
  studentId: string
  grade: string
  gender: "Male" | "Female"
  contact: string
  parentContact: string
  currentRoom?: string
  allocationDate?: string
  status: "Allocated" | "Pending" | "Waitlist"
  preferences?: string[]
  medicalConditions?: string[]
}

interface Room {
  id: string
  roomNumber: string
  block: string
  floor: string
  type: string
  capacity: number
  occupied: number
  availableBeds: string[]
  amenities: string[]
}

interface AllocationRequest {
  id: string
  studentId: string
  studentName: string
  requestDate: string
  preferredBlock?: string
  preferredRoommate?: string
  specialRequirements?: string
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "Approved" | "Rejected"
}

export default function StudentAllocationPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<"allocations" | "requests" | "waitlist">("allocations")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [showAllocationModal, setShowAllocationModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // New state for the new allocation modal
  const [showNewAllocationModal, setShowNewAllocationModal] = useState(false)
  const [newAllocation, setNewAllocation] = useState({
    studentId: "",
    studentName: "",
    grade: "",
    gender: "",
    contact: "",
    parentContact: "",
    preferredBlock: "",
    preferredRoommate: "",
    specialRequirements: "",
    priority: "Medium",
    medicalConditions: "",
  })

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock data
  const students: Student[] = [
    {
      id: "1",
      name: "John Smith",
      studentId: "STU001",
      grade: "10",
      gender: "Male",
      contact: "+1234567890",
      parentContact: "+0987654321",
      currentRoom: "A-101",
      allocationDate: "2024-01-15",
      status: "Allocated",
      preferences: ["Ground Floor", "Near Library"],
      medicalConditions: ["Asthma"],
    },
    {
      id: "2",
      name: "Emily Johnson",
      studentId: "STU002",
      grade: "11",
      gender: "Female",
      contact: "+1234567891",
      parentContact: "+0987654322",
      currentRoom: "B-205",
      allocationDate: "2024-01-16",
      status: "Allocated",
      preferences: ["Quiet Area"],
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "STU003",
      grade: "9",
      gender: "Male",
      contact: "+1234567892",
      parentContact: "+0987654323",
      status: "Pending",
      preferences: ["Sports Block"],
    },
    {
      id: "4",
      name: "Sarah Davis",
      studentId: "STU004",
      grade: "12",
      gender: "Female",
      contact: "+1234567893",
      parentContact: "+0987654324",
      status: "Waitlist",
      preferences: ["Top Floor", "Study Area"],
    },
    {
      id: "5",
      name: "James Wilson",
      studentId: "STU005",
      grade: "10",
      gender: "Male",
      contact: "+1234567894",
      parentContact: "+0987654325",
      currentRoom: "C-301",
      allocationDate: "2024-01-17",
      status: "Allocated",
    },
    {
      id: "6",
      name: "Emma Martinez",
      studentId: "STU006",
      grade: "11",
      gender: "Female",
      contact: "+1234567895",
      parentContact: "+0987654326",
      status: "Pending",
      preferences: ["Near Cafeteria"],
      medicalConditions: ["Diabetes"],
    },
  ]

  const availableRooms: Room[] = [
    {
      id: "1",
      roomNumber: "A-103",
      block: "A",
      floor: "1",
      type: "Standard",
      capacity: 4,
      occupied: 2,
      availableBeds: ["Bed 3", "Bed 4"],
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table"],
    },
    {
      id: "2",
      roomNumber: "B-202",
      block: "B",
      floor: "2",
      type: "Standard",
      capacity: 4,
      occupied: 1,
      availableBeds: ["Bed 2", "Bed 3", "Bed 4"],
      amenities: ["Wi-Fi", "Shared Bathroom", "Study Table"],
    },
    {
      id: "3",
      roomNumber: "C-302",
      block: "C",
      floor: "3",
      type: "Deluxe",
      capacity: 2,
      occupied: 0,
      availableBeds: ["Bed 1", "Bed 2"],
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table", "AC"],
    },
    {
      id: "4",
      roomNumber: "A-105",
      block: "A",
      floor: "1",
      type: "Standard",
      capacity: 4,
      occupied: 3,
      availableBeds: ["Bed 4"],
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table"],
    },
  ]

  const allocationRequests: AllocationRequest[] = [
    {
      id: "1",
      studentId: "STU003",
      studentName: "Michael Brown",
      requestDate: "2024-05-18",
      preferredBlock: "A",
      preferredRoommate: "STU005",
      priority: "High",
      status: "Pending",
    },
    {
      id: "2",
      studentId: "STU006",
      studentName: "Emma Martinez",
      requestDate: "2024-05-19",
      preferredBlock: "B",
      specialRequirements: "Ground floor due to medical condition",
      priority: "High",
      status: "Pending",
    },
    {
      id: "3",
      studentId: "STU004",
      studentName: "Sarah Davis",
      requestDate: "2024-05-17",
      preferredBlock: "C",
      priority: "Medium",
      status: "Pending",
    },
  ]

  const grades = ["All", "9", "10", "11", "12"]
  const statuses = ["All", "Allocated", "Pending", "Waitlist"]
  const blocks = ["A", "B", "C", "D"]
  const priorities = ["High", "Medium", "Low"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = selectedGrade === "All" || student.grade === selectedGrade
    const matchesStatus = selectedStatus === "All" || student.status === selectedStatus

    return matchesSearch && matchesGrade && matchesStatus
  })

  const allocatedStudents = filteredStudents.filter((s) => s.status === "Allocated")
  const pendingStudents = filteredStudents.filter((s) => s.status === "Pending")
  const waitlistStudents = filteredStudents.filter((s) => s.status === "Waitlist")

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const currentStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAllocateRoom = (student: Student) => {
    setSelectedStudent(student)
    setShowAllocationModal(true)
  }

  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room)
  }

  const confirmAllocation = () => {
    // Handle allocation logic here
    setShowAllocationModal(false)
    setSelectedStudent(null)
    setSelectedRoom(null)
  }

  const handleNewAllocationSubmit = () => {
    // Here you would typically make an API call to create the new allocation
    console.log("Creating new allocation:", newAllocation)

    // For demo purposes, we'll just close the modal
    setShowNewAllocationModal(false)

    // Reset the form
    setNewAllocation({
      studentId: "",
      studentName: "",
      grade: "",
      gender: "",
      contact: "",
      parentContact: "",
      preferredBlock: "",
      preferredRoommate: "",
      specialRequirements: "",
      priority: "Medium",
      medicalConditions: "",
    })

    // Show success message or update the UI as needed
    alert("New allocation request created successfully!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAllocation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewAllocation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const statusColors = {
    Allocated: "bg-success text-white",
    Pending: "bg-warning text-white",
    Waitlist: "bg-info text-white",
  }

  const priorityColors = {
    High: "bg-error text-white",
    Medium: "bg-warning text-white",
    Low: "bg-info text-white",
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Page Header */}
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Student Allocation</h1>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-1">
                  Manage student room allocations and requests
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  Import Students
                </button>
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Download size={16} />
                  Export Report
                </button>
                <button
                  onClick={() => setShowNewAllocationModal(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  New Allocation
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Total Students</p>
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{students.length}</p>
              </div>
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Allocated</p>
                  <Check className="w-5 h-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  {allocatedStudents.length}
                </p>
              </div>
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Pending</p>
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  {pendingStudents.length}
                </p>
              </div>
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Waitlist</p>
                  <AlertCircle className="w-5 h-5 text-info" />
                </div>
                <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  {waitlistStudents.length}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setActiveTab("allocations")}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === "allocations"
                    ? "text-[#8C57FF] dark:text-[#8C57FF]"
                    : "text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] hover:text-[#374151] dark:hover:text-[rgba(231,227,252,0.9)]"
                }`}
              >
                All Students
                {activeTab === "allocations" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C57FF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === "requests"
                    ? "text-[#8C57FF] dark:text-[#8C57FF]"
                    : "text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] hover:text-[#374151] dark:hover:text-[rgba(231,227,252,0.9)]"
                }`}
              >
                Allocation Requests
                <span className="ml-2 px-2 py-0.5 text-xs bg-[#8C57FF] text-white rounded-full">
                  {allocationRequests.filter((r) => r.status === "Pending").length}
                </span>
                {activeTab === "requests" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C57FF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("waitlist")}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === "waitlist"
                    ? "text-[#8C57FF] dark:text-[#8C57FF]"
                    : "text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] hover:text-[#374151] dark:hover:text-[rgba(231,227,252,0.9)]"
                }`}
              >
                Waitlist
                {activeTab === "waitlist" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C57FF]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "allocations" && (
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
              {/* Search and Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  <input
                    type="text"
                    placeholder="Search by name or student ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[120px]"
                  >
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade === "All" ? "All Grades" : `Grade ${grade}`}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === "All" ? "All Statuses" : status}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
                </div>

                <button className="px-3 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Filter size={16} />
                  More Filters
                </button>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Current Room
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:bg-[#F9FAFB] dark:hover:bg-[#3D3759] transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {student.name}
                              </p>
                              <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                {student.studentId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            Grade {student.grade}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {student.currentRoom ? (
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                              <span className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {student.currentRoom}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[student.status]}`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{student.contact}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {student.status !== "Allocated" && (
                              <button
                                onClick={() => handleAllocateRoom(student)}
                                className="p-1.5 rounded-md text-primary hover:bg-primary-light transition-colors"
                                title="Allocate Room"
                              >
                                <UserPlus size={16} />
                              </button>
                            )}
                            {student.status === "Allocated" && (
                              <button
                                className="p-1.5 rounded-md text-warning hover:bg-warning-light transition-colors"
                                title="Change Room"
                              >
                                <Edit size={16} />
                              </button>
                            )}
                            <button
                              className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            {student.status === "Allocated" && (
                              <button
                                className="p-1.5 rounded-md text-error hover:bg-error-light transition-colors"
                                title="Remove Allocation"
                              >
                                <UserMinus size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span>{" "}
                  of <span className="font-medium">{filteredStudents.length}</span> students
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    const pageNumber = i + 1
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`min-w-[32px] h-8 px-3 text-sm font-medium rounded-md ${
                          currentPage === pageNumber
                            ? "bg-[#8C57FF] text-white"
                            : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759]"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {allocationRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            {request.studentName}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[request.priority]}`}
                          >
                            {request.priority} Priority
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Student ID</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{request.studentId}</p>
                          </div>
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Request Date</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          {request.preferredBlock && (
                            <div>
                              <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Preferred Block</p>
                              <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                Block {request.preferredBlock}
                              </p>
                            </div>
                          )}
                          {request.preferredRoommate && (
                            <div>
                              <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Preferred Roommate</p>
                              <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {request.preferredRoommate}
                              </p>
                            </div>
                          )}
                        </div>
                        {request.specialRequirements && (
                          <div className="mt-3">
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-sm">
                              Special Requirements
                            </p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)] text-sm">
                              {request.specialRequirements}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-success hover:bg-success/90 rounded-md transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-error hover:bg-error/90 rounded-md transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "waitlist" && (
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {waitlistStudents.map((student) => (
                  <div
                    key={student.id}
                    className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center">
                          <User className="w-5 h-5 text-info" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            {student.name}
                          </h3>
                          <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            {student.studentId}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-info text-white">Waitlist</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Grade</span>
                        <span className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{student.grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Contact</span>
                        <span className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{student.contact}</span>
                      </div>
                      {student.preferences && student.preferences.length > 0 && (
                        <div>
                          <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-1">Preferences</p>
                          <div className="flex flex-wrap gap-1">
                            {student.preferences.map((pref, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-0.5 bg-[#E5E7EB] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)] rounded-full"
                              >
                                {pref}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleAllocateRoom(student)}
                        className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
                      >
                        Allocate Now
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-white dark:bg-[#312D4B] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allocation Modal */}
          {showAllocationModal && selectedStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#2E263D] dark:text-white">Allocate Room</h2>
                    <button
                      onClick={() => {
                        setShowAllocationModal(false)
                        setSelectedStudent(null)
                        setSelectedRoom(null)
                      }}
                      className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Student Info */}
                  <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-3">
                      Student Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Name</p>
                        <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                          {selectedStudent.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Student ID</p>
                        <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                          {selectedStudent.studentId}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Grade</p>
                        <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                          {selectedStudent.grade}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Gender</p>
                        <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                          {selectedStudent.gender}
                        </p>
                      </div>
                    </div>
                    {selectedStudent.preferences && selectedStudent.preferences.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-sm mb-1">Preferences</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.preferences.map((pref, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-[#E5E7EB] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)] rounded-full"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Available Rooms */}
                  <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-3">Available Rooms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableRooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => handleRoomSelection(room)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedRoom?.id === room.id
                            ? "border-[#8C57FF] bg-[#8C57FF]/5 dark:bg-[#8C57FF]/10"
                            : "border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] hover:border-[#8C57FF]/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Home className="w-5 h-5 text-primary" />
                            <h4 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              Room {room.roomNumber}
                            </h4>
                          </div>
                          {selectedRoom?.id === room.id && (
                            <div className="w-5 h-5 rounded-full bg-[#8C57FF] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Block</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{room.block}</p>
                          </div>
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Floor</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{room.floor}</p>
                          </div>
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Type</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{room.type}</p>
                          </div>
                          <div>
                            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Available</p>
                            <p className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              {room.capacity - room.occupied} beds
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-sm mb-1">
                            Available Beds
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {room.availableBeds.map((bed, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-0.5 bg-[#E5E7EB] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)] rounded"
                              >
                                {bed}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowAllocationModal(false)
                        setSelectedStudent(null)
                        setSelectedRoom(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-white dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAllocation}
                      disabled={!selectedRoom}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Allocation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Allocation Modal */}
          <Dialog open={showNewAllocationModal} onOpenChange={setShowNewAllocationModal}>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#312D4B]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#2E263D] dark:text-white">
                  New Student Allocation
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Student ID
                    </Label>
                    <Input
                      id="studentId"
                      name="studentId"
                      value={newAllocation.studentId}
                      onChange={handleInputChange}
                      placeholder="Enter student ID"
                      className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Student Name
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={newAllocation.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter student name"
                      className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Grade
                    </Label>
                    <Select value={newAllocation.grade} onValueChange={(value) => handleSelectChange("grade", value)}>
                      <SelectTrigger className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades
                          .filter((g) => g !== "All")
                          .map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Gender
                    </Label>
                    <Select value={newAllocation.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Contact Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={newAllocation.contact}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentContact" className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Parent Contact
                    </Label>
                    <Input
                      id="parentContact"
                      name="parentContact"
                      value={newAllocation.parentContact}
                      onChange={handleInputChange}
                      placeholder="Enter parent contact"
                      className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    Allocation Preferences
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="preferredBlock"
                        className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]"
                      >
                        Preferred Block
                      </Label>
                      <Select
                        value={newAllocation.preferredBlock}
                        onValueChange={(value) => handleSelectChange("preferredBlock", value)}
                      >
                        <SelectTrigger className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                          <SelectValue placeholder="Select block" />
                        </SelectTrigger>
                        <SelectContent>
                          {blocks.map((block) => (
                            <SelectItem key={block} value={block}>
                              Block {block}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="preferredRoommate"
                        className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]"
                      >
                        Preferred Roommate (ID)
                      </Label>
                      <Input
                        id="preferredRoommate"
                        name="preferredRoommate"
                        value={newAllocation.preferredRoommate}
                        onChange={handleInputChange}
                        placeholder="Enter roommate ID (optional)"
                        className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="specialRequirements"
                    className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]"
                  >
                    Special Requirements
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={newAllocation.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Enter any special requirements or accommodation needs"
                    className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="medicalConditions"
                    className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]"
                  >
                    Medical Conditions
                  </Label>
                  <Textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={newAllocation.medicalConditions}
                    onChange={handleInputChange}
                    placeholder="Enter any medical conditions (if applicable)"
                    className="bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Priority</Label>
                  <RadioGroup
                    value={newAllocation.priority}
                    onValueChange={(value) => handleSelectChange("priority", value)}
                    className="flex space-x-4"
                  >
                    {priorities.map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <RadioGroupItem value={priority} id={`priority-${priority.toLowerCase()}`} />
                        <Label
                          htmlFor={`priority-${priority.toLowerCase()}`}
                          className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                        >
                          {priority}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <DialogFooter>
                <button
                  onClick={() => setShowNewAllocationModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-white dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewAllocationSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors"
                >
                  Create Allocation
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
