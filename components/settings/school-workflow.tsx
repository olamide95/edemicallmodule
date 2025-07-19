"use client"
import { SetStateAction, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Paperclip, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for workflow statuses
const initialWorkflow = [
  {
    id: 1,
    title: "Form Submission",
    status: "Form Submitted",
    emailTitle: "Thank you for your application",
    emailContent:
      "Dear [Parent_Name],\n\nThank you for submitting an application for [Student_Name]. We have received your application and it is currently being processed.\n\nYou will be notified once your application moves to the next stage.\n\nBest regards,\nAdmissions Team",
    attachments: [],
    docType: "admission_form",
    fieldTags: ["Parent_Name", "Student_Name", "Application_Date"],
  },
  {
    id: 2,
    title: "Assessment",
    status: "Under Assessment",
    emailTitle: "Assessment Scheduled",
    emailContent:
      "Dear [Parent_Name],\n\nWe are pleased to inform you that [Student_Name]'s application has moved to the assessment stage.\n\nPlease bring your child to the school on [Assessment_Date] at [Assessment_Time] for the assessment.\n\nBest regards,\nAdmissions Team",
    attachments: ["Assessment_Guidelines.pdf"],
    docType: "assessment",
    fieldTags: ["Parent_Name", "Student_Name", "Assessment_Date", "Assessment_Time"],
  },
  {
    id: 3,
    title: "Admission Letter",
    status: "Admission Letter Sent",
    emailTitle: "Admission Offer",
    emailContent:
      "Dear [Parent_Name],\n\nWe are pleased to inform you that [Student_Name] has been offered admission to [Class_Name] for the [Academic_Year] academic year.\n\nPlease find attached the admission letter and payment instructions.\n\nBest regards,\nAdmissions Team",
    attachments: ["Admission_Letter.pdf", "Payment_Instructions.pdf"],
    docType: "admission_letter",
    fieldTags: ["Parent_Name", "Student_Name", "Class_Name", "Academic_Year", "Fee_Amount"],
  },
  {
    id: 4,
    title: "Payment",
    status: "Awaiting Payment",
    emailTitle: "Payment Reminder",
    emailContent:
      "Dear [Parent_Name],\n\nThis is a reminder that payment for [Student_Name]'s admission is due by [Payment_Deadline].\n\nPlease make the payment to secure your child's place.\n\nBest regards,\nAdmissions Team",
    attachments: ["Payment_Instructions.pdf"],
    docType: "payment",
    fieldTags: ["Parent_Name", "Student_Name", "Payment_Deadline", "Fee_Amount"],
  },
  {
    id: 5,
    title: "Admission",
    status: "Admitted",
    emailTitle: "Welcome to Our School",
    emailContent:
      "Dear [Parent_Name],\n\nWe are delighted to welcome [Student_Name] to our school community. Your child has been successfully admitted to [Class_Name] for the [Academic_Year] academic year.\n\nPlease find attached important information about the orientation day and school calendar.\n\nBest regards,\nAdmissions Team",
    attachments: ["Orientation_Guide.pdf", "School_Calendar.pdf"],
    docType: "welcome",
    fieldTags: ["Parent_Name", "Student_Name", "Class_Name", "Academic_Year", "Orientation_Date"],
  },
]

// Sample data for document types and field tags
const docTypes = [
  { id: "admission_form", name: "Admission Form" },
  { id: "assessment", name: "Assessment" },
  { id: "admission_letter", name: "Admission Letter" },
  { id: "payment", name: "Payment" },
  { id: "welcome", name: "Welcome" },
]

type DocTypeKey = keyof typeof fieldTagsByDocType;

const fieldTagsByDocType = {
  admission_form: ["Parent_Name", "Student_Name", "Application_Date", "Class_Name"],
  assessment: ["Parent_Name", "Student_Name", "Assessment_Date", "Assessment_Time"],
  admission_letter: ["Parent_Name", "Student_Name", "Class_Name", "Academic_Year", "Fee_Amount"],
  payment: ["Parent_Name", "Student_Name", "Payment_Deadline", "Fee_Amount"],
  welcome: ["Parent_Name", "Student_Name", "Class_Name", "Academic_Year", "Orientation_Date"],
}

export function SchoolWorkflow() {
  const [workflow, setWorkflow] = useState(initialWorkflow)
  type WorkflowItem = {
    id: number
    title: string
    status: string
    emailTitle: string
    emailContent: string
    attachments: string[]
    docType: string
    fieldTags: string[]
  }

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null)
  const [emailTitle, setEmailTitle] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [selectedDocType, setSelectedDocType] = useState("")
  const [availableFieldTags, setAvailableFieldTags] = useState<string[]>([])
  const [attachments, setAttachments] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditEmail = (workflowItem: WorkflowItem) => {
    if (!workflowItem) return
    setSelectedWorkflow(workflowItem)
    setEmailTitle(workflowItem.emailTitle)
    setAvailableFieldTags(fieldTagsByDocType[workflowItem.docType as DocTypeKey] || [])
    setSelectedDocType(workflowItem.docType)
    setAvailableFieldTags(fieldTagsByDocType[workflowItem.docType as DocTypeKey] || [])
    setAttachments(workflowItem.attachments)
    setIsDialogOpen(true)
  }

  const handleDocTypeChange = (value: string) => {
    setSelectedDocType(value)
    setAvailableFieldTags(fieldTagsByDocType[value as DocTypeKey] || [])
  }

  const handleInsertFieldTag = (tag: string) => {
    setEmailContent(emailContent + `[${tag}]`)
  }

  const handleUpdateContent = () => {
    if (!selectedWorkflow) return

    const updatedWorkflow = workflow.map((item) =>
      item.id === selectedWorkflow.id
        ? {
            ...item,
            emailTitle,
            emailContent,
            docType: selectedDocType,
            fieldTags: availableFieldTags,
            attachments,
          }
        : item,
    )

    setWorkflow(updatedWorkflow)
    setIsDialogOpen(false)
    // In a real app, you would save this to your backend
  }

  const handleAddAttachment = () => {
    setAttachments([...attachments, `Attachment_${attachments.length + 1}.pdf`])
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>School Workflow</CardTitle>
          <CardDescription>View and edit the workflow for admission process.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email Title</TableHead>
                  <TableHead>Attachments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflow.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "Form Submitted"
                            ? "bg-info-light text-info"
                            : item.status === "Under Assessment"
                              ? "bg-warning-light text-warning"
                              : item.status === "Admission Letter Sent"
                                ? "bg-primary-light text-primary"
                                : item.status === "Awaiting Payment"
                                  ? "bg-secondary-light text-secondary"
                                  : "bg-success-light text-success"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.emailTitle}</TableCell>
                    <TableCell>
                      {item.attachments.length > 0 ? (
                        <Badge variant="outline">{item.attachments.length} files</Badge>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEmail(item)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Edit Email
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Email Content</DialogTitle>
            <DialogDescription>
              Customize the email notification for the {selectedWorkflow?.title} stage.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="grid gap-6 py-4 px-1">
              <div className="space-y-2">
                <Label htmlFor="email-title">Email Title</Label>
                <Input
                  id="email-title"
                  value={emailTitle}
                  onChange={(e) => setEmailTitle(e.target.value)}
                  placeholder="Enter email title"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Document Type</Label>
                  <Select value={selectedDocType} onValueChange={handleDocTypeChange}>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {docTypes.map((docType) => (
                        <SelectItem key={docType.id} value={docType.id}>
                          {docType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Available Field Tags</Label>
                  <ScrollArea className="h-20 rounded-md border">
                    <div className="flex flex-wrap gap-2 p-2">
                      {availableFieldTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary-light"
                          onClick={() => handleInsertFieldTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                  <p className="text-xs text-muted-foreground">Click on a tag to insert it into the email content.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea
                  id="email-content"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  placeholder="Enter email content"
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use field tags like [Parent_Name] to personalize the email.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Attachments</Label>
                  <Button variant="outline" size="sm" onClick={handleAddAttachment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Attachment
                  </Button>
                </div>
                {attachments.length > 0 ? (
                  <div className="space-y-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center">
                          <Paperclip className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{attachment}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveAttachment(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                    No attachments added
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateContent}>Update Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
