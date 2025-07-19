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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Calendar } from "lucide-react"

// Sample data
const waivers = [
  {
    id: 1,
    studentName: "Emma Johnson",
    studentId: "STU-10046",
    class: "Grade 9B",
    invoiceNumber: "INV-2023-002",
    originalFine: "$93.75",
    waivedAmount: "$93.75",
    waivedBy: "John Admin",
    waivedDate: "2023-05-20",
    reason: "Parent requested extension due to financial hardship",
    status: "Approved",
  },
  {
    id: 2,
    studentName: "Oliver Wilson",
    studentId: "STU-10049",
    class: "Grade 11A",
    invoiceNumber: "INV-2023-005",
    originalFine: "$125.00",
    waivedAmount: "$125.00",
    waivedBy: "Sarah Manager",
    waivedDate: "2023-05-18",
    reason: "Payment delay due to bank processing error",
    status: "Approved",
  },
  {
    id: 3,
    studentName: "Ava Martinez",
    studentId: "STU-10050",
    class: "Grade 8B",
    invoiceNumber: "INV-2023-006",
    originalFine: "$75.00",
    waivedAmount: "$37.50",
    waivedBy: "John Admin",
    waivedDate: "2023-05-22",
    reason: "Partial waiver due to first-time late payment",
    status: "Approved",
  },
]

export function FineWaivers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentWaiver, setCurrentWaiver] = useState<any>(null)

  const handleAddWaiver = () => {
    setCurrentWaiver({
      studentName: "",
      studentId: "",
      class: "",
      invoiceNumber: "",
      originalFine: "",
      waivedAmount: "",
      reason: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the waiver to the database
    setIsDialogOpen(false)
  }

  const filteredWaivers = waivers.filter(
    (waiver) =>
      waiver.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waiver.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waiver.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Fine Waivers</CardTitle>
            <CardDescription>View and manage fine waiver requests</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddWaiver}>
                <Plus className="h-4 w-4 mr-2" />
                New Waiver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>Create Fine Waiver</DialogTitle>
                  <DialogDescription>Waive a fine for a student</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={currentWaiver?.studentId || ""}
                      onChange={(e) => setCurrentWaiver({ ...currentWaiver, studentId: e.target.value })}
                      placeholder="e.g. STU-10045"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Select
                      value={currentWaiver?.invoiceNumber || ""}
                      onValueChange={(value) => setCurrentWaiver({ ...currentWaiver, invoiceNumber: value })}
                    >
                      <SelectTrigger id="invoiceNumber">
                        <SelectValue placeholder="Select invoice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INV-2023-001">INV-2023-001 ($132.50 fine)</SelectItem>
                        <SelectItem value="INV-2023-004">INV-2023-004 ($50.00 fine)</SelectItem>
                        <SelectItem value="INV-2023-007">INV-2023-007 ($75.00 fine)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waivedAmount">Waived Amount</Label>
                    <Input
                      id="waivedAmount"
                      value={currentWaiver?.waivedAmount || ""}
                      onChange={(e) => setCurrentWaiver({ ...currentWaiver, waivedAmount: e.target.value })}
                      placeholder="$0.00"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the full amount to waive completely, or a partial amount
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Waiver</Label>
                    <Textarea
                      id="reason"
                      value={currentWaiver?.reason || ""}
                      onChange={(e) => setCurrentWaiver({ ...currentWaiver, reason: e.target.value })}
                      placeholder="Explain why this fine is being waived"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Waiver</Button>
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
                  placeholder="Search by student name, ID or invoice number"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Original Fine</TableHead>
                <TableHead>Waived Amount</TableHead>
                <TableHead>Waived By</TableHead>
                <TableHead>Waived Date</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWaivers.map((waiver) => (
                <TableRow key={waiver.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=32&width=32&query=${waiver.studentName}`}
                          alt={waiver.studentName}
                        />
                        <AvatarFallback>{waiver.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{waiver.studentName}</div>
                        <div className="text-xs text-muted-foreground">
                          {waiver.studentId} | {waiver.class}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{waiver.invoiceNumber}</TableCell>
                  <TableCell>{waiver.originalFine}</TableCell>
                  <TableCell className="font-medium">{waiver.waivedAmount}</TableCell>
                  <TableCell>{waiver.waivedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {waiver.waivedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={waiver.reason}>
                      {waiver.reason}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredWaivers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No waivers found matching your search.
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
