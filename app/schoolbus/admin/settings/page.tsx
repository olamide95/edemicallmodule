"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Save, Search, UserX } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for restricted parents
const restrictedParents = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+234 123 456 7890",
    children: 2,
    reason: "Payment issues",
    date: "2023-09-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 234 567 8901",
    children: 1,
    reason: "Behavioral issues",
    date: "2023-08-15",
  },
]

export default function SettingsPage() {
  const [parentEnrollment, setParentEnrollment] = useState(true)
  const [enrollmentDeadline, setEnrollmentDeadline] = useState("15")
  const [unenrollmentDeadline, setUnenrollmentDeadline] = useState("7")
  const [seatTimeout, setSeatTimeout] = useState("48")
  const [currentTerm, setCurrentTerm] = useState("first")
  const [busPolicy, setBusPolicy] = useState(`# School Bus Policy

## 1. General Rules
- Students must be at their designated bus stop at least 5 minutes before the scheduled pickup time.
- Students must follow the instructions of the bus driver and bus administrator at all times.
- Eating and drinking are not allowed on the bus.

## 2. Safety Regulations
- Students must remain seated with seatbelts fastened while the bus is in motion.
- Students must not distract the driver or create excessive noise.
- Students must not throw objects inside or outside the bus.

## 3. Disciplinary Actions
- First offense: Verbal warning
- Second offense: Written warning to parents
- Third offense: Suspension from bus service for one week
- Fourth offense: Suspension from bus service for the remainder of the term

## 4. Payment Policy
- Bus fees must be paid in full before service begins.
- No refunds will be issued after the first week of service.
- Late payments may result in suspension of service.

## 5. Contact Information
For any inquiries or concerns, please contact the Transportation Department at transportation@school.edu or call 555-123-4567.`)

  // Bus tracking notification settings
  const [enableTracking, setEnableTracking] = useState(true)
  const [firstAlertMinutes, setFirstAlertMinutes] = useState("10")
  const [secondAlertMinutes, setSecondAlertMinutes] = useState("5")
  const [latePickupMinutes, setLatePickupMinutes] = useState("15")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your school bus module settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="tracking">Bus Tracking</TabsTrigger>
          <TabsTrigger value="policy">Bus Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic settings for the school bus module</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="parent-enrollment" className="flex flex-col space-y-1">
                  <span>Parent Enrollment</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow parents to enroll their children for bus service
                  </span>
                </Label>
                <Switch id="parent-enrollment" checked={parentEnrollment} onCheckedChange={setParentEnrollment} />
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="current-term">Current Academic Term</Label>
                <Select value={currentTerm} onValueChange={setCurrentTerm}>
                  <SelectTrigger id="current-term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Term 2023/2024</SelectItem>
                    <SelectItem value="second">Second Term 2023/2024</SelectItem>
                    <SelectItem value="third">Third Term 2023/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Changing the current term will affect all enrollment data and reports.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Settings</CardTitle>
              <CardDescription>Configure enrollment and unenrollment deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="enrollment-deadline">Enrollment Deadline (days after resumption)</Label>
                <Input
                  id="enrollment-deadline"
                  type="number"
                  min="1"
                  max="60"
                  value={enrollmentDeadline}
                  onChange={(e) => setEnrollmentDeadline(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Parents will not be able to enroll after this period</p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="unenrollment-deadline">Unenrollment Deadline (days after resumption)</Label>
                <Input
                  id="unenrollment-deadline"
                  type="number"
                  min="1"
                  max="30"
                  value={unenrollmentDeadline}
                  onChange={(e) => setUnenrollmentDeadline(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will not be able to unenroll their children after this period
                </p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="seat-timeout">Seat Reservation Timeout (hours)</Label>
                <Input
                  id="seat-timeout"
                  type="number"
                  min="1"
                  max="72"
                  value={seatTimeout}
                  onChange={(e) => setSeatTimeout(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Reserved seats will be released if payment is not received within this time
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restricted Parents</CardTitle>
              <CardDescription>Manage parents who are restricted from enrolling in bus service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search parents..." className="pl-8" />
                </div>
                <Button>
                  <UserX className="mr-2 h-4 w-4" />
                  Restrict Parent
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parent Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Children</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date Restricted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restrictedParents.map((parent) => (
                    <TableRow key={parent.id}>
                      <TableCell className="font-medium">{parent.name}</TableCell>
                      <TableCell>{parent.email}</TableCell>
                      <TableCell>{parent.phone}</TableCell>
                      <TableCell>{parent.children}</TableCell>
                      <TableCell>{parent.reason}</TableCell>
                      <TableCell>{parent.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Remove Restriction
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Tracking Settings</CardTitle>
              <CardDescription>Configure bus tracking and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-tracking" className="flex flex-col space-y-1">
                  <span>Enable Bus Tracking</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow parents to track the bus location in real-time
                  </span>
                </Label>
                <Switch id="enable-tracking" checked={enableTracking} onCheckedChange={setEnableTracking} />
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="first-alert">First Alert (minutes before arrival)</Label>
                <Input
                  id="first-alert"
                  type="number"
                  min="1"
                  max="60"
                  value={firstAlertMinutes}
                  onChange={(e) => setFirstAlertMinutes(e.target.value)}
                  disabled={!enableTracking}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will receive their first notification when the bus is this many minutes away
                </p>
              </div>

              <div className="grid gap-4">
                <Label htmlFor="second-alert">Second Alert (minutes before arrival)</Label>
                <Input
                  id="second-alert"
                  type="number"
                  min="1"
                  max="30"
                  value={secondAlertMinutes}
                  onChange={(e) => setSecondAlertMinutes(e.target.value)}
                  disabled={!enableTracking}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will receive their second notification when the bus is this many minutes away
                </p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="late-pickup">Late Pickup Threshold (minutes)</Label>
                <Input
                  id="late-pickup"
                  type="number"
                  min="1"
                  max="30"
                  value={latePickupMinutes}
                  onChange={(e) => setLatePickupMinutes(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Bus will leave if a student doesn't show up within this many minutes of the scheduled pickup time
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Policy</CardTitle>
              <CardDescription>
                Configure the school bus policy that parents must agree to during enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Label htmlFor="bus-policy">Policy Content (Markdown supported)</Label>
                <Textarea
                  id="bus-policy"
                  rows={15}
                  value={busPolicy}
                  onChange={(e) => setBusPolicy(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This policy will be displayed to parents during the enrollment process
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
