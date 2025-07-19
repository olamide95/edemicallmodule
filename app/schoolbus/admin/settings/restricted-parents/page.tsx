"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, UserX } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"

// Mock data for restricted parents
const restrictedParents = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+234 123 456 7890",
    children: ["Alice Smith", "Bob Smith"],
    reason: "Payment issues",
    date: "2023-09-01",
    status: "restricted",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 234 567 8901",
    children: ["Charlie Johnson"],
    reason: "Behavioral issues",
    date: "2023-08-15",
    status: "restricted",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+234 345 678 9012",
    children: ["Diana Brown", "Edward Brown"],
    reason: "Late payments",
    date: "2023-07-20",
    status: "enabled",
  },
]

export default function RestrictedParentsPage() {
  const [isRestrictDialogOpen, setIsRestrictDialogOpen] = useState(false)
  const [isEnableDialogOpen, setIsEnableDialogOpen] = useState(false)
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClass, setFilterClass] = useState("")
  const [filterSection, setFilterSection] = useState("")

  const filteredParents = restrictedParents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.children.some((child) => child.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleRestrictParent = () => {
    setIsRestrictDialogOpen(false)
    // Logic to restrict parent would go here
  }

  const handleEnableParent = (id: string) => {
    setSelectedParent(id)
    setIsEnableDialogOpen(true)
  }

  const confirmEnableParent = () => {
    setIsEnableDialogOpen(false)
    // Logic to enable parent would go here
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Restricted Parents</h1>
        <p className="text-muted-foreground">Manage parents who are restricted from enrolling in bus service</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search parents..."
              className="w-full bg-background pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
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
            <Select value={filterSection} onValueChange={setFilterSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="a">Section A</SelectItem>
                <SelectItem value="b">Section B</SelectItem>
                <SelectItem value="c">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Dialog open={isRestrictDialogOpen} onOpenChange={setIsRestrictDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserX className="mr-2 h-4 w-4" />
              Restrict Parent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Restrict Parent</DialogTitle>
              <DialogDescription>Restrict a parent from enrolling their children in the bus service</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="parent-search">Search Parent</Label>
                <Input id="parent-search" placeholder="Enter parent name or email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restriction-reason">Reason for Restriction</Label>
                <Textarea id="restriction-reason" placeholder="Enter reason for restricting this parent" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRestrictDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRestrictParent}>
                Restrict Parent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restricted Parents</CardTitle>
          <CardDescription>Parents who are restricted from enrolling in bus service</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParents.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">{parent.name}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {parent.children.map((child, index) => (
                        <span key={index} className="text-sm">
                          {child}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{parent.reason}</TableCell>
                  <TableCell>{parent.date}</TableCell>
                  <TableCell>
                    <Badge variant={parent.status === "restricted" ? "destructive" : "default"}>
                      {parent.status === "restricted" ? "Restricted" : "Enabled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {parent.status === "restricted" ? (
                      <Button variant="ghost" size="sm" onClick={() => handleEnableParent(parent.id)}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Enable
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleEnableParent(parent.id)}>
                        <UserX className="mr-2 h-4 w-4" />
                        Restrict
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEnableDialogOpen} onOpenChange={setIsEnableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Parent</DialogTitle>
            <DialogDescription>Are you sure you want to enable this parent to enroll in bus service?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEnableDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEnableParent}>
              <UserCheck className="mr-2 h-4 w-4" />
              Confirm Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
