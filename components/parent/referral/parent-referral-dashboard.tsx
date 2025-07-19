"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Copy, Share2, Award, Users, DollarSign, Percent } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function ParentReferralDashboard() {
  const [referralLink, setReferralLink] = useState("https://school.edu/refer?code=PARENT123")
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to your clipboard.",
    })
  }

  const handleShareByEmail = () => {
    // In a real app, this would send the email
    toast({
      title: "Invitation sent",
      description: `Referral invitation has been sent to ${emailAddress}.`,
    })
    setEmailAddress("")
    setIsShareDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link with friends and family to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input value={referralLink} readOnly className="pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={copyReferralLink}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Referral Link</DialogTitle>
                  <DialogDescription>
                    Invite someone to join our school and earn rewards when they enroll.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="friend@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleShareByEmail}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">12</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">5 pending, 7 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">$750</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">$250 pending, $500 received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cash Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">$500</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Next payout: May 30</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tuition Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Percent className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">$250</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Applied to next semester</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Rewards Program</CardTitle>
          <CardDescription>Earn rewards for each successful student referral</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cash">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cash">Cash Rewards</TabsTrigger>
              <TabsTrigger value="discount">Tuition Discounts</TabsTrigger>
            </TabsList>
            <TabsContent value="cash" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">Spring Referral Program</h4>
                  <span className="text-sm text-muted-foreground">$50 per referral</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Earn $50 for each student you refer who completes enrollment. Additional $25 bonus when you reach 5
                  successful referrals!
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to bonus</span>
                    <span>3/5 referrals</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="discount" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">Family Discount Program</h4>
                  <span className="text-sm text-muted-foreground">5% per referral</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Earn a 5% tuition discount for each successful referral, up to a maximum of 25% off your child's
                  tuition fees.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current discount</span>
                    <span>15% of tuition</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
