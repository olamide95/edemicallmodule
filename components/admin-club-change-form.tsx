"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRightIcon } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"

// Form schema
const formSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student" }),
  currentClubId: z.string().min(1, { message: "Current club is required" }),
  newClubId: z.string().min(1, { message: "Please select a new club" }),
  reason: z.string().min(5, { message: "Please provide a reason for the change" }).max(500),
})

type Student = {
  id: string
  firstName: string
  lastName: string
  admissionId: string
  studentId: string
  class: string
  section: string
  status: string
}

type Club = {
  id: string
  name: string
  fee: number
  status: string
  description?: string
  terms?: string[]
  classes?: string[]
  variants?: {
    id: string
    name: string
    amount: number
  }[]
}

type Enrollment = {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  clubId: string
  clubName: string
  terms: string[]
  variant: string
  amount: number
  status: "Active" | "Inactive"
  enrollmentDate: string
}

export function AdminClubChangeForm() {
  const [students, setStudents] = useState<Student[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [currentClub, setCurrentClub] = useState<Club | null>(null)
  const [newClub, setNewClub] = useState<Club | null>(null)
  const [feeDifference, setFeeDifference] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [availableClubs, setAvailableClubs] = useState<Club[]>([])

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load students (only admitted ones with studentId)
      const savedStudents = localStorage.getItem('admissionFormResponses')
      if (savedStudents) {
        const allStudents = JSON.parse(savedStudents)
        const admittedStudents = allStudents
          .filter((s: any) => s.status === "Admitted" && s.studentId)
          .map((s: any) => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            admissionId: s.admissionNumber || `ADM-${s.id.slice(0, 8)}`,
            studentId: s.studentId,
            class: s.class || "JSS 1",
            section: s.section || "A",
            status: s.status
          }))
        setStudents(admittedStudents)
      }

      // Load clubs
      const savedClubs = localStorage.getItem('clubs')
      if (savedClubs) {
        const allClubs = JSON.parse(savedClubs)
        const activeClubs = allClubs.filter((c: any) => c.status === "active")
        setClubs(activeClubs)
        setAvailableClubs(activeClubs)
      }

      // Load enrollments
      const savedEnrollments = localStorage.getItem('enrollments')
      if (savedEnrollments) {
        setEnrollments(JSON.parse(savedEnrollments))
      } else {
        setEnrollments([])
      }
    }

    loadData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      currentClubId: "",
      newClubId: "",
      reason: "",
    },
  })

  const handleStudentChange = (studentId: string) => {
    // Find active enrollment for this student
    const enrollment = enrollments.find(
      (e) => e.studentId === studentId && e.status === "Active"
    )
    
    if (enrollment) {
      const club = clubs.find((c) => c.id === enrollment.clubId)
      if (club) {
        setCurrentClub(club)
        form.setValue("currentClubId", club.id)
        
        // Update available clubs (all active clubs except the current one)
        setAvailableClubs(clubs.filter(c => c.id !== club.id))
      }
    } else {
      setCurrentClub(null)
      form.setValue("currentClubId", "")
      setAvailableClubs(clubs) // Show all active clubs if student isn't enrolled
    }
    
    setNewClub(null)
    form.setValue("newClubId", "")
    setFeeDifference(0)
  }

  const handleNewClubChange = (clubId: string) => {
    const club = clubs.find((c) => c.id === clubId)
    if (club) {
      setNewClub(club)
      const currentFee = currentClub?.fee || 0
      const difference = club.fee - currentFee
      setFeeDifference(difference)
    } else {
      setNewClub(null)
      setFeeDifference(0)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    
    // Create new club change request
    const newRequest = {
      id: Date.now().toString(),
      studentId: values.studentId,
      currentClubId: values.currentClubId,
      newClubId: values.newClubId,
      reason: values.reason,
      requestDate: new Date().toISOString().split('T')[0],
      status: "pending" as const,
      feeDifference: feeDifference,
      studentDetails: students.find(s => s.id === values.studentId),
      currentClubDetails: currentClub,
      newClubDetails: clubs.find(c => c.id === values.newClubId)
    }

    // Save to localStorage
    const savedRequests = localStorage.getItem('clubChangeRequests')
    const existingRequests = savedRequests ? JSON.parse(savedRequests) : []
    const updatedRequests = [...existingRequests, newRequest]
    localStorage.setItem('clubChangeRequests', JSON.stringify(updatedRequests))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset()
      setCurrentClub(null)
      setNewClub(null)
      setFeeDifference(0)
      setIsSuccess(false)
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleStudentChange(value)
                    }}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName} - {student.class} {student.section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentClub ? (
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="currentClubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Club</FormLabel>
                      <div className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">
                        {currentClub.name}
                      </div>
                      <FormDescription>
                        Current Fee: ₦{(currentClub.fee || 0).toLocaleString()}
                        {currentClub.description && (
                          <p className="text-xs mt-1">{currentClub.description}</p>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newClubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Club</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleNewClubChange(value)
                        }}
                        value={field.value}
                        disabled={isSubmitting || !currentClub}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a new club" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableClubs.length > 0 ? (
                            availableClubs.map((club) => (
                              <SelectItem key={club.id} value={club.id}>
                                <div className="flex flex-col">
                                  <span>{club.name} - ₦{(club.fee || 0).toLocaleString()}</span>
                                  {club.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {club.description.length > 50 
                                        ? `${club.description.substring(0, 50)}...` 
                                        : club.description}
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              No other clubs available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {newClub && (
                        <FormDescription>
                          New Fee: ₦{(newClub.fee || 0).toLocaleString()}
                          {newClub.description && (
                            <p className="text-xs mt-1">{newClub.description}</p>
                          )}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : form.getValues("studentId") ? (
              <div className="rounded-md border border-dashed p-4 text-center">
                <p className="text-muted-foreground">
                  Selected student is not currently enrolled in any club.
                </p>
              </div>
            ) : null}

            {currentClub && newClub && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Fee Difference</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-lg font-bold">₦{Math.abs(feeDifference).toLocaleString()}</p>
                      {feeDifference !== 0 && (
                        <StatusBadge status={feeDifference > 0 ? "Additional Payment" : "Refund"} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="text-right">
                      <p className="text-sm">₦{(currentClub.fee || 0).toLocaleString()}</p>
                    </div>
                    <ArrowRightIcon className="mx-2 h-4 w-4" />
                    <div>
                      <p className="text-sm">₦{(newClub.fee || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Change</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide a reason for changing clubs"
                      className="min-h-[100px]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={
                  isSubmitting || 
                  isSuccess || 
                  !form.getValues("studentId") || 
                  !currentClub || 
                  !form.getValues("newClubId")
                }
              >
                {isSubmitting ? "Processing..." : isSuccess ? "Submitted Successfully!" : "Submit Change Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}