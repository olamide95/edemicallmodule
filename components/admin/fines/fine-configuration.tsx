"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2 } from "lucide-react"

// Mock data for fine types
const mockFineTypes = [
  {
    id: 1,
    name: "Late Payment Fine",
    calculationType: "percentage",
    value: 5,
    applyAfterDays: 5,
    maxAmount: 500,
    isRecurring: true,
    recurringPeriod: "weekly",
  },
  {
    id: 2,
    name: "Library Book Late Return",
    calculationType: "fixed",
    value: 10,
    applyAfterDays: 7,
    maxAmount: 200,
    isRecurring: true,
    recurringPeriod: "daily",
  },
  {
    id: 3,
    name: "Uniform Violation",
    calculationType: "fixed",
    value: 25,
    applyAfterDays: 0,
    maxAmount: 25,
    isRecurring: false,
    recurringPeriod: null,
  },
]

export function FineConfiguration() {
  const [fineTypes, setFineTypes] = useState(mockFineTypes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFine, setCurrentFine] = useState<any>(null)

  const handleAddNew = () => {
    setCurrentFine({
      id: Date.now(),
      name: "",
      calculationType: "fixed",
      value: 0,
      applyAfterDays: 0,
      maxAmount: 0,
      isRecurring: false,
      recurringPeriod: null,
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (fine: any) => {
    setCurrentFine({ ...fine })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setFineTypes(fineTypes.filter((fine) => fine.id !== id))
  }

  const handleSave = () => {
    if (fineTypes.find((fine) => fine.id === currentFine.id)) {
      setFineTypes(fineTypes.map((fine) => (fine.id === currentFine.id ? currentFine : fine)))
    } else {
      setFineTypes([...fineTypes, currentFine])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Fine Types</h3>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Fine Type
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fine Name</TableHead>
            <TableHead>Calculation Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Apply After (Days)</TableHead>
            <TableHead>Max Amount</TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fineTypes.map((fine) => (
            <TableRow key={fine.id}>
              <TableCell className="font-medium">{fine.name}</TableCell>
              <TableCell>{fine.calculationType === "percentage" ? "Percentage" : "Fixed Amount"}</TableCell>
              <TableCell>{fine.calculationType === "percentage" ? `${fine.value}%` : `$${fine.value}`}</TableCell>
              <TableCell>{fine.applyAfterDays}</TableCell>
              <TableCell>${fine.maxAmount}</TableCell>
              <TableCell>{fine.isRecurring ? `Yes (${fine.recurringPeriod})` : "No"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(fine)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(fine.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentFine && fineTypes.find((f) => f.id === currentFine.id) ? "Edit Fine Type" : "Add New Fine Type"}
            </DialogTitle>
            <DialogDescription>Configure the fine type details and calculation method</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Fine Name
              </Label>
              <Input
                id="name"
                value={currentFine?.name || ""}
                onChange={(e) => setCurrentFine({ ...currentFine, name: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calculationType" className="text-right">
                Calculation Type
              </Label>
              <Select
                value={currentFine?.calculationType || "fixed"}
                onValueChange={(value) => setCurrentFine({ ...currentFine, calculationType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                type="number"
                value={currentFine?.value || 0}
                onChange={(e) => setCurrentFine({ ...currentFine, value: Number.parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="applyAfterDays" className="text-right">
                Apply After (Days)
              </Label>
              <Input
                id="applyAfterDays"
                type="number"
                value={currentFine?.applyAfterDays || 0}
                onChange={(e) => setCurrentFine({ ...currentFine, applyAfterDays: Number.parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxAmount" className="text-right">
                Max Amount
              </Label>
              <Input
                id="maxAmount"
                type="number"
                value={currentFine?.maxAmount || 0}
                onChange={(e) => setCurrentFine({ ...currentFine, maxAmount: Number.parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isRecurring" className="text-right">
                Recurring
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isRecurring"
                  checked={currentFine?.isRecurring || false}
                  onCheckedChange={(checked) => setCurrentFine({ ...currentFine, isRecurring: checked })}
                />
                <Label htmlFor="isRecurring">Enable recurring fine</Label>
              </div>
            </div>

            {currentFine?.isRecurring && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recurringPeriod" className="text-right">
                  Recurring Period
                </Label>
                <Select
                  value={currentFine?.recurringPeriod || "daily"}
                  onValueChange={(value) => setCurrentFine({ ...currentFine, recurringPeriod: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select recurring period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
