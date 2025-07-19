"use client"
import { useState, useEffect, useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Eye,
  Download,
  Filter,
  ArrowUpDown,
  UserRound,
  CalendarDays,
  FileDown,
  FileText,
  Mail,
  Trash2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { downloadCSV, prepareStudentDataForExport, studentExportHeaders } from "@/lib/export-utils"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EmailExportDialog } from "@/components/email/email-export-dialog"
import { getAdministratorEmails } from "@/app/admission/actions/email-actions"

// Sample data for student information
const studentData = [
  {
    id: "STU001",
    avatar: "/diverse-students-studying.png",
    fullName: "John Smith",
    admissionNumber: "ADM-2023-001",
    gender: "Male",
    yearOfAdmission: "2023",
    class: "Grade 1",
    section: "A",
    specialNeeds: false,
    birthdate: "2017-05-15",
    age: 6,
    parents: {
      father: {
        name: "David Smith",
        phone: "+1 234-567-8901",
        email: "david.smith@example.com",
        occupation: "Engineer",
      },
      mother: {
        name: "Sarah Smith",
        phone: "+1 234-567-8902",
        email: "sarah.smith@example.com",
        occupation: "Doctor",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "David Smith",
      relationship: "Father",
      phone: "+1 234-567-8901",
    },
    address: "123 Main St, Anytown, USA",
    bloodGroup: "O+",
    medicalConditions: "None",
    allergies: "None",
  },
  {
    id: "STU002",
    avatar: "/diverse-students-studying.png",
    fullName: "Emma Johnson",
    admissionNumber: "ADM-2023-002",
    gender: "Female",
    yearOfAdmission: "2023",
    class: "Grade 2",
    section: "B",
    specialNeeds: true,
    birthdate: "2016-03-22",
    age: 7,
    parents: {
      father: {
        name: "Michael Johnson",
        phone: "+1 234-567-8903",
        email: "michael.johnson@example.com",
        occupation: "Accountant",
      },
      mother: {
        name: "Jennifer Johnson",
        phone: "+1 234-567-8904",
        email: "jennifer.johnson@example.com",
        occupation: "Teacher",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Jennifer Johnson",
      relationship: "Mother",
      phone: "+1 234-567-8904",
    },
    address: "456 Oak Ave, Anytown, USA",
    bloodGroup: "A+",
    medicalConditions: "Asthma",
    allergies: "Peanuts",
  },
  {
    id: "STU003",
    avatar: "/diverse-students-studying.png",
    fullName: "Michael Brown",
    admissionNumber: "ADM-2023-003",
    gender: "Male",
    yearOfAdmission: "2023",
    class: "Grade 1",
    section: "A",
    specialNeeds: false,
    birthdate: "2017-08-10",
    age: 6,
    parents: {
      father: {
        name: "Robert Brown",
        phone: "+1 234-567-8905",
        email: "robert.brown@example.com",
        occupation: "Lawyer",
      },
      mother: {
        name: "Patricia Brown",
        phone: "+1 234-567-8906",
        email: "patricia.brown@example.com",
        occupation: "Nurse",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Patricia Brown",
      relationship: "Mother",
      phone: "+1 234-567-8906",
    },
    address: "789 Pine St, Anytown, USA",
    bloodGroup: "B+",
    medicalConditions: "None",
    allergies: "None",
  },
  {
    id: "STU004",
    avatar: "/diverse-students-studying.png",
    fullName: "Sophia Davis",
    admissionNumber: "ADM-2023-004",
    gender: "Female",
    yearOfAdmission: "2023",
    class: "Grade 3",
    section: "C",
    specialNeeds: true,
    birthdate: "2015-11-05",
    age: 8,
    parents: {
      father: {
        name: "James Davis",
        phone: "+1 234-567-8907",
        email: "james.davis@example.com",
        occupation: "Professor",
      },
      mother: {
        name: "Mary Davis",
        phone: "+1 234-567-8908",
        email: "mary.davis@example.com",
        occupation: "Architect",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "James Davis",
      relationship: "Father",
      phone: "+1 234-567-8907",
    },
    address: "101 Maple Dr, Anytown, USA",
    bloodGroup: "AB-",
    medicalConditions: "ADHD",
    allergies: "Dairy",
  },
  {
    id: "STU005",
    avatar: "/diverse-students-studying.png",
    fullName: "William Wilson",
    admissionNumber: "ADM-2023-005",
    gender: "Male",
    yearOfAdmission: "2023",
    class: "Grade 2",
    section: "A",
    specialNeeds: false,
    birthdate: "2016-07-20",
    age: 7,
    parents: {
      father: null,
      mother: {
        name: "Elizabeth Wilson",
        phone: "+1 234-567-8910",
        email: "elizabeth.wilson@example.com",
        occupation: "Business Owner",
      },
      guardian: {
        name: "Thomas Wilson",
        phone: "+1 234-567-8911",
        email: "thomas.wilson@example.com",
        relationship: "Uncle",
        occupation: "Retired",
      },
    },
    emergencyContact: {
      name: "Elizabeth Wilson",
      relationship: "Mother",
      phone: "+1 234-567-8910",
    },
    address: "222 Elm St, Anytown, USA",
    bloodGroup: "O-",
    medicalConditions: "None",
    allergies: "None",
  },
  {
    id: "STU006",
    avatar: "/diverse-students-studying.png",
    fullName: "Olivia Martinez",
    admissionNumber: "ADM-2023-006",
    gender: "Female",
    yearOfAdmission: "2023",
    class: "Grade 1",
    section: "B",
    specialNeeds: false,
    birthdate: "2017-02-14",
    age: 6,
    parents: {
      father: {
        name: "Carlos Martinez",
        phone: "+1 234-567-8912",
        email: "carlos.martinez@example.com",
        occupation: "Chef",
      },
      mother: {
        name: "Isabella Martinez",
        phone: "+1 234-567-8913",
        email: "isabella.martinez@example.com",
        occupation: "Artist",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Carlos Martinez",
      relationship: "Father",
      phone: "+1 234-567-8912",
    },
    address: "333 Cedar Ln, Anytown, USA",
    bloodGroup: "A-",
    medicalConditions: "None",
    allergies: "Shellfish",
  },
  {
    id: "STU007",
    avatar: "/diverse-students-studying.png",
    fullName: "James Taylor",
    admissionNumber: "ADM-2023-007",
    gender: "Male",
    yearOfAdmission: "2023",
    class: "Grade 3",
    section: "A",
    specialNeeds: true,
    birthdate: "2015-09-30",
    age: 8,
    parents: {
      father: {
        name: "William Taylor",
        phone: "+1 234-567-8914",
        email: "william.taylor@example.com",
        occupation: "Pilot",
      },
      mother: {
        name: "Linda Taylor",
        phone: "+1 234-567-8915",
        email: "linda.taylor@example.com",
        occupation: "Flight Attendant",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Linda Taylor",
      relationship: "Mother",
      phone: "+1 234-567-8915",
    },
    address: "444 Birch Rd, Anytown, USA",
    bloodGroup: "B-",
    medicalConditions: "Dyslexia",
    allergies: "None",
  },
  {
    id: "STU008",
    avatar: "/diverse-students-studying.png",
    fullName: "Isabella Anderson",
    admissionNumber: "ADM-2023-008",
    gender: "Female",
    yearOfAdmission: "2023",
    class: "Grade 2",
    section: "C",
    specialNeeds: false,
    birthdate: "2016-12-05",
    age: 7,
    parents: {
      father: {
        name: "Richard Anderson",
        phone: "+1 234-567-8916",
        email: "richard.anderson@example.com",
        occupation: "Software Developer",
      },
      mother: {
        name: "Susan Anderson",
        phone: "+1 234-567-8917",
        email: "susan.anderson@example.com",
        occupation: "Marketing Manager",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Richard Anderson",
      relationship: "Father",
      phone: "+1 234-567-8916",
    },
    address: "555 Walnut Ave, Anytown, USA",
    bloodGroup: "AB+",
    medicalConditions: "None",
    allergies: "None",
  },
  {
    id: "STU009",
    avatar: "/diverse-students-studying.png",
    fullName: "Ethan Thomas",
    admissionNumber: "ADM-2023-009",
    gender: "Male",
    yearOfAdmission: "2023",
    class: "Grade 1",
    section: "C",
    specialNeeds: false,
    birthdate: "2017-06-18",
    age: 6,
    parents: {
      father: {
        name: "Daniel Thomas",
        phone: "+1 234-567-8918",
        email: "daniel.thomas@example.com",
        occupation: "Electrician",
      },
      mother: null,
      guardian: {
        name: "Margaret Thomas",
        phone: "+1 234-567-8919",
        email: "margaret.thomas@example.com",
        relationship: "Grandmother",
        occupation: "Retired",
      },
    },
    emergencyContact: {
      name: "Margaret Thomas",
      relationship: "Grandmother",
      phone: "+1 234-567-8919",
    },
    address: "666 Spruce Ct, Anytown, USA",
    bloodGroup: "O+",
    medicalConditions: "None",
    allergies: "None",
  },
  {
    id: "STU010",
    avatar: "/diverse-students-studying.png",
    fullName: "Ava Jackson",
    admissionNumber: "ADM-2023-010",
    gender: "Female",
    yearOfAdmission: "2023",
    class: "Grade 3",
    section: "B",
    specialNeeds: true,
    birthdate: "2015-04-22",
    age: 8,
    parents: {
      father: {
        name: "Christopher Jackson",
        phone: "+1 234-567-8920",
        email: "christopher.jackson@example.com",
        occupation: "Police Officer",
      },
      mother: {
        name: "Amanda Jackson",
        phone: "+1 234-567-8921",
        email: "amanda.jackson@example.com",
        occupation: "Pharmacist",
      },
      guardian: null,
    },
    emergencyContact: {
      name: "Amanda Jackson",
      relationship: "Mother",
      phone: "+1 234-567-8921",
    },
    address: "777 Aspen Way, Anytown, USA",
    bloodGroup: "A+",
    medicalConditions: "Autism Spectrum",
    allergies: "Gluten",
  },
]

// Define export field categories
const exportFieldGroups = [
  {
    name: "Basic Information",
    fields: [
      { id: "id", label: "Student ID", defaultChecked: true },
      { id: "fullName", label: "Full Name", defaultChecked: true },
      { id: "admissionNumber", label: "Admission Number", defaultChecked: true },
      { id: "gender", label: "Gender", defaultChecked: true },
      { id: "birthdate", label: "Date of Birth", defaultChecked: true },
      { id: "age", label: "Age", defaultChecked: true },
      { id: "class", label: "Class", defaultChecked: true },
      { id: "section", label: "Section", defaultChecked: true },
      { id: "yearOfAdmission", label: "Year of Admission", defaultChecked: true },
      { id: "address", label: "Address", defaultChecked: true },
      { id: "specialNeeds", label: "Special Needs", defaultChecked: true },
    ],
  },
  {
    name: "Medical Information",
    fields: [
      { id: "bloodGroup", label: "Blood Group", defaultChecked: true },
      { id: "medicalConditions", label: "Medical Conditions", defaultChecked: true },
      { id: "allergies", label: "Allergies", defaultChecked: true },
    ],
  },
  {
    name: "Parent Information",
    fields: [
      { id: "fatherName", label: "Father's Name", defaultChecked: true },
      { id: "fatherPhone", label: "Father's Phone", defaultChecked: false },
      { id: "fatherEmail", label: "Father's Email", defaultChecked: false },
      { id: "fatherOccupation", label: "Father's Occupation", defaultChecked: false },
      { id: "motherName", label: "Mother's Name", defaultChecked: true },
      { id: "motherPhone", label: "Mother's Phone", defaultChecked: false },
      { id: "motherEmail", label: "Mother's Email", defaultChecked: false },
      { id: "motherOccupation", label: "Mother's Occupation", defaultChecked: false },
      { id: "guardianName", label: "Guardian's Name", defaultChecked: false },
      { id: "guardianPhone", label: "Guardian's Phone", defaultChecked: false },
      { id: "guardianEmail", label: "Guardian's Email", defaultChecked: false },
      { id: "guardianRelationship", label: "Guardian's Relationship", defaultChecked: false },
    ],
  },
  {
    name: "Emergency Contact",
    fields: [
      { id: "emergencyContactName", label: "Emergency Contact Name", defaultChecked: true },
      { id: "emergencyContactPhone", label: "Emergency Contact Phone", defaultChecked: true },
      { id: "emergencyContactRelationship", label: "Emergency Contact Relationship", defaultChecked: true },
    ],
  },
]

// Flatten field groups for easier access
const allExportFields = exportFieldGroups.flatMap((group) => group.fields)

export function StudentInformation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedSEN, setSelectedSEN] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [exportSelectedTab, setExportSelectedTab] = useState("basic")
  const [selectedExportFields, setSelectedExportFields] = useState<string[]>(
    allExportFields.filter((field) => field.defaultChecked).map((field) => field.id),
  )
  const [administrators, setAdministrators] = useState<{ email: string; name: string }[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // Fetch administrators on component mount
  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const admins = await getAdministratorEmails()
        setAdministrators(admins)
      } catch (error) {
        console.error("Failed to fetch administrators:", error)
      }
    }

    fetchAdministrators()
  }, [])

  // Filter students based on search term and filters
  const filteredStudents = studentData.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesClass = selectedClass ? student.class === selectedClass : true
    const matchesSection = selectedSection ? student.section === selectedSection : true
    const matchesYear = selectedYear ? student.yearOfAdmission === selectedYear : true

    const matchesSEN =
      selectedSEN === ""
        ? true
        : selectedSEN === "yes"
          ? student.specialNeeds
          : selectedSEN === "no"
            ? !student.specialNeeds
            : true

    return matchesSearch && matchesClass && matchesSection && matchesYear && matchesSEN
  })

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0

    const key = sortConfig.key as keyof typeof a

    if (a[key] < b[key]) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get unique values for filters
  const classes = [...new Set(studentData.map((student) => student.class))]
  const sections = [...new Set(studentData.map((student) => student.section))]
  const years = [...new Set(studentData.map((student) => student.yearOfAdmission))]

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // View student details
  const viewStudentDetails = (student: any) => {
    setSelectedStudent(student)
    setIsDialogOpen(true)
  }

  // Toggle export field selection
  const toggleExportField = (fieldId: string) => {
    setSelectedExportFields((prev) =>
      prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId],
    )
  }

  // Toggle all fields in a group
  const toggleGroupFields = (groupFields: { id: string; label: string }[], checked: boolean) => {
    const groupFieldIds = groupFields.map((field) => field.id)

    if (checked) {
      // Add all group fields that aren't already selected
      setSelectedExportFields((prev) => {
        const newFields = [...prev]
        groupFieldIds.forEach((id) => {
          if (!newFields.includes(id)) {
            newFields.push(id)
          }
        })
        return newFields
      })
    } else {
      // Remove all group fields
      setSelectedExportFields((prev) => prev.filter((id) => !groupFieldIds.includes(id)))
    }
  }

  // Handle export functionality
  const handleExport = () => {
    // Prepare each student record
    const dataToExport = sortedStudents.map((student) => {
      // Deep copy student to avoid modifying the original
      const processedStudent = { ...student } as any

      // Explicitly handle nested data for export
      if (processedStudent.parents) {
        if (processedStudent.parents.father) {
          (processedStudent as any).fatherName = processedStudent.parents.father.name
          (processedStudent as any).fatherPhone = processedStudent.parents.father.phone
          (processedStudent as any).fatherEmail = processedStudent.parents.father.email
          (processedStudent as any).fatherOccupation = processedStudent.parents.father.occupation
        }

        if (processedStudent.parents.mother) {
          (processedStudent as any).motherName = processedStudent.parents.mother.name
          (processedStudent as any).motherPhone = processedStudent.parents.mother.phone
          (processedStudent as any).motherEmail = processedStudent.parents.mother.email
          (processedStudent as any).motherOccupation = processedStudent.parents.mother.occupation
        }

        if (processedStudent.parents.guardian) {
          (processedStudent as any).guardianName = processedStudent.parents.guardian.name
          (processedStudent as any).guardianPhone = processedStudent.parents.guardian.phone
          (processedStudent as any).guardianEmail = processedStudent.parents.guardian.email
          (processedStudent as any).guardianRelationship = processedStudent.parents.guardian.relationship
        }
      }

      if (processedStudent.emergencyContact) {
        (processedStudent as any).emergencyContactName = processedStudent.emergencyContact.name
        (processedStudent as any).emergencyContactPhone = processedStudent.emergencyContact.phone
        (processedStudent as any).emergencyContactRelationship = processedStudent.emergencyContact.relationship
      }

      return processedStudent
    })

    // Create a filtered version of the data based on selected fields
    const filteredData = dataToExport.map((student) => {
      const filtered: Record<string, any> = {}
      selectedExportFields.forEach((field) => {
        if (student[field] !== undefined) {
          filtered[field] = student[field]
        }
      })
      return filtered
    })

    // Create custom headers for selected fields
    const customHeaders: Record<string, string> = {}
    selectedExportFields.forEach((field) => {
      const fieldDef = allExportFields.find((f) => f.id === field)
      customHeaders[field] = fieldDef?.label || studentExportHeaders[field as keyof typeof studentExportHeaders] || field
    })

    // Process the data and download as CSV
    const processedData = prepareStudentDataForExport(filteredData)
    downloadCSV(processedData, `student_information_${new Date().toISOString().split("T")[0]}`, customHeaders)

    // Close the dialog
    setExportDialogOpen(false)
  }

  // Export a single student's details
  const exportStudentDetails = (student: any) => {
    const processedStudent = prepareStudentDataForExport([student])
    downloadCSV(
      processedStudent,
      `student_${student.id}_${student.fullName.replace(/\s+/g, "_").toLowerCase()}`,
      studentExportHeaders,
    )
  }

  // Check if all fields in a group are selected
  const isGroupChecked = (groupFields: { id: string }[]) => {
    return groupFields.every((field) => selectedExportFields.includes(field.id))
  }

  // Check if some but not all fields in a group are selected
  const isGroupIndeterminate = (groupFields: { id: string }[]) => {
    const selectedCount = groupFields.filter((field) => selectedExportFields.includes(field.id)).length
    return selectedCount > 0 && selectedCount < groupFields.length
  }

  // Prepare data for email export
  const prepareDataForEmail = () => {
    return sortedStudents.map((student) => {
      // Deep copy student to avoid modifying the original
      const processedStudent = { ...student } as any

      // Explicitly handle nested data for export
      if (processedStudent.parents) {
        if (processedStudent.parents.father) {
          processedStudent.fatherName = processedStudent.parents.father.name
          processedStudent.fatherPhone = processedStudent.parents.father.phone
          processedStudent.fatherEmail = processedStudent.parents.father.email
          processedStudent.fatherOccupation = processedStudent.parents.father.occupation
        }

        if (processedStudent.parents.mother) {
          processedStudent.motherName = processedStudent.parents.mother.name
          processedStudent.motherPhone = processedStudent.parents.mother.phone
          processedStudent.motherEmail = processedStudent.parents.mother.email
          processedStudent.motherOccupation = processedStudent.parents.mother.occupation
        }

        if (processedStudent.parents.guardian) {
          processedStudent.guardianName = processedStudent.parents.guardian.name
          processedStudent.guardianPhone = processedStudent.parents.guardian.phone
          processedStudent.guardianEmail = processedStudent.parents.guardian.email
          processedStudent.guardianRelationship = processedStudent.parents.guardian.relationship
        }
      }

      if (processedStudent.emergencyContact) {
        processedStudent.emergencyContactName = processedStudent.emergencyContact.name
        processedStudent.emergencyContactPhone = processedStudent.emergencyContact.phone
        processedStudent.emergencyContactRelationship = processedStudent.emergencyContact.relationship
      }

      return processedStudent
    })
  }

  // Toggle selection of a single student
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    )
  }

  // Toggle selection of all students
  const toggleAllStudentsSelection = () => {
    if (selectedStudents.length === sortedStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(sortedStudents.map((student) => student.id))
    }
  }

  // Delete selected students
  const deleteSelectedStudents = () => {
    // In a real application, you would call an API here
    console.log("Deleting students:", selectedStudents)
    // For demo purposes, we'll just show an alert
    alert(`The following students would be deleted: ${selectedStudents.join(", ")}`)
    setSelectedStudents([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Information</h1>
        <p className="text-muted-foreground">View and manage detailed information for all students.</p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Student Records</CardTitle>
          <div className="flex gap-2">
            {selectedStudents.length > 0 && (
              <Button variant="destructive" onClick={deleteSelectedStudents}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedStudents.length})
              </Button>
            )}
            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export to CSV
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Export Student Data</DialogTitle>
                  <DialogDescription>Select the fields you want to include in the CSV export.</DialogDescription>
                </DialogHeader>
                <Tabs value={exportSelectedTab} onValueChange={setExportSelectedTab} className="mt-4">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical</TabsTrigger>
                    <TabsTrigger value="parents">Parents</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                  </TabsList>

                  {exportFieldGroups.map((group, index) => (
                    <TabsContent
                      key={index}
                      value={["basic", "medical", "parents", "emergency"][index]}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 pb-2 border-b">
                        {(() => {
                          // Use a ref to access the underlying input element
                          const inputRef = useRef<HTMLInputElement>(null)
                          useEffect(() => {
                            if (inputRef.current) {
                              inputRef.current.indeterminate = isGroupIndeterminate(group.fields)
                            }
                          }, [selectedExportFields, group.fields])
                          return (
                            <Checkbox
                              id={`group-${index}`}
                              checked={isGroupChecked(group.fields)}
                              onCheckedChange={(checked) => toggleGroupFields(group.fields, !!checked)}
                              ref={inputRef as any}
                            />
                          )
                        })()}
                        <Label htmlFor={`group-${index}`} className="text-base font-medium">
                          Select All {group.name} Fields
                        </Label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                        {group.fields.map((field) => (
                          <div className="flex items-center space-x-2" key={field.id}>
                            <Checkbox
                              id={`export-${field.id}`}
                              checked={selectedExportFields.includes(field.id)}
                              onCheckedChange={() => toggleExportField(field.id)}
                            />
                            <Label htmlFor={`export-${field.id}`}>{field.label}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
                <DialogFooter className="mt-4">
                  <div className="mr-auto text-sm text-muted-foreground">
                    {selectedExportFields.length} fields selected
                  </div>
                  <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setExportDialogOpen(false)
                      setEmailDialogOpen(true)
                    }}
                    disabled={selectedExportFields.length === 0}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Export
                  </Button>
                  <Button onClick={handleExport} disabled={selectedExportFields.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => setEmailDialogOpen(true)}>
              <Mail className="mr-2 h-4 w-4" />
              Email Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or admission number..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSEN} onValueChange={setSelectedSEN}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Special Needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="yes">SEN Students</SelectItem>
                  <SelectItem value="no">Non-SEN Students</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedClass("")
                  setSelectedSection("")
                  setSelectedYear("")
                  setSelectedSEN("")
                  setSortConfig(null)
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedStudents.length === sortedStudents.length && sortedStudents.length > 0}
                      onCheckedChange={toggleAllStudentsSelection}
                      aria-label="Select all"
                      className="translate-y-[2px]"
                    />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("fullName")}>
                      Student
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("admissionNumber")}>
                      Admission #
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("class")}>
                      Class
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>SEN Status</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("birthdate")}>
                      Birthdate
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Parent Details</TableHead>
                  <TableHead>Emergency Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents.length > 0 ? (
                  sortedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudentSelection(student.id)}
                          aria-label={`Select ${student.fullName}`}
                          className="translate-y-[2px]"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.fullName} />
                            <AvatarFallback>{student.fullName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {student.fullName}
                        </div>
                      </TableCell>
                      <TableCell>{student.admissionNumber}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.yearOfAdmission}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        {student.specialNeeds ? (
                          <Badge className="bg-warning-light text-warning">SEN</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(student.birthdate)}</TableCell>
                      <TableCell>{student.age} years</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {student.parents.father && (
                            <div className="text-xs">
                              <span className="font-medium">Father:</span> {student.parents.father.name}
                            </div>
                          )}
                          {student.parents.mother && (
                            <div className="text-xs">
                              <span className="font-medium">Mother:</span> {student.parents.mother.name}
                            </div>
                          )}
                          {student.parents.guardian && (
                            <div className="text-xs">
                              <span className="font-medium">Guardian:</span> {student.parents.guardian.name}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="text-xs">
                            <span className="font-medium">{student.emergencyContact.name}</span>
                          </div>
                          <div className="text-xs">{student.emergencyContact.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => viewStudentDetails(student)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => exportStudentDetails(student)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={13} className="h-24 text-center">
                      No students found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{sortedStudents.length}</span> of{" "}
              <span className="font-medium">{studentData.length}</span> students
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
            <DialogDescription>Detailed information about {selectedStudent?.fullName}</DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} alt={selectedStudent.fullName} />
                  <AvatarFallback className="text-xl">{selectedStudent.fullName.substring(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{selectedStudent.fullName}</h2>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline">{selectedStudent.admissionNumber}</Badge>
                    <Badge variant="outline">
                      {selectedStudent.class} - Section {selectedStudent.section}
                    </Badge>
                    {selectedStudent.specialNeeds && (
                      <Badge className="bg-warning-light text-warning">Special Educational Needs</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="personal">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="personal">
                    <UserRound className="mr-2 h-4 w-4" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="parents">
                    <UserRound className="mr-2 h-4 w-4" />
                    Parents & Contacts
                  </TabsTrigger>
                  <TabsTrigger value="medical">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Medical Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p>{selectedStudent.fullName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Admission Number</p>
                      <p>{selectedStudent.admissionNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p>{selectedStudent.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Year of Admission</p>
                      <p>{selectedStudent.yearOfAdmission}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Class</p>
                      <p>{selectedStudent.class}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Section</p>
                      <p>{selectedStudent.section}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p>{formatDate(selectedStudent.birthdate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p>{selectedStudent.age} years</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p>{selectedStudent.address}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Special Educational Needs</p>
                      <p>{selectedStudent.specialNeeds ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parents" className="space-y-6 pt-4">
                  {selectedStudent.parents.father && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Father's Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{selectedStudent.parents.father.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{selectedStudent.parents.father.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{selectedStudent.parents.father.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                          <p>{selectedStudent.parents.father.occupation}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStudent.parents.mother && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Mother's Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{selectedStudent.parents.mother.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{selectedStudent.parents.mother.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{selectedStudent.parents.mother.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                          <p>{selectedStudent.parents.mother.occupation}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStudent.parents.guardian && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Guardian's Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{selectedStudent.parents.guardian.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Relationship</p>
                          <p>{selectedStudent.parents.guardian.relationship}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{selectedStudent.parents.guardian.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{selectedStudent.parents.guardian.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                          <p>{selectedStudent.parents.guardian.occupation}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                        <p>{selectedStudent.emergencyContact.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Relationship</p>
                        <p>{selectedStudent.emergencyContact.relationship}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>{selectedStudent.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
                      <p>{selectedStudent.bloodGroup}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Medical Conditions</p>
                      <p>{selectedStudent.medicalConditions}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                      <p>{selectedStudent.allergies}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Special Educational Needs</p>
                      <p>{selectedStudent.specialNeeds ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => exportStudentDetails(selectedStudent)}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Export Dialog */}
      <EmailExportDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        data={prepareDataForEmail()}
        selectedFields={selectedExportFields}
        administrators={administrators}
        filename={`student_information_${new Date().toISOString().split("T")[0]}`}
        recordCount={sortedStudents.length}
        onSuccess={() => setEmailDialogOpen(false)}
      />
    </div>
  )
}