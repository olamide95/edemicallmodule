"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function OrganogramForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [departments, setDepartments] = useState<any[]>(schoolData.departments || [])
  const [isLoading, setIsLoading] = useState(false)

  // Load departments from context on mount
  useEffect(() => {
    setDepartments(schoolData.departments || [])
  }, [schoolData.departments])

  const handleChange = (index: number, field: string, value: any) => {
    const updatedDepartments = [...departments]
    updatedDepartments[index] = { ...updatedDepartments[index], [field]: value }
    setDepartments(updatedDepartments)
    updateSchoolData({ departments: updatedDepartments })
  }

  const addDepartment = () => {
    const newDepartments = [
      ...departments,
      {
        id: `temp-${Date.now()}`,
        name: "",
        isAcademic: false,
        type: "department",
        parentDepartment: null,
      },
    ]
    setDepartments(newDepartments)
    updateSchoolData({ departments: newDepartments })
  }

  const removeDepartment = (index: number) => {
    const updatedDepartments = [...departments]
    updatedDepartments.splice(index, 1)
    setDepartments(updatedDepartments)
    updateSchoolData({ departments: updatedDepartments })
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
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
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