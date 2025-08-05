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
import { Button } from "@/components/ui/button"

interface ClassSection {
  id?: string
  name: string
  teacher: string
  assistantTeacher: string
  capacity: string
  building: string
  floor: string
  wing: string
  customTeacher?: string
  customAssistantTeacher?: string
}

interface Class {
  id?: string
  name: string
  department: string
  branch: string
  sections: ClassSection[]
}

export function ClassesForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [classes, setClasses] = useState<Class[]>(schoolData.classes || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Get real data from schoolData
  const branches = schoolData.branches || []
  const departments = schoolData.departments || []
  const employees = schoolData.employees || []
  const subjects = schoolData.subjects || []

  // Excel table columns for bulk import
  const classColumns = [
    { id: "className", name: "Class Name", visible: true },
    { id: "sectionName", name: "Section Name", visible: true },
    { id: "department", name: "Department", visible: true },
    { id: "branch", name: "Branch", visible: true },
    { id: "capacity", name: "Capacity", visible: true },
    { id: "teacher", name: "Class Teacher", visible: true },
    { id: "assistantTeacher", name: "Assistant Teacher", visible: true },
    { id: "building", name: "Building", visible: true },
    { id: "floor", name: "Floor", visible: true },
    { id: "wing", name: "Wing", visible: true },
  ]

  // Load classes from context
  useEffect(() => {
    setIsMounted(true)
    setClasses(schoolData.classes || [])
  }, [schoolData.classes])

  // Save to localStorage whenever classes change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('classes', JSON.stringify(classes))
    }
  }, [classes, isMounted])

  // Update context only when needed
  useEffect(() => {
    if (isMounted) {
      const currentClasses = JSON.stringify(schoolData.classes || [])
      const newClasses = JSON.stringify(classes)
      if (currentClasses !== newClasses) {
        updateSchoolData({ classes })
      }
    }
  }, [classes, isMounted, schoolData.classes, updateSchoolData])

  const handleClassChange = (index: number, field: keyof Class, value: string) => {
    setClasses(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleSectionChange = (classIndex: number, sectionIndex: number, field: keyof ClassSection, value: string) => {
    setClasses(prev => {
      const updated = [...prev]
      updated[classIndex].sections[sectionIndex] = {
        ...updated[classIndex].sections[sectionIndex],
        [field]: value
      }
      return updated
    })
  }

  const addClass = () => {
    setClasses(prev => [
      ...prev,
      {
        name: "",
        department: "",
        branch: branches.length > 0 ? branches[0].id || branches[0].name : "",
        sections: [
          {
            name: "",
            teacher: "",
            assistantTeacher: "",
            capacity: "",
            building: "",
            floor: "",
            wing: "",
            customTeacher: "",
            customAssistantTeacher: ""
          }
        ]
      }
    ])
  }

  const removeClass = (index: number) => {
    setClasses(prev => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  const addSection = (classIndex: number) => {
    setClasses(prev => {
      const updated = [...prev]
      updated[classIndex].sections.push({
        name: "",
        teacher: "",
        assistantTeacher: "",
        capacity: "",
        building: "",
        floor: "",
        wing: "",
        customTeacher: "",
        customAssistantTeacher: ""
      })
      return updated
    })
  }

  const removeSection = (classIndex: number, sectionIndex: number) => {
    setClasses(prev => {
      const updated = [...prev]
      updated[classIndex].sections.splice(sectionIndex, 1)
      return updated
    })
  }

  // Handle Excel data changes
  const handleExcelDataChange = (newData: any[]) => {
    const transformedData = newData.reduce((acc, row) => {
      let classIndex = acc.findIndex(c => c.name === row.className)
      if (classIndex === -1) {
        acc.push({
          name: row.className,
          department: row.department,
          branch: row.branch,
          sections: []
        })
        classIndex = acc.length - 1
      }
      
      acc[classIndex].sections.push({
        name: row.sectionName,
        teacher: row.teacher,
        assistantTeacher: row.assistantTeacher,
        capacity: row.capacity,
        building: row.building,
        floor: row.floor,
        wing: row.wing,
        customTeacher: row.teacher && !getTeachers().some(t => t.value === row.teacher) ? row.teacher : "",
        customAssistantTeacher: row.assistantTeacher && !getTeachers().some(t => t.value === row.assistantTeacher) ? row.assistantTeacher : ""
      })
      
      return acc
    }, [] as Class[])

    setClasses(transformedData)
    toast({
      title: "Success",
      description: "Classes data updated",
    })
  }

  // Get teachers for dropdown
  const getTeachers = useMemo(() => {
    return employees
      .filter(emp => emp.department === "teaching" || emp.department === "academic")
      .map(emp => ({
        value: emp.id || emp.name || `teacher-${emp.email}`,
        label: `${emp.name}${isTeacherAssigned(emp.id || emp.name) ? ' (Assigned)' : ''}`
      }))
  }, [employees, classes, subjects])

  // Check if teacher is already assigned
  const isTeacherAssigned = useCallback((teacherId: string) => {
    // Check in classes
    const isAssignedInClasses = classes.some(cls => 
      cls.sections.some(section => 
        section.teacher === teacherId || section.assistantTeacher === teacherId
      )
    )
    
    // Check in subjects
    const isAssignedInSubjects = subjects.some(subject => 
      subject.teacher === teacherId || subject.assistantTeacher === teacherId
    )
    
    return isAssignedInClasses || isAssignedInSubjects
  }, [classes, subjects])

  const handleTeacherChange = (classIndex: number, sectionIndex: number, value: string) => {
    if (value === "other") {
      handleSectionChange(classIndex, sectionIndex, "teacher", "other")
      handleSectionChange(classIndex, sectionIndex, "customTeacher", "")
    } else {
      handleSectionChange(classIndex, sectionIndex, "teacher", value)
      handleSectionChange(classIndex, sectionIndex, "customTeacher", "")
    }
  }

  const handleAssistantTeacherChange = (classIndex: number, sectionIndex: number, value: string) => {
    if (value === "other") {
      handleSectionChange(classIndex, sectionIndex, "assistantTeacher", "other")
      handleSectionChange(classIndex, sectionIndex, "customAssistantTeacher", "")
    } else {
      handleSectionChange(classIndex, sectionIndex, "assistantTeacher", value)
      handleSectionChange(classIndex, sectionIndex, "customAssistantTeacher", "")
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
          {classes.map((cls, classIndex) => (
            <Card key={classIndex} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Class</h3>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeClass(classIndex)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove Class
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Class Name</Label>
                    <Input
                      value={cls.name}
                      onChange={(e) => handleClassChange(classIndex, "name", e.target.value)}
                      placeholder="Enter class name"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select
                      value={cls.department}
                      onValueChange={(value) => handleClassChange(classIndex, "department", value)}
                      disabled={isLoading || departments.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.length > 0 ? (
                          departments.map((dept, i) => (
                            <SelectItem key={i} value={dept.id || dept.name || `dept-${i}`}>
                              {dept.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-dept" disabled>
                            No departments available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Select
                      value={cls.branch}
                      onValueChange={(value) => handleClassChange(classIndex, "branch", value)}
                      disabled={isLoading || branches.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.length > 0 ? (
                          branches.map((branch, i) => (
                            <SelectItem key={i} value={branch.id || branch.name || `branch-${i}`}>
                              {branch.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-branch" disabled>
                            No branches available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-4">Sections</h4>

                  {cls.sections.map((section, sectionIndex) => (
                    <Card key={sectionIndex} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium">Section {sectionIndex + 1}</h5>
                        {cls.sections.length > 1 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSection(classIndex, sectionIndex)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete Section
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Section Name</Label>
                          <Input
                            value={section.name}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "name", e.target.value)}
                            placeholder="Enter section name"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Capacity</Label>
                          <Input
                            value={section.capacity}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "capacity", e.target.value)}
                            placeholder="Enter capacity"
                            type="number"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Teacher</Label>
                          <Select
                            value={section.teacher}
                            onValueChange={(value) => handleTeacherChange(classIndex, sectionIndex, value)}
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
                                      disabled={isTeacherAssigned(teacher.value) && teacher.value !== section.teacher}
                                    >
                                      {teacher.label}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="other">Other (Please specify)</SelectItem>
                                </>
                              ) : (
                                <SelectItem value="no-teacher" disabled>
                                  No teachers available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>

                          {section.teacher === "other" && (
                            <div className="mt-2">
                              <Input
                                value={section.customTeacher || ""}
                                onChange={(e) => handleSectionChange(classIndex, sectionIndex, "customTeacher", e.target.value)}
                                placeholder="Enter teacher name"
                                disabled={isLoading}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Assistant Teacher</Label>
                          <Select
                            value={section.assistantTeacher}
                            onValueChange={(value) => handleAssistantTeacherChange(classIndex, sectionIndex, value)}
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
                                      disabled={isTeacherAssigned(teacher.value) && teacher.value !== section.assistantTeacher}
                                    >
                                      {teacher.label}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="other">Other (Please specify)</SelectItem>
                                </>
                              ) : (
                                <SelectItem value="no-assistant" disabled>
                                  No teachers available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>

                          {section.assistantTeacher === "other" && (
                            <div className="mt-2">
                              <Input
                                value={section.customAssistantTeacher || ""}
                                onChange={(e) => handleSectionChange(classIndex, sectionIndex, "customAssistantTeacher", e.target.value)}
                                placeholder="Enter assistant teacher name"
                                disabled={isLoading}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Building</Label>
                          <Input
                            value={section.building}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "building", e.target.value)}
                            placeholder="Enter building"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Floor</Label>
                          <Input
                            value={section.floor}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "floor", e.target.value)}
                            placeholder="Enter floor"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Wing/Room</Label>
                          <Input
                            value={section.wing}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "wing", e.target.value)}
                            placeholder="Enter wing/room"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addSection(classIndex)}
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={addClass}
            className="w-full"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Class
          </Button>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Bulk Import Instructions</h3>
            <p className="text-sm text-secondary">
              Use the Excel-like interface below to paste or enter class and section data.
            </p>
          </div>

          <div className="w-full">
            <ExcelTable
              initialColumns={classColumns}
              initialData={classes.flatMap(cls => 
                cls.sections.map(section => ({
                  className: cls.name,
                  sectionName: section.name,
                  department: cls.department,
                  branch: cls.branch,
                  capacity: section.capacity,
                  teacher: section.teacher === "other" ? section.customTeacher : section.teacher,
                  assistantTeacher: section.assistantTeacher === "other" ? section.customAssistantTeacher : section.assistantTeacher,
                  building: section.building,
                  floor: section.floor,
                  wing: section.wing
                }))
              )}
              onDataChange={handleExcelDataChange}
              tableName="Classes & Sections"
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}