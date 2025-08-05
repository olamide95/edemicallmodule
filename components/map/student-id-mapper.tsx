"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Check, X } from "lucide-react"

type Student = {
  id: string
  firstName: string
  lastName: string
  admissionId: string
  studentId: string | null
  status: "pending" | "mapped" | "rejected"
  admissionStatus: string
}

export function StudentIdMapper() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [studentId, setStudentId] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Load admitted students from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('admissionFormResponses')
    if (savedResponses) {
      const allStudents = JSON.parse(savedResponses)
      // Filter only admitted students and map to Student type
      const admittedStudents = allStudents
        .filter((student: any) => student.status === "Admitted")
        .map((student: any) => ({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          admissionId: student.admissionNumber || `ADM-${student.id.slice(0, 8)}`,
          studentId: student.studentId || null,
          status: student.studentId ? "mapped" : "pending",
          admissionStatus: student.status
        }))
      setStudents(admittedStudents)
    }
  }, [])

  const filteredStudents = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    setStudentId(student.studentId || "")
  }

  const handleMapStudentId = () => {
    if (!selectedStudent || !studentId.trim()) return

    // Update local state
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...student, studentId, status: "mapped" } : student
    )
    setStudents(updatedStudents)

    // Update localStorage
    const savedResponses = localStorage.getItem('admissionFormResponses')
    if (savedResponses) {
      const allStudents = JSON.parse(savedResponses)
      const updatedAllStudents = allStudents.map((student: any) => 
        student.id === selectedStudent.id ? { ...student, studentId } : student
      )
      localStorage.setItem('admissionFormResponses', JSON.stringify(updatedAllStudents))
    }

    setSelectedStudent(null)
    setStudentId("")
  }

  const handleRejectMapping = () => {
    if (!selectedStudent) return

    // Update local state
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...student, status: "rejected" } : student
    )
    setStudents(updatedStudents)

    // Update localStorage
    const savedResponses = localStorage.getItem('admissionFormResponses')
    if (savedResponses) {
      const allStudents = JSON.parse(savedResponses)
      const updatedAllStudents = allStudents.map((student: any) => 
        student.id === selectedStudent.id ? { ...student, status: "Rejected" } : student
      )
      localStorage.setItem('admissionFormResponses', JSON.stringify(updatedAllStudents))
    }

    setSelectedStudent(null)
    setStudentId("")
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Admission Applications</CardTitle>
          <CardDescription>Map admission IDs to permanent student IDs for confirmed enrollments</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input
              placeholder="Search by name or admission ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="secondary">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Admission ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No admitted students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.firstName} {student.lastName}</TableCell>
                    <TableCell>{student.admissionId}</TableCell>
                    <TableCell>{student.studentId || "-"}</TableCell>
                    <TableCell>
                      {student.status === "pending" && <Badge variant="outline">Pending</Badge>}
                      {student.status === "mapped" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Mapped
                        </Badge>
                      )}
                      {student.status === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      {student.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => handleSelectStudent(student)}>
                          Map ID
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assign Student ID</CardTitle>
          <CardDescription>Map the selected admission to a permanent student ID</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedStudent ? (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Selected Student</div>
                <div className="rounded-md border p-3">
                  <div className="font-medium">{selectedStudent.firstName} {selectedStudent.lastName}</div>
                  <div className="text-sm text-muted-foreground">Admission ID: {selectedStudent.admissionId}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-id">Permanent Student ID</Label>
                <Input
                  id="student-id"
                  placeholder="Enter student ID (e.g., STU-2023-001)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[140px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Select an admitted student to map their ID</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {selectedStudent && (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={handleRejectMapping}>
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button size="sm" onClick={handleMapStudentId} disabled={!studentId.trim()}>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </Button>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}