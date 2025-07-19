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
import { StatusBadge } from "@/components/status-badge"

// Mock data for club change requests
const mockClubChanges = [
  {
    id: 1,
    student: "John Doe",
    class: "JSS 3",
    currentClub: "Chess Club",
    newClub: "Debate Club",
    requestDate: "2023-11-10",
    reason: "Schedule conflict with tutoring",
    status: "pending",
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "SSS 1",
    currentClub: "Debate Club",
    newClub: "Science Club",
    requestDate: "2023-11-08",
    reason: "More interested in science activities",
    status: "approved",
  },
  {
    id: 3,
    student: "Michael Johnson",
    class: "JSS 2",
    currentClub: "Science Club",
    newClub: "Chess Club",
    requestDate: "2023-11-05",
    reason: "Wants to develop strategic thinking",
    status: "pending",
  },
  {
    id: 4,
    student: "Sarah Williams",
    class: "SSS 2",
    currentClub: "Art Club",
    newClub: "Music Club",
    requestDate: "2023-11-03",
    reason: "Discovered passion for music",
    status: "rejected",
  },
  {
    id: 5,
    student: "Robert Brown",
    class: "JSS 1",
    currentClub: "Sports Club",
    newClub: "Art Club",
    requestDate: "2023-11-01",
    reason: "Injury preventing sports participation",
    status: "approved",
  },
]

export function ClubChangeTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clubChanges, setClubChanges] = useState(mockClubChanges)

  const filteredClubChanges = clubChanges.filter(
    (change) =>
      (change.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.currentClub.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.newClub.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || change.status === statusFilter),
  )

  const handleApprove = (id: number) => {
    setClubChanges(clubChanges.map((change) => (change.id === id ? { ...change, status: "approved" } : change)))
  }

  const handleReject = (id: number) => {
    setClubChanges(clubChanges.map((change) => (change.id === id ? { ...change, status: "rejected" } : change)))
  }

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
              <TableHead>Current Club</TableHead>
              <TableHead>New Club</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClubChanges.length > 0 ? (
              filteredClubChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell className="font-medium">{change.student}</TableCell>
                  <TableCell>{change.class}</TableCell>
                  <TableCell>{change.currentClub}</TableCell>
                  <TableCell>{change.newClub}</TableCell>
                  <TableCell>{change.requestDate}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={change.reason}>
                    {change.reason}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={change.status} />
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
                        {change.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(change.id)}>
                              <CheckIcon className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(change.id)}>
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
                  No club change requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
