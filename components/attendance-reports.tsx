"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Printer, FileText, TrendingUp } from "lucide-react"
import { format, eachDayOfInterval } from "date-fns"
import { cn } from "@/lib/utils"

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  grade: string
  club: string
  supplier: string
  date: string
  status: "present" | "absent" | "late" | "excused"
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "s1",
    studentName: "Alice Johnson",
    grade: "Grade 8",
    club: "Soccer Club",
    supplier: "Sports Academy",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "2",
    studentId: "s1",
    studentName: "Alice Johnson",
    grade: "Grade 8",
    club: "Soccer Club",
    supplier: "Sports Academy",
    date: "2024-01-16",
    status: "present",
  },
  {
    id: "3",
    studentId: "s1",
    studentName: "Alice Johnson",
    grade: "Grade 8",
    club: "Soccer Club",
    supplier: "Sports Academy",
    date: "2024-01-17",
    status: "late",
  },
  {
    id: "4",
    studentId: "s2",
    studentName: "Bob Smith",
    grade: "Grade 7",
    club: "Soccer Club",
    supplier: "Sports Academy",
    date: "2024-01-15",
    status: "absent",
  },
  {
    id: "5",
    studentId: "s2",
    studentName: "Bob Smith",
    grade: "Grade 7",
    club: "Soccer Club",
    supplier: "Sports Academy",
    date: "2024-01-16",
    status: "present",
  },
  {
    id: "6",
    studentId: "s3",
    studentName: "Carol Davis",
    grade: "Grade 8",
    club: "Art Club",
    supplier: "Creative Arts Center",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "7",
    studentId: "s3",
    studentName: "Carol Davis",
    grade: "Grade 8",
    club: "Art Club",
    supplier: "Creative Arts Center",
    date: "2024-01-16",
    status: "excused",
  },
  {
    id: "8",
    studentId: "s4",
    studentName: "David Wilson",
    grade: "Grade 9",
    club: "Music Club",
    supplier: "Harmony School",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "9",
    studentId: "s4",
    studentName: "David Wilson",
    grade: "Grade 9",
    club: "Music Club",
    supplier: "Harmony School",
    date: "2024-01-16",
    status: "present",
  },
  {
    id: "10",
    studentId: "s5",
    studentName: "Emma Brown",
    grade: "Grade 7",
    club: "Chess Club",
    supplier: "Strategic Minds",
    date: "2024-01-15",
    status: "late",
  },
]

const clubs = [
  { id: "1", name: "Soccer Club", supplier: "Sports Academy" },
  { id: "2", name: "Art Club", supplier: "Creative Arts Center" },
  { id: "3", name: "Music Club", supplier: "Harmony School" },
  { id: "4", name: "Chess Club", supplier: "Strategic Minds" },
  { id: "5", name: "Drama Club", supplier: "Theater Arts" },
]

const suppliers = [
  { id: "1", name: "Sports Academy" },
  { id: "2", name: "Creative Arts Center" },
  { id: "3", name: "Harmony School" },
  { id: "4", name: "Strategic Minds" },
  { id: "5", name: "Theater Arts" },
]

