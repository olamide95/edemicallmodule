"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Search, Calendar } from "lucide-react"

// Sample data
const collections = [
  {
    id: 1,
    receiptNumber: "RCT-10045",
    parentName: "John Smith",
    studentName: "Alex Smith",
    paymentDate: "2023-05-10",
    amount: "$1,200.00",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 2,
    receiptNumber: "RCT-10046",
    parentName: "Sarah Johnson",
    studentName: "Emma Johnson",
    paymentDate: "2023-05-09",
    amount: "$1,500.00",
    paymentMethod: "Paystack",
    status: "Completed",
  },
  {
    id: 3,
    receiptNumber: "RCT-10047",
    parentName: "Michael Brown",
    studentName: "James Brown",
    paymentDate: "2023-05-08",
    amount: "$800.00",
    paymentMethod: "Cash",
    status: "Completed",
  },
  {
    id: 4,
    receiptNumber: "RCT-10048",
    parentName: "Emily Davis",
    studentName: "Sophia Davis",
    paymentDate: "2023-05-07",
    amount: "$2,300.00",
    paymentMethod: "Flutterwave",
    status: "Completed",
  },
  {
    id: 5,
    receiptNumber: "RCT-10049",
    parentName: "Robert Wilson",
    studentName: "Oliver Wilson",
    paymentDate: "2023-05-06",
    amount: "$950.00",
    paymentMethod: "GTSquad",
    status: "Completed",
  },
]

export function CollectionReport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const filteredData = collections.filter((item) => {
    const matchesSearch =
      item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMethod = methodFilter === "all" || item.paymentMethod.toLowerCase() === methodFilter.toLowerCase()

    return matchesSearch && matchesMethod
  })

  const totalCollection = filteredData.reduce((sum, item) => {
    return sum + Number.parseFloat(item.amount.replace("$", "").replace(",", ""))
  }, 0)

  return (
    <div className="space-y-4">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Collection Report</CardTitle>
          <CardDescription>View and analyze payment collections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by receipt, parent or student"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/5 space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger id="method" className="w-full">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="paystack">Paystack</SelectItem>
                  <SelectItem value="flutterwave">Flutterwave</SelectItem>
                  <SelectItem value="gtsquad">GTSquad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/5 space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range" className="w-full">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-term">This Term</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
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
            <div className="flex flex-col md:flex-row justify-between p-4 bg-success-light">
              <div>
                <h3 className="font-semibold text-success">Total Collection</h3>
                <p className="text-2xl font-bold text-success">${totalCollection.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-success">Total Transactions</h3>
                <p className="text-2xl font-bold text-success">{filteredData.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-table-header">
                <TableRow>
                  <TableHead>Receipt Number</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.receiptNumber}</TableCell>
                    <TableCell>{item.parentName}</TableCell>
                    <TableCell>{item.studentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {item.paymentDate}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.amount}</TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-light text-success">
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No collections found matching your filters.
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
