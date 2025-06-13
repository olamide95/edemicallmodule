"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  Home,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { Checkbox } from "@/components/ui/checkbox"

interface Room {
  id: string
  roomNumber: string
  block: string
  floor: string
  type: string
  capacity: number
  occupied: number
  status: "Available" | "Full" | "Maintenance" | "Reserved"
  amenities: string[]
  lastCleaned: string
}

export default function RoomManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBlock, setSelectedBlock] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    block: "A",
    floor: "1",
    type: "Standard",
    capacity: 4,
    amenities: [],
  })

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock room data
  const rooms: Room[] = [
    {
      id: "1",
      roomNumber: "A-101",
      block: "A",
      floor: "1",
      type: "Standard",
      capacity: 4,
      occupied: 3,
      status: "Available",
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table"],
      lastCleaned: "2024-05-20",
    },
    {
      id: "2",
      roomNumber: "A-102",
      block: "A",
      floor: "1",
      type: "Standard",
      capacity: 4,
      occupied: 4,
      status: "Full",
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table"],
      lastCleaned: "2024-05-20",
    },
    {
      id: "3",
      roomNumber: "A-103",
      block: "A",
      floor: "1",
      type: "Deluxe",
      capacity: 2,
      occupied: 2,
      status: "Full",
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table", "AC"],
      lastCleaned: "2024-05-19",
    },
    {
      id: "4",
      roomNumber: "B-201",
      block: "B",
      floor: "2",
      type: "Standard",
      capacity: 4,
      occupied: 0,
      status: "Maintenance",
      amenities: ["Wi-Fi", "Shared Bathroom", "Study Table"],
      lastCleaned: "2024-05-15",
    },
    {
      id: "5",
      roomNumber: "B-202",
      block: "B",
      floor: "2",
      type: "Standard",
      capacity: 4,
      occupied: 2,
      status: "Available",
      amenities: ["Wi-Fi", "Shared Bathroom", "Study Table"],
      lastCleaned: "2024-05-18",
    },
    {
      id: "6",
      roomNumber: "B-203",
      block: "B",
      floor: "2",
      type: "Deluxe",
      capacity: 2,
      occupied: 0,
      status: "Reserved",
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table", "AC"],
      lastCleaned: "2024-05-20",
    },
    {
      id: "7",
      roomNumber: "C-301",
      block: "C",
      floor: "3",
      type: "Standard",
      capacity: 4,
      occupied: 3,
      status: "Available",
      amenities: ["Wi-Fi", "Shared Bathroom", "Study Table"],
      lastCleaned: "2024-05-19",
    },
    {
      id: "8",
      roomNumber: "C-302",
      block: "C",
      floor: "3",
      type: "Deluxe",
      capacity: 2,
      occupied: 1,
      status: "Available",
      amenities: ["Wi-Fi", "Attached Bathroom", "Study Table", "AC"],
      lastCleaned: "2024-05-20",
    },
  ]

  const blocks = ["All", "A", "B", "C", "D"]
  const statuses = ["All", "Available", "Full", "Maintenance", "Reserved"]

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBlock = selectedBlock === "All" || room.block === selectedBlock
    const matchesStatus = selectedStatus === "All" || room.status === selectedStatus

    return matchesSearch && matchesBlock && matchesStatus
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)
  const currentRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
    Available: "bg-success text-white",
    Full: "bg-warning text-white",
    Maintenance: "bg-error text-white",
    Reserved: "bg-info text-white",
  }

  const handleAddRoom = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to add the room
    console.log("Adding new room:", newRoom)

    // Add the new room to the local state for immediate UI update
    const newRoomWithId = {
      ...newRoom,
      id: (rooms.length + 1).toString(),
      occupied: 0,
      status: "Available",
      lastCleaned: new Date().toISOString().split("T")[0],
      amenities: newRoom.amenities,
    }

    // In a real app, you would update state after API success
    // For now, we'll just close the modal
    setIsAddRoomModalOpen(false)

    // Reset the form
    setNewRoom({
      roomNumber: "",
      block: "A",
      floor: "1",
      type: "Standard",
      capacity: 4,
      amenities: [],
    })
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Room Management Header */}
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Room Management</h1>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  Import
                </button>
                <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={() => setIsAddRoomModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add New Room
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                <input
                  type="text"
                  placeholder="Search by room number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[120px]"
                >
                  {blocks.map((block) => (
                    <option key={block} value={block}>
                      {block === "All" ? "All Blocks" : `Block ${block}`}
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

            {/* Room Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {currentRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white dark:bg-[#28243D] rounded-lg shadow-sm border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-light rounded-md">
                        <Home className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          Room {room.roomNumber}
                        </h3>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          Block {room.block}, Floor {room.floor}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[room.status]}`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Room Type</p>
                        <p className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{room.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Capacity</p>
                        <p className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {room.occupied}/{room.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Last Cleaned</p>
                        <p className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {new Date(room.lastCleaned).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Occupancy</p>
                        <div className="w-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] rounded-full h-2 mt-1.5">
                          <div
                            className={`h-2 rounded-full ${
                              room.occupied === room.capacity
                                ? "bg-warning"
                                : room.occupied === 0
                                  ? "bg-error"
                                  : "bg-success"
                            }`}
                            style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-1">Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 bg-[#F3F4F6] dark:bg-[#3D3759] text-[#374151] dark:text-[rgba(231,227,252,0.9)] rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                        View Details
                      </button>
                      <div className="flex items-center space-x-1">
                        <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredRooms.length)}</span> of{" "}
                <span className="font-medium">{filteredRooms.length}</span> rooms
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevPage}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Room Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Occupancy by Block */}
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#2E263D] dark:text-white mb-4">Occupancy by Block</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Block A
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">85%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Block B
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">65%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Block C
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">92%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Block D
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">78%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.1)] rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Status Overview */}
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#2E263D] dark:text-white mb-4">Room Status Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-success-light rounded-md">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Available</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">124</p>
                  <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">50% of total rooms</p>
                </div>
                <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-warning-light rounded-md">
                      <AlertCircle className="w-5 h-5 text-warning" />
                    </div>
                    <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Full</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">86</p>
                  <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">35% of total rooms</p>
                </div>
                <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-error-light rounded-md">
                      <XCircle className="w-5 h-5 text-error" />
                    </div>
                    <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Maintenance</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">18</p>
                  <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">7% of total rooms</p>
                </div>
                <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-info-light rounded-md">
                      <Home className="w-5 h-5 text-info" />
                    </div>
                    <h3 className="font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Reserved</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">20</p>
                  <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">8% of total rooms</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Add Room Modal */}
      <Dialog open={isAddRoomModalOpen} onOpenChange={setIsAddRoomModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#312D4B]">
          <DialogHeader>
            <DialogTitle className="text-[#2E263D] dark:text-white">Add New Room</DialogTitle>
            <DialogDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              Fill in the details to add a new room to the hostel.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddRoom}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Room Number
                  </Label>
                  <Input
                    id="roomNumber"
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                    placeholder="e.g., A-101"
                    className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="block" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Block
                  </Label>
                  <select
                    id="block"
                    value={newRoom.block}
                    onChange={(e) => setNewRoom({ ...newRoom, block: e.target.value })}
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    required
                  >
                    <option value="A">Block A</option>
                    <option value="B">Block B</option>
                    <option value="C">Block C</option>
                    <option value="D">Block D</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floor" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Floor
                  </Label>
                  <select
                    id="floor"
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    required
                  >
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3">3rd Floor</option>
                    <option value="4">4th Floor</option>
                    <option value="5">5th Floor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Room Type
                  </Label>
                  <select
                    id="type"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    className="w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    required
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  max="10"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: Number.parseInt(e.target.value) })}
                  className="bg-[#F9FAFB] dark:bg-[#28243D] border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Amenities</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={newRoom.amenities.includes("Wi-Fi")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRoom({ ...newRoom, amenities: [...newRoom.amenities, "Wi-Fi"] })
                        } else {
                          setNewRoom({ ...newRoom, amenities: newRoom.amenities.filter((a) => a !== "Wi-Fi") })
                        }
                      }}
                    />
                    <label
                      htmlFor="wifi"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                    >
                      Wi-Fi
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="attached-bathroom"
                      checked={newRoom.amenities.includes("Attached Bathroom")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRoom({ ...newRoom, amenities: [...newRoom.amenities, "Attached Bathroom"] })
                        } else {
                          setNewRoom({
                            ...newRoom,
                            amenities: newRoom.amenities.filter((a) => a !== "Attached Bathroom"),
                          })
                        }
                      }}
                    />
                    <label
                      htmlFor="attached-bathroom"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                    >
                      Attached Bathroom
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="study-table"
                      checked={newRoom.amenities.includes("Study Table")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRoom({ ...newRoom, amenities: [...newRoom.amenities, "Study Table"] })
                        } else {
                          setNewRoom({ ...newRoom, amenities: newRoom.amenities.filter((a) => a !== "Study Table") })
                        }
                      }}
                    />
                    <label
                      htmlFor="study-table"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                    >
                      Study Table
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ac"
                      checked={newRoom.amenities.includes("AC")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRoom({ ...newRoom, amenities: [...newRoom.amenities, "AC"] })
                        } else {
                          setNewRoom({ ...newRoom, amenities: newRoom.amenities.filter((a) => a !== "AC") })
                        }
                      }}
                    />
                    <label
                      htmlFor="ac"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
                    >
                      AC
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsAddRoomModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors"
              >
                Add Room
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
