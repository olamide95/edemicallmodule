"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"

// Mock data for parent's children
const children = [
  {
    id: "1",
    name: "Alice Doe",
    class: "Primary 3",
    route: "North Route",
    stop: "Main Street",
    pickupTime: "07:15 AM",
    dropoffTime: "02:30 PM",
    status: "on-bus",
  },
  {
    id: "2",
    name: "Bob Doe",
    class: "Primary 1",
    route: "North Route",
    stop: "Main Street",
    pickupTime: "07:15 AM",
    dropoffTime: "02:30 PM",
    status: "at-school",
  },
]

// Mock data for bus tracking
const busTracking = {
  id: "1",
  name: "Bus A",
  route: "North Route",
  driver: "John Smith",
  phone: "+234 123 456 7890",
  status: "in-transit",
  currentStop: "Oak Avenue",
  nextStop: "Pine Boulevard",
  progress: 65,
  eta: "7 mins",
  lastUpdated: "2 mins ago",
}

// Mock data for recent events
const recentEvents = [
  {
    id: "1",
    type: "pickup",
    student: "Alice Doe",
    time: "07:18 AM",
    date: "Today",
    location: "Main Street",
    status: "completed",
  },
  {
    id: "2",
    type: "pickup",
    student: "Bob Doe",
    time: "07:18 AM",
    date: "Today",
    location: "Main Street",
    status: "completed",
  },
  {
    id: "3",
    type: "dropoff",
    student: "Alice Doe",
    time: "02:35 PM",
    date: "Yesterday",
    location: "Main Street",
    status: "completed",
  },
]

export default function ParentDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your school bus service dashboard</p>
      </div>

      <Alert>
        <Bell className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Enrollment for the Second Term 2023/2024 is now open. Please complete your enrollment by December 15, 2023.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Children</CardTitle>
            <CardDescription>Current bus service status for your children</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children.map((child) => (
              <div key={child.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{child.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.class}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>
                        {child.route} - {child.stop}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    variant={
                      child.status === "on-bus" ? "default" : child.status === "at-school" ? "outline" : "secondary"
                    }
                  >
                    {child.status === "on-bus" ? "On Bus" : child.status === "at-school" ? "At School" : "At Home"}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Pickup: {child.pickupTime}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Dropoff: {child.dropoffTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/parent/children">
              <Button>View Details</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Bus Tracking</CardTitle>
            <CardDescription>Track your children's bus in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md overflow-hidden bg-muted h-[200px] flex items-center justify-center">
              <div className="w-full h-full bg-[url('/city-bus-route.png')]">
                {/* Map would be rendered here with actual Google Maps or similar API */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      busTracking.status === "in-transit"
                        ? "default"
                        : busTracking.status === "at-stop"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {busTracking.status === "in-transit"
                      ? "In Transit"
                      : busTracking.status === "at-stop"
                        ? "At Bus Stop"
                        : "Completed"}
                  </Badge>
                  <span className="text-sm font-medium">{busTracking.name}</span>
                </div> 
                <span className="text-xs text-muted-foreground">Updated {busTracking.lastUpdated}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Route Progress</span>
                  <span>{busTracking.progress}%</span>
                </div>
                <Progress value={busTracking.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Location</p>
                  <p className="text-sm font-medium">{busTracking.currentStop}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Next Stop</p>
                  <p className="text-sm font-medium">{busTracking.nextStop}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ETA to Your Stop</p>
                  <p className="text-sm font-medium">{busTracking.eta}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium">{busTracking.driver}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Contact Driver
            </Button>
            <Link href="/parent/tracking">
              <Button>View Full Map</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center mt-4">
        <Link href="/">
          <Button variant="outline">Back to Selection Page</Button>
        </Link>
      </div>
    </div>
  )
}
