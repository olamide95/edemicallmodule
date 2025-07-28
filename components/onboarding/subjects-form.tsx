"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [subjects, setSubjects] = useState<Subject[]>(schoolData.subjects || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Get real data from schoolData
  const classes = schoolData.classes || []
  const employees = schoolData.employees || []

  // Excel table columns for bulk import
  const subjectColumns = [
    { id: "code", name: "Subject Code", visible: true },
    { id: "name", name: "Subject Name", visible: true },
    { id: "class", name: "Class", visible: true },
    { id: "section", name: "Section", visible: true },
    { id: "teacher", name: "Teacher", visible: true },
    { id: "assistantTeacher", name: "Assistant Teacher", visible: true },
  ]

  // Load subjects from context
  useEffect(() => {
    setIsMounted(true)
    setSubjects(schoolData.subjects || [])
  }, [schoolData.subjects])

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    const updatedSubjects = [...subjects]
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value }
    setSubjects(updatedSubjects)
    updateSchoolData({ subjects: updatedSubjects })
  }

  const addSubject = () => {
    const newSubjects = [
      ...subjects,
      {
        code: "",
        name: "",
        class: classes.length > 0 ? classes[0].name : "",
        section: "",
        teacher: "",
        assistantTeacher: "",
      },
    ]
    setSubjects(newSubjects)
    updateSchoolData({ subjects: newSubjects })
  }

  const removeSubject = (index: number) => {
    const updatedSubjects = [...subjects]
    updatedSubjects.splice(index, 1)
    setSubjects(updatedSubjects)
    updateSchoolData({ subjects: updatedSubjects })
  }

  // Handle Excel data changes
  const handleExcelDataChange = (newData: any[]) => {
    setSubjects(newData)
    updateSchoolData({ subjects: newData })
    toast({
      title: "Success",
      description: "Subjects data updated",
    })
  }

  // Get unique classes from school data
  const getUniqueClasses = () => {
    return [...new Set(classes.map(cls => cls.name))]
  }

  // Get sections for a specific class
  const getSectionsForClass = (className: string) => {
    const classData = classes.find(c => c.name === className)
    if (!classData) return []
    return classData.sections.map(section => section.name)
  }

  // Get teachers (filter employees by teaching roles)
  const getTeachers = () => {
    return employees
      .filter(emp => emp.department === "teaching" || emp.department === "academic")
      .map(emp => ({
        value: emp.id || emp.name || `teacher-${emp.email}`, // Ensure non-empty value
        label: emp.name
      }))
  }

  if (!isMounted) return null

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
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Subject Code</label>
                    <input
                      value={subject.code}
                      onChange={(e) => handleChange(index, "code", e.target.value)}
                      placeholder="Enter subject code"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Subject Name</label>
                    <input
                      value={subject.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="Enter subject name"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Class</label>
                    <Select
                      value={subject.class}
                      onValueChange={(value) => {
                        handleChange(index, "class", value)
                        handleChange(index, "section", "") // Reset section when class changes
                      }}
                      disabled={isLoading || classes.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {getUniqueClasses().length > 0 ? (
                          getUniqueClasses().map((cls, i) => (
                            <SelectItem key={i} value={cls || `class-${i}`}> {/* Ensure non-empty value */}
                              {cls}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-classes" disabled> {/* Changed from empty string */}
                            No classes available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Section</label>
                    <Select
                      value={subject.section}
                      onValueChange={(value) => handleChange(index, "section", value)}
                      disabled={!subject.class || isLoading || getSectionsForClass(subject.class).length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {subject.class ? (
                          getSectionsForClass(subject.class).length > 0 ? (
                            getSectionsForClass(subject.class).map((section, i) => (
                              <SelectItem key={i} value={section || `section-${i}`}> {/* Ensure non-empty value */}
                                {section}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-sections" disabled> {/* Changed from empty string */}
                              No sections available for this class
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem value="select-class-first" disabled> {/* Changed from empty string */}
                            Select a class first
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Teacher</label>
                    <Select
                      value={subject.teacher}
                      onValueChange={(value) => handleChange(index, "teacher", value)}
                      disabled={isLoading || employees.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeachers().length > 0 ? (
                          getTeachers().map((teacher, i) => (
                            <SelectItem key={i} value={teacher.value}> {/* Already ensured non-empty */}
                              {teacher.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-teachers" disabled> {/* Changed from empty string */}
                            No teachers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Assistant Teacher</label>
                    <Select
                      value={subject.assistantTeacher}
                      onValueChange={(value) => handleChange(index, "assistantTeacher", value)}
                      disabled={isLoading || employees.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select assistant teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeachers().length > 0 ? (
                          getTeachers().map((teacher, i) => (
                            <SelectItem key={i} value={teacher.value}> {/* Already ensured non-empty */}
                              {teacher.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-assistants" disabled> {/* Changed from empty string */}
                            No teachers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
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
            <p className="text-sm text-secondary">
              Use the Excel-like interface below to paste or enter subject data.
            </p>
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