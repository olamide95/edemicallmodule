"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Plus, Pencil, Trash2, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for students
const mockStudents = [
  { id: 1, name: "John Smith", class: "Grade 10A", admissionNo: "A10023" },
  { id: 2, name: "Emily Johnson", class: "Grade 10A", admissionNo: "A10024" },
  { id: 3, name: "Michael Brown", class: "Grade 10B", admissionNo: "A10045" },
  { id: 4, name: "Sarah Davis", class: "Grade 11A", admissionNo: "A11021" },
  { id: 5, name: "David Wilson", class: "Grade 11B", admissionNo: "A11032" },
]

// Mock data for classes
const mockClasses = [
  { id: 1, name: "Grade 10A", studentCount: 32 },
  { id: 2, name: "Grade 10B", studentCount: 30 },
  { id: 3, name: "Grade 11A", studentCount: 28 },
  { id: 4, name: "Grade 11B", studentCount: 29 },
  { id: 5, name: "Grade 12A", studentCount: 25 },
]

// Mock data for fine types
const mockFineTypes = [
  { id: 1, name: "Late Payment Fine", defaultAmount: 50 },
  { id: 2, name: "Library Book Late Return", defaultAmount: 30 },
  { id: 3, name: "Uniform Violation", defaultAmount: 25 },
]

// Mock data for assigned fines
const mockAssignedFines = [
  {
    id: 1,
    studentName: "John Smith",
    studentId: 1,
    class: "Grade 10A",
    fineType: "Late Payment Fine",
    amount: 50,
    date: "2023-04-15",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Emily Johnson",
    studentId: 2,
    class: "Grade 10A",
    fineType: "Library Book Late Return",
    amount: 30,
    date: "2023-04-10",
    status: "Paid",
  },
  {
    id: 3,
    studentName: "Grade 11A",
    studentId: null,
    class: "Grade 11A",
    fineType: "Uniform Violation",
    amount: 25,
    date: "2023-04-18",
    status: "Pending",
  },
]

