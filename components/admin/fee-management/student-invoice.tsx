"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Printer } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data
const students = [
  { id: "1", name: "John Doe", class: "SS 3", parent: "Mr. & Mrs. Doe" },
  { id: "2", name: "Jane Smith", class: "SS 2", parent: "Mr. & Mrs. Smith" },
  { id: "3", name: "Michael Johnson", class: "JSS 3", parent: "Mr. & Mrs. Johnson" },
  { id: "4", name: "Sarah Williams", class: "JSS 1", parent: "Mr. & Mrs. Williams" },
  { id: "5", name: "David Brown", class: "SS 1", parent: "Mr. & Mrs. Brown" },
]

const parents = [
  { id: "1", name: "Mr. & Mrs. Doe" },
  { id: "2", name: "Mr. & Mrs. Smith" },
  { id: "3", name: "Mr. & Mrs. Johnson" },
  { id: "4", name: "Mr. & Mrs. Williams" },
  { id: "5", name: "Mr. & Mrs. Brown" },
]

const terms = [
  { id: "1", name: "Term 1 2023/2024" },
  { id: "2", name: "Term 2 2023/2024" },
  { id: "3", name: "Term 3 2023/2024" },
]

const invoices = [
  {
    id: "INV-001",
    studentId: "1",
    term: "Term 1 2023/2024",
    amount: 350000,
    paid: 350000,
    balance: 0,
    status: "paid",
    dueDate: "2023-09-15",
    transactions: [
      { id: "TRX-001", date: "2023-09-01", amount: 200000, method: "Bank Transfer" },
      { id: "TRX-002", date: "2023-09-10", amount: 150000, method: "Online Payment" },
    ],
  },
  {
    id: "INV-002",
    studentId: "2",
    term: "Term 1 2023/2024",
    amount: 325000,
    paid: 325000,
    balance: 0,
    status: "paid",
    dueDate: "2023-09-15",
    transactions: [{ id: "TRX-003", date: "2023-09-05", amount: 325000, method: "Bank Transfer" }],
  },
  {
    id: "INV-003",
    studentId: "3",
    term: "Term 1 2023/2024",
    amount: 275000,
    paid: 150000,
    balance: 125000,
    status: "partial",
    dueDate: "2023-09-15",
    transactions: [{ id: "TRX-004", date: "2023-09-07", amount: 150000, method: "Bank Transfer" }],
  },
  {
    id: "INV-004",
    studentId: "4",
    term: "Term 1 2023/2024",
    amount: 250000,
    paid: 0,
    balance: 250000,
    status: "unpaid",
    dueDate: "2023-09-15",
    transactions: [],
  },
  {
    id: "INV-005",
    studentId: "5",
    term: "Term 1 2023/2024",
    amount: 300000,
    paid: 0,
    balance: 300000,
    status: "unpaid",
    dueDate: "2023-09-15",
    transactions: [],
  },
  {
    id: "INV-006",
    studentId: "1",
    term: "Term 2 2023/2024",
    amount: 350000,
    paid: 350000,
    balance: 0,
    status: "paid",
    dueDate: "2024-01-15",
    transactions: [{ id: "TRX-005", date: "2024-01-05", amount: 350000, method: "Online Payment" }],
  },
  {
    id: "INV-007",
    studentId: "2",
    term: "Term 2 2023/2024",
    amount: 325000,
    paid: 200000,
    balance: 125000,
    status: "partial",
    dueDate: "2024-01-15",
    transactions: [{ id: "TRX-006", date: "2024-01-10", amount: 200000, method: "Bank Transfer" }],
  },
]

