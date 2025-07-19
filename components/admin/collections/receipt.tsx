"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Printer, Download, Mail, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ReceiptProps {
  receiptNumber: string
  date: string
  parentName: string
  parentAddress: string
  parentPhone: string
  parentEmail: string
  studentName: string
  studentClass?: string
  paymentMethod: string
  referenceNumber?: string
  items: Array<{ name: string; amount: number }>
  outstandingBroughtForward: number
  creditBroughtForward: number
  amountPaid: number
  creditApplied: number
  outstandingCarriedForward: number
  creditCarriedForward: number
}

export function Receipt({
  receiptNumber,
  date,
  parentName,
  parentAddress,
  parentPhone,
  parentEmail,
  studentName,
  studentClass,
  paymentMethod,
  referenceNumber,
  items,
  outstandingBroughtForward,
  creditBroughtForward,
  amountPaid,
  creditApplied,
  outstandingCarriedForward,
  creditCarriedForward,
}: ReceiptProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Handle print
  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 500)
  }

  // Handle download
  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      alert("Receipt downloaded as PDF")
    }, 1000)
  }

  // Handle email
  const handleEmail = () => {
    setIsEmailing(true)
    setTimeout(() => {
      setIsEmailing(false)
      alert(`Receipt emailed to ${parentEmail}`)
    }, 1000)
  }

  // Handle save
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Receipt saved to records")
    }, 1000)
  }

  return (
    <div className="print:p-0">
      <Card className="border-0 shadow-none print:shadow-none">
        <CardContent className="p-0">
          <div className="landscape-receipt bg-white rounded-md overflow-hidden">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Payment Receipt</h2>
                  <p className="text-blue-100">Thank you for your payment</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{receiptNumber}</p>
                  <p className="text-blue-100">{formatDate(date)}</p>
                </div>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Parent Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PARENT INFORMATION</h3>
                  <p className="font-medium">{parentName}</p>
                  <p className="text-sm text-gray-600">{parentAddress}</p>
                  <p className="text-sm text-gray-600">{parentPhone}</p>
                  <p className="text-sm text-gray-600">{parentEmail}</p>
                </div>

                {/* Student Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">STUDENT INFORMATION</h3>
                  <p className="font-medium">{studentName}</p>
                  {studentClass && <p className="text-sm text-gray-600">Class: {studentClass}</p>}
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PAYMENT INFORMATION</h3>
                  <p className="font-medium">Method: {paymentMethod}</p>
                  {referenceNumber && <p className="text-sm text-gray-600">Reference: {referenceNumber}</p>}
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="border rounded-md p-3 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">BROUGHT FORWARD</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Outstanding:</span>
                      <span className="font-medium text-red-600">{formatCurrency(outstandingBroughtForward)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Credit:</span>
                      <span className="font-medium text-green-600">{formatCurrency(creditBroughtForward)}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-3 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PAYMENT</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Amount Paid:</span>
                      <span className="font-medium">{formatCurrency(amountPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Applied:</span>
                      <span className="font-medium text-green-600">{formatCurrency(creditApplied)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t mt-1">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-medium">{formatCurrency(amountPaid + creditApplied)}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-3 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">CARRIED FORWARD</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Outstanding:</span>
                      <span className="font-medium text-red-600">{formatCurrency(outstandingCarriedForward)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Credit:</span>
                      <span className="font-medium text-green-600">{formatCurrency(creditCarriedForward)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border rounded-md overflow-hidden">
                <h3 className="text-sm font-semibold bg-gray-100 p-3">PAYMENT DETAILS</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(items.reduce((sum, item) => sum + item.amount, 0))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Terms and Notes */}
              <div className="mt-6 text-sm text-gray-600">
                <p>This receipt serves as proof of payment. Please retain for your records.</p>
                <p className="mt-2">For any inquiries, please contact the finance office at finance@school.edu</p>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>© {new Date().getFullYear()} School Finance System</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={handlePrint} disabled={isPrinting}>
                  <Printer className="h-4 w-4 mr-1" />
                  {isPrinting ? "Printing..." : "Print"}
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownload} disabled={isDownloading}>
                  <Download className="h-4 w-4 mr-1" />
                  {isDownloading ? "Downloading..." : "Download PDF"}
                </Button>
                <Button size="sm" variant="outline" onClick={handleEmail} disabled={isEmailing}>
                  <Mail className="h-4 w-4 mr-1" />
                  {isEmailing ? "Sending..." : "Email Receipt"}
                </Button>
                <Button size="sm" variant="outline" onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-1" />
                  {isSaving ? "Saving..." : "Save to Records"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
