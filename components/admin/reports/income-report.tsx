"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, PieChart, BarChart } from "lucide-react"

// Sample data
const incomeData = {
  firstTerm: [
    { id: 1, feeHead: "Tuition Fee", amount: "$125,000.00", percentage: 65 },
    { id: 2, feeHead: "Development Fee", amount: "$35,000.00", percentage: 18 },
    { id: 3, feeHead: "Library Fee", amount: "$15,000.00", percentage: 8 },
    { id: 4, feeHead: "Technology Fee", amount: "$12,000.00", percentage: 6 },
    { id: 5, feeHead: "Sports Fee", amount: "$6,000.00", percentage: 3 },
  ],
  secondTerm: [
    { id: 1, feeHead: "Tuition Fee", amount: "$118,000.00", percentage: 64 },
    { id: 2, feeHead: "Development Fee", amount: "$32,000.00", percentage: 17 },
    { id: 3, feeHead: "Library Fee", amount: "$14,000.00", percentage: 8 },
    { id: 4, feeHead: "Technology Fee", amount: "$13,000.00", percentage: 7 },
    { id: 5, feeHead: "Sports Fee", amount: "$7,000.00", percentage: 4 },
  ],
  thirdTerm: [
    { id: 1, feeHead: "Tuition Fee", amount: "$120,000.00", percentage: 63 },
    { id: 2, feeHead: "Development Fee", amount: "$34,000.00", percentage: 18 },
    { id: 3, feeHead: "Library Fee", amount: "$16,000.00", percentage: 8 },
    { id: 4, feeHead: "Technology Fee", amount: "$14,000.00", percentage: 7 },
    { id: 5, feeHead: "Sports Fee", amount: "$8,000.00", percentage: 4 },
  ],
}

export function IncomeReport() {
  const [currentTerm, setCurrentTerm] = useState("firstTerm")

  const calculateTotal = (term) => {
    return incomeData[term].reduce((sum, item) => {
      return sum + Number.parseFloat(item.amount.replace("$", "").replace(",", ""))
    }, 0)
  }

  const totalIncome = calculateTotal(currentTerm)

  return (
    <div className="space-y-4">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Income Report</CardTitle>
          <CardDescription>View and analyze income by fee head and term</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="firstTerm" onValueChange={setCurrentTerm} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="firstTerm">1st Term</TabsTrigger>
                <TabsTrigger value="secondTerm">2nd Term</TabsTrigger>
                <TabsTrigger value="thirdTerm">3rd Term</TabsTrigger>
              </TabsList>
              <Button className="bg-primary-solid hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <TabsContent value="firstTerm" className="space-y-4">
              <IncomeTermContent data={incomeData.firstTerm} totalIncome={calculateTotal("firstTerm")} />
            </TabsContent>

            <TabsContent value="secondTerm" className="space-y-4">
              <IncomeTermContent data={incomeData.secondTerm} totalIncome={calculateTotal("secondTerm")} />
            </TabsContent>

            <TabsContent value="thirdTerm" className="space-y-4">
              <IncomeTermContent data={incomeData.thirdTerm} totalIncome={calculateTotal("thirdTerm")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function IncomeTermContent({ data, totalIncome }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-info-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-info text-lg">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-primary-light">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg">Income Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-primary">
              <PieChart className="h-12 w-12" />
            </div>
            <div className="text-primary">
              <BarChart className="h-12 w-12" />
            </div>
            <Button variant="outline" className="text-primary border-primary">
              View Charts
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-table-header">
            <TableRow>
              <TableHead>Fee Head</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Visualization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.feeHead}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
                <TableCell>
                  <div className="w-full bg-secondary-light rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
