"use client";

import { useState, useEffect } from 'react';
import { FormBuilder, ThemeProvider } from "edemicformbuilder";
import { Sidebar } from "@/components/sidebar"; 
import { Header } from "@/components/header";
import Image from "next/image"; 
import { ChevronRight, Download, Plus, MoreVertical, Mail, Printer, Link, Pencil } from "lucide-react";
import { StandaloneFormPreview } from 'edemicformbuilder'
import { DocTypeProvider } from 'edemicformbuilder'
import defaultFormConfig from "../form/student-registration.json";
import type { DocTypeState } from 'edemicformbuilder' 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Key for localStorage
const FORM_CONFIG_KEY = 'schoolAdmissionFormConfig'
const FORM_RESPONSES_KEY = 'admissionFormResponses'

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

export default function adminsetuppage() {
    const router = useRouter()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [activeDocument, setActiveDocument] = useState<string | null>(null)
  const [formResponses, setFormResponses] = useState<any[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)
  const [formData, setFormData] = useState(defaultFormConfig)

  // Load saved form config and responses from localStorage on initial render
  useEffect(() => {
    // Load form configuration
    const savedConfig = localStorage.getItem(FORM_CONFIG_KEY)
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setFormData(parsedConfig)
      } catch (error) {
        console.error("Error parsing saved form config:", error)
        localStorage.removeItem(FORM_CONFIG_KEY)
      }
    }
    
    const loadFormConfig = () => {
      // Load saved form config from localStorage
      const savedConfig = localStorage.getItem(FORM_CONFIG_KEY);
      const savedData = localStorage.getItem('onboardingData');
      
      let configToUse = defaultFormConfig;
      
      if (savedConfig) {
        try {
          configToUse = JSON.parse(savedConfig);
        } catch (error) {
          console.error("Error parsing saved form config:", error);
          localStorage.removeItem(FORM_CONFIG_KEY);
        }
      }
      
      // If we have classes data in onboardingData, update the form config
      if (savedData) {
        try {
          const onboardingData = JSON.parse(savedData);
          if (onboardingData.classes && onboardingData.classes.length > 0) {
            // Find the class field in the form config
            const updatedConfig = JSON.parse(JSON.stringify(configToUse)); // Deep clone
            
            // Find the class field in the form config (you'll need to adjust this path based on your actual structure)
            const classField = updatedConfig.tabs
              .find((tab: any) => tab.title === "Bio Data")?.sections
              .find((section: any) => section.title === "Bio Data")?.columns
              .flatMap((column: any) => column.fields)
              .find((field: any) => field.name === "class");
              
            if (classField) {
              // Update the options with the classes from local storage
              classField.options = onboardingData.classes.map((cls: any) => cls.name);
            }
            
            configToUse = updatedConfig;
          }
        } catch (error) {
          console.error("Error parsing onboarding data:", error);
        }
      }
      
      setFormData(configToUse);
      setHasLoaded(true);
    };
    
    loadFormConfig();

    // Load form responses
    const savedResponses = localStorage.getItem(FORM_RESPONSES_KEY)
    if (savedResponses) {
      try {
        setFormResponses(JSON.parse(savedResponses))
      } catch (error) {
        console.error("Error parsing saved form responses:", error)
        localStorage.removeItem(FORM_RESPONSES_KEY)
      }
    }

    setHasLoaded(true)
  }, [])

  // Handle form submission
  const handleFormSubmit = (formValues: any) => {
    const newResponse = {
      id: `ADM${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString(),
      ...formValues,
      status: "Form Submitted",
      admissionState: "Form Submitted"
    }
    
    const updatedResponses = [...formResponses, newResponse]
    setFormResponses(updatedResponses)
    localStorage.setItem(FORM_RESPONSES_KEY, JSON.stringify(updatedResponses))
    
    // Switch back to dashboard
    setActiveTab("dashboard")
  }

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

  // Mock data for children (will be replaced with formResponses in a real implementation)
  const children: Child[] = [
    {
      id: "1",
      name: "Sarah Elizabet Johnson",
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
    ...formResponses.map(response => ({
      id: response.id,
      name: `${response.firstName} ${response.lastName}`,
      class: response.class || "Not specified",
      status: response.status.toLowerCase().replace(" ", "-") as any,
      applicationDate: response.submittedAt,
      documents: {
        admissionLetter: true,
        assessmentReport: true,
        parentGuidelines: true,
      }
    }))
  ]

  if (!hasLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading application...</p>
        </div>
      </div>
    )
  }
  
  const handleNewEnrollment = () => { 
    router.push("/admission/form")
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset to the default form? This cannot be undone.")) {
      localStorage.removeItem(FORM_CONFIG_KEY);
      setFormData(defaultFormConfig);
    }
  };

  const handlePreviewChange = (isPreview: boolean) => {
    setIsPreview(isPreview);
  };

  // Handle menu actions
  const handleCustomize = () => {
    router.push("/admission/form");
  };

  const handleEmail = () => {
    alert("Email functionality would be implemented here");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLinks = () => {
    alert("Link sharing functionality would be implemented here");
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="form-builder-theme">
      <div className="flex h-screen bg-background">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} />

          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Page Header */}
            <div className="bg-card rounded-lg overflow-hidden shadow-sm mb-6">
              <div className="p-6 relative">
                <div className="max-w-[60%]">
                  <h1 className="text-2xl font-bold mb-1">Form Builder</h1>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="text-muted-foreground">Tools</span>
                    <span className="text-muted-foreground">
                      <ChevronRight size={16} className="inline" />
                    </span>
                    <span className="text-primary italic">Form Builder Form</span>
                  </div>

                  <p className="text-muted-foreground mb-6 italic">
                    Configure your form settings. Changes are automatically saved to your browser's storage.
                  </p>

                  <div className="flex gap-4">
                    <button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"
                      onClick={() => alert("Learn more about form building")}
                    >
                      Click To Learn More
                    </button>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-full hidden md:flex items-center">
                  <Image
                    src="/education-illustration-new.png"
                    alt="Education Illustration"
                    width={400}
                    height={200}
                    className="max-h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-2xl p-8 shadow-sm border border-divider">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>
                    New Admission Form
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      Not saved
                    </span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleCustomize}>
                         <Pencil className="mr-2 h-4 w-4" />
                          Customize
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEmail}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handlePrint}>
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLinks}>
                          <Link className="mr-2 h-4 w-4" />
                          Links
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"

                    variant="outline" size="sm" onClick={handleNewEnrollment}>
                      Save
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <DocTypeProvider>
                      <StandaloneFormPreview 
                        formData={formData} 
                        onSubmit={handleFormSubmit}
                        submitButtonText="Submit Application"
                      />
                    </DocTypeProvider>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          <footer className="border-t border-border py-3 px-6 text-sm text-muted-foreground flex flex-wrap justify-between items-center gap-2 bg-card">
            <div>© 2024, Made with ❤️ by ThemeSelection</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">
                License
              </a>
              <a href="#" className="hover:text-primary">
                More Themes
              </a>
              <a href="#" className="hover:text-primary">
                Documentation
              </a>
              <a href="#" className="hover:text-primary">
                Support
              </a>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}