"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Save, Search, UserX } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface BusSettings {
  parentEnrollment: boolean
  enrollmentDeadline: string
  unenrollmentDeadline: string
  seatTimeout: string
  currentTerm: string
  busPolicy: string
  enableTracking: boolean
  firstAlertMinutes: string
  secondAlertMinutes: string
  latePickupMinutes: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<BusSettings>({
    parentEnrollment: true,
    enrollmentDeadline: "15",
    unenrollmentDeadline: "7",
    seatTimeout: "48",
    currentTerm: "first",
    busPolicy: `# School Bus Policy\n\n## 1. General Rules\n- Students must be at their designated bus stop at least 5 minutes before the scheduled pickup time.\n- Students must follow the instructions of the bus driver and bus administrator at all times.\n- Eating and drinking are not allowed on the bus.`,
    enableTracking: true,
    firstAlertMinutes: "10",
    secondAlertMinutes: "5",
    latePickupMinutes: "15"
  })
  const [isMounted, setIsMounted] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('busSettings') || 'null')
    if (savedSettings) {
      setSettings(savedSettings)
    }
    setIsMounted(true)
  }, [])

  // Save to localStorage when settings change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('busSettings', JSON.stringify(settings))
    }
  }, [settings, isMounted])

  const handleSettingChange = (field: keyof BusSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const saveSettings = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully",
    })
  }

  if (!isMounted) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your school bus module settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="tracking">Bus Tracking</TabsTrigger>
          <TabsTrigger value="policy">Bus Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic settings for the school bus module</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="parent-enrollment" className="flex flex-col space-y-1">
                  <span>Parent Enrollment</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow parents to enroll their children for bus service
                  </span>
                </Label>
                <Switch 
                  id="parent-enrollment" 
                  checked={settings.parentEnrollment} 
                  onCheckedChange={(value) => handleSettingChange("parentEnrollment", value)} 
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="current-term">Current Academic Term</Label>
                <Select 
                  value={settings.currentTerm} 
                  onValueChange={(value) => handleSettingChange("currentTerm", value)}
                >
                  <SelectTrigger id="current-term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Term 2023/2024</SelectItem>
                    <SelectItem value="second">Second Term 2023/2024</SelectItem>
                    <SelectItem value="third">Third Term 2023/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Changing the current term will affect all enrollment data and reports.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Settings</CardTitle>
              <CardDescription>Configure enrollment and unenrollment deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="enrollment-deadline">Enrollment Deadline (days after resumption)</Label>
                <Input
                  id="enrollment-deadline"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.enrollmentDeadline}
                  onChange={(e) => handleSettingChange("enrollmentDeadline", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Parents will not be able to enroll after this period</p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="unenrollment-deadline">Unenrollment Deadline (days after resumption)</Label>
                <Input
                  id="unenrollment-deadline"
                  type="number"
                  min="1"
                  max="30"
                  value={settings.unenrollmentDeadline}
                  onChange={(e) => handleSettingChange("unenrollmentDeadline", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will not be able to unenroll their children after this period
                </p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="seat-timeout">Seat Reservation Timeout (hours)</Label>
                <Input
                  id="seat-timeout"
                  type="number"
                  min="1"
                  max="72"
                  value={settings.seatTimeout}
                  onChange={(e) => handleSettingChange("seatTimeout", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Reserved seats will be released if payment is not received within this time
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Tracking Settings</CardTitle>
              <CardDescription>Configure bus tracking and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-tracking" className="flex flex-col space-y-1">
                  <span>Enable Bus Tracking</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow parents to track the bus location in real-time
                  </span>
                </Label>
                <Switch 
                  id="enable-tracking" 
                  checked={settings.enableTracking} 
                  onCheckedChange={(value) => handleSettingChange("enableTracking", value)} 
                />
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="first-alert">First Alert (minutes before arrival)</Label>
                <Input
                  id="first-alert"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.firstAlertMinutes}
                  onChange={(e) => handleSettingChange("firstAlertMinutes", e.target.value)}
                  disabled={!settings.enableTracking}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will receive their first notification when the bus is this many minutes away
                </p>
              </div>

              <div className="grid gap-4">
                <Label htmlFor="second-alert">Second Alert (minutes before arrival)</Label>
                <Input
                  id="second-alert"
                  type="number"
                  min="1"
                  max="30"
                  value={settings.secondAlertMinutes}
                  onChange={(e) => handleSettingChange("secondAlertMinutes", e.target.value)}
                  disabled={!settings.enableTracking}
                />
                <p className="text-sm text-muted-foreground">
                  Parents will receive their second notification when the bus is this many minutes away
                </p>
              </div>

              <Separator />

              <div className="grid gap-4">
                <Label htmlFor="late-pickup">Late Pickup Threshold (minutes)</Label>
                <Input
                  id="late-pickup"
                  type="number"
                  min="1"
                  max="30"
                  value={settings.latePickupMinutes}
                  onChange={(e) => handleSettingChange("latePickupMinutes", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Bus will leave if a student doesn't show up within this many minutes of the scheduled pickup time
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Policy</CardTitle>
              <CardDescription>
                Configure the school bus policy that parents must agree to during enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Label htmlFor="bus-policy">Policy Content (Markdown supported)</Label>
                <Textarea
                  id="bus-policy"
                  rows={15}
                  value={settings.busPolicy}
                  onChange={(e) => handleSettingChange("busPolicy", e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  This policy will be displayed to parents during the enrollment process
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}