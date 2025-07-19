"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, UserPlus, MessageCircle } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for agents
const agents = [
  {
    id: "1",
    name: "John Doe",
    relationship: "Father",
    phone: "+234 123 456 7890",
    email: "john.doe@example.com",
    type: "both",
    status: "active",
    photo: "/diverse-group-city.png",
  },
  {
    id: "2",
    name: "Mary Doe",
    relationship: "Mother",
    phone: "+234 234 567 8901",
    email: "mary.doe@example.com",
    type: "both",
    status: "active",
    photo: "/diverse-group-city.png",
  },
  {
    id: "3",
    name: "Robert Johnson",
    relationship: "Uncle",
    phone: "+234 345 678 9012",
    email: "robert.johnson@example.com",
    type: "pickup",
    status: "active",
    photo: "/diverse-group-city.png",
  },
]

export default function ParentAgentsPage() {
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    child: "",
    type: "",
    photo: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting agent data:", formData)

    // Reset form and close dialog
    setFormData({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      child: "",
      type: "",
      photo: null,
    })
    setIsAddAgentOpen(false)

    // Show success message (you could use a toast here)
    alert("Agent added successfully!")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pickup & Dropoff Agents</h1>
        <p className="text-muted-foreground">Manage authorized agents for your children's pickup and dropoff</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Authorized Agents</h2>
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
                  <Input
                    id="agent-name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-relationship">Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleInputChange("relationship", value)}
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
                  <Label htmlFor="agent-phone">Phone Number</Label>
                  <Input
                    id="agent-phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-email">Email Address</Label>
                  <Input
                    id="agent-email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-child">Child</Label>
                <Select value={formData.child} onValueChange={(value) => handleInputChange("child", value)}>
                  <SelectTrigger id="agent-child">
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Children</SelectItem>
                    <SelectItem value="alice">Alice Doe</SelectItem>
                    <SelectItem value="bob">Bob Doe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-type">Agent Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
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
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !formData.name || !formData.relationship || !formData.phone || !formData.child || !formData.type
                }
              >
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
          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                        <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.relationship}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          <span>{agent.phone}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
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
                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={agent.status === "active" ? "text-amber-600" : "text-green-600"}
                          onClick={() => {
                            // Toggle agent status
                            console.log(
                              `${agent.status === "active" ? "Deactivating" : "Activating"} agent:`,
                              agent.name,
                            )
                          }}
                        >
                          {agent.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pickup" className="mt-4">
          <div className="grid gap-4">
            {agents
              .filter((agent) => agent.type === "pickup" || agent.type === "both")
              .map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.relationship}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3 w-3" />
                            <span>{agent.phone}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{agent.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:items-end">
                        <Badge
                          variant="outline"
                          className={
                            agent.type === "pickup"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                          }
                        >
                          {agent.type === "pickup" ? "Pickup Only" : "Pickup & Dropoff"}
                        </Badge>
                        <div className="flex gap-2 mt-auto">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={agent.status === "active" ? "text-amber-600" : "text-green-600"}
                            onClick={() => {
                              // Toggle agent status
                              console.log(
                                `${agent.status === "active" ? "Deactivating" : "Activating"} agent:`,
                                agent.name,
                              )
                            }}
                          >
                            {agent.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="dropoff" className="mt-4">
          <div className="grid gap-4">
            {agents
              .filter((agent) => agent.type === "dropoff" || agent.type === "both")
              .map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.relationship}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3 w-3" />
                            <span>{agent.phone}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{agent.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:items-end">
                        <Badge
                          variant="outline"
                          className={
                            agent.type === "dropoff"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                          }
                        >
                          {agent.type === "dropoff" ? "Dropoff Only" : "Pickup & Dropoff"}
                        </Badge>
                        <div className="flex gap-2 mt-auto">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={agent.status === "active" ? "text-amber-600" : "text-green-600"}
                            onClick={() => {
                              // Toggle agent status
                              console.log(
                                `${agent.status === "active" ? "Deactivating" : "Activating"} agent:`,
                                agent.name,
                              )
                            }}
                          >
                            {agent.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
