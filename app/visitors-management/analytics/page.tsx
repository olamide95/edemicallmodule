"use client"

import { useState } from "react"
import {
  Users,
  Clock,
  Building,
  CalendarIcon,
  ChevronRight,
  Download,
  Filter,
  Printer,
  RefreshCw,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisitorsAnalyticsPage() {
  const [dateRange, setDateRange] = useState("last7days")

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white mb-2">Visitor Analytics Dashboard</h1>

            <div className="flex items-center gap-2 text-sm mb-4">
              <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">Apps</span>
              <ChevronRight size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]" />
              <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">Visitors Management</span>
              <ChevronRight size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]" />
              <span className="text-[#8C57FF] font-medium">Analytics</span>
            </div>

            <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Comprehensive analytics and reporting for visitor management. Track trends, generate insights, and export
              reports.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)]"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>

            <Button className="bg-[#8C57FF] hover:bg-[#7C3AED] text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-[#312D4B]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm font-medium">Total Visitors</p>
                <h3 className="text-3xl font-bold mt-1 text-[#2E263D] dark:text-white">2,845</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-[#56CA00] mr-1" />
                  <span className="text-[#56CA00] font-medium text-sm">+12%</span>
                  <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm ml-1">
                    vs previous period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-[#8C57FF]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#8C57FF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#312D4B]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm font-medium">
                  Avg. Visit Duration
                </p>
                <h3 className="text-3xl font-bold mt-1 text-[#2E263D] dark:text-white">42 min</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-[#FF4C51] mr-1 rotate-180" />
                  <span className="text-[#FF4C51] font-medium text-sm">-5%</span>
                  <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm ml-1">
                    vs previous period
                  </span>
                </div>
              </div>
              <div className="p-3 bg-[#56CA00]/10 rounded-lg">
                <Clock className="w-6 h-6 text-[#56CA00]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#312D4B]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm font-medium">
                  Most Visited Dept.
                </p>
                <h3 className="text-xl font-bold mt-1 text-[#2E263D] dark:text-white">Admin Office</h3>
                <div className="flex items-center mt-2">
                  <span className="text-[#56CA00] font-medium text-sm">78 visits</span>
                  <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm ml-1">this period</span>
                </div>
              </div>
              <div className="p-3 bg-[#16B1FF]/10 rounded-lg">
                <Building className="w-6 h-6 text-[#16B1FF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#312D4B]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm font-medium">Busiest Day</p>
                <h3 className="text-xl font-bold mt-1 text-[#2E263D] dark:text-white">Friday</h3>
                <div className="flex items-center mt-2">
                  <span className="text-[#56CA00] font-medium text-sm">45 visits</span>
                  <span className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] text-sm ml-1">on average</span>
                </div>
              </div>
              <div className="p-3 bg-[#FFB400]/10 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-[#FFB400]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-[#312D4B]">
          <CardHeader>
            <CardTitle className="text-[#2E263D] dark:text-white">Visitors by Day of Week</CardTitle>
            <CardDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              Distribution of visitors across weekdays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-[#8C57FF] mx-auto mb-4" />
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                  Chart visualization will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#312D4B]">
          <CardHeader>
            <CardTitle className="text-[#2E263D] dark:text-white">Visitors by Purpose</CardTitle>
            <CardDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
              Distribution of visitors by visit purpose
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-[#16B1FF] mx-auto mb-4" />
                <p className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                  Pie chart visualization will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visitors */}
      <Card className="bg-white dark:bg-[#312D4B]">
        <CardHeader>
          <CardTitle className="text-[#2E263D] dark:text-white">Recent Visitors</CardTitle>
          <CardDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            Latest visitor records and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">Visitor</th>
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">Purpose</th>
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">Check In</th>
                  <th className="text-left py-3 px-4 font-medium text-[#2E263D] dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "V-2024-0568",
                    name: "John Smith",
                    purpose: "Parent Meeting",
                    host: "Ms. Johnson",
                    checkIn: "09:15 AM",
                    status: "Completed",
                  },
                  {
                    id: "V-2024-0567",
                    name: "Sarah Williams",
                    purpose: "Vendor Delivery",
                    host: "Mr. Roberts",
                    checkIn: "10:45 AM",
                    status: "Completed",
                  },
                  {
                    id: "V-2024-0566",
                    name: "Michael Johnson",
                    purpose: "Interview",
                    host: "Ms. Davis",
                    checkIn: "01:30 PM",
                    status: "Completed",
                  },
                  {
                    id: "V-2024-0565",
                    name: "Emily Brown",
                    purpose: "Parent Meeting",
                    host: "Mr. Wilson",
                    checkIn: "02:15 PM",
                    status: "Completed",
                  },
                  {
                    id: "V-2024-0564",
                    name: "David Miller",
                    purpose: "Event Setup",
                    host: "Ms. Thompson",
                    checkIn: "03:30 PM",
                    status: "Completed",
                  },
                ].map((visitor, index) => (
                  <tr
                    key={visitor.id}
                    className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] hover:bg-[#F9FAFB] dark:hover:bg-[#28243D] transition-colors"
                  >
                    <td className="py-3 px-4 text-[#2E263D] dark:text-white">{visitor.id}</td>
                    <td className="py-3 px-4 text-[#2E263D] dark:text-white">{visitor.name}</td>
                    <td className="py-3 px-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">{visitor.purpose}</td>
                    <td className="py-3 px-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">{visitor.host}</td>
                    <td className="py-3 px-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">{visitor.checkIn}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#56CA00]/20 text-[#56CA00]">
                        {visitor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-white dark:bg-[#312D4B]">
        <CardHeader>
          <CardTitle className="text-[#2E263D] dark:text-white">Key Insights</CardTitle>
          <CardDescription className="text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            Important trends and patterns from visitor data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#56CA00]/10 rounded-md">
                <TrendingUp className="w-5 h-5 text-[#56CA00]" />
              </div>
              <div>
                <h4 className="font-medium text-[#2E263D] dark:text-white mb-1">Peak Hours</h4>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                  Highest traffic between 10-11 AM with 45 visitors on average.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FFB400]/10 rounded-md">
                <BarChart3 className="w-5 h-5 text-[#FFB400]" />
              </div>
              <div>
                <h4 className="font-medium text-[#2E263D] dark:text-white mb-1">Monthly Growth</h4>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                  12% increase in visitors compared to previous month.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#16B1FF]/10 rounded-md">
                <Users className="w-5 h-5 text-[#16B1FF]" />
              </div>
              <div>
                <h4 className="font-medium text-[#2E263D] dark:text-white mb-1">Popular Purpose</h4>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                  Parent meetings account for 35% of all visits.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
