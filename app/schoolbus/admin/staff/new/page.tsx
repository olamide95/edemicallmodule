"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for organization staff
const organizationStaff = [
  {
    id: "1",
    name: "John Smith",
    role: "Teacher",
    department: "Science",
    email: "john.smith@school.edu",
    phone: "+234 123 456 7890",
    photo: "/diverse-group-city.png",
  },
  {
    id: "2",
    name: "Mary Johnson",
    role: "Administrator",
    department: "Admin",
    email: "mary.johnson@school.edu",
    phone: "+234 234 567 8901",
    photo: "/diverse-group-city.png",
  },
  {
    id: "3",
    name: "David Williams",
    role: "Security",
    department: "Operations",
    email: "david.williams@school.edu",
    phone: "+234 345 678 9012",
    photo: "/diverse-group-city.png",
  },
  {
    id: "4",
    name: "Patricia Brown",
    role: "Teacher",
    department: "Mathematics",
    email: "patricia.brown@school.edu",
    phone: "+234 456 789 0123",
    photo: "/diverse-group-city.png",
  },
  {
    id: "5",
    name: "Michael Davis",
    role: "Teacher",
    department: "Physical Education",
    email: "michael.davis@school.edu",
    phone: "+234 567 890 1234",
    photo: "/diverse-group-city.png",
  },
]

// Mock data for buses
const buses = [
  { id: "1", name: "Bus A", route: "North Route" },
  { id: "2", name: "Bus B", route: "East Route" },
  { id: "3", name: "Bus C", route: "West Route" },
  { id: "4", name: "Bus D", route: "South Route" },
  { id: "5", name: "Bus E", route: "Central Route" },
]

