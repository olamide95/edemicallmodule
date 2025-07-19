"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Download, Printer } from "lucide-react"

interface Transaction {
  id: string
  receiptNo: string
  student: string
  class: string
  amount: string
  date: string
  paymentMethod: string
  status: "success" | "pending" | "failed"
}

const transactions: Transaction[] = [
  {
    id: "1",
    receiptNo: "REC-2023-001",
    student: "Aditya Sharma",
    class: "Grade 10-A",
    amount: "₹12,500",
    date: "2023-04-15",
    paymentMethod: "Online",
    status: "success",
  },
  {
    id: "2",
    receiptNo: "REC-2023-002",
    student: "Priya Patel",
    class: "Grade 8-B",
    amount: "₹8,750",
    date: "2023-04-14",
    paymentMethod: "Cash",
    status: "success",
  },
  {
    id: "3",
    receiptNo: "REC-2023-003",
    student: "Rahul Verma",
    class: "Grade 11-C",
    amount: "₹15,200",
    date: "2023-04-12",
    paymentMethod: "Cheque",
    status: "pending",
  },
  {
    id: "4",
    receiptNo: "REC-2023-004",
    student: "Ananya Singh",
    class: "Grade 9-A",
    amount: "₹9,800",
    date: "2023-04-10",
    paymentMethod: "Online",
    status: "success",
  },
  {
    id: "5",
    receiptNo: "REC-2023-005",
    student: "Vikram Mehta",
    class: "Grade 12-B",
    amount: "₹18,500",
    date: "2023-04-08",
    paymentMethod: "Online",
    status: "failed",
  },
]

export function RecentTransactions() {
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(transactions)

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest fee payments and transactions</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-3">Receipt</th>
                <th className="text-left font-medium p-3">Student</th>
                <th className="text-left font-medium p-3 hidden md:table-cell">Class</th>
                <th className="text-left font-medium p-3">Amount</th>
                <th className="text-left font-medium p-3 hidden lg:table-cell">Date</th>
                <th className="text-left font-medium p-3 hidden md:table-cell">Method</th>
                <th className="text-left font-medium p-3">Status</th>
                <th className="text-right font-medium p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">{transaction.receiptNo}</td>
                  <td className="p-3">{transaction.student}</td>
                  <td className="p-3 hidden md:table-cell">{transaction.class}</td>
                  <td className="p-3 font-medium">{transaction.amount}</td>
                  <td className="p-3 hidden lg:table-cell">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-3 hidden md:table-cell">{transaction.paymentMethod}</td>
                  <td className="p-3">
                    <span className={`status-badge status-badge-${transaction.status}`}>
                      {transaction.status === "success"
                        ? "Paid"
                        : transaction.status === "pending"
                          ? "Pending"
                          : "Failed"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Receipt</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          <span>Print</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
