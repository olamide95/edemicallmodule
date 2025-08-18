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
import { MoreHorizontalIcon, SearchIcon, FilterIcon, EyeIcon, PencilIcon, UserMinusIcon, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Enrollment {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  clubId: string
  clubName: string
  terms: string[]
  variant: string
  amount: number
  status: "Active" | "Inactive"
  enrollmentDate: string
}

export function EnrollmentTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState<string | null>(null)
  const [classes, setClasses] = useState<string[]>([])
  const [sections, setSections] = useState<string[]>([])

  // Load enrollments and classes from localStorage
  useEffect(() => {
    const savedEnrollments = localStorage.getItem('enrollments')
    if (savedEnrollments) {
      setEnrollments(JSON.parse(savedEnrollments))
    }

    const savedClasses = localStorage.getItem('classes')
    if (savedClasses) {
      const classData = JSON.parse(savedClasses)
      const classNames = classData.map((cls: any) => cls.name)
      setClasses(classNames)
      
      // Extract unique sections
      const allSections = classData.flatMap((cls: any) => 
        cls.sections.map((sec: any) => sec.name)
      )
      setSections([...new Set(allSections)])
    }
  }, [])

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.clubName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = selectedClass ? enrollment.class === selectedClass : true
    const matchesSection = selectedSection ? enrollment.section === selectedSection : true

    return matchesSearch && matchesClass && matchesSection
  })

  const handleUnenroll = (id: string) => {
    setSelectedEnrollment(id)
    setUnenrollDialogOpen(true)
  }

  const confirmUnenroll = () => {
    if (selectedEnrollment) {
      const updatedEnrollments = enrollments.map((enrollment) =>
        enrollment.id === selectedEnrollment ? { ...enrollment, status: "Inactive" } : enrollment
      )
      setEnrollments(updatedEnrollments)
      localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments))
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

        {(selectedClass !== "all" || selectedSection !== "all") && (
          <div className="flex gap-2">
            {selectedClass !== "all" && selectedClass && (
              <Badge variant="outline" className="flex items-center gap-1">
                Class: {selectedClass}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedClass("")}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedSection !== "all" && selectedSection && (
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
                  <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                  <TableCell>{enrollment.class} {enrollment.section && `(${enrollment.section})`}</TableCell>
                  <TableCell>{enrollment.clubName}</TableCell>
                  <TableCell>{enrollment.terms.join(", ")}</TableCell>
                  <TableCell>{enrollment.variant || "Standard"}</TableCell>
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

      <Dialog open={unenrollDialogOpen} onOpenChange={setUnenrollDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Unenrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to unenroll this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnenrollDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmUnenroll}>
              Unenroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}