export default function AddStaffPage() {
  const [selectedTab, setSelectedTab] = useState("existing")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])
  const [driverDetails, setDriverDetails] = useState({
    licenseNumber: "",
    licenseExpiry: "",
    yearsOfExperience: "",
    specialTraining: false,
  })
  const [adminDetails, setAdminDetails] = useState({
    previousExperience: "",
    certifications: "",
    responsibilities: "",
  })

  // Filter staff based on search and role filter
  const filteredStaff = organizationStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "all" || staff.role.toLowerCase() === selectedRole.toLowerCase()

    return matchesSearch && matchesRole
  })

  const handleStaffSelection = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId))
    } else {
      setSelectedStaff([...selectedStaff, staffId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting staff assignment", {
      selectedStaff,
      driverDetails,
      adminDetails,
    })
    // Submit logic would go here
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/staff">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Staff</h1>
          <p className="text-muted-foreground">Assign staff to bus services</p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="existing">Existing Staff</TabsTrigger>
          <TabsTrigger value="new">New Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="existing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Staff from Organization</CardTitle>
              <CardDescription>Assign existing staff to bus services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search staff..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                    <SelectItem value="administrator">Administrators</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow key={staff.id} className={selectedStaff.includes(staff.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedStaff.includes(staff.id)}
                            onChange={() => handleStaffSelection(staff.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={staff.photo || "/placeholder.svg"} alt={staff.name} />
                              <AvatarFallback>{staff.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{staff.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{staff.email}</span>
                            <span className="text-xs text-muted-foreground">{staff.phone}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedStaff.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Assign Role and Bus</CardTitle>
                <CardDescription>Configure details for selected staff</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role-type">Staff Role</Label>
                      <Select required>
                        <SelectTrigger id="role-type">
                          <SelectValue placeholder="Select role type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="driver">Bus Driver</SelectItem>
                          <SelectItem value="administrator">Bus Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assigned-bus">Assigned Bus</Label>
                      <Select required>
                        <SelectTrigger id="assigned-bus">
                          <SelectValue placeholder="Select bus" />
                        </SelectTrigger>
                        <SelectContent>
                          {buses.map((bus) => (
                            <SelectItem key={bus.id} value={bus.id}>
                              {bus.name} ({bus.route})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Role-Specific Details</h3>
                    <Tabs defaultValue="driver" className="w-full">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="driver">Driver Details</TabsTrigger>
                        <TabsTrigger value="admin">Administrator Details</TabsTrigger>
                      </TabsList>
                      <TabsContent value="driver" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="license-number">License Number</Label>
                            <Input
                              id="license-number"
                              placeholder="Enter driver license number"
                              value={driverDetails.licenseNumber}
                              onChange={(e) => setDriverDetails({ ...driverDetails, licenseNumber: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="license-expiry">License Expiry Date</Label>
                            <Input
                              id="license-expiry"
                              type="date"
                              value={driverDetails.licenseExpiry}
                              onChange={(e) => setDriverDetails({ ...driverDetails, licenseExpiry: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="years-experience">Years of Experience</Label>
                            <Input
                              id="years-experience"
                              type="number"
                              placeholder="Enter years of driving experience"
                              min="0"
                              value={driverDetails.yearsOfExperience}
                              onChange={(e) =>
                                setDriverDetails({ ...driverDetails, yearsOfExperience: e.target.value })
                              }
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Switch
                              id="special-training"
                              checked={driverDetails.specialTraining}
                              onCheckedChange={(checked) =>
                                setDriverDetails({ ...driverDetails, specialTraining: checked })
                              }
                            />
                            <Label htmlFor="special-training">Has Special Children Transport Training</Label>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="admin" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="previous-experience">Previous Experience</Label>
                          <Input
                            id="previous-experience"
                            placeholder="Enter previous experience"
                            value={adminDetails.previousExperience}
                            onChange={(e) => setAdminDetails({ ...adminDetails, previousExperience: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="certifications">Certifications</Label>
                          <Input
                            id="certifications"
                            placeholder="Enter certifications"
                            value={adminDetails.certifications}
                            onChange={(e) => setAdminDetails({ ...adminDetails, certifications: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsibilities">Responsibilities</Label>
                          <Input
                            id="responsibilities"
                            placeholder="Enter responsibilities"
                            value={adminDetails.responsibilities}
                            onChange={(e) => setAdminDetails({ ...adminDetails, responsibilities: e.target.value })}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedStaff([])}>
                  Clear Selection
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign Staff
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Staff</CardTitle>
              <CardDescription>Add a new staff member to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select required>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="driver">Bus Driver</SelectItem>
                        <SelectItem value="administrator">Bus Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select required>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assigned-bus-new">Assigned Bus</Label>
                    <Select required>
                      <SelectTrigger id="assigned-bus-new">
                        <SelectValue placeholder="Select bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {buses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.name} ({bus.route})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Staff Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <Input id="photo" type="file" className="max-w-sm" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Role-Specific Details</h3>
                  <Tabs defaultValue="driver-new" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="driver-new">Driver Details</TabsTrigger>
                      <TabsTrigger value="admin-new">Administrator Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="driver-new" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="license-number-new">License Number</Label>
                          <Input id="license-number-new" placeholder="Enter driver license number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license-expiry-new">License Expiry Date</Label>
                          <Input id="license-expiry-new" type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="years-experience-new">Years of Experience</Label>
                          <Input
                            id="years-experience-new"
                            type="number"
                            min="0"
                            placeholder="Enter years of experience"
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Switch id="special-training-new" />
                          <Label htmlFor="special-training-new">Has Special Children Transport Training</Label>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="admin-new" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="previous-experience-new">Previous Experience</Label>
                        <Input id="previous-experience-new" placeholder="Enter previous experience" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certifications-new">Certifications</Label>
                        <Input id="certifications-new" placeholder="Enter certifications" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="responsibilities-new">Responsibilities</Label>
                        <Input id="responsibilities-new" placeholder="Enter responsibilities" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/staff">Cancel</Link>
              </Button>
              <Button type="submit">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
