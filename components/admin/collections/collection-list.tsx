"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Calendar, Download, Eye, Mail } from "lucide-react"
import { ReceiptTemplate1 } from "./receipt-template-1"
import { ReceiptTemplate2 } from "./receipt-template-2"

// Sample data
const collections = [
  {
    id: 1,
    receiptNumber: "RCT-10045",
    studentName: "Alex Smith",
    studentId: "STU-10045",
    class: "Grade 10A",
    paymentDate: "2023-05-10",
    amount: "₦1,200.00",
    paymentMethod: "Bank Transfer",
    invoiceNumber: "INV-2023-001",
    collectedBy: "John Admin",
    status: "Completed",
    parentName: "Mr. & Mrs. Smith",
    parentEmail: "smith@example.com",
    parentPhone: "+234 801 234 5678",
    parentAddress: "123 Lagos Street, Ikeja, Lagos",
    companyName: "ABC International School",
    companyAddress: "456 Education Avenue, Lagos",
    paymentDetails: {
      compulsory: [
        { name: "Tuition Fee", amount: 800.0 },
        { name: "Development Levy", amount: 200.0 },
      ],
      nonCompulsory: [{ name: "Library Fee", amount: 100.0 }],
      clubs: [{ name: "Chess Club", amount: 50.0 }],
      hotLunch: [{ name: "Standard Lunch Plan", amount: 50.0 }],
      bankPayments: [
        { bank: "Guaranty Trust Bank", amount: 600.0 },
        { bank: "First Bank", amount: 600.0 },
      ],
      outstanding: 500.0,
    },
  },
  {
    id: 2,
    receiptNumber: "RCT-10046",
    studentName: "Emma Johnson",
    studentId: "STU-10046",
    class: "Grade 9B",
    paymentDate: "2023-05-09",
    amount: "₦1,500.00",
    paymentMethod: "Paystack",
    invoiceNumber: "INV-2023-002",
    collectedBy: "System",
    status: "Completed",
    parentName: "Mr. & Mrs. Johnson",
    parentEmail: "johnson@example.com",
    parentPhone: "+234 802 345 6789",
    parentAddress: "234 Abuja Road, Wuse, Abuja",
    companyName: "ABC International School",
    companyAddress: "456 Education Avenue, Lagos",
    paymentDetails: {
      compulsory: [
        { name: "Tuition Fee", amount: 1000.0 },
        { name: "Development Levy", amount: 300.0 },
      ],
      nonCompulsory: [{ name: "Technology Fee", amount: 200.0 }],
      clubs: [],
      hotLunch: [],
      bankPayments: [{ bank: "Access Bank", amount: 1500.0 }],
      outstanding: 800.0,
    },
  },
  {
    id: 3,
    receiptNumber: "RCT-10047",
    studentName: "James Brown",
    studentId: "STU-10047",
    class: "Grade 8C",
    paymentDate: "2023-05-08",
    amount: "₦800.00",
    paymentMethod: "Cash",
    invoiceNumber: "INV-2023-003",
    collectedBy: "Sarah Manager",
    status: "Completed",
    parentName: "Mr. & Mrs. Brown",
    parentEmail: "brown@example.com",
    parentPhone: "+234 803 456 7890",
    parentAddress: "345 Port Harcourt Road, Rivers State",
    companyName: "ABC International School",
    companyAddress: "456 Education Avenue, Lagos",
    paymentDetails: {
      compulsory: [
        { name: "Tuition Fee", amount: 600.0 },
        { name: "Development Levy", amount: 200.0 },
      ],
      nonCompulsory: [],
      clubs: [],
      hotLunch: [],
      bankPayments: [{ bank: "Zenith Bank", amount: 800.0 }],
      outstanding: 300.0,
    },
  },
  {
    id: 4,
    receiptNumber: "RCT-10048",
    studentName: "Sophia Davis",
    studentId: "STU-10048",
    class: "Grade 7A",
    paymentDate: "2023-05-07",
    amount: "₦2,300.00",
    paymentMethod: "Flutterwave",
    invoiceNumber: "INV-2023-004",
    collectedBy: "System",
    status: "Completed",
    parentName: "Mr. & Mrs. Davis",
    parentEmail: "davis@example.com",
    parentPhone: "+234 804 567 8901",
    parentAddress: "456 Kano Street, Kano State",
    companyName: "ABC International School",
    companyAddress: "456 Education Avenue, Lagos",
    paymentDetails: {
      compulsory: [
        { name: "Tuition Fee", amount: 1500.0 },
        { name: "Development Levy", amount: 400.0 },
      ],
      nonCompulsory: [{ name: "Sports Fee", amount: 200.0 }],
      clubs: [{ name: "Swimming Club", amount: 150.0 }],
      hotLunch: [{ name: "Premium Lunch Plan", amount: 50.0 }],
      bankPayments: [
        { bank: "UBA", amount: 1200.0 },
        { bank: "Guaranty Trust Bank", amount: 1100.0 },
      ],
      outstanding: 0.0,
    },
  },
  {
    id: 5,
    receiptNumber: "RCT-10049",
    studentName: "Oliver Wilson",
    studentId: "STU-10049",
    class: "Grade 11A",
    paymentDate: "2023-05-06",
    amount: "₦950.00",
    paymentMethod: "GTSquad",
    invoiceNumber: "INV-2023-005",
    collectedBy: "System",
    status: "Completed",
    parentName: "Mr. & Mrs. Wilson",
    parentEmail: "wilson@example.com",
    parentPhone: "+234 805 678 9012",
    parentAddress: "567 Enugu Road, Enugu State",
    companyName: "ABC International School",
    companyAddress: "456 Education Avenue, Lagos",
    paymentDetails: {
      compulsory: [
        { name: "Tuition Fee", amount: 700.0 },
        { name: "Development Levy", amount: 150.0 },
      ],
      nonCompulsory: [{ name: "Library Fee", amount: 100.0 }],
      clubs: [],
      hotLunch: [],
      bankPayments: [{ bank: "Guaranty Trust Bank", amount: 950.0 }],
      outstanding: 250.0,
    },
  },
]

