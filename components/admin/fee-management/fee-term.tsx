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
import { format, addDays, differenceInDays, addYears } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

// Types
type Fine = {
  id: number
  name: string
  rate: number
  type: "percentage" | "fixed" | "daily"
}

type Term = {
  id: number
  name: string
  startDate: Date
  endDate: Date
  dueDate: Date
  publishDate: Date
  fineId: number | null
  allowFineWaiver: boolean
  isActive: boolean
}

type FeeTerm = {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  numberOfTerms: number
  terms: Term[]
  isActive: boolean
}

// LocalStorage keys
const STORAGE_KEYS = {
  FEE_TERMS: "feeTerms",
  FINES: "fines"
}

// Default data for fines
const defaultFines: Fine[] = [
  { id: 1, name: "Late Payment Fine - 5%", rate: 5, type: "percentage" },
  { id: 2, name: "Late Payment Fine - 10%", rate: 10, type: "percentage" },
  { id: 3, name: "Late Payment Fine - Fixed", rate: 1000, type: "fixed" },
  { id: 4, name: "Overdue Fine - Daily", rate: 100, type: "daily" },
]

// Default data for fee terms
const defaultFeeTerms: FeeTerm[] = []

export function FeeTerm() {
  // Load data from localStorage or use defaults
  const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  }

  // Initialize state with localStorage data
  const [fines, setFines] = useState<Fine[]>(() => loadFromLocalStorage(STORAGE_KEYS.FINES, defaultFines))
  const [feeTerms, setFeeTerms] = useState<FeeTerm[]>(() => {
    const loaded = loadFromLocalStorage(STORAGE_KEYS.FEE_TERMS, defaultFeeTerms)
    // Convert string dates back to Date objects
    return loaded.map(term => ({
      ...term,
      startDate: new Date(term.startDate),
      endDate: new Date(term.endDate),
      terms: term.terms.map(t => ({
        ...t,
        startDate: new Date(t.startDate),
        endDate: new Date(t.endDate),
        dueDate: new Date(t.dueDate),
        publishDate: new Date(t.publishDate)
      }))
    }))
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEE_TERMS, JSON.stringify(feeTerms))
  }, [feeTerms])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FINES, JSON.stringify(fines))
  }, [fines])

  const [showAddForm, setShowAddForm] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState<FeeTerm | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [cloneSource, setCloneSource] = useState<FeeTerm | null>(null)
  const [clonePreview, setClonePreview] = useState<FeeTerm | null>(null)
  const [selectedTab, setSelectedTab] = useState("all")

  // New term state
  const [newTerm, setNewTerm] = useState<Omit<FeeTerm, 'id'>>({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 365), // Exactly 365 days from start
    numberOfTerms: 3,
    isActive: true,
    terms: [],
  })

  // Clone term state
  const [cloneTerm, setCloneTerm] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 365), // Exactly 365 days from start
    adjustDates: true,
    preserveFines: true,
    isActive: true,
  })

  // Update end date when start date changes to maintain 365-day duration
  useEffect(() => {
    setNewTerm(prev => ({
      ...prev,
      endDate: addDays(prev.startDate, 365)
    }))
  }, [newTerm.startDate])

  // Update clone end date when clone start date changes to maintain 365-day duration
  useEffect(() => {
    setCloneTerm(prev => ({
      ...prev,
      endDate: addDays(prev.startDate, 365)
    }))
  }, [cloneTerm.startDate])

  // Generate term installments based on number of terms
  useEffect(() => {
    if (newTerm.numberOfTerms > 0 && newTerm.startDate && newTerm.endDate) {
      const totalDays = differenceInDays(newTerm.endDate, newTerm.startDate)
      const daysPerTerm = Math.floor(totalDays / newTerm.numberOfTerms)

      const terms: Term[] = []
      for (let i = 0; i < newTerm.numberOfTerms; i++) {
        const termStartDate = addDays(newTerm.startDate, i * daysPerTerm)
        const termEndDate = i === newTerm.numberOfTerms - 1 
          ? newTerm.endDate 
          : addDays(termStartDate, daysPerTerm - 1)

        const dueDate = addDays(termStartDate, 14) // Due date is 2 weeks after start
        const publishDate = addDays(termStartDate, -14) // Publish 2 weeks before start

        terms.push({
          id: i + 1,
          name: `Term ${i + 1}`,
          startDate: termStartDate,
          endDate: termEndDate,
          dueDate,
          publishDate,
          fineId: null,
          allowFineWaiver: false,
          isActive: true,
        })
      }

      setNewTerm(prev => ({ ...prev, terms }))
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

      const previewTerms = cloneSource.terms.map((term, index) => {
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
    const newFeeTerm: FeeTerm = {
      ...newTerm,
      id: Math.max(...feeTerms.map(term => term.id), 0) + 1,
    }

    setFeeTerms([...feeTerms, newFeeTerm])
    setNewTerm({
      name: "",
      description: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 365),
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

  const handleViewTermDetails = useCallback((feeTerm: FeeTerm) => {
    setSelectedTerm(feeTerm)
    setIsViewDialogOpen(true)
  }, [])

  const startEdit = useCallback((feeTerm: FeeTerm) => {
    setSelectedTerm({ ...feeTerm })
    setEditingId(feeTerm.id)
    setIsEditDialogOpen(true)
  }, [])

  const startClone = useCallback((feeTerm: FeeTerm) => {
    const nextYear = addYears(feeTerm.startDate, 1)
    const nextYearEnd = addYears(feeTerm.endDate, 1)

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
      const newFeeTerm: FeeTerm = {
        ...clonePreview,
        id: Math.max(...feeTerms.map(term => term.id), 0) + 1,
      }

      setFeeTerms([...feeTerms, newFeeTerm])
      setCloneSource(null)
      setClonePreview(null)
      setCloneTerm({
        name: "",
        description: "",
        startDate: new Date(),
        endDate: addDays(new Date(), 365),
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
    const fine = fines.find((f) => f.id === fineId)
    return fine ? fine.name : "Unknown Fine"
  }

  // Memoize filtered fee terms
  const filteredFeeTerms = useMemo(() => {
    if (selectedTab === "all") return feeTerms
    return feeTerms.filter((feeTerm) => (selectedTab === "active" ? feeTerm.isActive : !feeTerm.isActive))
  }, [feeTerms, selectedTab])

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
                                    {fines.map((fine) => (
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
                <div className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Term Installments</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
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
                        {selectedTerm.terms.map((term, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{term.name}</TableCell>
                            <TableCell>{format(term.startDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.endDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.dueDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{format(term.publishDate, "MMM d, yyyy")}</TableCell>
                            <TableCell>{getFineNameById(term.fineId)}</TableCell>
                            <TableCell>
                              {term.allowFineWaiver ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Allowed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  Not Allowed
                                </Badge>
                              )}
                            </TableCell>
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
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Term Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Academic Year - {selectedTerm?.name}</DialogTitle>
            <DialogDescription>Make changes to this academic year and its terms</DialogDescription>
          </DialogHeader>
          {selectedTerm && (
            <div className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={selectedTerm.isActive}
                  onCheckedChange={(checked) => setSelectedTerm({ ...selectedTerm, isActive: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
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
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTerm.terms.map((term, index) => (
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
                                {fines.map((fine) => (
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
                              onCheckedChange={(checked) =>
                                updateEditingTermDetail(index, "allowFineWaiver", checked)
                              }
                            />
                          </TableCell>
                          <TableCell>
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

      {/* Clone Term Dialog */}
      <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Clone Academic Year</DialogTitle>
            <DialogDescription>
              Create a new academic year based on "{cloneSource?.name}"
            </DialogDescription>
          </DialogHeader>
          {cloneSource && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="clone-name">New Academic Year Name</Label>
                  <Input
                    id="clone-name"
                    value={cloneTerm.name}
                    onChange={(e) => setCloneTerm({ ...cloneTerm, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clone-description">Description</Label>
                  <Input
                    id="clone-description"
                    value={cloneTerm.description}
                    onChange={(e) => setCloneTerm({ ...cloneTerm, description: e.target.value })}
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
                  <Switch
                    id="clone-adjust-dates"
                    checked={cloneTerm.adjustDates}
                    onCheckedChange={(checked) => setCloneTerm({ ...cloneTerm, adjustDates: checked })}
                  />
                  <Label htmlFor="clone-adjust-dates">Adjust term dates proportionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="clone-preserve-fines"
                    checked={cloneTerm.preserveFines}
                    onCheckedChange={(checked) => setCloneTerm({ ...cloneTerm, preserveFines: checked })}
                  />
                  <Label htmlFor="clone-preserve-fines">Preserve fine settings</Label>
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
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Academic Year</h4>
                        <p className="font-medium">{clonePreview.name}</p>
                        <p className="text-sm text-muted-foreground">{clonePreview.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                        <p className="text-sm">
                          {format(clonePreview.startDate, "MMM d, yyyy")} -{" "}
                          {format(clonePreview.endDate, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Term</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Fine</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clonePreview.terms.slice(0, 3).map((term, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{term.name}</TableCell>
                              <TableCell>{format(term.startDate, "MMM d, yyyy")}</TableCell>
                              <TableCell>{format(term.endDate, "MMM d, yyyy")}</TableCell>
                              <TableCell>{format(term.dueDate, "MMM d, yyyy")}</TableCell>
                              <TableCell>{getFineNameById(term.fineId)}</TableCell>
                            </TableRow>
                          ))}
                          {clonePreview.terms.length > 3 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-muted-foreground">
                                + {clonePreview.terms.length - 3} more terms
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCloneDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCloneFeeTerm} disabled={!cloneTerm.name}>
              Clone Academic Year
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}