"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  Bus,
  CheckCircle2,
  ClipboardList,
  Route,
  Users,
  MapPin,
  DollarSign,
  Search,
  GraduationCap,
  Clock,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { useState } from "react"

const paymentData = [
  { name: "Paid", value: 214, color: "#56CA00" },
  { name: "Pending", value: 34, color: "#FFB400" },
]

const routeData = [
  { name: "North Route", students: 64 },
  { name: "East Route", students: 42 },
  { name: "West Route", students: 38 },
  { name: "South Route", students: 28 },
  { name: "Central Route", students: 46 },
]

const stopData = [
  { name: "Main Street", students: 12 },
  { name: "Oak Avenue", students: 8 },
  { name: "Pine Road", students: 10 },
  { name: "Cedar Lane", students: 7 },
  { name: "Maple Drive", students: 9 },
  { name: "Elm Street", students: 6 },
  { name: "Birch Boulevard", students: 8 },
  { name: "Willow Way", students: 5 },
]

const classData = [
  { name: "Nursery 1", students: 18 },
  { name: "Nursery 2", students: 22 },
  { name: "Primary 1", students: 32 },
  { name: "Primary 2", students: 28 },
  { name: "Primary 3", students: 36 },
  { name: "Primary 4", students: 42 },
  { name: "Primary 5", students: 38 },
  { name: "Primary 6", students: 32 },
]

const monthlyTrends = [
  { month: "Jan", students: 245, revenue: 12250 },
  { month: "Feb", students: 267, revenue: 13350 },
  { month: "Mar", students: 289, revenue: 14450 },
  { month: "Apr", students: 312, revenue: 15600 },
  { month: "May", students: 298, revenue: 14900 },
  { month: "Jun", students: 276, revenue: 13800 },
]

// Sample data for students with clubs
const studentsWithClubs = [
  {
    id: 1,
    name: "Sarah Johnson",
    class: "Primary 5",
    section: "A",
    busNumber: "SB-001",
    route: "North Route",
    clubs: ["Drama Club", "Science Club"],
    joinDate: "2024-01-15",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 2,
    name: "Michael Chen",
    class: "Primary 4",
    section: "B",
    busNumber: "SB-003",
    route: "East Route",
    clubs: ["Football Club", "Math Club"],
    joinDate: "2024-01-20",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 3,
    name: "Emma Williams",
    class: "Primary 6",
    section: "A",
    busNumber: "SB-002",
    route: "West Route",
    clubs: ["Art Club", "Music Club", "Reading Club"],
    joinDate: "2024-02-01",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 4,
    name: "David Brown",
    class: "Primary 3",
    section: "C",
    busNumber: "SB-004",
    route: "South Route",
    clubs: ["Chess Club"],
    joinDate: "2024-01-10",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 5,
    name: "Olivia Davis",
    class: "Primary 5",
    section: "B",
    busNumber: "SB-001",
    route: "North Route",
    clubs: ["Dance Club", "Environmental Club"],
    joinDate: "2024-01-25",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 6,
    name: "James Wilson",
    class: "Primary 4",
    section: "A",
    busNumber: "SB-005",
    route: "Central Route",
    clubs: ["Basketball Club", "Debate Club"],
    joinDate: "2024-02-05",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 7,
    name: "Sophia Miller",
    class: "Primary 6",
    section: "B",
    busNumber: "SB-002",
    route: "West Route",
    clubs: ["Photography Club"],
    joinDate: "2024-01-30",
    term: "First Term",
    session: "2023/2024",
  },
  {
    id: 8,
    name: "Alexander Garcia",
    class: "Primary 3",
    section: "A",
    busNumber: "SB-003",
    route: "East Route",
    clubs: ["Robotics Club", "Computer Club"],
    joinDate: "2024-02-10",
    term: "First Term",
    session: "2023/2024",
  },
]

