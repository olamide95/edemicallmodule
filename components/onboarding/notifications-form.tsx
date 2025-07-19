"use client"

import { useState, useContext, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function NotificationsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [notifications, setNotifications] = useState({
    emailAlerts: false,
    pushNotifications: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  // Load notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/notifications')
        if (response.success && response.data) {
          setNotifications(response.data)
          updateSchoolData({ notifications: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch notification settings",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const handleChange = async (field: keyof typeof notifications, value: boolean) => {
    const updatedNotifications = { ...notifications, [field]: value }
    setNotifications(updatedNotifications)
    
    try {
      setIsLoading(true)
      const response = await api.put('/school-setup/notifications', updatedNotifications)
      if (response.success) {
        updateSchoolData({ notifications: updatedNotifications })
        toast({
          title: "Success",
          description: "Notification settings updated successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update notifications",
        variant: "destructive",
      })
      // Revert on error
      setNotifications(notifications)
    } finally {
      setIsLoading(false)
    }
  }

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