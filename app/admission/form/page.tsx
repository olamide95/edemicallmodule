"use client";

import { useState, useEffect } from 'react';
import { FormBuilder, ThemeProvider } from "edemicformbuilder";
import defaultFormConfig from "./student-registration.json";
import { Sidebar } from "@/components/sidebar"; 
import { Header } from "@/components/header";
import Image from "next/image"; 
import { ChevronRight } from "lucide-react";
import type { DocTypeState } from 'edemicformbuilder' 
import './globals.css';

// Key for localStorage
const FORM_CONFIG_KEY = 'schoolAdmissionFormConfig';

export default function AdmissionFormPage() {
  const [formData, setFormData] = useState<DocTypeState>(defaultFormConfig);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load saved form config from localStorage on initial render
 // Update the AdmissionFormPage component's useEffect to load classes from local storage
useEffect(() => {
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
}, []);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSave = async (updatedData: DocTypeState) => {
    try {
      setIsSaving(true);
      // Save to localStorage
      localStorage.setItem(FORM_CONFIG_KEY, JSON.stringify(updatedData));
      setFormData(updatedData);
      console.log("Form saved to localStorage:", updatedData);
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
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

  // Don't render FormBuilder until we've loaded from localStorage
  if (!hasLoaded) {
    return <div>Loading form configuration...</div>;
  }

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
                    <button 
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2 rounded-md transition-colors"
                      onClick={handleResetToDefault}
                    >
                      Reset to Default
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
            <div className="bg-card rounded-lg overflow-hidden shadow-sm w-full">
              <div className="w-full min-w-0">
                <FormBuilder 
                  initialData={formData}
                  previewMode={isPreview}
                  onSave={handleSave}
                  showQuickAdd={true}
                  onPreviewModeChange={handlePreviewChange}
                  className="w-full"
                />
              </div>
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