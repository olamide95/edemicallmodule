"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, User, Phone, MessageCircle, Calendar, GraduationCap, Bus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

// Mock data for children
const childrenData = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 8,
    grade: "Grade 3",
    section: "A",
    avatar: "/placeholder.svg?height=40&width=40&text=EJ",
    bus: {
      name: "Bus A",
      route: "North Route",
      seatNumber: "12A",
      pickupTime: "07:30 AM",
      dropoffTime: "03:45 PM",
      status: "active",
    },
    agent: {
      name: "Sarah Williams",
      phone: "+234 123 456 7890",
      avatar: "/placeholder.svg?height=32&width=32&text=SW",
      status: "active",
      rating: 4.8,
    },
    schedule: {
      pickup: "Oak Avenue Stop",
      dropoff: "Oak Avenue Stop",
      nextPickup: "Tomorrow 07:30 AM",
    },
  },
  {
    id: "2",
    name: "Michael Johnson",
    age: 11,
    grade: "Grade 6",
    section: "B",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    bus: {
      name: "Bus A",
      route: "North Route",
      seatNumber: "13A",
      pickupTime: "07:30 AM",
      dropoffTime: "03:45 PM",
      status: "active",
    },
    agent: {
      name: "David Chen",
      phone: "+234 234 567 8901",
      avatar: "/placeholder.svg?height=32&width=32&text=DC",
      status: "active",
      rating: 4.9,
    },
    schedule: {
      pickup: "Oak Avenue Stop",
      dropoff: "Oak Avenue Stop",
      nextPickup: "Tomorrow 07:30 AM",
    },
  },
]

export default function MyChildrenPage() {
  const [selectedChild, setSelectedChild] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
        <p className="text-muted-foreground">View and manage your children's school bus information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {childrenData.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {child.grade} - Section {child.section}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(child.bus.status)}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Bus Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Bus className="h-4 w-4 text-blue-600" />
                  Bus Information
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Bus & Route</p>
                    <p className="font-medium">
                      {child.bus.name} - {child.bus.route}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Seat Number</p>
                    <p className="font-medium">{child.bus.seatNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Pickup Time</p>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {child.bus.pickupTime}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Dropoff Time</p>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {child.bus.dropoffTime}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Agent Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-green-600" />
                  Pickup Agent
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={child.agent.avatar || "/placeholder.svg"} alt={child.agent.name} />
                      <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                        {child.agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{child.agent.name}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(child.agent.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({child.agent.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Schedule Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  Schedule & Location
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup Location:</span>
                    <span className="font-medium">{child.schedule.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dropoff Location:</span>
                    <span className="font-medium">{child.schedule.dropoff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Pickup:</span>
                    <span className="font-medium text-blue-600">{child.schedule.nextPickup}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{child.name}'s Schedule</DialogTitle>
                      <DialogDescription>Weekly pickup and dropoff schedule</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b">
                          <span className="font-medium">{day}</span>
                          <div className="text-sm text-muted-foreground">
                            {child.bus.pickupTime} - {child.bus.dropoffTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" />
                  Track Bus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Summary</CardTitle>
          <CardDescription>Overview of all children's transportation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{childrenData.length}</div>
              <div className="text-sm text-muted-foreground">Total Children</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {childrenData.filter((child) => child.bus.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Services</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(childrenData.map((child) => child.bus.name)).size}
              </div>
              <div className="text-sm text-muted-foreground">Different Buses</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {new Set(childrenData.map((child) => child.agent.name)).size}
              </div>
              <div className="text-sm text-muted-foreground">Assigned Agents</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
