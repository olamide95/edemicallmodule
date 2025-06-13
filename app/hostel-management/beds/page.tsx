"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  User,
  BedIcon,
  RefreshCw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// Types
interface Bed {
  id: string
  bedNumber: string
  roomId: string
  roomNumber: string
  block: string
  floor: string
  status: "Occupied" | "Vacant" | "Maintenance" | "Reserved"
  studentId?: string
  studentName?: string
  grade?: string
  checkInDate?: string
  checkOutDate?: string
  lastMaintenance?: string
  notes?: string
}

interface Student {
  id: string
  name: string
  grade: string
  gender: "Male" | "Female"
  contactNumber: string
  parentName: string
  parentContact: string
  address: string
  photo?: string
}

interface Room {
  id: string
  roomNumber: string
  block: string
  floor: string
  capacity: number
  occupied: number
}

export default function BedManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBlock, setSelectedBlock] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [selectedFloor, setSelectedFloor] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all-beds")
  const [isAddBedModalOpen, setIsAddBedModalOpen] = useState(false)
  const [isAssignStudentModalOpen, setIsAssignStudentModalOpen] = useState(false)
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false)
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null)
  const [newBed, setNewBed] = useState({
    bedNumber: "",
    roomId: "",
    status: "Vacant",
  })
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    reason: "",
    estimatedCompletionDate: "",
    notes: "",
  })

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock data for beds
  const beds: Bed[] = [
    {
      id: "1",
      bedNumber: "B1",
      roomId: "1",
      roomNumber: "A-101",
      block: "A",
      floor: "1",
      status: "Occupied",
      studentId: "ST001",
      studentName: "John Smith",
      grade: "Grade 10",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-10",
      notes: "Allergic to dust",
    },
    {
      id: "2",
      bedNumber: "B2",
      roomId: "1",
      roomNumber: "A-101",
      block: "A",
      floor: "1",
      status: "Occupied",
      studentId: "ST002",
      studentName: "Michael Johnson",
      grade: "Grade 10",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-10",
    },
    {
      id: "3",
      bedNumber: "B3",
      roomId: "1",
      roomNumber: "A-101",
      block: "A",
      floor: "1",
      status: "Vacant",
      lastMaintenance: "2024-01-10",
    },
    {
      id: "4",
      bedNumber: "B4",
      roomId: "1",
      roomNumber: "A-101",
      block: "A",
      floor: "1",
      status: "Maintenance",
      lastMaintenance: "2024-03-15",
      notes: "Bed frame needs repair",
    },
    {
      id: "5",
      bedNumber: "B1",
      roomId: "2",
      roomNumber: "A-102",
      block: "A",
      floor: "1",
      status: "Occupied",
      studentId: "ST003",
      studentName: "Emily Davis",
      grade: "Grade 11",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-05",
    },
    {
      id: "6",
      bedNumber: "B2",
      roomId: "2",
      roomNumber: "A-102",
      block: "A",
      floor: "1",
      status: "Reserved",
      lastMaintenance: "2024-01-05",
      notes: "Reserved for new student arriving on 2024-06-01",
    },
    {
      id: "7",
      bedNumber: "B1",
      roomId: "3",
      roomNumber: "B-201",
      block: "B",
      floor: "2",
      status: "Occupied",
      studentId: "ST004",
      studentName: "David Wilson",
      grade: "Grade 9",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-08",
    },
    {
      id: "8",
      bedNumber: "B2",
      roomId: "3",
      roomNumber: "B-201",
      block: "B",
      floor: "2",
      status: "Vacant",
      lastMaintenance: "2024-01-08",
    },
    {
      id: "9",
      bedNumber: "B1",
      roomId: "4",
      roomNumber: "C-301",
      block: "C",
      floor: "3",
      status: "Occupied",
      studentId: "ST005",
      studentName: "Sophia Martinez",
      grade: "Grade 12",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-12",
    },
    {
      id: "10",
      bedNumber: "B2",
      roomId: "4",
      roomNumber: "C-301",
      block: "C",
      floor: "3",
      status: "Maintenance",
      lastMaintenance: "2024-04-02",
      notes: "Mattress replacement needed",
    },
    {
      id: "11",
      bedNumber: "B1",
      roomId: "5",
      roomNumber: "D-401",
      block: "D",
      floor: "4",
      status: "Occupied",
      studentId: "ST006",
      studentName: "James Brown",
      grade: "Grade 11",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-05-30",
      lastMaintenance: "2024-01-07",
    },
    {
      id: "12",
      bedNumber: "B2",
      roomId: "5",
      roomNumber: "D-401",
      block: "D",
      floor: "4",
      status: "Vacant",
      lastMaintenance: "2024-01-07",
    },
  ]

  // Mock data for students (for assignment)
  const students: Student[] = [
    {
      id: "ST007",
      name: "Oliver Taylor",
      grade: "Grade 10",
      gender: "Male",
      contactNumber: "123-456-7890",
      parentName: "Robert Taylor",
      parentContact: "123-456-7891",
      address: "123 Main St, Anytown",
    },
    {
      id: "ST008",
      name: "Emma Wilson",
      grade: "Grade 11",
      gender: "Female",
      contactNumber: "123-456-7892",
      parentName: "Sarah Wilson",
      parentContact: "123-456-7893",
      address: "456 Oak Ave, Anytown",
    },
    {
      id: "ST009",
      name: "Noah Garcia",
      grade: "Grade 9",
      gender: "Male",
      contactNumber: "123-456-7894",
      parentName: "Maria Garcia",
      parentContact: "123-456-7895",
      address: "789 Pine St, Anytown",
    },
    {
      id: "ST010",
      name: "Ava Martinez",
      grade: "Grade 12",
      gender: "Female",
      contactNumber: "123-456-7896",
      parentName: "Carlos Martinez",
      parentContact: "123-456-7897",
      address: "101 Elm St, Anytown",
    },
  ]

  // Mock data for rooms (for adding new beds)
  const rooms: Room[] = [
    { id: "1", roomNumber: "A-101", block: "A", floor: "1", capacity: 4, occupied: 3 },
    { id: "2", roomNumber: "A-102", block: "A", floor: "1", capacity: 4, occupied: 2 },
    { id: "3", roomNumber: "B-201", block: "B", floor: "2", capacity: 4, occupied: 2 },
    { id: "4", roomNumber: "C-301", block: "C", floor: "3", capacity: 4, occupied: 2 },
    { id: "5", roomNumber: "D-401", block: "D", floor: "4", capacity: 4, occupied: 2 },
  ]

  const blocks = ["All", "A", "B", "C", "D"]
  const floors = ["All", "1", "2", "3", "4"]
  const statuses = ["All", "Occupied", "Vacant", "Maintenance", "Reserved"]

  // Filter beds based on search query, block, floor, and status
  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.studentName && bed.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (bed.studentId && bed.studentId.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesBlock = selectedBlock === "All" || bed.block === selectedBlock
    const matchesFloor = selectedFloor === "All" || bed.floor === selectedFloor
    const matchesStatus = selectedStatus === "All" || bed.status === selectedStatus

    // Filter based on active tab
    if (activeTab === "occupied") return bed.status === "Occupied" && matchesSearch && matchesBlock && matchesFloor
    if (activeTab === "vacant") return bed.status === "Vacant" && matchesSearch && matchesBlock && matchesFloor
    if (activeTab === "maintenance")
      return bed.status === "Maintenance" && matchesSearch && matchesBlock && matchesFloor
    if (activeTab === "reserved") return bed.status === "Reserved" && matchesSearch && matchesBlock && matchesFloor

    return matchesSearch && matchesBlock && matchesFloor && matchesStatus
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredBeds.length / itemsPerPage)
  const currentBeds = filteredBeds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const statusColors = {
    Occupied: "bg-success text-white",
    Vacant: "bg-info text-white",
    Maintenance: "bg-error text-white",
    Reserved: "bg-warning text-white",
  }

  const statusIcons = {
    Occupied: <User size={16} />,
    Vacant: <BedIcon size={16} />,
    Maintenance: <RefreshCw size={16} />,
    Reserved: <AlertCircle size={16} />,
  }

  // Calculate bed statistics
  const totalBeds = beds.length
  const occupiedBeds = beds.filter((bed) => bed.status === "Occupied").length
  const vacantBeds = beds.filter((bed) => bed.status === "Vacant").length
  const maintenanceBeds = beds.filter((bed) => bed.status === "Maintenance").length
  const reservedBeds = beds.filter((bed) => bed.status === "Reserved").length

  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100)

  // Handle adding a new bed
  const handleAddBed = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to add the bed
    console.log("Adding new bed:", newBed)

    // Reset the form and close the modal
    setNewBed({
      bedNumber: "",
      roomId: "",
      status: "Vacant",
    })
    setIsAddBedModalOpen(false)
  }

  // Handle assigning a student to a bed
  const handleAssignStudent = (studentId: string) => {
    if (!selectedBed) return

    // Here you would typically make an API call to assign the student
    console.log(`Assigning student ${studentId} to bed ${selectedBed.id}`)

    // Close the modal
    setIsAssignStudentModalOpen(false)
  }

  // Handle setting a bed to maintenance
  const handleSetMaintenance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBed) return

    // Here you would typically make an API call to set the bed to maintenance
    console.log(`Setting bed ${selectedBed.id} to maintenance:`, maintenanceDetails)

    // Reset the form and close the modal
    setMaintenanceDetails({
      reason: "",
      estimatedCompletionDate: "",
      notes: "",
    })
    setIsMaintenanceModalOpen(false)
  }

  // Open assign student modal for a specific bed
  const openAssignStudentModal = (bed: Bed) => {
    setSelectedBed(bed)
    setIsAssignStudentModalOpen(true)
  }

  // Open maintenance modal for a specific bed
  const openMaintenanceModal = (bed: Bed) => {
    setSelectedBed(bed)
    setIsMaintenanceModalOpen(true)
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Bed Management Header */}
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Bed Management</h1>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  <span className="hidden sm:inline">Import</span>
                </button>
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  onClick={() => setIsAddBedModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Add New Bed</span>
                </button>
              </div>
            </div>

            {/* Bed Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Total Beds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{totalBeds}</div>
                  <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    Across {rooms.length} rooms
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Occupied</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{occupiedBeds}</div>
                  <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    {occupancyRate}% occupancy rate
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Vacant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-info">{vacantBeds}</div>
                  <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    {Math.round((vacantBeds / totalBeds) * 100)}% vacancy rate
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-error">{maintenanceBeds}</div>
                  <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    {Math.round((maintenanceBeds / totalBeds) * 100)}% under maintenance
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Reserved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{reservedBeds}</div>
                  <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    {Math.round((reservedBeds / totalBeds) * 100)}% reserved
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs and Filters */}
            <div className="mb-6">
              <Tabs defaultValue="all-beds" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <TabsList className="bg-[#F3F4F6] dark:bg-[#28243D]">
                    <TabsTrigger
                      value="all-beds"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#312D4B]"
                    >
                      All Beds
                    </TabsTrigger>
                    <TabsTrigger
                      value="occupied"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#312D4B]"
                    >
                      Occupied
                    </TabsTrigger>
                    <TabsTrigger
                      value="vacant"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#312D4B]"
                    >
                      Vacant
                    </TabsTrigger>
                    <TabsTrigger
                      value="maintenance"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#312D4B]"
                    >
                      Maintenance
                    </TabsTrigger>
                    <TabsTrigger
                      value="reserved"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#312D4B]"
                    >
                      Reserved
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-grow max-w-xs">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                      <input
                        type="text"
                        placeholder="Search beds or students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                      />
                    </div>

                    <Select value={selectedBlock} onValueChange={setSelectedBlock}>
                      <SelectTrigger className="w-[100px] bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                        <SelectValue placeholder="Block" />
                      </SelectTrigger>
                      <SelectContent>
                        {blocks.map((block) => (
                          <SelectItem key={block} value={block}>
                            {block === "All" ? "All Blocks" : `Block ${block}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                      <SelectTrigger className="w-[100px] bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                        <SelectValue placeholder="Floor" />
                      </SelectTrigger>
                      <SelectContent>
                        {floors.map((floor) => (
                          <SelectItem key={floor} value={floor}>
                            {floor === "All" ? "All Floors" : `Floor ${floor}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <button className="p-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>

                <TabsContent value="all-beds" className="mt-0">
                  {/* Bed List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentBeds.map((bed) => (
                      <Card
                        key={bed.id}
                        className="bg-white dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              Bed {bed.bedNumber}
                            </CardTitle>
                            <CardDescription>Room {bed.roomNumber}</CardDescription>
                          </div>
                          <Badge className={`${statusColors[bed.status]} flex items-center gap-1`}>
                            {statusIcons[bed.status]}
                            {bed.status}
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Block</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.block}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Floor</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.floor}
                              </span>
                            </div>
                            {bed.status === "Occupied" && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                    Student
                                  </span>
                                  <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                    {bed.studentName}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                    Grade
                                  </span>
                                  <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                    {bed.grade}
                                  </span>
                                </div>
                              </>
                            )}
                            {bed.status === "Maintenance" && (
                              <div className="flex justify-between">
                                <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                  Last Maintenance
                                </span>
                                <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                  {new Date(bed.lastMaintenance || "").toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {bed.notes && (
                              <div className="pt-1">
                                <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Notes</span>
                                <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1 line-clamp-2">
                                  {bed.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                          >
                            View Details
                          </Button>
                          <div className="flex items-center space-x-1">
                            {bed.status === "Vacant" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-success"
                                onClick={() => openAssignStudentModal(bed)}
                              >
                                <User size={16} />
                              </Button>
                            )}
                            {bed.status !== "Maintenance" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-warning"
                                onClick={() => openMaintenanceModal(bed)}
                              >
                                <RefreshCw size={16} />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-error">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {/* Empty state */}
                  {currentBeds.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <BedIcon className="h-12 w-12 text-[#D1D5DB] dark:text-[rgba(231,227,252,0.3)] mb-4" />
                      <h3 className="text-lg font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                        No beds found
                      </h3>
                      <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-center max-w-md">
                        No beds match your current filters. Try adjusting your search or filters to find what you're
                        looking for.
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredBeds.length > 0 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBeds.length)}</span>{" "}
                        of <span className="font-medium">{filteredBeds.length}</span> beds
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="h-8 w-8 bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                          const pageNumber = i + 1
                          return (
                            <Button
                              key={i}
                              variant={currentPage === pageNumber ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNumber)}
                              className={
                                currentPage === pageNumber
                                  ? "bg-[#8C57FF] hover:bg-[#7C3AED]"
                                  : "bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                              }
                            >
                              {pageNumber}
                            </Button>
                          )
                        })}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="occupied" className="mt-0">
                  {/* Same layout as all-beds tab but with filtered data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentBeds.map((bed) => (
                      <Card
                        key={bed.id}
                        className="bg-white dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow"
                      >
                        {/* Same card content as in all-beds tab */}
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              Bed {bed.bedNumber}
                            </CardTitle>
                            <CardDescription>Room {bed.roomNumber}</CardDescription>
                          </div>
                          <Badge className="bg-success text-white flex items-center gap-1">
                            <User size={16} />
                            Occupied
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Block</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.block}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Floor</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.floor}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Student</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.studentName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Grade</span>
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {bed.grade}
                              </span>
                            </div>
                            {bed.notes && (
                              <div className="pt-1">
                                <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Notes</span>
                                <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1 line-clamp-2">
                                  {bed.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                          >
                            View Details
                          </Button>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-warning"
                              onClick={() => openMaintenanceModal(bed)}
                            >
                              <RefreshCw size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-error">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {/* Empty state and pagination (same as all-beds tab) */}
                  {currentBeds.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <User className="h-12 w-12 text-[#D1D5DB] dark:text-[rgba(231,227,252,0.3)] mb-4" />
                      <h3 className="text-lg font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-1">
                        No occupied beds found
                      </h3>
                      <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] text-center max-w-md">
                        No occupied beds match your current filters. Try adjusting your search or filters.
                      </p>
                    </div>
                  )}

                  {/* Pagination (same as all-beds tab) */}
                  {filteredBeds.length > 0 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBeds.length)}</span>{" "}
                        of <span className="font-medium">{filteredBeds.length}</span> beds
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="h-8 w-8 bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                          const pageNumber = i + 1
                          return (
                            <Button
                              key={i}
                              variant={currentPage === pageNumber ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNumber)}
                              className={
                                currentPage === pageNumber
                                  ? "bg-[#8C57FF] hover:bg-[#7C3AED]"
                                  : "bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                              }
                            >
                              {pageNumber}
                            </Button>
                          )
                        })}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Similar content for other tabs (vacant, maintenance, reserved) */}
                <TabsContent value="vacant" className="mt-0">
                  {/* Similar layout as occupied tab but for vacant beds */}
                </TabsContent>

                <TabsContent value="maintenance" className="mt-0">
                  {/* Similar layout as occupied tab but for maintenance beds */}
                </TabsContent>

                <TabsContent value="reserved" className="mt-0">
                  {/* Similar layout as occupied tab but for reserved beds */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Add Bed Modal */}
      <Dialog open={isAddBedModalOpen} onOpenChange={setIsAddBedModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#312D4B]">
          <DialogHeader>
            <DialogTitle className="text-[#2E263D] dark:text-white">Add New Bed</DialogTitle>
            <DialogDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              Fill in the details to add a new bed to a room.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBed}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roomId" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Room
                </Label>
                <Select value={newBed.roomId} onValueChange={(value) => setNewBed({ ...newBed, roomId: value })}>
                  <SelectTrigger
                    id="roomId"
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  >
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.roomNumber} (Block {room.block}, Floor {room.floor})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedNumber" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Bed Number
                </Label>
                <Input
                  id="bedNumber"
                  value={newBed.bedNumber}
                  onChange={(e) => setNewBed({ ...newBed, bedNumber: e.target.value })}
                  placeholder="e.g., B1"
                  className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Status
                </Label>
                <Select value={newBed.status} onValueChange={(value) => setNewBed({ ...newBed, status: value })}>
                  <SelectTrigger
                    id="status"
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vacant">Vacant</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddBedModalOpen(false)}
                className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#8C57FF] hover:bg-[#7C3AED]">
                Add Bed
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Student Modal */}
      <Dialog open={isAssignStudentModalOpen} onOpenChange={setIsAssignStudentModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#312D4B]">
          <DialogHeader>
            <DialogTitle className="text-[#2E263D] dark:text-white">Assign Student to Bed</DialogTitle>
            <DialogDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              {selectedBed && (
                <>
                  Assign a student to Bed {selectedBed.bedNumber} in Room {selectedBed.roomNumber} (Block{" "}
                  {selectedBed.block}, Floor {selectedBed.floor}).
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentSearch" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Search Student
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  <Input
                    id="studentSearch"
                    placeholder="Search by name or ID..."
                    className="pl-10 bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  />
                </div>
              </div>

              <div className="border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md divide-y divide-[#E5E7EB] dark:divide-[rgba(255,255,255,0.1)] max-h-[300px] overflow-y-auto">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="p-3 flex items-center justify-between hover:bg-[#F9FAFB] dark:hover:bg-[#28243D] cursor-pointer"
                    onClick={() => handleAssignStudent(student.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{student.name}</p>
                        <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          {student.id} • {student.grade}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#8C57FF] hover:bg-[#7C3AED]"
                      onClick={() => handleAssignStudent(student.id)}
                    >
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignStudentModalOpen(false)}
              className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Modal */}
      <Dialog open={isMaintenanceModalOpen} onOpenChange={setIsMaintenanceModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#312D4B]">
          <DialogHeader>
            <DialogTitle className="text-[#2E263D] dark:text-white">Set Bed to Maintenance</DialogTitle>
            <DialogDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              {selectedBed && (
                <>
                  Set Bed {selectedBed.bedNumber} in Room {selectedBed.roomNumber} (Block {selectedBed.block}, Floor{" "}
                  {selectedBed.floor}) to maintenance.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSetMaintenance}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Reason for Maintenance
                </Label>
                <Select
                  value={maintenanceDetails.reason}
                  onValueChange={(value) => setMaintenanceDetails({ ...maintenanceDetails, reason: value })}
                >
                  <SelectTrigger
                    id="reason"
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  >
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bed Frame Repair">Bed Frame Repair</SelectItem>
                    <SelectItem value="Mattress Replacement">Mattress Replacement</SelectItem>
                    <SelectItem value="Regular Maintenance">Regular Maintenance</SelectItem>
                    <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedCompletionDate" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Estimated Completion Date
                </Label>
                <Input
                  id="estimatedCompletionDate"
                  type="date"
                  value={maintenanceDetails.estimatedCompletionDate}
                  onChange={(e) =>
                    setMaintenanceDetails({ ...maintenanceDetails, estimatedCompletionDate: e.target.value })
                  }
                  className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={maintenanceDetails.notes}
                  onChange={(e) => setMaintenanceDetails({ ...maintenanceDetails, notes: e.target.value })}
                  placeholder="Additional details about the maintenance..."
                  className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMaintenanceModalOpen(false)}
                className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#8C57FF] hover:bg-[#7C3AED]">
                Set to Maintenance
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
