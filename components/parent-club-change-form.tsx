"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRightIcon } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"

// Mock data
const children = [
  { id: 1, name: "Alex Smith", class: "JSS 2" },
  { id: 2, name: "Emma Smith", class: "Primary 5" },
]

// Update the mock data to include amounts
const currentEnrollments = [
  { id: 1, childId: 1, club: "Chess Club", day: "Monday", time: "2:00 PM - 3:00 PM", amount: 15000 },
  { id: 2, childId: 1, club: "Science Club", day: "Wednesday", time: "3:00 PM - 4:00 PM", amount: 20000 },
  { id: 3, childId: 2, club: "Art Club", day: "Tuesday", time: "2:00 PM - 3:00 PM", amount: 22000 },
  { id: 4, childId: 2, club: "Music Club", day: "Thursday", time: "3:00 PM - 4:00 PM", amount: 20000 },
]

const availableClubs = [
  { id: 1, name: "Chess Club", day: "Monday", time: "2:00 PM - 3:00 PM", amount: 15000 },
  { id: 2, name: "Debate Club", day: "Monday", time: "3:00 PM - 4:00 PM", amount: 18000 },
  { id: 3, name: "Science Club", day: "Wednesday", time: "2:00 PM - 3:00 PM", amount: 20000 },
  { id: 4, name: "Art Club", day: "Tuesday", time: "2:00 PM - 3:00 PM", amount: 22000 },
  { id: 5, name: "Coding Club", day: "Wednesday", time: "3:00 PM - 4:00 PM", amount: 25000 },
  { id: 6, name: "Drama Club", day: "Wednesday", time: "3:00 PM - 4:00 PM", amount: 15000 },
  { id: 7, name: "Music Club", day: "Thursday", time: "2:00 PM - 3:00 PM", amount: 20000 },
  { id: 8, name: "Sports Club", day: "Thursday", time: "3:00 PM - 4:00 PM", amount: 18000 },
  { id: 9, name: "Language Club", day: "Friday", time: "2:00 PM - 3:00 PM", amount: 15000 },
  { id: 10, name: "Robotics Club", day: "Friday", time: "3:00 PM - 4:00 PM", amount: 30000 },
]

export function ParentClubChangeForm() {
  const [selectedChild, setSelectedChild] = useState("")
  const [selectedEnrollment, setSelectedEnrollment] = useState("")
  const [selectedNewClub, setSelectedNewClub] = useState("")
  const [reason, setReason] = useState("")

  // Filter enrollments based on selected child
  const childEnrollments = currentEnrollments.filter((enrollment) => enrollment.childId === Number(selectedChild))

  // Get the current enrollment details
  const currentEnrollment = currentEnrollments.find((enrollment) => enrollment.id === Number(selectedEnrollment))

  // Filter available clubs based on time conflicts
  const filteredNewClubs = availableClubs.filter((club) => {
    // Don't show the current club
    if (currentEnrollment && club.name === currentEnrollment.club) {
      return false
    }

    // Check for time conflicts with other enrollments
    const otherEnrollments = childEnrollments.filter((enrollment) => enrollment.id !== Number(selectedEnrollment))

    const hasConflict = otherEnrollments.some(
      (enrollment) => club.day === enrollment.day && club.time === enrollment.time,
    )

    return !hasConflict
  })

  // Get the new club details
  const newClub = availableClubs.find((club) => club.id === Number(selectedNewClub))

  // Calculate fee difference if both clubs are selected
  const feeDifference = newClub && currentEnrollment ? newClub.amount - currentEnrollment.amount : 0

  // Handle child selection - automatically select the first enrollment
  const handleChildSelect = (value: string) => {
    setSelectedChild(value)
    setSelectedEnrollment("")
    setSelectedNewClub("")

    // Auto-select the first enrollment if available
    const enrollments = currentEnrollments.filter((enrollment) => enrollment.childId === Number(value))
    if (enrollments.length > 0) {
      setSelectedEnrollment(enrollments[0].id.toString())
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the request to the backend
    alert("Club change request submitted successfully!")

    // Reset form
    setSelectedNewClub("")
    setReason("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="child">Select Child</Label>
          <Select value={selectedChild} onValueChange={handleChildSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id.toString()}>
                  {child.name} ({child.class})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedChild && childEnrollments.length > 0 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="current-club">Current Club</Label>
              <Select
                value={selectedEnrollment}
                onValueChange={(value) => {
                  setSelectedEnrollment(value)
                  setSelectedNewClub("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select current club" />
                </SelectTrigger>
                <SelectContent>
                  {childEnrollments.map((enrollment) => (
                    <SelectItem key={enrollment.id} value={enrollment.id.toString()}>
                      {enrollment.club} ({enrollment.day}, {enrollment.time}) - ₦{enrollment.amount.toLocaleString()}(
                      {enrollment.day}, {enrollment.time}) - ₦{enrollment.amount.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedEnrollment && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="new-club">New Club</Label>
                  <Select value={selectedNewClub} onValueChange={setSelectedNewClub}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new club" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredNewClubs.map((club) => (
                        <SelectItem key={club.id} value={club.id.toString()}>
                          {club.name} ({club.day}, {club.time}) - ₦{club.amount.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedNewClub && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <div className="font-medium">
                          {currentEnrollment?.club}
                          <div className="text-sm text-muted-foreground">
                            {currentEnrollment?.day}, {currentEnrollment?.time}
                          </div>
                          <div className="text-sm font-bold mt-1">₦{currentEnrollment?.amount.toLocaleString()}</div>
                        </div>
                        <ArrowRightIcon className="h-6 w-6 text-muted-foreground" />
                        <div className="font-medium">
                          {newClub?.name}
                          <div className="text-sm text-muted-foreground">
                            {newClub?.day}, {newClub?.time}
                          </div>
                          <div className="text-sm font-bold mt-1">₦{newClub?.amount.toLocaleString()}</div>
                        </div>
                      </div>

                      {feeDifference !== 0 && (
                        <div className="mt-4 text-center">
                          <StatusBadge status={feeDifference > 0 ? "Additional Payment" : "Refund"} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Change</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for changing clubs"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </>
            )}
          </>
        ) : selectedChild ? (
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            No club enrollments found for this child.
          </div>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!selectedChild || !selectedEnrollment || !selectedNewClub || !reason}>
          Submit Request
        </Button>
      </div>
    </form>
  )
}
