"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function ReferralSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="referral-prefix">Referral Code Prefix</Label>
        <Input id="referral-prefix" defaultValue="SCH" />
        <p className="text-sm text-muted-foreground">Prefix used for all referral codes (e.g., SCH-12345)</p>
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
        <p className="text-sm text-muted-foreground">Length of the random part of the referral code</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-approve">Auto-approve Referral Payouts</Label>
          <Switch id="auto-approve" />
        </div>
        <p className="text-sm text-muted-foreground">Automatically approve referral payouts when conditions are met</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-apply">Auto-apply Tuition Discounts</Label>
          <Switch id="auto-apply" />
        </div>
        <p className="text-sm text-muted-foreground">Automatically apply tuition discounts when conditions are met</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-enroll">Auto-enroll Eligible Users</Label>
          <Switch id="auto-enroll" />
        </div>
        <p className="text-sm text-muted-foreground">Automatically enroll eligible users in the referral program</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="notification-email">Notification Email</Label>
        <Input id="notification-email" type="email" defaultValue="finance@school.edu" />
        <p className="text-sm text-muted-foreground">Email address to receive referral program notifications</p>
      </div>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
