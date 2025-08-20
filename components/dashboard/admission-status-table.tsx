// components/admission-status-table.tsx
"use client"
import { useState, useEffect } from "react"
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
import { sendEmail } from "@/lib/mailjet"

// Helper function to calculate age from date of birth
function calculateAge(dob: string) {
  if (!dob) return 'N/A'
  const birthDate = new Date(dob)
  const diff = Date.now() - birthDate.getTime()
  const ageDate = new Date(diff)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

// Helper function to get parent name
function getParentName(response: any) {
  if (response.fatherName && response.motherName) {
    return `${response.fatherName} & ${response.motherName}`
  }
  return response.fatherName || response.motherName || 'Not specified'
}

// Helper function to get parent email
function getParentEmail(response: any) {
  return response.fatherEmail || response.motherEmail || null
}

// Function to replace template tags with actual data
function replaceTemplateTags(content: string, studentData: any) {
  let processedContent = content
  
  // Replace all available tags
  const tags = {
    'Parent_Name': getParentName(studentData),
    'Student_Name': `${studentData.firstName} ${studentData.lastName}`,
    'Application_Date': new Date(studentData.submittedAt).toLocaleDateString(),
    'Class_Name': studentData.class || 'Not specified',
    'Assessment_Date': studentData.assessmentDate || 'To be scheduled',
    'Assessment_Time': studentData.assessmentTime || 'To be scheduled',
    'Academic_Year': new Date().getFullYear() + '/' + (new Date().getFullYear() + 1),
    'Fee_Amount': studentData.feeAmount || 'To be determined',
    'Payment_Deadline': studentData.paymentDeadline || 'To be determined',
    'Orientation_Date': studentData.orientationDate || 'To be scheduled'
  }
  
  Object.entries(tags).forEach(([tag, value]) => {
    processedContent = processedContent.replace(new RegExp(`\\[${tag}\\]`, 'g'), value)
  })
  
  return processedContent
}

export function AdmissionStatusTable() {
  const router = useRouter()
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [admissionData, setAdmissionData] = useState<any[]>([])
  const [workflow, setWorkflow] = useState<any[]>([])

  // Load data from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('admissionFormResponses')
    if (savedResponses) {
      setAdmissionData(JSON.parse(savedResponses))
    }

    // Load workflow data
    const savedOnboardingData = localStorage.getItem('onboardingData')
    if (savedOnboardingData) {
      const data = JSON.parse(savedOnboardingData)
      if (data.admissionSettings?.workflow) {
        setWorkflow(data.admissionSettings.workflow)
      }
    }
  }, [])

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
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Form Submitted</Badge>
      case "Under Assessment":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Under Assessment</Badge>
      case "Admission Letter Sent":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">Letter Sent</Badge>
      case "Awaiting Payment":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">Awaiting Payment</Badge>
      case "Admitted":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Admitted</Badge>
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
    router.push("/admission/adminsetup")
  }

  // Function to send email when status changes
  const sendStatusEmail = async (studentData: any, newStatus: string) => {
    const parentEmail = "olatosin163@gmail.com";
    if (!parentEmail) {
      console.warn("No email address found for parent")
      return
    }

    // Find the workflow template for this status
    const workflowItem = workflow.find(item => item.status === newStatus)
    if (!workflowItem) {
      console.warn(`No email template found for status: ${newStatus}`)
      return
    }

    try {
      // Replace template tags with actual data
      const emailSubject = replaceTemplateTags(workflowItem.emailTitle, studentData)
      const emailBody = replaceTemplateTags(workflowItem.emailContent, studentData)

      // Send email using Mailjet
      await sendEmail({
        to: "olatosin163@gmail.com",
        subject: emailSubject,
        text: emailBody,
        html: emailBody.replace(/\n/g, '<br>'),
        attachments: workflowItem.attachments || []
      })

      console.log(`Email sent successfully for status change to ${newStatus}`)
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  // Update status handler
  const updateStatus = async (id: string, newStatus: string) => {
    const studentData = admissionData.find(item => item.id === id)
    if (!studentData) return

    const updatedData = admissionData.map(item => 
      item.id === id ? { ...item, status: newStatus, admissionState: newStatus } : item
    )
    
    setAdmissionData(updatedData)
    localStorage.setItem('admissionFormResponses', JSON.stringify(updatedData))
    
    // Send email notification
    await sendStatusEmail(studentData, newStatus)
  }

  // Bulk status update
  const handleBulkStatusChange = async (newStatus: string) => {
    const updatedData = admissionData.map(item => 
      selectedRows.includes(item.id) ? { ...item, status: newStatus, admissionState: newStatus } : item
    )
    
    setAdmissionData(updatedData)
    setSelectedRows([])
    localStorage.setItem('admissionFormResponses', JSON.stringify(updatedData))
    
    // Send emails for all selected students
    for (const id of selectedRows) {
      const studentData = admissionData.find(item => item.id === id)
      if (studentData) {
        await sendStatusEmail(studentData, newStatus)
      }
    }
  }

  // Delete handler
  const handleDelete = (id: string) => {
    const updatedData = admissionData.filter(item => item.id !== id)
    setAdmissionData(updatedData)
    localStorage.setItem('admissionFormResponses', JSON.stringify(updatedData))
  }

  // Bulk delete
  const handleBulkDelete = () => {
    const updatedData = admissionData.filter(item => !selectedRows.includes(item.id))
    setAdmissionData(updatedData)
    setSelectedRows([])
    localStorage.setItem('admissionFormResponses', JSON.stringify(updatedData))
  }

  // Bulk export
  const handleBulkExport = () => {
    const selectedData = admissionData.filter(item => selectedRows.includes(item.id))
    console.log("Exporting selected rows:", selectedData)
    // In a real app, you would implement actual export functionality here
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
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"
            variant="outline" size="sm" onClick={handleNewEnrollment}>
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
                <TableHead>Parent Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted On</TableHead>
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
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {row.firstName?.charAt(0)}{row.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {row.firstName} {row.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getParentName(row)}
                  </TableCell>
                  <TableCell>
                    {getParentEmail(row) || 'Not specified'}
                  </TableCell>
                  <TableCell>{row.class || 'Not specified'}</TableCell>
                  <TableCell>
                    {row.age || calculateAge(row.dateOfBirth)}
                    {row.dateOfBirth && (
                      <div className="text-xs text-muted-foreground">
                        {new Date(row.dateOfBirth).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.fatherPhone || row.motherPhone || 'Not specified'}
                  </TableCell>
                  <TableCell>
                    {row.address ? `${row.address}, ${row.city}` : 'Not specified'}
                  </TableCell>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                  <TableCell>
                    {new Date(row.submittedAt).toLocaleDateString()}
                  </TableCell>
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

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => updateStatus(row.id, "Form Submitted")}>
                              Mark as Form Submitted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(row.id, "Under Assessment")}>
                              Mark as Under Assessment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(row.id, "Admission Letter Sent")}>
                              Mark as Letter Sent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(row.id, "Awaiting Payment")}>
                              Mark as Awaiting Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(row.id, "Admitted")}>
                              Mark as Admitted
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(row.id)}
                            >
                              Cancel Application
                            </DropdownMenuItem>
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