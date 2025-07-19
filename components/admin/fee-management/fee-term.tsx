"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CalendarIcon, Copy, Edit, Eye, MoreHorizontal, Plus, Trash } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for fines
const mockFines = [
  { id: 1, name: "Late Payment Fine - 5%", rate: 5, type: "percentage" },
  { id: 2, name: "Late Payment Fine - 10%", rate: 10, type: "percentage" },
  { id: 3, name: "Late Payment Fine - Fixed", rate: 1000, type: "fixed" },
  { id: 4, name: "Overdue Fine - Daily", rate: 100, type: "daily" },
]

// Mock data for fee terms
const mockFeeTerms = [
  {
    id: 1,
    name: "2023-24 Academic Year",
    description: "Academic year 2023-24",
    startDate: new Date(2023, 5, 1), // June 1, 2023
    endDate: new Date(2024, 4, 31), // May 31, 2024
    numberOfTerms: 3,
    terms: [
      {
        id: 1,
        name: "Term 1",
        startDate: new Date(2023, 5, 1), // June 1, 2023
        endDate: new Date(2023, 8, 30), // September 30, 2023
        dueDate: new Date(2023, 5, 15), // June 15, 2023
        publishDate: new Date(2023, 4, 15), // May 15, 2023
        fineId: 1,
        allowFineWaiver: true,
        isActive: true,
      },
      {
        id: 2,
        name: "Term 2",
        startDate: new Date(2023, 9, 1), // October 1, 2023
        endDate: new Date(2023, 11, 31), // December 31, 2023
        dueDate: new Date(2023, 9, 15), // October 15, 2023
        publishDate: new Date(2023, 8, 15), // September 15, 2023
        fineId: 1,
        allowFineWaiver: true,
        isActive: true,
      },
      {
        id: 3,
        name: "Term 3",
        startDate: new Date(2024, 0, 1), // January 1, 2024
        endDate: new Date(2024, 4, 31), // May 31, 2024
        dueDate: new Date(2024, 0, 15), // January 15, 2024
        publishDate: new Date(2023, 11, 15), // December 15, 2023
        fineId: 1,
        allowFineWaiver: true,
        isActive: true,
      },
    ],
    isActive: true,
  },
  {
    id: 2,
    name: "2022-23 Academic Year",
    description: "Academic year 2022-23",
    startDate: new Date(2022, 5, 1), // June 1, 2022
    endDate: new Date(2023, 4, 31), // May 31, 2023
    numberOfTerms: 3,
    terms: [
      {
        id: 1,
        name: "Term 1",
        startDate: new Date(2022, 5, 1), // June 1, 2022
        endDate: new Date(2022, 8, 30), // September 30, 2022
        dueDate: new Date(2022, 5, 15), // June 15, 2022
        publishDate: new Date(2022, 4, 15), // May 15, 2022
        fineId: 2,
        allowFineWaiver: false,
        isActive: false,
      },
      {
        id: 2,
        name: "Term 2",
        startDate: new Date(2022, 9, 1), // October 1, 2022
        endDate: new Date(2022, 11, 31), // December 31, 2022
        dueDate: new Date(2022, 9, 15), // October 15, 2022
        publishDate: new Date(2022, 8, 15), // September 15, 2022
        fineId: 2,
        allowFineWaiver: false,
        isActive: false,
      },
      {
        id: 3,
        name: "Term 3",
        startDate: new Date(2023, 0, 1), // January 1, 2023
        endDate: new Date(2023, 4, 31), // May 31, 2023
        dueDate: new Date(2023, 0, 15), // January 15, 2023
        publishDate: new Date(2022, 11, 15), // December 15, 2022
        fineId: 2,
        allowFineWaiver: false,
        isActive: false,
      },
    ],
    isActive: false,
  },
]

