"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Download,
  Filter,
  BookOpen,
  Users,
  RotateCw,
  Clock,
  DollarSign,
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Percent,
  RefreshCw,
  BookIcon,
  AlertTriangle,
  FileText,
  Printer,
  Mail,
} from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export function LibraryAnalytics() {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for charts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  // Get the appropriate labels based on date range
  const getLabels = () => {
    switch (dateRange) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      case "month":
        return Array.from({ length: 30 }, (_, i) => (i + 1).toString())
      case "quarter":
        return months.slice(Math.floor(currentMonth / 3) * 3, Math.floor(currentMonth / 3) * 3 + 3)
      case "year":
        return months
      default:
        return months
    }
  }

  const labels = getLabels()

  // Circulation Trends Data
  const circulationData = {
    labels,
    datasets: [
      {
        label: "Checkouts",
        data: labels.map(() => Math.floor(Math.random() * 50) + 20),
        borderColor: "#8C57FF",
        backgroundColor: "rgba(140, 87, 255, 0.5)",
        tension: 0.4,
      },
      {
        label: "Returns",
        data: labels.map(() => Math.floor(Math.random() * 40) + 15),
        borderColor: "#56CA00",
        backgroundColor: "rgba(86, 202, 0, 0.5)",
        tension: 0.4,
      },
    ],
  }

  // Category Distribution Data
  const categoryData = {
    labels: ["Fiction", "Non-Fiction", "Reference", "Textbooks", "Children's", "Biography", "Science", "History"],
    datasets: [
      {
        data: [25, 18, 12, 15, 10, 8, 7, 5],
        backgroundColor: ["#8C57FF", "#56CA00", "#16B1FF", "#FFB400", "#FF4C51", "#8A8D93", "#32CCBC", "#F44336"],
        borderWidth: 0,
      },
    ],
  }

  // Member Activity Data
  const memberActivityData = {
    labels,
    datasets: [
      {
        label: "Active Members",
        data: labels.map(() => Math.floor(Math.random() * 100) + 150),
        backgroundColor: "rgba(22, 177, 255, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Overdue Books Data
  const overdueData = {
    labels,
    datasets: [
      {
        label: "Overdue Books",
        data: labels.map(() => Math.floor(Math.random() * 15) + 5),
        backgroundColor: "rgba(255, 76, 81, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Fine Collection Data
  const fineCollectionData = {
    labels,
    datasets: [
      {
        label: "Fine Amount ($)",
        data: labels.map(() => Math.floor(Math.random() * 200) + 50),
        fill: true,
        backgroundColor: "rgba(255, 180, 0, 0.2)",
        borderColor: "#FFB400",
        tension: 0.4,
      },
    ],
  }

  // User Type Distribution
  const userTypeData = {
    labels: ["Students", "Teachers", "Staff", "Guests"],
    datasets: [
      {
        data: [65, 15, 12, 8],
        backgroundColor: ["#8C57FF", "#16B1FF", "#56CA00", "#FFB400"],
        borderWidth: 0,
      },
    ],
  }

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
    },
  }

  // KPI data
  const kpiData = [
    {
      title: "Total Circulation",
      value: "12,547",
      change: "+8.2%",
      trend: "up",
      icon: <RotateCw className="h-6 w-6 text-primary" />,
      color: "primary",
    },
    {
      title: "Active Members",
      value: "2,453",
      change: "+12.1%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-info" />,
      color: "info",
    },
    {
      title: "Overdue Books",
      value: "38",
      change: "-5.4%",
      trend: "down",
      icon: <Clock className="h-6 w-6 text-error" />,
      color: "error",
    },
    {
      title: "Total Fines Collected",
      value: "$1,247",
      change: "+3.7%",
      trend: "up",
      icon: <DollarSign className="h-6 w-6 text-warning" />,
      color: "warning",
    },
  ]

  // Top books data
  const topBooks = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      checkouts: 47,
      trend: "up",
    },
    {
      title: "1984",
      author: "George Orwell",
      checkouts: 42,
      trend: "up",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      checkouts: 39,
      trend: "down",
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      checkouts: 36,
      trend: "up",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      checkouts: 32,
      trend: "down",
    },
  ]

  // Recent activity data
  const recentActivity = [
    {
      type: "checkout",
      book: "The Hobbit",
      member: "James Wilson",
      date: "Today, 10:30 AM",
    },
    {
      type: "return",
      book: "The Catcher in the Rye",
      member: "Sophia Martinez",
      date: "Today, 09:15 AM",
    },
    {
      type: "overdue",
      book: "1984",
      member: "Sarah Johnson",
      date: "Yesterday, 04:45 PM",
    },
    {
      type: "fine",
      book: "Pride and Prejudice",
      member: "Olivia Davis",
      amount: "$25.00",
      date: "Yesterday, 02:30 PM",
    },
    {
      type: "renewal",
      book: "The Lord of the Rings",
      member: "David Miller",
      date: "Jan 15, 2024",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Library Analytics</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as "week" | "month" | "quarter" | "year")}
                className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
              <Filter size={16} />
              Filters
            </button>
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 1000)
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">{kpi.title}</p>
                  <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">
                    {kpi.value}
                  </h3>
                  <div className="flex items-center mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className={`h-4 w-4 text-success mr-1`} />
                    ) : (
                      <TrendingDown className={`h-4 w-4 text-error mr-1`} />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-success" : "text-error"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] ml-1">
                      vs last period
                    </span>
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-full bg-${kpi.color}-light flex items-center justify-center`}>
                  {kpi.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Circulation Trends */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Circulation Trends
              </h3>
              <div className="flex items-center gap-2">
                <LineChart size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
            </div>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Line data={circulationData} options={lineOptions} />
              )}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Category Distribution
              </h3>
              <div className="flex items-center gap-2">
                <PieChart size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
            </div>
            <div className="h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Doughnut data={categoryData} options={pieOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Member Activity */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Member Activity
              </h3>
              <div className="flex items-center gap-2">
                <BarChart2 size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
            </div>
            <div className="h-60">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Bar data={memberActivityData} options={barOptions} />
              )}
            </div>
          </div>

          {/* Overdue Books */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Overdue Books
              </h3>
              <div className="flex items-center gap-2">
                <BarChart2 size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
            </div>
            <div className="h-60">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Bar data={overdueData} options={barOptions} />
              )}
            </div>
          </div>

          {/* User Type Distribution */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                User Type Distribution
              </h3>
              <div className="flex items-center gap-2">
                <PieChart size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
            </div>
            <div className="h-60">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Pie data={userTypeData} options={pieOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Fine Collection Chart */}
        <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
              Fine Collection Trends
            </h3>
            <div className="flex items-center gap-2">
              <LineChart size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
            </div>
          </div>
          <div className="h-60">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Line data={fineCollectionData} options={lineOptions} />
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Books */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Top Books by Circulation
              </h3>
              <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                      Book Title
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                      Author
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                      Checkouts
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="animate-pulse">
                            <td className="py-3 px-4">
                              <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-3/4"></div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-1/2"></div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-8 ml-auto"></div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-6 ml-auto"></div>
                            </td>
                          </tr>
                        ))
                    : topBooks.map((book, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#F3F4F6] dark:border-[rgba(255,255,255,0.05)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
                        >
                          <td className="py-3 px-4 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                            {book.title}
                          </td>
                          <td className="py-3 px-4 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                            {book.author}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] text-right">
                            {book.checkouts}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {book.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-success ml-auto" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-error ml-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Recent Activity
              </h3>
              <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="animate-pulse flex items-start gap-3">
                        <div className="h-8 w-8 bg-[#E5E7EB] dark:bg-[#3D3759] rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                : recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === "checkout"
                            ? "bg-primary-light"
                            : activity.type === "return"
                              ? "bg-success-light"
                              : activity.type === "overdue"
                                ? "bg-error-light"
                                : activity.type === "fine"
                                  ? "bg-warning-light"
                                  : "bg-info-light"
                        }`}
                      >
                        {activity.type === "checkout" ? (
                          <BookIcon className="h-4 w-4 text-primary" />
                        ) : activity.type === "return" ? (
                          <RotateCw className="h-4 w-4 text-success" />
                        ) : activity.type === "overdue" ? (
                          <AlertTriangle className="h-4 w-4 text-error" />
                        ) : activity.type === "fine" ? (
                          <DollarSign className="h-4 w-4 text-warning" />
                        ) : (
                          <RefreshCw className="h-4 w-4 text-info" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {activity.type === "checkout"
                            ? `${activity.member} checked out "${activity.book}"`
                            : activity.type === "return"
                              ? `${activity.member} returned "${activity.book}"`
                              : activity.type === "overdue"
                                ? `"${activity.book}" is overdue by ${activity.member}`
                                : activity.type === "fine"
                                  ? `${activity.member} paid ${activity.amount} fine for "${activity.book}"`
                                  : `${activity.member} renewed "${activity.book}"`}
                        </p>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">{activity.date}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2E263D] dark:text-white">Available Reports</h2>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2">
            <FileText size={16} />
            Create Custom Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-primary-light flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Monthly Circulation Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Detailed analysis of book checkouts, returns, and renewals for the current month.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Last generated: Today</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-error-light flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-error" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Overdue Books Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              List of all overdue books with member details and fine calculations.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Last generated: Yesterday
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-success-light flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Member Activity Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Analysis of member borrowing patterns, popular genres, and activity levels.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Last generated: 3 days ago
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-warning-light flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Financial Summary Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Summary of all fines collected, outstanding balances, and financial trends.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Last generated: 1 week ago
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-info-light flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-info" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Collection Usage Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Analysis of collection usage, identifying popular and underutilized resources.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Last generated: 2 weeks ago
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-md bg-secondary-light flex items-center justify-center">
                <Percent className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Comparative Analysis Report
              </h3>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] mb-4">
              Year-over-year comparison of library usage, circulation, and member growth.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                Last generated: 1 month ago
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Printer size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="p-1.5 rounded-md text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
