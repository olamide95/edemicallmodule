"use client"

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
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface IndividualAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: {
    id: string
    name: string
    class: string
    section: string
    currentDiscounts: Array<{ name: string; value: string; status: string }>
  } | null
}

export function IndividualAssignmentDialog({ open, onOpenChange, student }: IndividualAssignmentDialogProps) {
  const [discountType, setDiscountType] = useState("")
  const [discountValueType, setDiscountValueType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState("")
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(new Date())
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  )
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      // Reset form
      setDiscountType("")
      setDiscountValueType("percentage")
      setDiscountValue("")
      setReason("")
    }, 1000)
  }

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Discount to Student</DialogTitle>
          <DialogDescription>
            Assign a discount to {student.name} ({student.id})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <div className="text-sm font-medium">Student</div>
              <div className="text-sm">{student.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Class</div>
              <div className="text-sm">
                {student.class}, Section {student.section}
              </div>
            </div>
          </div>

          {student.currentDiscounts.length > 0 && (
            <div className="mb-2">
              <div className="text-sm font-medium mb-1">Current Discounts</div>
              <div className="text-sm">
                {student.currentDiscounts.map((discount, idx) => (
                  <span key={idx} className="inline-block mr-2 text-[#8c57ff]">
                    {discount.name}: {discount.value}
                  </span>
                ))}
              </div>
            </div>
          )}

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
            <Label htmlFor="reason">Reason / Notes</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Add any notes or reason for this discount"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#8c57ff] hover:bg-[#7a48e3]">
            {isSubmitting ? "Assigning..." : "Assign Discount"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