export function FeeTerm() {
  const [feeTerms, setFeeTerms] = useState(mockFeeTerms)
  const [showAddForm, setShowAddForm] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState<any>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [cloneSource, setCloneSource] = useState<any>(null)
  const [clonePreview, setClonePreview] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState("all")

  // New term state
  const [newTerm, setNewTerm] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    numberOfTerms: 3,
    isActive: true,
    terms: [] as any[],
  })

  // Clone term state
  const [cloneTerm, setCloneTerm] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    adjustDates: true,
    preserveFines: true,
    isActive: true,
  })

  // Memoize filtered fee terms
  const filteredFeeTerms = useMemo(() => {
    if (selectedTab === "all") return feeTerms
    return feeTerms.filter((feeTerm) => (selectedTab === "active" ? feeTerm.isActive : !feeTerm.isActive))
  }, [feeTerms, selectedTab])

  // Generate term installments based on number of terms
  useEffect(() => {
    if (newTerm.numberOfTerms > 0 && newTerm.startDate && newTerm.endDate) {
      const totalDays = Math.floor((newTerm.endDate.getTime() - newTerm.startDate.getTime()) / (1000 * 60 * 60 * 24))
      const daysPerTerm = Math.floor(totalDays / newTerm.numberOfTerms)

      const terms = []
      for (let i = 0; i < newTerm.numberOfTerms; i++) {
        const termStartDate = new Date(newTerm.startDate)
        termStartDate.setDate(termStartDate.getDate() + i * daysPerTerm)

        const termEndDate = new Date(termStartDate)
        if (i === newTerm.numberOfTerms - 1) {
          // Last term ends on the academic year end date
          termEndDate.setTime(newTerm.endDate.getTime())
        } else {
          termEndDate.setDate(termStartDate.getDate() + daysPerTerm - 1)
        }

        const dueDate = new Date(termStartDate)
        dueDate.setDate(dueDate.getDate() + 14) // Due date is 2 weeks after start

        const publishDate = new Date(termStartDate)
        publishDate.setDate(publishDate.getDate() - 14) // Publish 2 weeks before start

        terms.push({
          id: i + 1,
          name: `Term ${i + 1}`,
          startDate: termStartDate,
          endDate: termEndDate,
          dueDate: dueDate,
          publishDate: publishDate,
          fineId: null,
          allowFineWaiver: false,
          isActive: true,
        })
      }

      setNewTerm((prev) => ({ ...prev, terms }))
    }
  }, [newTerm.numberOfTerms, newTerm.startDate, newTerm.endDate])

  // Generate clone preview
  useEffect(() => {
    if (cloneSource && cloneTerm.startDate && cloneTerm.endDate && cloneTerm.adjustDates) {
      const sourceStartDate = new Date(cloneSource.startDate)
      const sourceEndDate = new Date(cloneSource.endDate)
      const sourceDuration = differenceInDays(sourceEndDate, sourceStartDate)

      const targetStartDate = new Date(cloneTerm.startDate)
      const targetEndDate = new Date(cloneTerm.endDate)
      const targetDuration = differenceInDays(targetEndDate, targetStartDate)

      const scaleFactor = targetDuration / sourceDuration

      const previewTerms = cloneSource.terms.map((term: any, index: number) => {
        // Calculate relative position in the source academic year (0 to 1)
        const termStartRelativePos = differenceInDays(term.startDate, sourceStartDate) / sourceDuration
        const termEndRelativePos = differenceInDays(term.endDate, sourceStartDate) / sourceDuration
        const termDueRelativePos = differenceInDays(term.dueDate, sourceStartDate) / sourceDuration
        const termPublishRelativePos = differenceInDays(term.publishDate, sourceStartDate) / sourceDuration

        // Apply that relative position to the target academic year
        const newStartDate = addDays(targetStartDate, Math.round(termStartRelativePos * targetDuration))
        const newEndDate = addDays(targetStartDate, Math.round(termEndRelativePos * targetDuration))
        const newDueDate = addDays(targetStartDate, Math.round(termDueRelativePos * targetDuration))
        const newPublishDate = addDays(targetStartDate, Math.round(termPublishRelativePos * targetDuration))

        return {
          ...term,
          startDate: newStartDate,
          endDate: newEndDate,
          dueDate: newDueDate,
          publishDate: newPublishDate,
          fineId: cloneTerm.preserveFines ? term.fineId : null,
          isActive: true,
        }
      })

      setClonePreview({
        ...cloneSource,
        name: cloneTerm.name,
        description: cloneTerm.description,
        startDate: targetStartDate,
        endDate: targetEndDate,
        isActive: cloneTerm.isActive,
        terms: previewTerms,
      })
    }
  }, [cloneSource, cloneTerm])

  const handleAddFeeTerm = useCallback(() => {
    const newFeeTerm = {
      ...newTerm,
      id: feeTerms.length + 1,
    }

    setFeeTerms([...feeTerms, newFeeTerm])
    setNewTerm({
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      numberOfTerms: 3,
      isActive: true,
      terms: [],
    })
    setShowAddForm(false)
  }, [feeTerms, newTerm])

  const handleDeleteFeeTerm = useCallback(
    (id: number) => {
      setFeeTerms(feeTerms.filter((feeTerm) => feeTerm.id !== id))
    },
    [feeTerms],
  )

  const handleViewTermDetails = useCallback((feeTerm: any) => {
    setSelectedTerm(feeTerm)
    setIsViewDialogOpen(true)
  }, [])

  const startEdit = useCallback((feeTerm: any) => {
    setSelectedTerm({ ...feeTerm })
    setEditingId(feeTerm.id)
    setIsEditDialogOpen(true)
  }, [])

  const startClone = useCallback((feeTerm: any) => {
    const nextYear = new Date(feeTerm.startDate)
    nextYear.setFullYear(nextYear.getFullYear() + 1)

    const nextYearEnd = new Date(feeTerm.endDate)
    nextYearEnd.setFullYear(nextYearEnd.getFullYear() + 1)

    // Extract the academic year from the name (e.g., "2023-24" from "2023-24 Academic Year")
    const currentYearMatch = feeTerm.name.match(/(\d{4})-(\d{2})/)
    let newName = feeTerm.name

    if (currentYearMatch && currentYearMatch.length >= 3) {
      const currentStartYear = Number.parseInt(currentYearMatch[1])
      const currentEndYear = Number.parseInt(currentYearMatch[2])
      const newStartYear = currentStartYear + 1
      const newEndYear = currentEndYear + 1
      newName = feeTerm.name.replace(`${currentStartYear}-${currentEndYear}`, `${newStartYear}-${newEndYear}`)
    }

    setCloneSource(feeTerm)
    setCloneTerm({
      name: newName,
      description: `${feeTerm.description} (Cloned)`,
      startDate: nextYear,
      endDate: nextYearEnd,
      adjustDates: true,
      preserveFines: true,
      isActive: true,
    })
    setIsCloneDialogOpen(true)
  }, [])

  const handleEditFeeTerm = useCallback(() => {
    if (editingId !== null && selectedTerm !== null) {
      setFeeTerms(feeTerms.map((feeTerm) => (feeTerm.id === editingId ? { ...selectedTerm, id: editingId } : feeTerm)))
      setSelectedTerm(null)
      setEditingId(null)
      setIsEditDialogOpen(false)
    }
  }, [editingId, selectedTerm, feeTerms])

  const handleCloneFeeTerm = useCallback(() => {
    if (clonePreview) {
      const newFeeTerm = {
        ...clonePreview,
        id: feeTerms.length + 1,
      }

      setFeeTerms([...feeTerms, newFeeTerm])
      setCloneSource(null)
      setClonePreview(null)
      setCloneTerm({
        name: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        adjustDates: true,
        preserveFines: true,
        isActive: true,
      })
      setIsCloneDialogOpen(false)
    }
  }, [clonePreview, feeTerms])

  const updateTermDetail = (termIndex: number, field: string, value: any) => {
    setNewTerm((prev) => {
      const updatedTerms = [...prev.terms]
      updatedTerms[termIndex] = {
        ...updatedTerms[termIndex],
        [field]: value,
      }
      return { ...prev, terms: updatedTerms }
    })
  }

  const updateEditingTermDetail = (termIndex: number, field: string, value: any) => {
    if (selectedTerm) {
      const updatedTerms = [...selectedTerm.terms]
      updatedTerms[termIndex] = {
        ...updatedTerms[termIndex],
        [field]: value,
      }
      setSelectedTerm({ ...selectedTerm, terms: updatedTerms })
    }
  }

  const getFineNameById = (fineId: number | null) => {
    if (!fineId) return "None"
    const fine = mockFines.find((f) => f.id === fineId)
    return fine ? fine.name : "Unknown Fine"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Fee Terms</CardTitle>
          <CardDescription>Manage academic terms and their fee due dates</CardDescription>
        </div>
        <Button className="ml-auto" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Academic Year"}
        </Button>
      </CardHeader>
      <CardContent>
        {showAddForm ? (
          <Card className="border-dashed border-2 border-[#8C57FF]/30">
            <CardHeader>
              <CardTitle className="text-lg">Add New Academic Year</CardTitle>
              <CardDescription>Define the academic year and its terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center">
                      Term Name <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={newTerm.name}
                      onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
                      placeholder="e.g., 2023-24 Academic Year"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTerm.description}
                      onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })}
                      placeholder="Brief description of the academic year"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Academic Year Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newTerm.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTerm.startDate ? format(newTerm.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTerm.startDate}
                          onSelect={(date) => date && setNewTerm({ ...newTerm, startDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Academic Year End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newTerm.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTerm.endDate ? format(newTerm.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTerm.endDate}
                          onSelect={(date) => date && setNewTerm({ ...newTerm, endDate: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="numberOfTerms" className="flex items-center">
                      No of installments in term <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="numberOfTerms"
                      type="number"
                      min={1}
                      max={12}
                      value={newTerm.numberOfTerms}
                      onChange={(e) => setNewTerm({ ...newTerm, numberOfTerms: Number.parseInt(e.target.value) || 3 })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newTerm.isActive}
                    onCheckedChange={(checked) => setNewTerm({ ...newTerm, isActive: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>

                {newTerm.terms.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Term Installments</h3>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Fee term start date</TableHead>
                            <TableHead>Fee term end date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Publish Date</TableHead>
                            <TableHead>Fine</TableHead>
                            <TableHead>Fine waive off allowed</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {newTerm.terms.map((term, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={term.name}
                                  onChange={(e) => updateTermDetail(index, "name", e.target.value)}
                                  className="w-full"
                                />
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !term.startDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {term.startDate ? format(term.startDate, "PP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={term.startDate}
                                      onSelect={(date) => date && updateTermDetail(index, "startDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !term.endDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {term.endDate ? format(term.endDate, "PP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={term.endDate}
                                      onSelect={(date) => date && updateTermDetail(index, "endDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !term.dueDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {term.dueDate ? format(term.dueDate, "PP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={term.dueDate}
                                      onSelect={(date) => date && updateTermDetail(index, "dueDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !term.publishDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {term.publishDate ? format(term.publishDate, "PP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={term.publishDate}
                                      onSelect={(date) => date && updateTermDetail(index, "publishDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={term.fineId?.toString() || ""}
                                  onValueChange={(value) =>
                                    updateTermDetail(index, "fineId", value ? Number.parseInt(value) : null)
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Nothing selected" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {mockFines.map((fine) => (
                                      <SelectItem key={fine.id} value={fine.id.toString()}>
                                        {fine.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={term.allowFineWaiver}
                                  onCheckedChange={(checked) => updateTermDetail(index, "allowFineWaiver", checked)}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => {
                                    const updatedTerms = newTerm.terms.filter((_, i) => i !== index)
                                    setNewTerm({ ...newTerm, terms: updatedTerms, numberOfTerms: updatedTerms.length })
                                  }}
                                  disabled={newTerm.terms.length <= 1}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFeeTerm} disabled={!newTerm.name || newTerm.terms.length === 0}>
                Create Fee Term
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Terms</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Number of Terms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeeTerms.map((feeTerm) => (
                      <TableRow key={feeTerm.id}>
                        <TableCell className="font-medium">{feeTerm.name}</TableCell>
                        <TableCell>{feeTerm.description}</TableCell>
                        <TableCell>{format(feeTerm.startDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(feeTerm.endDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{feeTerm.terms.length}</TableCell>
                        <TableCell>
                          {feeTerm.isActive ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewTermDetails(feeTerm)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => startEdit(feeTerm)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => startClone(feeTerm)}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Clone
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteFeeTerm(feeTerm.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Number of Terms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeeTerms
                      .filter((feeTerm) => feeTerm.isActive)
                      .map((feeTerm) => (
                        <TableRow key={feeTerm.id}>
                          <TableCell className="font-medium">{feeTerm.name}</TableCell>
                          <TableCell>{feeTerm.description}</TableCell>
                          <TableCell>{format(feeTerm.startDate, "MMM d, yyyy")}</TableCell>
                          <TableCell>{format(feeTerm.endDate, "MMM d, yyyy")}</TableCell>
                          <TableCell>{feeTerm.terms.length}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewTermDetails(feeTerm)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => startEdit(feeTerm)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => startClone(feeTerm)}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Clone
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteFeeTerm(feeTerm.id)}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="inactive">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Number of Terms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeeTerms
                      .filter((feeTerm) => !feeTerm.isActive)
                      .map((feeTerm) => (
                        <TableRow key={feeTerm.id}>
                          <TableCell className="font-medium">{feeTerm.name}</TableCell>
                          <TableCell>{feeTerm.description}</TableCell>
                          <TableCell>{format(feeTerm.startDate, "MMM d, yyyy")}</TableCell>
                          <TableCell>{format(feeTerm.endDate, "MMM d, yyyy")}</TableCell>
                          <TableCell>{feeTerm.terms.length}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Inactive
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewTermDetails(feeTerm)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => startEdit(feeTerm)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => startClone(feeTerm)}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Clone
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteFeeTerm(feeTerm.id)}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      {/* View Term Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Academic Year Details - {selectedTerm?.name}</DialogTitle>
            <DialogDescription>View all terms in this academic year</DialogDescription>
          </DialogHeader>
          {selectedTerm && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Academic Year Details</h3>
                  <p className="font-medium">{selectedTerm.description}</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{format(selectedTerm.startDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{format(selectedTerm.endDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Number of Terms:</span>
                      <span>{selectedTerm.terms.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{selectedTerm.isActive ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Term Name</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Publish Date</TableHead>
                      <TableHead>Fine</TableHead>
                      <TableHead>Fine Waiver</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTerm.terms.map((term: any) => (
                      <TableRow key={term.id}>
                        <TableCell className="font-medium">{term.name}</TableCell>
                        <TableCell>{format(term.startDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(term.endDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(term.dueDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(term.publishDate, "MMM d, yyyy")}</TableCell>
                        <TableCell>{getFineNameById(term.fineId)}</TableCell>
                        <TableCell>{term.allowFineWaiver ? "Allowed" : "Not Allowed"}</TableCell>
                        <TableCell>
                          {term.isActive ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Academic Year</DialogTitle>
            <DialogDescription>Modify the details of this academic year and its terms</DialogDescription>
          </DialogHeader>
          {selectedTerm && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Term Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedTerm.name}
                    onChange={(e) => setSelectedTerm({ ...selectedTerm, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    value={selectedTerm.description}
                    onChange={(e) => setSelectedTerm({ ...selectedTerm, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Academic Year Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedTerm.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedTerm.startDate ? format(selectedTerm.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedTerm.startDate}
                        onSelect={(date) => date && setSelectedTerm({ ...selectedTerm, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">Academic Year End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedTerm.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedTerm.endDate ? format(selectedTerm.endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedTerm.endDate}
                        onSelect={(date) => date && setSelectedTerm({ ...selectedTerm, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center space-x-2 self-end">
                  <Switch
                    id="edit-active"
                    checked={selectedTerm.isActive}
                    onCheckedChange={(checked) => setSelectedTerm({ ...selectedTerm, isActive: checked })}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Term Installments</h3>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Fee term start date</TableHead>
                        <TableHead>Fee term end date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Publish Date</TableHead>
                        <TableHead>Fine</TableHead>
                        <TableHead>Fine waive off allowed</TableHead>
                        <TableHead>Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTerm.terms.map((term: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={term.name}
                              onChange={(e) => updateEditingTermDetail(index, "name", e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !term.startDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {term.startDate ? format(term.startDate, "PP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={term.startDate}
                                  onSelect={(date) => date && updateEditingTermDetail(index, "startDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !term.endDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {term.endDate ? format(term.endDate, "PP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={term.endDate}
                                  onSelect={(date) => date && updateEditingTermDetail(index, "endDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !term.dueDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {term.dueDate ? format(term.dueDate, "PP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={term.dueDate}
                                  onSelect={(date) => date && updateEditingTermDetail(index, "dueDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !term.publishDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {term.publishDate ? format(term.publishDate, "PP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={term.publishDate}
                                  onSelect={(date) => date && updateEditingTermDetail(index, "publishDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={term.fineId?.toString() || ""}
                              onValueChange={(value) =>
                                updateEditingTermDetail(index, "fineId", value ? Number.parseInt(value) : null)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Nothing selected" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {mockFines.map((fine) => (
                                  <SelectItem key={fine.id} value={fine.id.toString()}>
                                    {fine.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={term.allowFineWaiver}
                              onCheckedChange={(checked) => updateEditingTermDetail(index, "allowFineWaiver", checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={term.isActive}
                              onCheckedChange={(checked) => updateEditingTermDetail(index, "isActive", checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFeeTerm}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clone Dialog */}
      <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Clone Academic Year</DialogTitle>
            <DialogDescription>Create a new academic year based on {cloneSource?.name}</DialogDescription>
          </DialogHeader>
          {cloneSource && (
            <div className="grid gap-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Clone Academic Year</AlertTitle>
                <AlertDescription>
                  This will create a new academic year with the same structure as the selected one, but with updated
                  dates.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="clone-name" className="flex items-center">
                    New Academic Year Name <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="clone-name"
                    value={cloneTerm.name}
                    onChange={(e) => setCloneTerm({ ...cloneTerm, name: e.target.value })}
                    placeholder="e.g., 2024-25 Academic Year"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clone-description">Description</Label>
                  <Input
                    id="clone-description"
                    value={cloneTerm.description}
                    onChange={(e) => setCloneTerm({ ...cloneTerm, description: e.target.value })}
                    placeholder="Brief description of the academic year"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="clone-startDate">New Academic Year Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !cloneTerm.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {cloneTerm.startDate ? format(cloneTerm.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={cloneTerm.startDate}
                        onSelect={(date) => date && setCloneTerm({ ...cloneTerm, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clone-endDate">New Academic Year End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !cloneTerm.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {cloneTerm.endDate ? format(cloneTerm.endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={cloneTerm.endDate}
                        onSelect={(date) => date && setCloneTerm({ ...cloneTerm, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adjust-dates"
                    checked={cloneTerm.adjustDates}
                    onCheckedChange={(checked) => setCloneTerm({ ...cloneTerm, adjustDates: checked === true })}
                  />
                  <Label htmlFor="adjust-dates">
                    Adjust term dates proportionally to fit new academic year timeframe
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserve-fines"
                    checked={cloneTerm.preserveFines}
                    onCheckedChange={(checked) => setCloneTerm({ ...cloneTerm, preserveFines: checked === true })}
                  />
                  <Label htmlFor="preserve-fines">Preserve fine settings from original terms</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="clone-active"
                    checked={cloneTerm.isActive}
                    onCheckedChange={(checked) => setCloneTerm({ ...cloneTerm, isActive: checked })}
                  />
                  <Label htmlFor="clone-active">Set as active</Label>
                </div>
              </div>

              {clonePreview && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Preview of Cloned Terms</h3>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Term Name</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Publish Date</TableHead>
                          <TableHead>Fine</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clonePreview.terms.map((term: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{term.name}</TableCell>
                            <TableCell>{format(term.startDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.endDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.dueDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.publishDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{getFineNameById(term.fineId)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCloneDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCloneFeeTerm} disabled={!cloneTerm.name || !clonePreview}>
              Clone Academic Year
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
