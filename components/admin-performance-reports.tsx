"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontalIcon, SearchIcon, FilterIcon, EyeIcon, CheckIcon, XIcon, FileTextIcon } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"

// Mock data for performance reports
const mockPerformanceReports = [
  {
    id: 1,
    student: "John Doe",
    class: "JSS 3",
    club: "Chess Club",
    term: "1st Term",
    submittedBy: "Chess Masters Inc.",
    submissionDate: "2023-11-15",
    status: "pending",
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "SSS 1",
    club: "Debate Club",
    term: "1st Term",
    submittedBy: "Jane Wilson (Staff)",
    submissionDate: "2023-11-14",
    status: "approved",
  },
  {
    id: 3,
    student: "Michael Johnson",
    class: "JSS 2",
    club: "Science Club",
    term: "1st Term",
    submittedBy: "Science Explorers Ltd.",
    submissionDate: "2023-11-12",
    status: "pending",
  },
  {
    id: 4,
    student: "Sarah Williams",
    class: "SSS 2",
    club: "Art Club",
    term: "1st Term",
    submittedBy: "Art Studio Academy",
    submissionDate: "2023-11-10",
    status: "rejected",
  },
  {
    id: 5,
    student: "Robert Brown",
    class: "JSS 1",
    club: "Sports Club",
    term: "1st Term",
    submittedBy: "Michael Thompson (Staff)",
    submissionDate: "2023-11-08",
    status: "approved",
  },
]

export function AdminPerformanceReports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clubFilter, setClubFilter] = useState("all")

  const filteredReports = mockPerformanceReports.filter(
    (report) =>
      (report.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || report.status === statusFilter) &&
      (clubFilter === "all" || report.club === clubFilter),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students, clubs, or vendors..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={clubFilter} onValueChange={setClubFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clubs</SelectItem>
              <SelectItem value="Chess Club">Chess Club</SelectItem>
              <SelectItem value="Debate Club">Debate Club</SelectItem>
              <SelectItem value="Science Club">Science Club</SelectItem>
              <SelectItem value="Art Club">Art Club</SelectItem>
              <SelectItem value="Sports Club">Sports Club</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
              setClubFilter("all")
            }}
          >
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.student}</TableCell>
                  <TableCell>{report.class}</TableCell>
                  <TableCell>{report.club}</TableCell>
                  <TableCell>{report.term}</TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                  <TableCell>{report.submissionDate}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={report.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Report
                        </DropdownMenuItem>
                        {report.status === "pending" && (
                          <>
                            <DropdownMenuItem>
                              <CheckIcon className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XIcon className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No performance reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
