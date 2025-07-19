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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface UnenrollStudentDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  studentName: string
  clubName: string
}

export function UnenrollStudentDialog({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  clubName,
}: UnenrollStudentDialogProps) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = () => {
    if (!reason.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      onConfirm(reason)
      setIsSubmitting(false)
      setReason("")
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unenroll Student</DialogTitle>
          <DialogDescription>
            Are you sure you want to unenroll <span className="font-semibold">{studentName}</span> from{" "}
            <span className="font-semibold">{clubName}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Unenrollment</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for unenrollment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!reason.trim() || isSubmitting}>
            {isSubmitting ? "Processing..." : "Confirm Unenrollment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
