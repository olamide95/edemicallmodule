"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, FilterIcon, EyeIcon, FileTextIcon, DownloadIcon } from "lucide-react"

// Mock data for supplier enrollments
const mockEnrollments = [
  {
    id: 1,
    student: "John Doe",
    class: "JSS 3",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-15",
    variant: "Standard",
    status: "active",
    attendance: 92,
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "SSS 1",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-16",
    variant: "With Chess Set",
    status: "active",
    attendance: 100,
  },
  {
    id: 3,
    student: "Michael Johnson",
    class: "JSS 2",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-18",
    variant: "Standard",
    status: "active",
    attendance: 85,
  },
  {
    id: 4,
    student: "Sarah Williams",
    class: "SSS 2",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-20",
    variant: "With Chess Set",
    status: "active",
    attendance: 78,
  },
  {
    id: 5,
    student: "Robert Brown",
    class: "JSS 1",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-22",
    variant: "Standard",
    status: "active",
    attendance: 95,
  },
  {
    id: 6,
    student: "Emily Davis",
    class: "JSS 3",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-25",
    variant: "With Chess Set",
    status: "inactive",
    attendance: 65,
  },
  {
    id: 7,
    student: "David Wilson",
    class: "SSS 1",
    club: "Chess Club",
    term: "1st Term",
    enrollmentDate: "2023-09-28",
    variant: "Standard",
    status: "active",
    attendance: 88,
  },
]

export function SupplierEnrollments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClub, setSelectedClub] = useState("Chess Club")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("1st Term")

  // Filter enrollments based on search, club, class, and term
  const filteredEnrollments = mockEnrollments.filter(
    (enrollment) =>
      (enrollment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.class.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedClub || enrollment.club === selectedClub) &&
      (!selectedClass || enrollment.class === selectedClass) &&
      (!selectedTerm || enrollment.term === selectedTerm),
  )

  // Get unique clubs, classes, and terms for filters
  const clubs = Array.from(new Set(mockEnrollments.map((e) => e.club)))
  const classes = Array.from(new Set(mockEnrollments.map((e) => e.class)))
  const terms = Array.from(new Set(mockEnrollments.map((e) => e.term)))

  // Calculate statistics
  const totalEnrollments = filteredEnrollments.length
  const activeEnrollments = filteredEnrollments.filter((e) => e.status === "active").length
  const averageAttendance =
    filteredEnrollments.length > 0
      ? Math.round(filteredEnrollments.reduce((sum, e) => sum + e.attendance, 0) / filteredEnrollments.length)
      : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Total Enrollments</div>
          <div className="text-2xl font-bold">{totalEnrollments}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Active Enrollments</div>
          <div className="text-2xl font-bold">{activeEnrollments}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Average Attendance</div>
          <div className="text-2xl font-bold">{averageAttendance}%</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedClub} onValueChange={setSelectedClub}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select club" />
            </SelectTrigger>
            <SelectContent>
              {clubs.map((club) => (
                <SelectItem key={club} value={club}>
                  {club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSearchQuery("")
              setSelectedClass("")
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
              <TableHead>Variant</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead className="text-center">Attendance</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length > 0 ? (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.student}</TableCell>
                  <TableCell>{enrollment.class}</TableCell>
                  <TableCell>{enrollment.variant}</TableCell>
                  <TableCell>{enrollment.enrollmentDate}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${
                            enrollment.attendance >= 90
                              ? "bg-green-500"
                              : enrollment.attendance >= 75
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${enrollment.attendance}%` }}
                        ></div>
                      </div>
                      <span>{enrollment.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={enrollment.status === "active" ? "default" : "secondary"}
                      className={
                        enrollment.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }
                    >
                      {enrollment.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Create Report">
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Export">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No enrollments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
