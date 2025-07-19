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
const credits = [
  {
    id: 1,
    studentName: "Alex Smith",
    studentId: "STU-10045",
    class: "Grade 10A",
    creditAmount: "$250.00",
    remainingCredit: "$250.00",
    creditDate: "2023-05-15",
    expiryDate: "2024-05-15",
    source: "Overpayment",
    reason: "Overpayment on invoice INV-2023-001",
    status: "Active",
  },
  {
    id: 2,
    studentName: "Emma Johnson",
    studentId: "STU-10046",
    class: "Grade 9B",
    creditAmount: "$500.00",
    remainingCredit: "$350.00",
    creditDate: "2023-04-20",
    expiryDate: "2024-04-20",
    source: "Fee Adjustment",
    reason: "Scholarship award adjustment",
    status: "Active",
  },
  {
    id: 3,
    studentName: "James Brown",
    studentId: "STU-10047",
    class: "Grade 8C",
    creditAmount: "$150.00",
    remainingCredit: "$0.00",
    creditDate: "2023-03-10",
    expiryDate: "2024-03-10",
    source: "Overpayment",
    reason: "Overpayment on invoice INV-2023-003",
    status: "Used",
  },
  {
    id: 4,
    studentName: "Sophia Davis",
    studentId: "STU-10048",
    class: "Grade 7A",
    creditAmount: "$300.00",
    remainingCredit: "$300.00",
    creditDate: "2023-05-05",
    expiryDate: "2024-05-05",
    source: "Fee Adjustment",
    reason: "Course withdrawal refund",
    status: "Active",
  },
]

export function CreditList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCredit, setCurrentCredit] = useState<any>(null)

  const handleAddCredit = () => {
    setCurrentCredit({
      studentName: "",
      studentId: "",
      class: "",
      creditAmount: "",
      expiryDate: "",
      source: "Overpayment",
      reason: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the credit to the database
    setIsDialogOpen(false)
  }

  const filteredCredits = credits.filter((credit) => {
    const matchesSearch =
      credit.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || credit.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const totalRemainingCredit = filteredCredits.reduce((sum, credit) => {
    return sum + Number.parseFloat(credit.remainingCredit.replace("$", "").replace(",", ""))
  }, 0)

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
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={currentCredit?.studentId || ""}
                      onChange={(e) => setCurrentCredit({ ...currentCredit, studentId: e.target.value })}
                      placeholder="e.g. STU-10045"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={currentCredit?.studentName || ""}
                      onChange={(e) => setCurrentCredit({ ...currentCredit, studentName: e.target.value })}
                      placeholder="e.g. John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={currentCredit?.class || ""}
                      onValueChange={(value) => setCurrentCredit({ ...currentCredit, class: value })}
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
