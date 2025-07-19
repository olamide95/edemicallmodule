"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Map, Plus } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewRoutePage() {
  const [routeData, setRouteData] = useState({
    name: "",
    description: "",
    baseFee: "",
    isActive: true,
  })

  const [busStops, setBusStops] = useState([
    {
      id: 1,
      name: "",
      fee: "",
      useBaseFee: true,
      pickupTime: "",
      dropoffTime: "",
    },
  ])

  const handleRouteChange = (field: string, value: string | boolean) => {
    setRouteData({
      ...routeData,
      [field]: value,
    })
  }

  const handleBusStopChange = (id: number, field: string, value: string | boolean) => {
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
    const newId = Math.max(...busStops.map((stop) => stop.id), 0) + 1
    setBusStops([
      ...busStops,
      {
        id: newId,
        name: "",
        fee: routeData.baseFee,
        useBaseFee: true,
        pickupTime: "",
        dropoffTime: "",
      },
    ])
  }

  const removeBusStop = (id: number) => {
    if (busStops.length > 1) {
      setBusStops(busStops.filter((stop) => stop.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic would go here
    console.log("Submitted route data:", routeData)
    console.log("Bus stops:", busStops)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/routes">
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
                      setBusStops(busStops.map((stop) => (stop.useBaseFee ? { ...stop, fee: newBaseFee } : stop)))
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
                  checked={routeData.isActive}
                  onCheckedChange={(checked) => handleRouteChange("isActive", checked)}
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
                            onCheckedChange={(checked) => handleBusStopChange(stop.id, "useBaseFee", !!checked)}
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
              <Link href="/routes">
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
