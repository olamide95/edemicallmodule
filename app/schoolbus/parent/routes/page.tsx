"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Eye, EyeOff, MapPin, Clock, Users, Shield, Bus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock data for parent's children routes
const childrenRoutes = [
  {
    childId: "alice",
    childName: "Alice Doe",
    route: {
      id: "north-route",
      name: "North Route",
      description: "Covers northern residential areas",
      bus: "Bus A",
      driver: "John Smith",
      driverPhone: "+234 123 456 7890",
      totalStops: 8,
      estimatedDuration: "45 minutes",
      stops: [
        { id: 1, name: "School Gate", time: "07:00 AM", type: "start", isChildStop: false },
        { id: 2, name: "Victoria Island", time: "07:08 AM", type: "pickup", isChildStop: false },
        { id: 3, name: "Ikoyi Bridge", time: "07:15 AM", type: "pickup", isChildStop: false },
        { id: 4, name: "Main Street", time: "07:22 AM", type: "pickup", isChildStop: true },
        { id: 5, name: "Oak Avenue", time: "07:28 AM", type: "pickup", isChildStop: false },
        { id: 6, name: "Pine Boulevard", time: "07:35 AM", type: "pickup", isChildStop: false },
        { id: 7, name: "Cedar Lane", time: "07:42 AM", type: "pickup", isChildStop: false },
        { id: 8, name: "School Gate", time: "07:50 AM", type: "end", isChildStop: false },
      ],
      returnStops: [
        { id: 1, name: "School Gate", time: "02:30 PM", type: "start", isChildStop: false },
        { id: 2, name: "Cedar Lane", time: "02:38 PM", type: "dropoff", isChildStop: false },
        { id: 3, name: "Pine Boulevard", time: "02:45 PM", type: "dropoff", isChildStop: false },
        { id: 4, name: "Oak Avenue", time: "02:52 PM", type: "dropoff", isChildStop: false },
        { id: 5, name: "Main Street", time: "02:58 PM", type: "dropoff", isChildStop: true },
        { id: 6, name: "Ikoyi Bridge", time: "03:05 PM", type: "dropoff", isChildStop: false },
        { id: 7, name: "Victoria Island", time: "03:12 PM", type: "dropoff", isChildStop: false },
        { id: 8, name: "School Gate", time: "03:20 PM", type: "end", isChildStop: false },
      ],
    },
  },
  {
    childId: "bob",
    childName: "Bob Doe",
    route: {
      id: "north-route",
      name: "North Route",
      description: "Covers northern residential areas",
      bus: "Bus A",
      driver: "John Smith",
      driverPhone: "+234 123 456 7890",
      totalStops: 8,
      estimatedDuration: "45 minutes",
      stops: [
        { id: 1, name: "School Gate", time: "07:00 AM", type: "start", isChildStop: false },
        { id: 2, name: "Victoria Island", time: "07:08 AM", type: "pickup", isChildStop: false },
        { id: 3, name: "Ikoyi Bridge", time: "07:15 AM", type: "pickup", isChildStop: false },
        { id: 4, name: "Main Street", time: "07:22 AM", type: "pickup", isChildStop: true },
        { id: 5, name: "Oak Avenue", time: "07:28 AM", type: "pickup", isChildStop: false },
        { id: 6, name: "Pine Boulevard", time: "07:35 AM", type: "pickup", isChildStop: false },
        { id: 7, name: "Cedar Lane", time: "07:42 AM", type: "pickup", isChildStop: false },
        { id: 8, name: "School Gate", time: "07:50 AM", type: "end", isChildStop: false },
      ],
      returnStops: [
        { id: 1, name: "School Gate", time: "02:30 PM", type: "start", isChildStop: false },
        { id: 2, name: "Cedar Lane", time: "02:38 PM", type: "dropoff", isChildStop: false },
        { id: 3, name: "Pine Boulevard", time: "02:45 PM", type: "dropoff", isChildStop: false },
        { id: 4, name: "Oak Avenue", time: "02:52 PM", type: "dropoff", isChildStop: false },
        { id: 5, name: "Main Street", time: "02:58 PM", type: "dropoff", isChildStop: true },
        { id: 6, name: "Ikoyi Bridge", time: "03:05 PM", type: "dropoff", isChildStop: false },
        { id: 7, name: "Victoria Island", time: "03:12 PM", type: "dropoff", isChildStop: false },
        { id: 8, name: "School Gate", time: "03:20 PM", type: "end", isChildStop: false },
      ],
    },
  },
]

