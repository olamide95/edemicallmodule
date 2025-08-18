"use client"

import { useState, useEffect } from "react"
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

type Student = {
  id: string
  firstName: string
  lastName: string
  class: string
  section: string
}

type Club = {
  id: string
  name: string
}

type ClubChangeRequest = {
  id: string
  studentId: string
  currentClubId: string
  newClubId: string
  reason: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
}

export function ClubChangeTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clubChanges, setClubChanges] = useState<ClubChangeRequest[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [clubs, setClubs] = useState<Club[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load change requests
      const savedRequests = localStorage.getItem('clubChangeRequests')
      if (savedRequests) {
        setClubChanges(JSON.parse(savedRequests))
      }

      // Load students
      const savedStudents = localStorage.getItem('admissionFormResponses')
      if (savedStudents) {
        const allStudents = JSON.parse(savedStudents)
        const mappedStudents = allStudents
          .filter((s: any) => s.studentId)
          .map((s: any) => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            class: s.class || "JSS 1",
            section: s.section || "A"
          }))
        setStudents(mappedStudents)
      }

      // Load clubs
      const savedClubs = localStorage.getItem('clubs')
      if (savedClubs) {
        setClubs(JSON.parse(savedClubs))
      }
    }

    loadData()
  }, [])

  const filteredClubChanges = clubChanges.filter((change) => {
    const student = students.find((s) => s.id === change.studentId)
    const currentClub = clubs.find((c) => c.id === change.currentClubId)
    const newClub = clubs.find((c) => c.id === change.newClubId)

    const studentName = student ? `${student.firstName} ${student.lastName}` : ""
    const currentClubName = currentClub ? currentClub.name : ""
    const newClubName = newClub ? newClub.name : ""

    return (
      studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currentClubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newClubName.toLowerCase().includes(searchQuery.toLowerCase())
    ) && (statusFilter === "all" || change.status === statusFilter)
  })

  const handleApprove = (id: string) => {
    // Update the request status
    const updatedChanges = clubChanges.map((change) => 
      change.id === id ? { ...change, status: "approved" } : change
    )
    setClubChanges(updatedChanges)
    localStorage.setItem('clubChangeRequests', JSON.stringify(updatedChanges))

    // Update the enrollment in localStorage
    const request = clubChanges.find((c) => c.id === id)
    if (request) {
      const savedEnrollments = localStorage.getItem('clubEnrollments')
      const enrollments = savedEnrollments ? JSON.parse(savedEnrollments) : []

      // Mark old enrollment as inactive
      const updatedEnrollments = enrollments.map((e: any) => 
        e.studentId === request.studentId && e.status === "active" 
          ? { ...e, status: "inactive" } 
          : e
      )

      // Add new enrollment
      updatedEnrollments.push({
        id: Date.now().toString(),
        studentId: request.studentId,
        clubId: request.newClubId,
        status: "active",
        date: new Date().toISOString()
      })

      localStorage.setItem('clubEnrollments', JSON.stringify(updatedEnrollments))
    }
  }

  const handleReject = (id: string) => {
    const updatedChanges = clubChanges.map((change) => 
      change.id === id ? { ...change, status: "rejected" } : change
    )
    setClubChanges(updatedChanges)
    localStorage.setItem('clubChangeRequests', JSON.stringify(updatedChanges))
  }

  const getStudentDetails = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    return student ? {
      name: `${student.firstName} ${student.lastName}`,
      class: student.class
    } : { name: "Unknown Student", class: "Unknown" }
  }

  const getClubName = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId)
    return club ? club.name : "Unknown Club"
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
              filteredClubChanges.map((change) => {
                const student = getStudentDetails(change.studentId)
                return (
                  <TableRow key={change.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{getClubName(change.currentClubId)}</TableCell>
                    <TableCell>{getClubName(change.newClubId)}</TableCell>
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
                )
              })
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