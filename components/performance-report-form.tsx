"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SaveIcon, SendIcon } from "lucide-react"

// Mock data
const mockStudents = [
  { id: 1, name: "John Doe", class: "JSS 3" },
  { id: 2, name: "Jane Smith", class: "SSS 1" },
  { id: 3, name: "Michael Johnson", class: "JSS 2" },
  { id: 4, name: "Sarah Williams", class: "SSS 2" },
  { id: 5, name: "Robert Brown", class: "JSS 1" },
]

// Mock attendance data
const mockAttendanceData = [
  { studentId: 1, attendanceRate: 92 },
  { studentId: 2, attendanceRate: 85 },
  { studentId: 3, attendanceRate: 78 },
  { studentId: 4, attendanceRate: 95 },
  { studentId: 5, attendanceRate: 88 },
]

export function PerformanceReportForm() {
  const [formData, setFormData] = useState({
    studentId: "",
    term: "",
    attendance: "",
    participation: "",
    skills: "",
    improvement: "",
    generalComments: "",
  })
  const [attendanceRate, setAttendanceRate] = useState<number | null>(null)

  useEffect(() => {
    if (formData.studentId) {
      const studentId = Number(formData.studentId)
      const attendanceRecord = mockAttendanceData.find((record) => record.studentId === studentId)

      if (attendanceRecord) {
        setAttendanceRate(attendanceRecord.attendanceRate)
        setFormData((prev) => ({
          ...prev,
          attendance: `${attendanceRecord.attendanceRate}%`,
        }))
      } else {
        setAttendanceRate(null)
      }
    }
  }, [formData.studentId])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData)
    alert("Report draft saved successfully!")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting report:", formData)
    alert("Report submitted successfully for review!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="student">Select Student</Label>
          <Select value={formData.studentId} onValueChange={(value) => handleChange("studentId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {mockStudents.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name} ({student.class})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Term</Label>
          <Select value={formData.term} onValueChange={(value) => handleChange("term", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st Term">1st Term</SelectItem>
              <SelectItem value="2nd Term">2nd Term</SelectItem>
              <SelectItem value="3rd Term">3rd Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="attendance">Attendance</Label>
          <Input
            id="attendance"
            placeholder="e.g., 90% attendance rate"
            value={formData.attendance}
            onChange={(e) => handleChange("attendance", e.target.value)}
          />
          {attendanceRate !== null && (
            <p className="text-sm text-muted-foreground">Auto-populated from attendance register: {attendanceRate}%</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="participation">Participation & Engagement</Label>
          <Textarea
            id="participation"
            placeholder="Describe the student's level of participation and engagement in activities"
            className="min-h-[100px]"
            value={formData.participation}
            onChange={(e) => handleChange("participation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills & Achievements</Label>
          <Textarea
            id="skills"
            placeholder="List skills developed and achievements"
            className="min-h-[100px]"
            value={formData.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="improvement">Areas for Improvement</Label>
          <Textarea
            id="improvement"
            placeholder="Suggest areas where the student could improve"
            className="min-h-[100px]"
            value={formData.improvement}
            onChange={(e) => handleChange("improvement", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="generalComments">General Comments</Label>
          <Textarea
            id="generalComments"
            placeholder="Any other general comments about the student's performance"
            className="min-h-[100px]"
            value={formData.generalComments}
            onChange={(e) => handleChange("generalComments", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={handleSaveDraft}>
          <SaveIcon className="h-4 w-4 mr-1" />
          Save as Draft
        </Button>
        <Button type="submit" disabled={!formData.studentId || !formData.term}>
          <SendIcon className="h-4 w-4 mr-1" />
          Submit for Review
        </Button>
      </div>
    </form>
  )
}
