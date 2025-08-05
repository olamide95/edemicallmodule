"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Employee {
  id: string
  name: string
  department: string
  subDepartment: string
}

interface Route {
  id: string
  name: string
  description: string
  stops: number
  buses: number
  students: number
  baseFee: string
  status: "active" | "inactive"
}

export default function NewBusPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [busData, setBusData] = useState({
    id: Date.now().toString(),
    name: "",
    plateNumber: "",
    year: "",
    capacity: "",
    driver: "",
    administrator: "",
    route: "",
    status: "active" as "active" | "maintenance" | "inactive"
  })

  useEffect(() => {
    // Load employees and routes from localStorage
    const savedEmployees = localStorage.getItem('employees')
    const savedRoutes = localStorage.getItem('routes')

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
    }
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes))
    }
    setIsLoading(false)
  }, [])

  const getDrivers = () => {
    return employees.filter(emp => 
      emp.department || 
      emp.subDepartment
    )
  }

  const getAdministrators = () => {
    return employees.filter(emp => 
      emp.department || 
      emp.subDepartment ||
      emp.department||
      emp.subDepartment
    )
  }

  const getActiveRoutes = () => {
    return routes.filter(route => route.status === "active")
  }

  const handleChange = (field: string, value: string) => {
    setBusData({
      ...busData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get existing buses from localStorage
    const savedBuses = localStorage.getItem('buses')
    const existingBuses = savedBuses ? JSON.parse(savedBuses) : []
    
    // Add new bus
    const updatedBuses = [
      ...existingBuses,
      {
        ...busData,
        capacity: parseInt(busData.capacity),
      }
    ]
    
    // Save to localStorage
    localStorage.setItem('buses', JSON.stringify(updatedBuses))
    
    // Redirect to buses page
    router.push('/schoolbus/admin/buses')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/schoolbus/admin/buses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Bus</h1>
          <p className="text-muted-foreground">Create a new bus in your fleet</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Bus Details</CardTitle>
            <CardDescription>Enter the details for the new bus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Bus Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Bus A"
                  value={busData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                  id="plateNumber"
                  placeholder="e.g., ABC-123"
                  value={busData.plateNumber}
                  onChange={(e) => handleChange("plateNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="e.g., 2022"
                  value={busData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Seat Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 42"
                  value={busData.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="driver">Driver</Label>
              <Select 
                onValueChange={(value) => handleChange("driver", value)}
                required
                disabled={getDrivers().length === 0}
              >
                <SelectTrigger id="driver">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {getDrivers().length > 0 ? (
                    getDrivers().map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-drivers" disabled>
                      No drivers found in employees
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {getDrivers().length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No employees with driver role found. Please add drivers in the employees section first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="administrator">Bus Administrator</Label>
              <Select 
                onValueChange={(value) => handleChange("administrator", value)}
                required
                disabled={getAdministrators().length === 0}
              >
                <SelectTrigger id="administrator">
                  <SelectValue placeholder="Select an administrator" />
                </SelectTrigger>
                <SelectContent>
                  {getAdministrators().length > 0 ? (
                    getAdministrators().map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-admins" disabled>
                      No administrators found in employees
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {getAdministrators().length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No employees with administrator role found. Please add administrators in the employees section first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Select 
                onValueChange={(value) => handleChange("route", value)} 
                required
                disabled={getActiveRoutes().length === 0}
              >
                <SelectTrigger id="route">
                  <SelectValue placeholder="Select a route" />
                </SelectTrigger>
                <SelectContent>
                  {getActiveRoutes().length > 0 ? (
                    getActiveRoutes().map((route) => (
                      <SelectItem key={route.id} value={route.name}>
                        {route.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-routes" disabled>
                      No active routes found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {getActiveRoutes().length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No active routes found. Please add routes first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                onValueChange={(value) => handleChange("status", value as "active" | "maintenance" | "inactive")} 
                defaultValue="active"
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/schoolbus/admin/buses">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button 
              type="submit" 
              disabled={!busData.driver || !busData.administrator || !busData.route}
            >
              <Bus className="mr-2 h-4 w-4" />
              Create Bus
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}