"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calendar, Filter, Eye } from "lucide-react"

// Sample data
const students = [
  {
    id: 1,
    name: "Alex Smith",
    studentId: "STU-10045",
    class: "Grade 10A",
    balance: "$1,300.00",
    status: "Outstanding",
  },
  {
    id: 2,
    name: "Emma Johnson",
    studentId: "STU-10046",
    class: "Grade 9B",
    balance: "$700.00",
    status: "Outstanding",
  },
  {
    id: 3,
    name: "James Brown",
    studentId: "STU-10047",
    class: "Grade 8C",
    balance: "$0.00",
    status: "Paid",
  },
  {
    id: 4,
    name: "Sophia Davis",
    studentId: "STU-10048",
    class: "Grade 7A",
    balance: "$0.00",
    status: "Paid",
  },
]

const statementTransactions = [
  {
    id: 1,
    date: "2023-04-15",
    description: "Tuition Fee - Term 1",
    type: "Invoice",
    reference: "INV-2023-001",
    debit: "$2,650.00",
    credit: "$0.00",
    balance: "$2,650.00",
  },
  {
    id: 2,
    date: "2023-05-10",
    description: "Payment - Bank Transfer",
    type: "Payment",
    reference: "RCT-10045",
    debit: "$0.00",
    credit: "$1,200.00",
    balance: "$1,450.00",
  },
  {
    id: 3,
    date: "2023-05-20",
    description: "Late Payment Fine",
    type: "Fine",
    reference: "FIN-2023-001",
    debit: "$50.00",
    credit: "$0.00",
    balance: "$1,500.00",
  },
  {
    id: 4,
    date: "2023-05-25",
    description: "Sibling Discount Applied",
    type: "Discount",
    reference: "DIS-2023-001",
    debit: "$0.00",
    credit: "$200.00",
    balance: "$1,300.00",
  },
]

export function StatementGenerator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [dateRange, setDateRange] = useState({
    from: "2023-01-01",
    to: "2023-12-31",
  })

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesClass = classFilter === "all" || student.class.includes(classFilter)
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesClass && matchesStatus
  })

  const handleViewStatement = (student: any) => {
    setSelectedStudent(student)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Statement Generator</CardTitle>
          <CardDescription>Generate financial statements for students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by student name or ID"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger id="class" className="w-full">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="outstanding">Outstanding</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-auto flex items-end">
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell className="font-medium">{student.balance}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={student.status === "Paid" ? "border-success text-success" : "border-error text-error"}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewStatement(student)}>
                      View Statement
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No students found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedStudent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Statement for {selectedStudent.name}</CardTitle>
              <CardDescription>
                {selectedStudent.studentId} | {selectedStudent.class}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="from" className="text-xs">
                    From
                  </Label>
                  <Input
                    id="from"
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="to" className="text-xs">
                    To
                  </Label>
                  <Input
                    id="to"
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-table-header">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Debit</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statementTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {transaction.date}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          transaction.type === "Payment" || transaction.type === "Discount"
                            ? "border-success text-success"
                            : transaction.type === "Fine"
                              ? "border-error text-error"
                              : "border-primary text-primary"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell className={transaction.debit !== "$0.00" ? "text-error" : ""}>
                      {transaction.debit}
                    </TableCell>
                    <TableCell className={transaction.credit !== "$0.00" ? "text-success" : ""}>
                      {transaction.credit}
                    </TableCell>
                    <TableCell className="font-medium">{transaction.balance}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Opening Balance:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Debits:</span>
                  <span className="text-error">$2,700.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Credits:</span>
                  <span className="text-success">$1,400.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Closing Balance:</span>
                  <span>$1,300.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
