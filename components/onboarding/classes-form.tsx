"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
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
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isSectionDeleting, setIsSectionDeleting] = useState<string | null>(null)

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

  // Load classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/classes')
        if (response.success && response.data) {
          setClasses(response.data)
          updateSchoolData({ classes: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch classes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchClasses()
  }, [])

  const handleClassChange = (index: number, field: keyof Class, value: string) => {
    const updatedClasses = [...classes]
    updatedClasses[index] = { ...updatedClasses[index], [field]: value }
    setClasses(updatedClasses)
  }

  const handleSectionChange = (classIndex: number, sectionIndex: number, field: keyof ClassSection, value: string) => {
    const updatedClasses = [...classes]
    updatedClasses[classIndex].sections[sectionIndex] = {
      ...updatedClasses[classIndex].sections[sectionIndex],
      [field]: value,
    }
    setClasses(updatedClasses)
  }

  const saveClass = async (index: number) => {
    const cls = classes[index]
    try {
      setIsLoading(true)
      let response
      
      if (cls.id) {
        // Update existing class
        response = await api.put(`/school-setup/class/${cls.id}`, cls)
      } else {
        // Create new class
        response = await api.post('/school-setup/class', cls)
      }

      if (response.success) {
        const updatedClasses = [...classes]
        updatedClasses[index] = response.data
        setClasses(updatedClasses)
        updateSchoolData({ classes: updatedClasses })
        toast({
          title: "Success",
          description: cls.id ? "Class updated successfully" : "Class created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save class",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveSection = async (classIndex: number, sectionIndex: number) => {
    const cls = classes[classIndex]
    const section = cls.sections[sectionIndex]
    
    try {
      setIsLoading(true)
      let response
      
      if (section.id) {
        // Update existing section
        response = await api.put(`/school-setup/class/${cls.id}/section/${section.id}`, section)
      } else {
        // Create new section
        response = await api.post(`/school-setup/class/${cls.id}/section`, section)
      }

      if (response.success) {
        const updatedClasses = [...classes]
        updatedClasses[classIndex].sections[sectionIndex] = response.data
        setClasses(updatedClasses)
        updateSchoolData({ classes: updatedClasses })
        toast({
          title: "Success",
          description: section.id ? "Section updated successfully" : "Section created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save section",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addClass = () => {
    setClasses([
      ...classes,
      {
        name: "",
        department: "",
        branch: "Head Office",
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
    ])
  }

  const removeClass = async (index: number) => {
    const cls = classes[index]
    if (!cls.id) {
      // Class not saved yet, just remove from local state
      const updatedClasses = [...classes]
      updatedClasses.splice(index, 1)
      setClasses(updatedClasses)
      updateSchoolData({ classes: updatedClasses })
      return
    }

    try {
      setIsDeleting(cls.id)
      const response = await api.delete(`/school-setup/class/${cls.id}`)
      if (response.success) {
        const updatedClasses = [...classes]
        updatedClasses.splice(index, 1)
        setClasses(updatedClasses)
        updateSchoolData({ classes: updatedClasses })
        toast({
          title: "Success",
          description: "Class deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete class",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
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

  const removeSection = async (classIndex: number, sectionIndex: number) => {
    const cls = classes[classIndex]
    const section = cls.sections[sectionIndex]
    
    if (!section.id) {
      // Section not saved yet, just remove from local state
      const updatedClasses = [...classes]
      updatedClasses[classIndex].sections.splice(sectionIndex, 1)
      setClasses(updatedClasses)
      updateSchoolData({ classes: updatedClasses })
      return
    }

    try {
      setIsSectionDeleting(section.id)
      const response = await api.delete(`/school-setup/class/${cls.id}/section/${section.id}`)
      if (response.success) {
        const updatedClasses = [...classes]
        updatedClasses[classIndex].sections.splice(sectionIndex, 1)
        setClasses(updatedClasses)
        updateSchoolData({ classes: updatedClasses })
        toast({
          title: "Success",
          description: "Section deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete section",
        variant: "destructive",
      })
    } finally {
      setIsSectionDeleting(null)
    }
  }

  // Handle Excel data changes
  const handleExcelDataChange = async (newData: any[]) => {
    try {
      setIsLoading(true)
      const response = await api.post('/school-setup/classes/bulk', newData)
      if (response.success) {
        setClasses(response.data)
        updateSchoolData({ classes: response.data })
        toast({
          title: "Success",
          description: "Classes imported successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import classes",
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
          {classes.map((cls, classIndex) => (
            <div key={classIndex} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Class</h3>
                <button
                  className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                  onClick={() => removeClass(classIndex)}
                  disabled={isDeleting === cls.id}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {isDeleting === cls.id ? "Deleting..." : "Remove Class"}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor={`class-name-${classIndex}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Class Name
                    </label>
                    <input
                      id={`class-name-${classIndex}`}
                      value={cls.name}
                      onChange={(e) => handleClassChange(classIndex, "name", e.target.value)}
                      onBlur={() => saveClass(classIndex)}
                      placeholder="Enter class name"
                      className="form-input w-full"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`department-${classIndex}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Department
                    </label>
                    <Select
                      value={cls.department}
                      onValueChange={(value) => {
                        handleClassChange(classIndex, "department", value)
                        saveClass(classIndex)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select_department">Select department</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`branch-${classIndex}`}
                      className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                    >
                      Branch
                    </label>
                    <Select
                      value={cls.branch}
                      onValueChange={(value) => {
                        handleClassChange(classIndex, "branch", value)
                        saveClass(classIndex)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select_branch">Select branch</SelectItem>
                        <SelectItem value="Head Office">Head Office</SelectItem>
                        <SelectItem value="Branch 1">Branch 1</SelectItem>
                        <SelectItem value="Branch 2">Branch 2</SelectItem>
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
                            disabled={isSectionDeleting === section.id}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {isSectionDeleting === section.id ? "Deleting..." : "Delete Section"}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`section-name-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Section Name
                          </label>
                          <input
                            id={`section-name-${classIndex}-${sectionIndex}`}
                            value={section.name}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "name", e.target.value)}
                            onBlur={() => saveSection(classIndex, sectionIndex)}
                            placeholder="Enter section name"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`capacity-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Capacity
                          </label>
                          <input
                            id={`capacity-${classIndex}-${sectionIndex}`}
                            value={section.capacity}
                            onChange={(e) => handleSectionChange(classIndex, sectionIndex, "capacity", e.target.value)}
                            onBlur={() => saveSection(classIndex, sectionIndex)}
                            placeholder="Enter capacity"
                            type="number"
                            className="form-input w-full"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`teacher-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Teacher
                          </label>
                          <Select
                            value={section.teacher}
                            onValueChange={(value) => {
                              handleSectionChange(classIndex, sectionIndex, "teacher", value)
                              saveSection(classIndex, sectionIndex)
                            }}
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select_teacher">Select teacher</SelectItem>
                              <SelectItem value="teacher1">Benney Shaw</SelectItem>
                              <SelectItem value="teacher2">John Doe</SelectItem>
                              <SelectItem value="teacher3">Jane Smith</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`assistant-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Assistant Teacher
                          </label>
                          <Select
                            value={section.assistantTeacher}
                            onValueChange={(value) => {
                              handleSectionChange(classIndex, sectionIndex, "assistantTeacher", value)
                              saveSection(classIndex, sectionIndex)
                            }}
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select assistant teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select_assistant_teacher">Select assistant teacher</SelectItem>
                              <SelectItem value="teacher1">Benney Shaw</SelectItem>
                              <SelectItem value="teacher2">John Doe</SelectItem>
                              <SelectItem value="teacher3">Jane Smith</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`building-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Building
                          </label>
                          <Select
                            value={section.building}
                            onValueChange={(value) => {
                              handleSectionChange(classIndex, sectionIndex, "building", value)
                              saveSection(classIndex, sectionIndex)
                            }}
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select building" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select_building">Select building</SelectItem>
                              <SelectItem value="building1">Main Building</SelectItem>
                              <SelectItem value="building2">Science Block</SelectItem>
                              <SelectItem value="building3">Arts Block</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`floor-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Floor
                          </label>
                          <Select
                            value={section.floor}
                            onValueChange={(value) => {
                              handleSectionChange(classIndex, sectionIndex, "floor", value)
                              saveSection(classIndex, sectionIndex)
                            }}
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select floor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select_floor">Select floor</SelectItem>
                              <SelectItem value="floor1">Ground Floor</SelectItem>
                              <SelectItem value="floor2">First Floor</SelectItem>
                              <SelectItem value="floor3">Second Floor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`wing-${classIndex}-${sectionIndex}`}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                          >
                            Wing/Room
                          </label>
                          <Select
                            value={section.wing}
                            onValueChange={(value) => {
                              handleSectionChange(classIndex, sectionIndex, "wing", value)
                              saveSection(classIndex, sectionIndex)
                            }}
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select wing/room" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="select_wing">Select wing/room</SelectItem>
                              <SelectItem value="wing1">East Wing</SelectItem>
                              <SelectItem value="wing2">West Wing</SelectItem>
                              <SelectItem value="wing3">North Wing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
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
            className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
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
            <p className="text-sm text-secondary dark:text-secondary">
              Use the Excel-like interface below to paste or enter class and section data. You can:
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