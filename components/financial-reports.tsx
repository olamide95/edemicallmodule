"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DownloadIcon, PrinterIcon, BarChart3Icon } from "lucide-react"

export function FinancialReports() {
  const [selectedTerm, setSelectedTerm] = useState("current")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>View financial reports for extracurricular activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Term</SelectItem>
                  <SelectItem value="previous">Previous Term</SelectItem>
                  <SelectItem value="year">Full Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <PrinterIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="income-statement">
            <TabsList className="mb-6">
              <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
              <TabsTrigger value="revenue-by-club">Revenue by Club</TabsTrigger>
              <TabsTrigger value="expense-by-category">Expense by Category</TabsTrigger>
            </TabsList>

            <TabsContent value="income-statement">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-medium">
                      <TableCell>Revenue</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Club Fees</TableCell>
                      <TableCell className="text-right">₦1,075,000</TableCell>
                      <TableCell className="text-right">86%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Club Variants</TableCell>
                      <TableCell className="text-right">₦175,000</TableCell>
                      <TableCell className="text-right">14%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium">
                      <TableCell>Total Revenue</TableCell>
                      <TableCell className="text-right">₦1,250,000</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>

                    <TableRow className="font-medium">
                      <TableCell>Expenses</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Vendor Payments</TableCell>
                      <TableCell className="text-right">₦350,000</TableCell>
                      <TableCell className="text-right">41.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Club Materials</TableCell>
                      <TableCell className="text-right">₦80,000</TableCell>
                      <TableCell className="text-right">9.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Staff Allowances</TableCell>
                      <TableCell className="text-right">₦250,000</TableCell>
                      <TableCell className="text-right">29.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Venue Maintenance</TableCell>
                      <TableCell className="text-right">₦170,000</TableCell>
                      <TableCell className="text-right">20%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium">
                      <TableCell>Total Expenses</TableCell>
                      <TableCell className="text-right">₦850,000</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>

                    <TableRow className="font-medium bg-muted/50">
                      <TableCell>Net Income</TableCell>
                      <TableCell className="text-right">₦400,000</TableCell>
                      <TableCell className="text-right">32% of revenue</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="revenue-by-club">
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <BarChart3Icon className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Revenue by club chart would appear here</p>
                </div>
              </div>

              <div className="rounded-md border mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Club</TableHead>
                      <TableHead className="text-right">Students</TableHead>
                      <TableHead className="text-right">Base Revenue</TableHead>
                      <TableHead className="text-right">Variant Revenue</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Chess Club</TableCell>
                      <TableCell className="text-right">25</TableCell>
                      <TableCell className="text-right">₦375,000</TableCell>
                      <TableCell className="text-right">₦75,000</TableCell>
                      <TableCell className="text-right">₦450,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Robotics Club</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">₦300,000</TableCell>
                      <TableCell className="text-right">₦150,000</TableCell>
                      <TableCell className="text-right">₦450,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Science Club</TableCell>
                      <TableCell className="text-right">22</TableCell>
                      <TableCell className="text-right">₦220,000</TableCell>
                      <TableCell className="text-right">₦0</TableCell>
                      <TableCell className="text-right">₦220,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Art Club</TableCell>
                      <TableCell className="text-right">18</TableCell>
                      <TableCell className="text-right">₦180,000</TableCell>
                      <TableCell className="text-right">₦0</TableCell>
                      <TableCell className="text-right">₦180,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Music Club</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">₦175,000</TableCell>
                      <TableCell className="text-right">₦0</TableCell>
                      <TableCell className="text-right">₦175,000</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">95</TableCell>
                      <TableCell className="text-right">₦1,250,000</TableCell>
                      <TableCell className="text-right">₦225,000</TableCell>
                      <TableCell className="text-right">₦1,475,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expense-by-category">
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <BarChart3Icon className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">Expense by category chart would appear here</p>
                </div>
              </div>

              <div className="rounded-md border mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Vendor Payments</TableCell>
                      <TableCell className="text-right">₦350,000</TableCell>
                      <TableCell className="text-right">41.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Club Materials</TableCell>
                      <TableCell className="text-right">₦80,000</TableCell>
                      <TableCell className="text-right">9.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Staff Allowances</TableCell>
                      <TableCell className="text-right">₦250,000</TableCell>
                      <TableCell className="text-right">29.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Venue Maintenance</TableCell>
                      <TableCell className="text-right">₦170,000</TableCell>
                      <TableCell className="text-right">20%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-muted/50">
                      <TableCell>Total Expenses</TableCell>
                      <TableCell className="text-right">₦850,000</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
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
