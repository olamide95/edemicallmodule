"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil } from "lucide-react"

// Sample data
const initialDiscountTypes = [
  {
    id: 1,
    name: "Sibling Discount",
    description: "Discount for families with multiple children",
    type: "Percentage",
    value: "15%",
    applicableFees: "All Fees",
    active: true,
  },
  {
    id: 2,
    name: "Staff Discount",
    description: "Discount for children of staff members",
    type: "Percentage",
    value: "50%",
    applicableFees: "Tuition Fee Only",
    active: true,
  },
  {
    id: 3,
    name: "Merit Scholarship",
    description: "Discount for academic excellence",
    type: "Percentage",
    value: "25%",
    applicableFees: "Tuition Fee Only",
    active: true,
  },
  {
    id: 4,
    name: "Financial Aid",
    description: "Need-based financial assistance",
    type: "Percentage",
    value: "Variable (10-100%)",
    applicableFees: "All Fees",
    active: true,
  },
  {
    id: 5,
    name: "Early Payment Discount",
    description: "Discount for paying full year in advance",
    type: "Fixed Amount",
    value: "$200.00",
    applicableFees: "Tuition Fee Only",
    active: false,
  },
]

export function DiscountTypes() {
  const [discountTypes, setDiscountTypes] = useState(initialDiscountTypes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDiscount, setCurrentDiscount] = useState<any>(null)

  const handleAddEdit = (discount: any = null) => {
    setCurrentDiscount(
      discount || {
        name: "",
        description: "",
        type: "Percentage",
        value: "",
        applicableFees: "All Fees",
        active: true,
      },
    )
    setIsDialogOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentDiscount.id) {
      // Edit existing discount
      setDiscountTypes(discountTypes.map((item) => (item.id === currentDiscount.id ? currentDiscount : item)))
    } else {
      // Add new discount
      const newId = Math.max(...discountTypes.map((item) => item.id)) + 1
      setDiscountTypes([...discountTypes, { ...currentDiscount, id: newId }])
    }

    setIsDialogOpen(false)
  }

  const toggleActive = (id: number) => {
    setDiscountTypes(discountTypes.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Discount Types</CardTitle>
            <CardDescription>Configure different types of discounts</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleAddEdit()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Discount Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>{currentDiscount?.id ? "Edit" : "Add"} Discount Type</DialogTitle>
                  <DialogDescription>
                    {currentDiscount?.id
                      ? "Update the details of this discount type"
                      : "Create a new discount type for fee reduction"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Discount Name</Label>
                    <Input
                      id="name"
                      value={currentDiscount?.name || ""}
                      onChange={(e) => setCurrentDiscount({ ...currentDiscount, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={currentDiscount?.description || ""}
                      onChange={(e) => setCurrentDiscount({ ...currentDiscount, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Discount Type</Label>
                    <Select
                      value={currentDiscount?.type || ""}
                      onValueChange={(value) => setCurrentDiscount({ ...currentDiscount, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Percentage">Percentage</SelectItem>
                        <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                        <SelectItem value="Variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Discount Value</Label>
                    <Input
                      id="value"
                      value={currentDiscount?.value || ""}
                      onChange={(e) => setCurrentDiscount({ ...currentDiscount, value: e.target.value })}
                      placeholder={currentDiscount?.type === "Fixed Amount" ? "$0.00" : "0%"}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {currentDiscount?.type === "Percentage"
                        ? "Enter percentage value (e.g., 15%)"
                        : currentDiscount?.type === "Fixed Amount"
                          ? "Enter fixed amount (e.g., $200.00)"
                          : "Enter variable range (e.g., Variable (10-100%)"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicableFees">Applicable Fees</Label>
                    <Select
                      value={currentDiscount?.applicableFees || ""}
                      onValueChange={(value) => setCurrentDiscount({ ...currentDiscount, applicableFees: value })}
                    >
                      <SelectTrigger id="applicableFees">
                        <SelectValue placeholder="Select applicable fees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Fees">All Fees</SelectItem>
                        <SelectItem value="Tuition Fee Only">Tuition Fee Only</SelectItem>
                        <SelectItem value="Development Fee Only">Development Fee Only</SelectItem>
                        <SelectItem value="Custom">Custom (Specify in Description)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={currentDiscount?.active || false}
                      onCheckedChange={(checked) => setCurrentDiscount({ ...currentDiscount, active: checked })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Applicable Fees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discountTypes.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{discount.name}</div>
                      <div className="text-xs text-muted-foreground">{discount.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{discount.type}</TableCell>
                  <TableCell>{discount.value}</TableCell>
                  <TableCell>{discount.applicableFees}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${discount.id}`}
                        checked={discount.active}
                        onCheckedChange={() => toggleActive(discount.id)}
                      />
                      <Label htmlFor={`active-${discount.id}`} className="text-sm">
                        {discount.active ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleAddEdit(discount)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
