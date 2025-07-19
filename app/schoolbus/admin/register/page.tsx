"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle, Clock, Download, FileText, Pencil, Plus, Search, UserCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for pickup/dropoff events
const events = [
  {
    id: "1",
    student: "Alice Doe",
    class: "Primary 3",
    bus: "Bus A",
    stop: "Main Street",
    time: "07:15 AM",
    date: "2023-09-10",
    type: "pickup",
    status: "completed",
    agent: {
      id: "1",
      name: "John Doe",
      relationship: "Father",
      photo: "/diverse-group-city.png",
    },
    signature: true,
    notes: "",
  },
  {
    id: "2",
    student: "Bob Smith",
    class: "Primary 5",
    bus: "Bus B",
    stop: "Pine Road",
    time: "07:10 AM",
    date: "2023-09-10",
    type: "pickup",
    status: "pending",
    agent: null,
    signature: false,
    notes: "",
  },
  {
    id: "3",
    student: "Charlie Johnson",
    class: "Primary 2",
    bus: "Bus A",
    stop: "Main Street",
    time: "07:15 AM",
    date: "2023-09-10",
    type: "pickup",
    status: "completed",
    agent: {
      id: "3",
      name: "Michael Johnson",
      relationship: "Father",
      photo: "/diverse-group-city.png",
    },
    signature: true,
    notes: "",
  },
  {
    id: "4",
    student: "Diana Williams",
    class: "Primary 6",
    bus: "Bus D",
    stop: "Elm Street",
    time: "07:05 AM",
    date: "2023-09-10",
    type: "pickup",
    status: "missed",
    agent: null,
    signature: false,
    notes: "Parent called to inform student is sick",
  },
  {
    id: "5",
    student: "Alice Doe",
    class: "Primary 3",
    bus: "Bus A",
    stop: "Main Street",
    time: "02:30 PM",
    date: "2023-09-09",
    type: "dropoff",
    status: "completed",
    agent: {
      id: "1",
      name: "John Doe",
      relationship: "Father",
      photo: "/diverse-group-city.png",
    },
    signature: true,
    notes: "",
  },
]

