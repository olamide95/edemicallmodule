"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation";

interface Enrollment {
  id: string
  studentName: string
  parentName: string
  parentPhone: string
  parentEmail: string
  busNumber: string
  route: string
  pickupStop: string
  dropoffStop: string
  enrollmentDate: string
  status: "active" | "pending" | "inactive"
  feeStatus: "paid" | "pending" | "overdue"
  class: string
  section: string
}

const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    parentName: "Robert Johnson",
    parentPhone: "+1 (555) 123-4567",
    parentEmail: "robert.johnson@email.com",
    busNumber: "BUS-001",
    route: "Route A - Downtown",
    pickupStop: "Main Street & 5th Ave",
    dropoffStop: "School Main Gate",
    enrollmentDate: "2024-01-15",
    status: "active",
    feeStatus: "paid",
    class: "Grade 5",
    section: "A",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    parentName: "Sarah Smith",
    parentPhone: "+1 (555) 234-5678",
    parentEmail: "sarah.smith@email.com",
    busNumber: "BUS-002",
    route: "Route B - Suburbs",
    pickupStop: "Oak Street & 2nd Ave",
    dropoffStop: "School Side Gate",
    enrollmentDate: "2024-01-10",
    status: "active",
    feeStatus: "pending",
    class: "Grade 3",
    section: "B",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    parentName: "Michael Davis",
    parentPhone: "+1 (555) 345-6789",
    parentEmail: "michael.davis@email.com",
    busNumber: "BUS-001",
    route: "Route A - Downtown",
    pickupStop: "Pine Street & 8th Ave",
    dropoffStop: "School Main Gate",
    enrollmentDate: "2024-01-12",
    status: "pending",
    feeStatus: "overdue",
    class: "Grade 4",
    section: "A",
  },
  {
    id: "4",
    studentName: "David Wilson",
    parentName: "Jennifer Wilson",
    parentPhone: "+1 (555) 456-7890",
    parentEmail: "jennifer.wilson@email.com",
    busNumber: "BUS-003",
    route: "Route C - Eastside",
    pickupStop: "Elm Street & 3rd Ave",
    dropoffStop: "School Back Gate",
    enrollmentDate: "2024-01-08",
    status: "active",
    feeStatus: "paid",
    class: "Grade 6",
    section: "C",
  },
  {
    id: "5",
    studentName: "Emma Brown",
    parentName: "David Brown",
    parentPhone: "+1 (555) 567-8901",
    parentEmail: "david.brown@email.com",
    busNumber: "BUS-002",
    route: "Route B - Suburbs",
    pickupStop: "Maple Street & 1st Ave",
    dropoffStop: "School Side Gate",
    enrollmentDate: "2024-01-14",
    status: "active",
    feeStatus: "paid",
    class: "Grade 2",
    section: "A",
  },
]

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();

  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([])
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false)
  const [groupChatData, setGroupChatData] = useState({
    name: "",
    message: "",
  })

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.route.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || enrollment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEnrollments(filteredEnrollments.map((e) => e.id))
    } else {
      setSelectedEnrollments([])
    }
  }

  const handleSelectEnrollment = (enrollmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedEnrollments((prev) => [...prev, enrollmentId])
    } else {
      setSelectedEnrollments((prev) => prev.filter((id) => id !== enrollmentId))
    }
  }

  const selectedParents = enrollments.filter((e) => selectedEnrollments.includes(e.id))

  const handleCreateGroupChat = () => {
    // Here you would typically make an API call to create the group chat
    console.log("Creating group chat:", {
      name: groupChatData.name,
      message: groupChatData.message,
      participants: selectedParents,
    })

    // Reset form and close dialog
    setGroupChatData({ name: "", message: "" })
    setSelectedEnrollments([])
    setIsGroupChatOpen(false)

    // Show success message (you could use a toast here)
    alert(`Group chat "${groupChatData.name}" created with ${selectedParents.length} participants!`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getFeeStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bus Enrollments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage student bus service enrollments</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedEnrollments.length > 0 && (
            <Dialog open={isGroupChatOpen} onOpenChange={setIsGroupChatOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Create Group Chat ({selectedEnrollments.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Parent Group Chat</DialogTitle>
                  <DialogDescription>
                    Create a group chat with {selectedParents.length} selected parents
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input
                      id="groupName"
                      value={groupChatData.name}
                      onChange={(e) => setGroupChatData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={`Bus Parents - ${new Date().getFullYear()}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor="welcomeMessage">Welcome Message (Optional)</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={groupChatData.message}
                      onChange={(e) => setGroupChatData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Welcome to our bus parents group chat! Here we'll share updates about bus schedules, routes, and important announcements."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Selected Participants ({selectedParents.length})</Label>
                    <div className="max-h-40 overflow-y-auto border rounded-md p-3 mt-2">
                      {selectedParents.map((parent) => (
                        <div
                          key={parent.id}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{parent.parentName}</p>
                            <p className="text-sm text-gray-600">
                              {parent.studentName} - {parent.busNumber}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-3 w-3" />
                            <span>{parent.parentPhone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGroupChatOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGroupChat}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!groupChatData.name.trim()}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Create Group Chat
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
         <Button
      onClick={() => router.push("/schoolbus/admin/enrollments/new")}
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      <Plus className="mr-2 h-4 w-4" />
      New Enrollment
    </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search enrollments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment List</CardTitle>
          <CardDescription>
            {filteredEnrollments.length} enrollments found
            {selectedEnrollments.length > 0 && ` • ${selectedEnrollments.length} selected`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedEnrollments.length === filteredEnrollments.length && filteredEnrollments.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all enrollments"
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Bus & Route</TableHead>
                <TableHead>Pickup/Dropoff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedEnrollments.includes(enrollment.id)}
                      onCheckedChange={(checked) => handleSelectEnrollment(enrollment.id, checked as boolean)}
                      aria-label={`Select ${enrollment.studentName}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{enrollment.studentName}</div>
                      <div className="text-sm text-gray-600">
                        {enrollment.class} - {enrollment.section}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{enrollment.parentName}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {enrollment.parentPhone}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {enrollment.parentEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{enrollment.busNumber}</div>
                      <div className="text-sm text-gray-600">{enrollment.route}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">Pickup:</span>
                      </div>
                      <div className="text-gray-600 mb-2">{enrollment.pickupStop}</div>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-red-600" />
                        <span className="text-red-600">Dropoff:</span>
                      </div>
                      <div className="text-gray-600">{enrollment.dropoffStop}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(enrollment.status)}
                      {getStatusBadge(enrollment.status)}
                    </div>
                  </TableCell>
                  <TableCell>{getFeeStatusBadge(enrollment.feeStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Enrollment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact Parent
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Enrollment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
