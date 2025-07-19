"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Download } from "lucide-react"

interface BulkAssignmentSummaryProps {
  selectedCount: number
  onClose: () => void
}

export function BulkAssignmentSummary({ selectedCount, onClose }: BulkAssignmentSummaryProps) {
  // For demo purposes, we'll simulate some success/failure counts
  const successCount = Math.floor(selectedCount * 0.9) // 90% success rate
  const failureCount = selectedCount - successCount

  const successStudents = [
    { id: "STU001", name: "John Smith", class: "Grade 10" },
    { id: "STU002", name: "Emma Johnson", class: "Grade 10" },
    { id: "STU004", name: "Sophia Williams", class: "Grade 11" },
    { id: "STU006", name: "Olivia Miller", class: "Grade 10" },
    { id: "STU008", name: "Ava Moore", class: "Grade 9" },
    { id: "STU010", name: "Isabella Anderson", class: "Grade 8" },
  ]

  const failedStudents = [{ id: "STU003", name: "Michael Brown", class: "Grade 9", reason: "Conflicting discount" }]

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Discount Assignment Complete</h3>
        <p className="text-muted-foreground">
          Discounts have been assigned to {successCount} out of {selectedCount} students
        </p>
      </div>

      <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Successfully assigned</span>
        </div>
        <span className="font-medium">{successCount}</span>
      </div>

      {failureCount > 0 && (
        <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Failed to assign</span>
          </div>
          <span className="font-medium">{failureCount}</span>
        </div>
      )}

      <div className="space-y-3 mt-4">
        <h4 className="font-medium">Successfully Assigned</h4>
        <div className="max-h-32 overflow-y-auto border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {successStudents.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="p-2">{student.id}</td>
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {failedStudents.length > 0 && (
        <div className="space-y-3 mt-4">
          <h4 className="font-medium">Failed Assignments</h4>
          <div className="max-h-32 overflow-y-auto border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Class</th>
                  <th className="text-left p-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {failedStudents.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-2">{student.id}</td>
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.class}</td>
                    <td className="p-2">{student.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center mt-4">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Close
        </Button>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>
    </div>
  )
}
