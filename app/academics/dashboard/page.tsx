"use client"

import { useState } from "react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import {
  ChevronRight,
  Calendar,
  Mail,
  ArrowUpRight,
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Send,
  Phone,
  MailIcon,
  FileText,
  Gift,
  Cake,
  School,
  Info,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts"

// Attendance trend data
const attendanceTrendData = [
  { date: "Mon", present: 92, absent: 8, previous: 89 },
  { date: "Tue", present: 88, absent: 12, previous: 86 },
  { date: "Wed", present: 85, absent: 15, previous: 82 },
  { date: "Thu", present: 90, absent: 10, previous: 88 },
  { date: "Fri", present: 83, absent: 17, previous: 85 },
  { date: "Mon", present: 86, absent: 14, previous: 84 },
  { date: "Tue", present: 89, absent: 11, previous: 87 },
  { date: "Wed", present: 84, absent: 16, previous: 83 },
  { date: "Thu", present: 87, absent: 13, previous: 85 },
  { date: "Fri", present: 91, absent: 9, previous: 88 },
  { date: "Mon", present: 85, absent: 15, previous: 83 },
  { date: "Tue", present: 83, absent: 17, previous: 81 },
  { date: "Wed", present: 87, absent: 13, previous: 84 },
  { date: "Thu", present: 89, absent: 11, previous: 86 },
]

// Subject performance data
const subjectPerformanceData = [
  { subject: "Mathematics", average: 72, target: 80 },
  { subject: "Science", average: 78, target: 80 },
  { subject: "English", average: 81, target: 80 },
  { subject: "History", average: 76, target: 80 },
  { subject: "Geography", average: 74, target: 80 },
  { subject: "Art", average: 85, target: 80 },
]

// Grade distribution data
const gradeDistributionData = [
  { name: "A", value: 25, color: "#56CA00" },
  { name: "B", value: 35, color: "#16B1FF" },
  { name: "C", value: 20, color: "#FFB400" },
  { name: "D", value: 15, color: "#FF4C51" },
  { name: "F", value: 5, color: "#8A8D93" },
]

// Class comparison data
const classComparisonData = [
  { class: "7A", average: 78, schoolAverage: 76 },
  { class: "7B", average: 75, schoolAverage: 76 },
  { class: "8A", average: 82, schoolAverage: 76 },
  { class: "8B", average: 74, schoolAverage: 76 },
  { class: "9A", average: 79, schoolAverage: 76 },
  { class: "9B", average: 73, schoolAverage: 76 },
  { class: "10A", average: 80, schoolAverage: 76 },
  { class: "10B", average: 77, schoolAverage: 76 },
]

// Monthly attendance data
const monthlyAttendanceData = [
  { month: "Jan", attendance: 88, target: 90 },
  { month: "Feb", attendance: 86, target: 90 },
  { month: "Mar", attendance: 90, target: 90 },
  { month: "Apr", attendance: 87, target: 90 },
  { month: "May", attendance: 85, target: 90 },
  { month: "Jun", attendance: 83, target: 90 },
  { month: "Jul", attendance: 89, target: 90 },
  { month: "Aug", attendance: 91, target: 90 },
  { month: "Sep", attendance: 84, target: 90 },
]

