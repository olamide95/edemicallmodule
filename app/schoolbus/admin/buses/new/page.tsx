"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bus } from "lucide-react"
import Link from "next/link"

export default function NewBusPage() {
  const [busData, setBusData] = useState({
    name: "",
    plateNumber: "",
    year: "",
    capacity: "",
    driver: "",
    administrator: "",
    route: "",
  })

  const handleChange = (field: string, value: string) => {
    setBusData({
      ...busData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic would go here
    console.log("Submitted bus data:", busData)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/buses">
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
              <Select onValueChange={(value) => handleChange("driver", value)}>
                <SelectTrigger id="driver">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="michael-brown">Michael Brown</SelectItem>
                  <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                  <SelectItem value="david-martinez">David Martinez</SelectItem>
                  <SelectItem value="james-thomas">James Thomas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="administrator">Bus Administrator</Label>
              <Select onValueChange={(value) => handleChange("administrator", value)}>
                <SelectTrigger id="administrator">
                  <SelectValue placeholder="Select an administrator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="emily-davis">Emily Davis</SelectItem>
                  <SelectItem value="jessica-taylor">Jessica Taylor</SelectItem>
                  <SelectItem value="jennifer-anderson">Jennifer Anderson</SelectItem>
                  <SelectItem value="lisa-robinson">Lisa Robinson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Select onValueChange={(value) => handleChange("route", value)}>
                <SelectTrigger id="route">
                  <SelectValue placeholder="Select a route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north-route">North Route</SelectItem>
                  <SelectItem value="east-route">East Route</SelectItem>
                  <SelectItem value="west-route">West Route</SelectItem>
                  <SelectItem value="south-route">South Route</SelectItem>
                  <SelectItem value="central-route">Central Route</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/buses">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">
              <Bus className="mr-2 h-4 w-4" />
              Create Bus
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
