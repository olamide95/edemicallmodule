"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdmissionLetter } from "../admission-letter"
import { AssessmentReport } from "../assessment-report"
import {
  Search,
  FileText,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Award,
  BarChart3,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Eye,
  Calendar,
  User,
} from "lucide-react"

interface ApplicationStatus {
  accessCode: string
  studentName: string
  className: string
  status: "submitted" | "under-review" | "assessment-scheduled" | "admitted" | "rejected"
  applicationDate: string
  documents: {
    admissionLetter?: boolean
    assessmentReport?: boolean
  }
  nextAction?: string
  assessmentDate?: string
}

const GuestPortal = () => {
  const [accessCode, setAccessCode] = useState("")
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeDocument, setActiveDocument] = useState<string | null>(null)

  // Mock application data - in real app this would come from API
  const mockApplications: ApplicationStatus[] = [
    {
      accessCode: "GUEST2024",
      studentName: "Emma Wilson",
      className: "Grade 4",
      status: "admitted",
      applicationDate: "2024-01-10",
      documents: {
        admissionLetter: true,
        assessmentReport: true,
      },
    },
    {
      accessCode: "TRACK123",
      studentName: "James Anderson",
      className: "Grade 6",
      status: "assessment-scheduled",
      applicationDate: "2024-01-18",
      documents: {
        admissionLetter: false,
        assessmentReport: false,
      },
      nextAction: "Assessment scheduled for February 20, 2024 at 2:00 PM",
      assessmentDate: "2024-02-20",
    },
    {
      accessCode: "ACCESS456",
      studentName: "Sophia Martinez",
      className: "Grade 2",
      status: "under-review",
      applicationDate: "2024-01-22",
      documents: {
        admissionLetter: false,
        assessmentReport: false,
      },
      nextAction: "Application is currently under review. You will be notified within 5-7 business days.",
    },
  ]

  const handleTrackApplication = () => {
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      const foundApplication = mockApplications.find((app) => app.accessCode.toLowerCase() === accessCode.toLowerCase())

      if (foundApplication) {
        setApplicationStatus(foundApplication)
        setError("")
      } else {
        setError("Invalid access code. Please check your code and try again.")
        setApplicationStatus(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "under-review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "assessment-scheduled":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "admitted":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="h-4 w-4" />
      case "under-review":
        return <Eye className="h-4 w-4" />
      case "assessment-scheduled":
        return <Calendar className="h-4 w-4" />
      case "admitted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleDocumentClick = (documentType: string) => {
    setActiveDocument(documentType)
  }

  const closeDocument = () => {
    setActiveDocument(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Guest Portal</h1>
        <p className="text-muted-foreground">Track your admission application status</p>
      </div>

      <Tabs defaultValue="track" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="track" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Track Application
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* Track Application Tab */}
        <TabsContent value="track" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Application</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your access code to view your application status and documents
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessCode">Access Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="accessCode"
                    placeholder="Enter your access code (e.g., GUEST2024)"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTrackApplication()}
                  />
                  <Button onClick={handleTrackApplication} disabled={isLoading || !accessCode.trim()}>
                    {isLoading ? "Searching..." : "Track"}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Demo Access Codes:</h4>
                <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    • <strong>GUEST2024</strong> - Admitted student with documents
                  </p>
                  <p>
                    • <strong>TRACK123</strong> - Assessment scheduled
                  </p>
                  <p>
                    • <strong>ACCESS456</strong> - Under review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Status Display */}
          {applicationStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Application Status - {applicationStatus.studentName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-semibold">{applicationStatus.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Applied for Class</p>
                      <p className="font-semibold">{applicationStatus.className}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Application Date</p>
                      <p className="font-semibold">
                        {new Date(applicationStatus.applicationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Status</p>
                      <Badge className={getStatusColor(applicationStatus.status)}>
                        {getStatusIcon(applicationStatus.status)}
                        <span className="ml-1 capitalize">{applicationStatus.status.replace("-", " ")}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Access Code</p>
                      <p className="font-mono font-semibold">{applicationStatus.accessCode}</p>
                    </div>
                  </div>
                </div>

                {applicationStatus.nextAction && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-400">Next Steps</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{applicationStatus.nextAction}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Section */}
                {applicationStatus.status === "admitted" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Documents</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Admission Letter */}
                      <Card
                        className={`cursor-pointer transition-all ${
                          applicationStatus.documents.admissionLetter
                            ? "hover:shadow-md border-green-200 dark:border-green-800 hover:border-green-300"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (applicationStatus.documents.admissionLetter) {
                            handleDocumentClick("admission-letter")
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                applicationStatus.documents.admissionLetter
                                  ? "bg-green-100 dark:bg-green-900/20"
                                  : "bg-gray-100 dark:bg-gray-900/20"
                              }`}
                            >
                              <Award
                                className={`h-5 w-5 ${
                                  applicationStatus.documents.admissionLetter ? "text-green-600" : "text-gray-400"
                                }`}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">Admission Letter</h4>
                              <p className="text-sm text-muted-foreground">
                                {applicationStatus.documents.admissionLetter
                                  ? "Available - Click to view"
                                  : "Not available"}
                              </p>
                            </div>
                          </div>
                          {applicationStatus.documents.admissionLetter && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                              <Shield className="h-3 w-3" />
                              <span>Digitally Signed</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Assessment Report */}
                      <Card
                        className={`cursor-pointer transition-all ${
                          applicationStatus.documents.assessmentReport
                            ? "hover:shadow-md border-blue-200 dark:border-blue-800 hover:border-blue-300"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (applicationStatus.documents.assessmentReport) {
                            handleDocumentClick("assessment-report")
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                applicationStatus.documents.assessmentReport
                                  ? "bg-blue-100 dark:bg-blue-900/20"
                                  : "bg-gray-100 dark:bg-gray-900/20"
                              }`}
                            >
                              <BarChart3
                                className={`h-5 w-5 ${
                                  applicationStatus.documents.assessmentReport ? "text-blue-600" : "text-gray-400"
                                }`}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">Assessment Report</h4>
                              <p className="text-sm text-muted-foreground">
                                {applicationStatus.documents.assessmentReport
                                  ? "Available - Click to view"
                                  : "Not available"}
                              </p>
                            </div>
                          </div>
                          {applicationStatus.documents.assessmentReport && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                              <Shield className="h-3 w-3" />
                              <span>Digitally Signed</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Pay Fees Button for Admitted Students */}
                    <div className="pt-4">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Pay School Fees
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">admissions@excellenceacademy.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-sm text-muted-foreground">123 Education Boulevard, Learning City, LC 12345</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Office Hours</h4>
                  <div className="text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">How do I get my access code?</h4>
                  <p className="text-sm text-muted-foreground">
                    Your access code is provided via email after you submit your application. Check your email
                    (including spam folder) for the confirmation message.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">How long does the admission process take?</h4>
                  <p className="text-sm text-muted-foreground">
                    The typical admission process takes 2-3 weeks from application submission to final decision,
                    including assessment and review periods.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">What documents will I receive if admitted?</h4>
                  <p className="text-sm text-muted-foreground">
                    Admitted students receive an official admission letter, detailed assessment report, and parent
                    guidelines document.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Can I schedule a school visit?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Contact our admissions office to schedule a campus tour and meet with our staff.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Viewer Modal */}
      {activeDocument && applicationStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {activeDocument === "admission-letter" ? "Admission Letter" : "Assessment Report"} -{" "}
                {applicationStatus.studentName}
              </h3>
              <Button variant="outline" size="sm" onClick={closeDocument}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                {/* Document Content */}
                {activeDocument === "admission-letter" && (
                  <AdmissionLetter
                    studentName={applicationStatus.studentName}
                    className={applicationStatus.className}
                    studentId={applicationStatus.accessCode}
                    showSignature={true}
                  />
                )}
                {activeDocument === "assessment-report" && (
                  <AssessmentReport
                    studentName={applicationStatus.studentName}
                    recommendedClass={applicationStatus.className}
                    studentId={applicationStatus.accessCode}
                    showSignature={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestPortal
