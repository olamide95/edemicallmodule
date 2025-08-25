"use client"

import { useState, useEffect } from "react"
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
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StaffMember {
  id: string
  name: string
  phone: string
  email?: string
  license?: string
  bus: string
  route: string
  status: "active" | "inactive"
  role: "administrator" | "driver"
  photo?: string
  licenseExpiry?: string
  yearsOfExperience?: string
  specialTraining?: boolean
  previousExperience?: string
  certifications?: string
  responsibilities?: string
  isSchoolStaff: boolean
  vendorName?: string
  vendorCompany?: string
  vendorContact?: string
  vendorAddress?: string
}

interface Bus {
  id: string
  name: string
  route: string
}

export default function AddStaffPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("existing")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [buses, setBuses] = useState<Bus[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [staffData, setStaffData] = useState<Partial<StaffMember>>({
    id: Date.now().toString(),
    name: "",
    phone: "",
    email: "",
    license: "",
    bus: "",
    route: "",
    status: "active",
    role: "driver",
    photo: "",
    licenseExpiry: "",
    yearsOfExperience: "",
    specialTraining: false,
    previousExperience: "",
    certifications: "",
    responsibilities: "",
    isSchoolStaff: true,
    vendorName: "",
    vendorCompany: "",
    vendorContact: "",
    vendorAddress: ""
  })

  useEffect(() => {
    const savedStaff = localStorage.getItem("employees")
    const savedBuses = localStorage.getItem("buses")
    const savedEmployees = localStorage.getItem("employees")

    if (savedStaff) setStaff(JSON.parse(savedStaff))
    if (savedBuses) setBuses(JSON.parse(savedBuses))
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees))

    setIsLoading(false)
  }, [])

  const filteredStaff = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "all" || emp.role.toLowerCase() === selectedRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  const handleStaffSelection = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId))
    } else {
      setSelectedStaff([...selectedStaff, staffId])
    }
  }

  const handleChange = (field: keyof StaffMember, value: any) => {
    setStaffData({
      ...staffData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newStaff: StaffMember = {
      id: staffData.id || Date.now().toString(),
      name: staffData.name || "",
      phone: staffData.phone || "",
      email: staffData.email,
      license: staffData.license,
      bus: staffData.bus || "",
      route: buses.find((b) => b.id === staffData.bus)?.route || "",
      status: staffData.status || "active",
      role: staffData.role || "driver",
      photo: staffData.photo,
      licenseExpiry: staffData.licenseExpiry,
      yearsOfExperience: staffData.yearsOfExperience,
      specialTraining: staffData.specialTraining || false,
      previousExperience: staffData.previousExperience,
      certifications: staffData.certifications,
      responsibilities: staffData.responsibilities,
      isSchoolStaff: staffData.isSchoolStaff || false,
      vendorName: staffData.vendorName,
      vendorCompany: staffData.vendorCompany,
      vendorContact: staffData.vendorContact,
      vendorAddress: staffData.vendorAddress,
    }

    const updatedStaff = [...staff, newStaff]
    localStorage.setItem("employees", JSON.stringify(updatedStaff))

    router.push("/schoolbus/admin/staff")
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/schoolbus/admin/staff">
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
                      <Select 
                        value={staffData.role}
                        onValueChange={(value) => handleChange("role", value as "driver" | "administrator")}
                        required
                      >
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
                      <Select 
                        value={staffData.bus}
                        onValueChange={(value) => handleChange("bus", value)}
                        required
                      >
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
                              value={staffData.license || ""}
                              onChange={(e) => handleChange("license", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="license-expiry">License Expiry Date</Label>
                            <Input
                              id="license-expiry"
                              type="date"
                              value={staffData.licenseExpiry || ""}
                              onChange={(e) => handleChange("licenseExpiry", e.target.value)}
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
                              value={staffData.yearsOfExperience || ""}
                              onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Switch
                              id="special-training"
                              checked={staffData.specialTraining || false}
                              onCheckedChange={(checked) => handleChange("specialTraining", checked)}
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
                            value={staffData.previousExperience || ""}
                            onChange={(e) => handleChange("previousExperience", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="certifications">Certifications</Label>
                          <Input
                            id="certifications"
                            placeholder="Enter certifications"
                            value={staffData.certifications || ""}
                            onChange={(e) => handleChange("certifications", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsibilities">Responsibilities</Label>
                          <Input
                            id="responsibilities"
                            placeholder="Enter responsibilities"
                            value={staffData.responsibilities || ""}
                            onChange={(e) => handleChange("responsibilities", e.target.value)}
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

        {/* --- NEW STAFF FORM --- */}
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Staff</CardTitle>
              <CardDescription>Add a new staff member to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      required
                      value={staffData.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      required
                      value={staffData.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={staffData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={staffData.role}
                      onValueChange={(value) => handleChange("role", value as "driver" | "administrator")}
                      required
                    >
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
                    <Label htmlFor="assigned-bus">Assigned Bus</Label>
                    <Select
                      value={staffData.bus}
                      onValueChange={(value) => handleChange("bus", value)}
                      required
                    >
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

                <div className="space-y-2">
                  <Label>School Staff?</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={staffData.isSchoolStaff || false}
                      onCheckedChange={(checked) => handleChange("isSchoolStaff", checked)}
                    />
                    <span>{staffData.isSchoolStaff ? "Yes (Internal)" : "No (External Vendor)"}</span>
                  </div>
                </div>

                {/* Extra vendor fields if not school staff */}
                {!staffData.isSchoolStaff && (
                  <div className="space-y-4 border p-4 rounded-md bg-muted/30">
                    <h4 className="text-md font-semibold">Vendor Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendorName">Vendor Contact Person</Label>
                        <Input
                          id="vendorName"
                          placeholder="Enter vendor contact person"
                          value={staffData.vendorName || ""}
                          onChange={(e) => handleChange("vendorName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorCompany">Vendor Company</Label>
                        <Input
                          id="vendorCompany"
                          placeholder="Enter vendor company"
                          value={staffData.vendorCompany || ""}
                          onChange={(e) => handleChange("vendorCompany", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorContact">Vendor Phone</Label>
                        <Input
                          id="vendorContact"
                          placeholder="Enter vendor phone"
                          value={staffData.vendorContact || ""}
                          onChange={(e) => handleChange("vendorContact", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendorAddress">Vendor Address</Label>
                        <Input
                          id="vendorAddress"
                          placeholder="Enter vendor address"
                          value={staffData.vendorAddress || ""}
                          onChange={(e) => handleChange("vendorAddress", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="photo">Staff Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={staffData.photo} />
                      <AvatarFallback>
                        {staffData.name?.substring(0, 2).toUpperCase() || "ST"}
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      id="photo"
                      type="file"
                      className="max-w-sm"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            handleChange("photo", event.target?.result as string)
                          }
                          reader.readAsDataURL(e.target.files[0])
                        }
                      }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Role-specific fields */}
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
                            value={staffData.license || ""}
                            onChange={(e) => handleChange("license", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license-expiry">License Expiry Date</Label>
                          <Input
                            id="license-expiry"
                            type="date"
                            value={staffData.licenseExpiry || ""}
                            onChange={(e) => handleChange("licenseExpiry", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="years-experience">Years of Experience</Label>
                          <Input
                            id="years-experience"
                            type="number"
                            min="0"
                            placeholder="Enter years of experience"
                            value={staffData.yearsOfExperience || ""}
                            onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Switch
                            id="special-training"
                            checked={staffData.specialTraining || false}
                            onCheckedChange={(checked) => handleChange("specialTraining", checked)}
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
                          value={staffData.previousExperience || ""}
                          onChange={(e) => handleChange("previousExperience", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="certifications">Certifications</Label>
                        <Input
                          id="certifications"
                          placeholder="Enter certifications"
                          value={staffData.certifications || ""}
                          onChange={(e) => handleChange("certifications", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="responsibilities">Responsibilities</Label>
                        <Input
                          id="responsibilities"
                          placeholder="Enter responsibilities"
                          value={staffData.responsibilities || ""}
                          onChange={(e) => handleChange("responsibilities", e.target.value)}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/schoolbus/admin/staff">Cancel</Link>
              </Button>
              <Button type="submit" onClick={handleSubmit}>
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
