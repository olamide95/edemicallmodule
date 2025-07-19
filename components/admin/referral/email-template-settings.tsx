"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EmailTemplateSettings() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="invitation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invitation">Invitation</TabsTrigger>
          <TabsTrigger value="reminder">Reminder</TabsTrigger>
          <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
        </TabsList>

        <TabsContent value="invitation">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Email Template</CardTitle>
              <CardDescription>Email sent when a user shares their referral code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject-invitation">Email Subject</Label>
                <Textarea
                  id="subject-invitation"
                  className="h-10"
                  defaultValue="Join Our School - Special Invitation from {{referrer_name}}"
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {{ referrer_name }}, {{ school_name }}, {{ referral_code }}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body-invitation">Email Body</Label>
                <Textarea
                  id="body-invitation"
                  className="min-h-[200px]"
                  defaultValue={`Dear Friend,

I'm excited to invite you to consider {{school_name}} for your child's education journey.

As a current member of the school community, I've been impressed with the quality of education and caring environment.

Use my referral code {{referral_code}} when applying to receive special consideration.

Visit our website or contact the admissions office to learn more.

Best regards,
{{referrer_name}}`}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {{ referrer_name }}, {{ school_name }}, {{ referral_code }}, {{ referral_link }}
                </p>
              </div>

              <div className="flex justify-end">
                <Button>Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminder">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Email Template</CardTitle>
              <CardDescription>Follow-up reminder email for referrals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject-reminder">Email Subject</Label>
                <Textarea
                  id="subject-reminder"
                  className="h-10"
                  defaultValue="A Friendly Reminder About {{school_name}}"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body-reminder">Email Body</Label>
                <Textarea
                  id="body-reminder"
                  className="min-h-[200px]"
                  defaultValue={`Dear Friend,

I wanted to follow up on my previous invitation to consider {{school_name}} for your child's education.

Remember to use my referral code {{referral_code}} when applying to receive special consideration.

The application deadline is approaching. Please don't hesitate to reach out if you have any questions.

Best regards,
{{referrer_name}}`}
                />
              </div>

              <div className="flex justify-end">
                <Button>Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmation">
          <Card>
            <CardHeader>
              <CardTitle>Confirmation Email Template</CardTitle>
              <CardDescription>Email sent when a referral is successfully used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject-confirmation">Email Subject</Label>
                <Textarea
                  id="subject-confirmation"
                  className="h-10"
                  defaultValue="Good News! Your Referral Code Has Been Used"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body-confirmation">Email Body</Label>
                <Textarea
                  id="body-confirmation"
                  className="min-h-[200px]"
                  defaultValue={`Dear {{referrer_name}},

Great news! Your referral code {{referral_code}} has been used by a new applicant.

Here's a summary of your referrals:
- Total successful referrals: {{total_referrals}}
- Referrals needed for reward: {{referrals_needed}}

Thank you for being an ambassador for our school community.

Best regards,
The {{school_name}} Team`}
                />
              </div>

              <div className="flex justify-end">
                <Button>Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
