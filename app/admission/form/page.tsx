"use client";

import { useState } from 'react';
import { FormBuilder, ThemeProvider } from "edemicformbuilder"; // Match the package.json name
 import formConfig from "./student-registration.json";
import { Sidebar } from "@/components/sidebar"; 
import { Header } from "@/components/header";
import Image from "next/image"; 
import { ChevronRight } from "lucide-react";
import type { DocTypeState } from 'edemicformbuilder' 
import './globals.css';   

export default function AdmissionFormPage() {
  const [formData, setFormData] = useState<DocTypeState>(formConfig);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);  

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSave = async (updatedData: DocTypeState) => {
    try {
      setIsSaving(true);
      // Add any save logic here (API calls, etc.)
      setFormData(updatedData);
      console.log("Form saved:", updatedData);
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewChange = (isPreview: boolean) => {
    setIsPreview(isPreview);
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
                    Configure your form settings and unlock the full potential of our form builder module
                  </p>

                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors">
                    Click To Learn More
                  </button>
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
         
              {/* Main Content */}
<div className="bg-card rounded-lg overflow-hidden shadow-sm w-full">
  <div className="w-full min-w-0"> {/* Prevent flex overflow */}
    <FormBuilder 
      initialData={formData}
      previewMode={isPreview}
      onSave={handleSave}
      showQuickAdd={true}
      onPreviewModeChange={handlePreviewChange}
      className="w-full" // Explicit width control
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