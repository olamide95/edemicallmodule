"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BadgeAlertIcon, CheckCircleIcon, ClockIcon, AlertTriangleIcon } from "lucide-react"

// Mock data
const children = [
  { id: 1, name: "Alex Smith", class: "JSS 2" },
  { id: 2, name: "Emma Smith", class: "Primary 5" },
]

// Updated clubs data with multiple clubs at same time slots
const clubsByDay = {
  Monday: [
    {
      id: 1,
      name: "Chess Club",
      time: "2:00 PM - 3:00 PM",
      amount: 15000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
    {
      id: 2,
      name: "Debate Club",
      time: "3:00 PM - 4:00 PM",
      amount: 18000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "15:00-16:00",
    },
    {
      id: 11,
      name: "Math Club",
      time: "2:00 PM - 3:00 PM",
      amount: 16000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
  ],
  Tuesday: [
    {
      id: 3,
      name: "Science Club",
      time: "2:00 PM - 3:00 PM",
      amount: 20000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
    {
      id: 4,
      name: "Art Club",
      time: "3:00 PM - 4:00 PM",
      amount: 22000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "15:00-16:00",
    },
    {
      id: 12,
      name: "Photography Club",
      time: "2:00 PM - 3:00 PM",
      amount: 24000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
  ],
  Wednesday: [
    {
      id: 5,
      name: "Coding Club",
      time: "2:00 PM - 3:00 PM",
      amount: 25000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
    {
      id: 6,
      name: "Drama Club",
      time: "3:00 PM - 4:00 PM",
      amount: 15000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "15:00-16:00",
    },
    {
      id: 13,
      name: "Robotics Club",
      time: "2:00 PM - 3:00 PM",
      amount: 30000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
  ],
  Thursday: [
    {
      id: 7,
      name: "Music Club",
      time: "2:00 PM - 3:00 PM",
      amount: 20000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
    {
      id: 8,
      name: "Sports Club",
      time: "3:00 PM - 4:00 PM",
      amount: 18000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "15:00-16:00",
    },
    {
      id: 14,
      name: "Dance Club",
      time: "2:00 PM - 3:00 PM",
      amount: 17000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
  ],
  Friday: [
    {
      id: 9,
      name: "Language Club",
      time: "2:00 PM - 3:00 PM",
      amount: 15000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
    {
      id: 10,
      name: "Environmental Club",
      time: "3:00 PM - 4:00 PM",
      amount: 16000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "15:00-16:00",
    },
    {
      id: 15,
      name: "Creative Writing",
      time: "2:00 PM - 3:00 PM",
      amount: 14000,
      image: "/placeholder.svg?height=200&width=200",
      timeSlot: "14:00-15:00",
    },
  ],
}

const clubVariants = {
  1: [{ id: 1, name: "With Chess Set", amount: 5000 }],
  4: [{ id: 2, name: "With Art Supplies", amount: 8000 }],
  8: [{ id: 3, name: "With Uniform", amount: 12000 }],
  13: [{ id: 4, name: "With Robot Kit", amount: 25000 }],
}

export function ParentEnrollmentForm() {
  const [selectedChild, setSelectedChild] = useState("")
  const [selectedClubs, setSelectedClubs] = useState<number[]>([])
  const [selectedVariants, setSelectedVariants] = useState<{ [key: number]: number[] }>({})
  const [selectedTerms, setSelectedTerms] = useState<{ [key: number]: string[] }>({})
  const [currentTab, setCurrentTab] = useState("Monday")
  const [timeConflicts, setTimeConflicts] = useState<string[]>([])

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

  // Check for time conflicts when selecting a club
  const checkTimeConflict = (clubId: number) => {
    const allClubs = Object.values(clubsByDay).flat()
    const selectedClub = allClubs.find((c) => c.id === clubId)
    if (!selectedClub) return false

    // Find the day this club belongs to
    const clubDay = Object.entries(clubsByDay).find(([_, clubs]) => clubs.some((c) => c.id === clubId))?.[0]

    if (!clubDay) return false

    // Check if any already selected club conflicts with this one
    return selectedClubs.some((selectedId) => {
      const otherClub = allClubs.find((c) => c.id === selectedId)
      if (!otherClub) return false

      const otherClubDay = Object.entries(clubsByDay).find(([_, clubs]) => clubs.some((c) => c.id === selectedId))?.[0]

      return clubDay === otherClubDay && selectedClub.timeSlot === otherClub.timeSlot
    })
  }

  const handleClubToggle = (clubId: number) => {
    // If already selected, remove it
    if (selectedClubs.includes(clubId)) {
      setSelectedClubs((prev) => prev.filter((id) => id !== clubId))
      // Also clean up variants and terms
      const newVariants = { ...selectedVariants }
      delete newVariants[clubId]
      setSelectedVariants(newVariants)

      const newTerms = { ...selectedTerms }
      delete newTerms[clubId]
      setSelectedTerms(newTerms)
      return
    }

    // Check for time conflicts before adding
    if (checkTimeConflict(clubId)) {
      const allClubs = Object.values(clubsByDay).flat()
      const selectedClub = allClubs.find((c) => c.id === clubId)
      const conflictingClub = selectedClubs.find((selectedId) => {
        const otherClub = allClubs.find((c) => c.id === selectedId)
        if (!otherClub || !selectedClub) return false

        const clubDay = Object.entries(clubsByDay).find(([_, clubs]) => clubs.some((c) => c.id === clubId))?.[0]
        const otherClubDay = Object.entries(clubsByDay).find(([_, clubs]) =>
          clubs.some((c) => c.id === selectedId),
        )?.[0]

        return clubDay === otherClubDay && selectedClub.timeSlot === otherClub.timeSlot
      })

      if (conflictingClub) {
        const conflictingClubData = allClubs.find((c) => c.id === conflictingClub)
        alert(
          `Time conflict! You have already selected "${conflictingClubData?.name}" for the same time slot. Please deselect it first.`,
        )
        return
      }
    }

    setSelectedClubs((prev) => [...prev, clubId])
  }

  const handleVariantToggle = (clubId: number, variantId: number) => {
    setSelectedVariants((prev) => {
      const current = prev[clubId] || []
      return {
        ...prev,
        [clubId]: current.includes(variantId) ? current.filter((id) => id !== variantId) : [...current, variantId],
      }
    })
  }

  const handleTermToggle = (clubId: number, term: string) => {
    setSelectedTerms((prev) => {
      const current = prev[clubId] || []
      return {
        ...prev,
        [clubId]: current.includes(term) ? current.filter((t) => t !== term) : [...current, term],
      }
    })
  }

  const calculateTotal = () => {
    let total = 0

    selectedClubs.forEach((clubId) => {
      const club = Object.values(clubsByDay)
        .flat()
        .find((c) => c.id === clubId)
      if (club) {
        const terms = selectedTerms[clubId] || []
        total += club.amount * terms.length

        // Add variants
        const variants = selectedVariants[clubId] || []
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

  const isFormValid = () => {
    if (!selectedChild) return false
    if (selectedClubs.length === 0) return false

    // Check if all selected clubs have at least one term selected
    return !selectedClubs.some((clubId) => !selectedTerms[clubId] || selectedTerms[clubId].length === 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare enrollment data
    const enrollmentData = {
      childId: selectedChild,
      enrollments: selectedClubs.map((clubId) => ({
        clubId,
        terms: selectedTerms[clubId] || [],
        variants: selectedVariants[clubId] || [],
      })),
    }

    console.log("Enrollment data:", enrollmentData)
    alert("Enrollment successful! Total: ₦" + calculateTotal().toLocaleString())
    // Reset form or redirect
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="child">Select Child</Label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
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
      </div>

      {selectedChild && (
        <>
          <Tabs defaultValue="Monday" value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-5">
              {Object.keys(clubsByDay).map((day) => (
                <TabsTrigger key={day} value={day}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(clubsByDay).map(([day, clubs]) => {
              const clubsByTimeSlot = getClubsByTimeSlot(day)

              return (
                <TabsContent key={day} value={day} className="pt-4">
                  <div className="space-y-6">
                    {Object.entries(clubsByTimeSlot).map(([timeSlot, timeSlotClubs]) => (
                      <div key={timeSlot} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-medium">{timeSlotClubs[0]?.time}</h3>
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
                              Multiple clubs are available at this time. You can only select one club per time slot.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {timeSlotClubs.map((club) => {
                            const isSelected = selectedClubs.includes(club.id)
                            const hasTimeConflict =
                              timeSlotClubs.length > 1 &&
                              selectedClubs.some(
                                (selectedId) =>
                                  timeSlotClubs.some((c) => c.id === selectedId) && selectedId !== club.id,
                              )

                            return (
                              <Card
                                key={club.id}
                                className={`${isSelected ? "border-primary ring-2 ring-primary/20" : ""} ${hasTimeConflict ? "opacity-50" : ""}`}
                              >
                                <CardHeader className="relative pb-2">
                                  <img
                                    src={club.image || "/placeholder.svg"}
                                    alt={club.name}
                                    className="w-full h-40 object-cover rounded-t-md mb-2"
                                  />
                                  <CardTitle className="flex items-center justify-between">
                                    {club.name}
                                    {isSelected && (
                                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                                        <CheckCircleIcon className="h-4 w-4" />
                                      </div>
                                    )}
                                  </CardTitle>
                                  <CardDescription>
                                    {day}, {club.time}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                  <p className="font-medium">₦{club.amount.toLocaleString()} per term</p>

                                  {isSelected && (
                                    <div className="mt-4 space-y-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm">Select Terms:</Label>
                                        <div className="flex flex-wrap gap-2">
                                          {["1st Term", "2nd Term", "3rd Term"].map((term) => (
                                            <div key={term} className="flex items-center space-x-1">
                                              <Checkbox
                                                id={`term-${club.id}-${term}`}
                                                checked={(selectedTerms[club.id] || []).includes(term)}
                                                onCheckedChange={() => handleTermToggle(club.id, term)}
                                              />
                                              <Label
                                                htmlFor={`term-${club.id}-${term}`}
                                                className="text-sm font-normal"
                                              >
                                                {term}
                                              </Label>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {clubVariants[club.id] && (
                                        <div className="space-y-2">
                                          <Label className="text-sm">Add-ons:</Label>
                                          <div className="space-y-1">
                                            {clubVariants[club.id].map((variant) => (
                                              <div key={variant.id} className="flex items-center space-x-1">
                                                <Checkbox
                                                  id={`variant-${club.id}-${variant.id}`}
                                                  checked={(selectedVariants[club.id] || []).includes(variant.id)}
                                                  onCheckedChange={() => handleVariantToggle(club.id, variant.id)}
                                                />
                                                <Label
                                                  htmlFor={`variant-${club.id}-${variant.id}`}
                                                  className="text-sm font-normal"
                                                >
                                                  {variant.name} (+₦{variant.amount.toLocaleString()})
                                                </Label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Warning if no terms selected */}
                                      {(!selectedTerms[club.id] || selectedTerms[club.id].length === 0) && (
                                        <div className="flex items-center text-amber-500 text-xs">
                                          <BadgeAlertIcon className="h-3 w-3 mr-1" />
                                          Please select at least one term
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </CardContent>
                                <CardFooter>
                                  <Button
                                    type="button"
                                    variant={isSelected ? "outline" : "default"}
                                    className="w-full"
                                    onClick={() => handleClubToggle(club.id)}
                                    disabled={hasTimeConflict}
                                  >
                                    {hasTimeConflict ? "Time Conflict" : isSelected ? "Remove" : "Select"}
                                  </Button>
                                </CardFooter>
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 pt-6 border-t">
            <div>
              <h3 className="text-xl font-bold">Total Amount</h3>
              <p className="text-3xl font-bold">₦{calculateTotal().toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Will be added to your school bill</p>
            </div>
            <Button type="submit" size="lg" disabled={!isFormValid()}>
              Complete Enrollment
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
