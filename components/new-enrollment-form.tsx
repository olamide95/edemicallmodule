"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BadgeAlertIcon, AlertTriangleIcon, ClockIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'

interface Club {
  id: string
  name: string
  day: string
  time: string
  timeSlot: string
  amount: number
  variants?: { id: string; name: string; amount: number }[]
}

interface Student {
  id: string
  name: string
  class: string
  section: string
  status: "active" | "inactive"
}

interface Variant {
  id: string
  name: string
  amount: number
}

interface TimeSlot {
  startTime: string
  endTime: string
}

export function NewEnrollmentForm() {
  const router = useRouter()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedClubs, setSelectedClubs] = useState<{ [key: string]: string }>({})
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string[] }>({})
  const [selectedTerms, setSelectedTerms] = useState<{ [key: string]: string[] }>({})
  const [students, setStudents] = useState<Student[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [sections, setSections] = useState<string[]>([])
  const [terms, setTerms] = useState<string[]>(["1st Term", "2nd Term", "3rd Term"])

  // Load data from localStorage
  useEffect(() => {
    // Load students (mapped students from student ID mapper)
    const savedStudents = localStorage.getItem('admissionFormResponses')
    if (savedStudents) {
      const allStudents = JSON.parse(savedStudents)
      const mappedStudents = allStudents
        .filter((student: any) => student.status === "Admitted" && student.studentId)
        .map((student: any) => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          class: student.class || "Not Assigned",
          section: student.section || "Not Assigned",
          status: "active"
        }))
      setStudents(mappedStudents)
    }

    // Load clubs
    const savedClubs = localStorage.getItem('clubs')
    if (savedClubs) {
      setClubs(JSON.parse(savedClubs))
    }

    // Load classes and sections
    const savedClasses = localStorage.getItem('classes')
    if (savedClasses) {
      const classData = JSON.parse(savedClasses)
      const classNames = classData.map((cls: any) => cls.name)
      setClasses(classNames)
      
      // Extract unique sections
      const allSections = classData.flatMap((cls: any) => 
        cls.sections.map((sec: any) => sec.name)
      )
      setSections([...new Set(allSections)])
    }
  }, [])

  // Group clubs by day for display
  const clubsByDay = clubs.reduce((acc, club) => {
    if (!acc[club.day]) {
      acc[club.day] = []
    }
    acc[club.day].push(club)
    return acc
  }, {} as Record<string, Club[]>)

  // Group clubs by time slots for conflict detection
  const getClubsByTimeSlot = (day: string) => {
    const dayClubs = clubsByDay[day] || []
    const grouped: { [key: string]: Club[] } = {}

    dayClubs.forEach((club) => {
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
      const club = clubs.find((c) => c.id === clubId)
      if (club) {
        const termsForClub = selectedTerms[day] || []
        total += club.amount * termsForClub.length

        // Add variants
        const variants = selectedVariants[day] || []
        variants.forEach((variantId) => {
          const variant = club.variants?.find((v) => v.id === variantId)
          if (variant) {
            total += variant.amount * termsForClub.length
          }
        })
      }
    })

    return total
  }

  const handleClubSelection = (day: string, clubId: string) => {
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

  const handleVariantToggle = (day: string, variantId: string) => {
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

    if (!selectedStudent || Object.keys(selectedClubs).length === 0) {
      alert("Please select a student and at least one club")
      return
    }

    // Check if all selected clubs have at least one term selected
    const allClubsHaveTerms = Object.entries(selectedClubs).every(([day]) => {
      return selectedTerms[day] && selectedTerms[day].length > 0
    })

    if (!allClubsHaveTerms) {
      alert("Please select at least one term for each club")
      return
    }

    // Create enrollment records (one per club)
    const newEnrollments = Object.entries(selectedClubs).map(([day, clubId]) => {
      const club = clubs.find((c) => c.id === clubId)
      const variants = selectedVariants[day] || []
      const variantNames = variants.map(variantId => {
        const variant = club?.variants?.find(v => v.id === variantId)
        return variant ? variant.name : ""
      }).filter(Boolean)

      return {
        id: uuidv4(),
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        class: selectedStudent.class,
        section: selectedStudent.section,
        clubId: clubId,
        clubName: club?.name || "",
        terms: selectedTerms[day] || [],
        variant: variantNames.join(", ") || "Standard",
        amount: calculateTotal(),
        status: "Active" as const,
        enrollmentDate: new Date().toISOString()
      }
    })

    // Save to localStorage
    const savedEnrollments = localStorage.getItem('enrollments')
    const existingEnrollments = savedEnrollments ? JSON.parse(savedEnrollments) : []
    const updatedEnrollments = [...existingEnrollments, ...newEnrollments]
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments))

    // Redirect to enrollments list
    router.push('/admin/enrollments')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student">Select Student *</Label>
          <Select 
            value={selectedStudent?.id || ""} 
            onValueChange={(value) => {
              const student = students.find(s => s.id === value)
              setSelectedStudent(student || null)
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.length > 0 ? (
                students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} - {student.class} {student.section && `(${student.section})`}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No students found</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Select Clubs *</h3>

        {Object.entries(clubsByDay).map(([day, dayClubs]) => {
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
                      value={selectedClubs[day] || ""}
                      onValueChange={(value) => handleClubSelection(day, value)}
                    >
                      {timeSlotClubs.map((club) => (
                        <div key={club.id} className="flex items-start space-x-2 py-2 pl-4">
                          <RadioGroupItem value={club.id} id={`club-${day}-${club.id}`} />
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
                      <Label className="text-sm font-medium">Select Terms *</Label>
                      <div className="flex flex-wrap gap-4">
                        {terms.map((term) => (
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
                    {clubs.find(c => c.id === selectedClubs[day])?.variants && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Club Variants</Label>
                        <div className="space-y-2">
                          {clubs.find(c => c.id === selectedClubs[day])?.variants?.map((variant) => (
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
          <Button type="button" variant="outline" onClick={() => router.push('/admin/enrollments')}>
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