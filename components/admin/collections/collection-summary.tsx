"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { Download, BarChart3, PieChartIcon } from "lucide-react"

// Sample data
const monthlyData = [
  { name: "Jan", amount: 12000 },
  { name: "Feb", amount: 19000 },
  { name: "Mar", amount: 15000 },
  { name: "Apr", amount: 22000 },
  { name: "May", amount: 28000 },
  { name: "Jun", amount: 25000 },
  { name: "Jul", amount: 18000 },
  { name: "Aug", amount: 21000 },
  { name: "Sep", amount: 35000 },
  { name: "Oct", amount: 32000 },
  { name: "Nov", amount: 27000 },
  { name: "Dec", amount: 29000 },
]

const methodData = [
  { name: "Bank Transfer", value: 45 },
  { name: "Paystack", value: 25 },
  { name: "Flutterwave", value: 15 },
  { name: "GTSquad", value: 10 },
  { name: "Cash", value: 5 },
]

const classData = [
  { name: "Grade 7", amount: 42000 },
  { name: "Grade 8", amount: 38000 },
  { name: "Grade 9", amount: 45000 },
  { name: "Grade 10", amount: 52000 },
  { name: "Grade 11", amount: 48000 },
  { name: "Grade 12", amount: 58000 },
]

const COLORS = ["#8C57FF", "#16B1FF", "#56CA00", "#FFB400", "#FF4C51", "#8A8D93"]

export function CollectionSummary() {
  const [year, setYear] = useState("2023")
  const [term, setTerm] = useState("all")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Collection Summary</CardTitle>
            <CardDescription>Analyze fee collection patterns</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Select value={term} onValueChange={setTerm}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terms</SelectItem>
                <SelectItem value="first">First Term</SelectItem>
                <SelectItem value="second">Second Term</SelectItem>
                <SelectItem value="third">Third Term</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="space-y-4">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
              <TabsTrigger value="method">Payment Methods</TabsTrigger>
              <TabsTrigger value="class">By Class</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Monthly Collection Trend</CardTitle>
                    <CardDescription>Fee collection by month</CardDescription>
                  </div>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Amount"]}
                          contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                        />
                        <Legend />
                        <Bar dataKey="amount" name="Collection Amount" fill="#8C57FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="method" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Payment Method Distribution</CardTitle>
                    <CardDescription>Collection by payment method</CardDescription>
                  </div>
                  <PieChartIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={methodData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {methodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                          contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="class" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Collection by Class</CardTitle>
                    <CardDescription>Fee collection by grade level</CardDescription>
                  </div>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Amount"]}
                          contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                        />
                        <Legend />
                        <Bar dataKey="amount" name="Collection Amount" fill="#16B1FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
