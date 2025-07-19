"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Clock, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for extracurricular activities
const extracurricularData = {
  monday: [
    {
      timeSlot: "After School (2:00 PM - 3:30 PM)",
      activities: [
        { id: "mon-1-1", name: "Soccer", fee: 15000, capacity: 20, enrolled: 15 },
        { id: "mon-1-2", name: "Chess Club", fee: 8000, capacity: 15, enrolled: 8 },
        { id: "mon-1-3", name: "Debate Club", fee: 10000, capacity: 12, enrolled: 10 },
      ],
    },
    {
      timeSlot: "Evening (4:00 PM - 5:30 PM)",
      activities: [
        { id: "mon-2-1", name: "Swimming", fee: 20000, capacity: 15, enrolled: 12 },
        { id: "mon-2-2", name: "Art & Craft", fee: 12000, capacity: 18, enrolled: 10 },
      ],
    },
  ],
  tuesday: [
    {
      timeSlot: "After School (2:00 PM - 3:30 PM)",
      activities: [
        { id: "tue-1-1", name: "Basketball", fee: 15000, capacity: 20, enrolled: 16 },
        { id: "tue-1-2", name: "Science Club", fee: 12000, capacity: 15, enrolled: 7 },
        { id: "tue-1-3", name: "Coding Club", fee: 18000, capacity: 12, enrolled: 9 },
      ],
    },
    {
      timeSlot: "Evening (4:00 PM - 5:30 PM)",
      activities: [
        { id: "tue-2-1", name: "Music (Piano)", fee: 25000, capacity: 10, enrolled: 8 },
        { id: "tue-2-2", name: "Dance", fee: 18000, capacity: 15, enrolled: 12 },
      ],
    },
  ],
  wednesday: [
    {
      timeSlot: "After School (2:00 PM - 3:30 PM)",
      activities: [
        { id: "wed-1-1", name: "Volleyball", fee: 15000, capacity: 18, enrolled: 12 },
        { id: "wed-1-2", name: "Math Club", fee: 10000, capacity: 15, enrolled: 6 },
        { id: "wed-1-3", name: "Robotics", fee: 22000, capacity: 10, enrolled: 8 },
      ],
    },
    {
      timeSlot: "Evening (4:00 PM - 5:30 PM)",
      activities: [
        { id: "wed-2-1", name: "Music (Guitar)", fee: 25000, capacity: 10, enrolled: 7 },
        { id: "wed-2-2", name: "Photography", fee: 20000, capacity: 12, enrolled: 5 },
      ],
    },
  ],
  thursday: [
    {
      timeSlot: "After School (2:00 PM - 3:30 PM)",
      activities: [
        { id: "thu-1-1", name: "Table Tennis", fee: 12000, capacity: 16, enrolled: 10 },
        { id: "thu-1-2", name: "Literature Club", fee: 8000, capacity: 15, enrolled: 7 },
        { id: "thu-1-3", name: "Drama Club", fee: 15000, capacity: 20, enrolled: 15 },
      ],
    },
    {
      timeSlot: "Evening (4:00 PM - 5:30 PM)",
      activities: [
        { id: "thu-2-1", name: "Music (Violin)", fee: 25000, capacity: 10, enrolled: 6 },
        { id: "thu-2-2", name: "Cooking Class", fee: 18000, capacity: 15, enrolled: 12 },
      ],
    },
  ],
  friday: [
    {
      timeSlot: "After School (2:00 PM - 3:30 PM)",
      activities: [
        { id: "fri-1-1", name: "Athletics", fee: 15000, capacity: 25, enrolled: 18 },
        { id: "fri-1-2", name: "Environmental Club", fee: 10000, capacity: 15, enrolled: 8 },
        { id: "fri-1-3", name: "Foreign Language", fee: 20000, capacity: 12, enrolled: 9 },
      ],
    },
    {
      timeSlot: "Evening (4:00 PM - 5:30 PM)",
      activities: [
        { id: "fri-2-1", name: "Music (Drums)", fee: 22000, capacity: 8, enrolled: 5 },
        { id: "fri-2-2", name: "Yoga", fee: 15000, capacity: 20, enrolled: 15 },
      ],
    },
  ],
}

// Children data
const childrenData = [
  { id: "1", name: "Alex Smith", grade: "Grade 10A" },
  { id: "2", name: "Emma Smith", grade: "Grade 8B" },
]

