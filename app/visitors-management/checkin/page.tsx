"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  ChevronRight,
  UserCheck,
  UserX,
  Clock,
  Search,
  Camera,
  QrCode,
  BadgeIcon as IdCard,
  Phone,
  Building,
  User,
  Calendar,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckInOutPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false)
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock data for current visitors
  const currentVisitors = [
    {
      id: "V001",
      name: "John Smith",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      company: "Tech Solutions Inc.",
      purpose: "Business Meeting",
      host: "Dr. Sarah Johnson",
      department: "Engineering",
      checkInTime: "09:30 AM",
      expectedCheckOut: "11:30 AM",
      status: "checked-in",
      photo: "/placeholder.svg?height=60&width=60&query=professional+headshot",
      badgeNumber: "B001",
      location: "Conference Room A",
    },
    {
      id: "V002",
      name: "Emily Davis",
      phone: "+1-555-0456",
      email: "emily.davis@email.com",
      company: "Creative Agency",
      purpose: "Interview",
      host: "Prof. Michael Brown",
      department: "HR",
      checkInTime: "10:15 AM",
      expectedCheckOut: "12:00 PM",
      status: "checked-in",
      photo: "/placeholder.svg?height=60&width=60&query=professional+woman+headshot",
      badgeNumber: "B002",
      location: "HR Office",
    },
    {
      id: "V003",
      name: "Robert Wilson",
      phone: "+1-555-0789",
      email: "robert.wilson@email.com",
      company: "Educational Consultants",
      purpose: "Consultation",
      host: "Dr. Lisa Anderson",
      department: "Academics",
      checkInTime: "11:00 AM",
      expectedCheckOut: "01:00 PM",
      status: "overdue",
      photo: "/placeholder.svg?height=60&width=60&query=professional+man+headshot",
      badgeNumber: "B003",
      location: "Academic Office",
    },
  ]

  // Mock data for today's history
  const todayHistory = [
    {
      id: "V004",
      name: "Jessica Miller",
      phone: "+1-555-0321",
      company: "Marketing Corp",
      purpose: "Partnership Meeting",
      host: "Mr. David Lee",
      checkInTime: "08:30 AM",
      checkOutTime: "09:45 AM",
      duration: "1h 15m",
      status: "completed",
    },
    {
      id: "V005",
      name: "Mark Thompson",
      phone: "+1-555-0654",
      company: "IT Services",
      purpose: "System Maintenance",
      host: "IT Support",
      checkInTime: "07:00 AM",
      checkOutTime: "08:30 AM",
      duration: "1h 30m",
      status: "completed",
    },
  ]

  const handleQuickCheckIn = () => {
    setIsCheckInModalOpen(true)
  }

  const handleCheckOut = (visitor: any) => {
    setSelectedVisitor(visitor)
    setIsCheckOutModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return <Badge className="bg-success text-white">Checked In</Badge>
      case "overdue":
        return <Badge className="bg-error text-white">Overdue</Badge>
      case "completed":
        return <Badge className="bg-info text-white">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredVisitors = currentVisitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || visitor.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Visitors Management</span>
            <ChevronRight size={16} className="text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="text-primary font-medium">Check-in/Check-out</span>
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Visitor Check-in/Check-out</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Process visitor entry and exit, manage visitor badges, and track visitor activities.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                      Currently Checked In
                    </p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                  </div>
                  <div className="p-2 bg-success-light rounded-md">
                    <UserCheck className="w-6 h-6 text-success" />
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-success font-medium">+3</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since morning</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                      Today's Check-ins
                    </p>
                    <h3 className="text-3xl font-bold mt-1">28</h3>
                  </div>
                  <div className="p-2 bg-info-light rounded-md">
                    <Clock className="w-6 h-6 text-info" />
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-success font-medium">+5</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                      Overdue Visitors
                    </p>
                    <h3 className="text-3xl font-bold mt-1">1</h3>
                  </div>
                  <div className="p-2 bg-error-light rounded-md">
                    <AlertCircle className="w-6 h-6 text-error" />
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-error font-medium">Alert</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">
                    requires attention
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                      Average Visit Duration
                    </p>
                    <h3 className="text-3xl font-bold mt-1">2.5h</h3>
                  </div>
                  <div className="p-2 bg-warning-light rounded-md">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-info font-medium">Normal</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">within range</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Dialog open={isCheckInModalOpen} onOpenChange={setIsCheckInModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Quick Check-in
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Visitor Check-in</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="visitor-name">Visitor Name</Label>
                          <Input id="visitor-name" placeholder="Enter visitor name" />
                        </div>
                        <div>
                          <Label htmlFor="visitor-phone">Phone Number</Label>
                          <Input id="visitor-phone" placeholder="Enter phone number" />
                        </div>
                        <div>
                          <Label htmlFor="visitor-email">Email</Label>
                          <Input id="visitor-email" type="email" placeholder="Enter email address" />
                        </div>
                        <div>
                          <Label htmlFor="visitor-company">Company/Organization</Label>
                          <Input id="visitor-company" placeholder="Enter company name" />
                        </div>
                        <div>
                          <Label htmlFor="visit-purpose">Purpose of Visit</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="meeting">Business Meeting</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="delivery">Delivery</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="host-name">Host Name</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select host" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                              <SelectItem value="prof-brown">Prof. Michael Brown</SelectItem>
                              <SelectItem value="dr-anderson">Dr. Lisa Anderson</SelectItem>
                              <SelectItem value="mr-lee">Mr. David Lee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="engineering">Engineering</SelectItem>
                              <SelectItem value="hr">Human Resources</SelectItem>
                              <SelectItem value="academics">Academics</SelectItem>
                              <SelectItem value="administration">Administration</SelectItem>
                              <SelectItem value="it">IT Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="expected-duration">Expected Duration</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30min">30 minutes</SelectItem>
                              <SelectItem value="1hour">1 hour</SelectItem>
                              <SelectItem value="2hours">2 hours</SelectItem>
                              <SelectItem value="halfday">Half day</SelectItem>
                              <SelectItem value="fullday">Full day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="id-type">ID Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="drivers-license">Driver's License</SelectItem>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="national-id">National ID</SelectItem>
                              <SelectItem value="employee-id">Employee ID</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="id-number">ID Number</Label>
                          <Input id="id-number" placeholder="Enter ID number" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea id="notes" placeholder="Any additional information..." className="mt-2" />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          Take Photo
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <QrCode className="w-4 h-4" />
                          Scan ID
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsCheckInModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsCheckInModalOpen(false)}>Check In & Print Badge</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Scan QR Code
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  Print Visitor Badge
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="current">Currently Checked In</TabsTrigger>
              <TabsTrigger value="history">Today's History</TabsTrigger>
              <TabsTrigger value="search">Search Visitors</TabsTrigger>
            </TabsList>

            {/* Currently Checked In Tab */}
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5" />
                      Currently Checked In Visitors
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search visitors..."
                          className="pl-10 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="checked-in">Checked In</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredVisitors.map((visitor) => (
                      <div
                        key={visitor.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={visitor.photo || "/placeholder.svg"}
                              alt={visitor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{visitor.name}</h3>
                                {getStatusBadge(visitor.status)}
                              </div>
                              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    {visitor.company}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    Host: {visitor.host}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    In: {visitor.checkInTime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Expected out: {visitor.expectedCheckOut}
                                  </span>
                                </div>
                                <div>
                                  Purpose: {visitor.purpose} | Badge: {visitor.badgeNumber} | Location:{" "}
                                  {visitor.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              Call Host
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCheckOut(visitor)}
                              className="flex items-center gap-1"
                            >
                              <UserX className="w-4 h-4" />
                              Check Out
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Today's History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Today's Visit History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-4 font-semibold">Visitor</th>
                          <th className="text-left p-4 font-semibold">Company</th>
                          <th className="text-left p-4 font-semibold">Purpose</th>
                          <th className="text-left p-4 font-semibold">Host</th>
                          <th className="text-left p-4 font-semibold">Check-in</th>
                          <th className="text-left p-4 font-semibold">Check-out</th>
                          <th className="text-left p-4 font-semibold">Duration</th>
                          <th className="text-left p-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayHistory.map((visitor) => (
                          <tr
                            key={visitor.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{visitor.name}</div>
                                <div className="text-sm text-gray-500">{visitor.phone}</div>
                              </div>
                            </td>
                            <td className="p-4">{visitor.company}</td>
                            <td className="p-4">{visitor.purpose}</td>
                            <td className="p-4">{visitor.host}</td>
                            <td className="p-4">{visitor.checkInTime}</td>
                            <td className="p-4">{visitor.checkOutTime}</td>
                            <td className="p-4">{visitor.duration}</td>
                            <td className="p-4">{getStatusBadge(visitor.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search Visitors Tab */}
            <TabsContent value="search">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search All Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="search-name">Visitor Name</Label>
                      <Input id="search-name" placeholder="Enter visitor name" />
                    </div>
                    <div>
                      <Label htmlFor="search-company">Company</Label>
                      <Input id="search-company" placeholder="Enter company name" />
                    </div>
                    <div>
                      <Label htmlFor="search-phone">Phone Number</Label>
                      <Input id="search-phone" placeholder="Enter phone number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="search-date-from">Date From</Label>
                      <Input id="search-date-from" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="search-date-to">Date To</Label>
                      <Input id="search-date-to" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="search-status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="checked-in">Checked In</SelectItem>
                          <SelectItem value="checked-out">Checked Out</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <Button>Search</Button>
                    <Button variant="outline">Clear</Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Results
                    </Button>
                  </div>
                  <div className="text-center text-gray-500 py-8">
                    Enter search criteria above to find visitor records
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Check-out Modal */}
          <Dialog open={isCheckOutModalOpen} onOpenChange={setIsCheckOutModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Check Out Visitor</DialogTitle>
              </DialogHeader>
              {selectedVisitor && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img
                      src={selectedVisitor.photo || "/placeholder.svg"}
                      alt={selectedVisitor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{selectedVisitor.name}</h3>
                      <p className="text-sm text-gray-600">{selectedVisitor.company}</p>
                      <p className="text-sm text-gray-600">Badge: {selectedVisitor.badgeNumber}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Check-in Time:</strong> {selectedVisitor.checkInTime}
                    </div>
                    <div>
                      <strong>Purpose:</strong> {selectedVisitor.purpose}
                    </div>
                    <div>
                      <strong>Host:</strong> {selectedVisitor.host}
                    </div>
                    <div>
                      <strong>Expected Check-out:</strong> {selectedVisitor.expectedCheckOut}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="checkout-notes">Exit Notes (Optional)</Label>
                    <Textarea
                      id="checkout-notes"
                      placeholder="Any additional notes about the visit..."
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCheckOutModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCheckOutModalOpen(false)}>Confirm Check Out</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
