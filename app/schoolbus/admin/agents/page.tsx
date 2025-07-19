"use client"

import { useState } from "react"
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

// Mock data for agents
const agents = [
  {
    id: "1",
    name: "John Doe",
    relationship: "Father",
    phone: "+234 123 456 7890",
    email: "john.doe@example.com",
    students: ["Alice Doe", "Bob Doe"],
    type: "pickup",
    status: "active",
    photo: "/diverse-group-city.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    relationship: "Mother",
    phone: "+234 234 567 8901",
    email: "jane.smith@example.com",
    students: ["Charlie Smith"],
    type: "both",
    status: "active",
    photo: "/diverse-group-city.png",
  },
  {
    id: "3",
    name: "Michael Johnson",
    relationship: "Uncle",
    phone: "+234 345 678 9012",
    email: "michael.johnson@example.com",
    students: ["Diana Johnson"],
    type: "dropoff",
    status: "active",
    photo: "/diverse-group-city.png",
  },
  {
    id: "4",
    name: "Sarah Williams",
    relationship: "Grandmother",
    phone: "+234 456 789 0123",
    email: "sarah.williams@example.com",
    students: ["Emma Williams", "Frank Williams"],
    type: "both",
    status: "inactive",
    photo: "/diverse-group-city.png",
  },
]

export default function AdminAgentsPage() {
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [isViewAgentOpen, setIsViewAgentOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.students.some((student) => student.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewAgent = (agent: any) => {
    setSelectedAgent(agent)
    setIsViewAgentOpen(true)
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
                  <Label htmlFor="agent-name">Full Name</Label>
                  <Input id="agent-name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-relationship">Relationship</Label>
                  <Select>
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
                  <Label htmlFor="agent-phone">Phone Number</Label>
                  <Input id="agent-phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-email">Email Address</Label>
                  <Input id="agent-email" type="email" placeholder="Enter email address" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-student">Student</Label>
                <Select>
                  <SelectTrigger id="agent-student">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alice-doe">Alice Doe</SelectItem>
                    <SelectItem value="bob-doe">Bob Doe</SelectItem>
                    <SelectItem value="charlie-smith">Charlie Smith</SelectItem>
                    <SelectItem value="diana-johnson">Diana Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-type">Agent Type</Label>
                <Select>
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
              <Button type="submit" onClick={() => setIsAddAgentOpen(false)}>
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
                  {filteredAgents.map((agent) => (
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
                          <Button variant="ghost" size="icon" className="text-destructive">
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
                            <Button variant="ghost" size="icon" className="text-destructive">
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
                            <Button variant="ghost" size="icon" className="text-destructive">
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
                  {selectedAgent.students.map((student: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{student}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Pickup/Dropoff History</p>
                <div className="max-h-60 overflow-auto border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Today</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          >
                            Pickup
                          </Badge>
                        </TableCell>
                        <TableCell>Alice Doe</TableCell>
                        <TableCell>07:15 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Yesterday</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                          >
                            Dropoff
                          </Badge>
                        </TableCell>
                        <TableCell>Alice Doe</TableCell>
                        <TableCell>02:30 PM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Yesterday</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          >
                            Pickup
                          </Badge>
                        </TableCell>
                        <TableCell>Alice Doe</TableCell>
                        <TableCell>07:15 AM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>09/08/2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                          >
                            Dropoff
                          </Badge>
                        </TableCell>
                        <TableCell>Bob Doe</TableCell>
                        <TableCell>02:30 PM</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
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
