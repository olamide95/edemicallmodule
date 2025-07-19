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
import { Search, Plus, Calendar } from "lucide-react"

// Sample data
const refunds = [
  {
    id: 1,
    studentName: "Oliver Wilson",
    studentId: "STU-10049",
    class: "Grade 11A",
    refundAmount: "$350.00",
    requestDate: "2023-05-12",
    processedDate: "2023-05-15",
    paymentMethod: "Bank Transfer",
    reason: "Withdrawal from school",
    status: "Completed",
  },
  {
    id: 2,
    studentName: "Ava Martinez",
    studentId: "STU-10050",
    class: "Grade 8B",
    refundAmount: "$250.00",
    requestDate: "2023-05-10",
    processedDate: "",
    paymentMethod: "Bank Transfer",
    reason: "Overpayment refund",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Noah Thompson",
    studentId: "STU-10051",
    class: "Grade 12C",
    refundAmount: "$500.00",
    requestDate: "2023-05-08",
    processedDate: "2023-05-11",
    paymentMethod: "Check",
    reason: "Course cancellation",
    status: "Completed",
  },
  {
    id: 4,
    studentName: "Isabella Garcia",
    studentId: "STU-10052",
    class: "Grade 9D",
    refundAmount: "$175.00",
    requestDate: "2023-05-05",
    processedDate: "",
    paymentMethod: "Original Payment Method",
    reason: "Fee adjustment",
    status: "Rejected",
  },
]

export function RefundList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentRefund, setCurrentRefund] = useState<any>(null)

  const handleAddRefund = () => {
    setCurrentRefund({
      studentName: "",
      studentId: "",
      class: "",
      refundAmount: "",
      paymentMethod: "Bank Transfer",
      reason: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the refund to the database
    setIsDialogOpen(false)
  }

  const filteredRefunds = refunds.filter((refund) => {
    const matchesSearch =
      refund.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || refund.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

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
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={currentRefund?.studentId || ""}
                      onChange={(e) => setCurrentRefund({ ...currentRefund, studentId: e.target.value })}
                      placeholder="e.g. STU-10045"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={currentRefund?.studentName || ""}
                      onChange={(e) => setCurrentRefund({ ...currentRefund, studentName: e.target.value })}
                      placeholder="e.g. John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={currentRefund?.class || ""}
                      onValueChange={(value) => setCurrentRefund({ ...currentRefund, class: value })}
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
                          <Button variant="outline" size="sm" className="text-success border-success">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-error border-error">
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
