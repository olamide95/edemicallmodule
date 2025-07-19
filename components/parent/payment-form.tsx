"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CreditCard, Building, Wallet } from "lucide-react"
import { InfoIcon } from "lucide-react"

// Mock data
const paymentData = {
  outstandingBalance: 325000,
  outstandingCarriedForward: 75000,
  creditBalance: 25000,
  creditCarriedForward: 10000,
  children: [
    {
      id: "1",
      name: "Alex Smith",
      grade: "Grade 10A",
      amount: 250000,
      feeType: "Mandatory Fees",
      mandatoryFees: [
        { id: "tuition1", type: "Tuition Fee", amount: 150000 },
        { id: "dev1", type: "Development Levy", amount: 50000 },
        { id: "tech1", type: "Technology Fee", amount: 30000 },
        { id: "sports1", type: "Sports Fee", amount: 20000 },
      ],
      discounts: [
        {
          id: "early1",
          type: "Early Payment Discount",
          amount: -15000,
          description: "10% off tuition for early payment",
        },
      ],
      optionalFees: [
        { id: "lab1", type: "Laboratory Fee", amount: 15000, selected: false },
        { id: "excursion1", type: "Excursion Fee", amount: 25000, selected: false },
        { id: "uniform1", type: "Uniform Fee", amount: 18000, selected: false },
      ],
    },
    {
      id: "2",
      name: "Emma Smith",
      grade: "Grade 8B",
      amount: 200000,
      feeType: "Mandatory Fees",
      mandatoryFees: [
        { id: "tuition2", type: "Tuition Fee", amount: 120000 },
        { id: "dev2", type: "Development Levy", amount: 40000 },
        { id: "tech2", type: "Technology Fee", amount: 25000 },
        { id: "sports2", type: "Sports Fee", amount: 15000 },
      ],
      discounts: [
        { id: "sibling1", type: "Sibling Discount", amount: -24000, description: "20% off tuition for 2nd sibling" },
      ],
      optionalFees: [
        { id: "lab2", type: "Laboratory Fee", amount: 12000, selected: false },
        { id: "excursion2", type: "Excursion Fee", amount: 20000, selected: false },
        { id: "uniform2", type: "Uniform Fee", amount: 15000, selected: false },
      ],
    },
  ],
  paymentMethods: [
    { id: "paystack", name: "Paystack", icon: <CreditCard className="h-6 w-6 mb-2" /> },
    { id: "flutterwave", name: "Flutterwave", icon: <Building className="h-6 w-6 mb-2" /> },
    { id: "gtsquad", name: "GTSquad", icon: <Wallet className="h-6 w-6 mb-2" /> },
  ],
}

const settings = {
  allowPerChildSelection: true, // This would come from the backend in a real implementation
  isExemptParent: false, // This would be determined based on the logged-in parent
}