export default function ParentRoutesPage() {
  const [visibleRoutes, setVisibleRoutes] = useState<{ [key: string]: boolean }>({})

  const toggleRouteVisibility = (childId: string) => {
    setVisibleRoutes((prev) => ({
      ...prev,
      [childId]: !prev[childId],
    }))
  }

  // Group children by route to avoid duplication
  const uniqueRoutes = childrenRoutes.reduce((acc, child) => {
    const existingRoute = acc.find((r) => r.route.id === child.route.id)
    if (existingRoute) {
      existingRoute.children.push({ id: child.childId, name: child.childName })
    } else {
      acc.push({
        route: child.route,
        children: [{ id: child.childId, name: child.childName }],
      })
    }
    return acc
  }, [] as any[])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Routes & Stops</h1>
        <p className="text-muted-foreground">View bus routes and stops for your children</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          Route details are hidden by default for security reasons. Click "Show Route" to view detailed information.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {uniqueRoutes.map((routeData, index) => {
          const routeKey = `${routeData.route.id}-${index}`
          const isVisible = visibleRoutes[routeKey]

          return (
            <Card key={routeKey} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#8C57FF]/10 to-[#16B1FF]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-[#8C57FF]" />
                      {routeData.route.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {routeData.route.description} • {routeData.route.bus} • Driver: {routeData.route.driver}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => toggleRouteVisibility(routeKey)}
                    className="flex items-center gap-2"
                  >
                    {isVisible ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Hide Route
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Show Route
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#16B1FF]" />
                    <div>
                      <p className="text-sm font-medium">Children on this route</p>
                      <p className="text-xs text-muted-foreground">
                        {routeData.children.map((child) => child.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#56CA00]" />
                    <div>
                      <p className="text-sm font-medium">{routeData.route.totalStops} Stops</p>
                      <p className="text-xs text-muted-foreground">Total route stops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FFB400]" />
                    <div>
                      <p className="text-sm font-medium">{routeData.route.estimatedDuration}</p>
                      <p className="text-xs text-muted-foreground">Estimated duration</p>
                    </div>
                  </div>
                </div>

                {!isVisible ? (
                  <div className="text-center py-8 bg-muted/30 rounded-lg">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Route details are hidden for security</p>
                    <p className="text-sm text-muted-foreground mt-1">Click "Show Route" to view stops and times</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Morning Route */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="h-3 w-3 bg-[#56CA00] rounded-full"></div>
                        Morning Pickup Route
                      </h3>
                      <div className="relative">
                        <div className="absolute left-4 top-6 bottom-6 w-px bg-gradient-to-b from-[#56CA00] to-[#8C57FF]"></div>
                        <div className="space-y-4">
                          {routeData.route.stops.map((stop, stopIndex) => (
                            <div key={stop.id} className="flex items-center gap-4">
                              <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                  stop.isChildStop
                                    ? "border-[#8C57FF] bg-[#8C57FF] text-white"
                                    : stop.type === "start" || stop.type === "end"
                                      ? "border-[#56CA00] bg-[#56CA00] text-white"
                                      : "border-muted bg-background"
                                }`}
                              >
                                {stop.isChildStop ? (
                                  <Users className="h-4 w-4" />
                                ) : stop.type === "start" || stop.type === "end" ? (
                                  <MapPin className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs font-medium">{stopIndex}</span>
                                )}
                              </div>
                              <div className="flex-1 flex items-center justify-between">
                                <div>
                                  <p className={`font-medium ${stop.isChildStop ? "text-[#8C57FF]" : ""}`}>
                                    {stop.name}
                                    {stop.isChildStop && (
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        Your Stop
                                      </Badge>
                                    )}
                                  </p>
                                  <p className="text-sm text-muted-foreground capitalize">{stop.type}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{stop.time}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {stopIndex === 0
                                      ? "Start"
                                      : stopIndex === routeData.route.stops.length - 1
                                        ? "End"
                                        : `+${stopIndex * 7}min`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Afternoon Route */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <div className="h-3 w-3 bg-[#FFB400] rounded-full"></div>
                        Afternoon Dropoff Route
                      </h3>
                      <div className="relative">
                        <div className="absolute left-4 top-6 bottom-6 w-px bg-gradient-to-b from-[#FFB400] to-[#FF4C51]"></div>
                        <div className="space-y-4">
                          {routeData.route.returnStops.map((stop, stopIndex) => (
                            <div key={stop.id} className="flex items-center gap-4">
                              <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                  stop.isChildStop
                                    ? "border-[#FF4C51] bg-[#FF4C51] text-white"
                                    : stop.type === "start" || stop.type === "end"
                                      ? "border-[#FFB400] bg-[#FFB400] text-white"
                                      : "border-muted bg-background"
                                }`}
                              >
                                {stop.isChildStop ? (
                                  <Users className="h-4 w-4" />
                                ) : stop.type === "start" || stop.type === "end" ? (
                                  <MapPin className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs font-medium">{stopIndex}</span>
                                )}
                              </div>
                              <div className="flex-1 flex items-center justify-between">
                                <div>
                                  <p className={`font-medium ${stop.isChildStop ? "text-[#FF4C51]" : ""}`}>
                                    {stop.name}
                                    {stop.isChildStop && (
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        Your Stop
                                      </Badge>
                                    )}
                                  </p>
                                  <p className="text-sm text-muted-foreground capitalize">{stop.type}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{stop.time}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {stopIndex === 0
                                      ? "Start"
                                      : stopIndex === routeData.route.returnStops.length - 1
                                        ? "End"
                                        : `+${stopIndex * 7}min`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
