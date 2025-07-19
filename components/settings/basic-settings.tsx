"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import QRCode from "react-qr-code"

export function BasicSettings() {
  const [customUrl, setCustomUrl] = useState("https://school.edu/admissions")
  const [documentPrefix, setDocumentPrefix] = useState("ADM")
  const [documentSuffix, setDocumentSuffix] = useState("2023")
  const [nextNumber, setNextNumber] = useState("001")
  const [referenceType, setReferenceType] = useState("prefix")
  const [admissionPeriods, setAdmissionPeriods] = useState([
    {
      id: 1,
      year: "2023-2024",
      startDate: new Date(2023, 8, 1), // September 1, 2023
      endDate: new Date(2024, 7, 31), // August 31, 2024
      deadline: new Date(2023, 6, 31), // July 31, 2023
      message: "Admission for this academic year is now closed. Please check back for the next academic year.",
    },
    {
      id: 2,
      year: "2024-2025",
      startDate: new Date(2024, 8, 1), // September 1, 2024
      endDate: new Date(2025, 7, 31), // August 31, 2025
      deadline: new Date(2024, 6, 31), // July 31, 2024
      message: "Admission for this academic year is now closed. Please check back for the next academic year.",
    },
  ])
  const [selectedPeriod, setSelectedPeriod] = useState(admissionPeriods[0])
  const [deadlineDate, setDeadlineDate] = useState(admissionPeriods[0].deadline)
  const [deadlineMessage, setDeadlineMessage] = useState(admissionPeriods[0].message)
  const [selectedTemplate, setSelectedTemplate] = useState("template1")

  const handlePeriodChange = (year: string) => {
    const period = admissionPeriods.find((p) => p.year === year)
    if (period) {
      setSelectedPeriod(period)
      setDeadlineDate(period.deadline)
      setDeadlineMessage(period.message)
    }
  }

  const handleSaveDeadline = () => {
    const updatedPeriods = admissionPeriods.map((p) =>
      p.id === selectedPeriod.id ? { ...p, deadline: deadlineDate, message: deadlineMessage } : p,
    )
    setAdmissionPeriods(updatedPeriods)
    // In a real app, you would save this to your backend
  }

  return (
    <div className="space-y-6">
      {/* Custom URL and Barcode */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Link</CardTitle>
          <CardDescription>Set your custom URL for the admission form and generate a QR code.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="custom-url">Custom URL</Label>
              <Input
                id="custom-url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://school.edu/admissions"
              />
              <p className="text-sm text-muted-foreground">This URL will be used for your admission form.</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="bg-white p-2 rounded-md">
                <QRCode value={customUrl} size={150} />
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Document Reference</CardTitle>
          <CardDescription>Configure the format for admission document references.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={referenceType} onValueChange={setReferenceType} className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="prefix" id="prefix" className="peer sr-only" />
              <Label
                htmlFor="prefix"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2">Prefix Format</span>
                <span className="text-sm text-muted-foreground">Example: ADM-001-2023</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="suffix" id="suffix" className="peer sr-only" />
              <Label
                htmlFor="suffix"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2">Suffix Format</span>
                <span className="text-sm text-muted-foreground">Example: 001-2023-ADM</span>
              </Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix</Label>
              <Input
                id="prefix"
                value={documentPrefix}
                onChange={(e) => setDocumentPrefix(e.target.value)}
                placeholder="ADM"
                disabled={referenceType !== "prefix"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next-number">Next Number</Label>
              <Input
                id="next-number"
                value={nextNumber}
                onChange={(e) => setNextNumber(e.target.value)}
                placeholder="001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix</Label>
              <Input
                id="suffix"
                value={documentSuffix}
                onChange={(e) => setDocumentSuffix(e.target.value)}
                placeholder="2023"
                disabled={referenceType !== "suffix"}
              />
            </div>
          </div>

          <div className="rounded-md bg-muted p-4">
            <p className="font-medium">Preview:</p>
            <p className="mt-2 text-lg font-bold">
              {referenceType === "prefix"
                ? `${documentPrefix}-${nextNumber}-${documentSuffix}`
                : `${nextNumber}-${documentSuffix}-${documentPrefix}`}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Reference Settings</Button>
        </CardFooter>
      </Card>

      {/* Admission Period */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Period</CardTitle>
          <CardDescription>Set the admission periods and deadlines for each academic year.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="academic-year">Academic Year</Label>
            <Select value={selectedPeriod.year} onValueChange={handlePeriodChange}>
              <SelectTrigger id="academic-year">
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                {admissionPeriods.map((period) => (
                  <SelectItem key={period.id} value={period.year}>
                    {period.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Period Range</Label>
            <div className="rounded-md bg-muted p-3 text-sm">
              {format(selectedPeriod.startDate, "MMMM d, yyyy")} to {format(selectedPeriod.endDate, "MMMM d, yyyy")}
            </div>
            <p className="text-sm text-muted-foreground">This is the full academic year period.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Admission Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !deadlineDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadlineDate ? format(deadlineDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadlineDate}
                  onSelect={(date) => date && setDeadlineDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">
              Applications received after this date will see the missed deadline message.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline-message">Message for Missed Deadline</Label>
            <Textarea
              id="deadline-message"
              value={deadlineMessage}
              onChange={(e) => setDeadlineMessage(e.target.value)}
              placeholder="Enter message to display when deadline is missed"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveDeadline}>Save Period Settings</Button>
        </CardFooter>
      </Card>

      {/* Document Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Document Settings</CardTitle>
          <CardDescription>Configure templates and assets for admission documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="template">Admission Letter Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="template1">Standard Admission Letter</SelectItem>
                <SelectItem value="template2">Conditional Admission Letter</SelectItem>
                <SelectItem value="template3">Scholarship Admission Letter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Admission Manager Signature</Label>
              <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-muted bg-muted/50">
                <div className="flex flex-col items-center justify-center space-y-2 text-xs">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center font-medium">
                    <Button variant="ghost" size="sm">
                      Upload Signature
                    </Button>
                  </div>
                  <p className="text-muted-foreground">SVG, PNG or JPG (max. 800x400px)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>School Logo</Label>
              <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-muted bg-muted/50">
                <div className="flex flex-col items-center justify-center space-y-2 text-xs">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center font-medium">
                    <Button variant="ghost" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                  <p className="text-muted-foreground">SVG, PNG or JPG (max. 800x400px)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>School Seal</Label>
              <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-muted bg-muted/50">
                <div className="flex flex-col items-center justify-center space-y-2 text-xs">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center font-medium">
                    <Button variant="ghost" size="sm">
                      Upload Seal
                    </Button>
                  </div>
                  <p className="text-muted-foreground">SVG, PNG or JPG (max. 800x400px)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Document Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
