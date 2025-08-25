"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MapPin, Clock, Users, DollarSign } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

interface BusStop {
  id: string
  name: string
  routeId: string
  routeName: string
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
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [routeStops, setRouteStops] = useState<BusStop[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Load mock data if no data exists in localStorage
    const savedRoutes = localStorage.getItem('routes')
    const savedStops = localStorage.getItem('stops')

    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes))
    } else {
      // Create mock routes data if none exists
      const mockRoutes: Route[] = [
        {
          id: "1",
          name: "North Route",
          description: "Serves the northern areas of the city",
          stops: 8,
          buses: 2,
          students: 45,
          baseFee: "$50",
          status: "active"
        },
        {
          id: "2",
          name: "South Route",
          description: "Serves the southern suburbs",
          stops: 6,
          buses: 1,
          students: 32,
          baseFee: "$45",
          status: "active"
        },
        {
          id: "3",
          name: "East Route",
          description: "Covers eastern neighborhoods",
          stops: 7,
          buses: 2,
          students: 38,
          baseFee: "$55",
          status: "inactive"
        }
      ]
      setRoutes(mockRoutes)
      localStorage.setItem('routes', JSON.stringify(mockRoutes))
    }

    if (savedStops) {
      setStops(JSON.parse(savedStops))
    } else {
      // Create mock stops data if none exists
      const mockStops: BusStop[] = [
        {
          id: "1",
          name: "Oak Street",
          routeId: "1",
          routeName: "North Route",
          students: 12,
          fee: "$50",
          pickupTime: "7:15 AM",
          dropoffTime: "3:45 PM"
        },
        {
          id: "2",
          name: "Maple Avenue",
          routeId: "1",
          routeName: "North Route",
          students: 8,
          fee: "$50",
          pickupTime: "7:30 AM",
          dropoffTime: "4:00 PM"
        },
        {
          id: "3",
          name: "Pine Road",
          routeId: "2",
          routeName: "South Route",
          students: 15,
          fee: "$45",
          pickupTime: "7:00 AM",
          dropoffTime: "3:30 PM"
        },
        {
          id: "4",
          name: "Cedar Lane",
          routeId: "2",
          routeName: "South Route",
          students: 10,
          fee: "$45",
          pickupTime: "7:20 AM",
          dropoffTime: "3:50 PM"
        },
        {
          id: "5",
          name: "Elm Boulevard",
          routeId: "3",
          routeName: "East Route",
          students: 20,
          fee: "$55",
          pickupTime: "6:45 AM",
          dropoffTime: "3:15 PM"
        }
      ]
      setStops(mockStops)
      localStorage.setItem('stops', JSON.stringify(mockStops))
    }

    setIsLoading(false)
  }, [])

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredStops = stops.filter(stop => 
    stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewRoute = (route: Route) => {
    setSelectedRoute(route)
    // Filter stops for this specific route
    const stopsForRoute = stops.filter(stop => stop.routeId === route.id)
    setRouteStops(stopsForRoute)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
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
            <div className="flex gap-2 w-full sm:w-auto">
              <Link href="/schoolbus/admin/routes/new" className="w-full sm:w-auto">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Route
                </Button>
              </Link>
              <Link href="/schoolbus/admin/stops/new" className="w-full sm:w-auto">
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stop
                </Button>
              </Link>
            </div>
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
                          <Badge variant={route.status === "active" ? "default" : "secondary"}>
                            {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewRoute(route)}
                            className="mr-2"
                          >
                            View
                          </Button>
                          <Link href={`/schoolbus/admin/routes/${route.id}`}>
                            <Button variant="ghost" size="sm">
                              Edit
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
                        <TableCell>{stop.routeName}</TableCell>
                        <TableCell>{stop.students}</TableCell>
                        <TableCell>{stop.fee}</TableCell>
                        <TableCell>{stop.pickupTime}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/schoolbus/admin/stops/${stop.id}`}>
                            <Button variant="ghost" size="sm">
                              Edit
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

      {/* Route Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedRoute && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedRoute.name}
                </DialogTitle>
                <DialogDescription>{selectedRoute.description}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Stops</p>
                    <p className="text-2xl font-bold">{selectedRoute.stops}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-2xl font-bold">{selectedRoute.students}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Base Fee</p>
                    <p className="text-2xl font-bold">{selectedRoute.baseFee}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Buses</p>
                    <p className="text-2xl font-bold">{selectedRoute.buses}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Bus Stops</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stop Name</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Pickup Time</TableHead>
                        <TableHead>Dropoff Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {routeStops.length > 0 ? (
                        routeStops.map((stop) => (
                          <TableRow key={stop.id}>
                            <TableCell className="font-medium">{stop.name}</TableCell>
                            <TableCell>{stop.students}</TableCell>
                            <TableCell>{stop.fee}</TableCell>
                            <TableCell>{stop.pickupTime}</TableCell>
                            <TableCell>{stop.dropoffTime}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No stops found for this route
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button asChild>
                  <Link href={`/schoolbus/admin/routes/${selectedRoute.id}`}>
                    Edit Route
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}