import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Referral Program Settings | School Finance Management",
  description: "Configure referral program settings",
}

export default function ReferralSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Referral Program Settings</h1>
        <p className="text-muted-foreground">Configure global settings for the referral program</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Status</CardTitle>
              <CardDescription>Enable or disable the referral program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="program-status">Referral Program Status</Label>
                  <p className="text-sm text-muted-foreground">
                    When disabled, users cannot enroll or make new referrals
                  </p>
                </div>
                <Switch id="program-status" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eligibility Settings</CardTitle>
              <CardDescription>Configure who can participate in the referral program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parent-eligibility">Parent Eligibility</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="parent-eligibility">
                      <SelectValue placeholder="Select parent eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Parents</SelectItem>
                      <SelectItem value="existing">Existing Parents Only</SelectItem>
                      <SelectItem value="new">New Parents Only</SelectItem>
                      <SelectItem value="none">Not Eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staff-eligibility">Staff Eligibility</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="staff-eligibility">
                      <SelectValue placeholder="Select staff eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="teaching">Teaching Staff Only</SelectItem>
                      <SelectItem value="admin">Administrative Staff Only</SelectItem>
                      <SelectItem value="none">Not Eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-eligibility">Student Eligibility</Label>
                  <Select defaultValue="senior">
                    <SelectTrigger id="student-eligibility">
                      <SelectValue placeholder="Select student eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="senior">Senior Students Only</SelectItem>
                      <SelectItem value="none">Not Eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alumni-eligibility">Alumni Eligibility</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="alumni-eligibility">
                      <SelectValue placeholder="Select alumni eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alumni</SelectItem>
                      <SelectItem value="recent">Recent Graduates Only</SelectItem>
                      <SelectItem value="none">Not Eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Code Settings</CardTitle>
              <CardDescription>Configure how referral codes are generated and used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="code-prefix">Referral Code Prefix</Label>
                  <Input id="code-prefix" defaultValue="SCH-" />
                  <p className="text-xs text-muted-foreground">Prefix added to all referral codes (e.g., SCH-12345)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code-length">Referral Code Length</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="code-length">
                      <SelectValue placeholder="Select code length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 characters</SelectItem>
                      <SelectItem value="5">5 characters</SelectItem>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Length of the random part of the referral code</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code-expiry">Referral Code Expiry</Label>
                  <Select defaultValue="never">
                    <SelectTrigger id="code-expiry">
                      <SelectValue placeholder="Select expiry period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never Expires</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How long referral codes remain valid</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="unique-codes">Unique Codes Per User Type</Label>
                    <Switch id="unique-codes" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Generate different code formats for different user types
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Configure email templates for the referral program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="referral-invitation">Referral Invitation Email</Label>
                <Textarea
                  id="referral-invitation"
                  rows={6}
                  defaultValue={`Dear [Recipient Name],

I'd like to invite you to consider [School Name] for your child's education. I've had a great experience with the school and thought you might be interested.

Please use my referral code [Referral Code] when applying.

Best regards,
[Referrer Name]`}
                />
                <p className="text-xs text-muted-foreground">Template for emails sent by users to refer others</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-email">Welcome to Referral Program Email</Label>
                <Textarea
                  id="welcome-email"
                  rows={6}
                  defaultValue={`Dear [User Name],

Thank you for joining our referral program! Your unique referral code is [Referral Code].

Share this code with friends and family who might be interested in enrolling their children at our school. For every successful referral, you'll earn rewards as per our program terms.

Best regards,
[School Name] Team`}
                />
                <p className="text-xs text-muted-foreground">Sent to users when they join the referral program</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="successful-referral">Successful Referral Email</Label>
                <Textarea
                  id="successful-referral"
                  rows={6}
                  defaultValue={`Dear [User Name],

Great news! Your referral [Referred Name] has successfully enrolled at our school.

This counts towards your referral rewards. You now have [Current Count] successful referrals out of [Required Count] needed for your next reward.

Thank you for helping our school community grow!

Best regards,
[School Name] Team`}
                />
                <p className="text-xs text-muted-foreground">Sent when a referred student successfully enrolls</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Email Templates</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notifications for the referral program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Admin Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify administrators about referral program activities
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Referral Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify administrators when a new referral is made</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payout Request Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify administrators when a payout is requested</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to users about their referral status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Referral Status Update Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify users when their referral status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reward Eligibility Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify users when they become eligible for rewards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
