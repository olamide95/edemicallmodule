"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"

interface Bus {
  id: string
  name: string
  plateNumber: string
  year: string
  capacity: number
  driver: string
  administrator: string
  route: string
  status: "active" | "maintenance" | "inactive"
}

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subDepartment: string
  class: string
  branch: string
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load buses from localStorage
    const savedBuses = localStorage.getItem('buses')
    if (savedBuses) {
      setBuses(JSON.parse(savedBuses))
    }

    // Load employees from localStorage (from onboarding)
    const savedEmployees = localStorage.getItem('employees')
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
    }

    setIsLoading(false)
  }, [])

  const saveBusesToLocalStorage = (updatedBuses: Bus[]) => {
    localStorage.setItem('buses', JSON.stringify(updatedBuses))
    setBuses(updatedBuses)
  }

  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEmployeeNameById = (id: string) => {
    const employee = employees.find(emp => emp.id === id)
    return employee ? employee.name : "Unknown"
  }

  const getDrivers = () => {
    return employees.filter(emp => 
      emp.department.toLowerCase().includes("driver") || 
      emp.subDepartment.toLowerCase().includes("driver")
    )
  }

  const getAdministrators = () => {
    return employees.filter(emp => 
      emp.department.toLowerCase().includes("administrator") || 
      emp.subDepartment.toLowerCase().includes("administrator") ||
      emp.department.toLowerCase().includes("administrator") ||
      emp.subDepartment.toLowerCase().includes("administrator")
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Buses</h1>
        <p className="text-muted-foreground">Manage your school bus fleet</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search buses..." 
            className="w-full bg-background pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/schoolbus/admin/buses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Bus
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bus Fleet</CardTitle>
          <CardDescription>View and manage all buses in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Administrator</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell className="font-medium">{bus.name}</TableCell>
                    <TableCell>{bus.plateNumber}</TableCell>
                    <TableCell>{bus.year}</TableCell>
                    <TableCell>{bus.capacity} seats</TableCell>
                    <TableCell>{getEmployeeNameById(bus.driver)}</TableCell>
                    <TableCell>{getEmployeeNameById(bus.administrator)}</TableCell>
                    <TableCell>{bus.route}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bus.status === "active" ? "default" : 
                          bus.status === "maintenance" ? "destructive" : "outline"
                        }
                      >
                        {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/schoolbus/admin/buses/${bus.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No buses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}