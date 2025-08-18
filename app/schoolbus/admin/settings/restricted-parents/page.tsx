"use client"

import { useState, useEffect } from "react"
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
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface Parent {
  id: string
  name: string
  email: string
  phone: string
  students: string[]
  status: "restricted" | "enabled"
  reason?: string
  date?: string
}

interface Student {
  id: string
  name: string
  class: string
  section: string
}

export default function RestrictedParentsPage() {
  const router = useRouter()
  const [isRestrictDialogOpen, setIsRestrictDialogOpen] = useState(false)
  const [isEnableDialogOpen, setIsEnableDialogOpen] = useState(false)
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClass, setFilterClass] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [parents, setParents] = useState<Parent[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Load data from localStorage
 useEffect(() => {
    const savedParents = JSON.parse(localStorage.getItem('restrictedParents') || '[]');
    const onboardingParents = JSON.parse(localStorage.getItem('parents') || '[]');
    const onboardingStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Merge onboarding parents with restricted parents data
    const mergedParents = onboardingParents.map((parent: any) => {
      const restrictedParent = savedParents.find((p: Parent) => p.id === parent.id);
      return {
        id: parent.id,
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        students: parent.students || [],
        status: restrictedParent?.status || "enabled",
        reason: restrictedParent?.reason,
        date: restrictedParent?.date
      };
    });
    
    setParents(mergedParents);
    setStudents(onboardingStudents);
    setIsMounted(true);
  }, []);

  // Save to localStorage when parents change
  useEffect(() => {
    if (isMounted) {
      const restrictedParents = parents.filter(p => p.status === "restricted")
      localStorage.setItem('restrictedParents', JSON.stringify(restrictedParents))
    }
  }, [parents, isMounted])

  const filteredParents = parents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.students.some(studentId => {
        const student = students.find(s => s.id === studentId)
        return student?.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
  )

  const getStudentNames = (studentIds: string[]) => {
    return studentIds.map(id => {
      const student = students.find(s => s.id === id)
      return student?.name || "Unknown Student"
    })
  }

  const handleRestrictParent = (parentId: string, reason: string) => {
    setParents(prev => prev.map(p => 
      p.id === parentId 
        ? { ...p, status: "restricted", reason, date: new Date().toISOString().split('T')[0] }
        : p
    ))
    toast({
      title: "Success",
      description: "Parent has been restricted",
    })
    setIsRestrictDialogOpen(false)
  }

  const handleEnableParent = (parentId: string) => {
    setParents(prev => prev.map(p => 
      p.id === parentId 
        ? { ...p, status: "enabled", reason: undefined, date: undefined }
        : p
    ))
    toast({
      title: "Success",
      description: "Parent has been enabled",
    })
    setIsEnableDialogOpen(false)
  }

  if (!isMounted) return null

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
                {[...new Set(students.map(s => s.class))].map((cls, i) => (
                  <SelectItem key={i} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSection} onValueChange={setFilterSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {[...new Set(students.map(s => s.section))].map((section, i) => (
                  <SelectItem key={i} value={section}>{section}</SelectItem>
                ))}
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
                <Select onValueChange={(value) => setSelectedParent(parents.find(p => p.id === value) || null)}>
                  <SelectTrigger id="parent-search">
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents.filter(p => p.status !== "restricted").map(parent => (
                      <SelectItem key={parent.id} value={parent.id}>
                        {parent.name} ({parent.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedParent && (
                <div className="space-y-2">
                  <Label>Children</Label>
                  <div className="flex flex-col gap-1">
                    {getStudentNames(selectedParent.students).map((child, i) => (
                      <span key={i} className="text-sm">
                        {child}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="restriction-reason">Reason for Restriction</Label>
                <Textarea 
                  id="restriction-reason" 
                  placeholder="Enter reason for restricting this parent" 
                  rows={3} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRestrictDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (!selectedParent) return
                  const reason = (document.getElementById('restriction-reason') as HTMLTextAreaElement)?.value || ""
                  handleRestrictParent(selectedParent.id, reason)
                }}
                disabled={!selectedParent}
              >
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
              {filteredParents
                .filter(parent => parent.status === "restricted" || searchQuery)
                .map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">{parent.name}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {getStudentNames(parent.students).map((child, index) => (
                        <span key={index} className="text-sm">
                          {child}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{parent.reason || "-"}</TableCell>
                  <TableCell>{parent.date || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={parent.status === "restricted" ? "destructive" : "default"}>
                      {parent.status === "restricted" ? "Restricted" : "Enabled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {parent.status === "restricted" ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedParent(parent)
                          setIsEnableDialogOpen(true)
                        }}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Enable
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedParent(parent)
                          setIsRestrictDialogOpen(true)
                        }}
                      >
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
            <DialogDescription>
              Are you sure you want to enable {selectedParent?.name} to enroll in bus service?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEnableDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (!selectedParent) return
              handleEnableParent(selectedParent.id)
            }}>
              <UserCheck className="mr-2 h-4 w-4" />
              Confirm Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}