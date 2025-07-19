"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BadgeAlertIcon, AlertTriangleIcon, ClockIcon } from "lucide-react"

// Updated mock data for clubs with multiple clubs at same time slots
const clubsByDay = {
  Monday: [
    { id: 1, name: "Chess Club", time: "2:00 PM - 3:00 PM", amount: 15000, timeSlot: "14:00-15:00" },
    { id: 2, name: "Debate Club", time: "3:00 PM - 4:00 PM", amount: 18000, timeSlot: "15:00-16:00" },
    { id: 11, name: "Math Club", time: "2:00 PM - 3:00 PM", amount: 16000, timeSlot: "14:00-15:00" },
  ],
  Tuesday: [
    { id: 3, name: "Science Club", time: "2:00 PM - 3:00 PM", amount: 20000, timeSlot: "14:00-15:00" },
    { id: 4, name: "Art Club", time: "3:00 PM - 4:00 PM", amount: 22000, timeSlot: "15:00-16:00" },
    { id: 12, name: "Photography Club", time: "2:00 PM - 3:00 PM", amount: 24000, timeSlot: "14:00-15:00" },
  ],
  Wednesday: [
    { id: 5, name: "Coding Club", time: "2:00 PM - 3:00 PM", amount: 25000, timeSlot: "14:00-15:00" },
    { id: 6, name: "Drama Club", time: "3:00 PM - 4:00 PM", amount: 15000, timeSlot: "15:00-16:00" },
    { id: 13, name: "Robotics Club", time: "2:00 PM - 3:00 PM", amount: 30000, timeSlot: "14:00-15:00" },
  ],
  Thursday: [
    { id: 7, name: "Music Club", time: "2:00 PM - 3:00 PM", amount: 20000, timeSlot: "14:00-15:00" },
    { id: 8, name: "Sports Club", time: "3:00 PM - 4:00 PM", amount: 18000, timeSlot: "15:00-16:00" },
    { id: 14, name: "Dance Club", time: "2:00 PM - 3:00 PM", amount: 17000, timeSlot: "14:00-15:00" },
  ],
  Friday: [
    { id: 9, name: "Language Club", time: "2:00 PM - 3:00 PM", amount: 15000, timeSlot: "14:00-15:00" },
    { id: 10, name: "Environmental Club", time: "3:00 PM - 4:00 PM", amount: 16000, timeSlot: "15:00-16:00" },
    { id: 15, name: "Creative Writing", time: "2:00 PM - 3:00 PM", amount: 14000, timeSlot: "14:00-15:00" },
  ],
}

// Mock data for club variants
const clubVariants = {
  1: [{ id: 1, name: "With Chess Set", amount: 5000 }],
  4: [{ id: 2, name: "With Art Supplies", amount: 8000 }],
  8: [{ id: 3, name: "With Uniform", amount: 12000 }],
  13: [{ id: 4, name: "With Robot Kit", amount: 25000 }],
}

