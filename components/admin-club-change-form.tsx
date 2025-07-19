"use client"

import { useState } from "react"
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

// Mock data
const mockStudents = [
  { id: 1, name: "John Doe", class: "JSS 3", section: "A" },
  { id: 2, name: "Jane Smith", class: "SSS 1", section: "B" },
  { id: 3, name: "Michael Johnson", class: "JSS 2", section: "C" },
  { id: 4, name: "Sarah Williams", class: "SSS 2", section: "A" },
  { id: 5, name: "Robert Brown", class: "JSS 1", section: "B" },
]

const mockClubs = [
  { id: 1, name: "Chess Club", fee: 15000 },
  { id: 2, name: "Debate Club", fee: 12000 },
  { id: 3, name: "Science Club", fee: 18000 },
  { id: 4, name: "Art Club", fee: 20000 },
  { id: 5, name: "Sports Club", fee: 25000 },
  { id: 6, name: "Music Club", fee: 22000 },
  { id: 7, name: "Coding Club", fee: 30000 },
]

// Student club enrollments
const mockEnrollments = [
  { studentId: 1, clubId: 1 }, // John Doe - Chess Club
  { studentId: 2, clubId: 2 }, // Jane Smith - Debate Club
  { studentId: 3, clubId: 3 }, // Michael Johnson - Science Club
  { studentId: 4, clubId: 4 }, // Sarah Williams - Art Club
  { studentId: 5, clubId: 5 }, // Robert Brown - Sports Club
]

// Form schema
const formSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student" }),
  currentClubId: z.string().min(1, { message: "Current club is required" }),
  newClubId: z.string().min(1, { message: "Please select a new club" }),
  reason: z.string().min(5, { message: "Please provide a reason for the change" }).max(500),
})

export function AdminClubChangeForm() {
  const [currentClub, setCurrentClub] = useState<{ id: number; name: string; fee: number } | null>(null)
  const [newClub, setNewClub] = useState<{ id: number; name: string; fee: number } | null>(null)
  const [feeDifference, setFeeDifference] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    const enrollment = mockEnrollments.find((e) => e.studentId === Number.parseInt(studentId))
    if (enrollment) {
      const club = mockClubs.find((c) => c.id === enrollment.clubId)
      if (club) {
        setCurrentClub(club)
        form.setValue("currentClubId", club.id.toString())
      }
    } else {
      setCurrentClub(null)
      form.setValue("currentClubId", "")
    }
    setNewClub(null)
    form.setValue("newClubId", "")
    setFeeDifference(0)
  }

  const handleNewClubChange = (clubId: string) => {
    const club = mockClubs.find((c) => c.id === Number.parseInt(clubId))
    if (club && currentClub) {
      setNewClub(club)
      const difference = club.fee - currentClub.fee
      setFeeDifference(difference)
    } else {
      setNewClub(null)
      setFeeDifference(0)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(values)
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
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} - {student.class} {student.section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentClub && (
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
                      <FormDescription>Current Fee: ₦{currentClub.fee.toLocaleString()}</FormDescription>
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
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a new club" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockClubs
                            .filter((club) => club.id !== currentClub.id)
                            .map((club) => (
                              <SelectItem key={club.id} value={club.id.toString()}>
                                {club.name} - ₦{club.fee.toLocaleString()}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {newClub && <FormDescription>New Fee: ₦{newClub.fee.toLocaleString()}</FormDescription>}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

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
                      <p className="text-sm">₦{currentClub.fee.toLocaleString()}</p>
                    </div>
                    <ArrowRightIcon className="mx-2 h-4 w-4" />
                    <div>
                      <p className="text-sm">₦{newClub.fee.toLocaleString()}</p>
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
              <Button type="submit" disabled={isSubmitting || isSuccess}>
                {isSubmitting ? "Processing..." : isSuccess ? "Submitted Successfully!" : "Submit Change Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