const clubsData = [
  { name: "Drama Club", students: 12, color: "#8C57FF" },
  { name: "Science Club", students: 15, color: "#16B1FF" },
  { name: "Football Club", students: 18, color: "#56CA00" },
  { name: "Art Club", students: 10, color: "#FFB400" },
  { name: "Music Club", students: 14, color: "#FF4C51" },
  { name: "Math Club", students: 8, color: "#8C57FF" },
  { name: "Reading Club", students: 11, color: "#16B1FF" },
  { name: "Chess Club", students: 6, color: "#56CA00" },
]

export default function AdminDashboard() {
  const [selectedTerm, setSelectedTerm] = useState("current")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedClass, setSelectedClass] = useState("Primary 3")
  const [selectedSection, setSelectedSection] = useState("A")
  const [selectedTermFilter, setSelectedTermFilter] = useState("First Term")

  const filteredStudents = studentsWithClubs.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.clubs.some((club) => club.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesClass = !selectedClass || student.class === selectedClass
    const matchesSection = !selectedSection || student.section === selectedSection
    const matchesTerm = !selectedTermFilter || student.term === selectedTermFilter
    const matchesDate = !selectedDate || student.joinDate >= selectedDate

    return matchesSearch && matchesClass && matchesSection && matchesTerm && matchesDate
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary-custom">Admin Dashboard</h1>
          <p className="text-secondary-custom">Manage your school bus services, routes, and enrollments</p>
        </div>

        <Alert className="bg-warning-light border-card">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning">Enrollment Period Active</AlertTitle>
          <AlertDescription className="text-secondary-custom">
            Parents can enroll their children for bus services until September 15, 2023.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-custom">Total Buses</CardTitle>
              <Bus className="h-4 w-4 text-primary-solid" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-custom">12</div>
              <p className="text-xs text-secondary-custom">2 buses need maintenance</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-custom">Active Routes</CardTitle>
              <Route className="h-4 w-4 text-primary-solid" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-custom">8</div>
              <p className="text-xs text-secondary-custom">Covering 32 bus stops</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-custom">Total Enrollments</CardTitle>
              <ClipboardList className="h-4 w-4 text-primary-solid" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-custom">248</div>
              <p className="text-xs text-secondary-custom">
                <span className="text-success">+12%</span> from last term
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-custom">Payment Status</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary-solid" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-custom">86%</div>
              <p className="text-xs text-secondary-custom">214 paid / 34 pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-custom">Analytics Dashboard</h2>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[180px] bg-card border-card">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent className="bg-card border-card">
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="previous">Previous Term</SelectItem>
              <SelectItem value="all">All Terms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card border-card">
            <CardHeader>
              <CardTitle className="text-primary-custom">Payment Status Overview</CardTitle>
              <CardDescription className="text-secondary-custom">Current enrollment payment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-card">
            <CardHeader>
              <CardTitle className="text-primary-custom">Monthly Trends</CardTitle>
              <CardDescription className="text-secondary-custom">Student enrollment and revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 141, 147, 0.2)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="#8C57FF"
                      fill="rgba(140, 87, 255, 0.16)"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="2"
                      stroke="#16B1FF"
                      fill="rgba(22, 177, 255, 0.16)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-card">
            <CardHeader>
              <CardTitle className="text-primary-custom">Enrollment by Route</CardTitle>
              <CardDescription className="text-secondary-custom">Number of students enrolled per route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 141, 147, 0.2)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <Bar dataKey="students" fill="#8C57FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-card">
            <CardHeader>
              <CardTitle className="text-primary-custom">Quick Actions</CardTitle>
              <CardDescription className="text-secondary-custom">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-primary">
                <Bus className="mr-2 h-4 w-4" />
                Add New Bus
              </Button>
              <Button className="w-full btn-secondary">
                <MapPin className="mr-2 h-4 w-4" />
                Create Route
              </Button>
              <Button className="w-full btn-secondary">
                <Users className="mr-2 h-4 w-4" />
                Enroll Student
              </Button>
              <Button className="w-full btn-secondary">
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* New Students with Clubs Section */}
        <Card className="bg-card border-card">
          <CardHeader>
            <CardTitle className="text-primary-custom flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Bus Students with Club Activities
            </CardTitle>
            <CardDescription className="text-secondary-custom">
              Students enrolled in school bus services who are also participating in club activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="grid gap-4 md:grid-cols-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-custom" />
                <Input
                  placeholder="Search students or clubs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary 3">Primary 3</SelectItem>
                  <SelectItem value="Primary 4">Primary 4</SelectItem>
                  <SelectItem value="Primary 5">Primary 5</SelectItem>
                  <SelectItem value="Primary 6">Primary 6</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTermFilter} onValueChange={setSelectedTermFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary-custom" />
                <span className="text-sm text-secondary-custom font-medium">2023/2024</span>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="bg-primary-light p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-solid">{filteredStudents.length}</div>
                <div className="text-sm text-primary-custom">Students with Clubs</div>
              </div>
              <div className="bg-success-light p-4 rounded-lg">
                <div className="text-2xl font-bold text-success">{clubsData.length}</div>
                <div className="text-sm text-primary-custom">Active Clubs</div>
              </div>
              <div className="bg-info-light p-4 rounded-lg">
                <div className="text-2xl font-bold text-info">
                  {filteredStudents.reduce((acc, student) => acc + student.clubs.length, 0)}
                </div>
                <div className="text-sm text-primary-custom">Total Memberships</div>
              </div>
            </div>

            {/* Students Table */}
            <div className="rounded-md border border-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Bus Number</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Clubs</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Term</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium text-primary-custom">{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary-light text-primary-solid border-primary-solid">
                          {student.busNumber}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-secondary-custom">{student.route}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.clubs.map((club, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-success-light text-success border-success text-xs"
                            >
                              {club}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-secondary-custom">{student.joinDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-info-light text-info border-info">
                          {student.term}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-secondary-custom mx-auto mb-4" />
                <p className="text-secondary-custom">No students found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Club Distribution Chart */}
        <Card className="bg-card border-card">
          <CardHeader>
            <CardTitle className="text-primary-custom">Club Participation Distribution</CardTitle>
            <CardDescription className="text-secondary-custom">
              Number of bus students participating in each club
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clubsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 141, 147, 0.2)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                  <Bar dataKey="students" fill="#8C57FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stops" className="w-full">
          <TabsList className="bg-card border-card">
            <TabsTrigger
              value="stops"
              className="text-primary-custom data-[state=active]:bg-primary-light data-[state=active]:text-primary-solid"
            >
              Bus Stops Analysis
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="text-primary-custom data-[state=active]:bg-primary-light data-[state=active]:text-primary-solid"
            >
              Class Distribution
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stops">
            <Card className="bg-card border-card">
              <CardHeader>
                <CardTitle className="text-primary-custom">Enrollment by Bus Stop</CardTitle>
                <CardDescription className="text-secondary-custom">
                  Student distribution across different bus stops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stopData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 141, 147, 0.2)" />
                      <XAxis type="number" stroke="var(--text-secondary)" />
                      <YAxis dataKey="name" type="category" width={100} stroke="var(--text-secondary)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <Bar dataKey="students" fill="#16B1FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="classes">
            <Card className="bg-card border-card">
              <CardHeader>
                <CardTitle className="text-primary-custom">Enrollment by Student Class</CardTitle>
                <CardDescription className="text-secondary-custom">
                  Distribution of bus service usage across different grade levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 141, 147, 0.2)" />
                      <XAxis dataKey="name" stroke="var(--text-secondary)" />
                      <YAxis stroke="var(--text-secondary)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <Bar dataKey="students" fill="#56CA00" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-4">
          <Link href="/">
            <Button className="btn-secondary">Back to Selection Page</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
