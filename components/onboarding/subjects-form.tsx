"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Subject {
  id?: string
  code: string
  name: string
  class: string
  section: string
  teacher: string
  assistantTeacher: string
}

export function SubjectsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Excel table columns for bulk import
  const subjectColumns = [
    { id: "code", name: "Subject Code", visible: true },
    { id: "name", name: "Subject Name", visible: true },
    { id: "class", name: "Class", visible: true },
    { id: "section", name: "Section", visible: true },
    { id: "teacher", name: "Teacher", visible: true },
    { id: "assistantTeacher", name: "Assistant Teacher", visible: true },
  ]

  // Load subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/subjects')
        if (response.success && response.data) {
          setSubjects(response.data)
          updateSchoolData({ subjects: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch subjects",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    const updatedSubjects = [...subjects]
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value }
    setSubjects(updatedSubjects)
  }

  const saveSubject = async (index: number) => {
    const subject = subjects[index]
    try {
      setIsLoading(true)
      let response
      
      if (subject.id) {
        // Update existing subject
        response = await api.put(`/school-setup/subject/${subject.id}`, subject)
      } else {
        // Create new subject
        response = await api.post('/school-setup/subject', subject)
      }

      if (response.success) {
        const updatedSubjects = [...subjects]
        updatedSubjects[index] = response.data
        setSubjects(updatedSubjects)
        updateSchoolData({ subjects: updatedSubjects })
        toast({
          title: "Success",
          description: subject.id ? "Subject updated successfully" : "Subject created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save subject",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        code: "",
        name: "",
        class: "",
        section: "",
        teacher: "",
        assistantTeacher: "",
      },
    ])
  }

  const removeSubject = async (index: number) => {
    const subject = subjects[index]
    if (!subject.id) {
      // Subject not saved yet, just remove from local state
      const updatedSubjects = [...subjects]
      updatedSubjects.splice(index, 1)
      setSubjects(updatedSubjects)
      updateSchoolData({ subjects: updatedSubjects })
      return
    }

    try {
      setIsDeleting(subject.id)
      const response = await api.delete(`/school-setup/subject/${subject.id}`)
      if (response.success) {
        const updatedSubjects = [...subjects]
        updatedSubjects.splice(index, 1)
        setSubjects(updatedSubjects)
        updateSchoolData({ subjects: updatedSubjects })
        toast({
          title: "Success",
          description: "Subject deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete subject",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  // Handle Excel data changes
  const handleExcelDataChange = async (newData: any[]) => {
    try {
      setIsLoading(true)
      const response = await api.post('/school-setup/subjects/bulk', newData)
      if (response.success) {
        setSubjects(response.data)
        updateSchoolData({ subjects: response.data })
        toast({
          title: "Success",
          description: "Subjects imported successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import subjects",
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
          {subjects.map((subject, index) => (
            <div key={index} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Subject {index + 1}</h3>
                <button
                  className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                  onClick={() => removeSubject(index)}
                  disabled={isDeleting === subject.id}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {isDeleting === subject.id ? "Deleting..." : "Remove"}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor={`subject-code-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Subject Code
                    </label>
                    <input
                      id={`subject-code-${index}`}
                      value={subject.code}
                      onChange={(e) => handleChange(index, "code", e.target.value)}
                      onBlur={() => saveSubject(index)}
                      placeholder="Enter subject code"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`subject-name-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Subject Name
                    </label>
                    <input
                      id={`subject-name-${index}`}
                      value={subject.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      onBlur={() => saveSubject(index)}
                      placeholder="Enter subject name"
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
                    <Select
                      value={subject.class}
                      onValueChange={(value) => {
                        handleChange(index, "class", value)
                        saveSubject(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class1">Class 1</SelectItem>
                        <SelectItem value="class2">Class 2</SelectItem>
                        <SelectItem value="class3">Class 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`section-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Section
                    </label>
                    <Select
                      value={subject.section}
                      onValueChange={(value) => {
                        handleChange(index, "section", value)
                        saveSubject(index)
                      }}
                      disabled={!subject.class || isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor={`teacher-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Teacher
                    </label>
                    <Select
                      value={subject.teacher}
                      onValueChange={(value) => {
                        handleChange(index, "teacher", value)
                        saveSubject(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher1">Benney Shaw</SelectItem>
                        <SelectItem value="teacher2">John Doe</SelectItem>
                        <SelectItem value="teacher3">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`assistant-${index}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Assistant Teacher
                    </label>
                    <Select
                      value={subject.assistantTeacher}
                      onValueChange={(value) => {
                        handleChange(index, "assistantTeacher", value)
                        saveSubject(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select assistant teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher1">Benney Shaw</SelectItem>
                        <SelectItem value="teacher2">John Doe</SelectItem>
                        <SelectItem value="teacher3">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
            onClick={addSubject}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Subject
          </button>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Bulk Import Instructions</h3>
            <p className="text-sm text-secondary dark:text-secondary">
              Use the Excel-like interface below to paste or enter subject data. You can:
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
              initialColumns={subjectColumns}
              initialData={subjects}
              onDataChange={handleExcelDataChange}
              tableName="Subjects"
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}