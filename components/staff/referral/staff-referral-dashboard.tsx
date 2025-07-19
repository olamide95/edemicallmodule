"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Share, Copy, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function StaffReferralDashboard() {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [emailRecipients, setEmailRecipients] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [copied, setCopied] = useState(false)

  // Mock data for the dashboard
  const referralData = {
    hasReferralCode: true,
    referralCode: "STF-T5432",
    programType: "Cash Payout", // or "Tuition Discount"
    totalReferrals: 4,
    requiredReferrals: 5,
    successfulReferrals: 3,
    inProgressReferrals: 1,
    sharedReferrals: 6,
    eligibleForPayout: false,
    eligibleForDiscount: false,
    payoutAmount: 25000, // in currency units
    discountPercentage: 15, // percentage
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendReferralEmail = () => {
    // In a real app, this would send the email via an API
    console.log("Sending email to:", emailRecipients)
    console.log("Message:", emailMessage)
    setShowShareDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{referralData.successfulReferrals}</div>
            </div>
            <p className="text-xs text-muted-foreground">Completed admissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              <div className="text-2xl font-bold">{referralData.inProgressReferrals}</div>
            </div>
            <p className="text-xs text-muted-foreground">Forms submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Share className="mr-2 h-4 w-4 text-slate-500" />
              <div className="text-2xl font-bold">{referralData.sharedReferrals}</div>
            </div>
            <p className="text-xs text-muted-foreground">Invitations sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining for Reward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">
                {Math.max(0, referralData.requiredReferrals - referralData.successfulReferrals)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">More successful referrals needed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with potential new students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="text-xl font-semibold">{referralData.referralCode}</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyReferralCode}>
                <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmailMessage(`Hello,

I wanted to share my referral code for our school. If you're interested in enrolling your child, please use my referral code: ${referralData.referralCode}.

Best regards,
[Your Name]`)
                  setShowShareDialog(true)
                }}
              >
                <Share className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Referral Progress</CardTitle>
            <CardDescription>
              {referralData.successfulReferrals} of {referralData.requiredReferrals} successful referrals needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress
              value={(referralData.successfulReferrals / referralData.requiredReferrals) * 100}
              className="h-2"
            />

            {referralData.eligibleForPayout || referralData.eligibleForDiscount ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    You are eligible for a reward!
                  </p>
                </div>
                <p className="mt-1 text-sm text-green-600/80 dark:text-green-400/80">
                  Visit the Reward Requests tab to claim your reward.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                You need {Math.max(0, referralData.requiredReferrals - referralData.successfulReferrals)} more
                successful referrals to qualify for a reward
              </p>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{referralData.programType}</Badge>
                {referralData.programType === "Cash Payout" ? (
                  <span className="text-sm text-muted-foreground">
                    ₦{referralData.payoutAmount.toLocaleString()} per {referralData.requiredReferrals} referrals
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {referralData.discountPercentage}% discount on tuition
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="#enrollment">Change Program</a>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referral Status</CardTitle>
            <CardDescription>Overview of your referral activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">Shared</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{referralData.sharedReferrals}</Badge>
                  <p className="text-sm">Invitations sent</p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{referralData.inProgressReferrals}</Badge>
                  <p className="text-sm">Forms submitted</p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">Successful</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">{referralData.successfulReferrals}</Badge>
                  <p className="text-sm">Admissions complete</p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">Rewards</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">0</Badge>
                  <p className="text-sm">Rewards received</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Referral Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Your Referral Code</DialogTitle>
            <DialogDescription>Send your referral code via email to potential new students</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Email Recipients</Label>
              <Input
                id="recipients"
                placeholder="email@example.com, email2@example.com"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-between sm:justify-end">
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={sendReferralEmail}>
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
