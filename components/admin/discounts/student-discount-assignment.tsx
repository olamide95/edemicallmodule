"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Download, Plus, Trash2, Pencil } from "lucide-react"
import { StudentSelectionTools } from "@/components/admin/discounts/student-selection-tools"
import { BulkAssignmentDialog } from "@/components/admin/discounts/bulk-assignment-dialog"
import { IndividualAssignmentDialog } from "@/components/admin/discounts/individual-assignment-dialog"

// Sample student data
const students = [
  {
    id: "STU001",
    name: "John Smith",
    class: "Grade 10",
    section: "A",
    admissionNo: "ADM2023001",
    currentDiscounts: [{ name: "Sibling Discount", value: "15%", status: "active" }],
  },
  {
    id: "STU002",
    name: "Emma Johnson",
    class: "Grade 10",
    section: "A",
    admissionNo: "ADM2023002",
    currentDiscounts: [],
  },
  {
    id: "STU003",
    name: "Michael Brown",
    class: "Grade 9",
    section: "B",
    admissionNo: "ADM2023045",
    currentDiscounts: [{ name: "Merit Scholarship", value: "25%", status: "active" }],
  },
  {
    id: "STU004",
    name: "Sophia Williams",
    class: "Grade 11",
    section: "C",
    admissionNo: "ADM2022078",
    currentDiscounts: [],
  },
  {
    id: "STU005",
    name: "James Davis",
    class: "Grade 8",
    section: "A",
    admissionNo: "ADM2023112",
    currentDiscounts: [{ name: "Staff Discount", value: "50%", status: "active" }],
  },
  {
    id: "STU006",
    name: "Olivia Miller",
    class: "Grade 10",
    section: "B",
    admissionNo: "ADM2023018",
    currentDiscounts: [],
  },
  {
    id: "STU007",
    name: "William Wilson",
    class: "Grade 12",
    section: "A",
    admissionNo: "ADM2021034",
    currentDiscounts: [{ name: "Financial Aid", value: "35%", status: "active" }],
  },
  {
    id: "STU008",
    name: "Ava Moore",
    class: "Grade 9",
    section: "C",
    admissionNo: "ADM2023056",
    currentDiscounts: [],
  },
  {
    id: "STU009",
    name: "Alexander Taylor",
    class: "Grade 11",
    section: "B",
    admissionNo: "ADM2022089",
    currentDiscounts: [{ name: "Early Payment Discount", value: "$200", status: "active" }],
  },
  {
    id: "STU010",
    name: "Isabella Anderson",
    class: "Grade 8",
    section: "B",
    admissionNo: "ADM2023127",
    currentDiscounts: [],
  },
]

// Sample discount assignments data
const discountAssignments = [
  {
    id: 1,
    studentId: "STU001",
    studentName: "John Smith",
    class: "Grade 10",
    discountName: "Sibling Discount",
    discountValue: "15%",
    effectiveDate: "2023-09-01",
    expiryDate: "2024-08-31",
    status: "Active",
    assignedBy: "Admin User",
    assignedDate: "2023-08-15",
  },
  {
    id: 2,
    studentId: "STU003",
    studentName: "Michael Brown",
    class: "Grade 9",
    discountName: "Merit Scholarship",
    discountValue: "25%",
    effectiveDate: "2023-09-01",
    expiryDate: "2024-08-31",
    status: "Active",
    assignedBy: "Admin User",
    assignedDate: "2023-08-10",
  },
  {
    id: 3,
    studentId: "STU005",
    studentName: "James Davis",
    class: "Grade 8",
    discountName: "Staff Discount",
    discountValue: "50%",
    effectiveDate: "2023-09-01",
    expiryDate: "2024-08-31",
    status: "Active",
    assignedBy: "Admin User",
    assignedDate: "2023-08-05",
  },
  {
    id: 4,
    studentId: "STU007",
    studentName: "William Wilson",
    class: "Grade 12",
    discountName: "Financial Aid",
    discountValue: "35%",
    effectiveDate: "2023-09-01",
    expiryDate: "2024-08-31",
    status: "Active",
    assignedBy: "Admin User",
    assignedDate: "2023-08-12",
  },
  {
    id: 5,
    studentId: "STU009",
    studentName: "Alexander Taylor",
    class: "Grade 11",
    discountName: "Early Payment Discount",
    discountValue: "$200",
    effectiveDate: "2023-09-01",
    expiryDate: "2024-08-31",
    status: "Active",
    assignedBy: "Admin User",
    assignedDate: "2023-08-20",
  },
]

