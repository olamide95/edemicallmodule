"use client"

import { useState, useContext, useEffect, useMemo, useCallback } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "../ui/button"

interface Subject {
  id?: string
  code: string
  name: string
  class: string
  section: string
  teacher: string
  assistantTeacher: string
  customTeacher?: string
  customAssistantTeacher?: string
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

  // Save to localStorage whenever subjects change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('subjects', JSON.stringify(subjects))
    }
  }, [subjects, isMounted])

  // Update context only when needed
  useEffect(() => {
    if (isMounted) {
      const currentSubjects = JSON.stringify(schoolData.subjects || [])
      const newSubjects = JSON.stringify(subjects)
      if (currentSubjects !== newSubjects) {
        updateSchoolData({ subjects })
      }
    }
  }, [subjects, isMounted, schoolData.subjects, updateSchoolData])

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    setSubjects(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addSubject = () => {
    setSubjects(prev => [
      ...prev,
      {
        code: "",
        name: "",
        class: classes.length > 0 ? classes[0].name : "",
        section: "",
        teacher: "",
        assistantTeacher: "",
        customTeacher: "",
        customAssistantTeacher: ""
      },
    ])
  }

  const removeSubject = (index: number) => {
    setSubjects(prev => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  // Handle Excel data changes
  const handleExcelDataChange = (newData: any[]) => {
    const formattedData = newData.map(subject => ({
      ...subject,
      customTeacher: subject.teacher && !getTeachers().some(t => t.value === subject.teacher) ? subject.teacher : "",
      customAssistantTeacher: subject.assistantTeacher && !getTeachers().some(t => t.value === subject.assistantTeacher) ? subject.assistantTeacher : ""
    }))
    setSubjects(formattedData)
    toast({
      title: "Success",
      description: "Subjects data updated",
    })
  }

  // Get unique classes from school data
  const getUniqueClasses = useMemo(() => {
    return [...new Set(classes.map(cls => cls.name))]
  }, [classes])

  // Get sections for a specific class
  const getSectionsForClass = useCallback((className: string) => {
    const classData = classes.find(c => c.name === className)
    if (!classData) return []
    return classData.sections.map(section => section.name)
  }, [classes])

  // Get teachers (filter employees by teaching roles)
  const getTeachers = useMemo(() => {
    return employees
      .filter(emp => emp.department === "teaching" || emp.department === "academic")
      .map(emp => ({
        value: emp.id || emp.name || `teacher-${emp.email}`,
        label: `${emp.name}${isTeacherAssigned(emp.id || emp.name) ? ' (Assigned)' : ''}`
      }))
  }, [employees, subjects])

  // Check if teacher is already assigned
  const isTeacherAssigned = useCallback((teacherId: string) => {
    return subjects.some(subject => 
      subject.teacher === teacherId || subject.assistantTeacher === teacherId
    )
  }, [subjects])

  const handleTeacherChange = (index: number, value: string) => {
    if (value === "other") {
      handleChange(index, "teacher", "other")
      handleChange(index, "customTeacher", "")
    } else {
      handleChange(index, "teacher", value)
      handleChange(index, "customTeacher", "")
    }
  }

  const handleAssistantTeacherChange = (index: number, value: string) => {
    if (value === "other") {
      handleChange(index, "assistantTeacher", "other")
      handleChange(index, "customAssistantTeacher", "")
    } else {
      handleChange(index, "assistantTeacher", value)
      handleChange(index, "customAssistantTeacher", "")
    }
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
            <Card key={index} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Subject {index + 1}</h3>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeSubject(index)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Subject Code</Label>
                    <Input
                      value={subject.code}
                      onChange={(e) => handleChange(index, "code", e.target.value)}
                      placeholder="Enter subject code"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subject Name</Label>
                    <Input
                      value={subject.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="Enter subject name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select
                      value={subject.class}
                      onValueChange={(value) => {
                        handleChange(index, "class", value)
                        handleChange(index, "section", "")
                      }}
                      disabled={isLoading || classes.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {getUniqueClasses.length > 0 ? (
                          getUniqueClasses.map((cls, i) => (
                            <SelectItem key={i} value={cls}>
                              {cls}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-classes" disabled>
                            No classes available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Section</Label>
                    <Select
                      value={subject.section}
                      onValueChange={(value) => handleChange(index, "section", value)}
                      disabled={!subject.class || isLoading || getSectionsForClass(subject.class).length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {subject.class ? (
                          getSectionsForClass(subject.class).length > 0 ? (
                            getSectionsForClass(subject.class).map((section, i) => (
                              <SelectItem key={i} value={section}>
                                {section}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-sections" disabled>
                              No sections available for this class
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem value="select-class-first" disabled>
                            Select a class first
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Teacher</Label>
                    <Select
                      value={subject.teacher}
                      onValueChange={(value) => handleTeacherChange(index, value)}
                      disabled={isLoading || employees.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeachers.length > 0 ? (
                          <>
                            {getTeachers.map((teacher, i) => (
                              <SelectItem 
                                key={i} 
                                value={teacher.value}
                                disabled={isTeacherAssigned(teacher.value) && teacher.value !== subject.teacher}
                              >
                                {teacher.label}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Other (Please specify)</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="no-teachers" disabled>
                            No teachers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>

                    {subject.teacher === "other" && (
                      <div className="mt-2">
                        <Input
                          value={subject.customTeacher || ""}
                          onChange={(e) => handleChange(index, "customTeacher", e.target.value)}
                          placeholder="Enter teacher name"
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Assistant Teacher</Label>
                    <Select
                      value={subject.assistantTeacher}
                      onValueChange={(value) => handleAssistantTeacherChange(index, value)}
                      disabled={isLoading || employees.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assistant teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeachers.length > 0 ? (
                          <>
                            {getTeachers.map((teacher, i) => (
                              <SelectItem 
                                key={i} 
                                value={teacher.value}
                                disabled={isTeacherAssigned(teacher.value) && teacher.value !== subject.assistantTeacher}
                              >
                                {teacher.label}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Other (Please specify)</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="no-assistants" disabled>
                            No teachers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>

                    {subject.assistantTeacher === "other" && (
                      <div className="mt-2">
                        <Input
                          value={subject.customAssistantTeacher || ""}
                          onChange={(e) => handleChange(index, "customAssistantTeacher", e.target.value)}
                          placeholder="Enter assistant teacher name"
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button 
            variant="outline" 
            onClick={addSubject} 
            className="w-full"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Subject
          </Button>
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