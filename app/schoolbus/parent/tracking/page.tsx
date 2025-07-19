"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Phone, MapPin, Navigation, Wifi, WifiOff, Map, Layers } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data
const busRoutes = [
  {
    id: "1",
    name: "North Route",
    buses: ["Bus A"],
  },
  {
    id: "2",
    name: "East Route",
    buses: ["Bus B"],
  },
  {
    id: "3",
    name: "West Route",
    buses: ["Bus C"],
  },
  {
    id: "4",
    name: "South Route",
    buses: ["Bus D"],
  },
]

const busData = {
  "Bus A": {
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
    coordinates: { lat: 6.5244, lng: 3.3792 },
    stops: [
      { name: "School", time: "07:00 AM", status: "completed", coordinates: { lat: 6.52, lng: 3.37 } },
      { name: "Main Street", time: "07:15 AM", status: "completed", coordinates: { lat: 6.522, lng: 3.375 } },
      { name: "Oak Avenue", time: "07:25 AM", status: "current", coordinates: { lat: 6.5244, lng: 3.3792 } },
      { name: "Pine Boulevard", time: "07:35 AM", status: "upcoming", coordinates: { lat: 6.528, lng: 3.385 } },
      { name: "Cedar Lane", time: "07:45 AM", status: "upcoming", coordinates: { lat: 6.532, lng: 3.39 } },
    ],
  },
  "Bus B": {
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
    lastUpdated: "1 min ago",
    coordinates: { lat: 6.53, lng: 3.4 },
    stops: [
      { name: "School", time: "07:00 AM", status: "completed", coordinates: { lat: 6.52, lng: 3.37 } },
      { name: "Pine Road", time: "07:10 AM", status: "current", coordinates: { lat: 6.53, lng: 3.4 } },
      { name: "Cedar Lane", time: "07:20 AM", status: "upcoming", coordinates: { lat: 6.535, lng: 3.41 } },
      { name: "Birch Avenue", time: "07:30 AM", status: "upcoming", coordinates: { lat: 6.54, lng: 3.42 } },
      { name: "Elm Street", time: "07:40 AM", status: "upcoming", coordinates: { lat: 6.545, lng: 3.43 } },
    ],
  },
}

