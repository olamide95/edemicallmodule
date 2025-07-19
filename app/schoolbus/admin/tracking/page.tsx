"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, Navigation, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for buses
const buses = [
  {
    id: "1",
    name: "Bus A",
    route: "North Route",
    driver: "John Smith",
    phone: "+234 123 456 7890",
    status: "in-transit",
    currentStop: "Main Street",
    nextStop: "Oak Avenue",
    progress: 65,
    eta: "7 mins",
    students: 18,
    pickedUp: 12,
    droppedOff: 0,
    stops: [
      { name: "School", time: "06:45 AM", status: "completed" },
      { name: "Main Street", time: "07:15 AM", status: "current" },
      { name: "Oak Avenue", time: "07:30 AM", status: "upcoming" },
      { name: "Pine Road", time: "07:45 AM", status: "upcoming" },
      { name: "Cedar Lane", time: "08:00 AM", status: "upcoming" },
    ],
  },
  {
    id: "2",
    name: "Bus B",
    route: "East Route",
    driver: "Michael Brown",
    phone: "+234 234 567 8901",
    status: "at-stop",
    currentStop: "Pine Road",
    nextStop: "Cedar Lane",
    progress: 40,
    eta: "0 mins",
    students: 15,
    pickedUp: 6,
    droppedOff: 0,
    stops: [
      { name: "School", time: "06:30 AM", status: "completed" },
      { name: "Elm Street", time: "07:00 AM", status: "completed" },
      { name: "Pine Road", time: "07:15 AM", status: "current" },
      { name: "Cedar Lane", time: "07:30 AM", status: "upcoming" },
      { name: "Maple Drive", time: "07:45 AM", status: "upcoming" },
    ],
  },
  {
    id: "3",
    name: "Bus C",
    route: "West Route",
    driver: "Robert Wilson",
    phone: "+234 345 678 9012",
    status: "completed",
    currentStop: "School",
    nextStop: "N/A",
    progress: 100,
    eta: "0 mins",
    students: 20,
    pickedUp: 20,
    droppedOff: 20,
    stops: [
      { name: "School", time: "06:30 AM", status: "completed" },
      { name: "Birch Street", time: "07:00 AM", status: "completed" },
      { name: "Willow Avenue", time: "07:15 AM", status: "completed" },
      { name: "Spruce Road", time: "07:30 AM", status: "completed" },
      { name: "Ash Lane", time: "07:45 AM", status: "completed" },
    ],
  },
  {
    id: "4",
    name: "Bus D",
    route: "South Route",
    driver: "David Martinez",
    phone: "+234 456 789 0123",
    status: "not-started",
    currentStop: "N/A",
    nextStop: "Elm Street",
    progress: 0,
    eta: "25 mins",
    students: 16,
    pickedUp: 0,
    droppedOff: 0,
    stops: [
      { name: "School", time: "06:45 AM", status: "upcoming" },
      { name: "Elm Street", time: "07:15 AM", status: "upcoming" },
      { name: "Walnut Avenue", time: "07:30 AM", status: "upcoming" },
      { name: "Chestnut Road", time: "07:45 AM", status: "upcoming" },
      { name: "Sycamore Lane", time: "08:00 AM", status: "upcoming" },
    ],
  },
]

export default function AdminTrackingPage() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const selectedBusData = selectedBus ? buses.find((bus) => bus.id === selectedBus) : buses[0]

  const handleViewFullRoute = () => {
    setIsRouteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bus Tracking</h1>
        <p className="text-muted-foreground">Track school buses in real-time and monitor pickup/dropoff events</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedBus || ""} onValueChange={setSelectedBus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select bus" />
            </SelectTrigger>
            <SelectContent>
              {buses.map((bus) => (
                <SelectItem key={bus.id} value={bus.id}>
                  {bus.name} - {bus.route}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={new Date().toISOString().split("T")[0]}>Today</SelectItem>
              <SelectItem value={new Date(Date.now() - 86400000).toISOString().split("T")[0]}>Yesterday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Contact Driver
          </Button>
          <Button onClick={handleViewFullRoute}>
            <Navigation className="mr-2 h-4 w-4" />
            View Full Route
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Live Bus Location</CardTitle>
            <CardDescription>Current location and route progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-md overflow-hidden bg-muted h-[400px] flex items-center justify-center">
              {!mapLoaded ? (
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading map...</p>
                </div>
              ) : (
                <div className="w-full h-full bg-[url('/winding-road-map.png')]">
                  {/* Map would be rendered here with actual Google Maps or similar API */}
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          selectedBusData?.status === "in-transit"
                            ? "default"
                            : selectedBusData?.status === "at-stop"
                              ? "outline"
                              : selectedBusData?.status === "completed"
                                ? "secondary"
                                : "destructive"
                        }
                      >
                        {selectedBusData?.status === "in-transit"
                          ? "In Transit"
                          : selectedBusData?.status === "at-stop"
                            ? "At Bus Stop"
                            : selectedBusData?.status === "completed"
                              ? "Completed"
                              : "Not Started"}
                      </Badge>
                      <span className="text-sm font-medium">{selectedBusData?.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium">Current:</span> {selectedBusData?.currentStop}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-medium">Next:</span> {selectedBusData?.nextStop}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>ETA: {selectedBusData?.eta}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bus Status</CardTitle>
            <CardDescription>Current route progress and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Route Progress</span>
                <span>{selectedBusData?.progress}%</span>
              </div>
              <Progress value={selectedBusData?.progress} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium">{selectedBusData?.driver}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="text-sm font-medium">{selectedBusData?.route}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{selectedBusData?.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ETA to Next Stop</p>
                  <p className="text-sm font-medium">{selectedBusData?.eta}</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Student Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <span className="text-2xl font-bold">{selectedBusData?.students}</span>
                  <span className="text-xs text-muted-foreground text-center">Total Students</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <span className="text-2xl font-bold">{selectedBusData?.pickedUp}</span>
                  <span className="text-xs text-muted-foreground text-center">Picked Up</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <span className="text-2xl font-bold">{selectedBusData?.droppedOff}</span>
                  <span className="text-xs text-muted-foreground text-center">Dropped Off</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bus Schedule</CardTitle>
          <CardDescription>Scheduled stops and estimated arrival times</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Admin Controls</AlertTitle>
            <AlertDescription>
              As an administrator, you can view all buses and send notifications to parents about delays or changes.
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button className="mr-2">Send Delay Notification</Button>
            <Button variant="outline">Send Route Change Alert</Button>
          </div>
        </CardContent>
      </Card>

      {/* Full Route Dialog */}
      <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Full Route Details - {selectedBusData?.name}</DialogTitle>
            <DialogDescription>
              {selectedBusData?.route} - {selectedDate}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stop Name</TableHead>
                  <TableHead>Scheduled Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBusData?.stops.map((stop, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{stop.name}</TableCell>
                    <TableCell>{stop.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          stop.status === "completed" ? "default" : stop.status === "current" ? "secondary" : "outline"
                        }
                      >
                        {stop.status === "completed" ? "Completed" : stop.status === "current" ? "Current" : "Upcoming"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsRouteDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-px bg-border ${className || ""}`} />
}
