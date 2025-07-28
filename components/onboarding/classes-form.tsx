"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface ClassSection {
  id?: string
  name: string
  teacher: string
  assistantTeacher: string
  capacity: string
  building: string
  floor: string
  wing: string
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

  const handleClassChange = (index: number, field: keyof Class, value: string) => {
    const updatedClasses = [...classes]
    updatedClasses[index] = { ...updatedClasses[index], [field]: value }
    setClasses(updatedClasses)
    updateSchoolData({ classes: updatedClasses })
  }

  const handleSectionChange = (classIndex: number, sectionIndex: number, field: keyof ClassSection, value: string) => {
    const updatedClasses = [...classes]
    updatedClasses[classIndex].sections[sectionIndex] = {
      ...updatedClasses[classIndex].sections[sectionIndex],
      [field]: value,
    }
    setClasses(updatedClasses)
    updateSchoolData({ classes: updatedClasses })
  }

  const addClass = () => {
    const newClasses = [
      ...classes,
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
          },
        ],
      },
    ]
    setClasses(newClasses)
    updateSchoolData({ classes: newClasses })
  }

  const removeClass = (index: number) => {
    const updatedClasses = [...classes]
    updatedClasses.splice(index, 1)
    setClasses(updatedClasses)
    updateSchoolData({ classes: updatedClasses })
  }

  const addSection = (classIndex: number) => {
    const updatedClasses = [...classes]
    updatedClasses[classIndex].sections.push({
      name: "",
      teacher: "",
      assistantTeacher: "",
      capacity: "",
      building: "",
      floor: "",
      wing: "",
    })
    setClasses(updatedClasses)
    updateSchoolData({ classes: updatedClasses })
  }

  const removeSection = (classIndex: number, sectionIndex: number) => {
    const updatedClasses = [...classes]
    updatedClasses[classIndex].sections.splice(sectionIndex, 1)
    setClasses(updatedClasses)
    updateSchoolData({ classes: updatedClasses })
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
        wing: row.wing
      })
      
      return acc
    }, [] as Class[])

    setClasses(transformedData)
    updateSchoolData({ classes: transformedData })
    toast({
      title: "Success",
      description: "Classes data updated",
    })
  }

  // Get teachers for dropdown
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
          {classes.map((cls, classIndex) => (
            <div key={classIndex} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Class</h3>
                <button
                  className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                  onClick={() => removeClass(classIndex)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove Class
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Class Name</label>
                    <input
                      value={cls.name}
                      onChange={(e) => handleClassChange(classIndex, "name", e.target.value)}
                      placeholder="Enter class name"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Department</label>
                    <Select
                      value={cls.department}
                      onValueChange={(value) => handleClassChange(classIndex, "department", value)}
                      disabled={isLoading || departments.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.length > 0 ? (
                          departments.map((dept, i) => (
                            <SelectItem 
                              key={i} 
                              value={dept.id || dept.name || `dept-${i}`} // Ensure non-empty value
                            >
                              {dept.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-dept" disabled> {/* Changed from empty string */}
                            No departments available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Branch</label>
                    <Select
                      value={cls.branch}
                      onValueChange={(value) => handleClassChange(classIndex, "branch", value)}
                      disabled={isLoading || branches.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.length > 0 ? (
                          branches.map((branch, i) => (
                            <SelectItem 
                              key={i} 
                              value={branch.id || branch.name || `branch-${i}`} // Ensure non-empty value
                            >
                              {branch.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-branch" disabled> {/* Changed from empty string */}
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
                    <div key={sectionIndex} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium">Section {sectionIndex + 1}</h5>
                        {cls.sections.length > 1 && (
                          <button
                            className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                            onClick={() => removeSection(classIndex, sectionIndex)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete Section
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Section Name</label>
                          <input
                            value={section.name}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "name", e.target.value)}
                            placeholder="Enter section name"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Capacity</label>
                          <input
                            value={section.capacity}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "capacity", e.target.value)}
                            placeholder="Enter capacity"
                            type="number"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Teacher</label>
                          <Select
                            value={section.teacher}
                            onValueChange={(value) => handleSectionChange(classIndex, sectionIndex, "teacher", value)}
                            disabled={isLoading || employees.length === 0}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {getTeachers().length > 0 ? (
                                getTeachers().map((teacher, i) => (
                                  <SelectItem 
                                    key={i} 
                                    value={teacher.value} // Already ensured non-empty in getTeachers()
                                  >
                                    {teacher.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-teacher" disabled> {/* Changed from empty string */}
                                  No teachers available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Assistant Teacher</label>
                          <Select
                            value={section.assistantTeacher}
                            onValueChange={(value) => handleSectionChange(classIndex, sectionIndex, "assistantTeacher", value)}
                            disabled={isLoading || employees.length === 0}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select assistant teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {getTeachers().length > 0 ? (
                                getTeachers().map((teacher, i) => (
                                  <SelectItem 
                                    key={i} 
                                    value={teacher.value} // Already ensured non-empty in getTeachers()
                                  >
                                    {teacher.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-assistant" disabled> {/* Changed from empty string */}
                                  No teachers available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Building</label>
                          <input
                            value={section.building}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "building", e.target.value)}
                            placeholder="Enter building"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Floor</label>
                          <input
                            value={section.floor}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "floor", e.target.value)}
                            placeholder="Enter floor"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Wing/Room</label>
                          <input
                            value={section.wing}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "wing", e.target.value)}
                            placeholder="Enter wing/room"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
                    onClick={() => addSection(classIndex)}
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
            onClick={addClass}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Class
          </button>
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
                  teacher: section.teacher,
                  assistantTeacher: section.assistantTeacher,
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