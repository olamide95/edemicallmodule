"use client"
import { SetStateAction, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Save } from "lucide-react"

// Sample data for classes
const initialClasses = [
  { id: 1, name: "Toddlers", fee: 500, currency: "USD", active: true, editing: false },
  { id: 2, name: "Nursery 1", fee: 600, currency: "USD", active: true, editing: false },
  { id: 3, name: "Nursery 2", fee: 700, currency: "USD", active: true, editing: false },
  { id: 4, name: "Grade 1", fee: 800, currency: "USD", active: true, editing: false },
  { id: 5, name: "Grade 2", fee: 900, currency: "USD", active: true, editing: false },
  { id: 6, name: "Grade 3", fee: 1000, currency: "USD", active: true, editing: false },
  { id: 7, name: "Grade 4", fee: 1100, currency: "USD", active: true, editing: false },
  { id: 8, name: "Grade 5", fee: 1200, currency: "USD", active: true, editing: false },
  { id: 9, name: "Grade 6", fee: 1300, currency: "USD", active: true, editing: false },
]

export function FeeConfiguration() {
  const [classes, setClasses] = useState(initialClasses)
  const [currency, setCurrency] = useState("USD")

  const handleEditFee = (id: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, editing: true } : c)))
  }

  const handleSaveFee = (id: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, editing: false } : c)))
  }

  const handleFeeChange = (id: number, value: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, fee: value } : c)))
  }

  const handleToggleActive = (id: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
  }

  const handleChangeCurrency = (value: string) => {
    setCurrency(value)
    setClasses(classes.map((c) => ({ ...c, currency: value })))
  }

  const formatCurrency = (amount: string | number | bigint, currencyCode: string) => {
    const numericAmount = typeof amount === "string" ? Number(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(numericAmount)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fee Configuration</CardTitle>
          <CardDescription>Set the admission fees for each class.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={handleChangeCurrency}>
                <SelectTrigger id="currency" className="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                  <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">Bulk Update</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Admission Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">{classItem.name}</TableCell>
                    <TableCell>
                      {classItem.editing ? (
                        <Input
                          type="number"
                          value={classItem.fee}
                          onChange={(e) => handleFeeChange(classItem.id, Number(e.target.value))}
                          className="w-32"
                        />
                      ) : (
                        <Badge variant="outline" className="font-mono">
                          {formatCurrency(classItem.fee, classItem.currency)}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={classItem.active} onCheckedChange={() => handleToggleActive(classItem.id)} />
                        <span className={classItem.active ? "text-success" : "text-muted-foreground"}>
                          {classItem.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {classItem.editing ? (
                        <Button variant="ghost" size="sm" onClick={() => handleSaveFee(classItem.id)}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => handleEditFee(classItem.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