export function FineAssignment() {
  const [assignedFines, setAssignedFines] = useState(mockAssignedFines)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFine, setCurrentFine] = useState<any>(null)
  const [assignmentType, setAssignmentType] = useState("individual")
  const [openStudent, setOpenStudent] = useState(false)
  const [openClass, setOpenClass] = useState(false)
  const [openFineType, setOpenFineType] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [selectedFineType, setSelectedFineType] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  const handleAddNew = () => {
    setCurrentFine({
      id: Date.now(),
      studentName: "",
      studentId: null,
      class: "",
      fineType: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: "Pending"
    })
    setSelectedStudent(null)
    setSelectedClass(null)
    setSelectedFineType(null)
    setAssignmentType("individual")
    setIsDialogOpen(true)
  }
  
  const handleEdit = (fine: any) => {
    setCurrentFine({...fine})
    if (fine.studentId) {
      setAssignmentType("individual")
      setSelectedStudent(mockStudents.find(s => s.id === fine.studentId))
      setSelectedClass(null)
    } else {
      setAssignmentType("class")
      setSelectedClass(mockClasses.find(c => c.name === fine.class))
      setSelectedStudent(null)
    }
    setSelectedFineType(mockFineTypes.find(f => f.name === fine.fineType))
    setIsDialogOpen(true)
  }
  
  const handleDelete = (id: number) => {
    setAssignedFines(assignedFines.filter(fine => fine.id !== id))
  }
  
  const handleSave = () => {
    const newFine = {...currentFine}
    
    if (assignmentType === "individual" && selectedStudent) {
      newFine.studentName = selectedStudent.name
      newFine.studentId = selectedStudent.id
      newFine.class = selectedStudent.class
    } else if (assignmentType === "class" && selectedClass) {
      newFine.studentName = selectedClass.name
      newFine.studentId = null
      newFine.class = selectedClass.name
    }
    
    if (selectedFineType) {
      newFine.fineType = selectedFineType.name
      if (!newFine.amount || newFine.amount === 0) {
        newFine.amount = selectedFineType.defaultAmount
      }
    }
    
    if (assignedFines.find(fine => fine.id === newFine.id)) {
      setAssignedFines(assignedFines.map(fine => 
        fine.id === newFine.id ? newFine : fine
      ))
    } else {
      setAssignedFines([...assignedFines, newFine])
    }
    setIsDialogOpen(false)
  }

  const filteredFines = assignedFines.filter(fine => 
    fine.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.fineType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Assigned Fines</h3>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Assign New Fine
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by student name, class, or fine type..." 
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student/Class</TableHead>
            <TableHead>Fine Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFines.map((fine) => (
            <TableRow key={fine.id}>
              <TableCell className="font-medium">
                {fine.studentName}
                <div className="text-xs text-muted-foreground">
                  {fine.studentId ? `Class: ${fine.class}` : "Entire Class"}
                </div>
              </TableCell>
              <TableCell>{fine.fineType}</TableCell>
              <TableCell>${fine.amount}</TableCell>
              <TableCell>{new Date(fine.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  fine.status === "Paid" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {fine.status}
                </span>
              </TableCell>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentFine && assignedFines.find(f => f.id === currentFine.id) 
                ? "Edit Fine Assignment" 
                : "Assign New Fine"}
            </DialogTitle>
            <DialogDescription>
              Assign a fine to a student or an entire class
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={assignmentType} onValueChange={setAssignmentType}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="individual">Individual Student</TabsTrigger>
              <TabsTrigger value="class">Entire Class</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Student
                </Label>
                <div className="col-span-3">
                  <Popover open={openStudent} onOpenChange={setOpenStudent}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openStudent}
                        className="w-full justify-between"
                      >
                        {selectedStudent
                          ? selectedStudent.name
                          : "Select student..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search student..." />
                        <CommandList>
                          <CommandEmpty>No student found.</CommandEmpty>
                          <CommandGroup>
                            {mockStudents.map((student) => (
                              <CommandItem
                                key={student.id}
                                value={student.name}
                                onSelect={() => {
                                  setSelectedStudent(student)
                                  setOpenStudent(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedStudent?.id === student.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {student.name}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  ({student.admissionNo}, {student.class})
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="class" className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
                <div className="col-span-3">
                  <Popover open={openClass} onOpenChange={setOpenClass}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openClass}
                        className="w-full justify-between"
                      >
                        {selectedClass
                          ? selectedClass.name
                          : "Select class..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search class..." />
                        <CommandList>
                          <CommandEmpty>No class found.</CommandEmpty>
                          <CommandGroup>
                            {mockClasses.map((classItem) => (
                              <CommandItem
                                key={classItem.id}
                                value={classItem.name}
                                onSelect={() => {
                                  setSelectedClass(classItem)
                                  setOpenClass(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedClass?.id === classItem.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {classItem.name}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  ({classItem.studentCount} students)
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fineType" className="text-right">
              Fine Type
            </Label>
            <div className="col-span-3">
              <Popover open={openFineType} onOpenChange={setOpenFineType}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openFineType}
                    className="w-full justify-between"
                  >
                    {selectedFineType
                      ? selectedFineType.name
                      : "Select fine type..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search fine type..." />
                    <CommandList>
                      <CommandEmpty>No fine type found.</CommandEmpty>
                      <CommandGroup>
                        {mockFineTypes.map((fineType) => (
                          <CommandItem
                            key={fineType.id}
                            value={fineType.name}
                            onSelect={() => {
                              setSelectedFineType(fineType)
                              setOpenFineType(false)
                              setCurrentFine({
                                ...currentFine,
                                amount: fineType.defaultAmount
                              })
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedFineType?.id === fineType.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {fineType.name}
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Default: ${fineType.defaultAmount})
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount ($)
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={currentFine?.amount || 0}
              onChange={(e) => setCurrentFine({
                ...currentFine, 
                amount: Number.parseFloat(e.target.value) || 0
              })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={currentFine?.date || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCurrentFine({...currentFine, date: e.target.value})}
              className="col-span-3"
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!selectedFineType || (!selectedStudent && !selectedClass)}>
              Save Fine
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}