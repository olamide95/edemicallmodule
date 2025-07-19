"use client"

import React from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  Save,
  Eye,
  AlertCircle,
  CheckCircle2,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  CheckSquare,
  Square,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Custom MultiSelect component
const MultiSelectComponent = React.memo(({ options, selected, onChange, placeholder, disabled }) => {
  const handleSelect = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([])
    } else {
      onChange(options.map((option) => option.value))
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2">
        {selected.length > 0 ? (
          selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <Badge key={value} variant="secondary" className="mr-1 mb-1">
                {option?.label || value}
                <button
                  className="ml-1 hover:text-destructive"
                  onClick={() => onChange(selected.filter((item) => item !== value))}
                  disabled={disabled}
                >
                  ×
                </button>
              </Badge>
            )
          })
        ) : (
          <span className="text-muted-foreground text-sm">{placeholder}</span>
        )}
      </div>
      {!disabled && (
        <>
          <div className="border-t p-2 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs h-7 px-2">
              {selected.length === options.length ? (
                <>
                  <CheckSquare className="h-3 w-3 mr-1" /> Unselect All
                </>
              ) : (
                <>
                  <Square className="h-3 w-3 mr-1" /> Select All
                </>
              )}
            </Button>
          </div>
          <div className="border-t p-2 max-h-[200px] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-2 py-1 cursor-pointer hover:bg-muted rounded-sm ${
                  selected.includes(option.value) ? "bg-muted" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center gap-2">
                  <Checkbox checked={selected.includes(option.value)} />
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
})

// Using our custom MultiSelect component instead of the imported one
const MultiSelect = MultiSelectComponent

// Mock data
const feeTerms = [
  { id: "1", name: "2023-2024 Academic Year", terms: ["Term 1", "Term 2", "Term 3"] },
  { id: "2", name: "2024-2025 Academic Year", terms: ["Term 1", "Term 2", "Term 3"] },
]

const classes = [
  { label: "JSS 1", value: "jss1" },
  { label: "JSS 2", value: "jss2" },
  { label: "JSS 3", value: "jss3" },
  { label: "SS 1", value: "ss1" },
  { label: "SS 2", value: "ss2" },
  { label: "SS 3", value: "ss3" },
]

const feeHeads = [
  { label: "Tuition Fee", value: "tuition" },
  { label: "Development Levy", value: "development" },
  { label: "Library Fee", value: "library" },
  { label: "Technology Fee", value: "technology" },
  { label: "Sports Fee", value: "sports" },
  { label: "Transportation Fee", value: "transportation" },
  { label: "Admission Fee", value: "admission" },
  { label: "Accommodation", value: "accommodation" },
  { label: "Feeding", value: "feeding" },
  { label: "Utilities", value: "utilities" },
]

// Mock data for existing fee distributions
const existingDistributions = [
  {
    id: "1",
    name: "2023-2024 Regular Fees",
    academicYear: "2023-2024",
    term: "All Terms",
    classes: ["JSS 1", "JSS 2", "JSS 3"],
    feeHeads: ["Tuition Fee", "Development Levy", "Technology Fee"],
    status: "active",
    lastUpdated: "2023-08-15",
  },
  {
    id: "2",
    name: "2023-2024 New Student Fees",
    academicYear: "2023-2024",
    term: "Term 1",
    classes: ["JSS 1", "SS 1"],
    feeHeads: ["Tuition Fee", "Development Levy", "Admission Fee"],
    status: "active",
    lastUpdated: "2023-08-10",
  },
  {
    id: "3",
    name: "2022-2023 Regular Fees",
    academicYear: "2022-2023",
    term: "All Terms",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
    feeHeads: ["Tuition Fee", "Development Levy", "Library Fee"],
    status: "archived",
    lastUpdated: "2022-07-20",
  },
  {
    id: "4",
    name: "2023-2024 Boarding Fees",
    academicYear: "2023-2024",
    term: "All Terms",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
    feeHeads: ["Accommodation", "Feeding", "Utilities"],
    status: "draft",
    lastUpdated: "2023-09-01",
  },
]

// Types
interface AmountDistribution {
  termId: string
  termName: string
  amount: number
}

interface FeeDistributionItem {
  feeHeadId: string
  feeHeadName: string
  existingStudents: {
    enabled: boolean
    classFees: {
      [classId: string]: {
        amount: number
        distribution: AmountDistribution[]
        allocationMethod: "firstTerm" | "even" | "manual"
      }
    }
  }
  newStudents: {
    enabled: boolean
    classFees: {
      [classId: string]: {
        amount: number
        distribution: AmountDistribution[]
        allocationMethod: "firstTerm" | "even" | "manual"
      }
    }
  }
}

