"use client"

import { useState } from "react"
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

const routeFees = [
  {
    id: "1",
    route: "North Route",
    baseFee: "₦15,000",
    stops: 8,
    lastUpdated: "15 Aug 2023",
  },
  {
    id: "2",
    route: "East Route",
    baseFee: "₦12,000",
    stops: 6,
    lastUpdated: "10 Aug 2023",
  },
  {
    id: "3",
    route: "West Route",
    baseFee: "₦14,000",
    stops: 7,
    lastUpdated: "12 Aug 2023",
  },
  {
    id: "4",
    route: "South Route",
    baseFee: "₦10,000",
    stops: 5,
    lastUpdated: "08 Aug 2023",
  },
  {
    id: "5",
    route: "Central Route",
    baseFee: "₦18,000",
    stops: 6,
    lastUpdated: "20 Aug 2023",
  },
]

const stopFees = [
  {
    id: "1",
    stop: "Main Street",
    route: "North Route",
    fee: "₦15,000",
    students: 12,
    lastUpdated: "15 Aug 2023",
  },
  {
    id: "2",
    stop: "Oak Avenue",
    route: "North Route",
    fee: "₦16,000",
    students: 8,
    lastUpdated: "15 Aug 2023",
  },
  {
    id: "3",
    stop: "Pine Road",
    route: "East Route",
    fee: "₦12,000",
    students: 10,
    lastUpdated: "10 Aug 2023",
  },
  {
    id: "4",
    stop: "Cedar Lane",
    route: "East Route",
    fee: "₦13,000",
    students: 7,
    lastUpdated: "10 Aug 2023",
  },
  {
    id: "5",
    stop: "Maple Drive",
    route: "West Route",
    fee: "₦14,000",
    students: 9,
    lastUpdated: "12 Aug 2023",
  },
]

export default function FeesPage() {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [updateFeeData, setUpdateFeeData] = useState({
    id: "",
    name: "",
    currentFee: "",
    newFee: "",
    reason: "",
  })

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fees</h1>
        <p className="text-muted-foreground">Manage bus service fees for routes and stops</p>
      </div>

      <Tabs defaultValue="routes">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="routes">Route Fees</TabsTrigger>
            <TabsTrigger value="stops">Bus Stop Fees</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8" />
            </div>
            <Link href="/fees/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Fee
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
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routeFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.route}</TableCell>
                      <TableCell>{fee.baseFee}</TableCell>
                      <TableCell>{fee.stops}</TableCell>
                      <TableCell>{fee.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateFee(fee.id, fee.route, fee.baseFee)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Update Fee
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stopFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.stop}</TableCell>
                      <TableCell>{fee.route}</TableCell>
                      <TableCell>{fee.fee}</TableCell>
                      <TableCell>{fee.students}</TableCell>
                      <TableCell>{fee.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateFee(fee.id, fee.stop, fee.fee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Update Fee
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Fee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
