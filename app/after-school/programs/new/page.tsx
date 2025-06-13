"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  ChevronRight,
  Save,
  X,
  Plus,
  Trash2,
  CalendarPlus2Icon as CalendarIcon2,
  Clock,
  Users,
  DollarSign,
  BookOpen,
  MapPin,
  Info,
  CheckCircle2,
} from "lucide-react"

export default function NewAfterSchoolProgramPage() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [formData, setFormData] = useState({
    programName: "",
    description: "",
    category: "",
    ageGroup: "",
    capacity: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    daysOfWeek: [] as string[],
    startTime: "",
    endTime: "",
    instructors: [] as string[],
    venue: "",
    fee: "",
    feeType: "one-time",
    materials: "",
    isPublished: false,
    requiresApproval: true,
    allowWaitlist: true,
  })
  const [activeTab, setActiveTab] = useState("basic")
  const [schedules, setSchedules] = useState([
    { day: "Monday", startTime: "15:00", endTime: "16:30", venue: "Main Hall" },
  ])
  const [previewMode, setPreviewMode] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const currentDays = [...prev.daysOfWeek]
      if (currentDays.includes(day)) {
        return { ...prev, daysOfWeek: currentDays.filter((d) => d !== day) }
      } else {
        return { ...prev, daysOfWeek: [...currentDays, day] }
      }
    })
  }

  const addSchedule = () => {
    setSchedules([...schedules, { day: "Monday", startTime: "15:00", endTime: "16:30", venue: "Main Hall" }])
  }

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index))
  }

  const updateSchedule = (index: number, field: string, value: string) => {
    const updatedSchedules = [...schedules]
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value }
    setSchedules(updatedSchedules)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", { ...formData, schedules })

    // Show success message and redirect
    alert("Program created successfully!")
    router.push("/after-school/programs")
  }

  const handleSaveAsDraft = () => {
    console.log("Saved as draft:", { ...formData, schedules })
    alert("Program saved as draft!")
    router.push("/after-school/programs")
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All changes will be lost.")) {
      router.push("/after-school/programs")
    }
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  // Sample data for dropdowns
  const categories = [
    "Academic",
    "Arts & Crafts",
    "Music",
    "Sports",
    "Technology",
    "Language",
    "Science",
    "Math",
    "Robotics",
  ]

  const ageGroups = ["5-7 years", "8-10 years", "11-13 years", "14-16 years", "All ages"]

  const venues = [
    "Main Hall",
    "Sports Field",
    "Computer Lab",
    "Music Room",
    "Art Studio",
    "Science Lab",
    "Classroom A",
    "Classroom B",
  ]

  const instructorsList = [
    "John Smith",
    "Maria Garcia",
    "David Johnson",
    "Sarah Williams",
    "Robert Brown",
    "Jennifer Davis",
  ]

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Apps</span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              <ChevronRight size={16} className="inline" />
            </span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary">After School</span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              <ChevronRight size={16} className="inline" />
            </span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Programs</span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              <ChevronRight size={16} className="inline" />
            </span>
            <span className="text-primary italic">New Program</span>
          </div>

          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Create New After-School Program</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={togglePreview}>
                {previewMode ? "Edit Mode" : "Preview"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveAsDraft}>
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button onClick={handleSubmit}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Create Program
              </Button>
            </div>
          </div>

          {previewMode ? (
            <PreviewMode formData={formData} schedules={schedules} />
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full mb-6">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="instructors">Instructors</TabsTrigger>
                  <TabsTrigger value="fees">Fees & Resources</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Program Information</CardTitle>
                      <CardDescription>Enter the fundamental details about your after-school program.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="programName">
                            Program Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="programName"
                            name="programName"
                            placeholder="e.g., Robotics Club, Chess Masters, Art Workshop"
                            value={formData.programName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">
                            Program Description <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Provide a detailed description of the program, its objectives, and benefits for students..."
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={5}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="category">
                              Program Category <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleSelectChange("category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="ageGroup">
                              Age Group <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.ageGroup}
                              onValueChange={(value) => handleSelectChange("ageGroup", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select age range" />
                              </SelectTrigger>
                              <SelectContent>
                                {ageGroups.map((age) => (
                                  <SelectItem key={age} value={age}>
                                    {age}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="capacity">
                            Maximum Capacity <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            placeholder="e.g., 20"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            min="1"
                            required
                          />
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Maximum number of students who can enroll in this program.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>
                              Start Date <span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formData.startDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formData.startDate || undefined}
                                  onSelect={(date) => handleDateChange("startDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              End Date <span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formData.endDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formData.endDate || undefined}
                                  onSelect={(date) => handleDateChange("endDate", date)}
                                  initialFocus
                                  disabled={(date) => (formData.startDate ? date < formData.startDate : false)}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("settings")}>
                        Skip to End
                      </Button>
                      <Button onClick={() => setActiveTab("schedule")}>Continue to Schedule</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Schedule Tab */}
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Schedule</CardTitle>
                      <CardDescription>Set up the schedule for when this program will run.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {schedules.map((schedule, index) => (
                        <div key={index} className="border p-4 rounded-md relative">
                          {schedules.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeSchedule(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>Day of Week</Label>
                              <Select
                                value={schedule.day}
                                onValueChange={(value) => updateSchedule(index, "day", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                    (day) => (
                                      <SelectItem key={day} value={day}>
                                        {day}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Start Time</Label>
                              <Input
                                type="time"
                                value={schedule.startTime}
                                onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>End Time</Label>
                              <Input
                                type="time"
                                value={schedule.endTime}
                                onChange={(e) => updateSchedule(index, "endTime", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Venue</Label>
                              <Select
                                value={schedule.venue}
                                onValueChange={(value) => updateSchedule(index, "venue", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select venue" />
                                </SelectTrigger>
                                <SelectContent>
                                  {venues.map((venue) => (
                                    <SelectItem key={venue} value={venue}>
                                      {venue}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={addSchedule} className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Another Schedule
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("basic")}>
                        Back
                      </Button>
                      <Button onClick={() => setActiveTab("instructors")}>Continue to Instructors</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Instructors Tab */}
                <TabsContent value="instructors">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Instructors</CardTitle>
                      <CardDescription>Assign instructors who will be teaching this program.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Select Instructors</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {instructorsList.map((instructor) => (
                            <div key={instructor} className="flex items-center space-x-2 border p-3 rounded-md">
                              <Checkbox
                                id={`instructor-${instructor}`}
                                checked={formData.instructors.includes(instructor)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      instructors: [...prev.instructors, instructor],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      instructors: prev.instructors.filter((i) => i !== instructor),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`instructor-${instructor}`} className="flex-1 cursor-pointer">
                                {instructor}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" /> Add New Instructor
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("schedule")}>
                        Back
                      </Button>
                      <Button onClick={() => setActiveTab("fees")}>Continue to Fees & Resources</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Fees Tab */}
                <TabsContent value="fees">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fees & Resources</CardTitle>
                      <CardDescription>Set up program fees and required resources.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fee">
                            Program Fee <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              id="fee"
                              name="fee"
                              type="number"
                              placeholder="0.00"
                              value={formData.fee}
                              onChange={handleInputChange}
                              className="pl-10"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="feeType">Fee Type</Label>
                          <RadioGroup
                            value={formData.feeType}
                            onValueChange={(value) => handleSelectChange("feeType", value)}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-time" id="one-time" />
                              <Label htmlFor="one-time">One-time Fee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly Fee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="per-session" id="per-session" />
                              <Label htmlFor="per-session">Per Session</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="materials">Required Materials & Resources</Label>
                        <Textarea
                          id="materials"
                          name="materials"
                          placeholder="List any materials or resources students need to bring or that will be provided..."
                          value={formData.materials}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("instructors")}>
                        Back
                      </Button>
                      <Button onClick={() => setActiveTab("settings")}>Continue to Settings</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Settings</CardTitle>
                      <CardDescription>Configure additional settings for your program.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="requiresApproval">Require Approval</Label>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Require administrator approval for student enrollment
                          </p>
                        </div>
                        <Switch
                          id="requiresApproval"
                          checked={formData.requiresApproval}
                          onCheckedChange={(checked) => handleSwitchChange("requiresApproval", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowWaitlist">Allow Waitlist</Label>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Allow students to join a waitlist when program is full
                          </p>
                        </div>
                        <Switch
                          id="allowWaitlist"
                          checked={formData.allowWaitlist}
                          onCheckedChange={(checked) => handleSwitchChange("allowWaitlist", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="isPublished">Publish Program</Label>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Make this program visible to students and parents
                          </p>
                        </div>
                        <Switch
                          id="isPublished"
                          checked={formData.isPublished}
                          onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("fees")}>
                        Back
                      </Button>
                      <Button type="submit">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Create Program
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </form>
          )}
        </main>
      </div>
    </div>
  )
}

// Preview Mode Component
function PreviewMode({
  formData,
  schedules,
}: {
  formData: any
  schedules: { day: string; startTime: string; endTime: string; venue: string }[]
}) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{formData.programName || "Program Name"}</CardTitle>
              <CardDescription>
                {formData.category || "Category"} | {formData.ageGroup || "Age Group"}
              </CardDescription>
            </div>
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {formData.isPublished ? "Published" : "Draft"}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{formData.description || "No description provided."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-start space-x-2">
              <CalendarIcon2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Program Duration</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {formData.startDate ? format(formData.startDate, "MMM d, yyyy") : "Start Date"} -{" "}
                  {formData.endDate ? format(formData.endDate, "MMM d, yyyy") : "End Date"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Capacity</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {formData.capacity || "0"} students
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <DollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Program Fee</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  ${formData.fee || "0"} (
                  {formData.feeType === "one-time"
                    ? "One-time"
                    : formData.feeType === "monthly"
                      ? "Monthly"
                      : "Per Session"}
                  )
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedules.length > 0 ? (
              <div className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{schedule.day}</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                    </div>
                    <div className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-primary" />
                      {schedule.venue}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light-text-secondary dark:text-dark-text-secondary">No schedule defined.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Instructors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.instructors && formData.instructors.length > 0 ? (
              <div className="space-y-2">
                {formData.instructors.map((instructor: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-primary/5 rounded-md">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      {instructor
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <span>{instructor}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light-text-secondary dark:text-dark-text-secondary">No instructors assigned.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" /> Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Required Materials & Resources</h4>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              {formData.materials || "No materials specified."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-md">
              <CheckCircle2 className={`h-5 w-5 ${formData.requiresApproval ? "text-primary" : "text-gray-400"}`} />
              <span>Requires Approval</span>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-md">
              <CheckCircle2 className={`h-5 w-5 ${formData.allowWaitlist ? "text-primary" : "text-gray-400"}`} />
              <span>Waitlist Allowed</span>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-md">
              <CheckCircle2 className={`h-5 w-5 ${formData.isPublished ? "text-primary" : "text-gray-400"}`} />
              <span>Published</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
