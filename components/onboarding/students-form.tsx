"use client"

import { useState, useContext, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Plus, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelTable } from "@/components/excel-import/excel-table"
import { toast } from "@/components/ui/use-toast"

interface Parent {
  id?: string
  name: string
  type: string
  email: string
  phone: string
  students: string[] // Array of student IDs
}

interface Student {
  id: string
  name: string
  admissionNumber: string
  class: string
  section: string
  parents: string[] // Array of parent IDs
}

export function StudentsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("individual")
  const [viewMode, setViewMode] = useState<"student" | "parent">("student")
  const [students, setStudents] = useState<Student[]>(schoolData.students || [])
  const [parents, setParents] = useState<Parent[]>(schoolData.parents || [])
  const [isLoading, setIsLoading] = useState(false)

  // Excel table columns for bulk import
  const studentColumns = [
    { id: "admissionNumber", name: "Admission Number", visible: true },
    { id: "name", name: "Student Name", visible: true },
    { id: "class", name: "Class", visible: true },
    { id: "section", name: "Section", visible: true },
    { id: "parent1Name", name: "Parent 1 Name", visible: true },
    { id: "parent1Email", name: "Parent 1 Email", visible: true },
    { id: "parent1Phone", name: "Parent 1 Phone", visible: true },
    { id: "parent1Type", name: "Parent 1 Type", visible: true },
    { id: "parent2Name", name: "Parent 2 Name", visible: true },
    { id: "parent2Email", name: "Parent 2 Email", visible: true },
    { id: "parent2Phone", name: "Parent 2 Phone", visible: true },
    { id: "parent2Type", name: "Parent 2 Type", visible: true },
  ]

  // Load data from local storage
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]')
    const savedParents = JSON.parse(localStorage.getItem('parents') || '[]')
    
    if (savedStudents.length > 0) setStudents(savedStudents)
    if (savedParents.length > 0) setParents(savedParents)
    
    updateSchoolData({ 
      students: savedStudents,
      parents: savedParents
    })
  }, [])

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
    localStorage.setItem('parents', JSON.stringify(parents))
    updateSchoolData({ students, parents })
  }, [students, parents])

  // Helper to generate unique IDs
  const generateId = () => Math.random().toString(36).substring(2, 11)

  // Get parent details by ID
  const getParentById = (id: string) => parents.find(p => p.id === id)

  // Get student details by ID
  const getStudentById = (id: string) => students.find(s => s.id === id)

  // Student-centric handlers
  const handleStudentChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students]
    updatedStudents[index] = { ...updatedStudents[index], [field]: value }
    setStudents(updatedStudents)
  }

  const addStudent = () => {
    setStudents([
      ...students,
      {
        id: generateId(),
        name: "",
        admissionNumber: "",
        class: "",
        section: "",
        parents: []
      }
    ])
  }

  const removeStudent = (index: number) => {
    const studentToRemove = students[index]
    
    // Remove student from parents' student lists
    const updatedParents = parents.map(parent => ({
      ...parent,
      students: parent.students.filter(id => id !== studentToRemove.id)
    }))
    
    setParents(updatedParents)
    
    // Remove the student
    const updatedStudents = [...students]
    updatedStudents.splice(index, 1)
    setStudents(updatedStudents)
  }

  const addParentToStudent = (studentIndex: number) => {
    const newParent: Parent = {
      id: generateId(),
      name: "",
      type: "",
      email: "",
      phone: "",
      students: [students[studentIndex].id]
    }
    
    setParents([...parents, newParent])
    
    // Add parent to student
    const updatedStudents = [...students]
    updatedStudents[studentIndex].parents.push(newParent.id)
    setStudents(updatedStudents)
  }

  const removeParentFromStudent = (studentIndex: number, parentId: string) => {
    // Remove parent from student
    const updatedStudents = [...students]
    updatedStudents[studentIndex].parents = updatedStudents[studentIndex].parents.filter(id => id !== parentId)
    setStudents(updatedStudents)
    
    // Remove student from parent
    const updatedParents = parents.map(parent => 
      parent.id === parentId 
        ? { ...parent, students: parent.students.filter(id => id !== students[studentIndex].id) }
        : parent
    )
    setParents(updatedParents)
  }

  // Parent-centric handlers
  const handleParentChange = (index: number, field: keyof Parent, value: string) => {
    const updatedParents = [...parents]
    updatedParents[index] = { ...updatedParents[index], [field]: value }
    setParents(updatedParents)
  }

  const addParent = () => {
    setParents([
      ...parents,
      {
        id: generateId(),
        name: "",
        type: "",
        email: "",
        phone: "",
        students: []
      }
    ])
  }

  const removeParent = (index: number) => {
    const parentToRemove = parents[index]
    
    // Remove parent from students' parent lists
    const updatedStudents = students.map(student => ({
      ...student,
      parents: student.parents.filter(id => id !== parentToRemove.id)
    }))
    
    setStudents(updatedStudents)
    
    // Remove the parent
    const updatedParents = [...parents]
    updatedParents.splice(index, 1)
    setParents(updatedParents)
  }

  const addStudentToParent = (parentIndex: number) => {
    const newStudent: Student = {
      id: generateId(),
      name: "",
      admissionNumber: "",
      class: "",
      section: "",
      parents: [parents[parentIndex].id]
    }
    
    setStudents([...students, newStudent])
    
    // Add student to parent
    const updatedParents = [...parents]
    updatedParents[parentIndex].students.push(newStudent.id)
    setParents(updatedParents)
  }

  const removeStudentFromParent = (parentIndex: number, studentId: string) => {
    // Remove student from parent
    const updatedParents = [...parents]
    updatedParents[parentIndex].students = updatedParents[parentIndex].students.filter(id => id !== studentId)
    setParents(updatedParents)
    
    // Remove parent from student
    const updatedStudents = students.map(student => 
      student.id === studentId
        ? { ...student, parents: student.parents.filter(id => id !== parents[parentIndex].id) }
        : student
    )
    setStudents(updatedStudents)
  }

  // Handle Excel data changes
  const handleExcelDataChange = (newData: any[]) => {
    const newStudents: Student[] = []
    const newParents: Parent[] = []
    
    newData.forEach(row => {
      const studentId = generateId()
      
      // Create student
      newStudents.push({
        id: studentId,
        name: row.name,
        admissionNumber: row.admissionNumber,
        class: row.class,
        section: row.section,
        parents: []
      })
      
      // Create parents if they exist
      if (row.parent1Name) {
        const parent1Id = generateId()
        newParents.push({
          id: parent1Id,
          name: row.parent1Name,
          type: row.parent1Type,
          email: row.parent1Email,
          phone: row.parent1Phone,
          students: [studentId]
        })
        newStudents[newStudents.length - 1].parents.push(parent1Id)
      }
      
      if (row.parent2Name) {
        const parent2Id = generateId()
        newParents.push({
          id: parent2Id,
          name: row.parent2Name,
          type: row.parent2Type,
          email: row.parent2Email,
          phone: row.parent2Phone,
          students: [studentId]
        })
        newStudents[newStudents.length - 1].parents.push(parent2Id)
      }
    })
    
    setStudents([...students, ...newStudents])
    setParents([...parents, ...newParents])
    
    toast({
      title: "Success",
      description: "Students imported successfully",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6 mt-6">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'student' ? 'bg-primary text-white' : 'bg-secondary-bg'}`}
              onClick={() => setViewMode('student')}
            >
              Student View
            </button>
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'parent' ? 'bg-primary text-white' : 'bg-secondary-bg'}`}
              onClick={() => setViewMode('parent')}
            >
              Parent View
            </button>
          </div>

          {viewMode === 'student' ? (
            <>
              {students.map((student, index) => (
                <div key={student.id} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Student {index + 1}</h3>
                    <button
                      className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                      onClick={() => removeStudent(index)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Admission Number</label>
                        <input
                          value={student.admissionNumber}
                          onChange={(e) => handleStudentChange(index, "admissionNumber", e.target.value)}
                          placeholder="Enter admission number"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Student Name</label>
                        <input
                          value={student.name}
                          onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                          placeholder="Enter student name"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Class</label>
                        <input
                          value={student.class}
                          onChange={(e) => handleStudentChange(index, "class", e.target.value)}
                          placeholder="Enter class"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Section</label>
                        <input
                          value={student.section}
                          onChange={(e) => handleStudentChange(index, "section", e.target.value)}
                          placeholder="Enter section"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Parents Information</h4>
                      {student.parents.map((parentId, parentIndex) => {
                        const parent = getParentById(parentId)
                        if (!parent) return null
                        
                        return (
                          <div key={parent.id} className="border rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="font-medium">Parent {parentIndex + 1}</h5>
                              <button
                                className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                                onClick={() => removeParentFromStudent(index, parent.id)}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove Parent
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                  value={parent.name}
                                  onChange={(e) => {
                                    const parentIndex = parents.findIndex(p => p.id === parent.id)
                                    if (parentIndex >= 0) handleParentChange(parentIndex, "name", e.target.value)
                                  }}
                                  placeholder="Enter parent name"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Type</label>
                                <select
                                  value={parent.type}
                                  onChange={(e) => {
                                    const parentIndex = parents.findIndex(p => p.id === parent.id)
                                    if (parentIndex >= 0) handleParentChange(parentIndex, "type", e.target.value)
                                  }}
                                  className="form-input w-full"
                                  disabled={isLoading}
                                >
                                  <option value="">Select type</option>
                                  <option value="Father">Father</option>
                                  <option value="Mother">Mother</option>
                                  <option value="Guardian">Guardian</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                  type="email"
                                  value={parent.email}
                                  onChange={(e) => {
                                    const parentIndex = parents.findIndex(p => p.id === parent.id)
                                    if (parentIndex >= 0) handleParentChange(parentIndex, "email", e.target.value)
                                  }}
                                  placeholder="Enter email"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Phone</label>
                                <input
                                  value={parent.phone}
                                  onChange={(e) => {
                                    const parentIndex = parents.findIndex(p => p.id === parent.id)
                                    if (parentIndex >= 0) handleParentChange(parentIndex, "phone", e.target.value)
                                  }}
                                  placeholder="Enter phone number"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}

                      <button
                        className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
                        onClick={() => addParentToStudent(index)}
                        disabled={isLoading || student.parents.length >= 2}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Parent
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
                onClick={addStudent}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Student
              </button>
            </>
          ) : (
            <>
              {parents.map((parent, index) => (
                <div key={parent.id} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Parent {index + 1}</h3>
                    <button
                      className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                      onClick={() => removeParent(index)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          value={parent.name}
                          onChange={(e) => handleParentChange(index, "name", e.target.value)}
                          placeholder="Enter parent name"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Type</label>
                        <select
                          value={parent.type}
                          onChange={(e) => handleParentChange(index, "type", e.target.value)}
                          className="form-input w-full"
                          disabled={isLoading}
                        >
                          <option value="">Select type</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={parent.email}
                          onChange={(e) => handleParentChange(index, "email", e.target.value)}
                          placeholder="Enter email"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                          value={parent.phone}
                          onChange={(e) => handleParentChange(index, "phone", e.target.value)}
                          placeholder="Enter phone number"
                          className="form-input w-full"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Children Information</h4>
                      {parent.students.map((studentId, studentIndex) => {
                        const student = getStudentById(studentId)
                        if (!student) return null
                        
                        return (
                          <div key={student.id} className="border rounded-md p-4 mb-4">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="font-medium">Child {studentIndex + 1}</h5>
                              <button
                                className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                                onClick={() => removeStudentFromParent(index, student.id)}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove Child
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Admission Number</label>
                                <input
                                  value={student.admissionNumber}
                                  onChange={(e) => {
                                    const studentIndex = students.findIndex(s => s.id === student.id)
                                    if (studentIndex >= 0) handleStudentChange(studentIndex, "admissionNumber", e.target.value)
                                  }}
                                  placeholder="Enter admission number"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Student Name</label>
                                <input
                                  value={student.name}
                                  onChange={(e) => {
                                    const studentIndex = students.findIndex(s => s.id === student.id)
                                    if (studentIndex >= 0) handleStudentChange(studentIndex, "name", e.target.value)
                                  }}
                                  placeholder="Enter student name"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Class</label>
                                <input
                                  value={student.class}
                                  onChange={(e) => {
                                    const studentIndex = students.findIndex(s => s.id === student.id)
                                    if (studentIndex >= 0) handleStudentChange(studentIndex, "class", e.target.value)
                                  }}
                                  placeholder="Enter class"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium">Section</label>
                                <input
                                  value={student.section}
                                  onChange={(e) => {
                                    const studentIndex = students.findIndex(s => s.id === student.id)
                                    if (studentIndex >= 0) handleStudentChange(studentIndex, "section", e.target.value)
                                  }}
                                  placeholder="Enter section"
                                  className="form-input w-full"
                                  disabled={isLoading}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}

                      <button
                        className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
                        onClick={() => addStudentToParent(index)}
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Child
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="w-full p-3 border border-divider rounded-md flex items-center justify-center hover:bg-secondary-bg"
                onClick={addParent}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Parent
              </button>
            </>
          )}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Bulk Import Instructions</h3>
            <p className="text-sm text-secondary dark:text-secondary">
              Use the Excel-like interface below to paste or enter student and parent data. You can:
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
              initialColumns={studentColumns}
              initialData={students.map(student => ({
                admissionNumber: student.admissionNumber,
                name: student.name,
                class: student.class,
                section: student.section,
                parent1Name: student.parents[0] ? getParentById(student.parents[0])?.name || "" : "",
                parent1Email: student.parents[0] ? getParentById(student.parents[0])?.email || "" : "",
                parent1Phone: student.parents[0] ? getParentById(student.parents[0])?.phone || "" : "",
                parent1Type: student.parents[0] ? getParentById(student.parents[0])?.type || "" : "",
                parent2Name: student.parents[1] ? getParentById(student.parents[1])?.name || "" : "",
                parent2Email: student.parents[1] ? getParentById(student.parents[1])?.email || "" : "",
                parent2Phone: student.parents[1] ? getParentById(student.parents[1])?.phone || "" : "",
                parent2Type: student.parents[1] ? getParentById(student.parents[1])?.type || "" : "",
              }))}
              onDataChange={handleExcelDataChange}
              tableName="Students"
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}