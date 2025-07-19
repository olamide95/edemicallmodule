"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CircleDollarSign, Percent, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function StaffReferralEnrollment() {
  const [programType, setProgramType] = useState<string | null>(null)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [enrolledProgram, setEnrolledProgram] = useState<string | null>(null)

  // Mock data for program details
  const programDetails = {
    cashPayout: {
      requiredReferrals: 5,
      amount: 25000,
      expiryPeriod: "Every academic session",
    },
    tuitionDiscount: {
      requiredReferrals: 2,
      discountPercentage: 15,
      expiryPeriod: "Every term",
    },
  }

  const handleEnroll = () => {
    // In a real app, this would make an API call to enroll the staff
    if (programType && agreeToTerms) {
      setEnrolledProgram(programType)
      setShowSuccessDialog(true)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enroll in Referral Program</CardTitle>
          <CardDescription>Choose the type of referral program you want to join</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={programType || ""} onValueChange={setProgramType}>
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className={`flex flex-col rounded-lg border p-6 ${
                  programType === "cashPayout" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value="cashPayout" id="cashPayout" className="sr-only" />
                <Label
                  htmlFor="cashPayout"
                  className="flex flex-col cursor-pointer space-y-4"
                  onClick={() => setProgramType("cashPayout")}
                >
                  <div className="flex items-center space-x-2">
                    <CircleDollarSign className="h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">Cash Payout</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Required Referrals</span>
                      <span className="text-sm font-medium">{programDetails.cashPayout.requiredReferrals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payout Amount</span>
                      <span className="text-sm font-medium">₦{programDetails.cashPayout.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expiry Period</span>
                      <span className="text-sm font-medium">{programDetails.cashPayout.expiryPeriod}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive cash rewards when you successfully refer new students to our school.
                  </p>
                </Label>
              </div>

              <div
                className={`flex flex-col rounded-lg border p-6 ${
                  programType === "tuitionDiscount" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value="tuitionDiscount" id="tuitionDiscount" className="sr-only" />
                <Label
                  htmlFor="tuitionDiscount"
                  className="flex flex-col cursor-pointer space-y-4"
                  onClick={() => setProgramType("tuitionDiscount")}
                >
                  <div className="flex items-center space-x-2">
                    <Percent className="h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">Tuition Discount</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Required Referrals</span>
                      <span className="text-sm font-medium">{programDetails.tuitionDiscount.requiredReferrals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Discount Amount</span>
                      <span className="text-sm font-medium">{programDetails.tuitionDiscount.discountPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expiry Period</span>
                      <span className="text-sm font-medium">{programDetails.tuitionDiscount.expiryPeriod}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Apply discounts to your child's tuition fees when you successfully refer new students.
                  </p>
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="text-sm font-medium">Program Terms & Conditions</h3>
            <div className="text-sm space-y-2">
              <p>By enrolling in the referral program, you agree to the following terms:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Referrals must be new to the school and not previously enrolled</li>
                <li>Referrals are counted only after the student has completed enrollment and paid fees</li>
                <li>Rewards are subject to the expiry period specified in the program details</li>
                <li>The school reserves the right to modify the program terms at any time</li>
                <li>Staff members must be in good standing to participate in the program</li>
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(!!checked)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleEnroll} disabled={!programType || !agreeToTerms} className="w-full">
            Enroll in Program
          </Button>
        </CardFooter>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enrollment Successful</DialogTitle>
            <DialogDescription>You have successfully enrolled in the referral program</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center">
              {enrolledProgram === "cashPayout"
                ? "You have enrolled in the Cash Payout program. Start referring new students to earn rewards!"
                : "You have enrolled in the Tuition Discount program. Start referring new students to earn discounts!"}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Go to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
