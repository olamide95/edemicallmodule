"use client"

import { useState, useCallback, useMemo } from "react"
import { Plus, Search, Filter, Download, Upload, MoreHorizontal, Edit, Trash2, Eye, Users, BookOpen, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"

// Mock data for classes
const classesData = [
  {
    id: 1,
    class: "JSS 1",
    section: "A",
    classTeacher: "Mrs. Sarah Johnson",
    assistantTeacher: "Mr. David Wilson",
    capacity: 40,
    enrolled: 35,
    buildingLocation: "Main Block",
    wing: "East Wing",
  },
  {
    id: 2,
    class: "JSS 1",
    section: "B",
    classTeacher: "Mrs. Emily Davis",
    assistantTeacher: "Ms. Lisa Brown",
    capacity: 40,
    enrolled: 38,
    buildingLocation: "Main Block",
    wing: "East Wing",
  },
  {
    id: 3,
    class: "JSS 2",
    section: "A",
    classTeacher: "Mr. Michael Chen",
    assistantTeacher: "Mrs. Grace Taylor",
    capacity: 35,
    enrolled: 32,
    buildingLocation: "Main Block",
    wing: "West Wing",
  },
  {
    id: 4,
    class: "JSS 3",
    section: "A",
    classTeacher: "Dr. James Anderson",
    assistantTeacher: "Mr. Robert Lee",
    capacity: 35,
    enrolled: 30,
    buildingLocation: "Science Block",
    wing: "North Wing",
  },
  {
    id: 5,
    class: "SS 1",
    section: "A",
    classTeacher: "Mrs. Patricia Moore",
    assistantTeacher: "Ms. Jennifer White",
    capacity: 30,
    enrolled: 28,
    buildingLocation: "Senior Block",
    wing: "South Wing",
  },
]

// Mock data for subjects
const subjectsData = [
  {
    id: 1,
    subjectId: "MATH001",
    name: "Mathematics",
    class: "JSS 1",
    teacher: "Mr. John Smith",
    assistantTeacher: "Mrs. Sarah Johnson",
    isGroup: false,
  },
  {
    id: 2,
    subjectId: "ENG001",
    name: "English Language",
    class: "JSS 1",
    teacher: "Mrs. Sarah Johnson",
    assistantTeacher: "Mr. David Wilson",
    isGroup: false,
  },
  {
    id: 3,
    subjectId: "SCI001",
    name: "Basic Science",
    class: "JSS 1",
    teacher: "Dr. Michael Brown",
    assistantTeacher: "Mrs. Emily Davis",
    isGroup: true,
  },
  {
    id: 4,
    subjectId: "HIST001",
    name: "History",
    class: "JSS 2",
    teacher: "Mrs. Emily Davis",
    assistantTeacher: "Mr. Michael Chen",
    isGroup: false,
  },
  {
    id: 5,
    subjectId: "GEOG001",
    name: "Geography",
    class: "JSS 2",
    teacher: "Mr. David Wilson",
    assistantTeacher: "Mrs. Grace Taylor",
    isGroup: false,
  },
  {
    id: 6,
    subjectId: "PHYS001",
    name: "Physics",
    class: "SS 1",
    teacher: "Dr. James Anderson",
    assistantTeacher: "Mr. Robert Lee",
    isGroup: false,
  },
  {
    id: 7,
    subjectId: "CHEM001",
    name: "Chemistry",
    class: "SS 1",
    teacher: "Mrs. Grace Taylor",
    assistantTeacher: "Mrs. Patricia Moore",
    isGroup: false,
  },
  {
    id: 8,
    subjectId: "BIO001",
    name: "Biology",
    class: "SS 1",
    teacher: "Dr. Lisa Chen",
    assistantTeacher: "Ms. Jennifer White",
    isGroup: false,
  },
]

// Mock teachers data
const teachersData = [
  { id: 1, name: "Mrs. Sarah Johnson" },
  { id: 2, name: "Mr. David Wilson" },
  { id: 3, name: "Mrs. Emily Davis" },
  { id: 4, name: "Ms. Lisa Brown" },
  { id: 5, name: "Mr. Michael Chen" },
  { id: 6, name: "Mrs. Grace Taylor" },
  { id: 7, name: "Dr. James Anderson" },
  { id: 8, name: "Mr. Robert Lee" },
  { id: 9, name: "Mrs. Patricia Moore" },
  { id: 10, name: "Ms. Jennifer White" },
]

interface ClassSection {
  id: string
  sectionName: string
  teacher: string
  roomNo: string
  capacity: string
}

interface ClassData {
  id: string
  className: string
  sections: ClassSection[]
}

export default function ClassesSubjectsPage() {
  const [selectedClasses, setSelectedClasses] = useState<number[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("main-campus")
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false)

  // Class creation state
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: "1",
      className: "",
      sections: [
        {
          id: "1",
          sectionName: "",
          teacher: "",
          roomNo: "",
          capacity: "",
        },
      ],
    },
  ])

  const handleClassSelection = useCallback((classId: number) => {
    setSelectedClasses((prev) => (prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]))
  }, [])

  const handleSubjectSelection = useCallback((subjectId: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }, [])

  const handleSelectAllClasses = useCallback(() => {
    if (selectedClasses.length === classesData.length) {
      setSelectedClasses([])
    } else {
      setSelectedClasses(classesData.map((c) => c.id))
    }
  }, [selectedClasses.length])

  const handleSelectAllSubjects = useCallback(() => {
    if (selectedSubjects.length === subjectsData.length) {
      setSelectedSubjects([])
    } else {
      setSelectedSubjects(subjectsData.map((s) => s.id))
    }
  }, [selectedSubjects.length])

  const addNewClass = useCallback(() => {
    const newClass: ClassData = {
      id: Date.now().toString(),
      className: "",
      sections: [
        {
          id: Date.now().toString(),
          sectionName: "",
          teacher: "",
          roomNo: "",
          capacity: "",
        },
      ],
    }
    setClasses([...classes, newClass])
  }, [classes])

  const deleteClass = useCallback((classId: string) => {
    if (classes.length > 1) {
      setClasses(classes.filter((c) => c.id !== classId))
    }
  }, [classes])

  const addSection = useCallback((classId: string) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              sections: [
                ...c.sections,
                {
                  id: Date.now().toString(),
                  sectionName: "",
                  teacher: "",
                  roomNo: "",
                  capacity: "",
                },
              ],
            }
          : c,
      ),
    )
  }, [classes])

  const deleteSection = useCallback((classId: string, sectionId: string) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              sections: c.sections.length > 1 ? c.sections.filter((s) => s.id !== sectionId) : c.sections,
            }
          : c,
      ),
    )
  }, [classes])

  const updateClass = useCallback((classId: string, field: string, value: string) => {
    setClasses(classes.map((c) => (c.id === classId ? { ...c, [field]: value } : c)))
  }, [classes])

  const updateSection = useCallback((classId: string, sectionId: string, field: string, value: string) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              sections: c.sections.map((s) => (s.id === sectionId ? { ...s, [field]: value } : s)),
            }
          : c,
      ),
    )
  }, [classes])

  const handleSaveClasses = useCallback(() => {
    // Handle save logic here
    console.log("Saving classes:", classes)
    setIsCreateClassOpen(false)
    // Reset form
    setClasses([
      {
        id: "1",
        className: "",
        sections: [
          {
            id: "1",
            sectionName: "",
            teacher: "",
            roomNo: "",
            capacity: "",
          },
        ],
      },
    ])
  }, [classes])

  // Memoized filtered data
  const filteredClasses = useMemo(() => {
    return classesData.filter((classItem) =>
      classItem.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 space-y-6">
            <Breadcrumbs />

            {/* Header Section */}
            <div className="bg-white dark:bg-dark-card-bg rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between p-8">
                <div className="flex-1 space-y-4">
                  <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    Classes & Subjects
                  </h1>
                  <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl">
                    Seamlessly manage academic classes and subjects across all branches with advanced organization tools
                    and teacher assignments.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Click To Learn More</Button>
                </div>

                <div className="flex-shrink-0 mt-6 lg:mt-0">
                  <img
                    src="/classes-subjects-icon.png"
                    alt="Classes & Subjects Management"
                    className="w-64 h-48 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-xl">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">5</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Active Classes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">8</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Subjects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warning/10 rounded-xl">
                      <Users className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">163</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Branch Selection */}
            <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
                      Branch Selection
                    </CardTitle>
                    <CardDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                      Select a branch to manage classes and subjects
                    </CardDescription>
                  </div>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="w-64 bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                      <SelectItem value="main-campus">Main Campus</SelectItem>
                      <SelectItem value="secondary-campus">Secondary Campus</SelectItem>
                      <SelectItem value="primary-campus">Primary Campus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="classes" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full grid-cols-2 lg:w-96 bg-light-card-bg dark:bg-dark-card-bg border border-light-border dark:border-dark-border">
                  <TabsTrigger
                    value="classes"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white text-light-text-primary dark:text-dark-text-primary"
                  >
                    <Users className="h-4 w-4" />
                    Classes
                  </TabsTrigger>
                  <TabsTrigger
                    value="subjects"
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white text-light-text-primary dark:text-dark-text-primary"
                  >
                    <BookOpen className="h-4 w-4" />
                    Subjects
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-3">
                  <Dialog open={isCreateClassOpen} onOpenChange={setIsCreateClassOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Class
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                      <DialogHeader>
                        <DialogTitle className="text-light-text-primary dark:text-dark-text-primary">
                          Class & Section
                        </DialogTitle>
                        <DialogDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                          Create new classes and sections with teacher assignments
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Tab-like navigation */}
                        <div className="flex gap-4 border-b border-light-border dark:border-dark-border pb-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-light-card-bg dark:bg-dark-card-bg rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                              CLASS & GRADE LIST
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary">
                            <span className="text-sm">CHANGE ORDER</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary">
                            <span className="text-sm">SECTION</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 text-primary">
                            <Plus className="h-4 w-4" />
                            <span className="text-sm font-medium">ADD CLASS & SECTION</span>
                          </div>
                        </div>

                        {/* Classes Form */}
                        <div className="space-y-6">
                          {classes.map((classItem, classIndex) => (
                            <div
                              key={classItem.id}
                              className="border border-light-border dark:border-dark-border rounded-lg p-6 bg-light-card-bg dark:bg-dark-card-bg"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                                  Class {classIndex + 1}
                                </h3>
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteClass(classItem.id)}
                                    className="text-error border-error hover:bg-error/10 bg-transparent"
                                    disabled={classes.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete Class
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addNewClass}
                                    className="text-primary border-primary hover:bg-primary/10 bg-transparent"
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Class
                                  </Button>
                                </div>
                              </div>

                              <div className="mb-4">
                                <Input
                                  placeholder={`Class ${classIndex + 1} Name`}
                                  value={classItem.className}
                                  onChange={(e) => updateClass(classItem.id, "className", e.target.value)}
                                  className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                                />
                              </div>

                              <div className="space-y-4">
                                {classItem.sections.map((section, sectionIndex) => (
                                  <div
                                    key={section.id}
                                    className="grid grid-cols-12 gap-4 items-end p-4 bg-white dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border"
                                  >
                                    <div className="col-span-2">
                                      <Label className="text-sm text-light-text-primary dark:text-dark-text-primary">
                                        Section Name *
                                      </Label>
                                      <Input
                                        placeholder="Section Name"
                                        value={section.sectionName}
                                        onChange={(e) =>
                                          updateSection(classItem.id, section.id, "sectionName", e.target.value)
                                        }
                                        className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                                      />
                                    </div>

                                    <div className="col-span-2">
                                      <Label className="text-sm text-light-text-primary dark:text-dark-text-primary">
                                        Teacher *
                                      </Label>
                                      <Select
                                        value={section.teacher}
                                        onValueChange={(value) =>
                                          updateSection(classItem.id, section.id, "teacher", value)
                                        }
                                      >
                                        <SelectTrigger className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary">
                                          <SelectValue placeholder="Select Teacher" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                                          {teachersData.map((teacher) => (
                                            <SelectItem key={teacher.id} value={teacher.name}>
                                              {teacher.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="col-span-2">
                                      <Label className="text-sm text-light-text-primary dark:text-dark-text-primary">
                                        Room No. *
                                      </Label>
                                      <Input
                                        placeholder="Room No."
                                        value={section.roomNo}
                                        onChange={(e) =>
                                          updateSection(classItem.id, section.id, "roomNo", e.target.value)
                                        }
                                        className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                                      />
                                    </div>

                                    <div className="col-span-2">
                                      <Label className="text-sm text-light-text-primary dark:text-dark-text-primary">
                                        Section Capacity *
                                      </Label>
                                      <Input
                                        placeholder="Section Capacity"
                                        value={section.capacity}
                                        onChange={(e) =>
                                          updateSection(classItem.id, section.id, "capacity", e.target.value)
                                        }
                                        className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                                      />
                                    </div>

                                    <div className="col-span-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => deleteSection(classItem.id, section.id)}
                                        className="text-error border-error hover:bg-error/10 bg-transparent w-full"
                                        disabled={classItem.sections.length === 1}
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete Section
                                      </Button>
                                    </div>

                                    <div className="col-span-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addSection(classItem.id)}
                                        className="text-primary border-primary hover:bg-primary/10 bg-transparent w-full"
                                      >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Section
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center pt-4">
                          <Button
                            onClick={handleSaveClasses}
                            className="bg-primary hover:bg-primary/90 text-white px-8"
                          >
                            Save Class Sections
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Link href="/academic-setup/classes-subjects/create-subject">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subject
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Classes Tab */}
              <TabsContent value="classes" className="space-y-6">
                <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
                          Class Management
                        </CardTitle>
                        <CardDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                          Manage classes, sections, and teacher assignments
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64 bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-light-border dark:border-dark-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-light-card-bg dark:bg-dark-card-bg">
                            <TableHead className="w-12">
                              <Checkbox
                                checked={selectedClasses.length === classesData.length}
                                onCheckedChange={handleSelectAllClasses}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </TableHead>
                            <TableHead className="w-16 text-light-text-primary dark:text-dark-text-primary">S/N</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Class</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Section</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Class Teacher
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Assistant Teacher
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Capacity</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Space Left
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Building Location
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Wing</TableHead>
                            <TableHead className="w-16 text-light-text-primary dark:text-dark-text-primary">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredClasses.map((classItem, index) => (
                            <TableRow
                              key={classItem.id}
                              className="hover:bg-light-card-bg dark:hover:bg-dark-card-bg"
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedClasses.includes(classItem.id)}
                                  onCheckedChange={() => handleClassSelection(classItem.id)}
                                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </TableCell>
                              <TableCell className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Users className="h-4 w-4 text-primary" />
                                  </div>
                                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {classItem.class}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-light-card-bg dark:bg-dark-card-bg text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border"
                                >
                                  {classItem.section}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-light-text-primary dark:text-dark-text-primary">
                                {classItem.classTeacher}
                              </TableCell>
                              <TableCell className="text-light-text-secondary dark:text-dark-text-secondary">
                                {classItem.assistantTeacher}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {classItem.capacity}
                                  </span>
                                  <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                                    students
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    classItem.capacity - classItem.enrolled > 5
                                      ? "default"
                                      : classItem.capacity - classItem.enrolled > 0
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className={
                                    classItem.capacity - classItem.enrolled > 5
                                      ? "bg-success/10 text-success border-success/20"
                                      : classItem.capacity - classItem.enrolled > 0
                                        ? "bg-warning/10 text-warning border-warning/20"
                                        : "bg-error/10 text-error border-error/20"
                                  }
                                >
                                  {classItem.capacity - classItem.enrolled} spaces
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-primary/5 text-primary border-primary/20"
                                >
                                  {classItem.buildingLocation}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                                  <span className="text-light-text-primary dark:text-dark-text-primary">
                                    {classItem.wing}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border"
                                  >
                                    <DropdownMenuItem className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Class
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-error hover:bg-error/10">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Class
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subjects Tab */}
              <TabsContent value="subjects" className="space-y-6">
                <Card className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-light-text-primary dark:text-dark-text-primary">
                          Subject Management
                        </CardTitle>
                        <CardDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                          Manage subjects and teacher assignments across classes
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            placeholder="Search subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64 bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-light-card-bg dark:hover:bg-dark-card-bg bg-transparent"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-light-border dark:border-dark-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-light-card-bg dark:bg-dark-card-bg">
                            <TableHead className="w-12">
                              <Checkbox
                                checked={selectedSubjects.length === subjectsData.length}
                                onCheckedChange={handleSelectAllSubjects}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </TableHead>
                            <TableHead className="w-16 text-light-text-primary dark:text-dark-text-primary">S/N</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Subject ID
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Subject Name
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Class</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Teacher</TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">
                              Assistant Teacher
                            </TableHead>
                            <TableHead className="text-light-text-primary dark:text-dark-text-primary">Type</TableHead>
                            <TableHead className="w-16 text-light-text-primary dark:text-dark-text-primary">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubjects.map((subject, index) => (
                            <TableRow
                              key={subject.id}
                              className="hover:bg-light-card-bg dark:hover:bg-dark-card-bg"
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedSubjects.includes(subject.id)}
                                  onCheckedChange={() => handleSubjectSelection(subject.id)}
                                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </TableCell>
                              <TableCell className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="font-mono bg-light-card-bg dark:bg-dark-card-bg text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border"
                                >
                                  {subject.subjectId}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                  </div>
                                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {subject.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className="bg-secondary/10 text-secondary border-secondary/20"
                                >
                                  {subject.class}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-light-text-primary dark:text-dark-text-primary">
                                {subject.teacher}
                              </TableCell>
                              <TableCell className="text-light-text-secondary dark:text-dark-text-secondary">
                                {subject.assistantTeacher}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={subject.isGroup ? "default" : "outline"}
                                  className={
                                    subject.isGroup
                                      ? "bg-primary/10 text-primary border-primary/20"
                                      : "bg-light-card-bg dark:bg-dark-card-bg text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border"
                                  }
                                >
                                  {subject.isGroup ? "Group" : "Individual"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="bg-white dark:bg-dark-card-bg border-light-border dark:border-dark-border"
                                  >
                                    <DropdownMenuItem className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-card-bg dark:hover:bg-dark-card-bg">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Subject
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-error hover:bg-error/10">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Subject
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}