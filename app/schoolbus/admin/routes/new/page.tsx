"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Map, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface Route {
  id: string
  name: string
  description: string
  baseFee: string
  status: "active" | "inactive"
}

interface BusStop {
  id: string
  name: string
  fee: string
  useBaseFee: boolean
  pickupTime: string
  dropoffTime: string
}

export default function NewRoutePage() {
  const router = useRouter()
  const [routeData, setRouteData] = useState<Route>({
    id: Date.now().toString(),
    name: "",
    description: "",
    baseFee: "",
    status: "active",
  })

  const [busStops, setBusStops] = useState<BusStop[]>([
    {
      id: Date.now().toString(),
      name: "",
      fee: "",
      useBaseFee: true,
      pickupTime: "",
      dropoffTime: "",
    },
  ])

  const handleRouteChange = (field: keyof Route, value: string | boolean) => {
    setRouteData({
      ...routeData,
      [field]: value,
    })
  }

  const handleBusStopChange = (id: string, field: keyof BusStop, value: string | boolean) => {
    setBusStops(
      busStops.map((stop) => {
        if (stop.id === id) {
          const updatedStop = { ...stop, [field]: value }

          // If toggling useBaseFee to true, set fee to base fee
          if (field === "useBaseFee" && value === true) {
            updatedStop.fee = routeData.baseFee
          }

          return updatedStop
        }
        return stop
      }),
    )
  }

  const addBusStop = () => {
    setBusStops([
      ...busStops,
      {
        id: Date.now().toString(),
        name: "",
        fee: routeData.baseFee,
        useBaseFee: true,
        pickupTime: "",
        dropoffTime: "",
      },
    ])
  }

  const removeBusStop = (id: string) => {
    if (busStops.length > 1) {
      setBusStops(busStops.filter((stop) => stop.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create route object
    const newRoute = {
      ...routeData,
      stops: busStops.length,
      buses: 1, // Default value, can be updated later
      students: busStops.reduce((sum, stop) => sum + 5, 0), // Example calculation
      busStops: busStops.map(stop => ({
        ...stop,
        route: routeData.name,
        students: 5, // Default value
      }))
    }

    // Get existing data from localStorage
    const savedRoutes = localStorage.getItem('routes')
    const savedStops = localStorage.getItem('stops')

    const existingRoutes = savedRoutes ? JSON.parse(savedRoutes) : []
    const existingStops = savedStops ? JSON.parse(savedStops) : []

    // Update routes
    const updatedRoutes = [...existingRoutes, newRoute]
    
    // Update stops
    const updatedStops = [
      ...existingStops,
      ...newRoute.busStops
    ]

    // Save to localStorage
    localStorage.setItem('routes', JSON.stringify(updatedRoutes))
    localStorage.setItem('stops', JSON.stringify(updatedStops))

    // Redirect to routes page
    router.push('/schoolbus/admin/routes')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/schoolbus/admin/routes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Route</h1>
          <p className="text-muted-foreground">Create a new bus route and stops</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Details</CardTitle>
              <CardDescription>Enter the details for the new route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route-name">Route Name</Label>
                  <Input
                    id="route-name"
                    placeholder="e.g., North Route"
                    value={routeData.name}
                    onChange={(e) => handleRouteChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base-fee">Base Fee</Label>
                  <Input
                    id="base-fee"
                    placeholder="e.g., ₦15,000"
                    value={routeData.baseFee}
                    onChange={(e) => {
                      const newBaseFee = e.target.value
                      handleRouteChange("baseFee", newBaseFee)

                      // Update fees for bus stops that use base fee
                      setBusStops(busStops.map((stop) => 
                        stop.useBaseFee ? { ...stop, fee: newBaseFee } : stop
                      ))
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="route-description">Description</Label>
                <Textarea
                  id="route-description"
                  placeholder="Enter route description"
                  value={routeData.description}
                  onChange={(e) => handleRouteChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="route-active"
                  checked={routeData.status === "active"}
                  onCheckedChange={(checked) => 
                    handleRouteChange("status", checked ? "active" : "inactive")
                  }
                />
                <Label htmlFor="route-active">Route is active</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bus Stops</CardTitle>
              <CardDescription>Add bus stops for this route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {busStops.map((stop, index) => (
                <div key={stop.id}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Bus Stop #{index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBusStop(stop.id)}
                      disabled={busStops.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`stop-name-${stop.id}`}>Stop Name</Label>
                      <Input
                        id={`stop-name-${stop.id}`}
                        placeholder="e.g., Main Street"
                        value={stop.name}
                        onChange={(e) => handleBusStopChange(stop.id, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor={`stop-fee-${stop.id}`}>Fee</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`use-base-fee-${stop.id}`}
                            checked={stop.useBaseFee}
                            onCheckedChange={(checked) => 
                              handleBusStopChange(stop.id, "useBaseFee", checked)
                            }
                          />
                          <Label htmlFor={`use-base-fee-${stop.id}`} className="text-xs text-muted-foreground">
                            Use base fee
                          </Label>
                        </div>
                      </div>
                      <Input
                        id={`stop-fee-${stop.id}`}
                        placeholder="e.g., ₦15,000"
                        value={stop.fee}
                        onChange={(e) => handleBusStopChange(stop.id, "fee", e.target.value)}
                        disabled={stop.useBaseFee}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`pickup-time-${stop.id}`}>Pickup Time</Label>
                      <Input
                        id={`pickup-time-${stop.id}`}
                        type="time"
                        value={stop.pickupTime}
                        onChange={(e) => handleBusStopChange(stop.id, "pickupTime", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`dropoff-time-${stop.id}`}>Dropoff Time</Label>
                      <Input
                        id={`dropoff-time-${stop.id}`}
                        type="time"
                        value={stop.dropoffTime}
                        onChange={(e) => handleBusStopChange(stop.id, "dropoffTime", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" className="w-full" onClick={addBusStop}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another Bus Stop
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/schoolbus/admin/routes">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">
                <Map className="mr-2 h-4 w-4" />
                Create Route
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}