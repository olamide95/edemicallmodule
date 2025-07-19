"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Employee {
  id?: string
  name: string
  email: string
  phone: string
  department: string
  subDepartment: string
  class: string
  branch: string
}

export function EmployeesForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Excel table columns for bulk import
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

  // Load employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/employees')
        if (response.success && response.data) {
          setEmployees(response.data)
          updateSchoolData({ employees: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const handleChange = (index: number, field: keyof Employee, value: string) => {
    const updatedEmployees = [...employees]
    updatedEmployees[index] = { ...updatedEmployees[index], [field]: value }
    setEmployees(updatedEmployees)
  }

  const saveEmployee = async (index: number) => {
    const employee = employees[index]
    try {
      setIsLoading(true)
      let response
      
      if (employee.id) {
        // Update existing employee
        response = await api.put(`/school-setup/employee/${employee.id}`, employee)
      } else {
        // Create new employee
        response = await api.post('/school-setup/employee', employee)
      }

      if (response.success) {
        const updatedEmployees = [...employees]
        updatedEmployees[index] = response.data
        setEmployees(updatedEmployees)
        updateSchoolData({ employees: updatedEmployees })
        toast({
          title: "Success",
          description: employee.id ? "Employee updated successfully" : "Employee created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save employee",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        name: "",
        email: "",
        phone: "",
        department: "",
        subDepartment: "",
        class: "",
        branch: "Head Office",
      },
    ])
  }

  const removeEmployee = async (index: number) => {
    const employee = employees[index]
    if (!employee.id) {
      // Employee not saved yet, just remove from local state
      const updatedEmployees = [...employees]
      updatedEmployees.splice(index, 1)
      setEmployees(updatedEmployees)
      updateSchoolData({ employees: updatedEmployees })
      return
    }

    try {
      setIsDeleting(employee.id)
      const response = await api.delete(`/school-setup/employee/${employee.id}`)
      if (response.success) {
        const updatedEmployees = [...employees]
        updatedEmployees.splice(index, 1)
        setEmployees(updatedEmployees)
        updateSchoolData({ employees: updatedEmployees })
        toast({
          title: "Success",
          description: "Employee deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete employee",
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
      const response = await api.post('/school-setup/employees/bulk', newData)
      if (response.success) {
        setEmployees(response.data)
        updateSchoolData({ employees: response.data })
        toast({
          title: "Success",
          description: "Employees imported successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import employees",
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
          {employees.map((employee, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Employee {index + 1}</h3>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeEmployee(index)}
                  disabled={isDeleting === employee.id}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {isDeleting === employee.id ? "Deleting..." : "Remove"}
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
                      onBlur={() => saveEmployee(index)}
                      placeholder="Enter employee ID"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`branch-${index}`}>Branch</Label>
                    <Select 
                      value={employee.branch} 
                      onValueChange={(value) => {
                        handleChange(index, "branch", value)
                        saveEmployee(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Head Office">Head Office</SelectItem>
                        <SelectItem value="Branch 1">Branch 1</SelectItem>
                        <SelectItem value="Branch 2">Branch 2</SelectItem>
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
                    onBlur={() => saveEmployee(index)}
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
                      onBlur={() => saveEmployee(index)}
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
                      onBlur={() => saveEmployee(index)}
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
                      onValueChange={(value) => {
                        handleChange(index, "department", value)
                        handleChange(index, "subDepartment", "")
                        saveEmployee(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`sub-department-${index}`}>Sub Department</Label>
                    <Select
                      value={employee.subDepartment}
                      onValueChange={(value) => {
                        handleChange(index, "subDepartment", value)
                        saveEmployee(index)
                      }}
                      disabled={!employee.department || isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub department" />
                      </SelectTrigger>
                      <SelectContent>
                        {employee.department === "academic" ? (
                          <>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="languages">Languages</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="sub1">Sub Department 1</SelectItem>
                            <SelectItem value="sub2">Sub Department 2</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {employee.department === "academic" && (
                  <div className="space-y-2">
                    <Label htmlFor={`class-${index}`}>Class</Label>
                    <Select
                      value={employee.class}
                      onValueChange={(value) => {
                        handleChange(index, "class", value)
                        saveEmployee(index)
                      }}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class1">Class 1</SelectItem>
                        <SelectItem value="class2">Class 2</SelectItem>
                        <SelectItem value="class3">Class 3</SelectItem>
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