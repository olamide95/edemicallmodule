
"use client"

import { useState, useContext, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { toast } from "@/components/ui/use-toast"

interface BranchAdmin {
  name: string
  email: string
  password: string
}

interface Branch {
  id?: string
  name: string
  address: string
  admin: BranchAdmin
  startTimeFrom: string
  startTimeTill: string
  endTimeFrom: string
  endTimeTill: string
  recess1StartTime: string
  recess1EndTime: string
  recess2StartTime: string
  recess2EndTime: string
}

export function BranchesForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [branches, setBranches] = useState<any[]>(schoolData.branches || [])
    const [isLoading, setIsLoading] = useState(false)
      const [isDeleting, setIsDeleting] = useState<string | null>(null)



  useEffect(() => {
    setBranches(schoolData.branches || [])
  }, [schoolData.branches])

  const handleChange = (index: number, field: string, value: any) => {
    const updatedBranches = [...branches]
    updatedBranches[index] = { ...updatedBranches[index], [field]: value }
    setBranches(updatedBranches)
    updateSchoolData({ branches: updatedBranches })
  }

  const handleAdminChange = (index: number, field: string, value: string) => {
    const updatedBranches = [...branches]
    updatedBranches[index].admin = { 
      ...updatedBranches[index].admin, 
      [field]: value 
    }
    setBranches(updatedBranches)
    updateSchoolData({ branches: updatedBranches })
  }

  const addBranch = () => {
    const newBranches = [
      ...branches,
      {
        name: "",
        address: "",
        admin: {
          name: "",
          email: "",
          password: ""
        },
        startTimeFrom: "",
        startTimeTill: "",
        endTimeFrom: "",
        endTimeTill: "",
        recess1StartTime: "",
        recess1EndTime: "",
        recess2StartTime: "",
        recess2EndTime: "",
      },
    ]
    setBranches(newBranches)
    updateSchoolData({ branches: newBranches })
  }

  const removeBranch = (index: number) => {
    const updatedBranches = [...branches]
    updatedBranches.splice(index, 1)
    setBranches(updatedBranches)
    updateSchoolData({ branches: updatedBranches })
  }
  return (
    <div className="space-y-6">
      {branches.map((branch, index) => (
        <div key={index} className="p-6 bg-light-card dark:bg-dark-card rounded-md border border-divider">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              {index === 0 ? "Head Office" : `Branch ${index}`}
            </h3>
            {index !== 0 && (
              <button
                className="bg-error text-white p-2 rounded-md flex items-center text-sm"
                onClick={() => removeBranch(index)}
                disabled={isDeleting === branch.id}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {isDeleting === branch.id ? "Deleting..." : "Remove"}
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`branch-name-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Branch Name <span className="text-error">*</span>
                </label>
                <input
                  id={`branch-name-${index}`}
                  value={branch.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Enter branch name"
                  disabled={index === 0 || isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`branch-address-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Branch Address <span className="text-error">*</span>
                </label>
                <input
                  id={`branch-address-${index}`}
                  value={branch.address}
                  onChange={(e) => handleChange(index, "address", e.target.value)}
                  placeholder="Enter branch address"
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="border-t border-divider my-4"></div>

            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Branch Admin</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`admin-name-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Admin Name
                </label>
                <input
                  id={`admin-name-${index}`}
                  value={branch.admin.name}
                  onChange={(e) => handleAdminChange(index, "name", e.target.value)}
                  placeholder="Enter admin name"
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`admin-email-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Admin Email
                </label>
                <input
                  id={`admin-email-${index}`}
                  type="email"
                  value={branch.admin.email}
                  onChange={(e) => handleAdminChange(index, "email", e.target.value)}
                  placeholder="Enter admin email"
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`admin-password-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Admin Password
                </label>
                <input
                  id={`admin-password-${index}`}
                  type="password"
                  value={branch.admin.password}
                  onChange={(e) => handleAdminChange(index, "password", e.target.value)}
                  placeholder="Enter admin password"
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="border-t border-divider my-4"></div>

            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Branch Timings</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`start-time-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Start Time From
                </label>
                <input
                  id={`start-time-${index}`}
                  type="time"
                  value={branch.startTimeFrom}
                  onChange={(e) => handleChange(index, "startTimeFrom", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`start-time-till-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Start Time Till
                </label>
                <input
                  id={`start-time-till-${index}`}
                  type="time"
                  value={branch.startTimeTill}
                  onChange={(e) => handleChange(index, "startTimeTill", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`end-time-from-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  End Time From
                </label>
                <input
                  id={`end-time-from-${index}`}
                  type="time"
                  value={branch.endTimeFrom}
                  onChange={(e) => handleChange(index, "endTimeFrom", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`end-time-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  End Time Till
                </label>
                <input
                  id={`end-time-${index}`}
                  type="time"
                  value={branch.endTimeTill}
                  onChange={(e) => handleChange(index, "endTimeTill", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="border-t border-divider my-4"></div>

            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Recess Timings</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`recess1-start-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Recess 1 Start Time
                </label>
                <input  
  
                  id={`recess1-start-${index}`}
                  type="time"
                  value={branch.recess1StartTime}
                  onChange={(e) => handleChange(index, "recess1StartTime", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`recess1-end-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Recess 1 End Time
                </label>
                <input
                  id={`recess1-end-${index}`}
                  type="time"
                  value={branch.recess1EndTime
}
                  onChange={(e) => handleChange(index, "recess1EndTime", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`recess2-start-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Recess 2 Start Time
                </label>
                <input
                  id={`recess2-start-${index}`}
                  type="time"
                  value={branch.recess2StartTime}
                  onChange={(e) => handleChange(index, "recess2StartTime", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`recess2-end-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Recess 2 End Time
                </label>
                <input
                  id={`recess2-end-${index}`}
                  type="time"
                  value={branch.recess2EndTime}
                  onChange={(e) => handleChange(index, "recess2EndTime", e.target.value)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="w-full p-3 border border-divider rounded-md flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-secondary-bg"
        onClick={addBranch}
        disabled={isLoading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Branch
      </button>
    </div>
  )
}