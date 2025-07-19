"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CreditCard, BanknoteIcon } from "lucide-react"

// Sample data
const paymentData = {
  transfers: [
    {
      id: 1,
      transactionId: "TRF-10045",
      parentName: "John Smith",
      date: "2023-05-10",
      amount: "$1,200.00",
      bankAccount: "School Main Account",
      reference: "Fee Payment - Alex Smith",
      status: "Completed",
    },
    {
      id: 2,
      transactionId: "TRF-10046",
      parentName: "Sarah Johnson",
      date: "2023-05-09",
      amount: "$1,500.00",
      bankAccount: "Development Fund",
      reference: "Fee Payment - Emma Johnson",
      status: "Completed",
    },
    {
      id: 3,
      transactionId: "TRF-10047",
      parentName: "Michael Brown",
      date: "2023-05-08",
      amount: "$800.00",
      bankAccount: "School Main Account",
      reference: "Fee Payment - James Brown",
      status: "Completed",
    },
  ],
  gateways: [
    {
      id: 1,
      transactionId: "PAY-10048",
      parentName: "Emily Davis",
      date: "2023-05-07",
      amount: "$2,300.00",
      gateway: "Paystack",
      reference: "Fee Payment - Sophia Davis",
      status: "Completed",
    },
    {
      id: 2,
      transactionId: "PAY-10049",
      parentName: "Robert Wilson",
      date: "2023-05-06",
      amount: "$950.00",
      gateway: "Flutterwave",
      reference: "Fee Payment - Oliver Wilson",
      status: "Completed",
    },
    {
      id: 3,
      transactionId: "PAY-10050",
      parentName: "Jennifer Lee",
      date: "2023-05-05",
      amount: "$1,750.00",
      gateway: "GTSquad",
      reference: "Fee Payment - William Lee",
      status: "Completed",
    },
  ],
}

export function PaymentReport() {
  const [currentTab, setCurrentTab] = useState("transfers")

  const calculateTotal = (tab) => {
    return paymentData[tab].reduce((sum, item) => {
      return sum + Number.parseFloat(item.amount.replace("$", "").replace(",", ""))
    }, 0)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Payment Report</CardTitle>
          <CardDescription>View and analyze payments by method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transfers" onValueChange={setCurrentTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="transfers">Bank Transfers</TabsTrigger>
                <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
              </TabsList>
              <Button className="bg-primary-solid hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <TabsContent value="transfers" className="space-y-4">
              <div className="rounded-md border mb-6">
                <div className="flex flex-col md:flex-row justify-between p-4 bg-success-light">
                  <div>
                    <h3 className="font-semibold text-success">Total Bank Transfers</h3>
                    <p className="text-2xl font-bold text-success">${calculateTotal("transfers").toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-success">Total Transactions</h3>
                    <p className="text-2xl font-bold text-success">{paymentData.transfers.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-table-header">
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Bank Account</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.transfers.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.transactionId}</TableCell>
                        <TableCell>{item.parentName}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <BanknoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {item.bankAccount}
                          </div>
                        </TableCell>
                        <TableCell>{item.reference}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-light text-success">
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="gateways" className="space-y-4">
              <div className="rounded-md border mb-6">
                <div className="flex flex-col md:flex-row justify-between p-4 bg-info-light">
                  <div>
                    <h3 className="font-semibold text-info">Total Gateway Payments</h3>
                    <p className="text-2xl font-bold text-info">${calculateTotal("gateways").toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-info">Total Transactions</h3>
                    <p className="text-2xl font-bold text-info">{paymentData.gateways.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-table-header">
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Gateway</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.gateways.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.transactionId}</TableCell>
                        <TableCell>{item.parentName}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                            {item.gateway}
                          </div>
                        </TableCell>
                        <TableCell>{item.reference}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-light text-success">
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
