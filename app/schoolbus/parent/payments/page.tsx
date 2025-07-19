"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, DollarSign, TrendingUp, Download, Eye, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
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

// Mock payment data
const paymentData = {
  session: "2023/2024",
  totalAmount: 90000,
  paidAmount: 60000,
  pendingAmount: 30000,
  children: [
    {
      id: "alice",
      name: "Alice Doe",
      class: "Primary 3",
      totalFee: 45000,
      paidAmount: 30000,
      pendingAmount: 15000,
      status: "partially-paid",
      payments: [
        {
          id: "pay-1",
          amount: 15000,
          date: "2023-09-15",
          term: "First Term",
          method: "Bank Transfer",
          reference: "TXN123456789",
          status: "completed",
        },
        {
          id: "pay-2",
          amount: 15000,
          date: "2023-12-10",
          term: "Second Term",
          method: "Online Payment",
          reference: "TXN987654321",
          status: "completed",
        },
      ],
    },
    {
      id: "bob",
      name: "Bob Doe",
      class: "Primary 1",
      totalFee: 45000,
      paidAmount: 30000,
      pendingAmount: 15000,
      status: "partially-paid",
      payments: [
        {
          id: "pay-3",
          amount: 15000,
          date: "2023-09-15",
          term: "First Term",
          method: "Bank Transfer",
          reference: "TXN123456790",
          status: "completed",
        },
        {
          id: "pay-4",
          amount: 15000,
          date: "2023-12-10",
          term: "Second Term",
          method: "Online Payment",
          reference: "TXN987654322",
          status: "completed",
        },
      ],
    },
  ],
  paymentHistory: [
    { month: "Sep", amount: 30000 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 30000 },
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
  ],
}

export default function ParentPaymentsPage() {
  const [selectedChild, setSelectedChild] = useState<string>("all")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedPaymentChild, setSelectedPaymentChild] = useState<string>("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success"
      case "partially-paid":
        return "warning"
      case "unpaid":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Fully Paid"
      case "partially-paid":
        return "Partially Paid"
      case "unpaid":
        return "Unpaid"
      default:
        return "Unknown"
    }
  }

  const filteredChildren =
    selectedChild === "all" ? paymentData.children : paymentData.children.filter((child) => child.id === selectedChild)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage bus service payments for the {paymentData.session} session</p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{paymentData.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For {paymentData.children.length} children</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#56CA00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#56CA00]">₦{paymentData.paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-[#FFB400]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FFB400]">₦{paymentData.pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((paymentData.pendingAmount / paymentData.totalAmount) * 100)}% remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={(paymentData.paidAmount / paymentData.totalAmount) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}% Complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History Chart</CardTitle>
          <CardDescription>Monthly payment overview for {paymentData.session}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Payment Timeline</span>
              <span className="text-muted-foreground">Amount (₦)</span>
            </div>
            <div className="space-y-3">
              {paymentData.paymentHistory.map((month, index) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{month.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            month.amount > 0 ? "bg-[#8C57FF]" : "bg-transparent"
                          }`}
                          style={{
                            width: `${month.amount > 0 ? (month.amount / Math.max(...paymentData.paymentHistory.map((m) => m.amount))) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <div className="w-20 text-sm text-right">
                        {month.amount > 0 ? `₦${month.amount.toLocaleString()}` : "₦0"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              {paymentData.children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Make Payment</DialogTitle>
                <DialogDescription>Pay outstanding balance for bus service</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Child</label>
                  <Select value={selectedPaymentChild} onValueChange={setSelectedPaymentChild}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select child to pay for" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentData.children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} - ₦{child.pendingAmount.toLocaleString()} pending
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPaymentChild && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You will be redirected to our secure payment gateway to complete the transaction.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={!selectedPaymentChild}
                  onClick={() => {
                    // Handle payment logic here
                    console.log("Processing payment for:", selectedPaymentChild)
                    setIsPaymentDialogOpen(false)
                  }}
                >
                  Proceed to Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Children Payment Details */}
      <div className="grid gap-6">
        {filteredChildren.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {child.name}
                    <Badge variant={getStatusColor(child.status) as any}>{getStatusText(child.status)}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {child.class} • Total Fee: ₦{child.totalFee.toLocaleString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-[#FFB400]">₦{child.pendingAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Progress</span>
                    <span>{Math.round((child.paidAmount / child.totalFee) * 100)}%</span>
                  </div>
                  <Progress value={(child.paidAmount / child.totalFee) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Paid: ₦{child.paidAmount.toLocaleString()}</span>
                    <span>Remaining: ₦{child.pendingAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Payment History</h4>
                  <div className="space-y-3">
                    {child.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-[#56CA00] rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.term}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.method} • {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{payment.amount.toLocaleString()}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="success" className="text-xs">
                              Completed
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {child.pendingAmount > 0 && (
                      <div className="flex items-center justify-between p-3 bg-[#FFB400]/10 border border-[#FFB400]/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-[#FFB400] rounded-full flex items-center justify-center">
                            <Clock className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Third Term</p>
                            <p className="text-sm text-muted-foreground">Payment pending</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{child.pendingAmount.toLocaleString()}</p>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedPaymentChild(child.id)
                              setIsPaymentDialogOpen(true)
                            }}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
