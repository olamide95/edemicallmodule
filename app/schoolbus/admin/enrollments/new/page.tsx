"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ClipboardList, Plus } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for fees
const routeFees = {
  north: {
    baseFee: "₦15,000",
    stops: { "main-street": "₦15,000", "oak-avenue": "₦16,000", "pine-boulevard": "₦15,500" },
  },
  east: { baseFee: "₦12,000", stops: { "pine-road": "₦12,000", "cedar-lane": "₦13,000" } },
  west: { baseFee: "₦14,000", stops: { "maple-drive": "₦14,000", "elm-street": "₦14,500" } },
  south: { baseFee: "₦10,000", stops: { "elm-street": "₦10,000", "willow-way": "₦11,000" } },
  central: { baseFee: "₦18,000", stops: { "central-plaza": "₦18,000", "market-square": "₦19,000" } },
}

export default function NewEnrollmentPage() {
  const [selectedRoute, setSelectedRoute] = useState("")
  const [selectedStop, setSelectedStop] = useState("")
  const [selectedTerms, setSelectedTerms] = useState<string[]>([])
  const [agreeToPolicy, setAgreeToPolicy] = useState(false)
  const [fee, setFee] = useState("")
  const [totalFee, setTotalFee] = useState("")

  const handleTermChange = (term: string) => {
    if (selectedTerms.includes(term)) {
      setSelectedTerms(selectedTerms.filter((t) => t !== term))
    } else {
      setSelectedTerms([...selectedTerms, term])
    }
  }

  useEffect(() => {
    if (selectedRoute && selectedStop) {
      const stopFee = routeFees[selectedRoute as keyof typeof routeFees]?.stops[selectedStop as any]
      setFee(stopFee || "")
      
      // Calculate total fee based on selected terms
      if (stopFee && selectedTerms.length > 0) {
        const numericFee = Number.parseInt(stopFee.replace(/[^\d]/g, ''))
        const total = numericFee * selectedTerms.length
        setTotalFee(`₦${total.toLocaleString()}`)
      } else {
        setTotalFee("")
      }
    } else {
      setFee("")
      setTotalFee("")
    }
  }, [selectedRoute, selectedStop, selectedTerms])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic would go here
    console.log("Submitted enrollment with terms:", selectedTerms)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/enrollments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Enrollment</h1>
          <p className="text-muted-foreground">Create a new bus service enrollment</p>
        </div>
      </div>

      <Tabs defaultValue="admin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin Enrollment</TabsTrigger>
          <TabsTrigger value="parent">Parent Self-Enrollment</TabsTrigger>
        </TabsList>

        <TabsContent value="admin">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parent Information</CardTitle>
                  <CardDescription>Enter the parent's details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Parent Name</Label>
                      <Input id="parent-name" placeholder="Full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email</Label>
                      <Input id="parent-email" type="email" placeholder="Email address" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-phone">Phone Number</Label>
                      <Input id="parent-phone" placeholder="Phone number" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-address">Home Address</Label>
                      <Input id="parent-address" placeholder="Home address" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Enter the student's details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Student Name</Label>
                      <Input id="student-name" placeholder="Full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-class">Class</Label>
                      <Select required>
                        <SelectTrigger id="student-class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursery1">Nursery 1</SelectItem>
                          <SelectItem value="nursery2">Nursery 2</SelectItem>
                          <SelectItem value="primary1">Primary 1</SelectItem>
                          <SelectItem value="primary2">Primary 2</SelectItem>
                          <SelectItem value="primary3">Primary 3</SelectItem>
                          <SelectItem value="primary4">Primary 4</SelectItem>
                          <SelectItem value="primary5">Primary 5</SelectItem>
                          <SelectItem value="primary6">Primary 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input id="student-id" placeholder="Student ID number" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-dob">Date of Birth</Label>
                      <Input id="student-dob" type="date" required />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Add Additional Students</Label>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bus Service Details</CardTitle>
                  <CardDescription>Select route, bus stop, and terms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="route">Route</Label>
                      <Select 
                        required
                        onValueChange={(value) => {
                          setSelectedRoute(value)
                          setSelectedStop("")
                        }}
                      >
                        <SelectTrigger id="route">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North Route</SelectItem>
                          <SelectItem value="east">East Route</SelectItem>
                          <SelectItem value="west">West Route</SelectItem>
                          <SelectItem value="south">South Route</SelectItem>
                          <SelectItem value="central">Central Route</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stop">Bus Stop</Label>
                      <Select 
                        required 
                        disabled={!selectedRoute}
                        onValueChange={setSelectedStop}
                      >
                        <SelectTrigger id="stop">
                          <SelectValue placeholder={selectedRoute ? "Select bus stop" : "Select a route first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRoute === "north" && (
                            <>
                              <SelectItem value="main-street">Main Street</SelectItem>
                              <SelectItem value="oak-avenue">Oak Avenue</SelectItem>
                              <SelectItem value="pine-boulevard">Pine Boulevard</SelectItem>
                            </>
                          )}
                          {selectedRoute === "east" && (
                            <>
                              <SelectItem value="pine-road">Pine Road</SelectItem>
                              <SelectItem value="cedar-lane">Cedar Lane</SelectItem>
                            </>
                          )}
                          {selectedRoute === "west" && (
                            <>
                              <SelectItem value="maple-drive">Maple Drive</SelectItem>
                              <SelectItem value="elm-street">Elm Street</SelectItem>
                            </>
                          )}
                          {selectedRoute === "south" && (
                            <>
                              <SelectItem value="elm-street">Elm Street</SelectItem>
                              <SelectItem value="willow-way">Willow Way</SelectItem>
                            </>
                          )}
                          {selectedRoute === "central" && (
                            <>
                              <SelectItem value="central-plaza">Central Plaza</SelectItem>
                              <SelectItem value="market-square">Market Square</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {fee && (
                    <Alert>
                      <AlertDescription className="font-medium">
                        Bus fee for this stop: <span className="text-primary">{fee}</span> per term
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <Label>Terms</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="term1"
                          checked={selectedTerms.includes("first")}
                          onCheckedChange={() => handleTermChange("first")}
                        />
                        <Label htmlFor="term1" className="font-normal">
                          First Term
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="term2"
                          checked={selectedTerms.includes("second")}
                          onCheckedChange={() => handleTermChange("second")}
                        />
                        <Label htmlFor="term2" className="font-normal">
                          Second Term
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="term3"
                          checked={selectedTerms.includes("third")}
                          onCheckedChange={() => handleTermChange("third")}
                        />
                        <Label htmlFor="term3" className="font-normal">
                          Third Term
                        </Label>
                      </div>
                    </div>
                  </div>

                  {totalFee && (
                    <Alert>
                      <AlertDescription className="font-medium">
                        Total fee for {selectedTerms.length} term(s): <span className="text-primary">{totalFee}</span>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <Label>Seat Selection</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {Array.from({ length: 20 }, (_, i) => {
                        const seatNumber = i + 1
                        const disabled = seatNumber <= 2 // First two seats are unavailable
                        return (
                          <div key={seatNumber} className="relative">
                            <RadioGroup>
                              <div className="flex items-center justify-center">
                                <RadioGroupItem
                                  value={`seat-${seatNumber}`}
                                  id={`seat-${seatNumber}`}
                                  disabled={disabled}
                                  className={`peer sr-only ${disabled ? "cursor-not-allowed" : ""}`}
                                />
                                <Label
                                  htmlFor={`seat-${seatNumber}`}
                                  className={`flex h-10 w-10 items-center justify-center rounded-md border-2 ${
                                    disabled
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : "border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  }`}
                                >
                                  {seatNumber}
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      First two seats are reserved for safety reasons and are not available for selection.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>School Bus Policy</CardTitle>
                  <CardDescription>Review and agree to the school bus policy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border bg-muted/50 p-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <h2>School Bus Policy</h2>

                      <h3>1. General Rules</h3>
                      <ul>
                        <li>
                          Students must be at their designated bus stop at least 5 minutes before the scheduled pickup
                          time.
                        </li>
                        <li>
                          Students must follow the instructions of the bus driver and bus administrator at all times.
                        </li>
                        <li>Eating and drinking are not allowed on the bus.</li>
                      </ul>

                      <h3>2. Safety Regulations</h3>
                      <ul>
                        <li>Students must remain seated with seatbelts fastened while the bus is in motion.</li>
                        <li>Students must not distract the driver or create excessive noise.</li>
                        <li>Students must not throw objects inside or outside the bus.</li>
                      </ul>

                      <h3>3. Disciplinary Actions</h3>
                      <ul>
                        <li>First offense: Verbal warning</li>
                        <li>Second offense: Written warning to parents</li>
                        <li>Third offense: Suspension from bus service for one week</li>
                        <li>Fourth offense: Suspension from bus service for the remainder of the term</li>
                      </ul>

                      <h3>4. Payment Policy</h3>
                      <ul>
                        <li>Bus fees must be paid in full before service begins.</li>
                        <li>No refunds will be issued after the first week of service.</li>
                        <li>Late payments may result in suspension of service.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="policy"
                      checked={agreeToPolicy}
                      onCheckedChange={(checked) => setAgreeToPolicy(checked === true)}
                      required
                    />
                    <Label htmlFor="policy" className="font-normal">
                      I have read and agree to the School Bus Policy
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href="/enrollments">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit" disabled={!agreeToPolicy}>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Create Enrollment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="parent">
          <Card>
            <CardHeader>
              <CardTitle>Parent Self-Enrollment</CardTitle>
              <CardDescription>This interface allows parents to enroll their children for bus services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200 p-4">
                  <p>
                    This is a preview of the parent self-enrollment interface. Parents will see this form when they log
                    in to their portal.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Name</Label>
                      <p>John Doe</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p>john.doe@example.com</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p>+234 123 456 7890</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Address</Label>
                      <p>123 Main Street, Lagos</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Your Children</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Child
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-muted-foreground">Name</Label>
                            <p>Alice Doe</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Class</Label>
                            <p>Primary 3</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Student ID</Label>
                            <p>STU12345</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Date of Birth</Label>
                            <p>15 May 2015</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-muted-foreground">Name</Label>
                            <p>Bob Doe</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Class</Label>
                            <p>Primary 1</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Student ID</Label>
                            <p>STU12346</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Date of Birth</Label>
                            <p>20 July 2017</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bus Service Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-route">Route</Label>
                      <Select>
                        <SelectTrigger id="parent-route">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North Route</SelectItem>
                          <SelectItem value="east">East Route</SelectItem>
                          <SelectItem value="west">West Route</SelectItem>
                          <SelectItem value="south">South Route</SelectItem>
                          <SelectItem value="central">Central Route</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-stop">Bus Stop</Label>
                      <Select>
                        <SelectTrigger id="parent-stop">
                          <SelectValue placeholder="Select bus stop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main-street">Main Street</SelectItem>
                          <SelectItem value="oak-avenue">Oak Avenue</SelectItem>
                          <SelectItem value="pine-boulevard">Pine Boulevard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Terms</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="parent-term1" />
                        <Label htmlFor="parent-term1" className="font-normal">
                          First Term
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="parent-term2" />
                        <Label htmlFor="parent-term2" className="font-normal">
                          Second Term
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="parent-term3" />
                        <Label htmlFor="parent-term3" className="font-normal">
                          Third Term
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Seat Selection</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {Array.from({ length: 20 }, (_, i) => {
                        const seatNumber = i + 1
                        const disabled = seatNumber <= 2 // First two seats are unavailable
                        return (
                          <div key={seatNumber} className="relative">
                            <RadioGroup>
                              <div className="flex items-center justify-center">
                                <RadioGroupItem
                                  value={`parent-seat-${seatNumber}`}
                                  id={`parent-seat-${seatNumber}`}
                                  disabled={disabled}
                                  className={`peer sr-only ${disabled ? "cursor-not-allowed" : ""}`}
                                />
                                <Label
                                  htmlFor={`parent-seat-${seatNumber}`}
                                  className={`flex h-10 w-10 items-center justify-center rounded-md border-2 ${
                                    disabled
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : "border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  }`}
                                >
                                  {seatNumber}
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      First two seats are reserved for safety reasons and are not available for selection.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">School Bus Policy</h3>
                  <div className="rounded-md border bg-muted/50 p-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <h2>School Bus Policy</h2>

                      <h3>1. General Rules</h3>
                      <ul>
                        <li>
                          Students must be at their designated bus stop at least 5 minutes before the scheduled pickup
                          time.
                        </li>
                        <li>
                          Students must follow the instructions of the bus driver and bus administrator at all times.
                        </li>
                        <li>Eating and drinking are not allowed on the bus.</li>
                      </ul>

                      <h3>2. Safety Regulations</h3>
                      <ul>
                        <li>Students must remain seated with seatbelts fastened while the bus is in motion.</li>
                        <li>Students must not distract the driver or create excessive noise.</li>
                        <li>Students must not throw objects inside or outside the bus.</li>
                      </ul>

                      <h3>3. Disciplinary Actions</h3>
                      <ul>
                        <li>First offense: Verbal warning</li>
                        <li>Second offense: Written warning to parents</li>
                        <li>Third offense: Suspension from bus service for one week</li>
                        <li>Fourth offense: Suspension from bus service for the remainder of the term</li>
                      </ul>

                      <h3>4. Payment Policy</h3>
                      <ul>
                        <li>Bus fees must be paid in full before service begins.</li>
                        <li>No refunds will be issued after the first week of service.</li>
                        <li>Late payments may result in suspension of service.</li>
                        </ul>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="parent-policy" />
                    <Label htmlFor="parent-policy" className="font-normal">
                      I have read and agree to the School Bus Policy
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Submit Enrollment
                </Button>
              </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
