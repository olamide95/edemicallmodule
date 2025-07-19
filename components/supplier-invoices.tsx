"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, FileTextIcon, ArrowDownIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreateInvoiceForm } from "@/components/create-invoice-form"
import { StatusBadge } from "@/components/status-badge"

// Mock data
const mockInvoices = [
  {
    id: "INV-2023-001",
    date: "2023-09-15",
    club: "Chess Club",
    students: 25,
    amount: 375000,
    status: "paid",
  },
  {
    id: "INV-2023-002",
    date: "2023-10-20",
    club: "Chess Club",
    students: 23,
    amount: 345000,
    status: "confirmed",
  },
  {
    id: "INV-2023-003",
    date: "2023-11-18",
    club: "Chess Club",
    students: 27,
    amount: 405000,
    status: "review",
  },
  {
    id: "INV-2023-004",
    date: "2023-12-10",
    club: "Chess Club",
    students: 26,
    amount: 390000,
    status: "draft",
  },
]

export function SupplierInvoices() {
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)

  const filteredInvoices =
    activeTab === "all" ? mockInvoices : mockInvoices.filter((invoice) => invoice.status === activeTab)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => setIsCreateInvoiceOpen(true)}>Create Invoice</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Club</TableHead>
              <TableHead className="text-right">Students</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.club}</TableCell>
                  <TableCell className="text-right">{invoice.students}</TableCell>
                  <TableCell className="text-right font-medium">₦{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      {invoice.status === "paid" && (
                        <Button variant="ghost" size="icon">
                          <ArrowDownIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>Create an invoice for your club services</DialogDescription>
          </DialogHeader>
          <CreateInvoiceForm onClose={() => setIsCreateInvoiceOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
