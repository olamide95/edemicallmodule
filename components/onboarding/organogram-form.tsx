"use client"

import { useState, useContext, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { OrganogramVisualization } from "@/components/onboarding/organogram-visualization"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Department {
  id: string
  name: string
  isAcademic: boolean
  type: "parent" | "department" | "sub" | "class"
  parentDepartment: string | null
}

export function OrganogramForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Load departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/departments')
        if (response.success && response.data) {
          setDepartments(response.data)
          updateSchoolData({ departments: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch departments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleChange = (index: number, field: keyof Department, value: any) => {
    const updatedDepartments = [...departments]
    updatedDepartments[index] = { ...updatedDepartments[index], [field]: value }
    setDepartments(updatedDepartments)
  }

  const saveDepartment = async (index: number) => {
    const department = departments[index]
    try {
      setIsLoading(true)
      let response
      
      if (department.id) {
        // Update existing department
        response = await api.put(`/school-setup/department/${department.id}`, department)
      } else {
        // Create new department
        response = await api.post('/school-setup/department', department)
      }

      if (response.success) {
        const updatedDepartments = [...departments]
        updatedDepartments[index] = response.data
        setDepartments(updatedDepartments)
        updateSchoolData({ departments: updatedDepartments })
        toast({
          title: "Success",
          description: department.id ? "Department updated successfully" : "Department created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save department",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addDepartment = () => {
    setDepartments([
      ...departments,
      {
        id: `temp-${Date.now()}`,
        name: "",
        isAcademic: false,
        type: "department",
        parentDepartment: null,
      },
    ])
  }

  const removeDepartment = async (index: number) => {
    const department = departments[index]
    if (!department.id || department.id.startsWith('temp-')) {
      // Department not saved yet, just remove from local state
      const updatedDepartments = [...departments]
      updatedDepartments.splice(index, 1)
      setDepartments(updatedDepartments)
      updateSchoolData({ departments: updatedDepartments })
      return
    }

    try {
      setIsDeleting(department.id)
      const response = await api.delete(`/school-setup/department/${department.id}`)
      if (response.success) {
        const updatedDepartments = [...departments]
        updatedDepartments.splice(index, 1)
        setDepartments(updatedDepartments)
        updateSchoolData({ departments: updatedDepartments })
        toast({
          title: "Success",
          description: "Department deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete department",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const getParentDepartments = () => {
    return departments.filter((dept) => dept.type === "parent" || dept.type === "department")
  }

  return (
    <div className="space-y-6">
      <div className="bg-card dark:bg-card-dark p-4 rounded-md border border-border mb-6">
        <h3 className="font-medium mb-2">Organogram Structure</h3>
        <p className="text-sm text-secondary dark:text-secondary">
          Create your school's organizational structure. Academic departments can have classes, while non-academic
          departments can have sub-departments.
        </p>
      </div>

      {/* Organogram Visualization */}
      <div className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider mb-6">
        <h3 className="text-lg font-medium mb-4">Current Organogram</h3>
        <OrganogramVisualization departments={departments} />
      </div>

      {departments.map((department, index) => (
        <div key={index} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {department.type === "parent"
                ? "Parent Department"
                : department.type === "department"
                  ? "Department"
                  : department.type === "sub"
                    ? "Sub Department"
                    : "Class"}
            </h3>
            <button
              className="bg-error text-white p-2 rounded-md flex items-center text-sm"
              onClick={() => removeDepartment(index)}
              disabled={isDeleting === department.id}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting === department.id ? "Deleting..." : "Remove"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`dept-name-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Department Name
                </label>
                <input
                  id={`dept-name-${index}`}
                  value={department.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  onBlur={() => saveDepartment(index)}
                  placeholder="Enter department name"
                  className="form-input w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`dept-type-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Department Type
                </label>
                <select
                  id={`dept-type-${index}`}
                  value={department.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                  onBlur={() => saveDepartment(index)}
                  className="form-input w-full"
                  disabled={isLoading}
                >
                  <option value="parent">Parent Department</option>
                  <option value="department">Department</option>
                  <option value="sub">Sub Department</option>
                  <option value="class">Class</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`academic-${index}`}
                checked={department.isAcademic}
                onChange={(e) => {
                  handleChange(index, "isAcademic", e.target.checked)
                  saveDepartment(index)
                }}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                disabled={isLoading}
              />
              <label
                htmlFor={`academic-${index}`}
                className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Academic Department
              </label>
            </div>

            {(department.type === "department" || department.type === "sub" || department.type === "class") && (
              <div className="space-y-2">
                <label
                  htmlFor={`parent-dept-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Parent Department
                </label>
                <select
                  id={`parent-dept-${index}`}
                  value={department.parentDepartment || ""}
                  onChange={(e) => {
                    handleChange(index, "parentDepartment", e.target.value)
                    saveDepartment(index)
                  }}
                  className="form-input w-full"
                  disabled={isLoading}
                >
                  <option value="">Select parent department</option>
                  {getParentDepartments()
                    .filter((dept) => dept.id !== department.id)
                    .map((dept, deptIndex) => (
                      <option key={deptIndex} value={dept.id}>
                        {dept.name || `Department ${deptIndex + 1}`}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
        onClick={addDepartment}
        disabled={isLoading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Department
      </button>
    </div>
  )
}