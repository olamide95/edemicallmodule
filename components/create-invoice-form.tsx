"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { SaveIcon } from "lucide-react"

// Mock data for clubs
const clubs = [{ id: 1, name: "Chess Club", students: 25, rate: 15000 }]

// Mock data for students
const students = [
  { id: 1, name: "John Doe", class: "JSS 3", attendance: 92 },
  { id: 2, name: "Jane Smith", class: "SSS 1", attendance: 100 },
  { id: 3, name: "Michael Johnson", class: "JSS 2", attendance: 85 },
  { id: 4, name: "Sarah Williams", class: "SSS 2", attendance: 78 },
  { id: 5, name: "Robert Brown", class: "JSS 1", attendance: 95 },
]

export function CreateInvoiceForm({ onClose }: { onClose: () => void }) {
  const [selectedClub, setSelectedClub] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("1st Term")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Calculate due date 30 days from invoice date by default
  useState(() => {
    if (invoiceDate) {
      const date = new Date(invoiceDate)
      date.setDate(date.getDate() + 30)
      setDueDate(date.toISOString().split("T")[0])
    }
  })

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedStudents(students.map((student) => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId])
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId))
    }
  }

  const calculateTotal = () => {
    if (!selectedClub) return 0

    const club = clubs.find((c) => c.id.toString() === selectedClub)
    if (!club) return 0

    return selectedStudents.length * club.rate
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the invoice data to the backend
    alert("Invoice created successfully!")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="club">Club</Label>
          <Select value={selectedClub} onValueChange={setSelectedClub}>
            <SelectTrigger>
              <SelectValue placeholder="Select a club" />
            </SelectTrigger>
            <SelectContent>
              {clubs.map((club) => (
                <SelectItem key={club.id} value={club.id.toString()}>
                  {club.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Term</Label>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st Term">1st Term</SelectItem>
              <SelectItem value="2nd Term">2nd Term</SelectItem>
              <SelectItem value="3rd Term">3rd Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice-date">Invoice Date</Label>
          <Input id="invoice-date" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date">Due Date</Label>
          <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional notes or payment instructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {selectedClub && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select Students</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectAll}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <Label htmlFor="select-all">Select All</Label>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const isSelected = selectedStudents.includes(student.id)
                  const club = clubs.find((c) => c.id.toString() === selectedClub)

                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="text-center">{student.attendance}%</TableCell>
                      <TableCell className="text-right">₦{club?.rate.toLocaleString()}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">Total Amount</p>
          <p className="text-3xl font-bold">₦{calculateTotal().toLocaleString()}</p>
        </div>
        <div className="space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={selectedStudents.length === 0}>
            <SaveIcon className="h-4 w-4 mr-1" />
            Create Invoice
          </Button>
        </div>
      </div>
    </form>
  )
}
