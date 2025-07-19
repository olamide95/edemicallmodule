"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  RefreshCw,
  BookOpen,
  Users,
  Clock,
  Bookmark,
  TrendingUp,
  BarChart2,
  PieChart,
  LineChart,
  BookIcon,
  UserIcon,
  Layers,
  Award,
  Repeat,
  Search,
  Info,
} from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export function MemberReadingAnalytics() {
  const [dateRange, setDateRange] = useState<"month" | "quarter" | "year" | "all">("quarter")
  const [memberSegment, setMemberSegment] = useState<"all" | "students" | "teachers" | "staff" | "guests">("all")
  const [ageGroup, setAgeGroup] = useState<"all" | "children" | "teens" | "adults" | "seniors">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"genres" | "patterns" | "formats" | "recommendations">("genres")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [dateRange, memberSegment, ageGroup])

  // Mock data for charts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  // Get the appropriate labels based on date range
  const getLabels = () => {
    switch (dateRange) {
      case "month":
        return Array.from({ length: 30 }, (_, i) => (i + 1).toString())
      case "quarter":
        return months.slice(Math.floor(currentMonth / 3) * 3, Math.floor(currentMonth / 3) * 3 + 3)
      case "year":
        return months
      case "all":
        return ["2019", "2020", "2021", "2022", "2023", "2024"]
      default:
        return months
    }
  }

  const labels = getLabels()

  // Genre Preferences Data
  const genrePreferencesData = {
    labels: [
      "Fiction",
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Biography",
      "History",
      "Self-Help",
      "Romance",
      "Science",
      "Poetry",
    ],
    datasets: [
      {
        label: "Checkout Percentage",
        data: [25, 18, 15, 12, 8, 7, 6, 5, 3, 1],
        backgroundColor: [
          "#8C57FF",
          "#56CA00",
          "#16B1FF",
          "#FFB400",
          "#FF4C51",
          "#8A8D93",
          "#32CCBC",
          "#F44336",
          "#4CAF50",
          "#9C27B0",
        ],
        borderWidth: 0,
      },
    ],
  }

  // Genre Preferences by Age Group
  const genreByAgeData = {
    labels: ["Fiction", "Mystery", "Sci-Fi", "Fantasy", "Biography", "History", "Self-Help", "Romance"],
    datasets: [
      {
        label: "Children (0-12)",
        data: [30, 5, 10, 25, 2, 8, 0, 0],
        backgroundColor: "rgba(140, 87, 255, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Teens (13-19)",
        data: [20, 15, 25, 20, 5, 5, 5, 10],
        backgroundColor: "rgba(22, 177, 255, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Adults (20-59)",
        data: [15, 20, 15, 10, 10, 10, 10, 15],
        backgroundColor: "rgba(86, 202, 0, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Seniors (60+)",
        data: [10, 25, 5, 5, 20, 20, 10, 5],
        backgroundColor: "rgba(255, 180, 0, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Reading Frequency Data
  const readingFrequencyData = {
    labels,
    datasets: [
      {
        label: "Average Books Per Member",
        data: labels.map(() => (Math.random() * 2 + 1).toFixed(1)),
        borderColor: "#8C57FF",
        backgroundColor: "rgba(140, 87, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  // Seasonal Reading Trends
  const seasonalTrendsData = {
    labels: ["Winter", "Spring", "Summer", "Fall"],
    datasets: [
      {
        label: "Fiction",
        data: [65, 55, 80, 70],
        backgroundColor: "rgba(140, 87, 255, 0.7)",
      },
      {
        label: "Non-Fiction",
        data: [45, 60, 40, 55],
        backgroundColor: "rgba(86, 202, 0, 0.7)",
      },
      {
        label: "Academic",
        data: [70, 60, 30, 65],
        backgroundColor: "rgba(22, 177, 255, 0.7)",
      },
      {
        label: "Children's",
        data: [50, 60, 85, 55],
        backgroundColor: "rgba(255, 180, 0, 0.7)",
      },
    ],
  }

  // Book Format Preferences
  const formatPreferencesData = {
    labels: ["Physical Books", "E-Books", "Audiobooks", "Journals/Magazines"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ["#8C57FF", "#56CA00", "#16B1FF", "#FFB400"],
        borderWidth: 0,
      },
    ],
  }

  // Format Preferences by Age Group
  const formatByAgeData = {
    labels: ["Children (0-12)", "Teens (13-19)", "Adults (20-59)", "Seniors (60+)"],
    datasets: [
      {
        label: "Physical Books",
        data: [80, 55, 60, 75],
        backgroundColor: "rgba(140, 87, 255, 0.7)",
        borderRadius: 4,
      },
      {
        label: "E-Books",
        data: [10, 30, 25, 15],
        backgroundColor: "rgba(86, 202, 0, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Audiobooks",
        data: [5, 10, 12, 8],
        backgroundColor: "rgba(22, 177, 255, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Journals/Magazines",
        data: [5, 5, 3, 2],
        backgroundColor: "rgba(255, 180, 0, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Reading Completion Rates
  const completionRatesData = {
    labels: ["Fiction", "Mystery", "Sci-Fi", "Fantasy", "Biography", "History", "Self-Help", "Academic"],
    datasets: [
      {
        label: "Completion Rate (%)",
        data: [85, 90, 75, 80, 65, 60, 70, 50],
        backgroundColor: "rgba(140, 87, 255, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Reading Interests Radar Chart
  const readingInterestsData = {
    labels: [
      "Adventure",
      "Romance",
      "Mystery",
      "Science",
      "History",
      "Biography",
      "Self-Help",
      "Fantasy",
      "Technology",
      "Arts",
    ],
    datasets: [
      {
        label: "Students",
        data: [80, 60, 65, 70, 50, 40, 45, 85, 75, 55],
        backgroundColor: "rgba(140, 87, 255, 0.2)",
        borderColor: "#8C57FF",
        pointBackgroundColor: "#8C57FF",
      },
      {
        label: "Teachers",
        data: [60, 50, 70, 85, 75, 65, 60, 55, 80, 70],
        backgroundColor: "rgba(86, 202, 0, 0.2)",
        borderColor: "#56CA00",
        pointBackgroundColor: "#56CA00",
      },
      {
        label: "Staff",
        data: [65, 70, 75, 60, 65, 70, 75, 60, 65, 60],
        backgroundColor: "rgba(22, 177, 255, 0.2)",
        borderColor: "#16B1FF",
        pointBackgroundColor: "#16B1FF",
      },
    ],
  }

  // Reading Duration Data
  const readingDurationData = {
    labels: ["<1 week", "1-2 weeks", "2-3 weeks", "3-4 weeks", ">4 weeks"],
    datasets: [
      {
        label: "Fiction",
        data: [15, 35, 30, 15, 5],
        backgroundColor: "rgba(140, 87, 255, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Non-Fiction",
        data: [5, 20, 35, 25, 15],
        backgroundColor: "rgba(86, 202, 0, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Academic",
        data: [2, 10, 25, 38, 25],
        backgroundColor: "rgba(22, 177, 255, 0.7)",
        borderRadius: 4,
      },
    ],
  }

  // Chart options
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

  const barOptions = {
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

  const radarOptions = {
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
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  // Member insights data
  const memberInsights = [
    {
      title: "Most Active Readers",
      description: "Members who check out the most books",
      members: [
        { name: "Sarah Johnson", type: "Teacher", count: 47, trend: "up" },
        { name: "Michael Brown", type: "Student", count: 42, trend: "up" },
        { name: "Emma Wilson", type: "Student", count: 38, trend: "down" },
        { name: "David Miller", type: "Teacher", count: 35, trend: "up" },
        { name: "Olivia Davis", type: "Student", count: 32, trend: "same" },
      ],
    },
    {
      title: "Genre Explorers",
      description: "Members who read across the most genres",
      members: [
        { name: "James Wilson", type: "Student", count: 8, trend: "up" },
        { name: "Sophia Martinez", type: "Student", count: 7, trend: "up" },
        { name: "Robert Johnson", type: "Staff", count: 6, trend: "same" },
        { name: "Emily Thompson", type: "Teacher", count: 6, trend: "down" },
        { name: "William Davis", type: "Student", count: 5, trend: "up" },
      ],
    },
    {
      title: "Consistent Readers",
      description: "Members with the most consistent reading patterns",
      members: [
        { name: "Elizabeth Clark", type: "Teacher", count: 95, trend: "same" },
        { name: "Thomas Anderson", type: "Staff", count: 92, trend: "up" },
        { name: "Jennifer White", type: "Student", count: 90, trend: "same" },
        { name: "Richard Moore", type: "Teacher", count: 88, trend: "down" },
        { name: "Patricia Lewis", type: "Student", count: 85, trend: "up" },
      ],
    },
  ]

  // Recommendation insights
  const recommendationInsights = [
    {
      title: "For Fiction Lovers",
      description: "Based on popular fiction checkouts",
      books: [
        { title: "The Midnight Library", author: "Matt Haig", similarity: 92 },
        { title: "Where the Crawdads Sing", author: "Delia Owens", similarity: 88 },
        { title: "The Silent Patient", author: "Alex Michaelides", similarity: 85 },
        { title: "The Vanishing Half", author: "Brit Bennett", similarity: 82 },
      ],
    },
    {
      title: "For Science Enthusiasts",
      description: "Based on science and technology checkouts",
      books: [
        { title: "A Brief History of Time", author: "Stephen Hawking", similarity: 94 },
        { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", similarity: 90 },
        { title: "The Code Breaker", author: "Walter Isaacson", similarity: 87 },
        { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", similarity: 83 },
      ],
    },
    {
      title: "For Young Adult Readers",
      description: "Based on popular YA checkouts",
      books: [
        { title: "Six of Crows", author: "Leigh Bardugo", similarity: 95 },
        { title: "The Hate U Give", author: "Angie Thomas", similarity: 91 },
        { title: "Children of Blood and Bone", author: "Tomi Adeyemi", similarity: 88 },
        { title: "They Both Die at the End", author: "Adam Silvera", similarity: 85 },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Member Reading Habits & Preferences</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as "month" | "quarter" | "year" | "all")}
                className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
              >
                <option value="month">Last 30 Days</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={memberSegment}
                onChange={(e) =>
                  setMemberSegment(e.target.value as "all" | "students" | "teachers" | "staff" | "guests")
                }
                className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
              >
                <option value="all">All Members</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="staff">Staff</option>
                <option value="guests">Guests</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as "all" | "children" | "teens" | "adults" | "seniors")}
                className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[150px]"
              >
                <option value="all">All Ages</option>
                <option value="children">Children (0-12)</option>
                <option value="teens">Teens (13-19)</option>
                <option value="adults">Adults (20-59)</option>
                <option value="seniors">Seniors (60+)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
            </div>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Average Books Per Member</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">3.7</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-xs font-medium text-success">+12%</span>
                  <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] ml-1">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Most Popular Genre</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">Fiction</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    25% of total checkouts
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-info-light flex items-center justify-center">
                <BookIcon className="h-6 w-6 text-info" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Average Reading Time</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">14 days</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                    From checkout to return
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Completion Rate</p>
                <h3 className="text-2xl font-bold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mt-1">78%</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-xs font-medium text-success">+5%</span>
                  <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] ml-1">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] mb-6">
          <div className="flex flex-wrap space-x-8">
            <button
              onClick={() => setActiveTab("genres")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "genres"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Genre Preferences
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "patterns"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Reading Patterns
            </button>
            <button
              onClick={() => setActiveTab("formats")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "formats"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Format Preferences
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "recommendations"
                  ? "text-[#8C57FF] border-b-2 border-[#8C57FF]"
                  : "text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] hover:text-[#374151] hover:dark:text-[rgba(231,227,252,0.9)]"
              }`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Genre Preferences Tab */}
        {activeTab === "genres" && (
          <div className="space-y-6">
            {/* Genre Distribution and By Age Group */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Genre Distribution
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
                    <Doughnut data={genrePreferencesData} options={pieOptions} />
                  )}
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Genre Preferences by Age Group
                  </h3>
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  </div>
                </div>
                <div className="h-80">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Bar data={genreByAgeData} options={barOptions} />
                  )}
                </div>
              </div>
            </div>

            {/* Reading Interests Radar Chart */}
            <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]] mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Reading Interests by Member Type
                </h3>
                <div className="flex items-center gap-2">
                  <span title="Shows the distribution of reading interests across different member types">
                    <Info
                      size={16}
                      className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] cursor-help"
                    />
                  </span>
                </div>
              </div>
              <div className="h-80">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Radar data={readingInterestsData} options={radarOptions} />
                )}
              </div>
            </div>

            {/* Completion Rates */}
            <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Book Completion Rates by Genre
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
                  <Bar data={completionRatesData} options={barOptions} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reading Patterns Tab */}
        {activeTab === "patterns" && (
          <div className="space-y-6">
            {/* Reading Frequency and Seasonal Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Reading Frequency
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
                    <Line data={readingFrequencyData} options={lineOptions} />
                  )}
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Seasonal Reading Trends
                  </h3>
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  </div>
                </div>
                <div className="h-80">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Bar data={seasonalTrendsData} options={barOptions} />
                  )}
                </div>
              </div>
            </div>

            {/* Reading Duration */}
            <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Reading Duration by Book Type
                </h3>
                <div className="flex items-center gap-2">
                  <span title="Shows how long members typically keep different types of books">
                    <Info
                      size={16}
                      className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] cursor-help"
                    />
                  </span>
                </div>
              </div>
              <div className="h-80">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Bar data={readingDurationData} options={barOptions} />
                )}
              </div>
            </div>

            {/* Member Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memberInsights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`h-10 w-10 rounded-md ${
                        index === 0 ? "bg-primary-light" : index === 1 ? "bg-info-light" : "bg-success-light"
                      } flex items-center justify-center`}
                    >
                      {index === 0 ? (
                        <Award className="h-5 w-5 text-primary" />
                      ) : index === 1 ? (
                        <Search className="h-5 w-5 text-info" />
                      ) : (
                        <Repeat className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {insight.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">{insight.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {isLoading
                      ? Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-[#E5E7EB] dark:bg-[#3D3759]"></div>
                                <div className="h-4 w-32 bg-[#E5E7EB] dark:bg-[#3D3759] rounded"></div>
                              </div>
                              <div className="h-4 w-10 bg-[#E5E7EB] dark:bg-[#3D3759] rounded"></div>
                            </div>
                          ))
                      : insight.members.map((member, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-[#F3F4F6] dark:bg-[#3D3759] flex items-center justify-center">
                                <UserIcon className="h-3 w-3 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                  {member.name}
                                </p>
                                <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                  {member.type}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {member.count}
                                {index === 1 ? " genres" : index === 2 ? "%" : ""}
                              </span>
                              {member.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-success" />
                              ) : member.trend === "down" ? (
                                <TrendingUp className="h-3 w-3 text-error transform rotate-180" />
                              ) : null}
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format Preferences Tab */}
        {activeTab === "formats" && (
          <div className="space-y-6">
            {/* Format Distribution and By Age Group */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Format Preferences
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
                    <Pie data={formatPreferencesData} options={pieOptions} />
                  )}
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                    Format Preferences by Age Group
                  </h3>
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
                  </div>
                </div>
                <div className="h-80">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Bar data={formatByAgeData} options={barOptions} />
                  )}
                </div>
              </div>
            </div>

            {/* Format Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-md bg-primary-light flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Physical Books
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Traditional print format</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Percentage of Checkouts
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Most Popular Among</span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Children & Seniors
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Average Reading Time
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      16 days
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Trend</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-error mr-1">-3%</span>
                      <TrendingUp className="h-3 w-3 text-error transform rotate-180" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-md bg-info-light flex items-center justify-center">
                    <Layers className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      E-Books
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Digital reading format</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Percentage of Checkouts
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Most Popular Among</span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Teens & Adults
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Average Reading Time
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      12 days
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Trend</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-success mr-1">+8%</span>
                      <TrendingUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-md bg-warning-light flex items-center justify-center">
                    <Bookmark className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Audiobooks
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Audio format</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Percentage of Checkouts
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Most Popular Among</span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Adults & Teens
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Average Listening Time
                    </span>
                    <span className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">9 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">Trend</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-success mr-1">+15%</span>
                      <TrendingUp className="h-3 w-3 text-success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Recommendation Insights
                </h3>
                <div className="flex items-center gap-2">
                  <span title="Recommendations based on member reading patterns and preferences">
                    <Info
                      size={16}
                      className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] cursor-help"
                    />
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendationInsights.map((insight, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-md ${
                          index === 0 ? "bg-primary-light" : index === 1 ? "bg-info-light" : "bg-warning-light"
                        } flex items-center justify-center`}
                      >
                        {index === 0 ? (
                          <BookIcon className="h-5 w-5 text-primary" />
                        ) : index === 1 ? (
                          <Search className="h-5 w-5 text-info" />
                        ) : (
                          <Users className="h-5 w-5 text-warning" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                          {insight.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {isLoading
                        ? Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="animate-pulse">
                                <div className="h-4 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-3/4 mb-1"></div>
                                <div className="h-3 bg-[#E5E7EB] dark:bg-[#3D3759] rounded w-1/2"></div>
                              </div>
                            ))
                        : insight.books.map((book, i) => (
                            <div
                              key={i}
                              className="border-b border-[#F3F4F6] dark:border-[rgba(255,255,255,0.05)] pb-2"
                            >
                              <p className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                                {book.title}
                              </p>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                                  {book.author}
                                </p>
                                <div
                                  className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                                    book.similarity >= 90
                                      ? "bg-success-light text-success"
                                      : book.similarity >= 85
                                        ? "bg-info-light text-info"
                                        : "bg-warning-light text-warning"
                                  }`}
                                >
                                  {book.similarity}% match
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9FAFB] dark:bg-[#28243D] rounded-lg p-4 border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05]]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                  Collection Gap Analysis
                </h3>
                <button className="text-xs text-primary hover:underline">View Full Report</button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Underrepresented Categories
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Categories with high demand but limited inventory
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Science Fiction - Young Adult
                      </span>
                      <span className="text-xs font-medium text-error">High Demand</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] dark:bg-[#3D3759] rounded-full h-1.5">
                      <div className="bg-error h-1.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Acquisition Recommendations
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Suggested new acquisitions based on demand
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">STEM Education</span>
                      <span className="text-xs font-medium text-warning">Medium Demand</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] dark:bg-[#3D3759] rounded-full h-1.5">
                      <div className="bg-warning h-1.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                      Diversity Analysis
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                      Representation in collection vs. member demographics
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                        Multicultural Literature
                      </span>
                      <span className="text-xs font-medium text-info">Growing Interest</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] dark:bg-[#3D3759] rounded-full h-1.5">
                      <div className="bg-info h-1.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
