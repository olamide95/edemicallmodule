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
import { MoreHorizontalIcon, SearchIcon, FilterIcon, EyeIcon, PencilIcon, UserMinusIcon, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"

// Mock data
const mockEnrollments = [
  {
    id: 1,
    student: "John Doe",
    class: "JSS 3",
    club: "Chess Club",
    term: "1st Term",
    variant: "Standard",
    amount: 15000,
    status: "Active",
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "SSS 1",
    club: "Debate Club",
    term: "1st, 2nd Term",
    variant: "With Materials",
    amount: 18500,
    status: "Active",
  },
  {
    id: 3,
    student: "Michael Johnson",
    class: "JSS 2",
    club: "Science Club",
    term: "All Terms",
    variant: "Standard",
    amount: 30000,
    status: "Active",
  },
  {
    id: 4,
    student: "Sarah Williams",
    class: "SSS 2",
    club: "Art Club",
    term: "2nd Term",
    variant: "With Art Supplies",
    amount: 22000,
    status: "Active",
  },
  {
    id: 5,
    student: "Robert Brown",
    class: "JSS 1",
    club: "Sports Club",
    term: "All Terms",
    variant: "With Uniform",
    amount: 35000,
    status: "Active",
  },
]

export function EnrollmentTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [enrollments, setEnrollments] = useState(mockEnrollments)
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState<number | null>(null)

  const classes = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"]
  const sections = ["A", "B", "C", "D"]

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.club.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = selectedClass ? enrollment.class === selectedClass : true

    // Assuming section would be part of the student data in a real implementation
    // For now, we'll just simulate this filter
    const matchesSection = selectedSection ? true : true

    return matchesSearch && matchesClass && matchesSection
  })

  const handleUnenroll = (id: number) => {
    setSelectedEnrollment(id)
    setUnenrollDialogOpen(true)
  }

  const confirmUnenroll = () => {
    if (selectedEnrollment) {
      setEnrollments(
        enrollments.map((enrollment) =>
          enrollment.id === selectedEnrollment ? { ...enrollment, status: "Inactive" } : enrollment,
        ),
      )
      setUnenrollDialogOpen(false)
      setSelectedEnrollment(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
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

          <div className="flex gap-2">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Class" />
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

            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
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
                setSelectedSection("")
              }}
            >
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {(selectedClass || selectedSection) && (
          <div className="flex gap-2">
            {selectedClass && (
              <Badge variant="outline" className="flex items-center gap-1">
                Class: {selectedClass}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedClass("")}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedSection && (
              <Badge variant="outline" className="flex items-center gap-1">
                Section: {selectedSection}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedSection("")}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length > 0 ? (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.student}</TableCell>
                  <TableCell>{enrollment.class}</TableCell>
                  <TableCell>{enrollment.club}</TableCell>
                  <TableCell>{enrollment.term}</TableCell>
                  <TableCell>{enrollment.variant}</TableCell>
                  <TableCell className="text-right">₦{enrollment.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={enrollment.status} />
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
                        <DropdownMenuItem>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit Enrollment
                        </DropdownMenuItem>
                        {enrollment.status === "Active" && (
                          <DropdownMenuItem className="text-destructive" onClick={() => handleUnenroll(enrollment.id)}>
                            <UserMinusIcon className="mr-2 h-4 w-4" />
                            Unenroll
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No enrollments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* We'll use the Dialog component for the unenroll confirmation */}
      {unenrollDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Unenrollment</h3>
            <p className="mb-4">Are you sure you want to unenroll this student? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUnenrollDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmUnenroll}>
                Unenroll
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
