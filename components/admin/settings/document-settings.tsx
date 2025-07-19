"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon as FileUpload } from "lucide-react"
import { ReceiptTemplate1 } from "../collections/receipt-template-1"
import { ReceiptTemplate2 } from "../collections/receipt-template-2"

export function DocumentSettings() {
  const [invoicePreview, setInvoicePreview] = useState("/professional-invoice-layout.png")
  const [receiptPreview, setReceiptPreview] = useState("/basic-service-receipt.png")
  const [selectedReceiptTemplate, setSelectedReceiptTemplate] = useState("template1")

  const sampleReceiptData = {
    company: "ABC International School",
    address: "456 Education Avenue, Lagos",
    phone: "+234 123 456 7890",
    email: "info@abcinternationalschool.edu.ng",
    website: "www.abcinternationalschool.edu.ng",
    receiptNumber: "RCT-10045",
    date: "2023-05-10",
    customer: {
      name: "Mr. & Mrs. Smith",
      email: "smith@example.com",
      address: "123 Lagos Street, Ikeja, Lagos",
    },
    amountPaid: 1200.0,
    balanceDue: 500.0,
    paymentMethod: "Bank Transfer",
    notes: "Thank you for your payment!",
    invoice: {
      reference: "INV-2023-001",
      amount: 1700.0,
    },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="invoice" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoice">Invoice Settings</TabsTrigger>
          <TabsTrigger value="receipt">Receipt Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="invoice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Template</CardTitle>
              <CardDescription>Configure the appearance and numbering of invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-template">Invoice Template</Label>
                    <Select defaultValue="template-1">
                      <SelectTrigger id="invoice-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template-1">Premium Template 1</SelectItem>
                        <SelectItem value="template-2">Premium Template 2</SelectItem>
                        <SelectItem value="template-3">Premium Template 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                    <Input id="invoice-prefix" placeholder="INV" defaultValue="INV" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice-start">Starting Number</Label>
                    <Input id="invoice-start" type="number" placeholder="1001" defaultValue="1001" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice-email">Email Template</Label>
                    <Select defaultValue="email-1">
                      <SelectTrigger id="invoice-email">
                        <SelectValue placeholder="Select email template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email-1">Invoice Notification</SelectItem>
                        <SelectItem value="email-2">Fee Due Reminder</SelectItem>
                        <SelectItem value="email-3">Custom Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Template Preview</Label>
                  <div className="border rounded-md overflow-hidden">
                    <img
                      src={invoicePreview || "/placeholder.svg"}
                      alt="Invoice Template Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Signature and Seal</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="signature-upload">Upload Signature</Label>
                    <div className="flex items-center gap-2">
                      <Input id="signature-upload" type="file" className="hidden" />
                      <Button variant="outline" asChild>
                        <label htmlFor="signature-upload" className="cursor-pointer">
                          <FileUpload className="h-4 w-4 mr-2" />
                          Upload Signature
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seal-upload">Upload Seal</Label>
                    <div className="flex items-center gap-2">
                      <Input id="seal-upload" type="file" className="hidden" />
                      <Button variant="outline" asChild>
                        <label htmlFor="seal-upload" className="cursor-pointer">
                          <FileUpload className="h-4 w-4 mr-2" />
                          Upload Seal
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Template</CardTitle>
              <CardDescription>Configure the appearance and numbering of receipts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-template">Receipt Template</Label>
                    <Select value={selectedReceiptTemplate} onValueChange={setSelectedReceiptTemplate}>
                      <SelectTrigger id="receipt-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">Template 1 - Classic</SelectItem>
                        <SelectItem value="template2">Template 2 - Modern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-prefix">Receipt Number Prefix</Label>
                    <Input id="receipt-prefix" placeholder="RCT" defaultValue="RCT" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-start">Starting Number</Label>
                    <Input id="receipt-start" type="number" placeholder="1001" defaultValue="1001" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-email">Email Template</Label>
                    <Select defaultValue="email-1">
                      <SelectTrigger id="receipt-email">
                        <SelectValue placeholder="Select email template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email-1">Payment Confirmation</SelectItem>
                        <SelectItem value="email-2">Thank You for Payment</SelectItem>
                        <SelectItem value="email-3">Custom Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Template Preview</Label>
                  <div className="border rounded-md overflow-hidden max-h-[400px] overflow-y-auto">
                    {selectedReceiptTemplate === "template1" ? (
                      <ReceiptTemplate1 data={sampleReceiptData} />
                    ) : (
                      <ReceiptTemplate2 data={sampleReceiptData} />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Signature and Seal</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-signature-upload">Upload Signature</Label>
                    <div className="flex items-center gap-2">
                      <Input id="receipt-signature-upload" type="file" className="hidden" />
                      <Button variant="outline" asChild>
                        <label htmlFor="receipt-signature-upload" className="cursor-pointer">
                          <FileUpload className="h-4 w-4 mr-2" />
                          Upload Signature
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-seal-upload">Upload Seal</Label>
                    <div className="flex items-center gap-2">
                      <Input id="receipt-seal-upload" type="file" className="hidden" />
                      <Button variant="outline" asChild>
                        <label htmlFor="receipt-seal-upload" className="cursor-pointer">
                          <FileUpload className="h-4 w-4 mr-2" />
                          Upload Seal
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
