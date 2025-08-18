"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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

// Local storage keys
const STORAGE_KEYS = {
  FEE_DISTRIBUTIONS: "feeDistributions",
  CLASSES: "classes",
  STUDENTS: "admissionFormResponses"
}

interface FeeDistribution {
  id: string
  name: string
  academicYear: string
  term: string
  classes: string[]
  feeHeads: string[]
  status: "active" | "archived" | "draft"
  lastUpdated: string
}

interface Student {
  id: string
  firstName: string
  lastName: string
  class: string
  status: string
  admissionNumber?: string
  [key: string]: any
}

export function FeeAssignment() {
  const [selectedDistribution, setSelectedDistribution] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [distributions, setDistributions] = useState<FeeDistribution[]>([])
  const [classes, setClasses] = useState<{label: string, value: string}[]>([])
  const [students, setStudents] = useState<Student[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load distributions
      const savedDistributions = localStorage.getItem(STORAGE_KEYS.FEE_DISTRIBUTIONS)
      if (savedDistributions) {
        setDistributions(JSON.parse(savedDistributions))
      }

      // Load classes
      const savedClasses = localStorage.getItem(STORAGE_KEYS.CLASSES)
      if (savedClasses) {
        const classesData = JSON.parse(savedClasses)
        const classOptions = classesData.map((cls: any) => ({
          label: cls.name,
          value: cls.name.toLowerCase().replace(/\s+/g, '-')
        }))
        setClasses(classOptions)
      }

      // Load students
      const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS)
      if (savedStudents) {
        const allStudents = JSON.parse(savedStudents)
        const admittedStudents = allStudents
          .filter((student: any) => student.status === "Admitted")
          .map((student: any) => ({
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            class: student.class || "Not assigned",
            status: student.status,
            admissionNumber: student.admissionNumber || `ADM-${student.id.slice(0, 8)}`
          }))
        setStudents(admittedStudents)
      }
    }

    loadData()
  }, [])

  // Filter pending students based on search and class
  const pendingStudents = useMemo(() => {
    return students.filter(student => student.status === "Admitted")
  }, [students])

  // Memoize filtered students
  const filteredPendingStudents = useMemo(() => {
    if (!searchQuery && !selectedClass) return pendingStudents

    return pendingStudents.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`
      const matchesSearch =
        !searchQuery ||
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.admissionNumber && student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesClass =
        !selectedClass || 
        selectedClass === "all" || 
        student.class.toLowerCase() === selectedClass.toLowerCase()

      return matchesSearch && matchesClass
    })
  }, [pendingStudents, searchQuery, selectedClass])

  // Add useCallback for handlers
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked)
      if (checked) {
        setSelectedStudents(filteredPendingStudents.map((student) => student.id))
      } else {
        setSelectedStudents([])
      }
    },
    [filteredPendingStudents],
  )

  const handleSelectStudent = useCallback((studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId])
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId))
    }
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { 
      style: "currency", 
      currency: "NGN" 
    }).format(amount).replace(/NGN/g, "₦")
  }

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
            <Select 
              value={selectedDistribution} 
              onValueChange={setSelectedDistribution}
            >
              <SelectTrigger id="distribution">
                <SelectValue placeholder="Select Fee Distribution" />
              </SelectTrigger>
              <SelectContent>
                {distributions.map((dist) => (
                  <SelectItem key={dist.id} value={dist.id}>
                    {dist.name} ({dist.academicYear})
                  </SelectItem>
                ))}
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
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>
                    {cls.label}
                  </SelectItem>
                ))}
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
            <span className="text-sm text-muted-foreground">
              Showing {filteredPendingStudents.length} students
            </span>
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
                      <Checkbox 
                        checked={selectAll} 
                        onCheckedChange={handleSelectAll} 
                        className="mr-2" 
                      />
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
                {filteredPendingStudents.map((student) => {
                  // Get fee amount from selected distribution (simplified example)
                  const feeAmount = selectedDistribution 
                    ? 50000 // This would come from the actual distribution data
                    : 0

                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) => 
                            handleSelectStudent(student.id, checked === true)
                          }
                        />
                      </TableCell>
                      <TableCell>{student.admissionNumber}</TableCell>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{formatCurrency(feeAmount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
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
                {/* Example assigned students - would come from your data */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>STU{2023010 + i}</TableCell>
                    <TableCell className="font-medium">
                      Student Name {i + 10}
                    </TableCell>
                    <TableCell>Grade {Math.floor(Math.random() * 6) + 1}</TableCell>
                    <TableCell>{formatCurrency((Math.floor(Math.random() * 50) + 50) * 1000)}</TableCell>
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
                {/* Example exceptions - would come from your data */}
                {Array.from({ length: 2 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>STU{2023020 + i}</TableCell>
                    <TableCell className="font-medium">
                      Student Name {i + 20}
                    </TableCell>
                    <TableCell>Grade {Math.floor(Math.random() * 6) + 1}</TableCell>
                    <TableCell>
                      <Badge variant={i === 0 ? "error" : "warning"}>
                        {i === 0 ? "Scholarship" : "Financial Aid"}
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