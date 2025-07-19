"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Parent {
  name: string
  type: string
  email: string
  phone: string
}

interface Student {
  id?: string
  name: string
  admissionNumber: string
  class: string
  section: string
  parents: Parent[]
}

export function StudentsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Excel table columns for bulk import
  const studentColumns = [
    { id: "admissionNumber", name: "Admission Number", visible: true },
    { id: "name", name: "Student Name", visible: true },
    { id: "class", name: "Class", visible: true },
    { id: "section", name: "Section", visible: true },
    { id: "parent1Name", name: "Parent 1 Name", visible: true },
    { id: "parent1Email", name: "Parent 1 Email", visible: true },
    { id: "parent1Phone", name: "Parent 1 Phone", visible: true },
    { id: "parent1Type", name: "Parent 1 Type", visible: true },
    { id: "parent2Name", name: "Parent 2 Name", visible: true },
    { id: "parent2Email", name: "Parent 2 Email", visible: true },
    { id: "parent2Phone", name: "Parent 2 Phone", visible: true },
    { id: "parent2Type", name: "Parent 2 Type", visible: true },
  ]

  // Load students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/students')
        if (response.success && response.data) {
          setStudents(response.data)
          updateSchoolData({ students: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch students",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const handleChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students]
    updatedStudents[index] = { ...updatedStudents[index], [field]: value }
    setStudents(updatedStudents)
  }

  const handleParentChange = (studentIndex: number, parentIndex: number, field: keyof Parent, value: string) => {
    const updatedStudents = [...students]
    updatedStudents[studentIndex].parents[parentIndex] = {
      ...updatedStudents[studentIndex].parents[parentIndex],
      [field]: value
    }
    setStudents(updatedStudents)
  }

  const saveStudent = async (index: number) => {
    const student = students[index]
    try {
      setIsLoading(true)
      let response
      
      if (student.id) {
        // Update existing student
        response = await api.put(`/school-setup/student/${student.id}`, student)
      } else {
        // Create new student
        response = await api.post('/school-setup/student', student)
      }

      if (response.success) {
        const updatedStudents = [...students]
        updatedStudents[index] = response.data
        setStudents(updatedStudents)
        updateSchoolData({ students: updatedStudents })
        toast({
          title: "Success",
          description: student.id ? "Student updated successfully" : "Student created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save student",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addStudent = () => {
    setStudents([
      ...students,
      {
        name: "",
        admissionNumber: "",
        class: "",
        section: "",
        parents: [
          { name: "", type: "", email: "", phone: "" },
          { name: "", type: "", email: "", phone: "" }
        ]
      },
    ])
  }

  const removeStudent = async (index: number) => {
    const student = students[index]
    if (!student.id) {
      // Student not saved yet, just remove from local state
      const updatedStudents = [...students]
      updatedStudents.splice(index, 1)
      setStudents(updatedStudents)
      updateSchoolData({ students: updatedStudents })
      return
    }

    try {
      setIsDeleting(student.id)
      const response = await api.delete(`/school-setup/student/${student.id}`)
      if (response.success) {
        const updatedStudents = [...students]
        updatedStudents.splice(index, 1)
        setStudents(updatedStudents)
        updateSchoolData({ students: updatedStudents })
        toast({
          title: "Success",
          description: "Student deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete student",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const addParent = (studentIndex: number) => {
    const updatedStudents = [...students]
    updatedStudents[studentIndex].parents.push({ name: "", type: "", email: "", phone: "" })
    setStudents(updatedStudents)
  }

  const removeParent = (studentIndex: number, parentIndex: number) => {
    const updatedStudents = [...students]
    updatedStudents[studentIndex].parents.splice(parentIndex, 1)
    setStudents(updatedStudents)
  }

  // Handle Excel data changes
  const handleExcelDataChange = async (newData: any[]) => {
    try {
      setIsLoading(true)
      const response = await api.post('/school-setup/students/bulk', newData)
      if (response.success) {
        setStudents(response.data)
        updateSchoolData({ students: response.data })
        toast({
          title: "Success",
          description: "Students imported successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import students",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6 mt-6">
          {students.map((student, index) => (
            <div key={index} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Student {index + 1}</h3>
                <button
                  className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                  onClick={() => removeStudent(index)}
                  disabled={isDeleting === student.id}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {isDeleting === student.id ? "Deleting..." : "Remove"}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor={`admission-number-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Admission Number
                    </label>
                    <input
                      id={`admission-number-${index}`}
                      value={student.admissionNumber}
                      onChange={(e) => handleChange(index, "admissionNumber", e.target.value)}
                      onBlur={() => saveStudent(index)}
                      placeholder="Enter admission number"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`student-name-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Student Name
                    </label>
                    <input
                      id={`student-name-${index}`}
                      value={student.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      onBlur={() => saveStudent(index)}
                      placeholder="Enter student name"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor={`class-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Class
                    </label>
                    <input
                      id={`class-${index}`}
                      value={student.class}
                      onChange={(e) => handleChange(index, "class", e.target.value)}
                      onBlur={() => saveStudent(index)}
                      placeholder="Enter class"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`section-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Section
                    </label>
                    <input
                      id={`section-${index}`}
                      value={student.section}
                      onChange={(e) => handleChange(index, "section", e.target.value)}
                      onBlur={() => saveStudent(index)}
                      placeholder="Enter section"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-4">Parents Information</h4>
                  {student.parents.map((parent, parentIndex) => (
                    <div key={parentIndex} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium">Parent {parentIndex + 1}</h5>
                        {student.parents.length > 1 && (
                          <button
                            className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                            onClick={() => removeParent(index, parentIndex)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove Parent
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor={`parent-name-${index}-${parentIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Name
                          </label>
                          <input
                            id={`parent-name-${index}-${parentIndex}`}
                            value={parent.name}
                            onChange={(e) => handleParentChange(index, parentIndex, "name", e.target.value)}
                            onBlur={() => saveStudent(index)}
                            placeholder="Enter parent name"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`parent-type-${index}-${parentIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Type
                          </label>
                          <select
                            id={`parent-type-${index}-${parentIndex}`}
                            value={parent.type}
                            onChange={(e) => handleParentChange(index, parentIndex, "type", e.target.value)}
                            onBlur={() => saveStudent(index)}
                            className="form-input w-full"
                            disabled={isLoading}
                          >
                            <option value="">Select type</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Guardian">Guardian</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`parent-email-${index}-${parentIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Email
                          </label>
                          <input
                            id={`parent-email-${index}-${parentIndex}`}
                            type="email"
                            value={parent.email}
                            onChange={(e) => handleParentChange(index, parentIndex, "email", e.target.value)}
                            onBlur={() => saveStudent(index)}
                            placeholder="Enter email"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`parent-phone-${index}-${parentIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Phone
                          </label>
                          <input
                            id={`parent-phone-${index}-${parentIndex}`}
                            value={parent.phone}
                            onChange={(e) => handleParentChange(index, parentIndex, "phone", e.target.value)}
                            onBlur={() => saveStudent(index)}
                            placeholder="Enter phone number"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
                    onClick={() => addParent(index)}
                    disabled={isLoading || student.parents.length >= 2}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Parent
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
            onClick={addStudent}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Student
          </button>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Bulk Import Instructions</h3>
            <p className="text-sm text-secondary dark:text-secondary">
              Use the Excel-like interface below to paste or enter student and parent data. You can:
            </p>
            <ul className="text-sm text-secondary dark:text-secondary list-disc list-inside mt-2">
              <li>Copy and paste data directly from Excel</li>
              <li>Click on cells to edit individual values</li>
              <li>Customize which columns to display</li>
              <li>Add or remove rows as needed</li>
            </ul>
          </div>

          <div className="w-full">
            <ExcelTable
              initialColumns={studentColumns}
              initialData={students.map(student => ({
                admissionNumber: student.admissionNumber,
                name: student.name,
                class: student.class,
                section: student.section,
                parent1Name: student.parents[0]?.name || "",
                parent1Email: student.parents[0]?.email || "",
                parent1Phone: student.parents[0]?.phone || "",
                parent1Type: student.parents[0]?.type || "",
                parent2Name: student.parents[1]?.name || "",
                parent2Email: student.parents[1]?.email || "",
                parent2Phone: student.parents[1]?.phone || "",
                parent2Type: student.parents[1]?.type || "",
              }))}
              onDataChange={handleExcelDataChange}
              tableName="Students"
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}