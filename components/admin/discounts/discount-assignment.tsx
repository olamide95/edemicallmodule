"use client"

import type React from "react"

import { useState } from "react"
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
import { Search, Plus, Pencil, Filter } from "lucide-react"

// Sample data
const discountAssignments = [
  {
    id: 1,
    studentName: "Alex Smith",
    studentId: "STU-10045",
    class: "Grade 10A",
    discountType: "Sibling Discount",
    discountValue: "15%",
    originalFees: "$2,650.00",
    discountedAmount: "$397.50",
    finalFees: "$2,252.50",
    reason: "Second child in family",
    status: "Active",
  },
  {
    id: 2,
    studentName: "Emma Johnson",
    studentId: "STU-10046",
    class: "Grade 9B",
    discountType: "Merit Scholarship",
    discountValue: "25%",
    originalFees: "$2,500.00",
    discountedAmount: "$625.00",
    finalFees: "$1,875.00",
    reason: "Academic excellence - Top 5% of class",
    status: "Active",
  },
  {
    id: 3,
    studentName: "James Brown",
    studentId: "STU-10047",
    class: "Grade 8C",
    discountType: "Staff Discount",
    discountValue: "50%",
    originalFees: "$2,300.00",
    discountedAmount: "$1,150.00",
    finalFees: "$1,150.00",
    reason: "Child of Mathematics teacher",
    status: "Active",
  },
  {
    id: 4,
    studentName: "Sophia Davis",
    studentId: "STU-10048",
    class: "Grade 7A",
    discountType: "Financial Aid",
    discountValue: "35%",
    originalFees: "$2,150.00",
    discountedAmount: "$752.50",
    finalFees: "$1,397.50",
    reason: "Need-based financial assistance",
    status: "Pending Approval",
  },
]

export function DiscountAssignment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [discountFilter, setDiscountFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAssignment, setCurrentAssignment] = useState<any>(null)

  const handleAddEdit = (assignment: any = null) => {
    setCurrentAssignment(
      assignment || {
        studentName: "",
        studentId: "",
        class: "",
        discountType: "",
        discountValue: "",
        originalFees: "",
        discountedAmount: "",
        finalFees: "",
        reason: "",
        status: "Pending Approval",
      },
    )
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the assignment to the database
    setIsDialogOpen(false)
  }

  const filteredAssignments = discountAssignments.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDiscount =
      discountFilter === "all" || item.discountType.toLowerCase().includes(discountFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesDiscount
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Discount Assignments</CardTitle>
            <CardDescription>Manage discount assignments for students</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleAddEdit()}>
                <Plus className="h-4 w-4 mr-2" />
                Assign Discount
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>{currentAssignment?.id ? "Edit" : "New"} Discount Assignment</DialogTitle>
                  <DialogDescription>
                    {currentAssignment?.id
                      ? "Update discount assignment for this student"
                      : "Assign a discount to a student"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={currentAssignment?.studentId || ""}
                      onChange={(e) => setCurrentAssignment({ ...currentAssignment, studentId: e.target.value })}
                      placeholder="e.g. STU-10045"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={currentAssignment?.studentName || ""}
                      onChange={(e) => setCurrentAssignment({ ...currentAssignment, studentName: e.target.value })}
                      placeholder="e.g. John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={currentAssignment?.class || ""}
                      onValueChange={(value) => setCurrentAssignment({ ...currentAssignment, class: value })}
                    >
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                        <SelectItem value="Grade 9B">Grade 9B</SelectItem>
                        <SelectItem value="Grade 8C">Grade 8C</SelectItem>
                        <SelectItem value="Grade 7A">Grade 7A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select
                      value={currentAssignment?.discountType || ""}
                      onValueChange={(value) => setCurrentAssignment({ ...currentAssignment, discountType: value })}
                    >
                      <SelectTrigger id="discountType">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sibling Discount">Sibling Discount (15%)</SelectItem>
                        <SelectItem value="Staff Discount">Staff Discount (50%)</SelectItem>
                        <SelectItem value="Merit Scholarship">Merit Scholarship (25%)</SelectItem>
                        <SelectItem value="Financial Aid">Financial Aid (Variable)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountValue">Discount Value</Label>
                    <Input
                      id="discountValue"
                      value={currentAssignment?.discountValue || ""}
                      onChange={(e) => setCurrentAssignment({ ...currentAssignment, discountValue: e.target.value })}
                      placeholder="e.g. 15%"
                    />
                    <p className="text-xs text-muted-foreground">
                      For variable discounts like Financial Aid, specify the exact percentage
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalFees">Original Fees</Label>
                    <Input
                      id="originalFees"
                      value={currentAssignment?.originalFees || ""}
                      onChange={(e) => setCurrentAssignment({ ...currentAssignment, originalFees: e.target.value })}
                      placeholder="$0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Discount</Label>
                    <Textarea
                      id="reason"
                      value={currentAssignment?.reason || ""}
                      onChange={(e) => setCurrentAssignment({ ...currentAssignment, reason: e.target.value })}
                      placeholder="Explain why this discount is being applied"
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
                  <SelectItem value="pending approval">Pending Approval</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="discount">Discount Type</Label>
              <Select value={discountFilter} onValueChange={setDiscountFilter}>
                <SelectTrigger id="discount" className="w-full">
                  <SelectValue placeholder="Filter by discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Discounts</SelectItem>
                  <SelectItem value="sibling">Sibling Discount</SelectItem>
                  <SelectItem value="staff">Staff Discount</SelectItem>
                  <SelectItem value="merit">Merit Scholarship</SelectItem>
                  <SelectItem value="financial">Financial Aid</SelectItem>
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
                <TableHead>Student</TableHead>
                <TableHead>Discount Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Original Fees</TableHead>
                <TableHead>Discounted Amount</TableHead>
                <TableHead>Final Fees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {assignment.studentId} | {assignment.class}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.discountType}</TableCell>
                  <TableCell>{assignment.discountValue}</TableCell>
                  <TableCell>{assignment.originalFees}</TableCell>
                  <TableCell className="text-primary">{assignment.discountedAmount}</TableCell>
                  <TableCell className="font-medium">{assignment.finalFees}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        assignment.status === "Active"
                          ? "border-success text-success"
                          : assignment.status === "Pending Approval"
                            ? "border-warning text-warning"
                            : "border-error text-error"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleAddEdit(assignment)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {assignment.status === "Pending Approval" && (
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No discount assignments found matching your filters.
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
