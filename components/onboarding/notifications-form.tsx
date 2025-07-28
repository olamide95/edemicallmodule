"use client"

import { useState, useContext, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { toast } from "@/components/ui/use-toast"

interface NotificationSettings {
  emailAlerts: boolean
  pushNotifications: boolean
}

export function NotificationsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAlerts: false,
    pushNotifications: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load notifications from local storage
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || 'null')
    const initialNotifications = savedNotifications || schoolData.notifications || {
      emailAlerts: false,
      pushNotifications: false
    }
    
    setNotifications(initialNotifications)
    setIsMounted(true)
  }, [])

  // Save to local storage whenever notifications change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('notifications', JSON.stringify(notifications))
      updateSchoolData({ notifications })
    }
  }, [notifications, isMounted])

  const handleChange = (field: keyof NotificationSettings, value: boolean) => {
    const updatedNotifications = { ...notifications, [field]: value }
    setNotifications(updatedNotifications)
    
    toast({
      title: "Success",
      description: "Notification settings updated",
    })
  }

  if (!isMounted) return null

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">RFID/GPS Notification Settings</h3>
          <p className="text-sm text-secondary dark:text-secondary">
            Configure how you want to receive attendance alerts and notifications.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-alerts">Send Attendance Alert by Email</Label>
              <p className="text-sm text-secondary dark:text-secondary">
                Receive email notifications when students check in or out.
              </p>
            </div>
            <Switch
              id="email-alerts"
              checked={notifications.emailAlerts}
              onCheckedChange={(checked) => handleChange("emailAlerts", checked)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Send Attendance Alert by Push Notification</Label>
              <p className="text-sm text-secondary dark:text-secondary">
                Receive push notifications on your mobile device.
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => handleChange("pushNotifications", checked)}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}