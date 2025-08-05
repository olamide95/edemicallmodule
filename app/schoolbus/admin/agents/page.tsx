"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, UserPlus, Eye, Pencil, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Agent {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  students: string[]
  type: "pickup" | "dropoff" | "both"
  status: "active" | "inactive"
  photo?: string
}

interface Student {
  id: string
  firstName: string
  lastName: string
  admissionId: string
  status: string
}

export default function AdminAgentsPage() {
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [isViewAgentOpen, setIsViewAgentOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [agents, setAgents] = useState<Agent[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    students: [],
    type: "pickup",
    status: "active"
  })

  // Load agents and students from localStorage
  useEffect(() => {
    const savedAgents = localStorage.getItem('pickupAgents')
    if (savedAgents) {
      setAgents(JSON.parse(savedAgents))
    }

    const savedResponses = localStorage.getItem('admissionFormResponses')
    if (savedResponses) {
      const allStudents = JSON.parse(savedResponses)
      const admittedStudents = allStudents
        .filter((student: any) => student.status === "Admitted")
        .map((student: any) => ({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          admissionId: student.admissionNumber || `ADM-${student.id.slice(0, 8)}`,
          status: student.status
        }))
      setStudents(admittedStudents)
    }
  }, [])

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.students.some((student) => student.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setIsViewAgentOpen(true)
  }

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.relationship || !newAgent.phone || !newAgent.email || newAgent.students?.length === 0) {
      alert("Please fill all required fields")
      return
    }

    const agentToAdd: Agent = {
      id: Date.now().toString(),
      name: newAgent.name || "",
      relationship: newAgent.relationship || "",
      phone: newAgent.phone || "",
      email: newAgent.email || "",
      students: newAgent.students || [],
      type: newAgent.type || "pickup",
      status: newAgent.status || "active",
      photo: newAgent.photo
    }

    const updatedAgents = [...agents, agentToAdd]
    setAgents(updatedAgents)
    localStorage.setItem('pickupAgents', JSON.stringify(updatedAgents))
    
    setIsAddAgentOpen(false)
    setNewAgent({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      students: [],
      type: "pickup",
      status: "active"
    })
  }

  const handleDeleteAgent = (id: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== id)
    setAgents(updatedAgents)
    localStorage.setItem('pickupAgents', JSON.stringify(updatedAgents))
  }

  const handleUpdateAgentStatus = (id: string, status: "active" | "inactive") => {
    const updatedAgents = agents.map(agent => 
      agent.id === id ? { ...agent, status } : agent
    )
    setAgents(updatedAgents)
    localStorage.setItem('pickupAgents', JSON.stringify(updatedAgents))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pickup & Dropoff Agents</h1>
        <p className="text-muted-foreground">Manage authorized agents for student pickup and dropoff</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents or students..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>Add a new authorized agent for student pickup or dropoff</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Full Name *</Label>
                  <Input 
                    id="agent-name" 
                    placeholder="Enter full name" 
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-relationship">Relationship *</Label>
                  <Select
                    value={newAgent.relationship}
                    onValueChange={(value) => setNewAgent({...newAgent, relationship: value})}
                  >
                    <SelectTrigger id="agent-relationship">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="grandfather">Grandfather</SelectItem>
                      <SelectItem value="grandmother">Grandmother</SelectItem>
                      <SelectItem value="uncle">Uncle</SelectItem>
                      <SelectItem value="aunt">Aunt</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-phone">Phone Number *</Label>
                  <Input 
                    id="agent-phone" 
                    placeholder="Enter phone number" 
                    value={newAgent.phone}
                    onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-email">Email Address *</Label>
                  <Input 
                    id="agent-email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-student">Student *</Label>
                <Select
                  onValueChange={(value) => {
                    setNewAgent({
                      ...newAgent,
                      students: [...(newAgent.students || []), value]
                    })
                  }}
                >
                  <SelectTrigger id="agent-student">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem 
                        key={student.id} 
                        value={`${student.firstName} ${student.lastName}`}
                        disabled={newAgent.students?.includes(`${student.firstName} ${student.lastName}`)}
                      >
                        {student.firstName} {student.lastName} ({student.admissionId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newAgent.students && newAgent.students.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {newAgent.students.map((student, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span>{student}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setNewAgent({
                              ...newAgent,
                              students: newAgent.students?.filter(s => s !== student)
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-type">Agent Type *</Label>
                <Select
                  value={newAgent.type}
                  onValueChange={(value) => setNewAgent({...newAgent, type: value as "pickup" | "dropoff" | "both"})}
                >
                  <SelectTrigger id="agent-type">
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup Only</SelectItem>
                    <SelectItem value="dropoff">Dropoff Only</SelectItem>
                    <SelectItem value="both">Both Pickup & Dropoff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Agent Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of the agent for identification purposes
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddAgent}>
                Add Agent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="pickup">Pickup Agents</TabsTrigger>
          <TabsTrigger value="dropoff">Dropoff Agents</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Authorized Agents</CardTitle>
              <CardDescription>View and manage all authorized pickup and dropoff agents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                              <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{agent.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{agent.relationship}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{agent.phone}</span>
                            <span className="text-xs text-muted-foreground">{agent.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {agent.students.map((student, index) => (
                              <span key={index} className="text-sm">
                                {student}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              agent.type === "pickup"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : agent.type === "dropoff"
                                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                                  : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            }
                          >
                            {agent.type === "pickup"
                              ? "Pickup Only"
                              : agent.type === "dropoff"
                                ? "Dropoff Only"
                                : "Pickup & Dropoff"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={agent.status === "active" ? "default" : "outline"}>
                            {agent.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewAgent(agent)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleDeleteAgent(agent.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No agents found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pickup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pickup Agents</CardTitle>
              <CardDescription>Agents authorized for student pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents
                    .filter((agent) => agent.type === "pickup" || agent.type === "both")
                    .map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                              <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{agent.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{agent.relationship}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{agent.phone}</span>
                            <span className="text-xs text-muted-foreground">{agent.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {agent.students.map((student, index) => (
                              <span key={index} className="text-sm">
                                {student}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={agent.status === "active" ? "default" : "outline"}>
                            {agent.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewAgent(agent)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleDeleteAgent(agent.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dropoff" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dropoff Agents</CardTitle>
              <CardDescription>Agents authorized for student dropoff</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents
                    .filter((agent) => agent.type === "dropoff" || agent.type === "both")
                    .map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                              <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{agent.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{agent.relationship}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{agent.phone}</span>
                            <span className="text-xs text-muted-foreground">{agent.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {agent.students.map((student, index) => (
                              <span key={index} className="text-sm">
                                {student}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={agent.status === "active" ? "default" : "outline"}>
                            {agent.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewAgent(agent)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleDeleteAgent(agent.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Agent Dialog */}
      <Dialog open={isViewAgentOpen} onOpenChange={setIsViewAgentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agent Details</DialogTitle>
            <DialogDescription>View detailed information about this agent</DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedAgent.photo || "/placeholder.svg"} alt={selectedAgent.name} />
                  <AvatarFallback>{selectedAgent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAgent.relationship}</p>
                  <Badge
                    variant="outline"
                    className={
                      selectedAgent.type === "pickup"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mt-2"
                        : selectedAgent.type === "dropoff"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300 mt-2"
                          : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 mt-2"
                    }
                  >
                    {selectedAgent.type === "pickup"
                      ? "Pickup Only"
                      : selectedAgent.type === "dropoff"
                        ? "Dropoff Only"
                        : "Pickup & Dropoff"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">{selectedAgent.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{selectedAgent.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Authorized for Students</p>
                <div className="space-y-2">
                  {selectedAgent.students.map((student, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{student}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Agent Status</p>
                <Select
                  value={selectedAgent.status}
                  onValueChange={(value) => {
                    handleUpdateAgentStatus(selectedAgent.id, value as "active" | "inactive")
                    setSelectedAgent({
                      ...selectedAgent,
                      status: value as "active" | "inactive"
                    })
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewAgentOpen(false)}>
              Close
            </Button>
            <Button>Edit Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}