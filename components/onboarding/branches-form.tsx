"use client"

import { useState, useContext, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Branch {
  id?: string
  name: string
  address: string
  admin: string
  startTime: string
  startTimeTill: string
  endTimeFrom: string
  endTime: string
  recess1Start: string
  recess1End: string
  recess2Start: string
  recess2End: string
}

export function BranchesForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Load branches from backend
  useEffect(() => {
  // In BranchesForm.tsx
// In BranchesForm.tsx
const fetchBranches = async () => {
  try {
    setIsLoading(true);
    // First get the school
    const schoolResponse = await api.get('/school-setup/school');
    if (schoolResponse.success && schoolResponse.data) {
      // Then get branches for that school
      const branchesResponse = await api.get(`/school-setup/school/${schoolResponse.data.id}/branches`);
      if (branchesResponse.success && branchesResponse.data) {
        setBranches(branchesResponse.data);
        updateSchoolData({ branches: branchesResponse.data });
      }
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch branches",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
    fetchBranches()
  }, [])

  const handleChange = (index: number, field: keyof Branch, value: string) => {
    const updatedBranches = [...branches]
    updatedBranches[index] = { ...updatedBranches[index], [field]: value }
    setBranches(updatedBranches)
  }

  const saveBranch = async (index: number) => {
    const branch = branches[index]
    try {
      setIsLoading(true)
      let response
      
      if (branch.id) {
        // Update existing branch
        response = await api.put(`/school-setup/branch/${branch.id}`, branch)
      } else {
        // Create new branch
        response = await api.post('/school-setup/branch', branch)
      }

      if (response.success) {
        const updatedBranches = [...branches]
        updatedBranches[index] = response.data
        setBranches(updatedBranches)
        updateSchoolData({ branches: updatedBranches })
        toast({
          title: "Success",
          description: branch.id ? "Branch updated successfully" : "Branch created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save branch",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addBranch = () => {
    setBranches([
      ...branches,
      {
        name: "",
        address: "",
        admin: "",
        startTime: "",
        startTimeTill: "",
        endTimeFrom: "",
        endTime: "",
        recess1Start: "",
        recess1End: "",
        recess2Start: "",
        recess2End: "",
      },
    ])
  }

  const removeBranch = async (index: number) => {
    const branch = branches[index]
    if (!branch.id) {
      // Branch not saved yet, just remove from local state
      const updatedBranches = [...branches]
      updatedBranches.splice(index, 1)
      setBranches(updatedBranches)
      updateSchoolData({ branches: updatedBranches })
      return
    }

    try {
      setIsDeleting(branch.id)
      const response = await api.delete(`/school-setup/branch/${branch.id}`)
      if (response.success) {
        const updatedBranches = [...branches]
        updatedBranches.splice(index, 1)
        setBranches(updatedBranches)
        updateSchoolData({ branches: updatedBranches })
        toast({
          title: "Success",
          description: "Branch deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete branch",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  // Update context when a field loses focus
  const handleBlur = (index: number) => {
    updateSchoolData({ branches })
    saveBranch(index)
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
                  Branch Name
                </label>
                <input
                  id={`branch-name-${index}`}
                  value={branch.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  onBlur={() => handleBlur(index)}
                  placeholder="Enter branch name"
                  disabled={index === 0 || isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`branch-admin-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Branch Admin
                </label>
                <input
                  id={`branch-admin-${index}`}
                  value={branch.admin}
                  onChange={(e) => handleChange(index, "admin", e.target.value)}
                  onBlur={() => handleBlur(index)}
                  placeholder="Enter branch admin name"
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`branch-address-${index}`}
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Branch Address
              </label>
              <input
                id={`branch-address-${index}`}
                value={branch.address}
                onChange={(e) => handleChange(index, "address", e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Enter branch address"
                disabled={isLoading}
                className="form-input w-full"
              />
            </div>

            <div className="border-t border-divider my-4"></div>

            <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Branch Timings</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor={`start-time-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  Start Time
                </label>
                <input
                  id={`start-time-${index}`}
                  type="time"
                  value={branch.startTime}
                  onChange={(e) => handleChange(index, "startTime", e.target.value)}
                  onBlur={() => handleBlur(index)}
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
                  onBlur={() => handleBlur(index)}
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
                  onBlur={() => handleBlur(index)}
                  disabled={isLoading}
                  className="form-input w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`end-time-${index}`}
                  className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                >
                  End Time
                </label>
                <input
                  id={`end-time-${index}`}
                  type="time"
                  value={branch.endTime}
                  onChange={(e) => handleChange(index, "endTime", e.target.value)}
                  onBlur={() => handleBlur(index)}
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
                  value={branch.recess1Start}
                  onChange={(e) => handleChange(index, "recess1Start", e.target.value)}
                  onBlur={() => handleBlur(index)}
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
                  value={branch.recess1End}
                  onChange={(e) => handleChange(index, "recess1End", e.target.value)}
                  onBlur={() => handleBlur(index)}
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
                  value={branch.recess2Start}
                  onChange={(e) => handleChange(index, "recess2Start", e.target.value)}
                  onBlur={() => handleBlur(index)}
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
                  value={branch.recess2End}
                  onChange={(e) => handleChange(index, "recess2End", e.target.value)}
                  onBlur={() => handleBlur(index)}
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