export function StudentInvoice() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedParent, setSelectedParent] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter invoices based on selected filters and search query
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      // Filter by status
      if (selectedTab !== "all" && invoice.status !== selectedTab) {
        return false
      }

      // Filter by student
      if (selectedStudent && selectedStudent !== "all" && invoice.studentId !== selectedStudent) {
        return false
      }

      // Filter by parent (through student)
      if (selectedParent && selectedParent !== "all") {
        const student = students.find((s) => s.id === invoice.studentId)
        const parent = student ? student.parent : ""
        if (parent !== selectedParent) {
          return false
        }
      }

      // Filter by term
      if (selectedTerm && selectedTerm !== "all") {
        const termName = terms.find((t) => t.id === selectedTerm)?.name || ""
        if (invoice.term !== termName) {
          return false
        }
      }

      // Filter by search query
      if (searchQuery) {
        const student = students.find((s) => s.id === invoice.studentId)
        const invoiceText = `${invoice.id} ${student?.name || ""} ${student?.class || ""} ${invoice.term}`.toLowerCase()
        return invoiceText.includes(searchQuery.toLowerCase())
      }

      return true
    })
  }, [invoices, selectedTab, selectedStudent, selectedParent, selectedTerm, searchQuery, students, terms])

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace(/NGN/g, "₦")
  }, [])

  // Get status badge
  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00]">Paid</Badge>
      case "partial":
        return <Badge className="bg-[#FFB400] bg-opacity-[0.16] text-[#FFB400]">Partially Paid</Badge>
      case "unpaid":
        return <Badge className="bg-[#FF4C51] bg-opacity-[0.16] text-[#FF4C51]">Unpaid</Badge>
      default:
        return null
    }
  }, [])

  // Handle view invoice
  const handleViewInvoice = useCallback(
    (invoiceId: string) => {
      router.push(`/admin/fee-management/invoice/${invoiceId}`)
    },
    [router],
  )

  // Handle view transaction
  const handleViewTransaction = useCallback((transactionId: string) => {
    // In a real application, this would navigate to a transaction details page
    alert(`Viewing transaction: ${transactionId}`)
  }, [])

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>Student Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedParent} onValueChange={setSelectedParent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parents</SelectItem>
                    {parents.map((parent) => (
                      <SelectItem key={parent.id} value={parent.name}>
                        {parent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    {terms.map((term) => (
                      <SelectItem key={term.id} value={term.id}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All Billed</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="partial">Partially Paid</TabsTrigger>
                <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="space-y-4">
                <div className="rounded-md border bg-white dark:bg-[#312D4B] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Paid</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={11} className="text-center py-4">
                            No invoices found matching the current filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInvoices.map((invoice) => {
                          const student = students.find((s) => s.id === invoice.studentId)
                          return (
                            <TableRow key={invoice.id}>
                              <TableCell>{invoice.id}</TableCell>
                              <TableCell>{student?.name}</TableCell>
                              <TableCell>{student?.class}</TableCell>
                              <TableCell>{invoice.term}</TableCell>
                              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                              <TableCell>{formatCurrency(invoice.paid)}</TableCell>
                              <TableCell>{formatCurrency(invoice.balance)}</TableCell>
                              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                              <TableCell>{invoice.dueDate}</TableCell>
                              <TableCell>
                                {invoice.transactions.length > 0 ? (
                                  <div className="flex flex-col gap-1">
                                    {invoice.transactions.map((transaction) => (
                                      <button
                                        key={transaction.id}
                                        className="text-left text-[#8C57FF] hover:underline"
                                        onClick={() => handleViewTransaction(transaction.id)}
                                      >
                                        {transaction.id}
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  "No transactions"
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="View Invoice"
                                    onClick={() => handleViewInvoice(invoice.id)}
                                  >
                                    <FileText className="h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Download Invoice"
                                    onClick={() => {
                                      // Open the invoice page with download parameter
                                      const newWindow = window.open(
                                        `/admin/fee-management/invoice/${invoice.id}?download=true`,
                                        "_blank",
                                      )
                                      if (newWindow) {
                                        newWindow.focus()
                                      }
                                    }}
                                  >
                                    <Download className="h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Print Invoice"
                                    onClick={() =>
                                      window.open(`/admin/fee-management/invoice/${invoice.id}?print=true`, "_blank")
                                    }
                                  >
                                    <Printer className="h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
