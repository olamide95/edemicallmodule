"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Download, Users, UserCheck, UserX, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Student {
  id: string
  firstName: string
  lastName: string
  class: string
  section: string
  studentId: string
}

interface Club {
  id: string
  name: string
  coordinator: string
  day: string
  time: string
  amount: number
  status: string
}

interface Enrollment {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  clubId: string
  clubName: string
  status: string
}

interface AttendanceRecord {
  id: string
  date: string
  studentId: string
  clubId: string
  status: "present" | "absent" | "late" | "excused"
}

export function AttendanceRegister() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClub, setSelectedClub] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load students
      const savedStudents = localStorage.getItem('admissionFormResponses')
      if (savedStudents) {
        const allStudents = JSON.parse(savedStudents)
        const mappedStudents = allStudents
          .filter((s: any) => s.status === "Admitted" && s.studentId)
          .map((s: any) => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            class: s.class || "Not Assigned",
            section: s.section || "Not Assigned",
            studentId: s.studentId
          }))
        setStudents(mappedStudents)
      }

      // Load clubs
      const savedClubs = localStorage.getItem('clubs')
      if (savedClubs) {
        const activeClubs = JSON.parse(savedClubs).filter((c: any) => c.status === "active")
        setClubs(activeClubs)
      }

      // Load enrollments - only active enrollments
      const savedEnrollments = localStorage.getItem('enrollments')
      if (savedEnrollments) {
        const activeEnrollments = JSON.parse(savedEnrollments).filter((e: any) => e.status === "Active")
        setEnrollments(activeEnrollments)
      }

      // Load attendance records
      const savedAttendance = localStorage.getItem('attendanceRecords')
      if (savedAttendance) {
        setAttendanceRecords(JSON.parse(savedAttendance))
      }
    }

    loadData()
  }, [])

  // Get enrolled students for the selected club
  const getEnrolledStudents = () => {
    return enrollments
      .filter(enrollment => {
        // Filter by selected club if not "all"
        const clubMatch = selectedClub === "all" || enrollment.clubId === selectedClub
        return clubMatch
      })
      .map(enrollment => {
        // Find student details
        const student = students.find(s => s.id === enrollment.studentId)
        return {
          ...enrollment,
          firstName: student?.firstName || "Unknown",
          lastName: student?.lastName || "Student",
          class: student?.class || enrollment.class || "Not Assigned",
          section: student?.section || enrollment.section || "Not Assigned",
          studentId: student?.studentId || "N/A"
        }
      })
  }

  // Filter students based on search term
  const filteredStudents = getEnrolledStudents().filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
    const classSection = `${student.class} ${student.section}`.toLowerCase()
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      classSection.includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Get current attendance status for a student on the selected date
  const getStudentStatus = (studentId: string, clubId: string): AttendanceRecord["status"] => {
    const dateString = format(selectedDate, 'yyyy-MM-dd')
    const record = attendanceRecords.find(
      r => r.studentId === studentId && 
           r.clubId === clubId && 
           r.date === dateString
    )
    return record?.status || "absent" // Default to absent if no record exists
  }

  // Update attendance status
  const updateAttendanceStatus = (studentId: string, clubId: string, status: AttendanceRecord["status"]) => {
    const dateString = format(selectedDate, 'yyyy-MM-dd')
    const existingRecordIndex = attendanceRecords.findIndex(
      r => r.studentId === studentId && 
           r.clubId === clubId && 
           r.date === dateString
    )

    let updatedRecords: AttendanceRecord[]
    
    if (existingRecordIndex >= 0) {
      // Update existing record
      updatedRecords = [...attendanceRecords]
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        status
      }
    } else {
      // Create new record
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        date: dateString,
        studentId,
        clubId,
        status
      }
      updatedRecords = [...attendanceRecords, newRecord]
    }

    setAttendanceRecords(updatedRecords)
    localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords))
  }

  // Get attendance statistics
  const getAttendanceStats = () => {
    const dateString = format(selectedDate, 'yyyy-MM-dd')
    const relevantRecords = attendanceRecords.filter(
      r => r.date === dateString && 
           (selectedClub === "all" || r.clubId === selectedClub)
    )

    const present = relevantRecords.filter(r => r.status === "present").length
    const absent = relevantRecords.filter(r => r.status === "absent").length
    const late = relevantRecords.filter(r => r.status === "late").length
    const excused = relevantRecords.filter(r => r.status === "excused").length
    const total = filteredStudents.length

    return { total, present, absent, late, excused }
  }

  const stats = getAttendanceStats()

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    const variants = {
      present: "bg-green-100 text-green-800 hover:bg-green-100",
      absent: "bg-red-100 text-red-800 hover:bg-red-100",
      late: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      excused: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    }

    const labels = {
      present: "Present",
      absent: "Absent",
      late: "Late",
      excused: "Excused",
    }

    return (
      <Badge variant="secondary" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  // Export attendance data
  const exportAttendance = () => {
    const dateString = format(selectedDate, 'yyyy-MM-dd')
    const data = filteredStudents.map(student => {
      const status = getStudentStatus(student.studentId, student.clubId)
      return {
        'Student ID': student.studentId,
        'Name': `${student.firstName} ${student.lastName}`,
        'Class': student.class,
        'Section': student.section,
        'Club': student.clubName,
        'Status': status.charAt(0).toUpperCase() + status.slice(1),
        'Date': dateString
      }
    })

    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `attendance_${dateString}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header and filters remain the same as before */}
      {/* ... */}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Statistics cards remain the same as before */}
        {/* ... */}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
          <CardDescription>
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"} -
            {selectedClub === "all" ? " All Clubs" : ` ${clubs.find(c => c.id === selectedClub)?.name || "Selected Club"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search criteria" : "No students enrolled for the selected filters"}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const currentStatus = getStudentStatus(student.studentId, student.clubId)
                    return (
                      <TableRow key={`${student.studentId}-${student.clubId}`}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell className="font-medium">{student.firstName} {student.lastName}</TableCell>
                        <TableCell>{student.class} {student.section}</TableCell>
                        <TableCell>{student.clubName}</TableCell>
                        <TableCell>{getStatusBadge(currentStatus)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant={currentStatus === "present" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student.studentId, student.clubId, "present")}
                              className="h-8 px-2"
                            >
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={currentStatus === "absent" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student.studentId, student.clubId, "absent")}
                              className="h-8 px-2"
                            >
                              Absent
                            </Button>
                            <Button
                              size="sm"
                              variant={currentStatus === "late" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student.studentId, student.clubId, "late")}
                              className="h-8 px-2"
                            >
                              Late
                            </Button>
                            <Button
                              size="sm"
                              variant={currentStatus === "excused" ? "default" : "outline"}
                              onClick={() => updateAttendanceStatus(student.studentId, student.clubId, "excused")}
                              className="h-8 px-2"
                            >
                              Excused
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}