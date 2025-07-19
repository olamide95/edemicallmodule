"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CircleDollarSign, Percent, CheckCircle, AlertCircle } from "lucide-react"

export function StaffReferralRequests() {
  const [showCashPayoutDialog, setShowCashPayoutDialog] = useState(false)
  const [showTuitionDiscountDialog, setShowTuitionDiscountDialog] = useState(false)
  const [selectedChild, setSelectedChild] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const [bankDetails, setBankDetails] = useState("")
  const [requestNotes, setRequestNotes] = useState("")

  // Mock data
  const referralData = {
    successfulReferrals: 3,
    requiredForCashPayout: 5,
    requiredForTuitionDiscount: 2,
    cashPayoutAmount: 25000,
    discountPercentage: 15,
    eligibleForCashPayout: false,
    eligibleForTuitionDiscount: true,
    children: [
      { id: "1", name: "James Wilson", grade: "Grade 5" },
      { id: "2", name: "Emma Wilson", grade: "Grade 3" },
    ],
    payoutHistory: [
      {
        id: 1,
        type: "Cash Payout",
        amount: "₦25,000",
        date: "2023-03-15",
        status: "Completed",
      },
    ],
    discountHistory: [
      {
        id: 1,
        type: "Tuition Discount",
        amount: "15% on Tuition",
        childName: "Emma Wilson",
        term: "First Term 2023/2024",
        date: "2023-09-01",
        status: "Applied",
      },
    ],
  }

  const requestCashPayout = () => {
    // In a real app, this would submit the request to an API
    console.log("Requesting cash payout with payment method:", paymentMethod)
    console.log("Bank details:", bankDetails)
    console.log("Notes:", requestNotes)
    setShowCashPayoutDialog(false)
  }

  const requestTuitionDiscount = () => {
    // In a real app, this would submit the request to an API
    console.log("Requesting tuition discount for child:", selectedChild)
    console.log("Notes:", requestNotes)
    setShowTuitionDiscountDialog(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="history">Reward History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CircleDollarSign className="mr-2 h-5 w-5 text-primary" />
                  Cash Payout
                </CardTitle>
                <CardDescription>Request a cash payout for your successful referrals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Your Referrals</h3>
                      <p className="text-2xl font-bold">{referralData.successfulReferrals}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Required</h3>
                      <p className="text-2xl font-bold">{referralData.requiredForCashPayout}</p>
                    </div>
                  </div>
                </div>

                {referralData.eligibleForCashPayout ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        You are eligible for a cash payout!
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-green-600/80 dark:text-green-400/80">
                      You can request a cash payout of ₦{referralData.cashPayoutAmount.toLocaleString()} for your
                      successful referrals.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Not eligible yet</p>
                    </div>
                    <p className="mt-1 text-sm text-amber-600/80 dark:text-amber-400/80">
                      You need {referralData.requiredForCashPayout - referralData.successfulReferrals} more successful
                      referrals to be eligible for a cash payout.
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => setShowCashPayoutDialog(true)}
                  disabled={!referralData.eligibleForCashPayout}
                >
                  Request Cash Payout
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-primary" />
                  Tuition Discount
                </CardTitle>
                <CardDescription>Apply a discount to your child's tuition fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Your Referrals</h3>
                      <p className="text-2xl font-bold">{referralData.successfulReferrals}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Required</h3>
                      <p className="text-2xl font-bold">{referralData.requiredForTuitionDiscount}</p>
                    </div>
                  </div>
                </div>

                {referralData.eligibleForTuitionDiscount ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        You are eligible for a tuition discount!
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-green-600/80 dark:text-green-400/80">
                      You can apply a {referralData.discountPercentage}% discount on tuition fees for one of your
                      children.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Not eligible yet</p>
                    </div>
                    <p className="mt-1 text-sm text-amber-600/80 dark:text-amber-400/80">
                      You need {referralData.requiredForTuitionDiscount - referralData.successfulReferrals} more
                      successful referrals to be eligible for a tuition discount.
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => setShowTuitionDiscountDialog(true)}
                  disabled={!referralData.eligibleForTuitionDiscount || referralData.children.length === 0}
                >
                  Apply Tuition Discount
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Payout History</CardTitle>
              <CardDescription>Record of your cash payout requests</CardDescription>
            </CardHeader>
            <CardContent>
              {referralData.payoutHistory.length > 0 ? (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">Date</th>
                        <th className="p-2 text-left text-sm font-medium">Amount</th>
                        <th className="p-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralData.payoutHistory.map((payout) => (
                        <tr key={payout.id} className="border-b">
                          <td className="p-2 text-sm">{new Date(payout.date).toLocaleDateString()}</td>
                          <td className="p-2 text-sm">{payout.amount}</td>
                          <td className="p-2 text-sm">
                            <Badge
                              className={
                                payout.status === "Completed"
                                  ? "bg-green-500"
                                  : payout.status === "Pending"
                                    ? "bg-amber-500"
                                    : "bg-slate-500"
                              }
                            >
                              {payout.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-sm font-medium">No payout history</h3>
                  <p className="text-sm text-muted-foreground mt-1">You haven't requested any cash payouts yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tuition Discount History</CardTitle>
              <CardDescription>Record of your tuition discount applications</CardDescription>
            </CardHeader>
            <CardContent>
              {referralData.discountHistory.length > 0 ? (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">Date</th>
                        <th className="p-2 text-left text-sm font-medium">Child</th>
                        <th className="p-2 text-left text-sm font-medium">Term</th>
                        <th className="p-2 text-left text-sm font-medium">Discount</th>
                        <th className="p-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralData.discountHistory.map((discount) => (
                        <tr key={discount.id} className="border-b">
                          <td className="p-2 text-sm">{new Date(discount.date).toLocaleDateString()}</td>
                          <td className="p-2 text-sm">{discount.childName}</td>
                          <td className="p-2 text-sm">{discount.term}</td>
                          <td className="p-2 text-sm">{discount.amount}</td>
                          <td className="p-2 text-sm">
                            <Badge
                              className={
                                discount.status === "Applied"
                                  ? "bg-green-500"
                                  : discount.status === "Pending"
                                    ? "bg-amber-500"
                                    : "bg-slate-500"
                              }
                            >
                              {discount.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-sm font-medium">No discount history</h3>
                  <p className="text-sm text-muted-foreground mt-1">You haven't applied any tuition discounts yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cash Payout Request Dialog */}
      <Dialog open={showCashPayoutDialog} onOpenChange={setShowCashPayoutDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Cash Payout</DialogTitle>
            <DialogDescription>Complete the form to request your cash payout</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium">Payout Amount</h3>
              <p className="text-2xl font-bold mt-1">₦{referralData.cashPayoutAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                For {referralData.requiredForCashPayout} successful referrals
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "bank_transfer" && (
              <div className="space-y-2">
                <Label htmlFor="bank-details">Bank Details</Label>
                <Textarea
                  id="bank-details"
                  placeholder="Bank name, account number, account name"
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="request-notes">Additional Notes (Optional)</Label>
              <Textarea
                id="request-notes"
                placeholder="Any additional information"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCashPayoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={requestCashPayout}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tuition Discount Dialog */}
      <Dialog open={showTuitionDiscountDialog} onOpenChange={setShowTuitionDiscountDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply Tuition Discount</DialogTitle>
            <DialogDescription>Select a child to apply the tuition discount</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium">Discount Amount</h3>
              <p className="text-2xl font-bold mt-1">{referralData.discountPercentage}% on Tuition</p>
              <p className="text-xs text-muted-foreground mt-1">
                For {referralData.requiredForTuitionDiscount} successful referrals
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="select-child">Select Child</Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger id="select-child">
                  <SelectValue placeholder="Select a child" />
                </SelectTrigger>
                <SelectContent>
                  {referralData.children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name} ({child.grade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="request-notes">Additional Notes (Optional)</Label>
              <Textarea
                id="request-notes"
                placeholder="Any additional information"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTuitionDiscountDialog(false)}>
              Cancel
            </Button>
            <Button onClick={requestTuitionDiscount} disabled={!selectedChild}>
              Apply Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
