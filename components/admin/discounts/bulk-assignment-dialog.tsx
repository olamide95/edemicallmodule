"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Sample discount types
const discountTypes = [
  { id: "early", name: "Early Payment Discount" },
  { id: "sibling", name: "Sibling Discount" },
  { id: "merit", name: "Merit Scholarship" },
  { id: "staff", name: "Staff Discount" },
  { id: "financial", name: "Financial Aid" },
  { id: "referral", name: "Referral Discount" },
]

// Sample fee heads
const feeHeads = [
  { id: "tuition", name: "Tuition Fee" },
  { id: "facility", name: "Facility Fee" },
  { id: "technology", name: "Technology Fee" },
  { id: "library", name: "Library Fee" },
  { id: "sports", name: "Sports Fee" },
  { id: "transport", name: "Transportation Fee" },
]

interface BulkAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCount: number
}

export function BulkAssignmentDialog({ open, onOpenChange, selectedCount }: BulkAssignmentDialogProps) {
  const [step, setStep] = useState(1)
  const [discountType, setDiscountType] = useState("")
  const [discountValueType, setDiscountValueType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState("")
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(new Date())
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  )
  const [reason, setReason] = useState("")
  const [conflictResolution, setConflictResolution] = useState("override")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [successCount, setSuccessCount] = useState(0)
  const [failCount, setFailCount] = useState(0)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleProcess = () => {
    setIsProcessing(true)
    setProgress(0)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setIsComplete(true)
          setSuccessCount(selectedCount - Math.floor(Math.random() * 3))
          setFailCount(Math.floor(Math.random() * 3))
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset state after dialog closes
    setTimeout(() => {
      setStep(1)
      setDiscountType("")
      setDiscountValueType("percentage")
      setDiscountValue("")
      setReason("")
      setConflictResolution("override")
      setIsProcessing(false)
      setProgress(0)
      setIsComplete(false)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bulk Assign Discount</DialogTitle>
          <DialogDescription>
            Assign a discount to {selectedCount} selected student{selectedCount !== 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="discount-type">Discount Type</Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger id="discount-type">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  {discountTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Discount Value Type</Label>
              <RadioGroup
                value={discountValueType}
                onValueChange={setDiscountValueType}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage" className="cursor-pointer">
                    Percentage
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="cursor-pointer">
                    Fixed Amount
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="discount-value">{discountValueType === "percentage" ? "Percentage (%)" : "Amount"}</Label>
              <Input
                id="discount-value"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountValueType === "percentage" ? "e.g. 15" : "e.g. 5000"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="applicable-fee">Applicable Fee Heads</Label>
              <Select>
                <SelectTrigger id="applicable-fee">
                  <SelectValue placeholder="Select fee heads" />
                </SelectTrigger>
                <SelectContent>
                  {feeHeads.map((fee) => (
                    <SelectItem key={fee.id} value={fee.id}>
                      {fee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                disabled={!discountType || !discountValue}
                className="bg-[#8c57ff] hover:bg-[#7a48e3]"
              >
                Next
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Effective Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !effectiveDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {effectiveDate ? format(effectiveDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={effectiveDate} onSelect={setEffectiveDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label>Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Conflict Resolution</Label>
              <RadioGroup value={conflictResolution} onValueChange={setConflictResolution} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="override" id="override" />
                  <Label htmlFor="override" className="cursor-pointer">
                    Override existing discounts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skip" id="skip" />
                  <Label htmlFor="skip" className="cursor-pointer">
                    Skip students with existing discounts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="additional" id="additional" />
                  <Label htmlFor="additional" className="cursor-pointer">
                    Add as additional discount
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason">Reason / Notes</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Add any notes or reason for this discount"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} className="bg-[#8c57ff] hover:bg-[#7a48e3]">
                Review
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 3 && !isProcessing && !isComplete && (
          <div className="grid gap-4 py-4">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Review Assignment</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Students:</div>
                  <div>{selectedCount} selected</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Discount Type:</div>
                  <div>{discountTypes.find((d) => d.id === discountType)?.name || discountType}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Discount Value:</div>
                  <div>
                    {discountValue} {discountValueType === "percentage" ? "%" : ""}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Effective Date:</div>
                  <div>{effectiveDate ? format(effectiveDate, "PPP") : "Not set"}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Expiry Date:</div>
                  <div>{expiryDate ? format(expiryDate, "PPP") : "Not set"}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Conflict Resolution:</div>
                  <div>
                    {conflictResolution === "override"
                      ? "Override existing discounts"
                      : conflictResolution === "skip"
                        ? "Skip students with existing discounts"
                        : "Add as additional discount"}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleProcess} className="bg-[#8c57ff] hover:bg-[#7a48e3]">
                Process Assignment
              </Button>
            </DialogFooter>
          </div>
        )}

        {isProcessing && (
          <div className="grid gap-4 py-4">
            <div className="text-center py-4">
              <h3 className="font-medium mb-4">Processing Discount Assignments</h3>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                Processing {selectedCount} student{selectedCount !== 1 ? "s" : ""}... {progress}%
              </p>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="grid gap-4 py-4">
            <div className="text-center py-2">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium text-xl mb-1">Assignment Complete</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discount has been assigned to {successCount} out of {selectedCount} students
              </p>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>Successfully Assigned</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {successCount}
                    </Badge>
                  </div>

                  {failCount > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span>Failed Assignments</span>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {failCount}
                      </Badge>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="details" className="p-4 border rounded-md mt-2">
                <div className="text-sm">
                  <p className="font-medium mb-2">Assignment Details:</p>
                  <ul className="space-y-1 list-disc pl-5">
                    <li>Discount Type: {discountTypes.find((d) => d.id === discountType)?.name || discountType}</li>
                    <li>
                      Value: {discountValue} {discountValueType === "percentage" ? "%" : ""}
                    </li>
                    <li>Effective Date: {effectiveDate ? format(effectiveDate, "PPP") : "Not set"}</li>
                    <li>Expiry Date: {expiryDate ? format(expiryDate, "PPP") : "Not set"}</li>
                    <li>Assigned By: Admin User</li>
                    <li>Assignment Date: {format(new Date(), "PPP")}</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleClose} className="bg-[#8c57ff] hover:bg-[#7a48e3]">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
