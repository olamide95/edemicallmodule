"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  BookOpen,
  ArrowLeft,
  Download,
  Filter,
  Eye,
  Clock,
  RotateCw,
  X,
  Check,
  AlertTriangle,
  Calendar,
  UserIcon,
  BookIcon,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Image from "next/image"

interface CirculationRecord {
  id: string
  bookId: string
  bookTitle: string
  bookCover: string
  memberId: string
  memberName: string
  memberType: "Student" | "Teacher" | "Staff" | "Guest"
  memberPhoto: string
  checkoutDate: string
  dueDate: string
  returnDate: string | null
  status: "Checked Out" | "Returned" | "Overdue" | "Lost" | "Renewed"
  renewalCount: number
  fineAmount: number | null
  notes: string | null
}

export function Circulation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<"all" | "checkouts" | "returns" | "overdue">("all")
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CirculationRecord | null>(null)

  // Mock circulation data
  const circulationRecords: CirculationRecord[] = [
    {
      id: "CR001",
      bookId: "1",
      bookTitle: "To Kill a Mockingbird",
      bookCover: "/placeholder.svg?height=280&width=200&query=To+Kill+a+Mockingbird+book+cover",
      memberId: "ST001",
      memberName: "John Smith",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=young+male+student+avatar",
      checkoutDate: "2023-12-15",
      dueDate: "2024-01-15",
      returnDate: null,
      status: "Checked Out",
      renewalCount: 0,
      fineAmount: null,
      notes: null,
    },
    {
      id: "CR002",
      bookId: "2",
      bookTitle: "1984",
      bookCover: "/placeholder.svg?height=280&width=200&query=1984+George+Orwell+book+cover",
      memberId: "TE001",
      memberName: "Sarah Johnson",
      memberType: "Teacher",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=female+teacher+avatar",
      checkoutDate: "2023-12-05",
      dueDate: "2024-01-05",
      returnDate: null,
      status: "Overdue",
      renewalCount: 1,
      fineAmount: 2.5,
      notes: "Member contacted on 2024-01-10",
    },
    {
      id: "CR003",
      bookId: "3",
      bookTitle: "The Great Gatsby",
      bookCover: "/placeholder.svg?height=280&width=200&query=The+Great+Gatsby+book+cover",
      memberId: "ST002",
      memberName: "Emma Wilson",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=young+female+student+avatar",
      checkoutDate: "2023-11-20",
      dueDate: "2023-12-20",
      returnDate: "2023-12-18",
      status: "Returned",
      renewalCount: 0,
      fineAmount: null,
      notes: "Book returned in good condition",
    },
    {
      id: "CR004",
      bookId: "4",
      bookTitle: "Harry Potter and the Philosopher's Stone",
      bookCover: "/placeholder.svg?height=280&width=200&query=Harry+Potter+Philosopher+Stone+book+cover",
      memberId: "ST003",
      memberName: "Michael Brown",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=young+male+student+avatar",
      checkoutDate: "2023-12-10",
      dueDate: "2024-01-10",
      returnDate: null,
      status: "Checked Out",
      renewalCount: 0,
      fineAmount: null,
      notes: null,
    },
    {
      id: "CR005",
      bookId: "5",
      bookTitle: "Pride and Prejudice",
      bookCover: "/placeholder.svg?height=280&width=200&query=Pride+and+Prejudice+book+cover",
      memberId: "ST004",
      memberName: "Olivia Davis",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=female+student+avatar",
      checkoutDate: "2023-11-15",
      dueDate: "2023-12-15",
      returnDate: null,
      status: "Lost",
      renewalCount: 0,
      fineAmount: 25.0,
      notes: "Member reported book lost on 2024-01-05",
    },
    {
      id: "CR006",
      bookId: "6",
      bookTitle: "The Hobbit",
      bookCover: "/placeholder.svg?height=280&width=200&query=The+Hobbit+book+cover",
      memberId: "ST005",
      memberName: "James Wilson",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=young+male+student+avatar",
      checkoutDate: "2023-12-20",
      dueDate: "2024-01-20",
      returnDate: null,
      status: "Renewed",
      renewalCount: 1,
      fineAmount: null,
      notes: "Renewal approved on 2024-01-19",
    },
    {
      id: "CR007",
      bookId: "8",
      bookTitle: "The Lord of the Rings",
      bookCover: "/placeholder.svg?height=280&width=200&query=Lord+of+the+Rings+book+cover",
      memberId: "TE002",
      memberName: "David Miller",
      memberType: "Teacher",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=male+teacher+avatar",
      checkoutDate: "2023-11-15",
      dueDate: "2023-12-15",
      returnDate: "2023-12-10",
      status: "Returned",
      renewalCount: 0,
      fineAmount: null,
      notes: null,
    },
    {
      id: "CR008",
      bookId: "7",
      bookTitle: "The Catcher in the Rye",
      bookCover: "/placeholder.svg?height=280&width=200&query=Catcher+in+the+Rye+book+cover",
      memberId: "ST006",
      memberName: "Sophia Martinez",
      memberType: "Student",
      memberPhoto: "/placeholder.svg?height=100&width=100&query=female+student+avatar",
      checkoutDate: "2023-12-18",
      dueDate: "2024-01-18",
      returnDate: null,
      status: "Checked Out",
      renewalCount: 0,
      fineAmount: null,
      notes: null,
    },
  ]

  const statusOptions = ["All", "Checked Out", "Returned", "Overdue", "Lost", "Renewed"]
  const statusColors = {
    "Checked Out": "bg-info text-white",
    Returned: "bg-success text-white",
    Overdue: "bg-error text-white",
    Lost: "bg-secondary text-white",
    Renewed: "bg-warning text-white",
  }

  // Filter records based on search, status, and active tab
  const filteredRecords = circulationRecords.filter((record) => {
    const matchesSearch =
      record.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "All" || record.status === selectedStatus

    let matchesTab = true
    if (activeTab === "checkouts") {
      matchesTab = record.status === "Checked Out" || record.status === "Renewed"
    } else if (activeTab === "returns") {
      matchesTab = record.status === "Returned"
    } else if (activeTab === "overdue") {
      matchesTab = record.status === "Overdue"
    }

    return matchesSearch && matchesStatus && matchesTab
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const currentRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const openDetailModal = (record: CirculationRecord) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
  }

  // Calculate statistics
  const totalCheckouts = circulationRecords.filter((r) => r.status === "Checked Out" || r.status === "Renewed").length
  const totalOverdue = circulationRecords.filter((r) => r.status === "Overdue").length
  const totalReturned = circulationRecords.filter((r) => r.status === "Returned").length
  const totalFines = circulationRecords.reduce((sum, record) => sum + (record.fineAmount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Circulation</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Checkout Book
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Active Checkouts</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                  {totalCheckouts}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-info-light flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-info" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Overdue Books</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                  {totalOverdue}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-error-light flex items-center justify-center">
                <Clock className="h-5 w-5 text-error" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Returned Today</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                  {totalReturned}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-success-light flex items-center justify-center">
                <ArrowLeft className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Total Fines</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                  ${totalFines.toFixed(2)}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning-light flex items-center justify-center">
                <div className="text-warning font-bold">$</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setActiveTab("checkouts")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "checkouts"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Checkouts
            </button>
            <button
              onClick={() => setActiveTab("returns")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "returns"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Returns
            </button>
            <button
              onClick={() => setActiveTab("overdue")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "overdue"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Overdue
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
            <input
              type="text"
              placeholder="Search by book, member, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
          </div>

          <button className="px-3 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* Circulation Records */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <BookOpen className="mx-auto h-12 w-12 text-[#E5E7EB] dark:text-[rgba(255,255,255,0.1)]" />
            <h3 className="mt-4 text-lg font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
              No circulation records found
            </h3>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9FAFB] dark:bg-[#28243D] border-t border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Book
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Checkout Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#F3F4F6] dark:border-[rgba(255,255,255,0.05)] hover:bg-[#F9FAFB] dark:hover:bg-[#28243D] transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{record.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-8 mr-3 flex-shrink-0">
                          <Image
                            src={record.bookCover || "/placeholder.svg"}
                            alt={record.bookTitle}
                            width={32}
                            height={40}
                            className="h-full w-auto object-cover rounded"
                          />
                        </div>
                        <div className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                          {record.bookTitle}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 mr-3 flex-shrink-0">
                          <Image
                            src={record.memberPhoto || "/placeholder.svg"}
                            alt={record.memberName}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] font-medium">
                            {record.memberName}
                          </div>
                          <div className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            {record.memberType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      {new Date(record.checkoutDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      {new Date(record.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status as keyof typeof statusColors]}`}
                      >
                        {record.status}
                      </span>
                      {record.fineAmount && (
                        <div className="text-xs text-error mt-1">Fine: ${record.fineAmount.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openDetailModal(record)}
                          className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {(record.status === "Checked Out" || record.status === "Overdue") && (
                          <>
                            <button
                              className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                              title="Renew"
                            >
                              <RotateCw size={16} />
                            </button>
                            <button
                              className="p-1.5 rounded-md text-success hover:bg-success-light transition-colors"
                              title="Return"
                            >
                              <Check size={16} />
                            </button>
                          </>
                        )}
                        {record.status === "Overdue" && (
                          <button
                            className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                            title="Send Reminder"
                          >
                            <AlertTriangle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredRecords.length)}</span> of{" "}
            <span className="font-medium">{filteredRecords.length}</span> records
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

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Checkout Book</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Book Selection */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Book <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <BookIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  <input
                    type="text"
                    placeholder="Search book by title, author, or ISBN..."
                    className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Member Selection */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Member <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  <input
                    type="text"
                    placeholder="Search member by name or ID..."
                    className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                    Checkout Date <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                    Due Date <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                    <input
                      type="date"
                      defaultValue={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]}
                      className="pl-10 pr-4 py-2 w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Add any notes about this checkout..."
                  className="w-full rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] p-3 focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Circulation Record Details
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/5">
                  <div className="bg-[#F9FAFB] dark:bg-[#28243D] p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="h-16 w-12 mr-4">
                        <Image
                          src={selectedRecord.bookCover || "/placeholder.svg"}
                          alt={selectedRecord.bookTitle}
                          width={48}
                          height={64}
                          className="h-full w-auto object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {selectedRecord.bookTitle}
                        </h3>
                        <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          Book ID: {selectedRecord.bookId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 mr-4">
                        <Image
                          src={selectedRecord.memberPhoto || "/placeholder.svg"}
                          alt={selectedRecord.memberName}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-md font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {selectedRecord.memberName}
                        </h3>
                        <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          {selectedRecord.memberType} • ID: {selectedRecord.memberId}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-center py-3 px-4 bg-[#F3F4F6] dark:bg-[#3D3759] rounded-md mb-4">
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Status</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${statusColors[selectedRecord.status as keyof typeof statusColors]}`}
                        >
                          {selectedRecord.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Renewals</p>
                        <p className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                          {selectedRecord.renewalCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Fine</p>
                        <p className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                          {selectedRecord.fineAmount ? `$${selectedRecord.fineAmount.toFixed(2)}` : "-"}
                        </p>
                      </div>
                    </div>
                    {selectedRecord.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-1">
                          Notes
                        </h4>
                        <p className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] p-3 bg-[#F3F4F6] dark:bg-[#3D3759] rounded-md">
                          {selectedRecord.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-3/5">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">
                      Circulation Timeline
                    </h3>
                    <div className="relative pl-8 pb-8 border-l-2 border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                      <div className="absolute -left-2 mt-1.5">
                        <div className="h-4 w-4 rounded-full bg-info"></div>
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        Checked Out
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        {new Date(selectedRecord.checkoutDate).toLocaleDateString()} at{" "}
                        {new Date(selectedRecord.checkoutDate).toLocaleTimeString()}
                      </div>
                    </div>

                    {selectedRecord.renewalCount > 0 && (
                      <div className="relative pl-8 pb-8 border-l-2 border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                        <div className="absolute -left-2 mt-1.5">
                          <div className="h-4 w-4 rounded-full bg-warning"></div>
                        </div>
                        <div className="mb-1 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          Renewed
                        </div>
                        <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          {/* Assuming renewal date is a few days before due date */}
                          {new Date(
                            new Date(selectedRecord.dueDate).setDate(new Date(selectedRecord.dueDate).getDate() - 2),
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    <div className="relative pl-8 pb-8 border-l-2 border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                      <div className="absolute -left-2 mt-1.5">
                        <div className="h-4 w-4 rounded-full bg-primary"></div>
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        Due Date
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        {new Date(selectedRecord.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    {selectedRecord.returnDate && (
                      <div className="relative pl-8">
                        <div className="absolute -left-2 mt-1.5">
                          <div className="h-4 w-4 rounded-full bg-success"></div>
                        </div>
                        <div className="mb-1 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          Returned
                        </div>
                        <div className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          {new Date(selectedRecord.returnDate).toLocaleDateString()} at{" "}
                          {new Date(selectedRecord.returnDate).toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">Actions</h3>
                    <div className="space-y-3">
                      {(selectedRecord.status === "Checked Out" || selectedRecord.status === "Overdue") && (
                        <>
                          <button className="w-full flex items-center justify-between px-4 py-3 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                            <div className="flex items-center">
                              <Check className="h-5 w-5 text-success mr-3" />
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                Return Book
                              </span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                          </button>
                          <button className="w-full flex items-center justify-between px-4 py-3 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                            <div className="flex items-center">
                              <RotateCw className="h-5 w-5 text-warning mr-3" />
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                Renew Book
                              </span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                          </button>
                        </>
                      )}
                      {selectedRecord.status === "Overdue" && (
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-error mr-3" />
                            <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              Send Reminder
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                        </button>
                      )}
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                        <div className="flex items-center">
                          <Eye className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mr-3" />
                          <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            View Member History
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                        <div className="flex items-center">
                          <Download className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mr-3" />
                          <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            Export Record
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
