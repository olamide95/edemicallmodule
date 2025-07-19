"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Select which channels to use for notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="desktop-notification" />
              <Label htmlFor="desktop-notification">Desktop Notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="whatsapp-notification" />
              <Label htmlFor="whatsapp-notification">WhatsApp</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="email-notification" defaultChecked />
              <Label htmlFor="email-notification">Email</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="push-notification" />
              <Label htmlFor="push-notification">Push Notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="sms-notification" />
              <Label htmlFor="sms-notification">SMS</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Reminder Schedule</CardTitle>
          <CardDescription>Configure when and how often to send payment reminders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initial-reminder">Initial Reminder (days after due date)</Label>
              <Input id="initial-reminder" type="number" min="0" defaultValue="1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger id="reminder-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outstanding-threshold">Outstanding Payment Threshold (days)</Label>
              <Input id="outstanding-threshold" type="number" min="0" defaultValue="60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="escalation-frequency">Escalation Frequency After Threshold</Label>
              <Select defaultValue="weekly">
                <SelectTrigger id="escalation-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border p-4 bg-blue-50">
            <p className="text-sm text-blue-800">
              Note: Ensure that notification templates are configured for each channel in the Templates section.
              Excessive notifications may lead to parent complaints or notification fatigue.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