export function ExtracurricularRegistration() {
  const [expandedTimeSlots, setExpandedTimeSlots] = useState<string[]>([])
  const [selectedActivities, setSelectedActivities] = useState<{ [key: string]: string }>({})
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount).replace(/NGN/g, "₦")
  }

  // Toggle time slot expansion
  const toggleTimeSlot = (day: string, timeSlot: string) => {
    const key = `${day}-${timeSlot}`
    if (expandedTimeSlots.includes(key)) {
      setExpandedTimeSlots(expandedTimeSlots.filter((slot) => slot !== key))
    } else {
      setExpandedTimeSlots([...expandedTimeSlots, key])
    }
  }

  // Handle activity selection
  const handleActivitySelection = (day: string, timeSlot: string, activityId: string) => {
    const key = `${day}-${timeSlot}`
    setSelectedActivities({
      ...selectedActivities,
      [key]: activityId,
    })
  }

  // Calculate total fees
  const calculateTotalFees = () => {
    let total = 0
    Object.entries(selectedActivities).forEach(([key, activityId]) => {
      const [day, timeSlot] = key.split("-")
      const dayData = extracurricularData[day as keyof typeof extracurricularData]
      const timeSlotData = dayData.find((ts) => ts.timeSlot.includes(timeSlot))
      if (timeSlotData) {
        const activity = timeSlotData.activities.find((a) => a.id === activityId)
        if (activity) {
          total += activity.fee
        }
      }
    })
    return total
  }

  // Get selected activity details
  const getSelectedActivityDetails = (key: string, activityId: string) => {
    const [day, timeSlot] = key.split("-")
    const dayData = extracurricularData[day as keyof typeof extracurricularData]
    const timeSlotData = dayData.find((ts) => ts.timeSlot.includes(timeSlot))
    if (timeSlotData) {
      return timeSlotData.activities.find((a) => a.id === activityId)
    }
    return null
  }

  // Handle registration
  const handleRegistration = () => {
    if (!selectedChild) {
      alert("Please select a child")
      return
    }

    if (Object.keys(selectedActivities).length === 0) {
      alert("Please select at least one activity")
      return
    }

    setIsRegistering(true)

    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false)
      alert("Registration successful!")

      // Reset form
      setSelectedActivities({})
      setSelectedChild(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Child Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
          <CardDescription>Choose which child you want to register for extracurricular activities</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedChild || ""} onValueChange={setSelectedChild}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {childrenData.map((child) => (
                <div key={child.id} className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value={child.id} id={`child-${child.id}`} />
                  <Label htmlFor={`child-${child.id}`} className="flex flex-col cursor-pointer">
                    <span className="font-medium">{child.name}</span>
                    <span className="text-sm text-muted-foreground">{child.grade}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Activities Selection */}
      {selectedChild && (
        <Card>
          <CardHeader>
            <CardTitle>Select Activities</CardTitle>
            <CardDescription>
              Choose extracurricular activities for {childrenData.find((c) => c.id === selectedChild)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monday">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="monday">Monday</TabsTrigger>
                <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                <TabsTrigger value="thursday">Thursday</TabsTrigger>
                <TabsTrigger value="friday">Friday</TabsTrigger>
              </TabsList>

              {Object.entries(extracurricularData).map(([day, timeSlots]) => (
                <TabsContent key={day} value={day} className="space-y-4">
                  {timeSlots.map((timeSlot, index) => {
                    const timeSlotKey = `${day}-${index + 1}`
                    const isExpanded = expandedTimeSlots.includes(timeSlotKey)
                    return (
                      <Collapsible
                        key={timeSlotKey}
                        open={isExpanded}
                        onOpenChange={() => toggleTimeSlot(day, `${index + 1}`)}
                        className="border rounded-md overflow-hidden"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted/30 hover:bg-muted/50">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                            <span className="font-medium">{timeSlot.timeSlot}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 space-y-4">
                            <RadioGroup
                              value={selectedActivities[timeSlotKey] || ""}
                              onValueChange={(value) => handleActivitySelection(day, `${index + 1}`, value)}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {timeSlot.activities.map((activity) => {
                                  const capacityPercentage = (activity.enrolled / activity.capacity) * 100
                                  const isFull = activity.enrolled >= activity.capacity
                                  return (
                                    <div
                                      key={activity.id}
                                      className={`border rounded-md p-4 ${
                                        isFull ? "opacity-60 cursor-not-allowed" : ""
                                      }`}
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value={activity.id} id={activity.id} disabled={isFull} />
                                          <Label htmlFor={activity.id} className="font-medium cursor-pointer">
                                            {activity.name}
                                          </Label>
                                        </div>
                                        <div className="text-right font-medium">{formatCurrency(activity.fee)}</div>
                                      </div>
                                      <div className="ml-6 space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Users className="h-4 w-4 mr-1" />
                                          <span>
                                            {activity.enrolled} / {activity.capacity} enrolled
                                          </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${
                                              capacityPercentage > 80
                                                ? "bg-red-500"
                                                : capacityPercentage > 50
                                                  ? "bg-yellow-500"
                                                  : "bg-green-500"
                                            }`}
                                            style={{ width: `${capacityPercentage}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </RadioGroup>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Registration Summary */}
      {selectedChild && Object.keys(selectedActivities).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Summary</CardTitle>
            <CardDescription>
              Review your selections for {childrenData.find((c) => c.id === selectedChild)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 grid grid-cols-3">
                  <span className="font-medium">Day</span>
                  <span className="font-medium">Activity</span>
                  <span className="font-medium text-right">Fee</span>
                </div>
                {Object.entries(selectedActivities).map(([key, activityId]) => {
                  const [day, timeSlotIndex] = key.split("-")
                  const activity = getSelectedActivityDetails(key, activityId)
                  if (!activity) return null

                  const dayName = day.charAt(0).toUpperCase() + day.slice(1)
                  const timeSlot =
                    extracurricularData[day as keyof typeof extracurricularData][Number.parseInt(timeSlotIndex) - 1]
                      .timeSlot

                  return (
                    <div key={key} className="px-4 py-3 border-t grid grid-cols-3">
                      <div>
                        <div className="font-medium">{dayName}</div>
                        <div className="text-sm text-muted-foreground">{timeSlot}</div>
                      </div>
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-right">{formatCurrency(activity.fee)}</div>
                    </div>
                  )
                })}
                <div className="px-4 py-3 border-t grid grid-cols-3 bg-muted/30">
                  <div className="col-span-2 font-medium">Total</div>
                  <div className="text-right font-medium">{formatCurrency(calculateTotalFees())}</div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Registration fees will be added to your next invoice. You can modify your selections until the
                  registration deadline.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleRegistration}
              disabled={isRegistering || Object.keys(selectedActivities).length === 0}
            >
              {isRegistering ? "Processing..." : "Complete Registration"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
