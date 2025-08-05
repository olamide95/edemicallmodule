"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

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
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load staff from localStorage
    const savedStaff = localStorage.getItem('employees')
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff))
    }
    setIsLoading(false)
  }, [])

  const filteredAdministrators = staff.filter(member => 
    member.role === "administrator" &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.bus.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredDrivers = staff.filter(member => 
    member.role === "driver" &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.license?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.bus.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">Manage bus administrators and drivers</p>
      </div>

      <Tabs defaultValue="administrators">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="administrators">Administrators</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search staff..." 
                className="w-full bg-background pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/schoolbus/admin/staff/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </Link>
          </div>
        </div>

        <TabsContent value="administrators" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Administrators</CardTitle>
              <CardDescription>Manage bus administrators who oversee bus operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assigned Bus</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdministrators.length > 0 ? (
                    filteredAdministrators.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.bus}</TableCell>
                        <TableCell>{admin.route}</TableCell>
                        <TableCell>
                          <Badge variant={admin.status === "active" ? "default" : "outline"}>
                            {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/schoolbus/admin/staff/${admin.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No administrators found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Drivers</CardTitle>
              <CardDescription>Manage bus drivers responsible for operating the buses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Assigned Bus</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.phone}</TableCell>
                        <TableCell>{driver.license}</TableCell>
                        <TableCell>{driver.bus}</TableCell>
                        <TableCell>{driver.route}</TableCell>
                        <TableCell>
                          <Badge variant={driver.status === "active" ? "default" : "outline"}>
                            {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/schoolbus/admin/staff/${driver.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No drivers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}