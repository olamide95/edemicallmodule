"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Save, Search } from "lucide-react"
import Link from "next/link"

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
  route: string
  students: number
  fee: string
  pickupTime: string
  dropoffTime: string
}

export default function FeesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [stops, setStops] = useState<BusStop[]>([])
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [updateFeeData, setUpdateFeeData] = useState({
    id: "",
    name: "",
    currentFee: "",
    newFee: "",
    reason: "",
  })
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
    route.baseFee.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredStops = stops.filter(stop => 
    stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.fee.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateFee = (id: string, name: string, currentFee: string) => {
    setUpdateFeeData({
      id,
      name,
      currentFee,
      newFee: "",
      reason: "",
    })
    setIsUpdateDialogOpen(true)
  }

  const saveUpdatedFee = () => {
    // Update route fee if the ID matches a route
    const updatedRoutes = routes.map(route => {
      if (route.id === updateFeeData.id) {
        return {
          ...route,
          baseFee: updateFeeData.newFee,
          // Update all stops that use base fee
          busStops: route.busStops?.map(stop => 
            stop.useBaseFee ? { ...stop, fee: updateFeeData.newFee } : stop
          )
        }
      }
      return route
    })

    // Update stop fee if the ID matches a stop
    const updatedStops = stops.map(stop => {
      if (stop.id === updateFeeData.id) {
        return {
          ...stop,
          fee: updateFeeData.newFee
        }
      }
      return stop
    })

    // Save to localStorage
    localStorage.setItem('routes', JSON.stringify(updatedRoutes))
    localStorage.setItem('stops', JSON.stringify(updatedStops))

    // Update state
    setRoutes(updatedRoutes)
    setStops(updatedStops)

    // Close dialog
    setIsUpdateDialogOpen(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fees</h1>
        <p className="text-muted-foreground">Manage bus service fees for routes and stops</p>
      </div>

      <Tabs defaultValue="routes">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="routes">Route Fees</TabsTrigger>
            <TabsTrigger value="stops">Bus Stop Fees</TabsTrigger>
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
              <CardTitle>Route Fees</CardTitle>
              <CardDescription>Manage fees for each bus route</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Base Fee</TableHead>
                    <TableHead>Bus Stops</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.baseFee}</TableCell>
                        <TableCell>{route.stops}</TableCell>
                        <TableCell>{route.students}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateFee(route.id, route.name, route.baseFee)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Update Fee
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
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
              <CardTitle>Bus Stop Fees</CardTitle>
              <CardDescription>Manage fees for each bus stop</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Stop</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStops.length > 0 ? (
                    filteredStops.map((stop) => (
                      <TableRow key={stop.id}>
                        <TableCell className="font-medium">{stop.name}</TableCell>
                        <TableCell>{stop.route}</TableCell>
                        <TableCell>{stop.fee}</TableCell>
                        <TableCell>{stop.students}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateFee(stop.id, stop.name, stop.fee)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Update Fee
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
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

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Fee</DialogTitle>
            <DialogDescription>Update the fee for {updateFeeData.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-fee" className="text-right">
                Current Fee
              </Label>
              <Input id="current-fee" value={updateFeeData.currentFee} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-fee" className="text-right">
                New Fee
              </Label>
              <Input
                id="new-fee"
                value={updateFeeData.newFee}
                onChange={(e) => setUpdateFeeData({ ...updateFeeData, newFee: e.target.value })}
                className="col-span-3"
                placeholder="Enter new fee amount"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Textarea
                id="reason"
                value={updateFeeData.reason}
                onChange={(e) => setUpdateFeeData({ ...updateFeeData, reason: e.target.value })}
                className="col-span-3"
                placeholder="Explain the reason for the fee update"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveUpdatedFee}>
              <Save className="mr-2 h-4 w-4" />
              Update Fee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}