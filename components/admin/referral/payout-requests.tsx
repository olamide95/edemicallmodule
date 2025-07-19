"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CircleDollarSign, School } from "lucide-react"

export function PayoutRequests() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - replace with API call in production
  const cashRequests = [
    {
      id: 1,
      requestDate: "2023-11-05",
      referrer: "Mary Johnson",
      referrerType: "Staff",
      amount: "₦25,000",
      referrals: 5,
      status: "Pending",
    },
    {
      id: 2,
      requestDate: "2023-11-03",
      referrer: "Daniel Okafor",
      referrerType: "Parent",
      amount: "₦15,000",
      referrals: 3,
      status: "Approved",
    },
    {
      id: 3,
      requestDate: "2023-10-28",
      referrer: "James Wilson",
      referrerType: "Alumni",
      amount: "₦20,000",
      referrals: 4,
      status: "Paid",
    },
    {
      id: 4,
      requestDate: "2023-10-25",
      referrer: "Rebecca Eze",
      referrerType: "Parent",
      amount: "₦15,000",
      referrals: 3,
      status: "Rejected",
    },
  ]

  const tuitionRequests = [
    {
      id: 1,
      requestDate: "2023-11-04",
      referrer: "Sarah Williams",
      referrerType: "Parent",
      amount: "₦20,000",
      student: "Emily Williams",
      class: "Grade 5",
      status: "Pending",
    },
    {
      id: 2,
      requestDate: "2023-11-01",
      referrer: "Michael Adeyemi",
      referrerType: "Staff",
      amount: "₦15,000",
      student: "David Adeyemi",
      class: "Grade 3",
      status: "Applied",
    },
    {
      id: 3,
      requestDate: "2023-10-26",
      referrer: "Elizabeth Njoku",
      referrerType: "Parent",
      amount: "₦20,000",
      student: "Samuel Njoku",
      class: "Grade 7",
      status: "Applied",
    },
  ]

  const filteredCashRequests = cashRequests.filter((req) =>
    req.referrer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTuitionRequests = tuitionRequests.filter(
    (req) =>
      req.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.student.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function getStatusBadge(status: string) {
    switch (status) {
      case "Approved":
        return <Badge variant="info">Approved</Badge>
      case "Paid":
      case "Applied":
        return <Badge variant="success">Paid</Badge>
      case "Rejected":
        return <Badge variant="error">Rejected</Badge>
      default:
        return <Badge variant="warning">Pending</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button>Export Data</Button>
      </div>

      <Tabs defaultValue="cash" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cash">
            <CircleDollarSign className="mr-2 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
            Cash Payout Requests
          </TabsTrigger>
          <TabsTrigger value="tuition">
            <School className="mr-2 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
            Tuition Discount Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cash" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Referrer</TableHead>
                  <TableHead>Referrer Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCashRequests.length > 0 ? (
                  filteredCashRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{request.referrer}</TableCell>
                      <TableCell>{request.referrerType}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell>{request.referrals}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        {request.status === "Pending" ? (
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">Process</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Process Cash Payout Request</DialogTitle>
                                  <DialogDescription>Review and process the cash payout request</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Referrer</Label>
                                    <div className="col-span-3 font-medium">{request.referrer}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Amount</Label>
                                    <div className="col-span-3 font-medium">{request.amount}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Referrals</Label>
                                    <div className="col-span-3">{request.referrals} successful referrals</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right" htmlFor="payment-method">
                                      Payment Method
                                    </Label>
                                    <Select defaultValue="bank">
                                      <SelectTrigger className="col-span-3" id="payment-method">
                                        <SelectValue placeholder="Select payment method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="check">Check</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right" htmlFor="transaction-ref">
                                      Transaction Ref
                                    </Label>
                                    <Input
                                      id="transaction-ref"
                                      placeholder="Enter transaction reference"
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button variant="outline">Reject</Button>
                                  <Button>Approve & Process</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No cash payout requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="tuition" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Referrer</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Discount Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTuitionRequests.length > 0 ? (
                  filteredTuitionRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{request.referrer}</TableCell>
                      <TableCell>{request.student}</TableCell>
                      <TableCell>{request.class}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        {request.status === "Pending" ? (
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">Process</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Process Tuition Discount Request</DialogTitle>
                                  <DialogDescription>Review and process the tuition discount request</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Referrer</Label>
                                    <div className="col-span-3 font-medium">{request.referrer}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Student</Label>
                                    <div className="col-span-3 font-medium">{request.student}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Class</Label>
                                    <div className="col-span-3">{request.class}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Discount</Label>
                                    <div className="col-span-3">{request.amount}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right" htmlFor="term">
                                      Apply to Term
                                    </Label>
                                    <Select defaultValue="current">
                                      <SelectTrigger className="col-span-3" id="term">
                                        <SelectValue placeholder="Select term" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="current">Current Term</SelectItem>
                                        <SelectItem value="next">Next Term</SelectItem>
                                        <SelectItem value="specific">Specific Term</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right" htmlFor="invoice">
                                      Invoice
                                    </Label>
                                    <Select defaultValue="latest">
                                      <SelectTrigger className="col-span-3" id="invoice">
                                        <SelectValue placeholder="Select invoice" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="latest">Latest Invoice</SelectItem>
                                        <SelectItem value="inv-2023-001">INV-2023-001</SelectItem>
                                        <SelectItem value="inv-2023-002">INV-2023-002</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button variant="outline">Reject</Button>
                                  <Button>Approve & Apply</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No tuition discount requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

// Helper component to avoid duplicating code
function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  )
}