export function StudentDiscountAssignment() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false)
  const [isIndividualDialogOpen, setIsIndividualDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map((student) => student.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  const handleIndividualAssign = (student?: (typeof students)[0]) => {
    if (student) {
      setSelectedStudent(student)
    } else if (selectedStudents.length === 1) {
      const student = students.find((s) => s.id === selectedStudents[0]) || null
      setSelectedStudent(student)
    } else {
      setSelectedStudent(null)
    }
    setIsIndividualDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Select Students</TabsTrigger>
          <TabsTrigger value="assignments">Current Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Student Selection</CardTitle>
              <CardDescription>Select students to assign discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentSelectionTools
                selectedCount={selectedStudents.length}
                onBulkAssign={() => setIsBulkDialogOpen(true)}
                onIndividualAssign={() => handleIndividualAssign()}
              />

              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6 mt-4">
                <div className="flex-1 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students by name, ID..." className="pl-8" />
                  </div>
                </div>
                <div className="w-full md:w-1/5">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Class/Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="grade8">Grade 8</SelectItem>
                      <SelectItem value="grade9">Grade 9</SelectItem>
                      <SelectItem value="grade10">Grade 10</SelectItem>
                      <SelectItem value="grade11">Grade 11</SelectItem>
                      <SelectItem value="grade12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-1/5">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      <SelectItem value="a">Section A</SelectItem>
                      <SelectItem value="b">Section B</SelectItem>
                      <SelectItem value="c">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-1/5">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Discount Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="with">With Discounts</SelectItem>
                      <SelectItem value="without">Without Discounts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                      </TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Current Discounts</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className={selectedStudents.includes(student.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => handleSelectStudent(student.id)}
                          />
                        </TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.section}</TableCell>
                        <TableCell>
                          {student.currentDiscounts.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {student.currentDiscounts.map((discount, idx) => (
                                <Badge key={idx} variant="outline" className="border-[#8c57ff] text-[#8c57ff]">
                                  {discount.name}: {discount.value}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">No discounts</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleIndividualAssign(student)}>
                            <Plus className="h-4 w-4 mr-1" /> Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Discount Assignments</CardTitle>
                  <CardDescription>View and manage all discount assignments</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search assignments..." className="pl-8" />
                  </div>
                </div>
                <div className="w-full md:w-1/4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Discount Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sibling">Sibling Discount</SelectItem>
                      <SelectItem value="merit">Merit Scholarship</SelectItem>
                      <SelectItem value="staff">Staff Discount</SelectItem>
                      <SelectItem value="financial">Financial Aid</SelectItem>
                      <SelectItem value="early">Early Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-1/4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Effective Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.studentName}</div>
                            <div className="text-xs text-muted-foreground">{assignment.studentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{assignment.class}</TableCell>
                        <TableCell>{assignment.discountName}</TableCell>
                        <TableCell>{assignment.discountValue}</TableCell>
                        <TableCell>{assignment.effectiveDate}</TableCell>
                        <TableCell>{assignment.expiryDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              assignment.status === "Active"
                                ? "border-green-500 text-green-500"
                                : assignment.status === "Pending"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-red-500 text-red-500"
                            }
                          >
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BulkAssignmentDialog
        open={isBulkDialogOpen}
        onOpenChange={setIsBulkDialogOpen}
        selectedCount={selectedStudents.length}
      />

      <IndividualAssignmentDialog
        open={isIndividualDialogOpen}
        onOpenChange={setIsIndividualDialogOpen}
        student={selectedStudent}
      />
    </div>
  )
}
