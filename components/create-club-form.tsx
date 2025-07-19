"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon, TrashIcon, ImageIcon, AlertTriangleIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Variant {
  id: string
  name: string
  amount: number
}

interface TimeSlot {
  startTime: string
  endTime: string
}

// Mock existing clubs for conflict checking
const existingClubs = [
  { id: 1, name: "Chess Club", day: "Monday", startTime: "14:00", endTime: "15:00" },
  { id: 2, name: "Debate Club", day: "Monday", startTime: "15:00", endTime: "16:00" },
  { id: 3, name: "Science Club", day: "Tuesday", startTime: "14:00", endTime: "15:00" },
  { id: 4, name: "Art Club", day: "Tuesday", startTime: "15:00", endTime: "16:00" },
]

export function CreateClubForm() {
  const [variants, setVariants] = useState<Variant[]>([])
  const [newVariant, setNewVariant] = useState({ name: "", amount: 0 })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTerms, setSelectedTerms] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [clubImage, setClubImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [coordinatorType, setCoordinatorType] = useState("in-house")
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: TimeSlot }>({})
  const [timeConflicts, setTimeConflicts] = useState<{ [key: string]: any[] }>({})

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const terms = ["1st Term", "2nd Term", "3rd Term"]
  const classes = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"]

  // Sample club images for preview
  const sampleImages = [
    { name: "Chess Club", path: "/placeholder.svg?height=200&width=200" },
    { name: "Debate Club", path: "/placeholder.svg?height=200&width=200" },
    { name: "Science Club", path: "/placeholder.svg?height=200&width=200" },
    { name: "Art Club", path: "/placeholder.svg?height=200&width=200" },
    { name: "Coding Club", path: "/placeholder.svg?height=200&width=200" },
  ]

  const checkTimeConflicts = (day: string, startTime: string, endTime: string) => {
    const conflicts = existingClubs.filter((club) => {
      if (club.day !== day) return false

      const clubStart = club.startTime
      const clubEnd = club.endTime

      // Check for time overlap
      return startTime < clubEnd && endTime > clubStart
    })

    return conflicts
  }

  const handleTimeChange = (day: string, field: "startTime" | "endTime", value: string) => {
    const newTimeSlots = {
      ...timeSlots,
      [day]: {
        ...timeSlots[day],
        [field]: value,
      },
    }
    setTimeSlots(newTimeSlots)

    // Check for conflicts if both start and end times are set
    if (newTimeSlots[day]?.startTime && newTimeSlots[day]?.endTime) {
      const conflicts = checkTimeConflicts(day, newTimeSlots[day].startTime, newTimeSlots[day].endTime)
      setTimeConflicts((prev) => ({
        ...prev,
        [day]: conflicts,
      }))
    }
  }

  const handleAddVariant = () => {
    if (newVariant.name.trim() === "") return

    setVariants([...variants, { ...newVariant, id: Date.now().toString() }])
    setNewVariant({ name: "", amount: 0 })
    setIsDialogOpen(false)
  }

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const handleTermToggle = (term: string) => {
    setSelectedTerms((prev) => (prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]))
  }

  const handleClassToggle = (cls: string) => {
    setSelectedClasses((prev) => (prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
          setClubImage(file.name)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSampleImageSelect = (imagePath: string) => {
    setPreviewImage(imagePath)
    setClubImage(imagePath.split("/").pop() || null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit data to backend
    alert("Club created successfully!")
    // Reset form or redirect
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Eligibility</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Variants</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Club Name</Label>
                <Input id="name" placeholder="Enter club name" required />
              </div>

              <div className="space-y-2">
                <Label>Club Image</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="border rounded-md p-2">
                      <Label
                        htmlFor="image"
                        className="cursor-pointer flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md"
                      >
                        {previewImage ? (
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Club preview"
                            className="h-full w-full object-cover rounded-md"
                          />
                        ) : (
                          <>
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Upload an image</span>
                          </>
                        )}
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Upload an image that represents this club</p>
                  </div>

                  <div>
                    <Label className="block mb-2">Or select a sample image:</Label>
                    <div className="grid grid-cols-2 gap-2 h-40 overflow-y-auto border rounded-md p-2">
                      {sampleImages.map((img) => (
                        <div
                          key={img.path}
                          className={`cursor-pointer border rounded-md overflow-hidden ${previewImage === img.path ? "ring-2 ring-primary" : ""}`}
                          onClick={() => handleSampleImageSelect(img.path)}
                        >
                          <img
                            src={img.path || "/placeholder.svg"}
                            alt={img.name}
                            className="h-16 w-full object-cover"
                          />
                          <div className="p-1 text-xs text-center truncate">{img.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What is this club about? What activities will students participate in?"
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinator-type">Club Coordinator</Label>
                <Select defaultValue="in-house" onValueChange={(value) => setCoordinatorType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coordinator type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-house">In-house (Staff)</SelectItem>
                    <SelectItem value="vendor">External Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinator">
                  {coordinatorType === "in-house" ? "Select Coordinator" : "Select Vendor"}
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={coordinatorType === "in-house" ? "Select a coordinator" : "Select a vendor"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {coordinatorType === "in-house" ? (
                      <>
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Smith</SelectItem>
                        <SelectItem value="3">Michael Johnson</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="v1">Chess Masters Inc.</SelectItem>
                        <SelectItem value="v2">Science Explorers Ltd.</SelectItem>
                        <SelectItem value="v3">Art Studio Academy</SelectItem>
                        <SelectItem value="v4">Robotics Innovations</SelectItem>
                        <SelectItem value="v5">Music Maestros</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assistant">Assistant Coordinator</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an assistant (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                    <SelectItem value="3">Michael Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Days of the Week</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={selectedDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={`day-${day}`} className="text-sm font-normal">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time slots for each selected day */}
              {selectedDays.map((day) => (
                <div key={day} className="space-y-4 p-4 border rounded-md">
                  <h4 className="font-medium">{day} Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-time-${day}`}>Start Time</Label>
                      <Input
                        id={`start-time-${day}`}
                        type="time"
                        value={timeSlots[day]?.startTime || ""}
                        onChange={(e) => handleTimeChange(day, "startTime", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`end-time-${day}`}>End Time</Label>
                      <Input
                        id={`end-time-${day}`}
                        type="time"
                        value={timeSlots[day]?.endTime || ""}
                        onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Show time conflicts */}
                  {timeConflicts[day] && timeConflicts[day].length > 0 && (
                    <Alert className="border-amber-200 bg-amber-50">
                      <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>Time Conflict Detected:</strong> This time slot overlaps with:
                        <ul className="mt-1 ml-4 list-disc">
                          {timeConflicts[day].map((club) => (
                            <li key={club.id}>
                              {club.name} ({club.startTime} - {club.endTime})
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-sm">
                          Students will need to choose between conflicting clubs during enrollment.
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <Label>Terms</Label>
                <div className="grid grid-cols-3 gap-2">
                  {terms.map((term) => (
                    <div key={term} className="flex items-center space-x-2">
                      <Checkbox
                        id={`term-${term}`}
                        checked={selectedTerms.includes(term)}
                        onCheckedChange={() => handleTermToggle(term)}
                      />
                      <Label htmlFor={`term-${term}`} className="text-sm font-normal">
                        {term}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Eligible Classes</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {classes.map((cls) => (
                    <div key={cls} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${cls}`}
                        checked={selectedClasses.includes(cls)}
                        onCheckedChange={() => handleClassToggle(cls)}
                      />
                      <Label htmlFor={`class-${cls}`} className="text-sm font-normal">
                        {cls}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Base Amount</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">₦</span>
                  <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" className="pl-6" />
                </div>
                <p className="text-xs text-muted-foreground">Base fee for club enrollment (per term)</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Club Variants</Label>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <PlusIcon className="h-4 w-4 mr-1" /> Add Variant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Club Variant</DialogTitle>
                        <DialogDescription>
                          Create a variant option for this club (e.g., With Uniform, With Equipment)
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="variant-name">Variant Name</Label>
                          <Input
                            id="variant-name"
                            placeholder="e.g., With Uniform"
                            value={newVariant.name}
                            onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="variant-amount">Additional Amount</Label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">₦</span>
                            <Input
                              id="variant-amount"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-6"
                              value={newVariant.amount || ""}
                              onChange={(e) =>
                                setNewVariant({ ...newVariant, amount: Number.parseFloat(e.target.value) || 0 })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddVariant}>Add Variant</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {variants.length > 0 ? (
                  <div className="space-y-2">
                    {variants.map((variant) => (
                      <div key={variant.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">{variant.name}</p>
                          <p className="text-sm text-muted-foreground">₦{variant.amount.toFixed(2)}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveVariant(variant.id)}>
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No variants added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Create Club</Button>
      </div>
    </form>
  )
}
