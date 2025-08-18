"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Calendar } from "lucide-react"

// Local storage keys
const STORAGE_KEYS = {
  CREDITS: "studentCredits",
  REFUNDS: "studentRefunds",
  CLASSES: "classes",
  STUDENTS: "admissionFormResponses"
}

interface Student {
  id: string
  firstName: string
  lastName: string
  class: string
  status: string
  admissionNumber?: string
}

interface Credit {
  id: string
  studentId: string
  studentName: string
  class: string
  creditAmount: string
  remainingCredit: string
  creditDate: string
  expiryDate: string
  source: string
  reason: string
  status: "Active" | "Used" | "Expired"
}

interface Refund {
  id: string
  studentId: string
  studentName: string
  class: string
  refundAmount: string
  requestDate: string
  processedDate: string
  paymentMethod: string
  reason: string
  status: "Pending" | "Completed" | "Rejected"
}

export function CreditList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCredit, setCurrentCredit] = useState<Partial<Credit>>()
  const [credits, setCredits] = useState<Credit[]>([])
  const [classes, setClasses] = useState<{label: string, value: string}[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState("")
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load credits
      const savedCredits = localStorage.getItem(STORAGE_KEYS.CREDITS)
      if (savedCredits) {
        setCredits(JSON.parse(savedCredits))
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

  // Filter students based on selected class
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(student => 
        student.class.toLowerCase() === selectedClass.toLowerCase()
      )
      setFilteredStudents(filtered)
    } else {
      setFilteredStudents([])
    }
  }, [selectedClass, students])

  const handleAddCredit = () => {
    setCurrentCredit({
      id: Date.now().toString(),
      studentId: "",
      studentName: "",
      class: "",
      creditAmount: "",
      remainingCredit: "",
      creditDate: new Date().toISOString().split('T')[0],
      expiryDate: "",
      source: "Overpayment",
      reason: "",
      status: "Active"
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentCredit) return
    
    // Set remaining credit same as credit amount initially
    const newCredit = {
      ...currentCredit,
      remainingCredit: currentCredit.creditAmount || "0",
      creditDate: new Date().toISOString().split('T')[0]
    } as Credit
    
    const updatedCredits = [...credits, newCredit]
    setCredits(updatedCredits)
    localStorage.setItem(STORAGE_KEYS.CREDITS, JSON.stringify(updatedCredits))
    setIsDialogOpen(false)
  }

  const handleStudentSelect = (studentId: string) => {
    const selectedStudent = students.find(s => s.id === studentId)
    if (selectedStudent) {
      setCurrentCredit(prev => ({
        ...prev,
        studentId: selectedStudent.id,
        studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
        class: selectedStudent.class
      }))
    }
  }

  const filteredCredits = useMemo(() => {
    return credits.filter((credit) => {
      const matchesSearch =
        credit.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.studentId.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || credit.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [credits, searchTerm, statusFilter])

  const totalRemainingCredit = useMemo(() => {
    return filteredCredits.reduce((sum, credit) => {
      return sum + Number.parseFloat(credit.remainingCredit.replace("$", "").replace(",", ""))
    }, 0)
  }, [filteredCredits])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Credit Management</CardTitle>
            <CardDescription>Manage student credit balances</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddCredit}>
                <Plus className="h-4 w-4 mr-2" />
                Add Credit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>Add Credit</DialogTitle>
                  <DialogDescription>Add a credit to a student's account</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={selectedClass}
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value}>
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedClass && (
                    <div className="space-y-2">
                      <Label htmlFor="student">Student</Label>
                      <Select
                        onValueChange={handleStudentSelect}
                      >
                        <SelectTrigger id="student">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredStudents.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName} ({student.admissionNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="creditAmount">Credit Amount</Label>
                    <Input
                      id="creditAmount"
                      value={currentCredit?.creditAmount || ""}
                      onChange={(e) => setCurrentCredit({ ...currentCredit, creditAmount: e.target.value })}
                      placeholder="$0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">Credit Source</Label>
                    <Select
                      value={currentCredit?.source || ""}
                      onValueChange={(value) => setCurrentCredit({ ...currentCredit, source: value })}
                    >
                      <SelectTrigger id="source">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Overpayment">Overpayment</SelectItem>
                        <SelectItem value="Fee Adjustment">Fee Adjustment</SelectItem>
                        <SelectItem value="Course Withdrawal">Course Withdrawal</SelectItem>
                        <SelectItem value="Manual Credit">Manual Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={currentCredit?.expiryDate || ""}
                      onChange={(e) => setCurrentCredit({ ...currentCredit, expiryDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      value={currentCredit?.reason || ""}
                      onChange={(e) => setCurrentCredit({ ...currentCredit, reason: e.target.value })}
                      placeholder="Explain the reason for this credit"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border mb-6">
            <div className="flex flex-col md:flex-row justify-between p-4 bg-info-light">
              <div>
                <h3 className="font-semibold text-info">Total Available Credit</h3>
                <p className="text-2xl font-bold text-info">${totalRemainingCredit.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-info">Total Credit Records</h3>
                <p className="text-2xl font-bold text-info">{filteredCredits.length}</p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Credit Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Credit Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCredits.map((credit) => (
                <TableRow key={credit.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{credit.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {credit.studentId} | {credit.class}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{credit.creditAmount}</TableCell>
                  <TableCell className="font-medium">{credit.remainingCredit}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {credit.creditDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {credit.expiryDate}
                    </div>
                  </TableCell>
                  <TableCell>{credit.source}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        credit.status === "Active"
                          ? "border-success text-success"
                          : credit.status === "Used"
                            ? "border-info text-info"
                            : "border-error text-error"
                      }
                    >
                      {credit.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {credit.status === "Active" && (
                        <Button variant="outline" size="sm">
                          Convert to Refund
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCredits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No credits found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export function RefundList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentRefund, setCurrentRefund] = useState<Partial<Refund>>()
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [classes, setClasses] = useState<{label: string, value: string}[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedClass, setSelectedClass] = useState("")
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [credits, setCredits] = useState<Credit[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load refunds
      const savedRefunds = localStorage.getItem(STORAGE_KEYS.REFUNDS)
      if (savedRefunds) {
        setRefunds(JSON.parse(savedRefunds))
      }

      // Load credits
      const savedCredits = localStorage.getItem(STORAGE_KEYS.CREDITS)
      if (savedCredits) {
        setCredits(JSON.parse(savedCredits))
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

  // Filter students based on selected class
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(student => 
        student.class.toLowerCase() === selectedClass.toLowerCase()
      )
      setFilteredStudents(filtered)
    } else {
      setFilteredStudents([])
    }
  }, [selectedClass, students])

  const handleAddRefund = () => {
    setCurrentRefund({
      id: Date.now().toString(),
      studentId: "",
      studentName: "",
      class: "",
      refundAmount: "",
      requestDate: new Date().toISOString().split('T')[0],
      processedDate: "",
      paymentMethod: "Bank Transfer",
      reason: "",
      status: "Pending"
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentRefund) return
    
    const newRefund = {
      ...currentRefund,
      requestDate: new Date().toISOString().split('T')[0]
    } as Refund
    
    const updatedRefunds = [...refunds, newRefund]
    setRefunds(updatedRefunds)
    localStorage.setItem(STORAGE_KEYS.REFUNDS, JSON.stringify(updatedRefunds))
    
    // If refund source is credit, update the credit balance
    if (currentRefund.paymentMethod === "Credit Balance") {
      const studentCredits = credits.filter(c => c.studentId === currentRefund.studentId && c.status === "Active")
      if (studentCredits.length > 0) {
        const updatedCredits = credits.map(credit => {
          if (credit.studentId === currentRefund.studentId && credit.status === "Active") {
            const remaining = parseFloat(credit.remainingCredit.replace("$", "")) - parseFloat(currentRefund.refundAmount?.replace("$", "") || "0")
            return {
              ...credit,
              remainingCredit: `$${remaining.toFixed(2)}`,
              status: remaining <= 0 ? "Used" : "Active"
            }
          }
          return credit
        })
        setCredits(updatedCredits)
        localStorage.setItem(STORAGE_KEYS.CREDITS, JSON.stringify(updatedCredits))
      }
    }
    
    setIsDialogOpen(false)
  }

  const handleStudentSelect = (studentId: string) => {
    const selectedStudent = students.find(s => s.id === studentId)
    if (selectedStudent) {
      setCurrentRefund(prev => ({
        ...prev,
        studentId: selectedStudent.id,
        studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
        class: selectedStudent.class
      }))
    }
  }

  const filteredRefunds = useMemo(() => {
    return refunds.filter((refund) => {
      const matchesSearch =
        refund.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refund.studentId.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || refund.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [refunds, searchTerm, statusFilter])

  const getAvailableCredit = (studentId: string) => {
    const studentCredits = credits.filter(c => c.studentId === studentId && c.status === "Active")
    return studentCredits.reduce((sum, credit) => {
      return sum + Number.parseFloat(credit.remainingCredit.replace("$", "").replace(",", ""))
    }, 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Refund Management</CardTitle>
            <CardDescription>Process and track student refunds</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddRefund}>
                <Plus className="h-4 w-4 mr-2" />
                New Refund
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>Process Refund</DialogTitle>
                  <DialogDescription>Process a refund for a student</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={selectedClass}
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value}>
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedClass && (
                    <div className="space-y-2">
                      <Label htmlFor="student">Student</Label>
                      <Select
                        onValueChange={handleStudentSelect}
                      >
                        <SelectTrigger id="student">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredStudents.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.firstName} {student.lastName} ({student.admissionNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {currentRefund?.studentId && (
                    <div className="space-y-2">
                      <Label>Available Credit</Label>
                      <div className="p-2 border rounded-md">
                        ${getAvailableCredit(currentRefund.studentId).toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="refundAmount">Refund Amount</Label>
                    <Input
                      id="refundAmount"
                      value={currentRefund?.refundAmount || ""}
                      onChange={(e) => setCurrentRefund({ ...currentRefund, refundAmount: e.target.value })}
                      placeholder="$0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={currentRefund?.paymentMethod || ""}
                      onValueChange={(value) => setCurrentRefund({ ...currentRefund, paymentMethod: value })}
                    >
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Original Payment Method">Original Payment Method</SelectItem>
                        <SelectItem value="Credit Balance">Add to Credit Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Refund</Label>
                    <Textarea
                      id="reason"
                      value={currentRefund?.reason || ""}
                      onChange={(e) => setCurrentRefund({ ...currentRefund, reason: e.target.value })}
                      placeholder="Explain the reason for this refund"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Process Refund</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Refund Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Processed Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRefunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{refund.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {refund.studentId} | {refund.class}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{refund.refundAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {refund.requestDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {refund.processedDate ? (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {refund.processedDate}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{refund.paymentMethod}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={refund.reason}>
                      {refund.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        refund.status === "Completed"
                          ? "border-success text-success"
                          : refund.status === "Pending"
                            ? "border-warning text-warning"
                            : "border-error text-error"
                      }
                    >
                      {refund.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {refund.status === "Pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-success border-success"
                            onClick={() => {
                              const updatedRefunds = refunds.map(r => 
                                r.id === refund.id ? {...r, status: "Completed", processedDate: new Date().toISOString().split('T')[0]} : r
                              )
                              setRefunds(updatedRefunds)
                              localStorage.setItem(STORAGE_KEYS.REFUNDS, JSON.stringify(updatedRefunds))
                            }}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-error border-error"
                            onClick={() => {
                              const updatedRefunds = refunds.map(r => 
                                r.id === refund.id ? {...r, status: "Rejected", processedDate: new Date().toISOString().split('T')[0]} : r
                              )
                              setRefunds(updatedRefunds)
                              localStorage.setItem(STORAGE_KEYS.REFUNDS, JSON.stringify(updatedRefunds))
                            }}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRefunds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No refunds found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}