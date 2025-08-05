"use client"

import { useState, useContext, useEffect, useCallback } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import dynamic from 'next/dynamic'

const ExcelTable = dynamic(
  () => import('@/components/excel-import/excel-table').then(mod => mod.ExcelTable),
  { 
    ssr: false,
    loading: () => <p>Loading table...</p>
  }
)

interface Employee {
  id?: string
  name: string
  email: string
  phone: string
  department: string
  subDepartment: string
  class: string
  branch: string
  customDepartment?: string
  customSubDepartment?: string
}

export function EmployeesForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const branches = schoolData.branches || []
  const departments = schoolData.departments || []
  const classes = schoolData.classes || []

  const employeeColumns = [
    { id: "id", name: "Employee ID", visible: true },
    { id: "name", name: "Full Name", visible: true },
    { id: "email", name: "Email", visible: true },
    { id: "phone", name: "Phone", visible: true },
    { id: "department", name: "Department", visible: true },
    { id: "subDepartment", name: "Sub Department", visible: true },
    { id: "class", name: "Class", visible: true },
    { id: "branch", name: "Branch", visible: true },
  ]
 // Update the useEffect hooks like this:
 useEffect(() => {
    setIsMounted(true)
    const savedEmployees = typeof window !== 'undefined' ? localStorage.getItem('employees') : null
    const initialEmployees = savedEmployees ? JSON.parse(savedEmployees) : schoolData.employees || []
    setEmployees(initialEmployees)
    return () => setIsMounted(false)
  }, [schoolData.employees])

  // Persist to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('employees', JSON.stringify(employees))
    }
  }, [employees, isMounted])

  // Update context only when needed
  useEffect(() => {
    if (isMounted) {
      const currentEmployees = JSON.stringify(schoolData.employees || [])
      const newEmployees = JSON.stringify(employees)
      if (currentEmployees !== newEmployees) {
        updateSchoolData({ employees })
      }
    }
  }, [employees, isMounted, schoolData.employees, updateSchoolData])

  const handleChange = useCallback((index: number, field: keyof Employee, value: string) => {
    setEmployees(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      
      // Reset dependent fields when department changes
      if (field === 'department') {
        updated[index].subDepartment = ''
        updated[index].customSubDepartment = ''
      }
      
      return updated
    })
  }, [])

  const addEmployee = useCallback(() => {
    setEmployees(prev => [
      ...prev,
      {
        name: "",
        email: "",
        phone: "",
        department: "",
        subDepartment: "",
        class: "",
        branch: branches.length > 0 ? branches[0].id || branches[0].name : "",
        customDepartment: "",
        customSubDepartment: ""
      },
    ])
  }, [branches])

  const removeEmployee = useCallback((index: number) => {
    setEmployees(prev => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }, [])

  const handleExcelDataChange = useCallback((newData: any[]) => {
    const formattedData = newData.map(emp => ({
      ...emp,
      customDepartment: emp.department && !departments.some(d => d.id === emp.department || d.name === emp.department) ? emp.department : "",
      customSubDepartment: emp.subDepartment && !getSubDepartments(emp.department).some(sd => sd.id === emp.subDepartment || sd.name === emp.subDepartment) ? emp.subDepartment : ""
    }))
    setEmployees(formattedData)
    toast({
      title: "Success",
      description: "Employees data updated",
    })
  }, [departments])

  const getSubDepartments = useCallback((departmentId: string) => {
    if (!departmentId) return []
    return departments.filter(dept => 
      dept.parentDepartment === departmentId && 
      (dept.type === "sub" || dept.type === "department")
    )
  }, [departments])

  const getAcademicDepartments = useCallback(() => {
    return departments.filter(dept => dept.isAcademic)
  }, [departments])

  const getNonAcademicDepartments = useCallback(() => {
    return departments.filter(dept => !dept.isAcademic)
  }, [departments])

  const handleDepartmentChange = useCallback((index: number, value: string) => {
    handleChange(index, "department", value)
    if (value === "other") {
      handleChange(index, "customDepartment", "")
    }
  }, [handleChange])

  const handleSubDepartmentChange = useCallback((index: number, value: string) => {
    handleChange(index, "subDepartment", value)
    if (value === "other") {
      handleChange(index, "customSubDepartment", "")
    }
  }, [handleChange])

  if (!isMounted) return null

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6 mt-6">
          {employees.map((employee, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Employee {index + 1}</h3>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeEmployee(index)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`employee-id-${index}`}>Employee ID</Label>
                    <Input
                      id={`employee-id-${index}`}
                      value={employee.id || ''}
                      onChange={(e) => handleChange(index, "id", e.target.value)}
                      placeholder="Enter employee ID"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`branch-${index}`}>Branch</Label>
                    <Select
                      value={employee.branch}
                      onValueChange={(value) => handleChange(index, "branch", value)}
                      disabled={isLoading || branches.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch">
                          {branches.find(b => b.id === employee.branch || b.name === employee.branch)?.name || "Select branch"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch, i) => (
                          <SelectItem 
                            key={i} 
                            value={branch.id || branch.name || `branch-${i}`}
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`employee-name-${index}`}>Employee Full Name</Label>
                  <Input
                    id={`employee-name-${index}`}
                    value={employee.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="Enter employee name"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email Address</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={employee.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                      placeholder="Enter email address"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                    <Input
                      id={`phone-${index}`}
                      value={employee.phone}
                      onChange={(e) => handleChange(index, "phone", e.target.value)}
                      placeholder="Enter phone number"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`department-${index}`}>Department</Label>
                    <Select
                      value={employee.department}
                      onValueChange={(value) => handleDepartmentChange(index, value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department">
                          {employee.department === "other" 
                            ? "Other (Please specify)" 
                            : departments.find(d => d.id === employee.department || d.name === employee.department)?.name || "Select department"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {/* Academic Departments Section */}
                        <div className="px-2 py-1 text-sm text-muted-foreground">Academic Departments</div>
                        {getAcademicDepartments().map((dept, i) => (
                          <SelectItem 
                            key={`academic-${i}`} 
                            value={dept.id || dept.name || `academic-dept-${i}`}
                          >
                            {dept.name}
                          </SelectItem>
                        ))}
                        
                        {/* Non-Academic Departments Section */}
                        <div className="px-2 py-1 text-sm text-muted-foreground mt-2">Non-Academic Departments</div>
                        {getNonAcademicDepartments().map((dept, i) => (
                          <SelectItem 
                            key={`non-academic-${i}`} 
                            value={dept.id || dept.name || `non-academic-dept-${i}`}
                          >
                            {dept.name}
                          </SelectItem>
                        ))}
                        
                        <SelectItem value="other">Other (Please specify)</SelectItem>
                      </SelectContent>
                    </Select>

                    {employee.department === "other" && (
                      <div className="mt-2">
                        <Input
                          value={employee.customDepartment || ""}
                          onChange={(e) => handleChange(index, "customDepartment", e.target.value)}
                          placeholder="Enter department name"
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`sub-department-${index}`}>Sub Department</Label>
                    <Select
                      value={employee.subDepartment}
                      onValueChange={(value) => handleSubDepartmentChange(index, value)}
                      disabled={!employee.department || isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub department">
                          {employee.subDepartment === "other" 
                            ? "Other (Please specify)" 
                            : getSubDepartments(employee.department).find(d => 
                                d.id === employee.subDepartment || d.name === employee.subDepartment
                              )?.name || "Select sub department"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {employee.department ? (
                          getSubDepartments(employee.department).length > 0 ? (
                            <>
                              {getSubDepartments(employee.department).map((subDept, i) => (
                                <SelectItem 
                                  key={i} 
                                  value={subDept.id || subDept.name || `sub-dept-${i}`}
                                >
                                  {subDept.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">Other (Please specify)</SelectItem>
                            </>
                          ) : (
                            <SelectItem value="other">Other (Please specify)</SelectItem>
                          )
                        ) : (
                          <SelectItem value="select-dept-first" disabled>
                            Select a department first
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>

                    {employee.subDepartment === "other" && (
                      <div className="mt-2">
                        <Input
                          value={employee.customSubDepartment || ""}
                          onChange={(e) => handleChange(index, "customSubDepartment", e.target.value)}
                          placeholder="Enter sub-department name"
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {employee.department && departments.find(d => 
                  (d.id === employee.department || d.name === employee.department) && d.isAcademic
                ) && (
                  <div className="space-y-2">
                    <Label htmlFor={`class-${index}`}>Class</Label>
                    <Select
                      value={employee.class}
                      onValueChange={(value) => handleChange(index, "class", value)}
                      disabled={isLoading || classes.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class">
                          {classes.find(c => c.id === employee.class || c.name === employee.class)?.name || "Select class"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls, i) => (
                          <SelectItem 
                            key={i} 
                            value={cls.id || cls.name || `class-${i}`}
                          >
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </Card>
          ))}

          <Button 
            variant="outline" 
            onClick={addEmployee} 
            className="w-full"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Employee
          </Button>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Bulk Import Instructions</h3>
            <p className="text-sm text-secondary dark:text-secondary">
              Use the Excel-like interface below to paste or enter employee data. You can:
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
              initialColumns={employeeColumns}
              initialData={employees}
              onDataChange={handleExcelDataChange}
              tableName="Employees"
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}