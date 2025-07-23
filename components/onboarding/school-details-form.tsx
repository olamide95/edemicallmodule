"use client"

import type React from "react"
import { useState, useContext, useRef, useEffect } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function SchoolDetailsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [localSchoolDetails, setLocalSchoolDetails] = useState({
    name: schoolData.name || "",
    address: schoolData.address || "",
    email: schoolData.email || "",
    phone: schoolData.phone || "",
    academicYear: schoolData.academicYear || "",
    country: schoolData.country || "",
    logo: schoolData.logo || null,
  })
  const [previewLogo, setPreviewLogo] = useState<string | null>(schoolData.logo || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load initial data from backend
  useEffect(() => {
   // In SchoolDetailsForm.tsx
// In SchoolDetailsForm.tsx
const fetchSchoolDetails = async () => {
  try {
    console.log('Fetching school details for current tenant...');
    
    const response = await api.get('/school-setup/school');
    console.log('API Response:', response); // Log full response
    
    if (response.success && response.data) {
      console.log('Found school data for tenant:', response.data.tenantId);
      
      setLocalSchoolDetails({
        name: response.data.name || "",
        address: response.data.address || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        academicYear: response.data.academicYear || "",
        country: response.data.country || "",
        logo: response.data.logo || null,
      });
      
      if (response.data.logo) {
        setPreviewLogo(response.data.logo);
      }
      updateSchoolData(response.data);
    } else {
      console.log('No school data found for tenant');
      // Initialize with empty data
      setLocalSchoolDetails({
        name: "",
        address: "",
        email: "",
        phone: "",
        academicYear: "",
        country: "",
        logo: null,
      });
    }
  } catch (error) {
    console.error('Error fetching school details:', error);
    toast({
      title: "Error",
      description: "Failed to fetch school details",
      variant: "destructive",
    });
  }
};

const handleBlur = async () => {
  updateSchoolData(localSchoolDetails);
  
  try {
    setIsLoading(true);
    const response = await api.post('/school-setup/school', localSchoolDetails);
    if (response.success) {
      toast({
        title: "Success",
        description: "School details updated successfully",
      });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update school details",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

    fetchSchoolDetails()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLocalSchoolDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Update context and backend when user leaves a field
  const handleBlur = async () => {
  updateSchoolData(localSchoolDetails);
  
  try {
    setIsLoading(true);
    const response = await api.post('/school-setup/school', localSchoolDetails);
    if (response.success) {
      toast({
        title: "Success",
        description: "School details updated successfully",
      });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update school details",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const logoUrl = event.target?.result as string
      setPreviewLogo(logoUrl)
      const updatedDetails = { ...localSchoolDetails, logo: logoUrl }
      setLocalSchoolDetails(updatedDetails)
      
      try {
        setIsLoading(true)
        const response = await api.put('/school-setup/school', updatedDetails)
        if (response.success) {
          updateSchoolData(updatedDetails)
          toast({
            title: "Success",
            description: "School logo updated successfully",
          })
        } else {
          throw new Error(response.error)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update logo",
          variant: "destructive",
        })
        setPreviewLogo(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } finally {
        setIsLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Remove logo
  const removeLogo = async () => {
    setPreviewLogo(null)
    const updatedDetails = { ...localSchoolDetails, logo: null }
    setLocalSchoolDetails(updatedDetails)
    
    try {
      setIsLoading(true)
      const response = await api.put('/school-setup/school', updatedDetails)
      if (response.success) {
        updateSchoolData(updatedDetails)
        toast({
          title: "Success",
          description: "School logo removed successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove logo",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
      <div className="space-y-6">
        {/* Logo upload section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            School Logo
          </label>
          <div className="flex items-start space-x-4">
            <div className="w-32 h-32 border-2 border-dashed border-divider rounded-md flex flex-col items-center justify-center relative">
              {previewLogo ? (
                <div className="relative w-full h-full">
                  <Image
                    src={previewLogo || "/placeholder.svg"}
                    alt="School Logo"
                    fill
                    className="object-contain p-2"
                  />
                  <button
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1"
                    title="Remove logo"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-light-text-secondary dark:text-dark-text-secondary mb-2" />
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
                    Click to upload logo
                  </span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                accept="image/*" 
                className="hidden" 
                disabled={isLoading}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                Upload your school logo. The logo will be displayed on reports, the dashboard, and other school
                documents.
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Recommended size: 200x200 pixels. Max file size: 2MB.
                <br />
                Supported formats: JPG, PNG, SVG
              </p>
              {!previewLogo && (
                <button
                  onClick={triggerFileInput}
                  className="mt-2 px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                  disabled={isLoading}
                >
                  Upload Logo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                School Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={localSchoolDetails.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter school name"
                required
                className="form-input w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={localSchoolDetails.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="school@example.com"
                className="form-input w-full"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              School Address <span className="text-error">*</span>
            </label>
            <input
              id="address"
              name="address"
              value={localSchoolDetails.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter school address"
              required
              className="form-input w-full"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Contact Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={localSchoolDetails.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
                className="form-input w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="academicYear"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Academic Year
              </label>
              <select
                id="academicYear"
                name="academicYear"
                value={localSchoolDetails.academicYear}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input w-full"
                disabled={isLoading}
              >
                <option value="">Select academic year</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={localSchoolDetails.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input w-full"
              disabled={isLoading}
            >
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="in">India</option>
              <option value="ng">Nigeria</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}