export default function ParentTrackingPage() {
  const [selectedRoute, setSelectedRoute] = useState<string>("1")
  const [selectedBus, setSelectedBus] = useState<string>("Bus A")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [mapError, setMapError] = useState(false)
  const [useRealMap, setUseRealMap] = useState(false)
  const [realMapLoaded, setRealMapLoaded] = useState(false)

  // Simulate map loading with potential error
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate occasional map loading failure
      const shouldFail = Math.random() < 0.1 // 10% chance of failure
      if (shouldFail) {
        setMapError(true)
        setMapLoaded(false)
      } else {
        setMapLoaded(true)
        setMapError(false)
      }
    }, 2000) // Increased loading time to be more realistic

    return () => clearTimeout(timer)
  }, [selectedBus])

  // Handle real map loading
  useEffect(() => {
    if (useRealMap) {
      setRealMapLoaded(false)
      const timer = setTimeout(() => {
        setRealMapLoaded(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [useRealMap, selectedBus])

  // Simulate connection status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(Math.random() > 0.05) // 95% uptime
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRouteChange = (value: string) => {
    setSelectedRoute(value)
    setMapLoaded(false)
    setMapError(false)
    setRealMapLoaded(false)
    // Set the first bus of the selected route as the selected bus
    const route = busRoutes.find((r) => r.id === value)
    if (route && route.buses.length > 0) {
      setSelectedBus(route.buses[0])
    }
  }

  const handleBusChange = (value: string) => {
    setSelectedBus(value)
    setMapLoaded(false)
    setMapError(false)
    setRealMapLoaded(false)
  }

  const retryMapLoad = () => {
    setMapLoaded(false)
    setMapError(false)
    setRealMapLoaded(false)
    setTimeout(() => {
      if (useRealMap) {
        setRealMapLoaded(true)
      } else {
        setMapLoaded(true)
      }
    }, 1500)
  }

  const currentBusData = busData[selectedBus as keyof typeof busData]

  const renderSimulatedMap = () => (
    <div className="w-full h-full relative">
      {/* Simulated Interactive Map */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 relative overflow-hidden">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
            ))}
          </div>
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 350 Q 150 300 250 250 Q 350 200 450 150"
            stroke="#8C57FF"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>

        {/* Bus stops */}
        {currentBusData?.stops.map((stop, index) => (
          <div
            key={index}
            className={`absolute w-4 h-4 rounded-full border-2 ${
              stop.status === "completed"
                ? "bg-green-500 border-green-600"
                : stop.status === "current"
                  ? "bg-blue-500 border-blue-600 animate-pulse"
                  : "bg-gray-300 border-gray-400"
            }`}
            style={{
              left: `${20 + index * 80}px`,
              top: `${350 - index * 50}px`,
            }}
            title={stop.name}
          />
        ))}

        {/* Moving bus icon */}
        <div
          className="absolute w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce"
          style={{
            left: `${50 + (currentBusData?.progress || 0) * 4}px`,
            top: `${330 - (currentBusData?.progress || 0) * 2}px`,
          }}
        >
          <Navigation className="h-4 w-4 text-white" />
        </div>

        {/* Bus info overlay */}
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant={
                currentBusData?.status === "in-transit"
                  ? "default"
                  : currentBusData?.status === "at-stop"
                    ? "outline"
                    : "secondary"
              }
            >
              {currentBusData?.status === "in-transit"
                ? "In Transit"
                : currentBusData?.status === "at-stop"
                  ? "At Bus Stop"
                  : "Completed"}
            </Badge>
            <span className="text-sm font-medium">{currentBusData?.name}</span>
          </div>
          <div className="text-xs text-muted-foreground mb-1">
            <span className="font-medium">Current:</span> {currentBusData?.currentStop}
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            <span className="font-medium">Next:</span> {currentBusData?.nextStop}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3" />
            <span>ETA: {currentBusData?.eta}</span>
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
          {currentBusData?.coordinates.lat.toFixed(4)}, {currentBusData?.coordinates.lng.toFixed(4)}
        </div>
      </div>
    </div>
  )

  const renderRealMap = () => (
    <div className="w-full h-full relative">
      {!realMapLoaded ? (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
            <p className="text-xs text-muted-foreground mt-1">Initializing map services</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          {/* Embedded Google Maps-like interface */}
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d${currentBusData?.coordinates.lng}!3d${currentBusData?.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1635959385076!5m2!1sen!2sng`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          />

          {/* Overlay controls */}
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md max-w-xs z-10">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  currentBusData?.status === "in-transit"
                    ? "default"
                    : currentBusData?.status === "at-stop"
                      ? "outline"
                      : "secondary"
                }
              >
                {currentBusData?.status === "in-transit"
                  ? "In Transit"
                  : currentBusData?.status === "at-stop"
                    ? "At Bus Stop"
                    : "Completed"}
              </Badge>
              <span className="text-sm font-medium">{currentBusData?.name}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-1">
              <span className="font-medium">Current:</span> {currentBusData?.currentStop}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              <span className="font-medium">Next:</span> {currentBusData?.nextStop}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3" />
              <span>ETA: {currentBusData?.eta}</span>
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md z-10">
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <span className="text-lg font-bold">+</span>
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <span className="text-lg font-bold">−</span>
              </Button>
            </div>
          </div>

          {/* Coordinates display */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono z-10">
            {currentBusData?.coordinates.lat.toFixed(4)}, {currentBusData?.coordinates.lng.toFixed(4)}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bus Tracking</h1>
        <p className="text-muted-foreground">Track your children's school bus in real-time</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedRoute} onValueChange={handleRouteChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              {busRoutes.map((route) => (
                <SelectItem key={route.id} value={route.id}>
                  {route.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBus} onValueChange={handleBusChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select bus" />
            </SelectTrigger>
            <SelectContent>
              {busRoutes
                .find((r) => r.id === selectedRoute)
                ?.buses.map((bus) => (
                  <SelectItem key={bus} value={bus}>
                    {bus}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Phone className="mr-2 h-4 w-4" />
          Contact Bus Admin
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Bus Location</CardTitle>
                <CardDescription>Current location and route progress</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Layers className="h-4 w-4" />
                  <Label htmlFor="map-mode" className="text-sm">
                    {useRealMap ? "Map View" : "Diagram View"}
                  </Label>
                  <Switch id="map-mode" checked={useRealMap} onCheckedChange={setUseRealMap} />
                  <Map className="h-4 w-4" />
                </div>
                {isConnected ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Wifi className="h-4 w-4" />
                    <span className="text-xs">Live</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-xs">Offline</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-md overflow-hidden bg-muted h-[400px] flex items-center justify-center">
              {!useRealMap ? (
                // Simulated Map View
                !mapLoaded && !mapError ? (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Loading live tracking...</p>
                    <p className="text-xs text-muted-foreground mt-1">Connecting to GPS tracking system</p>
                  </div>
                ) : mapError ? (
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-sm font-medium mb-2">Unable to load tracking</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      There was an issue connecting to the tracking system
                    </p>
                    <Button onClick={retryMapLoad} size="sm" variant="outline">
                      Retry
                    </Button>
                  </div>
                ) : (
                  renderSimulatedMap()
                )
              ) : (
                // Real Map View
                renderRealMap()
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bus Status</CardTitle>
            <CardDescription>Current route progress and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Route Progress</span>
                <span>{currentBusData?.progress}%</span>
              </div>
              <Progress value={currentBusData?.progress} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium">{currentBusData?.driver}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="text-sm font-medium">{currentBusData?.route}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{currentBusData?.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ETA to Next Stop</p>
                  <p className="text-sm font-medium">{currentBusData?.eta}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{currentBusData?.lastUpdated}</p>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTitle>Notifications Enabled</AlertTitle>
              <AlertDescription>
                You will receive notifications when the bus is 10 minutes and 5 minutes away from your stop.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bus Schedule</CardTitle>
          <CardDescription>Scheduled stops and estimated arrival times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 h-full w-px bg-muted-foreground/20" />
            <ol className="space-y-6 pl-10">
              {currentBusData?.stops.map((stop, index) => (
                <li key={index} className="relative">
                  <div
                    className={`absolute left-[-30px] flex h-6 w-6 items-center justify-center rounded-full border ${
                      stop.status === "completed"
                        ? "border-green-500 bg-green-500 text-white"
                        : stop.status === "current"
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-muted-foreground/20 bg-background"
                    }`}
                  >
                    {stop.status === "completed" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : stop.status === "current" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{stop.name}</p>
                      <p className="text-sm text-muted-foreground">{stop.time}</p>
                    </div>
                    <Badge
                      variant={
                        stop.status === "completed" ? "outline" : stop.status === "current" ? "default" : "secondary"
                      }
                    >
                      {stop.status === "completed" ? "Completed" : stop.status === "current" ? "Current" : "Upcoming"}
                    </Badge>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
