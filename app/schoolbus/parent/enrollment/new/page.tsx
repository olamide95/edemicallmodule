"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ClipboardList, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

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
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<{ [key: string]: string }>({})

  const handleTermChange = (term: string) => {
    if (selectedTerms.includes(term)) {
      setSelectedTerms(selectedTerms.filter((t) => t !== term))
    } else {
      setSelectedTerms([...selectedTerms, term])
    }
  }

  // Calculate fee when route and stop are selected
  const calculateFee = () => {
    if (selectedRoute && selectedStop) {
      const stopFee = routeFees[selectedRoute as keyof typeof routeFees]?.stops[selectedStop as any]
      setFee(stopFee || "")

      // Calculate total fee based on selected terms
      if (stopFee && selectedTerms.length > 0) {
        const numericFee = Number.parseInt(stopFee.replace(/[^\d]/g, ""))
        const total = numericFee * selectedTerms.length
        setTotalFee(`₦${total.toLocaleString()}`)
      } else {
        setTotalFee("")
      }
    } else {
      setFee("")
      setTotalFee("")
    }
  }

  // Update fee when route, stop, or terms change
  useState(() => {
    calculateFee()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic would go here
    console.log("Submitted enrollment with terms:", selectedTerms)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/parent/enrollment">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Enrollment</h1>
          <p className="text-muted-foreground">Enroll your child for bus service</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Child</CardTitle>
              <CardDescription>Choose which child to enroll for bus service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label>Select Children</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="alice"
                      checked={selectedChildren.includes("alice")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedChildren([...selectedChildren, "alice"])
                        } else {
                          setSelectedChildren(selectedChildren.filter((id) => id !== "alice"))
                          const newSeats = { ...selectedSeats }
                          delete newSeats["alice"]
                          setSelectedSeats(newSeats)
                        }
                      }}
                    />
                    <Label htmlFor="alice" className="font-normal">
                      Alice Doe - Primary 3
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bob"
                      checked={selectedChildren.includes("bob")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedChildren([...selectedChildren, "bob"])
                        } else {
                          setSelectedChildren(selectedChildren.filter((id) => id !== "bob"))
                          const newSeats = { ...selectedSeats }
                          delete newSeats["bob"]
                          setSelectedSeats(newSeats)
                        }
                      }}
                    />
                    <Label htmlFor="bob" className="font-normal">
                      Bob Doe - Primary 1
                    </Label>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    You have selected {selectedChildren.length} child(ren) for enrollment. You will need to select{" "}
                    {selectedChildren.length} seat(s).
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Home Address</CardTitle>
              <CardDescription>Enter your home address for bus stop assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="Enter your complete street address" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State/Province" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="Postal Code" required />
                </div>
              </div>

              <div className="rounded-md overflow-hidden h-48 bg-muted flex items-center justify-center">
                <div className="w-full h-full bg-[url('/city-bus-route.png')]">
                  {/* Google Map would be displayed here */}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Warning: Address May Be Far From Selected Bus Stop</p>
                    <p className="text-sm mt-1">
                      Your address appears to be 2.5 km from the selected bus stop. Please confirm this is correct or
                      select a closer bus stop.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button size="sm" variant="secondary">
                        Confirm Address
                      </Button>
                      <Button size="sm" variant="outline">
                        Find Closer Bus Stop
                      </Button>
                    </div>
                  </div>
                </div>
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
                    value={selectedRoute}
                    onValueChange={(value) => {
                      setSelectedRoute(value)
                      setSelectedStop("")
                      calculateFee()
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
                    value={selectedStop}
                    onValueChange={(value) => {
                      setSelectedStop(value)
                      calculateFee()
                    }}
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
                  <AlertDescription className="flex flex-col gap-2">
                    <div className="font-medium">
                      Bus fee for this stop: <span className="text-primary">{fee}</span> per term
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Distance from Home:</span> Approximately 2.5 km from your entered
                      address to this bus stop
                    </div>
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
                      onCheckedChange={() => {
                        handleTermChange("first")
                        calculateFee()
                      }}
                    />
                    <Label htmlFor="term1" className="font-normal">
                      First Term
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="term2"
                      checked={selectedTerms.includes("second")}
                      onCheckedChange={() => {
                        handleTermChange("second")
                        calculateFee()
                      }}
                    />
                    <Label htmlFor="term2" className="font-normal">
                      Second Term
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="term3"
                      checked={selectedTerms.includes("third")}
                      onCheckedChange={() => {
                        handleTermChange("third")
                        calculateFee()
                      }}
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
                <p className="text-sm text-muted-foreground">
                  Select {selectedChildren.length} seat(s) for your selected children. First two seats are reserved for
                  safety reasons.
                </p>

                {selectedChildren.map((childId, index) => (
                  <div key={childId} className="space-y-2">
                    <Label className="text-sm font-medium">
                      Seat for {childId === "alice" ? "Alice Doe" : "Bob Doe"}:
                    </Label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {Array.from({ length: 20 }, (_, i) => {
                        const seatNumber = i + 1
                        const disabled = seatNumber <= 2 || Object.values(selectedSeats).includes(`seat-${seatNumber}`)
                        const isSelected = selectedSeats[childId] === `seat-${seatNumber}`

                        return (
                          <div key={seatNumber} className="relative">
                            <button
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                if (!disabled) {
                                  setSelectedSeats({
                                    ...selectedSeats,
                                    [childId]: `seat-${seatNumber}`,
                                  })
                                }
                              }}
                              className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-sm font-medium transition-colors ${
                                disabled
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : isSelected
                                    ? "border-[#8C57FF] bg-[#8C57FF] text-white"
                                    : "border-muted bg-popover hover:bg-accent hover:text-accent-foreground"
                              }`}
                            >
                              {seatNumber}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {selectedChildren.length > 0 && Object.keys(selectedSeats).length !== selectedChildren.length && (
                  <Alert>
                    <AlertDescription>
                      Please select seats for all selected children ({Object.keys(selectedSeats).length}/
                      {selectedChildren.length} selected).
                    </AlertDescription>
                  </Alert>
                )}
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
                      Students must be at their designated bus stop at least 5 minutes before the scheduled pickup time.
                    </li>
                    <li>Students must follow the instructions of the bus driver and bus administrator at all times.</li>
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
              <Link href="/parent/enrollment">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                disabled={
                  !agreeToPolicy ||
                  selectedChildren.length === 0 ||
                  !selectedRoute ||
                  !selectedStop ||
                  selectedTerms.length === 0 ||
                  Object.keys(selectedSeats).length !== selectedChildren.length
                }
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Complete Enrollment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
