"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Filter } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function FeeAssignment() {
  const [selectedDistribution, setSelectedDistribution] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // Sample student data
  const pendingStudents = Array.from({ length: 5 }).map((_, i) => ({
    id: `STU${2023001 + i}`,
    name: `Student Name ${i + 1}`,
    class: `Grade ${Math.floor(Math.random() * 6) + 1}`,
    feeAmount: (Math.floor(Math.random() * 50) + 50) * 1000,
    status: "Pending",
  }))

  // Memoize filtered students
  const filteredPendingStudents = useMemo(() => {
    if (!searchQuery && !selectedClass) return pendingStudents

    return pendingStudents.filter((student) => {
      const matchesSearch =
        !searchQuery ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesClass =
        !selectedClass || selectedClass === "all" || student.class.includes(selectedClass.replace("grade", "Grade "))

      return matchesSearch && matchesClass
    })
  }, [pendingStudents, searchQuery, selectedClass])

  // Add useCallback for handlers
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked)
      if (checked) {
        setSelectedStudents(pendingStudents.map((student) => student.id))
      } else {
        setSelectedStudents([])
      }
    },
    [pendingStudents],
  )

  const handleSelectStudent = useCallback((studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId])
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId))
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Assignment</CardTitle>
        <CardDescription>Assign fees to students based on fee distributions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="distribution">Fee Distribution</Label>
            <Select value={selectedDistribution} onValueChange={setSelectedDistribution}>
              <SelectTrigger id="distribution">
                <SelectValue placeholder="Select Fee Distribution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dist1">2023-2024 Academic Year - Regular</SelectItem>
                <SelectItem value="dist2">2023-2024 Academic Year - Scholarship</SelectItem>
                <SelectItem value="dist3">2024-2025 Academic Year - Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="grade1">Grade 1</SelectItem>
                <SelectItem value="grade2">Grade 2</SelectItem>
                <SelectItem value="grade3">Grade 3</SelectItem>
                <SelectItem value="grade4">Grade 4</SelectItem>
                <SelectItem value="grade5">Grade 5</SelectItem>
                <SelectItem value="grade6">Grade 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search">Search Student</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <span className="text-sm text-muted-foreground">Showing 50 students</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoices
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <div className="flex items-center">
                      <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} className="mr-2" />
                    </div>
                  </TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Fee Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingStudents.map((student, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => handleSelectStudent(student.id, checked === true)}
                      />
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>₦{student.feeAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="assigned" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Fee Amount</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>STU{2023010 + i}</TableCell>
                    <TableCell className="font-medium">Student Name {i + 10}</TableCell>
                    <TableCell>Grade {Math.floor(Math.random() * 6) + 1}</TableCell>
                    <TableCell>₦{(Math.floor(Math.random() * 50) + 50) * 1000}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="exceptions" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Exception Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>STU{2023020 + i}</TableCell>
                    <TableCell className="font-medium">Student Name {i + 20}</TableCell>
                    <TableCell>Grade {Math.floor(Math.random() * 6) + 1}</TableCell>
                    <TableCell>
                      <Badge variant={["error", "warning", "info"][i]}>
                        {["Scholarship", "Financial Aid", "Special Case"][i]}
                      </Badge>
                    </TableCell>
                    <TableCell>Exception reason {i + 1}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