export function CollectionList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false)
  const [receiptTemplate, setReceiptTemplate] = useState("template1")

  const filteredCollections = collections.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMethod = methodFilter === "all" || item.paymentMethod.toLowerCase() === methodFilter.toLowerCase()

    return matchesSearch && matchesMethod
  })

  const totalCollection = filteredCollections.reduce((sum, item) => {
    return sum + Number.parseFloat(item.amount.replace("₦", "").replace(",", ""))
  }, 0)

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsPaymentDialogOpen(true)
  }

  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment)
    setIsReceiptDialogOpen(true)
  }

  const receiptData = selectedPayment
    ? {
        company: selectedPayment.companyName,
        address: selectedPayment.companyAddress,
        phone: "+234 123 456 7890",
        email: "info@abcinternationalschool.edu.ng",
        website: "www.abcinternationalschool.edu.ng",
        receiptNumber: selectedPayment.receiptNumber,
        date: selectedPayment.paymentDate,
        customer: {
          name: selectedPayment.parentName,
          email: selectedPayment.parentEmail,
          address: selectedPayment.parentAddress,
        },
        amountPaid: Number.parseFloat(selectedPayment.amount.replace("₦", "").replace(",", "")),
        balanceDue: selectedPayment.paymentDetails.outstanding,
        paymentMethod: selectedPayment.paymentMethod,
        notes: "Thank you for your payment!",
        invoice: {
          reference: selectedPayment.invoiceNumber,
          amount:
            Number.parseFloat(selectedPayment.amount.replace("₦", "").replace(",", "")) +
            selectedPayment.paymentDetails.outstanding,
        },
      }
    : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Collection List</CardTitle>
          <CardDescription>View and manage fee collections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by student, receipt or invoice"
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
          </div>

          <div className="rounded-md border mb-6">
            <div className="flex flex-col md:flex-row justify-between p-4 bg-success-light">
              <div>
                <h3 className="font-semibold text-success">Total Collection</h3>
                <p className="text-2xl font-bold text-success">₦{totalCollection.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-success">Total Transactions</h3>
                <p className="text-2xl font-bold text-success">{filteredCollections.length}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Methods</TabsTrigger>
              <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
              <TabsTrigger value="paystack">Paystack</TabsTrigger>
              <TabsTrigger value="flutterwave">Flutterwave</TabsTrigger>
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="gtsquad">GTSquad</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Table>
                <TableHeader className="bg-table-header">
                  <TableRow>
                    <TableHead>Receipt Number</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Collected By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.receiptNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div>{collection.studentName}</div>
                          <div className="text-xs text-muted-foreground">
                            {collection.studentId} | {collection.class}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {collection.paymentDate}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{collection.amount}</TableCell>
                      <TableCell>{collection.paymentMethod}</TableCell>
                      <TableCell>{collection.invoiceNumber}</TableCell>
                      <TableCell>{collection.collectedBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewPayment(collection)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleViewReceipt(collection)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCollections.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        No collections found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            {["bank-transfer", "paystack", "flutterwave", "cash", "gtsquad"].map((method) => (
              <TabsContent key={method} value={method}>
                <Table>
                  <TableHeader className="bg-table-header">
                    <TableRow>
                      <TableHead>Receipt Number</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Collected By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCollections
                      .filter((item) => item.paymentMethod.toLowerCase().replace(/\s+/g, "-") === method)
                      .map((collection) => (
                        <TableRow key={collection.id}>
                          <TableCell className="font-medium">{collection.receiptNumber}</TableCell>
                          <TableCell>
                            <div>
                              <div>{collection.studentName}</div>
                              <div className="text-xs text-muted-foreground">
                                {collection.studentId} | {collection.class}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {collection.paymentDate}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{collection.amount}</TableCell>
                          <TableCell>{collection.invoiceNumber}</TableCell>
                          <TableCell>{collection.collectedBy}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewPayment(collection)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleViewReceipt(collection)}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredCollections.filter(
                      (item) => item.paymentMethod.toLowerCase().replace(/\s+/g, "-") === method,
                    ).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No collections found for this payment method.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Payment Summary Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Summary</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Section 1: Payment Details */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{selectedPayment.companyName}</p>
                    <p className="text-sm">{selectedPayment.companyAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parent</p>
                    <p className="font-medium">{selectedPayment.parentName}</p>
                    <p className="text-sm">{selectedPayment.parentAddress}</p>
                    <p className="text-sm">{selectedPayment.parentEmail}</p>
                    <p className="text-sm">{selectedPayment.parentPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student</p>
                    <p className="font-medium">{selectedPayment.studentName}</p>
                    <p className="text-sm">
                      {selectedPayment.studentId} | {selectedPayment.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Information</p>
                    <p className="font-medium">Receipt: {selectedPayment.receiptNumber}</p>
                    <p className="text-sm">Invoice: {selectedPayment.invoiceNumber}</p>
                    <p className="text-sm">Method: {selectedPayment.paymentMethod}</p>
                    <p className="text-sm">Date: {selectedPayment.paymentDate}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: School Bill */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">School Bill</h3>
                <div className="space-y-4">
                  {/* Compulsory Payments */}
                  <div>
                    <h4 className="font-medium mb-2">Compulsory Payments</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPayment.paymentDetails.compulsory.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">₦{item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Subtotal</TableCell>
                          <TableCell className="text-right font-medium">
                            ₦
                            {selectedPayment.paymentDetails.compulsory
                              .reduce((sum: number, item: any) => sum + item.amount, 0)
                              .toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Non-Compulsory Payments */}
                  {selectedPayment.paymentDetails.nonCompulsory.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Non-Compulsory Payments</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPayment.paymentDetails.nonCompulsory.map((item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">₦{item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-medium">Subtotal</TableCell>
                            <TableCell className="text-right font-medium">
                              ₦
                              {selectedPayment.paymentDetails.nonCompulsory
                                .reduce((sum: number, item: any) => sum + item.amount, 0)
                                .toFixed(2)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Clubs */}
                  {selectedPayment.paymentDetails.clubs.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Clubs</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Club</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPayment.paymentDetails.clubs.map((item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">₦{item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-medium">Subtotal</TableCell>
                            <TableCell className="text-right font-medium">
                              ₦
                              {selectedPayment.paymentDetails.clubs
                                .reduce((sum: number, item: any) => sum + item.amount, 0)
                                .toFixed(2)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Hot Lunch */}
                  {selectedPayment.paymentDetails.hotLunch.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Hot Lunch</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPayment.paymentDetails.hotLunch.map((item: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">₦{item.amount.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-medium">Subtotal</TableCell>
                            <TableCell className="text-right font-medium">
                              ₦
                              {selectedPayment.paymentDetails.hotLunch
                                .reduce((sum: number, item: any) => sum + item.amount, 0)
                                .toFixed(2)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Total */}
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-bold text-lg">{selectedPayment.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Bank Payments */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Bank Payments</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPayment.paymentDetails.bankPayments.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.bank}</TableCell>
                        <TableCell className="text-right">₦{item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">
                        ₦
                        {selectedPayment.paymentDetails.bankPayments
                          .reduce((sum: number, item: any) => sum + item.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Section 4: Outstanding Amount */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Outstanding Amount</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Outstanding Balance</span>
                    <span className="font-bold text-lg text-red-500">
                      ₦{selectedPayment.paymentDetails.outstanding.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
            <div className="flex items-center space-x-4 mt-4">
              <Label htmlFor="receipt-template">Template:</Label>
              <Select value={receiptTemplate} onValueChange={setReceiptTemplate}>
                <SelectTrigger id="receipt-template" className="w-[200px]">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Template 1 - Classic</SelectItem>
                  <SelectItem value="template2">Template 2 - Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>
          {receiptData && (
            <div className="mt-4">
              {receiptTemplate === "template1" ? (
                <ReceiptTemplate1 data={receiptData} />
              ) : (
                <ReceiptTemplate2 data={receiptData} />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
