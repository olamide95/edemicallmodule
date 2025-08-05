"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, subYears } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ClassItem = {
  id: number
  name: string
  minAge: number
  maxAge: number
}

export function AgeCriteria() {
  const [ageCriteria, setAgeCriteria] = useState<ClassItem[]>([])
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null)
  const [minDate, setMinDate] = useState<Date | undefined>(undefined)
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
  const today = new Date()

  // Load classes from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const data = JSON.parse(savedData)
      if (data.classes && data.classes.length > 0) {
        // Initialize with default age ranges if not set
        const classesWithAge = data.classes.map((cls: any, index: number) => ({
          id: cls.id || index + 1,
          name: cls.name || `Class ${index + 1}`,
          minAge: cls.minAge || index + 5, // Default min age
          maxAge: cls.maxAge || index + 6, // Default max age
        }))
        setAgeCriteria(classesWithAge)
        
        // Save back to local storage if we added default values
        if (!data.classes[0].minAge) {
          const updatedData = {
            ...data,
            classes: classesWithAge
          }
          localStorage.setItem('onboardingData', JSON.stringify(updatedData))
        }
      }
    }
  }, [])

  const handleEditClass = (classItem: ClassItem) => {
    setSelectedClass(classItem)
    // Calculate dates based on age ranges
    if (classItem) {
      setMinDate(subYears(today, classItem.maxAge))
      setMaxDate(subYears(today, classItem.minAge))
    }
  }

  const handleSaveAgeRange = () => {
    if (!selectedClass || !minDate || !maxDate) return

    // Calculate new age ranges based on selected dates
    const minAge = Math.floor((today.getTime() - maxDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
    const maxAge = Math.floor((today.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24 * 365))

    const updatedCriteria = ageCriteria.map((c) => (c.id === selectedClass.id ? { ...c, minAge, maxAge } : c))

    setAgeCriteria(updatedCriteria)
    
    // Update local storage
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      const data = JSON.parse(savedData)
      const updatedClasses = data.classes.map((cls: any) => {
        const updatedClass = updatedCriteria.find(uc => uc.id === cls.id)
        return updatedClass ? { ...cls, minAge: updatedClass.minAge, maxAge: updatedClass.maxAge } : cls
      })
      
      localStorage.setItem('onboardingData', JSON.stringify({
        ...data,
        classes: updatedClasses
      }))
    }

    setSelectedClass(null)
  }

  const handleCancelEdit = () => {
    setSelectedClass(null)
    setMinDate(undefined)
    setMaxDate(undefined)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Age Criteria</CardTitle>
          <CardDescription>Define the age range requirements for each class.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Minimum Age</TableHead>
                  <TableHead>Maximum Age</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ageCriteria.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">{classItem.name}</TableCell>
                    <TableCell>{classItem.minAge} years</TableCell>
                    <TableCell>{classItem.maxAge} years</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {format(subYears(today, classItem.maxAge), "dd/MM/yyyy")} -{" "}
                        {format(subYears(today, classItem.minAge), "dd/MM/yyyy")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClass(classItem)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedClass} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedClass && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Age Range for {selectedClass.name}</DialogTitle>
                <DialogDescription>
                  Set the birth date range for students eligible to join this class.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Students with birth dates within this range will be eligible for this class.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-sm text-muted-foreground">
                    Current age range: {selectedClass.minAge} to {selectedClass.maxAge} years old
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Minimum Birth Date (Oldest Eligible Student)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !minDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {minDate ? format(minDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={minDate}
                          onSelect={(date) => setMinDate(date)}
                          initialFocus
                          defaultMonth={subYears(today, selectedClass.maxAge)}
                          disabled={(date) => (maxDate ? date > maxDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">Students born on or after this date are eligible</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Birth Date (Youngest Eligible Student)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !maxDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {maxDate ? format(maxDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={maxDate}
                          onSelect={(date) => setMaxDate(date)}
                          initialFocus
                          defaultMonth={subYears(today, selectedClass.minAge)}
                          disabled={(date) => (minDate ? date < minDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">Students born on or before this date are eligible</p>
                  </div>
                </div>

                {minDate && maxDate && (
                  <div className="rounded-md bg-muted p-4">
                    <p className="font-medium">Preview:</p>
                    <p className="mt-2">
                      Students born between <span className="font-bold">{format(minDate, "MMMM d, yyyy")}</span> and{" "}
                      <span className="font-bold">{format(maxDate, "MMMM d, yyyy")}</span> will be eligible for{" "}
                      {selectedClass.name}.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This corresponds to an age range of approximately{" "}
                      {Math.floor((today.getTime() - maxDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} to{" "}
                      {Math.floor((today.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} years old at the
                      current date.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAgeRange}>Save Age Range</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}