function FeeDistributionComponent() {
  // State
  const [showForm, setShowForm] = useState(false)
  const [distributionName, setDistributionName] = useState("")
  const [selectedFeeTerm, setSelectedFeeTerm] = useState<string>("")
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [selectedFeeHeads, setSelectedFeeHeads] = useState<string[]>([])
  const [distributionItems, setDistributionItems] = useState<FeeDistributionItem[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentEditItem, setCurrentEditItem] = useState<{
    feeHeadId: string
    classId: string
    studentType: "existing" | "new"
    amount: number
    distribution: AmountDistribution[]
    allocationMethod: "firstTerm" | "even" | "manual"
  } | null>(null)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [distributionStatus, setDistributionStatus] = useState<"draft" | "submitted" | "">("")
  const [isViewMode, setIsViewMode] = useState(false)
  const [showDistribution, setShowDistribution] = useState(false)
  const [useUnifiedView, setUseUnifiedView] = useState(true)
  const [distributions, setDistributions] = useState(existingDistributions)
  const [editingDistributionId, setEditingDistributionId] = useState<string | null>(null)

  // Ref for scrollable table container
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Memoize filtered distributions
  const filteredDistributions = useMemo(() => {
    return distributions
  }, [distributions])

  // Add useCallback for handlers
  const handleAddFeeHead = useCallback(
    () => {
      // Implementation
    },
    [
      /* dependencies */
    ],
  )

  const validateDistributions = useCallback(() => {
    const errors: { [key: string]: string } = {}

    distributionItems.forEach((item) => {
      // Check existing students
      if (item.existingStudents.enabled && item.existingStudents.classFees) {
        Object.entries(item.existingStudents.classFees).forEach(([classId, classFee]) => {
          const totalDistributed = classFee.distribution.reduce((sum, term) => sum + term.amount, 0)
          if (Math.abs(totalDistributed - classFee.amount) >= 0.01) {
            errors[`${item.feeHeadId}-${classId}-existing`] = "Distribution total doesn't match amount"
          }
        })
      }

      // Check new students
      if (item.newStudents.enabled && item.newStudents.classFees) {
        Object.entries(item.newStudents.classFees).forEach(([classId, classFee]) => {
          const totalDistributed = classFee.distribution.reduce((sum, term) => sum + term.amount, 0)
          if (Math.abs(totalDistributed - classFee.amount) >= 0.01) {
            errors[`${item.feeHeadId}-${classId}-new`] = "Distribution total doesn't match amount"
          }
        })
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [distributionItems, setValidationErrors])

  // Get terms for the selected fee term
  const getTerms = () => {
    const selectedTerm = feeTerms.find((term) => term.id === selectedFeeTerm)
    return selectedTerm ? selectedTerm.terms : []
  }

  // Initialize distribution items when selections change
  useEffect(() => {
    // Make sure all required selections are made and are arrays
    if (
      selectedFeeTerm &&
      Array.isArray(selectedClasses) &&
      selectedClasses.length > 0 &&
      Array.isArray(selectedFeeHeads) &&
      selectedFeeHeads.length > 0
    ) {
      console.log("Generating distribution items with:", {
        term: selectedFeeTerm,
        classes: selectedClasses,
        feeHeads: selectedFeeHeads,
      })

      const terms = getTerms()

      const newDistributionItems = selectedFeeHeads.map((feeHeadId) => {
        const feeHead = feeHeads.find((fh) => fh.value === feeHeadId)

        const classFees: { [classId: string]: any } = {}
        selectedClasses.forEach((classId) => {
          const distribution = terms.map((term, index) => ({
            termId: `term${index + 1}`,
            termName: term,
            amount: 0,
          }))

          classFees[classId] = {
            amount: 0,
            distribution,
            allocationMethod: "firstTerm",
          }
        })

        return {
          feeHeadId,
          feeHeadName: feeHead?.label || "",
          existingStudents: {
            enabled: true, // Default based on settings
            classFees: { ...classFees },
          },
          newStudents: {
            enabled: true, // Default based on settings
            classFees: { ...classFees },
          },
        }
      })

      setDistributionItems(newDistributionItems)
      setDistributionStatus("")
      setShowDistribution(true)
    } else {
      setShowDistribution(false)
    }
  }, [selectedFeeTerm, selectedClasses, selectedFeeHeads])

  // Optimize handleAmountChange with useCallback
  const handleAmountChange = useCallback(
    (feeHeadId: string, classId: string, studentType: "existing" | "new", value: string) => {
      const amount = Number.parseFloat(value) || 0

      setDistributionItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.feeHeadId === feeHeadId) {
            const studentTypeData = studentType === "existing" ? { ...item.existingStudents } : { ...item.newStudents }

            // Make sure classFees exists and has the classId
            if (!studentTypeData.classFees) {
              studentTypeData.classFees = {}
            }

            if (!studentTypeData.classFees[classId]) {
              const terms = getTerms()
              studentTypeData.classFees[classId] = {
                amount: 0,
                distribution: terms.map((term, index) => ({
                  termId: `term${index + 1}`,
                  termName: term,
                  amount: 0,
                })),
                allocationMethod: "firstTerm",
              }
            }

            const classFee = { ...studentTypeData.classFees[classId] }

            // Update amount
            classFee.amount = amount

            // Auto-update distribution based on allocation method
            if (classFee.allocationMethod === "firstTerm") {
              classFee.distribution = classFee.distribution.map((term, index) => ({
                ...term,
                amount: index === 0 ? amount : 0,
              }))
            } else if (classFee.allocationMethod === "even") {
              const termCount = classFee.distribution.length
              const evenAmount = termCount > 0 ? amount / termCount : 0
              classFee.distribution = classFee.distribution.map((term) => ({
                ...term,
                amount: evenAmount,
              }))
            }
            // For manual, we don't auto-update, but we'll validate later

            studentTypeData.classFees[classId] = classFee

            if (studentType === "existing") {
              return { ...item, existingStudents: studentTypeData }
            } else {
              return { ...item, newStudents: studentTypeData }
            }
          }
          return item
        })
      })

      // Clear validation error if exists
      if (validationErrors[`${feeHeadId}-${classId}-${studentType}`]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[`${feeHeadId}-${classId}-${studentType}`]
          return newErrors
        })
      }
    },
    [validationErrors, getTerms],
  )

  // Toggle student type
  const toggleStudentType = (feeHeadId: string, studentType: "existing" | "new", enabled: boolean) => {
    setDistributionItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.feeHeadId === feeHeadId) {
          if (studentType === "existing") {
            return { ...item, existingStudents: { ...item.existingStudents, enabled } }
          } else {
            return { ...item, newStudents: { ...item.newStudents, enabled } }
          }
        }
        return item
      })
    })
  }

  // Open edit dialog
  const openEditDialog = (feeHeadId: string, classId: string, studentType: "existing" | "new") => {
    const item = distributionItems.find((item) => item.feeHeadId === feeHeadId)
    if (!item) return

    const studentTypeData = studentType === "existing" ? item.existingStudents : item.newStudents

    // Make sure classFees exists and has the classId
    if (!studentTypeData.classFees || !studentTypeData.classFees[classId]) {
      console.error("Class fees not found for", feeHeadId, classId, studentType)
      return
    }

    const classFee = studentTypeData.classFees[classId]

    setCurrentEditItem({
      feeHeadId,
      classId,
      studentType,
      amount: classFee.amount,
      distribution: [...classFee.distribution],
      allocationMethod: classFee.allocationMethod,
    })

    setIsEditDialogOpen(true)
  }

  // Handle allocation method change
  const handleAllocationMethodChange = (method: "firstTerm" | "even" | "manual") => {
    if (!currentEditItem) return

    let newDistribution = [...currentEditItem.distribution]
    const amount = currentEditItem.amount

    if (method === "firstTerm") {
      newDistribution = newDistribution.map((term, index) => ({
        ...term,
        amount: index === 0 ? amount : 0,
      }))
    } else if (method === "even") {
      const termCount = newDistribution.length
      const evenAmount = termCount > 0 ? amount / termCount : 0
      newDistribution = newDistribution.map((term) => ({
        ...term,
        amount: evenAmount,
      }))
    }

    setCurrentEditItem({
      ...currentEditItem,
      distribution: newDistribution,
      allocationMethod: method,
    })
  }

  // Handle term amount change in dialog
  const handleTermAmountChange = (termId: string, value: string) => {
    if (!currentEditItem) return

    const amount = Number.parseFloat(value) || 0

    setCurrentEditItem({
      ...currentEditItem,
      distribution: currentEditItem.distribution.map((term) => (term.termId === termId ? { ...term, amount } : term)),
    })
  }

  // Handle term amount change directly (for the combined view)
  const handleTermAmountDirectly = (
    feeHeadId: string,
    classId: string,
    studentType: "existing" | "new",
    termIndex: number,
    value: string,
  ) => {
    const amount = Number.parseFloat(value) || 0

    setDistributionItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.feeHeadId === feeHeadId) {
          const studentTypeData = studentType === "existing" ? { ...item.existingStudents } : { ...item.newStudents }

          // Make sure classFees exists and has the classId
          if (!studentTypeData.classFees) {
            studentTypeData.classFees = {}
          }

          if (!studentTypeData.classFees[classId]) {
            const terms = getTerms()
            studentTypeData.classFees[classId] = {
              amount: 0,
              distribution: terms.map((term, index) => ({
                termId: `term${index + 1}`,
                termName: term,
                amount: 0,
              })),
              allocationMethod: "manual",
            }
          }

          const classFee = { ...studentTypeData.classFees[classId] }

          // Update the specific term amount
          classFee.distribution = classFee.distribution.map((term, idx) =>
            idx === termIndex ? { ...term, amount } : term,
          )

          // Update the total amount
          classFee.amount = classFee.distribution.reduce((sum, term) => sum + term.amount, 0)

          // Set allocation method to manual since we're directly editing terms
          classFee.allocationMethod = "manual"

          studentTypeData.classFees[classId] = classFee

          if (studentType === "existing") {
            return { ...item, existingStudents: studentTypeData }
          } else {
            return { ...item, newStudents: studentTypeData }
          }
        }
        return item
      })
    })

    // Clear validation error if exists
    if (validationErrors[`${feeHeadId}-${classId}-${studentType}`]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`${feeHeadId}-${classId}-${studentType}`]
        return newErrors
      })
    }
  }

  // Save distribution from dialog
  const saveDistribution = () => {
    if (!currentEditItem) return

    // Validate total matches
    const totalDistributed = currentEditItem.distribution.reduce((sum, term) => sum + term.amount, 0)
    const isValid = Math.abs(totalDistributed - currentEditItem.amount) < 0.01 // Allow for small floating point differences

    if (!isValid) {
      // Show validation error in dialog
      return
    }

    setDistributionItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.feeHeadId === currentEditItem.feeHeadId) {
          const studentTypeData =
            currentEditItem.studentType === "existing" ? { ...item.existingStudents } : { ...item.newStudents }

          // Ensure classFees exists
          if (!studentTypeData.classFees) {
            studentTypeData.classFees = {}
          }

          studentTypeData.classFees[currentEditItem.classId] = {
            amount: currentEditItem.amount,
            distribution: currentEditItem.distribution,
            allocationMethod: currentEditItem.allocationMethod,
          }

          if (currentEditItem.studentType === "existing") {
            return { ...item, existingStudents: studentTypeData }
          } else {
            return { ...item, newStudents: studentTypeData }
          }
        }
        return item
      })
    })

    setIsEditDialogOpen(false)
    setCurrentEditItem(null)
  }

  // Save as draft
  const saveDraft = () => {
    if (!distributionName) {
      alert("Please enter a distribution name")
      return
    }

    if (validateDistributions()) {
      setDistributionStatus("draft")

      // Create a new distribution entry
      const selectedTerm = feeTerms.find((term) => term.id === selectedFeeTerm)
      const termText = selectedTerm ? selectedTerm.name : ""

      const classLabels = selectedClasses.map((classId) => {
        const classObj = classes.find((c) => c.value === classId)
        return classObj ? classObj.label : classId
      })

      const feeHeadLabels = selectedFeeHeads.map((feeHeadId) => {
        const feeHeadObj = feeHeads.find((fh) => fh.value === feeHeadId)
        return feeHeadObj ? feeHeadObj.label : feeHeadId
      })

      const newDistribution = {
        id: editingDistributionId || Date.now().toString(),
        name: distributionName,
        academicYear: selectedTerm ? selectedTerm.name.split(" ")[0] : "",
        term: "All Terms",
        classes: classLabels,
        feeHeads: feeHeadLabels,
        status: "draft",
        lastUpdated: new Date().toISOString().split("T")[0],
      }

      if (editingDistributionId) {
        // Update existing distribution
        setDistributions((prev) => prev.map((dist) => (dist.id === editingDistributionId ? newDistribution : dist)))
      } else {
        // Add new distribution
        setDistributions((prev) => [...prev, newDistribution])
      }

      // Reset form and go back to list view
      resetForm()
    }
  }

  // Submit distribution
  const submitDistribution = () => {
    if (!distributionName) {
      alert("Please enter a distribution name")
      return
    }

    if (validateDistributions()) {
      setDistributionStatus("submitted")

      // Create a new distribution entry
      const selectedTerm = feeTerms.find((term) => term.id === selectedFeeTerm)
      const termText = selectedTerm ? selectedTerm.name : ""

      const classLabels = selectedClasses.map((classId) => {
        const classObj = classes.find((c) => c.value === classId)
        return classObj ? classObj.label : classId
      })

      const feeHeadLabels = selectedFeeHeads.map((feeHeadId) => {
        const feeHeadObj = feeHeads.find((fh) => fh.value === feeHeadId)
        return feeHeadObj ? feeHeadObj.label : feeHeadId
      })

      const newDistribution = {
        id: editingDistributionId || Date.now().toString(),
        name: distributionName,
        academicYear: selectedTerm ? selectedTerm.name.split(" ")[0] : "",
        term: "All Terms",
        classes: classLabels,
        feeHeads: feeHeadLabels,
        status: "active",
        lastUpdated: new Date().toISOString().split("T")[0],
      }

      if (editingDistributionId) {
        // Update existing distribution
        setDistributions((prev) => prev.map((dist) => (dist.id === editingDistributionId ? newDistribution : dist)))
      } else {
        // Add new distribution
        setDistributions((prev) => [...prev, newDistribution])
      }

      // Reset form and go back to list view
      resetForm()
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount).replace(/NGN/g, "₦")
  }

  // Calculate total for a distribution
  const calculateTotal = (distribution: AmountDistribution[]) => {
    return distribution.reduce((sum, term) => sum + term.amount, 0)
  }

  // Get class name by ID
  const getClassName = (classId: string) => {
    return classes.find((c) => c.value === classId)?.label || classId
  }

  // Add a new function to toggle between view modes
  const toggleViewMode = (checked: boolean) => {
    setUseUnifiedView(checked)
  }

  // Scroll table horizontally
  const scrollTable = (direction: "left" | "right") => {
    if (tableContainerRef.current) {
      const scrollAmount = 200 // Adjust scroll amount as needed
      const currentScroll = tableContainerRef.current.scrollLeft
      tableContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Reset form
  const resetForm = () => {
    setShowForm(false)
    setDistributionName("")
    setSelectedFeeTerm("")
    setSelectedClasses([])
    setSelectedFeeHeads([])
    setDistributionItems([])
    setDistributionStatus("")
    setIsViewMode(false)
    setShowDistribution(false)
    setEditingDistributionId(null)
  }

  // Edit distribution
  const editDistribution = (id: string) => {
    const distribution = distributions.find((dist) => dist.id === id)
    if (!distribution) return

    setEditingDistributionId(id)
    setDistributionName(distribution.name)

    // Find the fee term ID
    const feeTerm = feeTerms.find((term) => term.name.includes(distribution.academicYear))
    if (feeTerm) {
      setSelectedFeeTerm(feeTerm.id)
    }

    // Convert class labels to values
    const classValues = distribution.classes
      .map((label) => {
        const classObj = classes.find((c) => c.label === label)
        return classObj ? classObj.value : ""
      })
      .filter(Boolean)
    setSelectedClasses(classValues)

    // Convert fee head labels to values
    const feeHeadValues = distribution.feeHeads
      .map((label) => {
        const feeHeadObj = feeHeads.find((fh) => fh.label === label)
        return feeHeadObj ? feeHeadObj.value : ""
      })
      .filter(Boolean)
    setSelectedFeeHeads(feeHeadValues)

    setShowForm(true)
  }

  // Delete distribution
  const deleteDistribution = (id: string) => {
    if (confirm("Are you sure you want to delete this distribution?")) {
      setDistributions((prev) => prev.filter((dist) => dist.id !== id))
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">active</Badge>
      case "archived":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            archived
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            draft
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {!showForm ? (
        // Distribution List View
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fee Distributions</CardTitle>
              <CardDescription>Manage fee distributions across classes and terms</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Distribution
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Distribution Name</TableHead>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Fee Heads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDistributions.map((distribution) => (
                    <TableRow key={distribution.id}>
                      <TableCell className="font-medium">{distribution.name}</TableCell>
                      <TableCell>{distribution.academicYear}</TableCell>
                      <TableCell>{distribution.term}</TableCell>
                      <TableCell>{distribution.classes.join(", ")}</TableCell>
                      <TableCell>{distribution.feeHeads.join(", ")}</TableCell>
                      <TableCell>{getStatusBadge(distribution.status)}</TableCell>
                      <TableCell>{distribution.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => editDistribution(distribution.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteDistribution(distribution.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Distribution Form View
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{editingDistributionId ? "Edit Fee Distribution" : "New Fee Distribution"}</CardTitle>
              <CardDescription>Define fee amounts for different classes and student types</CardDescription>
            </div>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Distribution Name */}
            <div className="space-y-2">
              <Label htmlFor="distribution-name">Distribution Name</Label>
              <Input
                id="distribution-name"
                value={distributionName}
                onChange={(e) => setDistributionName(e.target.value)}
                placeholder="e.g., 2023-2024 Regular Fees"
                disabled={distributionStatus === "submitted" || isViewMode}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fee Term Selection */}
              <div className="space-y-2">
                <Label htmlFor="fee-term">Academic Year</Label>
                <Select
                  value={selectedFeeTerm}
                  onValueChange={setSelectedFeeTerm}
                  disabled={distributionStatus === "submitted" || isViewMode}
                >
                  <SelectTrigger id="fee-term">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeTerms.map((term) => (
                      <SelectItem key={term.id} value={term.id}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Classes Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Classes</Label>
                </div>
                <MultiSelect
                  options={classes}
                  selected={selectedClasses}
                  onChange={(value) => {
                    console.log("Classes selected:", value)
                    setSelectedClasses(value)
                  }}
                  placeholder="Select classes"
                  disabled={distributionStatus === "submitted" || isViewMode}
                />
              </div>

              {/* Fee Heads Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Fee Heads</Label>
                </div>
                <MultiSelect
                  options={feeHeads}
                  selected={selectedFeeHeads}
                  onChange={(value) => {
                    console.log("Fee heads selected:", value)
                    setSelectedFeeHeads(value)
                  }}
                  placeholder="Select fee heads"
                  disabled={distributionStatus === "submitted" || isViewMode}
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="unified-view"
                checked={useUnifiedView}
                onCheckedChange={toggleViewMode}
                disabled={distributionStatus === "submitted" || isViewMode}
              />
              <Label htmlFor="unified-view" className="text-sm font-medium">
                Use unified view for existing and new students
              </Label>
            </div>

            {/* Distribution Table */}
            {!showDistribution && (
              <div className="border rounded-md p-8 text-center text-muted-foreground">
                Please select an academic year, fee heads, and at least one class to generate the distribution table
              </div>
            )}

            {showDistribution && distributionItems.length > 0 && (
              <div className="mt-6">
                {/* Scroll buttons for horizontal scrolling */}
                <div className="flex justify-end mb-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => scrollTable("left")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => scrollTable("right")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {useUnifiedView ? (
                  // Unified View with classes in header
                  <div className="relative">
                    <div ref={tableContainerRef} className="overflow-x-auto">
                      <Table>
                        <TableHeader className="sticky top-0 bg-background z-10">
                          <TableRow>
                            <TableHead className="w-[200px] sticky left-0 bg-background z-20">
                              Fee Head / Student Type
                            </TableHead>
                            <TableHead className="w-[80px] sticky left-[200px] bg-background z-20">Enable</TableHead>
                            {selectedClasses.map((classId) => (
                              <TableHead key={`class-${classId}`} className="text-center min-w-[120px]">
                                {getClassName(classId)}
                              </TableHead>
                            ))}
                            <TableHead className="text-center">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {distributionItems.map((item) => (
                            <React.Fragment key={item.feeHeadId}>
                              {/* Fee Head Row - acts as a section header */}
                              <TableRow className="bg-muted/50">
                                <TableCell
                                  colSpan={selectedClasses.length + 3}
                                  className="font-medium sticky left-0 bg-muted/50 z-10"
                                >
                                  {item.feeHeadName}
                                </TableCell>
                              </TableRow>

                              {/* Existing Students Row */}
                              <TableRow>
                                <TableCell className="pl-8 sticky left-0 bg-background z-10">
                                  Existing Students
                                </TableCell>
                                <TableCell className="text-center sticky left-[200px] bg-background z-10">
                                  <Checkbox
                                    checked={item.existingStudents.enabled}
                                    onCheckedChange={(checked) =>
                                      toggleStudentType(item.feeHeadId, "existing", checked as boolean)
                                    }
                                    disabled={distributionStatus === "submitted" || isViewMode}
                                  />
                                </TableCell>
                                {selectedClasses.map((classId) => {
                                  const classFee = item.existingStudents.classFees[classId]
                                  return (
                                    <TableCell key={`existing-${item.feeHeadId}-${classId}`} className="p-2">
                                      {item.existingStudents.enabled ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            value={classFee?.amount || "0.00"}
                                            onChange={(e) =>
                                              handleAmountChange(item.feeHeadId, classId, "existing", e.target.value)
                                            }
                                            className={
                                              validationErrors[`${item.feeHeadId}-${classId}-existing`]
                                                ? "border-red-500"
                                                : ""
                                            }
                                            disabled={distributionStatus === "submitted" || isViewMode}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(item.feeHeadId, classId, "existing")}
                                            disabled={isViewMode}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground">Disabled</span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                                <TableCell className="text-right font-medium">
                                  {item.existingStudents.enabled
                                    ? formatCurrency(
                                        Object.values(item.existingStudents.classFees).reduce(
                                          (sum, fee) => sum + fee.amount,
                                          0,
                                        ),
                                      )
                                    : "-"}
                                </TableCell>
                              </TableRow>

                              {/* New Students Row */}
                              <TableRow>
                                <TableCell className="pl-8 sticky left-0 bg-background z-10">New Students</TableCell>
                                <TableCell className="text-center sticky left-[200px] bg-background z-10">
                                  <Checkbox
                                    checked={item.newStudents.enabled}
                                    onCheckedChange={(checked) =>
                                      toggleStudentType(item.feeHeadId, "new", checked as boolean)
                                    }
                                    disabled={distributionStatus === "submitted" || isViewMode}
                                  />
                                </TableCell>
                                {selectedClasses.map((classId) => {
                                  const classFee = item.newStudents.classFees[classId]
                                  return (
                                    <TableCell key={`new-${item.feeHeadId}-${classId}`} className="p-2">
                                      {item.newStudents.enabled ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            value={classFee?.amount || "0.00"}
                                            onChange={(e) =>
                                              handleAmountChange(item.feeHeadId, classId, "new", e.target.value)
                                            }
                                            className={
                                              validationErrors[`${item.feeHeadId}-${classId}-new`]
                                                ? "border-red-500"
                                                : ""
                                            }
                                            disabled={distributionStatus === "submitted" || isViewMode}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(item.feeHeadId, classId, "new")}
                                            disabled={isViewMode}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground">Disabled</span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                                <TableCell className="text-right font-medium">
                                  {item.newStudents.enabled
                                    ? formatCurrency(
                                        Object.values(item.newStudents.classFees).reduce(
                                          (sum, fee) => sum + fee.amount,
                                          0,
                                        ),
                                      )
                                    : "-"}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  // Separated View with Tabs
                  <Tabs defaultValue="existing" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="existing">Existing Students</TabsTrigger>
                      <TabsTrigger value="new">New Students</TabsTrigger>
                    </TabsList>

                    {/* Existing Students Tab */}
                    <TabsContent value="existing" className="mt-0">
                      <div ref={tableContainerRef} className="overflow-x-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background z-10">
                            <TableRow>
                              <TableHead className="w-[200px] sticky left-0 bg-background z-20">Fee Head</TableHead>
                              <TableHead className="w-[80px] sticky left-[200px] bg-background z-20">Enable</TableHead>
                              {selectedClasses.map((classId) => (
                                <TableHead key={`class-${classId}`} className="text-center min-w-[120px]">
                                  {getClassName(classId)}
                                </TableHead>
                              ))}
                              <TableHead className="text-center">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {distributionItems.map((item) => (
                              <TableRow key={item.feeHeadId}>
                                <TableCell className="font-medium sticky left-0 bg-background z-10">
                                  {item.feeHeadName}
                                </TableCell>
                                <TableCell className="text-center sticky left-[200px] bg-background z-10">
                                  <Checkbox
                                    checked={item.existingStudents.enabled}
                                    onCheckedChange={(checked) =>
                                      toggleStudentType(item.feeHeadId, "existing", checked as boolean)
                                    }
                                    disabled={distributionStatus === "submitted" || isViewMode}
                                  />
                                </TableCell>
                                {selectedClasses.map((classId) => {
                                  const classFee = item.existingStudents.classFees[classId]
                                  return (
                                    <TableCell key={`existing-${item.feeHeadId}-${classId}`} className="p-2">
                                      {item.existingStudents.enabled ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            value={classFee?.amount || "0.00"}
                                            onChange={(e) =>
                                              handleAmountChange(item.feeHeadId, classId, "existing", e.target.value)
                                            }
                                            className={
                                              validationErrors[`${item.feeHeadId}-${classId}-existing`]
                                                ? "border-red-500"
                                                : ""
                                            }
                                            disabled={distributionStatus === "submitted" || isViewMode}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(item.feeHeadId, classId, "existing")}
                                            disabled={isViewMode}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground">Disabled</span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                                <TableCell className="text-right font-medium">
                                  {item.existingStudents.enabled
                                    ? formatCurrency(
                                        Object.values(item.existingStudents.classFees).reduce(
                                          (sum, fee) => sum + fee.amount,
                                          0,
                                        ),
                                      )
                                    : "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* New Students Tab */}
                    <TabsContent value="new" className="mt-0">
                      <div ref={tableContainerRef} className="overflow-x-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background z-10">
                            <TableRow>
                              <TableHead className="w-[200px] sticky left-0 bg-background z-20">Fee Head</TableHead>
                              <TableHead className="w-[80px] sticky left-[200px] bg-background z-20">Enable</TableHead>
                              {selectedClasses.map((classId) => (
                                <TableHead key={`class-${classId}`} className="text-center min-w-[120px]">
                                  {getClassName(classId)}
                                </TableHead>
                              ))}
                              <TableHead className="text-center">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {distributionItems.map((item) => (
                              <TableRow key={item.feeHeadId}>
                                <TableCell className="font-medium sticky left-0 bg-background z-10">
                                  {item.feeHeadName}
                                </TableCell>
                                <TableCell className="text-center sticky left-[200px] bg-background z-10">
                                  <Checkbox
                                    checked={item.newStudents.enabled}
                                    onCheckedChange={(checked) =>
                                      toggleStudentType(item.feeHeadId, "new", checked as boolean)
                                    }
                                    disabled={distributionStatus === "submitted" || isViewMode}
                                  />
                                </TableCell>
                                {selectedClasses.map((classId) => {
                                  const classFee = item.newStudents.classFees[classId]
                                  return (
                                    <TableCell key={`new-${item.feeHeadId}-${classId}`} className="p-2">
                                      {item.newStudents.enabled ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            value={classFee?.amount || "0.00"}
                                            onChange={(e) =>
                                              handleAmountChange(item.feeHeadId, classId, "new", e.target.value)
                                            }
                                            className={
                                              validationErrors[`${item.feeHeadId}-${classId}-new`]
                                                ? "border-red-500"
                                                : ""
                                            }
                                            disabled={distributionStatus === "submitted" || isViewMode}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(item.feeHeadId, classId, "new")}
                                            disabled={isViewMode}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground">Disabled</span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                                <TableCell className="text-right font-medium">
                                  {item.newStudents.enabled
                                    ? formatCurrency(
                                        Object.values(item.newStudents.classFees).reduce(
                                          (sum, fee) => sum + fee.amount,
                                          0,
                                        ),
                                      )
                                    : "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            )}
          </CardContent>

          {showDistribution && distributionItems.length > 0 && (
            <CardFooter className="flex justify-between">
              <div>
                {distributionStatus && (
                  <Badge variant={distributionStatus === "draft" ? "outline" : "default"} className="mr-2">
                    {distributionStatus === "draft" ? "Draft" : "Submitted"}
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                {distributionStatus === "draft" && (
                  <Button variant="outline" onClick={() => setIsViewMode(!isViewMode)}>
                    {isViewMode ? <FileEdit className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {isViewMode ? "Edit" : "View"}
                  </Button>
                )}

                {!isViewMode && (
                  <>
                    <Button variant="outline" onClick={saveDraft}>
                      <Save className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>

                    <Button onClick={submitDistribution}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      )}

      {/* Edit Distribution Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Fee Distribution</DialogTitle>
            <DialogDescription>Distribute the fee amount across terms</DialogDescription>
          </DialogHeader>

          {currentEditItem && (
            <div className="py-4 space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Fee Head:</p>
                  <p>{distributionItems.find((i) => i.feeHeadId === currentEditItem.feeHeadId)?.feeHeadName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Class:</p>
                  <p>{getClassName(currentEditItem.classId)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Amount:</p>
                  <p>{formatCurrency(currentEditItem.amount)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Allocation Method</Label>
                <RadioGroup
                  value={currentEditItem.allocationMethod}
                  onValueChange={(value) => handleAllocationMethodChange(value as "firstTerm" | "even" | "manual")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="firstTerm" id="first-term" />
                    <Label htmlFor="first-term">First Term Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="even" id="distribute-evenly" />
                    <Label htmlFor="distribute-evenly">Distribute Evenly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="allocate-manually" />
                    <Label htmlFor="allocate-manually">Allocate Manually</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Term Distribution</Label>
                  <div className="text-sm">
                    Total: {formatCurrency(calculateTotal(currentEditItem.distribution))}
                    {Math.abs(calculateTotal(currentEditItem.distribution) - currentEditItem.amount) >= 0.01 && (
                      <span className="text-red-500 ml-2">
                        (Difference:{" "}
                        {formatCurrency(
                          Math.abs(calculateTotal(currentEditItem.distribution) - currentEditItem.amount),
                        )}
                        )
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {currentEditItem.distribution.map((term, index) => (
                    <div key={term.termId} className="grid grid-cols-2 gap-4 items-center">
                      <Label htmlFor={`term-${term.termId}`}>{term.termName}</Label>
                      <Input
                        id={`term-${term.termId}`}
                        type="number"
                        value={term.amount || ""}
                        onChange={(e) => handleTermAmountChange(term.termId, e.target.value)}
                        disabled={currentEditItem.allocationMethod !== "manual"}
                      />
                    </div>
                  ))}
                </div>

                {Math.abs(calculateTotal(currentEditItem.distribution) - currentEditItem.amount) >= 0.01 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      The total distribution amount must match the fee amount. Please adjust the values.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveDistribution}
              disabled={
                currentEditItem &&
                Math.abs(calculateTotal(currentEditItem.distribution) - currentEditItem.amount) >= 0.01
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Export the component with the correct name
export { FeeDistributionComponent as FeeDistribution }