export function PaymentForm() {
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [applyCredit, setApplyCredit] = useState(false)
  const [amount, setAmount] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [expandedChild, setExpandedChild] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [optionalFees, setOptionalFees] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // If per-child selection is not allowed and the parent is not exempt, select all children by default
    if (!settings.allowPerChildSelection && !settings.isExemptParent && selectedChildren.length === 0) {
      setSelectedChildren(paymentData.children.map((child) => child.id))
    }
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount).replace(/NGN/g, "₦")
  }

  // Toggle child selection
  const toggleChildSelection = (childId: string) => {
    // If per-child selection is not allowed and the parent is not exempt, don't allow toggling
    if (!settings.allowPerChildSelection && !settings.isExemptParent) {
      // If we're initializing the form, select all children
      if (selectedChildren.length === 0) {
        setSelectedChildren(paymentData.children.map((child) => child.id))
      }
      return
    }

    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter((id) => id !== childId))
    } else {
      setSelectedChildren([...selectedChildren, childId])
    }
  }

  // Toggle fee breakdown expansion
  const toggleExpansion = (childId: string) => {
    if (expandedChild === childId) {
      setExpandedChild(null)
    } else {
      setExpandedChild(childId)
    }
  }

  // Toggle optional fee selection
  const toggleOptionalFee = (feeId: string, checked: boolean) => {
    setOptionalFees({
      ...optionalFees,
      [feeId]: checked,
    })
  }

  // Calculate total amount based on selected children and optional fees
  const calculateTotal = () => {
    let total = 0

    // Add mandatory fees for selected children
    paymentData.children
      .filter((child) => selectedChildren.includes(child.id))
      .forEach((child) => {
        total += child.amount

        // Add selected optional fees
        child.optionalFees.forEach((fee) => {
          if (optionalFees[fee.id]) {
            total += fee.amount
          }
        })
      })

    // Add outstanding carried forward
    total += paymentData.outstandingCarriedForward

    return total
  }

  // Calculate minimum payment (30% of total)
  const calculateMinimumPayment = () => {
    return Math.round(calculateTotal() * 0.3)
  }

  // Calculate total optional fees selected
  const calculateOptionalFeesTotal = (childId: string) => {
    const child = paymentData.children.find((c) => c.id === childId)
    if (!child) return 0

    return child.optionalFees.reduce((total, fee) => {
      return total + (optionalFees[fee.id] ? fee.amount : 0)
    }, 0)
  }

  // Calculate total discounts for a child
  const calculateDiscountsTotal = (childId: string) => {
    const child = paymentData.children.find((c) => c.id === childId)
    if (!child || !child.discounts) return 0

    return child.discounts.reduce((total, discount) => {
      return total + discount.amount
    }, 0)
  }

  // Handle amount change with validation
  const handleAmountChange = (value: string) => {
    // Allow user to type any amount
    setAmount(value)

    // Clear error if it exists
    if (errors.amount) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.amount
        return newErrors
      })
    }
  }

  // Validate amount when focus leaves the field
  const handleAmountBlur = () => {
    const numAmount = Number(amount)
    const minimumPayment = calculateMinimumPayment()

    if (isNaN(numAmount) || numAmount <= 0) {
      setErrors((prev) => ({ ...prev, amount: "Please enter a valid amount" }))
      return
    }

    // If amount is less than minimum payment, revert to minimum
    if (numAmount < minimumPayment) {
      setAmount(minimumPayment.toString())
      setErrors((prev) => ({
        ...prev,
        amount: `Amount cannot be less than the minimum payment of ${formatCurrency(minimumPayment)}`,
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (selectedChildren.length === 0) {
      newErrors.children = "Please select at least one child"
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method"
    }

    const numAmount = Number(amount)
    const minimumPayment = calculateMinimumPayment()

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (numAmount < minimumPayment) {
      newErrors.amount = `Amount cannot be less than the minimum payment of ${formatCurrency(minimumPayment)}`
      setAmount(minimumPayment.toString())
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment initiated successfully!")

      // Reset form
      setSelectedChildren([])
      setPaymentMethod("")
      setAmount("")
      setApplyCredit(false)
      setOptionalFees({})
    }, 2000)
  }

  // Calculate credit to be applied
  const calculateAppliedCredit = () => {
    return applyCredit ? paymentData.creditBalance : 0
  }

  // Calculate final payment amount after credit
  const calculateFinalPayment = () => {
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) return 0
    return Math.max(0, numAmount - calculateAppliedCredit())
  }

  // Calculate carried forward amounts based on payment
  const calculateCarriedForward = () => {
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) return { credit: 0, outstanding: 0 }

    const totalDue = calculateTotal()
    const paymentWithCredit = numAmount + (applyCredit ? paymentData.creditBalance : 0)

    if (paymentWithCredit > totalDue) {
      // Credit carried forward (excess payment)
      return { credit: paymentWithCredit - totalDue, outstanding: 0 }
    } else {
      // Outstanding carried forward (remaining balance)
      return { credit: 0, outstanding: totalDue - paymentWithCredit }
    }
  }

  // Calculate child total after discounts
  const calculateChildTotalAfterDiscounts = (childId: string) => {
    const child = paymentData.children.find((c) => c.id === childId)
    if (!child) return 0

    const mandatoryTotal = child.mandatoryFees.reduce((sum, fee) => sum + fee.amount, 0)
    const discountsTotal = calculateDiscountsTotal(childId)
    const optionalTotal = calculateOptionalFeesTotal(childId)

    return mandatoryTotal + discountsTotal + optionalTotal
  }

  return (
    <div className="space-y-6">
      {/* Balance Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Outstanding Balance */}
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="font-medium">Outstanding Balance</div>
          <div className="flex justify-between mt-1">
            <span>Current:</span>
            <span>{formatCurrency(paymentData.outstandingBalance)}</span>
          </div>
          <div className="flex justify-between mt-1 font-medium">
            <span>Total:</span>
            <span>{formatCurrency(paymentData.outstandingBalance)}</span>
          </div>
        </div>

        {/* Credit Balance */}
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-blue-600">
          <div className="font-medium">Credit Balance</div>
          <div className="flex justify-between mt-1">
            <span>Current:</span>
            <span>{formatCurrency(paymentData.creditBalance)}</span>
          </div>
          <div className="flex justify-between mt-1 font-medium">
            <span>Total:</span>
            <span>{formatCurrency(paymentData.creditBalance)}</span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              id="apply-credit"
              checked={applyCredit}
              onCheckedChange={(checked) => setApplyCredit(checked as boolean)}
            />
            <Label htmlFor="apply-credit" className="cursor-pointer">
              Apply credit to this payment
            </Label>
          </div>
        </div>
      </div>

      {/* Select Children */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Children</h2>

        {!settings.allowPerChildSelection && !settings.isExemptParent && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>All children selected</AlertTitle>
            <AlertDescription>
              Based on school policy, fees must be paid for all children simultaneously.
            </AlertDescription>
          </Alert>
        )}

        {paymentData.children.map((child) => (
          <div key={child.id} className="rounded-md border p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`child-${child.id}`}
                  checked={selectedChildren.includes(child.id)}
                  onCheckedChange={() => toggleChildSelection(child.id)}
                  disabled={!settings.allowPerChildSelection && !settings.isExemptParent}
                />
                <div>
                  <Label htmlFor={`child-${child.id}`} className="text-base font-medium cursor-pointer">
                    {child.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{child.grade}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(calculateChildTotalAfterDiscounts(child.id))}</div>
                <div className="text-sm text-muted-foreground">{child.feeType}</div>
              </div>
            </div>

            {selectedChildren.includes(child.id) && (
              <div className="mt-4 pl-7">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:underline"
                  onClick={() => toggleExpansion(child.id)}
                >
                  {expandedChild === child.id ? "Hide Fee Breakdown" : "Show Fee Breakdown"}
                </button>

                {expandedChild === child.id && (
                  <div className="mt-2 space-y-4">
                    {/* Mandatory Fees */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 flex justify-between">
                        <span className="font-medium">Mandatory Fees</span>
                        <span className="font-medium">Amount</span>
                      </div>
                      {child.mandatoryFees.map((fee, index) => (
                        <div key={index} className="px-4 py-2 flex justify-between border-t">
                          <span>{fee.type}</span>
                          <span>{formatCurrency(fee.amount)}</span>
                        </div>
                      ))}
                      <div className="px-4 py-2 flex justify-between border-t bg-muted/30">
                        <span className="font-medium">Total Mandatory Fees</span>
                        <span className="font-medium">
                          {formatCurrency(child.mandatoryFees.reduce((sum, fee) => sum + fee.amount, 0))}
                        </span>
                      </div>
                    </div>

                    {/* Discounts */}
                    {child.discounts && child.discounts.length > 0 && (
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted/50 px-4 py-2 flex justify-between">
                          <span className="font-medium">Discounts</span>
                          <span className="font-medium">Amount</span>
                        </div>
                        {child.discounts.map((discount, index) => (
                          <div key={index} className="px-4 py-2 flex justify-between border-t">
                            <div>
                              <div>{discount.type}</div>
                              <div className="text-xs text-muted-foreground">{discount.description}</div>
                            </div>
                            <span className="text-green-600">{formatCurrency(discount.amount)}</span>
                          </div>
                        ))}
                        <div className="px-4 py-2 flex justify-between border-t bg-muted/30">
                          <span className="font-medium">Total Discounts</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(calculateDiscountsTotal(child.id))}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Optional Fees */}
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 flex justify-between">
                        <span className="font-medium">Optional Fees</span>
                        <span className="font-medium">Amount</span>
                      </div>
                      {child.optionalFees.map((fee, index) => (
                        <div key={index} className="px-4 py-2 flex justify-between border-t items-center">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`fee-${fee.id}`}
                              checked={!!optionalFees[fee.id]}
                              onCheckedChange={(checked) => toggleOptionalFee(fee.id, checked as boolean)}
                            />
                            <Label htmlFor={`fee-${fee.id}`} className="cursor-pointer">
                              {fee.type}
                            </Label>
                          </div>
                          <span>{formatCurrency(fee.amount)}</span>
                        </div>
                      ))}
                      <div className="px-4 py-2 flex justify-between border-t bg-muted/30">
                        <span className="font-medium">Total Optional Fees Selected</span>
                        <span className="font-medium">{formatCurrency(calculateOptionalFeesTotal(child.id))}</span>
                      </div>
                    </div>

                    {/* Total Fees */}
                    <div className="px-4 py-2 flex justify-between font-medium">
                      <span>Total Fees for {child.name}</span>
                      <span>{formatCurrency(calculateChildTotalAfterDiscounts(child.id))}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {errors.children && <p className="text-sm text-red-500">{errors.children}</p>}
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Method</h2>

        <div className="grid grid-cols-3 gap-4">
          {paymentData.paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`rounded-md border p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                paymentMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              {method.icon}
              <span className="font-medium">{method.name}</span>
            </div>
          ))}
        </div>
        {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}
      </div>

      {/* Payment Amount - Enhanced Implementation */}
      {selectedChildren.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="amount" className="text-xl font-semibold">
              Payment Amount
            </Label>
            <div className="text-sm text-muted-foreground">Total fees: {formatCurrency(calculateTotal())}</div>
          </div>
          <Input
            id="amount"
            type="number"
            placeholder={`Minimum: ${formatCurrency(calculateMinimumPayment())}`}
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onBlur={handleAmountBlur}
            className="text-lg"
          />
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Minimum payment amount: {formatCurrency(calculateMinimumPayment())}</p>
            {applyCredit && (
              <p className="text-green-600">Credit applied: {formatCurrency(calculateAppliedCredit())}</p>
            )}
          </div>
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}

          {/* Payment Summary */}
          {amount && !isNaN(Number(amount)) && Number(amount) > 0 && (
            <div className="mt-4 p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-2">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Due:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Amount:</span>
                  <span>{formatCurrency(Number(amount))}</span>
                </div>
                {applyCredit && (
                  <div className="flex justify-between text-green-600">
                    <span>Credit Applied:</span>
                    <span>- {formatCurrency(calculateAppliedCredit())}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Amount to Pay:</span>
                  <span>{formatCurrency(calculateFinalPayment())}</span>
                </div>

                {/* Carried Forward Section */}
                <div className="pt-4 mt-2 border-t">
                  <h4 className="font-medium mb-2">After Payment</h4>
                  {calculateCarriedForward().outstanding > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Outstanding Carried Forward:</span>
                      <span>{formatCurrency(calculateCarriedForward().outstanding)}</span>
                    </div>
                  )}
                  {calculateCarriedForward().credit > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Credit Carried Forward:</span>
                      <span>{formatCurrency(calculateCarriedForward().credit)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Alert */}
      {selectedChildren.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please ensure all payment details are correct before proceeding. Payments may take up to 24 hours to reflect
            in your account.
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      {selectedChildren.length > 0 && (
        <Button type="button" className="w-full" size="lg" onClick={handleSubmit} disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${formatCurrency(calculateFinalPayment())}`}
        </Button>
      )}
    </div>
  )
}
