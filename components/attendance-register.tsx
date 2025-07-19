"use client"

import { useState } from "react"
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
  name: string
  grade: string
  club: string
  status: "present" | "absent" | "late" | "excused"
}

interface Club {
  id: string
  name: string
  supplier: string
  totalStudents: number
}

const mockClubs: Club[] = [
  { id: "1", name: "Soccer Club", supplier: "Sports Academy", totalStudents: 25 },
  { id: "2", name: "Art Club", supplier: "Creative Arts Center", totalStudents: 18 },
  { id: "3", name: "Music Club", supplier: "Harmony School", totalStudents: 22 },
  { id: "4", name: "Chess Club", supplier: "Strategic Minds", totalStudents: 15 },
  { id: "5", name: "Drama Club", supplier: "Theater Arts", totalStudents: 20 },
]

const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", grade: "Grade 8", club: "Soccer Club", status: "present" },
  { id: "2", name: "Bob Smith", grade: "Grade 7", club: "Soccer Club", status: "absent" },
  { id: "3", name: "Carol Davis", grade: "Grade 8", club: "Art Club", status: "late" },
  { id: "4", name: "David Wilson", grade: "Grade 9", club: "Music Club", status: "present" },
  { id: "5", name: "Emma Brown", grade: "Grade 7", club: "Chess Club", status: "excused" },
  { id: "6", name: "Frank Miller", grade: "Grade 8", club: "Drama Club", status: "present" },
  { id: "7", name: "Grace Lee", grade: "Grade 9", club: "Soccer Club", status: "present" },
  { id: "8", name: "Henry Taylor", grade: "Grade 7", club: "Art Club", status: "absent" },
]

export function AttendanceRegister() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClub, setSelectedClub] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClub = selectedClub === "all" || student.club === selectedClub
    return matchesSearch && matchesClub
  })

  const getStatusBadge = (status: Student["status"]) => {
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

  const updateStudentStatus = (studentId: string, newStatus: Student["status"]) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, status: newStatus } : student)),
    )
  }

  const getAttendanceStats = () => {
    const total = filteredStudents.length
    const present = filteredStudents.filter((s) => s.status === "present").length
    const absent = filteredStudents.filter((s) => s.status === "absent").length
    const late = filteredStudents.filter((s) => s.status === "late").length
    const excused = filteredStudents.filter((s) => s.status === "excused").length

    return { total, present, absent, late, excused }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Attendance Register</h1>
          <p className="text-muted-foreground">Manage attendance across all clubs and activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select date and club to view attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Club</Label>
              <Select value={selectedClub} onValueChange={setSelectedClub}>
                <SelectTrigger>
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  {mockClubs.map((club) => (
                    <SelectItem key={club.id} value={club.name}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or grade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserX className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.excused}</p>
                <p className="text-xs text-muted-foreground">Excused</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
          <CardDescription>
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"} -
            {selectedClub === "all" ? " All Clubs" : ` ${selectedClub}`}
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
                    <TableHead>Student Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.club}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant={student.status === "present" ? "default" : "outline"}
                            onClick={() => updateStudentStatus(student.id, "present")}
                            className="h-8 px-2"
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "absent" ? "default" : "outline"}
                            onClick={() => updateStudentStatus(student.id, "absent")}
                            className="h-8 px-2"
                          >
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "late" ? "default" : "outline"}
                            onClick={() => updateStudentStatus(student.id, "late")}
                            className="h-8 px-2"
                          >
                            Late
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "excused" ? "default" : "outline"}
                            onClick={() => updateStudentStatus(student.id, "excused")}
                            className="h-8 px-2"
                          >
                            Excused
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
