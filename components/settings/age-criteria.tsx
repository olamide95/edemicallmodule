"use client"
import { SetStateAction, useState } from "react"
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

// Sample data for classes
const classes = [
  { id: 1, name: "Toddlers", minAge: 2, maxAge: 3 },
  { id: 2, name: "Nursery 1", minAge: 3, maxAge: 4 },
  { id: 3, name: "Nursery 2", minAge: 4, maxAge: 5 },
  { id: 4, name: "Grade 1", minAge: 5, maxAge: 6 },
  { id: 5, name: "Grade 2", minAge: 6, maxAge: 7 },
  { id: 6, name: "Grade 3", minAge: 7, maxAge: 8 },
  { id: 7, name: "Grade 4", minAge: 8, maxAge: 9 },
  { id: 8, name: "Grade 5", minAge: 9, maxAge: 10 },
  { id: 9, name: "Grade 6", minAge: 10, maxAge: 11 },
]

export function AgeCriteria() {
  const [ageCriteria, setAgeCriteria] = useState(classes)
  type ClassItem = {
    id: number
    name: string
    minAge: number
    maxAge: number
  }

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null)
  const [minDate, setMinDate] = useState<Date | undefined>(undefined)
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
  const today = new Date()

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
    setSelectedClass(null)
    // In a real app, you would save this to your backend
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

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Age Range for {selectedClass.name}</CardTitle>
            <CardDescription>Set the birth date range for students eligible to join this class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveAgeRange}>Save Age Range</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