export function NewEnrollmentForm() {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedClubs, setSelectedClubs] = useState<{ [key: string]: number }>({})
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: number[] }>({})
  const [selectedTerms, setSelectedTerms] = useState<{ [key: string]: string[] }>({})

  // Group clubs by time slots for conflict detection
  const getClubsByTimeSlot = (day: string) => {
    const clubs = clubsByDay[day as keyof typeof clubsByDay] || []
    const grouped: { [key: string]: typeof clubs } = {}

    clubs.forEach((club) => {
      if (!grouped[club.timeSlot]) {
        grouped[club.timeSlot] = []
      }
      grouped[club.timeSlot].push(club)
    })

    return grouped
  }

  // Calculate total amount
  const calculateTotal = () => {
    let total = 0

    Object.entries(selectedClubs).forEach(([day, clubId]) => {
      const club = clubsByDay[day as keyof typeof clubsByDay].find((c) => c.id === clubId)
      if (club) {
        const terms = selectedTerms[day] || []
        total += club.amount * terms.length

        // Add variants
        const variants = selectedVariants[day] || []
        variants.forEach((variantId) => {
          const variant = clubVariants[clubId]?.find((v) => v.id === variantId)
          if (variant) {
            total += variant.amount * terms.length
          }
        })
      }
    })

    return total
  }

  const handleClubSelection = (day: string, clubId: number) => {
    setSelectedClubs((prev) => ({
      ...prev,
      [day]: clubId,
    }))

    // Reset variants and terms when club changes
    setSelectedVariants((prev) => ({
      ...prev,
      [day]: [],
    }))
    setSelectedTerms((prev) => ({
      ...prev,
      [day]: [],
    }))
  }

  const handleVariantToggle = (day: string, variantId: number) => {
    setSelectedVariants((prev) => {
      const current = prev[day] || []
      return {
        ...prev,
        [day]: current.includes(variantId) ? current.filter((id) => id !== variantId) : [...current, variantId],
      }
    })
  }

  const handleTermToggle = (day: string, term: string) => {
    setSelectedTerms((prev) => {
      const current = prev[day] || []
      return {
        ...prev,
        [day]: current.includes(term) ? current.filter((t) => t !== term) : [...current, term],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare and send data to API
    const enrollmentData = {
      studentId: selectedStudent,
      enrollments: Object.entries(selectedClubs).map(([day, clubId]) => ({
        clubId,
        terms: selectedTerms[day] || [],
        variants: selectedVariants[day] || [],
      })),
    }

    console.log("Enrollment data:", enrollmentData)
    alert("Enrollment successful!")
    // Reset form or redirect
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student">Select Student</Label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">John Doe (JSS 3)</SelectItem>
              <SelectItem value="2">Jane Smith (SSS 1)</SelectItem>
              <SelectItem value="3">Michael Johnson (JSS 2)</SelectItem>
              <SelectItem value="4">Sarah Williams (SSS 2)</SelectItem>
              <SelectItem value="5">Robert Brown (JSS 1)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Select Clubs</h3>

        {Object.entries(clubsByDay).map(([day, clubs]) => {
          const clubsByTimeSlot = getClubsByTimeSlot(day)

          return (
            <div key={day} className="mb-6">
              <h4 className="font-medium mb-4">{day}</h4>
              <div className="space-y-6 pl-4">
                {Object.entries(clubsByTimeSlot).map(([timeSlot, timeSlotClubs]) => (
                  <div key={timeSlot} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <h5 className="font-medium text-sm">{timeSlotClubs[0]?.time}</h5>
                      {timeSlotClubs.length > 1 && (
                        <Badge variant="outline" className="text-xs">
                          Choose One
                        </Badge>
                      )}
                    </div>

                    {timeSlotClubs.length > 1 && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <AlertTriangleIcon className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          Multiple clubs are available at this time. Student can only select one club per time slot.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Club Selection */}
                    <RadioGroup
                      value={selectedClubs[day]?.toString() || ""}
                      onValueChange={(value) => handleClubSelection(day, Number.parseInt(value))}
                    >
                      {timeSlotClubs.map((club) => (
                        <div key={club.id} className="flex items-start space-x-2 py-2 pl-4">
                          <RadioGroupItem value={club.id.toString()} id={`club-${day}-${club.id}`} />
                          <div className="grid gap-1.5 flex-1">
                            <Label htmlFor={`club-${day}-${club.id}`} className="font-medium">
                              {club.name}
                            </Label>
                            <div className="text-sm text-muted-foreground">
                              {club.time} • ₦{club.amount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                {/* If a club is selected, show terms and variants */}
                {selectedClubs[day] && (
                  <div className="pl-6 pt-2 border-l-2 border-muted">
                    <div className="space-y-2 mb-4">
                      <Label className="text-sm font-medium">Select Terms</Label>
                      <div className="flex flex-wrap gap-4">
                        {["1st Term", "2nd Term", "3rd Term"].map((term) => (
                          <div key={term} className="flex items-center space-x-2">
                            <Checkbox
                              id={`term-${day}-${term}`}
                              checked={(selectedTerms[day] || []).includes(term)}
                              onCheckedChange={() => handleTermToggle(day, term)}
                            />
                            <Label htmlFor={`term-${day}-${term}`} className="text-sm font-normal">
                              {term}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Variants */}
                    {clubVariants[selectedClubs[day]] && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Club Variants</Label>
                        <div className="space-y-2">
                          {clubVariants[selectedClubs[day]].map((variant) => (
                            <div key={variant.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`variant-${day}-${variant.id}`}
                                checked={(selectedVariants[day] || []).includes(variant.id)}
                                onCheckedChange={() => handleVariantToggle(day, variant.id)}
                              />
                              <Label htmlFor={`variant-${day}-${variant.id}`} className="text-sm font-normal">
                                {variant.name} (+₦{variant.amount.toLocaleString()})
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warning if no terms selected */}
                    {selectedClubs[day] && (!selectedTerms[day] || selectedTerms[day].length === 0) && (
                      <div className="flex items-center text-amber-500 text-sm mt-2">
                        <BadgeAlertIcon className="h-4 w-4 mr-1" />
                        Please select at least one term
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium">Total Amount</p>
          <p className="text-3xl font-bold">₦{calculateTotal().toLocaleString()}</p>
        </div>
        <div className="space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              !selectedStudent ||
              Object.keys(selectedClubs).length === 0 ||
              Object.entries(selectedClubs).some(([day]) => !selectedTerms[day] || selectedTerms[day].length === 0)
            }
          >
            Enroll Student
          </Button>
        </div>
      </div>
    </form>
  )
}
