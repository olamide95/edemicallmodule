"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Save } from "lucide-react"

type ClassFee = {
  id: number
  name: string
  fee: number
  currency: string
  active: boolean
  editing: boolean
}

export function FeeConfiguration() {
  const [classes, setClasses] = useState<ClassFee[]>([])
  const [currency, setCurrency] = useState("USD")

  // Load classes from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const data = JSON.parse(savedData)
      
      // Set currency from admission settings if exists
      if (data.admissionSettings?.currency) {
        setCurrency(data.admissionSettings.currency)
      }
      
      // Initialize classes with fees if they exist
      if (data.classes && data.classes.length > 0) {
        const classesWithFees = data.classes.map((cls: any) => ({
          id: cls.id,
          name: cls.name,
          fee: cls.fee || 0,
          currency: data.admissionSettings?.currency || "USD",
          active: cls.active !== false, // Default to true if not set
          editing: false
        }))
        setClasses(classesWithFees)
      }
    }
  }, [])

  const handleEditFee = (id: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, editing: true } : c)))
  }

  const handleSaveFee = (id: number) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, editing: false } : c)))
    
    // Save to local storage
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const data = JSON.parse(savedData)
      const updatedClasses = data.classes.map((cls: any) => {
        const updatedClass = classes.find(c => c.id === cls.id && c.editing === false)
        return updatedClass ? { ...cls, fee: updatedClass.fee, active: updatedClass.active } : cls
      })
      
      localStorage.setItem('onboardingData', JSON.stringify({
        ...data,
        classes: updatedClasses,
        admissionSettings: {
          ...data.admissionSettings,
          currency
        }
      }))
    }
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

  const handleSaveAll = () => {
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const data = JSON.parse(savedData)
      const updatedClasses = data.classes.map((cls: any) => {
        const updatedClass = classes.find(c => c.id === cls.id)
        return updatedClass ? { ...cls, fee: updatedClass.fee, active: updatedClass.active } : cls
      })
      
      localStorage.setItem('onboardingData', JSON.stringify({
        ...data,
        classes: updatedClasses,
        admissionSettings: {
          ...data.admissionSettings,
          currency
        }
      }))
    }
  }

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount)
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
          <Button onClick={handleSaveAll}>Save All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}