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
import { MoreHorizontalIcon, SearchIcon, FilterIcon, CheckIcon, XIcon, EyeIcon } from "lucide-react"
// Make sure the StatusBadge import is correct
import { StatusBadge } from "@/components/status-badge"

// Mock data for unenrollment requests
const mockUnenrollments = [
  {
    id: 1,
    student: "John Doe",
    class: "JSS 3",
    club: "Chess Club",
    term: "1st Term",
    requestDate: "2023-11-10",
    reason: "Schedule conflict with tutoring",
    status: "pending",
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "SSS 1",
    club: "Debate Club",
    term: "1st Term",
    requestDate: "2023-11-08",
    reason: "Moving to another school",
    status: "approved",
  },
  {
    id: 3,
    student: "Michael Johnson",
    class: "JSS 2",
    club: "Science Club",
    term: "1st Term",
    requestDate: "2023-11-05",
    reason: "Health issues",
    status: "pending",
  },
  {
    id: 4,
    student: "Sarah Williams",
    class: "SSS 2",
    club: "Art Club",
    term: "1st Term",
    requestDate: "2023-11-03",
    reason: "Wants to join a different club",
    status: "rejected",
  },
  {
    id: 5,
    student: "Robert Brown",
    class: "JSS 1",
    club: "Sports Club",
    term: "1st Term",
    requestDate: "2023-11-01",
    reason: "Too much academic workload",
    status: "approved",
  },
]

export function UnenrollmentTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUnenrollments = mockUnenrollments.filter(
    (unenrollment) =>
      (unenrollment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unenrollment.club.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || unenrollment.status === statusFilter),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students or clubs..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
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
          }}
        >
          <FilterIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnenrollments.length > 0 ? (
              filteredUnenrollments.map((unenrollment) => (
                <TableRow key={unenrollment.id}>
                  <TableCell className="font-medium">{unenrollment.student}</TableCell>
                  <TableCell>{unenrollment.class}</TableCell>
                  <TableCell>{unenrollment.club}</TableCell>
                  <TableCell>{unenrollment.term}</TableCell>
                  <TableCell>{unenrollment.requestDate}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={unenrollment.reason}>
                    {unenrollment.reason}
                  </TableCell>
                  {/* Make sure the StatusBadge is being used correctly in the table */}
                  <TableCell className="text-center">
                    <StatusBadge status={unenrollment.status} />
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
                          View Details
                        </DropdownMenuItem>
                        {unenrollment.status === "pending" && (
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No unenrollment requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
