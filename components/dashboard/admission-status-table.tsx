"use client"
import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Download, ChevronRight, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

// Sample data - in a real app this would come from your API
const admissionData = [
  {
    id: "ADM001",
    studentFirstName: "John",
    studentLastName: "Smith",
    parentName: "David Smith",
    enrollmentFormNumber: "EF-2023-001",
    status: "Under Assessment",
    admissionClass: "Grade 1",
    dateOfBirth: "2017-05-15",
    age: 6,
    parentContactNumber: "+1 234-567-8901",
    admissionState: "Under Assessment",
    marketingMedium: "Google Ad",
  },
  {
    id: "ADM002",
    studentFirstName: "Emma",
    studentLastName: "Johnson",
    parentName: "Michael Johnson",
    enrollmentFormNumber: "EF-2023-002",
    status: "Form Submitted",
    admissionClass: "Nursery 2",
    dateOfBirth: "2019-08-21",
    age: 4,
    parentContactNumber: "+1 234-567-8902",
    admissionState: "Form Submitted",
    marketingMedium: "Referral",
  },
  {
    id: "ADM003",
    studentFirstName: "Olivia",
    studentLastName: "Williams",
    parentName: "Jennifer Williams",
    enrollmentFormNumber: "EF-2023-003",
    status: "Admission Letter Sent",
    admissionClass: "Grade 3",
    dateOfBirth: "2015-03-10",
    age: 8,
    parentContactNumber: "+1 234-567-8903",
    admissionState: "Admission Letter Sent",
    marketingMedium: "Facebook",
  },
  {
    id: "ADM004",
    studentFirstName: "Sophia",
    studentLastName: "Brown",
    parentName: "Robert Brown",
    enrollmentFormNumber: "EF-2023-004",
    status: "Awaiting Payment",
    admissionClass: "Toddlers",
    dateOfBirth: "2021-01-05",
    age: 2,
    parentContactNumber: "+1 234-567-8904",
    admissionState: "Awaiting Payment",
    marketingMedium: "Google Search",
  },
  {
    id: "ADM005",
    studentFirstName: "William",
    studentLastName: "Jones",
    parentName: "Patricia Jones",
    enrollmentFormNumber: "EF-2023-005",
    status: "Admitted",
    admissionClass: "Grade 2",
    dateOfBirth: "2016-11-28",
    age: 7,
    parentContactNumber: "+1 234-567-8905",
    admissionState: "Admitted",
    marketingMedium: "Edutech site",
  },
]
  
export function AdmissionStatusTable() {
  const router = useRouter()
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Function to get status badge color based on admission state
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Form Submitted":
        return <Badge className="bg-info-light text-info">Form Submitted</Badge>
      case "Under Assessment":
        return <Badge className="bg-warning-light text-warning">Under Assessment</Badge>
      case "Admission Letter Sent":
        return <Badge className="bg-primary-light text-primary">Letter Sent</Badge>
      case "Awaiting Payment":
        return <Badge className="bg-secondary-light text-secondary">Awaiting Payment</Badge>
      case "Admitted":
        return <Badge className="bg-success-light text-success">Admitted</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    if (selectedRows.length === admissionData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(admissionData.map(row => row.id))
    }
  }

  const handleNewEnrollment = () => {
    router.push("/admission/form")
  }

  // Bulk action handlers
  const handleBulkDelete = () => {
    // Implement bulk delete logic here
    console.log("Deleting selected rows:", selectedRows)
    // In a real app, you would call an API here
    setSelectedRows([])
  }

  const handleBulkStatusChange = (newStatus: string) => {
    // Implement bulk status change logic here
    console.log(`Changing status to ${newStatus} for:`, selectedRows)
    // In a real app, you would call an API here
  }

  const handleBulkExport = () => {
    // Implement bulk export logic here
    console.log("Exporting selected rows:", selectedRows)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Admission Status
          {selectedRows.length > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {selectedRows.length} selected
            </span>
          )}
        </CardTitle>
        <div className="flex space-x-2">
          {selectedRows.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleBulkStatusChange("Form Submitted")}>
                  Mark as Form Submitted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusChange("Under Assessment")}>
                  Mark as Under Assessment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusChange("Admission Letter Sent")}>
                  Mark as Letter Sent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusChange("Awaiting Payment")}>
                  Mark as Awaiting Payment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusChange("Admitted")}>
                  Mark as Admitted
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleBulkExport}>
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <Button variant="outline" size="sm" onClick={handleNewEnrollment}>
            <Plus className="mr-2 h-4 w-4" /> New Enrollment
          </Button>
          <Button variant="outline" size="sm" disabled={selectedRows.length === 0} onClick={handleBulkExport}>
            Export <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedRows.length === admissionData.length && admissionData.length > 0}
                    onCheckedChange={toggleAllRows}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-[250px]">
                  <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent"
                    onClick={() => handleSort("studentName")}
                  >
                    Student Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Enrollment #</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Marketing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissionData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                      aria-label={`Select ${row.studentFirstName} ${row.studentLastName}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {row.studentFirstName.charAt(0)}{row.studentLastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {row.studentFirstName} {row.studentLastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{row.parentName}</TableCell>
                  <TableCell>{row.enrollmentFormNumber}</TableCell>
                  <TableCell>{getStatusBadge(row.admissionState)}</TableCell>
                  <TableCell>{row.admissionClass}</TableCell>
                  <TableCell>
                    {row.age} yrs
                    <div className="text-xs text-muted-foreground">
                      {new Date(row.dateOfBirth).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{row.parentContactNumber}</TableCell>
                  <TableCell>{row.marketingMedium}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <div className="flex justify-end space-x-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Details</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Move to Next Stage</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Download</TooltipContent>
                        </Tooltip>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancel Application</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}