export default function AcademicDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedAbsenceFilter, setSelectedAbsenceFilter] = useState("today")
  const [selectedAssignmentFilter, setSelectedAssignmentFilter] = useState("all")
  const [selectedAttendancePeriod, setSelectedAttendancePeriod] = useState("weekly")
  const [selectedPerformanceView, setSelectedPerformanceView] = useState("subjects")

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-[#f4f5fa]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-[#f4f5fa] p-6 space-y-6">
          {/* Dashboard Header Card */}
          <Card className="bg-white border-[#ebebeb] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="max-w-[60%]">
                  <h1 className="text-2xl font-bold mb-1 text-[#2e263d]">Academic Dashboard</h1>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="text-[#455a64]">Academics</span>
                    <ChevronRight size={16} className="text-[#455a64]" />
                    <span className="text-[#8c57ff] italic">Dashboard</span>
                  </div>

                  <p className="text-[#455a64] mb-6 italic">
                    Get a comprehensive overview of your academic metrics, student performance, attendance, and upcoming
                    events.
                  </p>

                  <Button className="bg-[#8c57ff] hover:bg-[#7e4ee6] text-white">View Reports</Button>
                </div>

                <div className="flex items-center">
                  <Image
                    src="/education-illustration-new.png"
                    alt="Education Illustration"
                    width={350}
                    height={180}
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Student Population */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#8a8d93]">Total Student Population</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2e263d]">2,547</div>
                  <div className="p-2 bg-[#ebf5ff] rounded-full">
                    <Users className="h-5 w-5 text-[#16b1ff]" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <Badge className="text-[#56ca00] bg-[#e6f7d9] border-none hover:bg-[#e6f7d9]">
                    <ArrowUpRight className="mr-1 h-3 w-3" /> +3.5%
                  </Badge>
                  <span className="text-[#8a8d93] ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Students Present */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#8a8d93]">Students Present Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2e263d]">2,128</div>
                  <div className="p-2 bg-[#e6f7d9] rounded-full">
                    <UserCheck className="h-5 w-5 text-[#56ca00]" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Progress value={83} className="h-2 w-24" />
                  <span className="text-xs text-[#8a8d93] ml-2">83% attendance</span>
                </div>
              </CardContent>
            </Card>

            {/* New Students Admitted */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#8a8d93]">New Students Admitted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2e263d]">156</div>
                  <div className="p-2 bg-[#f0ebff] rounded-full">
                    <UserPlus className="h-5 w-5 text-[#8c57ff]" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <Badge className="text-[#8c57ff] bg-[#f0ebff] border-none hover:bg-[#f0ebff]">
                    <ArrowUpRight className="mr-1 h-3 w-3" /> +12.4%
                  </Badge>
                  <span className="text-[#8a8d93] ml-2">this session</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Alumni */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#8a8d93]">Total Alumni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2e263d]">12,845</div>
                  <div className="p-2 bg-[#fff4e5] rounded-full">
                    <Award className="h-5 w-5 text-[#ffb400]" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <span className="text-[#8a8d93]">Since establishment</span>
                </div>
              </CardContent>
            </Card>

            {/* Students Graduating */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#8a8d93]">Graduating This Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2e263d]">342</div>
                  <div className="p-2 bg-[#ffe4e5] rounded-full">
                    <GraduationCap className="h-5 w-5 text-[#ff4c51]" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs">
                  <span className="text-[#8a8d93]">Graduation in 3 months</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Attendance Trend */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2e263d]">Attendance Trend</CardTitle>
                  <Tabs defaultValue="weekly" className="w-auto">
                    <TabsList className="grid w-auto grid-cols-3 h-8 bg-[#f9fafb]">
                      <TabsTrigger
                        value="weekly"
                        className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                        onClick={() => setSelectedAttendancePeriod("weekly")}
                      >
                        Weekly
                      </TabsTrigger>
                      <TabsTrigger
                        value="monthly"
                        className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                        onClick={() => setSelectedAttendancePeriod("monthly")}
                      >
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger
                        value="yearly"
                        className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                        onClick={() => setSelectedAttendancePeriod("yearly")}
                      >
                        Yearly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription className="text-[#8a8d93]">
                  Daily attendance percentage compared to previous period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                    <XAxis dataKey="date" stroke="#8a8d93" fontSize={12} />
                    <YAxis stroke="#8a8d93" fontSize={12}>
                      <Label
                        value="Attendance %"
                        position="insideLeft"
                        angle={-90}
                        style={{ textAnchor: "middle", fontSize: "12px", fill: "#8a8d93" }}
                      />
                    </YAxis>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #ebebeb",
                        borderRadius: "8px",
                        color: "#2e263d",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#56ca00"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#56ca00" }}
                      activeDot={{ r: 6, fill: "#56ca00" }}
                      name="Present"
                    />
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke="#16b1ff"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4, fill: "#16b1ff" }}
                      name="Previous Period"
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Attendance */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2e263d]">Monthly Attendance vs Target</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-[#8a8d93]">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#8c57ff] mr-1"></div>
                      <span>Attendance</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#ff4c51] mr-1"></div>
                      <span>Target (90%)</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-[#8a8d93]">
                  Monthly attendance percentage compared to target
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyAttendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                    <XAxis dataKey="month" stroke="#8a8d93" fontSize={12} />
                    <YAxis stroke="#8a8d93" fontSize={12} domain={[75, 100]}>
                      <Label
                        value="Attendance %"
                        position="insideLeft"
                        angle={-90}
                        style={{ textAnchor: "middle", fontSize: "12px", fill: "#8a8d93" }}
                      />
                    </YAxis>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #ebebeb",
                        borderRadius: "8px",
                        color: "#2e263d",
                      }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="attendance" fill="#8c57ff" radius={[4, 4, 0, 0]} barSize={30} name="Attendance %" />
                    <ReferenceLine y={90} stroke="#ff4c51" strokeDasharray="3 3" label="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Performance */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2e263d]">Subject Performance</CardTitle>
                  <Tabs defaultValue="subjects" className="w-auto">
                    <TabsList className="grid w-auto grid-cols-2 h-8 bg-[#f9fafb]">
                      <TabsTrigger
                        value="subjects"
                        className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                        onClick={() => setSelectedPerformanceView("subjects")}
                      >
                        By Subject
                      </TabsTrigger>
                      <TabsTrigger
                        value="classes"
                        className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                        onClick={() => setSelectedPerformanceView("classes")}
                      >
                        By Class
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription className="text-[#8a8d93]">
                  {selectedPerformanceView === "subjects"
                    ? "Average performance by subject compared to target"
                    : "Average performance by class compared to school average"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                {selectedPerformanceView === "subjects" ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectPerformanceData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        stroke="#8a8d93"
                        fontSize={12}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis dataKey="subject" type="category" stroke="#8a8d93" fontSize={12} width={70} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ebebeb",
                          borderRadius: "8px",
                          color: "#2e263d",
                        }}
                        formatter={(value) => [`${value}%`, "Average Score"]}
                        labelFormatter={(label) => `Subject: ${label}`}
                      />
                      <Bar dataKey="average" radius={[0, 4, 4, 0]} barSize={20} name="Average Score">
                        {subjectPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.average >= entry.target ? "#56ca00" : "#ff4c51"} />
                        ))}
                      </Bar>
                      <ReferenceLine x={80} stroke="#ffb400" strokeDasharray="3 3" label="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
                      <XAxis dataKey="class" stroke="#8a8d93" fontSize={12} />
                      <YAxis stroke="#8a8d93" fontSize={12} domain={[60, 90]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ebebeb",
                          borderRadius: "8px",
                          color: "#2e263d",
                        }}
                        formatter={(value) => [`${value}%`, "Average Score"]}
                        labelFormatter={(label) => `Class: ${label}`}
                      />
                      <Bar dataKey="average" radius={[4, 4, 0, 0]} barSize={20} name="Class Average">
                        {classComparisonData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.average >= entry.schoolAverage ? "#56ca00" : "#ff4c51"}
                          />
                        ))}
                      </Bar>
                      <ReferenceLine y={76} stroke="#16b1ff" strokeDasharray="3 3" label="School Average" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card className="bg-white border-[#ebebeb] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#2e263d]">Grade Distribution</CardTitle>
                <CardDescription className="text-[#8a8d93]">
                  Overall distribution of student grades across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <div className="flex h-full">
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gradeDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={false}
                        >
                          {gradeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ebebeb",
                            borderRadius: "8px",
                            color: "#2e263d",
                          }}
                          formatter={(value) => [`${value}%`, "Students"]}
                          labelFormatter={(label) => `Grade: ${label}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center pl-4">
                    <div className="space-y-3">
                      {gradeDistributionData.map((grade, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: grade.color }}></div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-[#2e263d]">Grade {grade.name}</span>
                              <span className="text-[#8a8d93]">{grade.value}%</span>
                            </div>
                            <Progress value={grade.value} className="h-1 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-[#8a8d93]">
                      <div className="flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 text-[#16b1ff]" />
                        <p>
                          {gradeDistributionData[0].value + gradeDistributionData[1].value}% of students are achieving
                          above-average grades (A-B)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Attendance Analytics */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2e263d]">Attendance Analytics</CardTitle>
                    <Tabs defaultValue="today" className="w-auto">
                      <TabsList className="grid w-auto grid-cols-3 h-8 bg-[#f9fafb]">
                        <TabsTrigger
                          value="today"
                          className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                          onClick={() => setSelectedAbsenceFilter("today")}
                        >
                          Today
                        </TabsTrigger>
                        <TabsTrigger
                          value="yesterday"
                          className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                          onClick={() => setSelectedAbsenceFilter("yesterday")}
                        >
                          Yesterday
                        </TabsTrigger>
                        <TabsTrigger
                          value="week"
                          className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                          onClick={() => setSelectedAbsenceFilter("week")}
                        >
                          This Week
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription className="text-[#8a8d93]">
                    Students absent from school and overall attendance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#f0ebff] p-3 rounded-lg">
                        <Clock className="h-5 w-5 text-[#8c57ff]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#8a8d93]">Average Attendance</p>
                        <p className="text-xl font-bold text-[#2e263d]">83.5%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#ffe4e5] p-3 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-[#ff4c51]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#8a8d93]">Absent Students</p>
                        <p className="text-xl font-bold text-[#2e263d]">419</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e6f7d9] p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-[#56ca00]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#8a8d93]">Present Students</p>
                        <p className="text-xl font-bold text-[#2e263d]">2,128</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-x-auto rounded-lg border border-[#ebebeb]">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-[#f9fafb] text-[#455a64]">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Student
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Class
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Section
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Reason
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr key={item} className="border-b border-[#ebebeb]">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32&query=student ${item}`} />
                                  <AvatarFallback className="bg-[#f0ebff] text-[#8c57ff]">S{item}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-[#2e263d]">Student Name {item}</div>
                                  <div className="text-xs text-[#8a8d93]">ID: STU{10000 + item}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#2e263d]">Grade {Math.floor(Math.random() * 6) + 7}</td>
                            <td className="px-4 py-3 text-[#2e263d]">
                              {["A", "B", "C"][Math.floor(Math.random() * 3)]}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={
                                  item % 3 === 0
                                    ? "bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]"
                                    : item % 3 === 1
                                      ? "bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]"
                                      : "bg-[#ebf5ff] text-[#16b1ff] border-none hover:bg-[#ebf5ff]"
                                }
                              >
                                {item % 3 === 0 ? "Sick Leave" : item % 3 === 1 ? "Family Emergency" : "Appointment"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs border-[#ebebeb] text-[#8c57ff] hover:bg-[#f0ebff]"
                              >
                                <Phone className="h-3 w-3 mr-1" /> Contact
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Struggling Students */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2e263d]">Struggling Students</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[120px] h-8 border-[#ebebeb]">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#ebebeb]">
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger className="w-[120px] h-8 border-[#ebebeb]">
                          <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#ebebeb]">
                          <SelectItem value="all">All Sections</SelectItem>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <CardDescription className="text-[#8a8d93]">
                    Students performing below expectations in various subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-lg border border-[#ebebeb]">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-[#f9fafb] text-[#455a64]">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Student
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Class
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Struggling Subjects
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Performance
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr key={item} className="border-b border-[#ebebeb]">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32&query=student ${item + 5}`} />
                                  <AvatarFallback className="bg-[#f0ebff] text-[#8c57ff]">S{item}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-[#2e263d]">Student Name {item + 5}</div>
                                  <div className="text-xs text-[#8a8d93]">ID: STU{10005 + item}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#2e263d]">
                              Grade {Math.floor(Math.random() * 6) + 7}-{["A", "B", "C"][Math.floor(Math.random() * 3)]}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {item % 2 === 0 ? (
                                  <>
                                    <Badge className="bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]">
                                      Mathematics
                                    </Badge>
                                    <Badge className="bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]">
                                      Physics
                                    </Badge>
                                  </>
                                ) : (
                                  <>
                                    <Badge className="bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]">
                                      Chemistry
                                    </Badge>
                                    <Badge className="bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]">
                                      English
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Progress value={item % 2 === 0 ? 35 : 42} className="h-2 w-16 mr-2" />
                                <span className="text-xs text-[#8a8d93]">{item % 2 === 0 ? "35%" : "42%"}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs border-[#ebebeb] text-[#8c57ff] hover:bg-[#f0ebff]"
                                >
                                  <Mail className="h-3 w-3 mr-1" /> Contact Parents
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs border-[#ebebeb] text-[#16b1ff] hover:bg-[#ebf5ff]"
                                >
                                  <BookOpen className="h-3 w-3 mr-1" /> Assign Tutor
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Assignments & Homework */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2e263d]">Assignments & Homework</CardTitle>
                    <div className="flex items-center gap-2">
                      <Tabs defaultValue="all" className="w-auto">
                        <TabsList className="grid w-auto grid-cols-4 h-8 bg-[#f9fafb]">
                          <TabsTrigger
                            value="all"
                            className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                            onClick={() => setSelectedAssignmentFilter("all")}
                          >
                            All
                          </TabsTrigger>
                          <TabsTrigger
                            value="homework"
                            className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                            onClick={() => setSelectedAssignmentFilter("homework")}
                          >
                            Homework
                          </TabsTrigger>
                          <TabsTrigger
                            value="projects"
                            className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                            onClick={() => setSelectedAssignmentFilter("projects")}
                          >
                            Projects
                          </TabsTrigger>
                          <TabsTrigger
                            value="exams"
                            className="text-xs px-3 data-[state=active]:bg-[#8c57ff] data-[state=active]:text-white"
                            onClick={() => setSelectedAssignmentFilter("exams")}
                          >
                            Exams
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[120px] h-8 border-[#ebebeb]">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#ebebeb]">
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <CardDescription className="text-[#8a8d93]">
                    Track homework, projects, assigned books, and upcoming exams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-lg border border-[#ebebeb]">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-[#f9fafb] text-[#455a64]">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Title
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Type
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Class
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Due Date
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3 font-medium">
                            Submission
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[
                          {
                            title: "Algebra Equations",
                            type: "Homework",
                            class: "Grade 9-A",
                            dueDate: "Today",
                            status: "In Progress",
                            progress: 65,
                          },
                          {
                            title: "Science Project",
                            type: "Project",
                            class: "Grade 10-B",
                            dueDate: "Next Week",
                            status: "Not Started",
                            progress: 10,
                          },
                          {
                            title: "History Essay",
                            type: "Homework",
                            class: "Grade 11-C",
                            dueDate: "Tomorrow",
                            status: "Almost Complete",
                            progress: 85,
                          },
                          {
                            title: "Physics Formulas",
                            type: "Exam",
                            class: "Grade 12-A",
                            dueDate: "Next Month",
                            status: "Upcoming",
                            progress: 0,
                          },
                          {
                            title: "Literature Review",
                            type: "Book",
                            class: "Grade 8-B",
                            dueDate: "2 Weeks",
                            status: "In Progress",
                            progress: 45,
                          },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-[#ebebeb]">
                            <td className="px-4 py-3">
                              <div className="font-medium text-[#2e263d]">{item.title}</div>
                              <div className="text-xs text-[#8a8d93]">Assigned by: Teacher Name</div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={
                                  item.type === "Homework"
                                    ? "bg-[#f0ebff] text-[#8c57ff] border-none hover:bg-[#f0ebff]"
                                    : item.type === "Project"
                                      ? "bg-[#ebf5ff] text-[#16b1ff] border-none hover:bg-[#ebf5ff]"
                                      : item.type === "Exam"
                                        ? "bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]"
                                        : "bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]"
                                }
                              >
                                {item.type}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-[#2e263d]">{item.class}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-[#8a8d93]" />
                                <span
                                  className={
                                    item.dueDate === "Today" || item.dueDate === "Tomorrow"
                                      ? "text-[#ff4c51]"
                                      : "text-[#2e263d]"
                                  }
                                >
                                  {item.dueDate}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={
                                  item.status === "In Progress"
                                    ? "bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]"
                                    : item.status === "Not Started"
                                      ? "bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]"
                                      : item.status === "Almost Complete"
                                        ? "bg-[#e6f7d9] text-[#56ca00] border-none hover:bg-[#e6f7d9]"
                                        : "bg-[#ebf5ff] text-[#16b1ff] border-none hover:bg-[#ebf5ff]"
                                }
                              >
                                {item.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Progress value={item.progress} className="h-2 w-16 mr-2" />
                                <span className="text-xs text-[#8a8d93]">{item.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Birthdays */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#2e263d]">Student Birthdays</CardTitle>
                  <CardDescription className="text-[#8a8d93]">Upcoming student birthdays this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Smith", class: "Grade 9-A", date: "Today", img: "1" },
                      { name: "Sarah Johnson", class: "Grade 10-B", date: "Tomorrow", img: "2" },
                      { name: "Michael Brown", class: "Grade 8-C", date: "In 3 days", img: "3" },
                      { name: "Emily Davis", class: "Grade 11-A", date: "Next week", img: "4" },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&query=student ${student.img}`} />
                            <AvatarFallback className="bg-[#f0ebff] text-[#8c57ff]">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[#2e263d]">{student.name}</div>
                            <div className="text-xs text-[#8a8d93] flex items-center">
                              <Cake className="h-3 w-3 mr-1" />
                              <span>{student.date}</span>
                              <span className="mx-1">•</span>
                              <span>{student.class}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="h-8 bg-[#8c57ff] hover:bg-[#7e4ee6] text-white">
                          <Send className="h-3 w-3 mr-1" /> Wish
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-[#ebebeb] text-[#8c57ff] hover:bg-[#f0ebff]">
                    View All Birthdays
                  </Button>
                </CardFooter>
              </Card>

              {/* Notifications */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#2e263d]">Notifications</CardTitle>
                  <CardDescription className="text-[#8a8d93]">Important dates and upcoming events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Mid-Term Break",
                        type: "Holiday",
                        date: "Oct 15-20",
                        icon: <Calendar className="h-4 w-4 text-[#16b1ff]" />,
                      },
                      {
                        title: "Report Cards Published",
                        type: "Academic",
                        date: "Oct 25",
                        icon: <FileText className="h-4 w-4 text-[#8c57ff]" />,
                      },
                      {
                        title: "Parent-Teacher Meeting",
                        type: "Meeting",
                        date: "Oct 28",
                        icon: <Users className="h-4 w-4 text-[#56ca00]" />,
                      },
                      {
                        title: "Annual Sports Day",
                        type: "Event",
                        date: "Nov 5",
                        icon: <Award className="h-4 w-4 text-[#ffb400]" />,
                      },
                      {
                        title: "School Anniversary",
                        type: "Celebration",
                        date: "Nov 12",
                        icon: <School className="h-4 w-4 text-[#ff4c51]" />,
                      },
                      {
                        title: "Principal's Birthday",
                        type: "Birthday",
                        date: "Nov 15",
                        icon: <Gift className="h-4 w-4 text-[#8c57ff]" />,
                      },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-start">
                        <div className="p-2 rounded-full bg-[#f9fafb] mr-3">{notification.icon}</div>
                        <div>
                          <div className="font-medium text-[#2e263d]">{notification.title}</div>
                          <div className="flex items-center text-xs text-[#8a8d93]">
                            <Badge
                              className={
                                notification.type === "Holiday"
                                  ? "bg-[#ebf5ff] text-[#16b1ff] border-none hover:bg-[#ebf5ff]"
                                  : notification.type === "Academic"
                                    ? "bg-[#f0ebff] text-[#8c57ff] border-none hover:bg-[#f0ebff]"
                                    : notification.type === "Meeting"
                                      ? "bg-[#e6f7d9] text-[#56ca00] border-none hover:bg-[#e6f7d9]"
                                      : notification.type === "Event"
                                        ? "bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]"
                                        : notification.type === "Birthday"
                                          ? "bg-[#f0ebff] text-[#8c57ff] border-none hover:bg-[#f0ebff]"
                                          : "bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]"
                              }
                            >
                              {notification.type}
                            </Badge>
                            <span className="ml-2">{notification.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-[#ebebeb] text-[#8c57ff] hover:bg-[#f0ebff]">
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>

              {/* Class Information */}
              <Card className="bg-white border-[#ebebeb] shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#2e263d]">Class Information</CardTitle>
                  <CardDescription className="text-[#8a8d93]">
                    Class capacity, enrollment, and teacher details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        class: "Grade 7-A",
                        capacity: 35,
                        enrolled: 32,
                        teacher: "Ms. Anderson",
                        contact: "+1 (555) 123-4567",
                        email: "anderson@school.edu",
                        ext: "101",
                      },
                      {
                        class: "Grade 8-B",
                        capacity: 30,
                        enrolled: 28,
                        teacher: "Mr. Johnson",
                        contact: "+1 (555) 234-5678",
                        email: "johnson@school.edu",
                        ext: "102",
                      },
                      {
                        class: "Grade 9-C",
                        capacity: 35,
                        enrolled: 35,
                        teacher: "Mrs. Williams",
                        contact: "+1 (555) 345-6789",
                        email: "williams@school.edu",
                        ext: "103",
                      },
                      {
                        class: "Grade 10-A",
                        capacity: 30,
                        enrolled: 25,
                        teacher: "Dr. Miller",
                        contact: "+1 (555) 456-7890",
                        email: "miller@school.edu",
                        ext: "104",
                      },
                    ].map((classInfo, index) => (
                      <div key={index} className="border-b border-[#ebebeb] pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-[#2e263d]">{classInfo.class}</div>
                          <Badge
                            className={
                              classInfo.enrolled === classInfo.capacity
                                ? "bg-[#ffe4e5] text-[#ff4c51] border-none hover:bg-[#ffe4e5]"
                                : classInfo.enrolled / classInfo.capacity > 0.9
                                  ? "bg-[#fff4e5] text-[#ffb400] border-none hover:bg-[#fff4e5]"
                                  : "bg-[#e6f7d9] text-[#56ca00] border-none hover:bg-[#e6f7d9]"
                            }
                          >
                            {classInfo.enrolled}/{classInfo.capacity} Students
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center text-[#8a8d93] mb-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span>Class Teacher: {classInfo.teacher}</span>
                          </div>
                          <div className="flex items-center text-[#8a8d93] mb-1">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>
                              {classInfo.contact} (Ext: {classInfo.ext})
                            </span>
                          </div>
                          <div className="flex items-center text-[#8a8d93]">
                            <MailIcon className="h-3 w-3 mr-1" />
                            <span>{classInfo.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-[#ebebeb] text-[#8c57ff] hover:bg-[#f0ebff]">
                    View All Classes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#ebebeb] py-3 px-6 text-sm text-[#8a8d93] flex flex-wrap justify-between items-center gap-2 bg-white">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#8c57ff]">
              License
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              More Themes
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              Documentation
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