// Mock data for students
const students = [
  {
    id: "1",
    name: "Alice Doe",
    class: "Primary 3",
    busStop: "Main Street",
    bus: "Bus A",
    photo: "/diverse-group-city.png",
    authorizedAgents: {
      pickup: [
        { id: "1", name: "John Doe", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "2", name: "Mary Doe", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
      dropoff: [
        { id: "1", name: "John Doe", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "2", name: "Mary Doe", relationship: "Mother", photo: "/diverse-group-city.png" },
        { id: "5", name: "Robert Williams", relationship: "Grandfather", photo: "/diverse-group-city.png" },
      ],
    },
  },
  {
    id: "2",
    name: "Bob Smith",
    class: "Primary 5",
    busStop: "Pine Road",
    bus: "Bus B",
    photo: "/diverse-group-city.png",
    authorizedAgents: {
      pickup: [
        { id: "6", name: "James Smith", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "7", name: "Patricia Smith", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
      dropoff: [
        { id: "6", name: "James Smith", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "7", name: "Patricia Smith", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
    },
  },
  {
    id: "3",
    name: "Charlie Johnson",
    class: "Primary 2",
    busStop: "Main Street",
    bus: "Bus A",
    photo: "/diverse-group-city.png",
    authorizedAgents: {
      pickup: [
        { id: "3", name: "Michael Johnson", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "4", name: "Sarah Johnson", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
      dropoff: [
        { id: "3", name: "Michael Johnson", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "4", name: "Sarah Johnson", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
    },
  },
  {
    id: "4",
    name: "Diana Williams",
    class: "Primary 6",
    busStop: "Elm Street",
    bus: "Bus D",
    photo: "/diverse-group-city.png",
    authorizedAgents: {
      pickup: [
        { id: "8", name: "Thomas Williams", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "9", name: "Elizabeth Williams", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
      dropoff: [
        { id: "8", name: "Thomas Williams", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "9", name: "Elizabeth Williams", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
    },
  },
  {
    id: "5",
    name: "Edward Brown",
    class: "Primary 4",
    busStop: "Oak Avenue",
    bus: "Bus A",
    photo: "/diverse-group-city.png",
    authorizedAgents: {
      pickup: [
        { id: "10", name: "Richard Brown", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "11", name: "Jennifer Brown", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
      dropoff: [
        { id: "10", name: "Richard Brown", relationship: "Father", photo: "/diverse-group-city.png" },
        { id: "11", name: "Jennifer Brown", relationship: "Mother", photo: "/diverse-group-city.png" },
      ],
    },
  },
]

export default function PickupDropoffRegisterPage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [selectedBus, setSelectedBus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isNewRegisterDialogOpen, setIsNewRegisterDialogOpen] = useState(false)
  const [newRegisterData, setNewRegisterData] = useState({
    type: "pickup",
    date: new Date().toISOString().split("T")[0],
    student: "",
    bus: "",
    stop: "",
    time: "",
    agent: "",
    notes: "",
  })
  const [signatureImageData, setSignatureImageData] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [authorizedAgents, setAuthorizedAgents] = useState<any[]>([])

  // Filter events based on selected date, bus, and search query
  const filteredEvents = events.filter((event) => {
    const matchesDate = event.date === selectedDate
    const matchesBus = selectedBus === "all" || event.bus === selectedBus
    const matchesSearch =
      event.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.stop.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDate && matchesBus && matchesSearch
  })

  const handleSignatureCapture = (eventId: string) => {
    const event = events.find((e) => e.id === eventId)
    setSelectedEvent(event)
    setSignatureImageData(null)
    setIsSignatureDialogOpen(true)
  }

  const handleNewRegister = () => {
    setNewRegisterData({
      type: "pickup",
      date: new Date().toISOString().split("T")[0],
      student: "",
      bus: "",
      stop: "",
      time: "",
      agent: "",
      notes: "",
    })
    setSelectedStudent(null)
    setAuthorizedAgents([])
    setSignatureImageData(null)
    setIsNewRegisterDialogOpen(true)
  }

  const handleSignatureSubmit = () => {
    // In a real app, this would update the database
    setIsSignatureDialogOpen(false)
    // Show success notification
  }

  const handleNewRegisterSubmit = () => {
    // In a real app, this would save to the database
    console.log("Submitting new register entry", newRegisterData, "with signature", signatureImageData)
    setIsNewRegisterDialogOpen(false)
    // Show success notification
  }

  // Update authorized agents when student changes
  useEffect(() => {
    if (selectedStudent) {
      const type = newRegisterData.type
      setAuthorizedAgents(selectedStudent.authorizedAgents[type] || [])

      // Auto-select the first agent if available
      if (selectedStudent.authorizedAgents[type]?.length > 0) {
        setNewRegisterData({
          ...newRegisterData,
          agent: selectedStudent.authorizedAgents[type][0].id,
        })
      }
    }
  }, [selectedStudent]) // Removed newRegisterData.type from dependency array

  // Handle student selection
  const handleStudentSelect = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    setSelectedStudent(student)

    if (student) {
      setNewRegisterData({
        ...newRegisterData,
        student: studentId,
        bus: student.bus,
        stop: student.busStop,
      })
    }
  }

  // Handle register type change
  const handleRegisterTypeChange = (type: string) => {
    setNewRegisterData({
      ...newRegisterData,
      type,
      agent: "", // Reset agent when type changes
    })
  }

  // Handle signature drawing
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    // Fix for touch events
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else if (e instanceof MouseEvent) {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else {
      return // Exit if we can't get coordinates
    }

    setLastPoint({ x, y })
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    // Fix for touch events
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else if (e instanceof MouseEvent) {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else {
      return // Exit if we can't get coordinates
    }

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    setLastPoint({ x, y })
  }

  const endDrawing = () => {
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    // Save the signature image data
    setSignatureImageData(canvas.toDataURL())
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureImageData(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary-custom">Pickup & Dropoff Register</h1>
          <p className="text-secondary-custom">Manage and track student pickup and dropoff events</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-auto bg-card border-card"
            />

            <Select value={selectedBus} onValueChange={setSelectedBus}>
              <SelectTrigger className="w-[200px] bg-card border-card">
                <SelectValue placeholder="Select bus" />
              </SelectTrigger>
              <SelectContent className="bg-card border-card">
                <SelectItem value="all">All Buses</SelectItem>
                <SelectItem value="Bus A">Bus A</SelectItem>
                <SelectItem value="Bus B">Bus B</SelectItem>
                <SelectItem value="Bus C">Bus C</SelectItem>
                <SelectItem value="Bus D">Bus D</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search student or stop..."
                className="pl-8 w-full bg-card border-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="btn-secondary bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export Register
            </Button>
            <Button onClick={handleNewRegister} className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Register
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pickup">
          <TabsList className="bg-card border-card">
            <TabsTrigger
              value="pickup"
              className="text-primary-custom data-[state=active]:bg-primary-light data-[state=active]:text-primary-solid"
            >
              Pickup Register
            </TabsTrigger>
            <TabsTrigger
              value="dropoff"
              className="text-primary-custom data-[state=active]:bg-primary-light data-[state=active]:text-primary-solid"
            >
              Dropoff Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pickup" className="mt-4">
            <Card className="bg-card border-card">
              <CardHeader>
                <CardTitle className="text-primary-custom">Morning Pickup Register</CardTitle>
                <CardDescription className="text-secondary-custom">
                  Record of student pickups from designated stops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-table-divider">
                      <TableHead className="text-primary-custom">Student</TableHead>
                      <TableHead className="text-primary-custom">Class</TableHead>
                      <TableHead className="text-primary-custom">Bus</TableHead>
                      <TableHead className="text-primary-custom">Stop</TableHead>
                      <TableHead className="text-primary-custom">Time</TableHead>
                      <TableHead className="text-primary-custom">Agent</TableHead>
                      <TableHead className="text-primary-custom">Status</TableHead>
                      <TableHead className="text-primary-custom">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents
                      .filter((event) => event.type === "pickup")
                      .map((event) => (
                        <TableRow key={event.id} className="border-table-divider">
                          <TableCell className="font-medium text-primary-custom">{event.student}</TableCell>
                          <TableCell className="text-secondary-custom">{event.class}</TableCell>
                          <TableCell className="text-secondary-custom">{event.bus}</TableCell>
                          <TableCell className="text-secondary-custom">{event.stop}</TableCell>
                          <TableCell className="text-secondary-custom">{event.time}</TableCell>
                          <TableCell>
                            {event.agent ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={event.agent.photo || "/placeholder.svg"} alt={event.agent.name} />
                                  <AvatarFallback>{event.agent.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-secondary-custom">{event.agent.name}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Not recorded</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                event.status === "completed"
                                  ? "default"
                                  : event.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="flex items-center gap-1 w-fit"
                            >
                              {event.status === "completed" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : event.status === "pending" ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <AlertCircle className="h-3 w-3" />
                              )}
                              {event.status === "completed"
                                ? "Completed"
                                : event.status === "pending"
                                  ? "Pending"
                                  : "Missed"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {event.status === "pending" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSignatureCapture(event.id)}
                                className="btn-secondary"
                              >
                                <UserCheck className="mr-2 h-3 w-3" />
                                Record Pickup
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-secondary-custom">
                                <Pencil className="mr-2 h-3 w-3" />
                                Edit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="dropoff" className="mt-4">
            <Card className="bg-card border-card">
              <CardHeader>
                <CardTitle className="text-primary-custom">Afternoon Dropoff Register</CardTitle>
                <CardDescription className="text-secondary-custom">
                  Record of student dropoffs at designated stops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-table-divider">
                      <TableHead className="text-primary-custom">Student</TableHead>
                      <TableHead className="text-primary-custom">Class</TableHead>
                      <TableHead className="text-primary-custom">Bus</TableHead>
                      <TableHead className="text-primary-custom">Stop</TableHead>
                      <TableHead className="text-primary-custom">Time</TableHead>
                      <TableHead className="text-primary-custom">Agent</TableHead>
                      <TableHead className="text-primary-custom">Status</TableHead>
                      <TableHead className="text-primary-custom">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents
                      .filter((event) => event.type === "dropoff")
                      .map((event) => (
                        <TableRow key={event.id} className="border-table-divider">
                          <TableCell className="font-medium text-primary-custom">{event.student}</TableCell>
                          <TableCell className="text-secondary-custom">{event.class}</TableCell>
                          <TableCell className="text-secondary-custom">{event.bus}</TableCell>
                          <TableCell className="text-secondary-custom">{event.stop}</TableCell>
                          <TableCell className="text-secondary-custom">{event.time}</TableCell>
                          <TableCell>
                            {event.agent ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={event.agent.photo || "/placeholder.svg"} alt={event.agent.name} />
                                  <AvatarFallback>{event.agent.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-secondary-custom">{event.agent.name}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Not recorded</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                event.status === "completed"
                                  ? "default"
                                  : event.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="flex items-center gap-1 w-fit"
                            >
                              {event.status === "completed" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : event.status === "pending" ? (
                                <Clock className="h-3 w-3" />
                              ) : (
                                <AlertCircle className="h-3 w-3" />
                              )}
                              {event.status === "completed"
                                ? "Completed"
                                : event.status === "pending"
                                  ? "Pending"
                                  : "Missed"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {event.status === "pending" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSignatureCapture(event.id)}
                                className="btn-secondary"
                              >
                                <UserCheck className="mr-2 h-3 w-3" />
                                Record Dropoff
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-secondary-custom">
                                <Pencil className="mr-2 h-3 w-3" />
                                Edit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Signature Capture Dialog */}
        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
          <DialogContent className="sm:max-w-[500px] bg-card border-card">
            <DialogHeader>
              <DialogTitle className="text-primary-custom">
                Record {selectedEvent?.type === "pickup" ? "Pickup" : "Dropoff"}
              </DialogTitle>
              <DialogDescription className="text-secondary-custom">
                Verify the authorized agent and capture their signature
              </DialogDescription>
            </DialogHeader>

            {selectedEvent && (
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary-custom">Student</p>
                    <p className="text-sm text-secondary-custom">{selectedEvent.student}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary-custom">Class</p>
                    <p className="text-sm text-secondary-custom">{selectedEvent.class}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-primary-custom">Select Authorized Agent</Label>
                  <Select>
                    <SelectTrigger className="bg-card border-card">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-card">
                      {students
                        .find((s) => s.name === selectedEvent.student)
                        ?.authorizedAgents[selectedEvent.type].map((agent: any) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                                <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              {agent.name} ({agent.relationship})
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-primary-custom">Signature</Label>
                  <div className="border rounded-md overflow-hidden border-card">
                    <canvas
                      ref={canvasRef}
                      width={468}
                      height={200}
                      className="w-full h-32 touch-none bg-white"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={endDrawing}
                      onMouseLeave={endDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={endDrawing}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSignature}
                      className="btn-secondary bg-transparent"
                    >
                      Clear Signature
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The agent must sign to confirm the {selectedEvent.type === "pickup" ? "pickup" : "dropoff"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-primary-custom">Notes (Optional)</Label>
                  <Textarea placeholder="Add any notes about this event" className="bg-card border-card" />
                </div>

                <Alert className="bg-info-light border-card">
                  <AlertCircle className="h-4 w-4 text-info" />
                  <AlertDescription className="text-secondary-custom">
                    A notification will be sent to the parent once the{" "}
                    {selectedEvent.type === "pickup" ? "pickup" : "dropoff"} is confirmed.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSignatureDialogOpen(false)} className="btn-secondary">
                Cancel
              </Button>
              <Button onClick={handleSignatureSubmit} disabled={!signatureImageData} className="btn-primary">
                Confirm & Notify Parent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Register Dialog */}
        <Dialog open={isNewRegisterDialogOpen} onOpenChange={setIsNewRegisterDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-card border-card">
            <DialogHeader>
              <DialogTitle className="text-primary-custom">Create New Register Entry</DialogTitle>
              <DialogDescription className="text-secondary-custom">
                Record a new pickup or dropoff entry for a student
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-primary-custom">
                    Type
                  </Label>
                  <Select value={newRegisterData.type} onValueChange={(value) => handleRegisterTypeChange(value)}>
                    <SelectTrigger id="type" className="bg-card border-card">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-card">
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="dropoff">Dropoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-primary-custom">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={newRegisterData.date}
                    onChange={(e) => setNewRegisterData({ ...newRegisterData, date: e.target.value })}
                    className="bg-card border-card"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student" className="text-primary-custom">
                  Student
                </Label>
                <Select value={newRegisterData.student} onValueChange={handleStudentSelect}>
                  <SelectTrigger id="student" className="bg-card border-card">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-card">
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedStudent && (
                <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedStudent.photo || "/placeholder.svg"} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-primary-custom">{selectedStudent.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.class}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bus" className="text-primary-custom">
                    Bus
                  </Label>
                  <Input id="bus" value={newRegisterData.bus} disabled className="bg-card border-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stop" className="text-primary-custom">
                    Bus Stop
                  </Label>
                  <Input id="stop" value={newRegisterData.stop} disabled className="bg-card border-card" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-primary-custom">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time"
                  value={newRegisterData.time}
                  onChange={(e) => setNewRegisterData({ ...newRegisterData, time: e.target.value })}
                  required
                  className="bg-card border-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent" className="text-primary-custom">
                  Authorized Agent
                </Label>
                {authorizedAgents.length > 0 ? (
                  <div className="space-y-3">
                    {authorizedAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center space-x-3 p-2 border rounded-md border-card">
                        <Checkbox
                          id={`agent-${agent.id}`}
                          checked={newRegisterData.agent === agent.id}
                          onCheckedChange={() => setNewRegisterData({ ...newRegisterData, agent: agent.id })}
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                            <AvatarFallback>{agent.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <Label htmlFor={`agent-${agent.id}`} className="cursor-pointer flex-1">
                            <div className="font-medium text-primary-custom">{agent.name}</div>
                            <div className="text-sm text-muted-foreground">{agent.relationship}</div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground p-2 border rounded-md border-card">
                    {selectedStudent
                      ? "No authorized agents found for this student and event type."
                      : "Please select a student first."}
                  </div>
                )}
              </div>

              {newRegisterData.agent && (
                <div className="space-y-2">
                  <Label className="text-primary-custom">Signature</Label>
                  <div className="border rounded-md overflow-hidden border-card">
                    <canvas
                      ref={canvasRef}
                      width={568}
                      height={200}
                      className="w-full h-32 touch-none bg-white"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={endDrawing}
                      onMouseLeave={endDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={endDrawing}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSignature}
                      className="btn-secondary bg-transparent"
                    >
                      Clear Signature
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The agent must sign to confirm the {newRegisterData.type}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-primary-custom">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this event"
                  value={newRegisterData.notes}
                  onChange={(e) => setNewRegisterData({ ...newRegisterData, notes: e.target.value })}
                  className="bg-card border-card"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewRegisterDialogOpen(false)} className="btn-secondary">
                Cancel
              </Button>
              <Button
                onClick={handleNewRegisterSubmit}
                disabled={
                  !newRegisterData.student || !newRegisterData.time || !newRegisterData.agent || !signatureImageData
                }
                className="btn-primary"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create Register Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
