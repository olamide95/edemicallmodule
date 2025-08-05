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

interface Route {
  id: string
  name: string
  description: string
  stops: number
  buses: number
  students: number
  baseFee: string
  status: "active" | "inactive"
  busStops: BusStop[]
}

interface BusStop {
  id: string
  name: string
  route: string
  students: number
  fee: string
  pickupTime: string
  dropoffTime: string
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [stops, setStops] = useState<BusStop[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const savedRoutes = localStorage.getItem('routes')
    const savedStops = localStorage.getItem('stops')

    if (savedRoutes) setRoutes(JSON.parse(savedRoutes))
    if (savedStops) setStops(JSON.parse(savedStops))

    setIsLoading(false)
  }, [])

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredStops = stops.filter(stop => 
    stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.route.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Routes & Stops</h1>
        <p className="text-muted-foreground">Manage your bus routes and stops</p>
      </div>

      <Tabs defaultValue="routes">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="stops">Bus Stops</TabsTrigger>
          </TabsList>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full bg-background pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/schoolbus/admin/routes/new" className="w-full sm:w-auto">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
        </div>

        <TabsContent value="routes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Routes</CardTitle>
              <CardDescription>View and manage all bus routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Buses</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Base Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.stops}</TableCell>
                        <TableCell>{route.buses}</TableCell>
                        <TableCell>{route.students}</TableCell>
                        <TableCell>{route.baseFee}</TableCell>
                        <TableCell>
                          <Badge variant={route.status === "active" ? "default" : "outline"}>
                            {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/schoolbus/admin/routes/${route.id}`}>
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
                        No routes found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stops" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Stops</CardTitle>
              <CardDescription>View and manage all bus stops</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stop Name</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Pickup Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStops.length > 0 ? (
                    filteredStops.map((stop) => (
                      <TableRow key={stop.id}>
                        <TableCell className="font-medium">{stop.name}</TableCell>
                        <TableCell>{stop.route}</TableCell>
                        <TableCell>{stop.students}</TableCell>
                        <TableCell>{stop.fee}</TableCell>
                        <TableCell>{stop.pickupTime}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/schoolbus/admin/stops/${stop.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No stops found
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