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
import { Search, Plus, Calendar, Download, Eye } from "lucide-react"

// Sample data
const writeOffs = [
  {
    id: 1,
    studentName: "Noah Thompson",
    studentId: "STU-10051",
    class: "Grade 12C",
    invoiceNumber: "INV-2022-051",
    originalAmount: "$2,800.00",
    writeOffAmount: "$800.00",
    remainingAmount: "$2,000.00",
    writeOffDate: "2023-04-15",
    approvedBy: "Principal",
    reason: "Financial hardship - Family lost primary income source",
    status: "Approved",
  },
  {
    id: 2,
    studentName: "Isabella Garcia",
    studentId: "STU-10052",
    class: "Grade 9D",
    invoiceNumber: "INV-2022-052",
    originalAmount: "$2,500.00",
    writeOffAmount: "$500.00",
    remainingAmount: "$2,000.00",
    writeOffDate: "2023-04-20",
    approvedBy: "Finance Committee",
    reason: "Partial scholarship awarded mid-term",
    status: "Approved",
  },
  {
    id: 3,
    studentName: "Ethan Williams",
    studentId: "STU-10053",
    class: "Grade 11B",
    invoiceNumber: "INV-2022-053",
    originalAmount: "$2,700.00",
    writeOffAmount: "$1,350.00",
    remainingAmount: "$1,350.00",
    writeOffDate: "2023-05-01",
    approvedBy: "",
    reason: "Student relocating due to parent's job transfer",
    status: "Pending Approval",
  },
  {
    id: 4,
    studentName: "Sophia Lee",
    studentId: "STU-10054",
    class: "Grade 10C",
    invoiceNumber: "INV-2022-054",
    originalAmount: "$2,600.00",
    writeOffAmount: "$650.00",
    remainingAmount: "$1,950.00",
    writeOffDate: "2023-04-25",
    approvedBy: "",
    reason: "Medical emergency in family",
    status: "Rejected",
  },
]

export function WriteOffList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentWriteOff, setCurrentWriteOff] = useState<any>(null)

  const handleAddWriteOff = () => {
    setCurrentWriteOff({
      studentName: "",
      studentId: "",
      class: "",
      invoiceNumber: "",
      originalAmount: "",
      writeOffAmount: "",
      remainingAmount: "",
      reason: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the write-off to the database
    setIsDialogOpen(false)
  }

  const filteredWriteOffs = writeOffs.filter((writeOff) => {
    const matchesSearch =
      writeOff.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      writeOff.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      writeOff.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || writeOff.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const totalWriteOffAmount = filteredWriteOffs.reduce((sum, writeOff) => {
    return sum + Number.parseFloat(writeOff.writeOffAmount.replace("$", "").replace(",", ""))
  }, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Write-Off Management</CardTitle>
            <CardDescription>Manage and track fee write-offs</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddWriteOff}>
                <Plus className="h-4 w-4 mr-2" />
                New Write-Off
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>Create Write-Off</DialogTitle>
                  <DialogDescription>Create a new fee write-off request</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={currentWriteOff?.studentId || ""}
                      onChange={(e) => setCurrentWriteOff({ ...currentWriteOff, studentId: e.target.value })}
                      placeholder="e.g. STU-10045"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Select
                      value={currentWriteOff?.invoiceNumber || ""}
                      onValueChange={(value) => setCurrentWriteOff({ ...currentWriteOff, invoiceNumber: value })}
                    >
                      <SelectTrigger id="invoiceNumber">
                        <SelectValue placeholder="Select invoice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INV-2023-001">INV-2023-001 ($2,650.00)</SelectItem>
                        <SelectItem value="INV-2023-002">INV-2023-002 ($1,875.00)</SelectItem>
                        <SelectItem value="INV-2023-003">INV-2023-003 ($1,150.00)</SelectItem>
                        <SelectItem value="INV-2023-004">INV-2023-004 ($2,150.00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="writeOffAmount">Write-Off Amount</Label>
                    <Input
                      id="writeOffAmount"
                      value={currentWriteOff?.writeOffAmount || ""}
                      onChange={(e) => setCurrentWriteOff({ ...currentWriteOff, writeOffAmount: e.target.value })}
                      placeholder="$0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Write-Off</Label>
                    <Textarea
                      id="reason"
                      value={currentWriteOff?.reason || ""}
                      onChange={(e) => setCurrentWriteOff({ ...currentWriteOff, reason: e.target.value })}
                      placeholder="Explain the reason for this write-off"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit for Approval</Button>
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
                  placeholder="Search by student name, ID or invoice"
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
                  <SelectItem value="pending approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border mb-6">
            <div className="flex flex-col md:flex-row justify-between p-4 bg-warning-light">
              <div>
                <h3 className="font-semibold text-warning">Total Write-Off Amount</h3>
                <p className="text-2xl font-bold text-warning">${totalWriteOffAmount.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-warning">Total Write-Offs</h3>
                <p className="text-2xl font-bold text-warning">{filteredWriteOffs.length}</p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Write-Off Amount</TableHead>
                <TableHead>Remaining Amount</TableHead>
                <TableHead>Write-Off Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWriteOffs.map((writeOff) => (
                <TableRow key={writeOff.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{writeOff.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {writeOff.studentId} | {writeOff.class}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{writeOff.invoiceNumber}</TableCell>
                  <TableCell>{writeOff.originalAmount}</TableCell>
                  <TableCell className="font-medium">{writeOff.writeOffAmount}</TableCell>
                  <TableCell>{writeOff.remainingAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {writeOff.writeOffDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        writeOff.status === "Approved"
                          ? "border-success text-success"
                          : writeOff.status === "Pending Approval"
                            ? "border-warning text-warning"
                            : "border-error text-error"
                      }
                    >
                      {writeOff.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {writeOff.status === "Pending Approval" && (
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
              {filteredWriteOffs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No write-offs found matching your filters.
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