export function AttendanceReports() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 0, 15), // January 15, 2024
    to: new Date(2024, 0, 17), // January 17, 2024
  })
  const [selectedClub, setSelectedClub] = useState<string>("all")
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all")
  const [reportGenerated, setReportGenerated] = useState(false)

  const generateReport = () => {
    setReportGenerated(true)
  }

  const printReport = () => {
    window.print()
  }

  const exportReport = () => {
    // In a real implementation, this would generate and download a PDF or CSV
    console.log("Exporting report...")
  }

  const getFilteredData = () => {
    if (!dateRange.from || !dateRange.to) return []

    return mockAttendanceData.filter((record) => {
      const recordDate = new Date(record.date)
      const inDateRange = recordDate >= dateRange.from! && recordDate <= dateRange.to!
      const matchesClub = selectedClub === "all" || record.club === selectedClub
      const matchesSupplier = selectedSupplier === "all" || record.supplier === selectedSupplier

      return inDateRange && matchesClub && matchesSupplier
    })
  }

  const getReportStatistics = () => {
    const data = getFilteredData()
    const total = data.length
    const present = data.filter((r) => r.status === "present").length
    const absent = data.filter((r) => r.status === "absent").length
    const late = data.filter((r) => r.status === "late").length
    const excused = data.filter((r) => r.status === "excused").length

    const attendanceRate = total > 0 ? (((present + late) / total) * 100).toFixed(1) : "0"
    const absenteeRate = total > 0 ? ((absent / total) * 100).toFixed(1) : "0"

    return { total, present, absent, late, excused, attendanceRate, absenteeRate }
  }

  const getStudentSummary = () => {
    const data = getFilteredData()
    const studentMap = new Map()

    data.forEach((record) => {
      if (!studentMap.has(record.studentId)) {
        studentMap.set(record.studentId, {
          name: record.studentName,
          grade: record.grade,
          club: record.club,
          supplier: record.supplier,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          total: 0,
        })
      }

      const student = studentMap.get(record.studentId)
      student[record.status]++
      student.total++
    })

    return Array.from(studentMap.values())
  }

  const getDailySummary = () => {
    if (!dateRange.from || !dateRange.to) return []

    const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
    const data = getFilteredData()

    return days.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd")
      const dayData = data.filter((r) => r.date === dayStr)

      return {
        date: dayStr,
        dayName: format(day, "EEEE"),
        total: dayData.length,
        present: dayData.filter((r) => r.status === "present").length,
        absent: dayData.filter((r) => r.status === "absent").length,
        late: dayData.filter((r) => r.status === "late").length,
        excused: dayData.filter((r) => r.status === "excused").length,
      }
    })
  }

  const stats = getReportStatistics()
  const studentSummary = getStudentSummary()
  const dailySummary = getDailySummary()

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800",
      absent: "bg-red-100 text-red-800",
      late: "bg-yellow-100 text-yellow-800",
      excused: "bg-blue-100 text-blue-800",
    }

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
          body {
            font-size: 12px;
          }
          .print-title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="no-print">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Attendance Reports</h1>
            <p className="text-muted-foreground">Generate detailed attendance reports by date range</p>
          </div>
        </div>
      </div>

      {/* Report Configuration */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Select date range and filters for your attendance report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
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
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.name}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Supplier</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateReport} disabled={!dateRange.from || !dateRange.to}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            {reportGenerated && (
              <>
                <Button variant="outline" onClick={printReport}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
                <Button variant="outline" onClick={exportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      {reportGenerated && dateRange.from && dateRange.to && (
        <div className="space-y-6">
          {/* Report Header */}
          <div className="print-title hidden print:block">
            Attendance Report - {format(dateRange.from, "MMM d, yyyy")} to {format(dateRange.to, "MMM d, yyyy")}
          </div>

          {/* Report Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Report Summary
              </CardTitle>
              <CardDescription>
                Period: {format(dateRange.from, "MMMM d, yyyy")} - {format(dateRange.to, "MMMM d, yyyy")}
                {selectedClub !== "all" && ` • Club: ${selectedClub}`}
                {selectedSupplier !== "all" && ` • Supplier: ${selectedSupplier}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                  <div className="text-sm text-muted-foreground">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                  <div className="text-sm text-muted-foreground">Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                  <div className="text-sm text-muted-foreground">Late</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.excused}</div>
                  <div className="text-sm text-muted-foreground">Excused</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.attendanceRate}%</div>
                  <div className="text-sm text-muted-foreground">Attendance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.absenteeRate}%</div>
                  <div className="text-sm text-muted-foreground">Absentee Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-center">Late</TableHead>
                      <TableHead className="text-center">Excused</TableHead>
                      <TableHead className="text-center">Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailySummary.map((day) => {
                      const rate = day.total > 0 ? (((day.present + day.late) / day.total) * 100).toFixed(1) : "0"
                      return (
                        <TableRow key={day.date}>
                          <TableCell className="font-medium">{format(new Date(day.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{day.dayName}</TableCell>
                          <TableCell className="text-center">{day.total}</TableCell>
                          <TableCell className="text-center text-green-600">{day.present}</TableCell>
                          <TableCell className="text-center text-red-600">{day.absent}</TableCell>
                          <TableCell className="text-center text-yellow-600">{day.late}</TableCell>
                          <TableCell className="text-center text-blue-600">{day.excused}</TableCell>
                          <TableCell className="text-center font-medium">{rate}%</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Student Summary */}
          <Card className="print-break">
            <CardHeader>
              <CardTitle>Student Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Club</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-center">Late</TableHead>
                      <TableHead className="text-center">Excused</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentSummary.map((student, index) => {
                      const rate =
                        student.total > 0 ? (((student.present + student.late) / student.total) * 100).toFixed(1) : "0"
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.club}</TableCell>
                          <TableCell>{student.supplier}</TableCell>
                          <TableCell className="text-center text-green-600">{student.present}</TableCell>
                          <TableCell className="text-center text-red-600">{student.absent}</TableCell>
                          <TableCell className="text-center text-yellow-600">{student.late}</TableCell>
                          <TableCell className="text-center text-blue-600">{student.excused}</TableCell>
                          <TableCell className="text-center font-medium">{student.total}</TableCell>
                          <TableCell className="text-center font-medium">{rate}%</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Records */}
          <Card className="print-break">
            <CardHeader>
              <CardTitle>Detailed Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Club</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData()
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{format(new Date(record.date), "MMM d, yyyy")}</TableCell>
                          <TableCell className="font-medium">{record.studentName}</TableCell>
                          <TableCell>{record.grade}</TableCell>
                          <TableCell>{record.club}</TableCell>
                          <TableCell>{record.supplier}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Report Footer */}
          <div className="text-center text-sm text-muted-foreground print:block">
            Report generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      )}
    </div>
  )
}
