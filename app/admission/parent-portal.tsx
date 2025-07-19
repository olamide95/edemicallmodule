"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdmissionLetter } from "./admission-letter"
import { AssessmentReport } from "./assessment-report"
import  { StandaloneFormPreview } from 'edemicformbuilder'; 
import  { DocTypeProvider } from 'edemicformbuilder'; 


import formConfig from "./form/student-registration.json";
import {
  User,
  FileText,
  Bell,
  Plus,
  Eye,
  Download,
  Calendar,
  CreditCard,
  Award,
  BarChart3,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Shield,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

interface Child {
  id: string
  name: string
  class: string
  status: "submitted" | "under-review" | "assessment-scheduled" | "admitted" | "payment-pending"
  applicationDate: string
  documents: {
    admissionLetter?: boolean
    assessmentReport?: boolean
    parentGuidelines?: boolean
  }
  nextAction?: string
  paymentDue?: string
}

const ParentPortal = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [activeDocument, setActiveDocument] = useState<string | null>(null)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mock data for children
  const children: Child[] = [
    {
      id: "1",
      name: "Sarah Elizabeth Johnson",
      class: "Grade 5 - Advanced Track",
      status: "admitted",
      applicationDate: "2024-01-15",
      documents: {
        admissionLetter: true,
        assessmentReport: true,
        parentGuidelines: true,
      },
      paymentDue: "2024-08-15",
    },
    {
      id: "2",
      name: "Michael James Johnson",
      class: "Grade 3",
      status: "assessment-scheduled",
      applicationDate: "2024-01-20",
      documents: {
        assessmentReport: false,
        admissionLetter: false,
        parentGuidelines: false,
      },
      nextAction: "Assessment scheduled for Feb 15, 2024 at 10:00 AM",
    },
  ]

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
      case "payment-pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
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
      case "payment-pending":
        return <CreditCard className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }
  const handleFormSubmit = (formValues: Record<string, any>) => {
    console.log("Form submitted:", formValues);
    fetch('/api/submit-child-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues)
    }).then(response => {
      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Error submitting application");
      }
    });
  };

  const handleDocumentClick = (childId: string, documentType: string) => {
    setSelectedChild(childId)
    setActiveDocument(documentType)
  }

  const closeDocument = () => {
    setActiveDocument(null)
    setSelectedChild(null)
  }

  const getSelectedChild = () => {
    return children.find((child) => child.id === selectedChild)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Parent Portal Header with Illustration */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Parent Portal</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Dashboard</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Admission Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Manage your children's admission applications, documents, and school enrollment
                </p>

                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                  View Help Guide
                </button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/parent-portal-illustration.png"
                  alt="Parent Portal Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="add-child" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Child
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid gap-6">
                  <h2 className="text-2xl font-semibold">Children Overview</h2>
                  {children.map((child) => (
                    <Card key={child.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{child.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">Applied for {child.class}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(child.status)}>
                            {getStatusIcon(child.status)}
                            <span className="ml-1 capitalize">{child.status.replace("-", " ")}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Application Date</p>
                            <p className="font-semibold">{new Date(child.applicationDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-semibold capitalize">{child.status.replace("-", " ")}</p>
                          </div>
                          {child.paymentDue && (
                            <div>
                              <p className="text-sm text-muted-foreground">Payment Due</p>
                              <p className="font-semibold text-orange-600">
                                {new Date(child.paymentDue).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>

                        {child.nextAction && (
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                              <div>
                                <p className="font-medium text-blue-800 dark:text-blue-400">Action Required</p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">{child.nextAction}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {child.status === "admitted" && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay School Fees
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Documents
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <h2 className="text-2xl font-semibold">Documents</h2>

                {children.map((child) => (
                  <Card key={child.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {child.name}
                        <Badge variant="outline">{child.class}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Admission Letter */}
                        <Card
                          className={`cursor-pointer transition-all ${
                            child.documents.admissionLetter
                              ? "hover:shadow-md border-green-200 dark:border-green-800 hover:border-green-300"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (child.documents.admissionLetter) {
                              handleDocumentClick(child.id, "admission-letter")
                            }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  child.documents.admissionLetter
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : "bg-gray-100 dark:bg-gray-900/20"
                                }`}
                              >
                                <Award
                                  className={`h-5 w-5 ${
                                    child.documents.admissionLetter ? "text-green-600" : "text-gray-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">Admission Letter</h3>
                                <p className="text-sm text-muted-foreground">
                                  {child.documents.admissionLetter ? "Available - Click to view" : "Not available"}
                                </p>
                              </div>
                            </div>
                            {child.documents.admissionLetter && (
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
                            child.documents.assessmentReport
                              ? "hover:shadow-md border-blue-200 dark:border-blue-800 hover:border-blue-300"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (child.documents.assessmentReport) {
                              handleDocumentClick(child.id, "assessment-report")
                            }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  child.documents.assessmentReport
                                    ? "bg-blue-100 dark:bg-blue-900/20"
                                    : "bg-gray-100 dark:bg-gray-900/20"
                                }`}
                              >
                                <BarChart3
                                  className={`h-5 w-5 ${
                                    child.documents.assessmentReport ? "text-blue-600" : "text-gray-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">Assessment Report</h3>
                                <p className="text-sm text-muted-foreground">
                                  {child.documents.assessmentReport ? "Available - Click to view" : "Not available"}
                                </p>
                              </div>
                            </div>
                            {child.documents.assessmentReport && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                                <Shield className="h-3 w-3" />
                                <span>Digitally Signed</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Parent Guidelines */}
                        <Card
                          className={`cursor-pointer transition-all ${
                            child.documents.parentGuidelines
                              ? "hover:shadow-md border-purple-200 dark:border-purple-800 hover:border-purple-300"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (child.documents.parentGuidelines) {
                              alert("Parent Guidelines document would open here")
                            }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  child.documents.parentGuidelines
                                    ? "bg-purple-100 dark:bg-purple-900/20"
                                    : "bg-gray-100 dark:bg-gray-900/20"
                                }`}
                              >
                                <BookOpen
                                  className={`h-5 w-5 ${
                                    child.documents.parentGuidelines ? "text-purple-600" : "text-gray-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">Parent Guidelines</h3>
                                <p className="text-sm text-muted-foreground">
                                  {child.documents.parentGuidelines ? "Available - Click to view" : "Not available"}
                                </p>
                              </div>
                            </div>
                            {child.documents.parentGuidelines && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                                <Shield className="h-3 w-3" />
                                <span>Digitally Signed</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No new notifications</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Add Child Tab */}
             {/* Add Child Tab */}
<TabsContent value="add-child" className="space-y-6">
        <h2 className="text-2xl font-semibold">Add New Child</h2>
        <Card>
          <CardHeader>
            <CardTitle>New Student Registration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            // Wrap your app with DocTypeProvider first
<DocTypeProvider>
<StandaloneFormPreview formData={formConfig} />
</DocTypeProvider>
          </CardContent>
        </Card>
      </TabsContent>

            </Tabs>

            {/* Document Viewer Modal */}
            {activeDocument && selectedChild && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-background rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">
                      {activeDocument === "admission-letter" ? "Admission Letter" : "Assessment Report"} -{" "}
                      {getSelectedChild()?.name}
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
                          studentName={getSelectedChild()?.name}
                          className={getSelectedChild()?.class}
                          studentId={selectedChild}
                          showSignature={true}
                        />
                      )}
                      {activeDocument === "assessment-report" && (
                        <AssessmentReport
                          studentName={getSelectedChild()?.name}
                          recommendedClass={getSelectedChild()?.class}
                          studentId={selectedChild}
                          showSignature={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2 bg-light-card-bg dark:bg-dark-card-bg">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Help Center</a>
            <a href="#" className="hover:text-primary">Contact Support</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ParentPortal