"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Search } from "lucide-react"

// Sample data
const outstandingBalances = [
  {
    id: 1,
    parentName: "John Smith",
    studentName: "Alex Smith",
    class: "Grade 10A",
    totalBilled: "$2,500.00",
    amountPaid: "$1,200.00",
    balance: "$1,300.00",
    dueDate: "2023-05-15",
    status: "Overdue",
  },
  {
    id: 2,
    parentName: "Sarah Johnson",
    studentName: "Emma Johnson",
    class: "Grade 8B",
    totalBilled: "$2,200.00",
    amountPaid: "$1,500.00",
    balance: "$700.00",
    dueDate: "2023-05-20",
    status: "Upcoming",
  },
  {
    id: 3,
    parentName: "Michael Brown",
    studentName: "James Brown",
    class: "Grade 11C",
    totalBilled: "$2,800.00",
    amountPaid: "$800.00",
    balance: "$2,000.00",
    dueDate: "2023-04-30",
    status: "Overdue",
  },
  {
    id: 4,
    parentName: "Emily Davis",
    studentName: "Sophia Davis",
    class: "Grade 9A",
    totalBilled: "$2,300.00",
    amountPaid: "$2,300.00",
    balance: "$0.00",
    dueDate: "2023-05-10",
    status: "Paid",
  },
  {
    id: 5,
    parentName: "Robert Wilson",
    studentName: "Oliver Wilson",
    class: "Grade 7B",
    totalBilled: "$1,900.00",
    amountPaid: "$950.00",
    balance: "$950.00",
    dueDate: "2023-05-25",
    status: "Upcoming",
  },
]

export function OutstandingBalanceReport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = outstandingBalances.filter((item) => {
    const matchesSearch =
      item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const totalOutstanding = filteredData.reduce((sum, item) => {
    return sum + Number.parseFloat(item.balance.replace("$", "").replace(",", ""))
  }, 0)

  return (
    <div className="space-y-4">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Outstanding Balance Report</CardTitle>
          <CardDescription>View and analyze outstanding balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by parent or student name"
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
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
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
            <div className="w-full md:w-auto flex items-end">
              <Button className="w-full md:w-auto bg-primary-solid hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border mb-6">
            <div className="flex flex-col md:flex-row justify-between p-4 bg-primary-light">
              <div>
                <h3 className="font-semibold text-primary">Total Outstanding Balance</h3>
                <p className="text-2xl font-bold text-primary">${totalOutstanding.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Total Records</h3>
                <p className="text-2xl font-bold text-primary">{filteredData.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-table-header">
                <TableRow>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Billed</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.parentName}</TableCell>
                    <TableCell>{item.studentName}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.totalBilled}</TableCell>
                    <TableCell>{item.amountPaid}</TableCell>
                    <TableCell className="font-medium">{item.balance}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Overdue"
                            ? "bg-error-light text-error"
                            : item.status === "Upcoming"
                              ? "bg-warning-light text-warning"
                              : "bg-success-light text-success"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No outstanding balances found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
