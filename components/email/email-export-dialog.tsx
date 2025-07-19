"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Checkbox } from "@/components/ui/checkbox"
import { sendStudentDataEmail } from "@/app/admission/actions/email-actions"
import { Loader2, Mail, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmailExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Record<string, any>[]
  selectedFields: string[]
  administrators: { email: string; name: string }[]
  filename: string
  recordCount: number
  onSuccess?: () => void
}

export function EmailExportDialog({
  open,
  onOpenChange,
  data,
  selectedFields,
  administrators,
  filename,
  recordCount,
  onSuccess,
}: EmailExportDialogProps) {
  const [subject, setSubject] = useState(`Student Data Export - ${new Date().toLocaleDateString()}`)
  const [message, setMessage] = useState(
    `Please find attached the exported student data.\n\nThis file contains information for ${recordCount} student(s).\n\nRegards,\nAdmissions System`,
  )
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [customRecipient, setCustomRecipient] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleRecipientToggle = (email: string) => {
    setSelectedRecipients((prev) => (prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]))
  }

  const handleAddCustomRecipient = () => {
    if (customRecipient && !selectedRecipients.includes(customRecipient)) {
      setSelectedRecipients((prev) => [...prev, customRecipient])
      setCustomRecipient("")
    }
  }

  const handleSubmit = async () => {
    if (selectedRecipients.length === 0) {
      setResult({
        success: false,
        message: "Please select at least one recipient",
      })
      return
    }

    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await sendStudentDataEmail({
        recipients: selectedRecipients,
        subject,
        message,
        data,
        selectedFields,
        filename,
      })

      if (response.success) {
        setResult({
          success: true,
          message: `Email sent successfully to ${response.recipients?.length || 0} recipient(s)`,
        })
        if (onSuccess) {
          setTimeout(onSuccess, 2000)
        }
      } else {
        setResult({
          success: false,
          message: response.error || "Failed to send email",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Email Student Data</DialogTitle>
          <DialogDescription>Send the exported student data to administrators via email.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="space-y-2 border rounded-md p-3">
                {administrators.map((admin) => (
                  <div key={admin.email} className="flex items-center space-x-2">
                    <Checkbox
                      id={`admin-${admin.email}`}
                      checked={selectedRecipients.includes(admin.email)}
                      onCheckedChange={() => handleRecipientToggle(admin.email)}
                    />
                    <Label htmlFor={`admin-${admin.email}`} className="flex-1">
                      {admin.name} <span className="text-muted-foreground">({admin.email})</span>
                    </Label>
                  </div>
                ))}

                <div className="pt-2 border-t mt-2">
                  <Label htmlFor="custom-recipient">Add Custom Recipient</Label>
                  <div className="flex mt-1 gap-2">
                    <Input
                      id="custom-recipient"
                      placeholder="email@example.com"
                      value={customRecipient}
                      onChange={(e) => setCustomRecipient(e.target.value)}
                      type="email"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCustomRecipient}
                      disabled={!customRecipient || !customRecipient.includes("@")}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {selectedRecipients.length > 0 && !administrators.some((a) => selectedRecipients.includes(a.email)) && (
                  <div className="mt-2 pt-2 border-t">
                    <Label>Custom Recipients</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedRecipients
                        .filter((email) => !administrators.some((a) => a.email === email))
                        .map((email) => (
                          <div
                            key={email}
                            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            {email}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => handleRecipientToggle(email)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Email message"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Export Details</Label>
              <div className="rounded-md bg-muted p-3 text-sm">
                <p>
                  <span className="font-medium">File name:</span> {filename}.csv
                </p>
                <p>
                  <span className="font-medium">Records:</span> {recordCount} student(s)
                </p>
                <p>
                  <span className="font-medium">Fields:</span> {selectedFields.length} selected
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || selectedRecipients.length === 0}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
