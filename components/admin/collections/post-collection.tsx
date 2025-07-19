"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Receipt } from "./receipt"
import {
  CreditCard,
  Building,
  Wallet,
  Save,
  CheckCircle2,
  ReceiptIcon,
  User,
  Users,
  Filter,
  CreditCardIcon as CreditIcon,
  Info,
  Clock,
  ArrowUpDown,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data
const mockData = {
  classes: [
    { id: "jss1", name: "JSS 1" },
    { id: "jss2", name: "JSS 2" },
    { id: "jss3", name: "JSS 3" },
    { id: "ss1", name: "SS 1" },
    { id: "ss2", name: "SS 2" },
    { id: "ss3", name: "SS 3" },
  ],
  sections: [
    { id: "a", name: "A" },
    { id: "b", name: "B" },
    { id: "c", name: "C" },
  ],
  students: [
    {
      id: "s1",
      name: "John Smith",
      class: "jss1",
      section: "a",
      parentId: "p1",
      outstandingBalance: 150000,
      creditBalance: 25000,
      feeItems: [
        { id: "f1", name: "Tuition Fee", amount: 100000, priority: 1, isOptional: false },
        { id: "f2", name: "Development Levy", amount: 20000, priority: 2, isOptional: false },
        { id: "f3", name: "Technology Fee", amount: 15000, priority: 3, isOptional: false },
        { id: "f4", name: "Sports Fee", amount: 10000, priority: 4, isOptional: true },
        { id: "f5", name: "Library Fee", amount: 5000, priority: 5, isOptional: true },
      ],
      balanceBroughtForward: 35000,
    },
    {
      id: "s2",
      name: "Jane Smith",
      class: "jss3",
      section: "b",
      parentId: "p1",
      outstandingBalance: 120000,
      creditBalance: 15000,
      feeItems: [
        { id: "f1", name: "Tuition Fee", amount: 80000, priority: 1, isOptional: false },
        { id: "f2", name: "Development Levy", amount: 15000, priority: 2, isOptional: false },
        { id: "f3", name: "Technology Fee", amount: 12000, priority: 3, isOptional: false },
        { id: "f4", name: "Sports Fee", amount: 8000, priority: 4, isOptional: true },
        { id: "f5", name: "Library Fee", amount: 5000, priority: 5, isOptional: true },
      ],
      balanceBroughtForward: 20000,
    },
    {
      id: "s3",
      name: "Michael Johnson",
      class: "ss2",
      section: "c",
      parentId: "p2",
      outstandingBalance: 200000,
      creditBalance: 0,
      feeItems: [
        { id: "f1", name: "Tuition Fee", amount: 150000, priority: 1, isOptional: false },
        { id: "f2", name: "Development Levy", amount: 25000, priority: 2, isOptional: false },
        { id: "f3", name: "Technology Fee", amount: 15000, priority: 3, isOptional: false },
        { id: "f4", name: "Sports Fee", amount: 5000, priority: 4, isOptional: true },
        { id: "f5", name: "Library Fee", amount: 5000, priority: 5, isOptional: true },
      ],
      balanceBroughtForward: 0,
    },
  ],
  parents: [
    {
      id: "p1",
      name: "Mr. & Mrs. Smith",
      address: "123 Main Street, Lagos",
      phone: "+234 123 456 7890",
      email: "smith@example.com",
      children: ["s1", "s2"],
    },
    {
      id: "p2",
      name: "Mr. & Mrs. Johnson",
      address: "456 Oak Avenue, Lagos",
      phone: "+234 987 654 3210",
      email: "johnson@example.com",
      children: ["s3"],
    },
  ],
  paymentMethods: [
    { id: "card", name: "Credit/Debit Card" },
    { id: "bank-transfer", name: "Bank Transfer" },
    { id: "cash", name: "Cash Payment" },
  ],
  banks: [
    { id: "gtb", name: "Guaranty Trust Bank" },
    { id: "first-bank", name: "First Bank" },
    { id: "zenith", name: "Zenith Bank" },
    { id: "access", name: "Access Bank" },
  ],
  extraCurricularClubs: [
    // Monday clubs
    { id: "chess", name: "Chess Club", fee: 5000, day: "Monday", timeSlot: "2:00 PM - 3:30 PM", group: 1 },
    { id: "debate", name: "Debate Club", fee: 3000, day: "Monday", timeSlot: "2:00 PM - 3:30 PM", group: 1 },
    { id: "robotics", name: "Robotics Club", fee: 12000, day: "Monday", timeSlot: "4:00 PM - 5:30 PM", group: 2 },
    { id: "coding", name: "Coding Club", fee: 10000, day: "Monday", timeSlot: "4:00 PM - 5:30 PM", group: 2 },

    // Tuesday clubs
    { id: "music", name: "Music Club", fee: 8000, day: "Tuesday", timeSlot: "2:00 PM - 3:30 PM", group: 3 },
    { id: "drama", name: "Drama Club", fee: 6000, day: "Tuesday", timeSlot: "2:00 PM - 3:30 PM", group: 3 },
    { id: "art", name: "Art Club", fee: 7000, day: "Tuesday", timeSlot: "4:00 PM - 5:30 PM", group: 4 },

    // Wednesday clubs
    { id: "sports", name: "Sports Club", fee: 10000, day: "Wednesday", timeSlot: "2:00 PM - 4:00 PM", group: 5 },
    { id: "swimming", name: "Swimming Club", fee: 15000, day: "Wednesday", timeSlot: "2:00 PM - 4:00 PM", group: 5 },

    // Thursday clubs
    { id: "science", name: "Science Club", fee: 8000, day: "Thursday", timeSlot: "2:00 PM - 3:30 PM", group: 6 },
    { id: "math", name: "Mathematics Club", fee: 5000, day: "Thursday", timeSlot: "2:00 PM - 3:30 PM", group: 6 },
    { id: "language", name: "Language Club", fee: 6000, day: "Thursday", timeSlot: "4:00 PM - 5:30 PM", group: 7 },

    // Friday clubs
    { id: "dance", name: "Dance Club", fee: 9000, day: "Friday", timeSlot: "2:00 PM - 3:30 PM", group: 8 },
    { id: "photography", name: "Photography Club", fee: 12000, day: "Friday", timeSlot: "2:00 PM - 3:30 PM", group: 8 },
    { id: "cooking", name: "Cooking Club", fee: 10000, day: "Friday", timeSlot: "4:00 PM - 5:30 PM", group: 9 },
  ],
  hotLunchOptions: [
    { id: "standard", name: "Standard Lunch", fee: 15000 },
    { id: "premium", name: "Premium Lunch", fee: 25000 },
  ],
}

export function PostCollection() {
  // State
  const [collectionType, setCollectionType] = useState<"student" | "parent">("student")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedParent, setSelectedParent] = useState("")
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [bank, setBank] = useState("")
  const [amount, setAmount] = useState("")
  const [reference, setReference] = useState("")
  const [includeExtraCurricular, setIncludeExtraCurricular] = useState(false)
  const [selectedClubs, setSelectedClubs] = useState<{ [key: string]: string }>({})
  const [includeHotLunch, setIncludeHotLunch] = useState(false)
  const [selectedLunchOption, setSelectedLunchOption] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [filteredStudents, setFilteredStudents] = useState(mockData.students)
  const [feeAllocation, setFeeAllocation] = useState<Array<{ name: string; amount: number; studentId?: string }>>([])
  const [selectedOptionalFees, setSelectedOptionalFees] = useState<{ [key: string]: boolean }>({})

  // New state for credit application
  const [applyCredit, setApplyCredit] = useState(false)
  const [creditToApply, setCreditToApply] = useState("")
  const [outstandingCarriedForward, setOutstandingCarriedForward] = useState(0)
  const [creditCarriedForward, setCreditCarriedForward] = useState(0)
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0])
  const [manualAllocation, setManualAllocation] = useState(false)
  const [manualAllocations, setManualAllocations] = useState<{ [key: string]: string }>({})

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)
  }

  // Initialize optional fees when student or parent changes
  useEffect(() => {
    const newSelectedOptionalFees: { [key: string]: boolean } = {}

    if (collectionType === "student" && selectedStudent) {
      const student = getStudent(selectedStudent)
      if (student) {
        student.feeItems.forEach((item) => {
          if (item.isOptional) {
            newSelectedOptionalFees[`${student.id}-${item.id}`] = true
          }
        })
      }
    } else if (collectionType === "parent" && selectedParent) {
      const children = getChildrenOfParent(selectedParent)
      children.forEach((child) => {
        if (child) {
          child.feeItems.forEach((item) => {
            if (item.isOptional) {
              newSelectedOptionalFees[`${child.id}-${item.id}`] = true
            }
          })
        }
      })
    }

    setSelectedOptionalFees(newSelectedOptionalFees)
  }, [selectedStudent, selectedParent, collectionType, selectedChildren])

  // Initialize selected children when parent changes
  useEffect(() => {
    if (collectionType === "parent" && selectedParent) {
      const parent = getParent(selectedParent)
      if (parent) {
        setSelectedChildren(parent.children)
      }
    }
  }, [selectedParent, collectionType])

  // Get available credit
  const getAvailableCredit = () => {
    if (collectionType === "student" && selectedStudent) {
      const student = getStudent(selectedStudent)
      return student?.creditBalance || 0
    } else if (collectionType === "parent" && selectedParent) {
      return getChildrenOfParent(selectedParent)
        .filter((child) => selectedChildren.includes(child?.id || ""))
        .reduce((sum, child) => sum + (child?.creditBalance || 0), 0)
    }
    return 0
  }

  // Get outstanding balance
  const getOutstandingBalance = () => {
    if (collectionType === "student" && selectedStudent) {
      const student = getStudent(selectedStudent)
      return student?.outstandingBalance || 0
    } else if (collectionType === "parent" && selectedParent) {
      return getChildrenOfParent(selectedParent)
        .filter((child) => selectedChildren.includes(child?.id || ""))
        .reduce((sum, child) => sum + (child?.outstandingBalance || 0), 0)
    }
    return 0
  }

  // Get balance brought forward
  const getBalanceBroughtForward = () => {
    if (collectionType === "student" && selectedStudent) {
      const student = getStudent(selectedStudent)
      return student?.balanceBroughtForward || 0
    } else if (collectionType === "parent" && selectedParent) {
      return getChildrenOfParent(selectedParent)
        .filter((child) => selectedChildren.includes(child?.id || ""))
        .reduce((sum, child) => sum + (child?.balanceBroughtForward || 0), 0)
    }
    return 0
  }

  // Calculate carried forward values
  useEffect(() => {
    const outstandingBalance = getOutstandingBalance()
    const availableCredit = getAvailableCredit()
    const paymentAmount = Number(amount) || 0
    const appliedCredit = applyCredit ? Math.min(Number(creditToApply) || 0, availableCredit) : 0
    const totalPayment = paymentAmount + appliedCredit

    if (totalPayment >= outstandingBalance) {
      setOutstandingCarriedForward(0)
      setCreditCarriedForward(totalPayment - outstandingBalance)
    } else {
      setOutstandingCarriedForward(outstandingBalance - totalPayment)
      setCreditCarriedForward(0)
    }
  }, [amount, selectedStudent, selectedParent, collectionType, applyCredit, creditToApply, selectedChildren])

  // Filter students based on class and section
  useEffect(() => {
    let filtered = mockData.students

    if (selectedClass && selectedClass !== "all") {
      filtered = filtered.filter((student) => student.class === selectedClass)
    }

    if (selectedSection && selectedSection !== "all") {
      filtered = filtered.filter((student) => student.section === selectedSection)
    }

    setFilteredStudents(filtered)
  }, [selectedClass, selectedSection])

  // Reset credit application when student/parent changes
  useEffect(() => {
    setApplyCredit(false)
    setCreditToApply("")
    setManualAllocation(false)
    setManualAllocations({})
  }, [selectedStudent, selectedParent, collectionType, selectedChildren])

  // Get student by ID
  const getStudent = (id: string) => {
    return mockData.students.find((student) => student.id === id)
  }

  // Get parent by ID
  const getParent = (id: string) => {
    return mockData.parents.find((parent) => parent.id === id)
  }

  // Get children of parent
  const getChildrenOfParent = (parentId: string) => {
    const parent = getParent(parentId)
    if (!parent) return []

    return parent.children.map((childId) => getStudent(childId)).filter(Boolean)
  }

  // Calculate total extra fees
  const calculateExtraFees = () => {
    let total = 0

    if (includeExtraCurricular) {
      Object.values(selectedClubs).forEach((clubId) => {
        const club = mockData.extraCurricularClubs.find((c) => c.id === clubId)
        if (club) total += club.fee
      })
    }

    if (includeHotLunch && selectedLunchOption) {
      const lunchOption = mockData.hotLunchOptions.find((l) => l.id === selectedLunchOption)
      if (lunchOption) total += lunchOption.fee
    }

    return total
  }

  // Calculate fee allocation based on payment amount and fee priorities
  useEffect(() => {
    if ((!amount && !applyCredit) || manualAllocation) {
      return
    }

    let remainingAmount = Number(amount) || 0
    if (applyCredit) {
      remainingAmount += Math.min(Number(creditToApply) || 0, getAvailableCredit())
    }

    const allocation: Array<{ name: string; amount: number; studentId?: string }> = []

    if (collectionType === "student" && selectedStudent) {
      const student = getStudent(selectedStudent)
      if (!student) return

      // First allocate to balance brought forward
      if (student.balanceBroughtForward > 0 && remainingAmount > 0) {
        const allocatedAmount = Math.min(student.balanceBroughtForward, remainingAmount)
        allocation.push({
          name: "Balance Brought Forward",
          amount: allocatedAmount,
          studentId: student.id,
        })
        remainingAmount -= allocatedAmount
      }

      // Then allocate to fee items based on priority
      const selectedFeeItems = student.feeItems.filter(
        (item) => !item.isOptional || selectedOptionalFees[`${student.id}-${item.id}`],
      )

      // Sort fee items by priority
      const sortedFeeItems = [...selectedFeeItems].sort((a, b) => a.priority - b.priority)

      // Allocate payment to fee items based on priority
      for (const feeItem of sortedFeeItems) {
        if (remainingAmount <= 0) break

        const allocatedAmount = Math.min(feeItem.amount, remainingAmount)
        allocation.push({
          name: feeItem.name,
          amount: allocatedAmount,
          studentId: student.id,
        })

        remainingAmount -= allocatedAmount
      }
    } else if (collectionType === "parent" && selectedParent) {
      const children = getChildrenOfParent(selectedParent).filter((child) => selectedChildren.includes(child?.id || ""))

      if (children.length === 0) return

      // First allocate to balance brought forward for all children
      for (const child of children) {
        if (!child || remainingAmount <= 0) continue

        if (child.balanceBroughtForward > 0) {
          const allocatedAmount = Math.min(child.balanceBroughtForward, remainingAmount)
          allocation.push({
            name: `Balance Brought Forward (${child.name})`,
            amount: allocatedAmount,
            studentId: child.id,
          })
          remainingAmount -= allocatedAmount
        }
      }

      // Then allocate to fee items for each child in sequence
      for (const child of children) {
        if (!child || remainingAmount <= 0) continue

        const selectedFeeItems = child.feeItems.filter(
          (item) => !item.isOptional || selectedOptionalFees[`${child.id}-${item.id}`],
        )

        // Sort fee items by priority
        const sortedFeeItems = [...selectedFeeItems].sort((a, b) => a.priority - b.priority)

        // Allocate payment to fee items based on priority
        for (const feeItem of sortedFeeItems) {
          if (remainingAmount <= 0) break

          const allocatedAmount = Math.min(feeItem.amount, remainingAmount)
          allocation.push({
            name: `${feeItem.name} (${child.name})`,
            amount: allocatedAmount,
            studentId: child.id,
          })

          remainingAmount -= allocatedAmount
        }
      }
    }

    // Add extra fees
    if (includeExtraCurricular) {
      Object.values(selectedClubs).forEach((clubId) => {
        const club = mockData.extraCurricularClubs.find((c) => c.id === clubId)
        if (club) {
          allocation.push({
            name: `${club.name} (${club.day}, ${club.timeSlot})`,
            amount: club.fee,
          })
        }
      })
    }

    if (includeHotLunch && selectedLunchOption) {
      const lunchOption = mockData.hotLunchOptions.find((l) => l.id === selectedLunchOption)
      if (lunchOption) {
        allocation.push({
          name: `${lunchOption.name} Plan`,
          amount: lunchOption.fee,
        })
      }
    }

    setFeeAllocation(allocation)

    // Initialize manual allocations
    const initialManualAllocations: { [key: string]: string } = {}
    allocation.forEach((item, index) => {
      initialManualAllocations[index.toString()] = item.amount.toString()
    })
    setManualAllocations(initialManualAllocations)
  }, [
    amount,
    selectedStudent,
    selectedParent,
    collectionType,
    includeExtraCurricular,
    selectedClubs,
    includeHotLunch,
    selectedLunchOption,
    applyCredit,
    creditToApply,
    selectedOptionalFees,
    selectedChildren,
    manualAllocation,
  ])

  // Update manual allocations when fee allocation changes
  useEffect(() => {
    if (!manualAllocation) {
      const initialManualAllocations: { [key: string]: string } = {}
      feeAllocation.forEach((item, index) => {
        initialManualAllocations[index.toString()] = item.amount.toString()
      })
      setManualAllocations(initialManualAllocations)
    }
  }, [feeAllocation, manualAllocation])

  // Calculate total from manual allocations
  const calculateManualTotal = () => {
    return Object.values(manualAllocations).reduce((sum, value) => sum + (Number(value) || 0), 0)
  }

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (collectionType === "student" && !selectedStudent) {
      newErrors.student = "Please select a student"
    }

    if (collectionType === "parent" && !selectedParent) {
      newErrors.parent = "Please select a parent"
    }

    if (collectionType === "parent" && selectedChildren.length === 0) {
      newErrors.children = "Please select at least one child"
    }

    if (!paymentMethod && (!applyCredit || Number(amount) > 0)) {
      newErrors.paymentMethod = "Please select a payment method"
    }

    if (paymentMethod === "bank-transfer" && !bank) {
      newErrors.bank = "Please select a bank"
    }

    const numAmount = Number(amount)
    if ((!amount || isNaN(numAmount) || numAmount <= 0) && !applyCredit) {
      newErrors.amount = "Please enter a valid amount"
    }

    if (applyCredit) {
      const numCredit = Number(creditToApply)
      if (!creditToApply || isNaN(numCredit) || numCredit <= 0) {
        newErrors.credit = "Please enter a valid credit amount"
      } else if (numCredit > getAvailableCredit()) {
        newErrors.credit = "Credit amount exceeds available credit"
      }
    }

    if (numAmount === 0 && (!applyCredit || Number(creditToApply) === 0)) {
      newErrors.payment = "Please enter a payment amount or apply credit"
    }

    if (paymentMethod === "bank-transfer" && !reference && Number(amount) > 0) {
      newErrors.reference = "Please enter a reference number"
    }

    if (includeExtraCurricular && Object.keys(selectedClubs).length === 0) {
      newErrors.clubs = "Please select at least one club"
    }

    if (includeHotLunch && !selectedLunchOption) {
      newErrors.lunch = "Please select a lunch option"
    }

    if (manualAllocation) {
      const manualTotal = calculateManualTotal()
      const paymentTotal =
        Number(amount) + (applyCredit ? Math.min(Number(creditToApply) || 0, getAvailableCredit()) : 0)

      if (Math.abs(manualTotal - paymentTotal) > 0.01) {
        newErrors.allocation = `Manual allocation total (${formatCurrency(manualTotal)}) does not match payment amount (${formatCurrency(paymentTotal)})`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (isDraft = false) => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)

      if (!isDraft) {
        // Prepare receipt data
        const student = selectedStudent ? getStudent(selectedStudent) : null
        const parent = selectedParent ? getParent(selectedParent) : student ? getParent(student.parentId) : null

        if (parent) {
          const appliedCredit = applyCredit ? Math.min(Number(creditToApply) || 0, getAvailableCredit()) : 0

          setReceiptData({
            receiptNumber: `REC-${Math.floor(Math.random() * 1000000)}`,
            date: paymentDate,
            parentName: parent.name,
            parentAddress: parent.address,
            parentPhone: parent.phone,
            parentEmail: parent.email,
            studentName: student ? student.name : selectedChildren.map((id) => getStudent(id)?.name).join(", "),
            studentClass: student ? mockData.classes.find((c) => c.id === student.class)?.name : "",
            paymentMethod:
              Number(amount) > 0
                ? mockData.paymentMethods.find((m) => m.id === paymentMethod)?.name
                : "Credit Application",
            referenceNumber: reference || undefined,
            items: manualAllocation
              ? feeAllocation.map((item, index) => ({
                  ...item,
                  amount: Number(manualAllocations[index.toString()] || 0),
                }))
              : feeAllocation,
            outstandingBroughtForward: getOutstandingBalance(),
            creditBroughtForward: getAvailableCredit(),
            amountPaid: Number(amount),
            creditApplied: appliedCredit,
            outstandingCarriedForward: outstandingCarriedForward,
            creditCarriedForward: creditCarriedForward,
          })

          setShowReceipt(true)
        }
      } else {
        alert("Collection saved as draft")
      }
    }, 1000)
  }

  // Get payment method icon
  const getPaymentMethodIcon = (methodId: string) => {
    switch (methodId) {
      case "card":
        return <CreditCard className="h-4 w-4 mr-2" />
      case "bank-transfer":
        return <Building className="h-4 w-4 mr-2" />
      case "cash":
        return <Wallet className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  // Reset form
  const resetForm = () => {
    setCollectionType("student")
    setSelectedClass("")
    setSelectedSection("")
    setSelectedStudent("")
    setSelectedParent("")
    setSelectedChildren([])
    setPaymentMethod("")
    setBank("")
    setAmount("")
    setReference("")
    setIncludeExtraCurricular(false)
    setSelectedClubs({})
    setIncludeHotLunch(false)
    setSelectedLunchOption("")
    setNotes("")
    setErrors({})
    setShowReceipt(false)
    setReceiptData(null)
    setApplyCredit(false)
    setCreditToApply("")
    setPaymentDate(new Date().toISOString().split("T")[0])
    setManualAllocation(false)
    setManualAllocations({})
    setSelectedOptionalFees({})
  }

  // Group clubs by day
  const clubsByDay = mockData.extraCurricularClubs.reduce(
    (acc, club) => {
      if (!acc[club.day]) {
        acc[club.day] = []
      }
      acc[club.day].push(club)
      return acc
    },
    {} as { [key: string]: typeof mockData.extraCurricularClubs },
  )

  // Group clubs by time slot within each day
  const clubsByDayAndTime = Object.entries(clubsByDay).map(([day, clubs]) => {
    const timeSlots = clubs.reduce(
      (acc, club) => {
        if (!acc[club.timeSlot]) {
          acc[club.timeSlot] = []
        }
        acc[club.timeSlot].push(club)
        return acc
      },
      {} as { [key: string]: typeof mockData.extraCurricularClubs },
    )

    return { day, timeSlots }
  })

  // Handle club selection
  const handleClubSelection = (day: string, timeSlot: string, clubId: string) => {
    setSelectedClubs((prev) => ({
      ...prev,
      [`${day}-${timeSlot}`]: clubId,
    }))
  }

  // Handle child selection
  const handleChildSelection = (childId: string) => {
    setSelectedChildren((prev) => {
      if (prev.includes(childId)) {
        return prev.filter((id) => id !== childId)
      } else {
        return [...prev, childId]
      }
    })
  }

  // Handle manual allocation change
  const handleManualAllocationChange = (index: number, value: string) => {
    setManualAllocations((prev) => ({
      ...prev,
      [index.toString()]: value,
    }))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Post Collection</CardTitle>
          <CardDescription>Record a payment from a student or parent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Collection Type */}
            <div className="space-y-2">
              <Label>Collection Type</Label>
              <RadioGroup
                value={collectionType}
                onValueChange={(value) => setCollectionType(value as "student" | "parent")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex items-center cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    By Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent" className="flex items-center cursor-pointer">
                    <Users className="h-4 w-4 mr-2" />
                    By Parent
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Financial Summary */}
            <Card className="bg-muted/30">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding Brought Forward</p>
                    <p className="font-medium text-red-500">{formatCurrency(getOutstandingBalance())}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Credit Brought Forward</p>
                    <p className="font-medium text-green-600">{formatCurrency(getAvailableCredit())}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Balance Brought Forward</p>
                    <p className="font-medium text-amber-600">{formatCurrency(getBalanceBroughtForward())}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student/Parent Selection */}
            {collectionType === "student" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Student Selection</Label>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3 w-3 mr-1" />
                    Filters
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {mockData.classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger id="section">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sections</SelectItem>
                        {mockData.sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {mockData.classes.find((c) => c.id === student.class)?.name}{" "}
                          {mockData.sections.find((s) => s.id === student.section)?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.student && <p className="text-sm text-red-500">{errors.student}</p>}
                </div>

                {/* Student Fee Schedule */}
                {selectedStudent && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-sm font-medium">Fee Schedule</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fee Item</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-center">Optional</TableHead>
                            <TableHead className="text-center">Include</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getStudent(selectedStudent)?.balanceBroughtForward > 0 && (
                            <TableRow>
                              <TableCell className="font-medium">Balance Brought Forward</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(getStudent(selectedStudent)?.balanceBroughtForward || 0)}
                              </TableCell>
                              <TableCell className="text-center">No</TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={true} disabled />
                              </TableCell>
                            </TableRow>
                          )}
                          {getStudent(selectedStudent)?.feeItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                              <TableCell className="text-center">{item.isOptional ? "Yes" : "No"}</TableCell>
                              <TableCell className="text-center">
                                {item.isOptional ? (
                                  <Checkbox
                                    checked={selectedOptionalFees[`${selectedStudent}-${item.id}`] || false}
                                    onCheckedChange={(checked) => {
                                      setSelectedOptionalFees((prev) => ({
                                        ...prev,
                                        [`${selectedStudent}-${item.id}`]: !!checked,
                                      }))
                                    }}
                                  />
                                ) : (
                                  <Checkbox checked={true} disabled />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-medium">Total</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(
                                (getStudent(selectedStudent)?.balanceBroughtForward || 0) +
                                  getStudent(selectedStudent)
                                    ?.feeItems.filter(
                                      (item) =>
                                        !item.isOptional || selectedOptionalFees[`${selectedStudent}-${item.id}`],
                                    )
                                    .reduce((sum, item) => sum + item.amount, 0) || 0,
                              )}
                            </TableCell>
                            <TableCell colSpan={2}></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent">Parent</Label>
                  <Select value={selectedParent} onValueChange={setSelectedParent}>
                    <SelectTrigger id="parent">
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockData.parents.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.parent && <p className="text-sm text-red-500">{errors.parent}</p>}
                </div>

                {selectedParent && (
                  <div className="space-y-2">
                    <Label>Select Children</Label>
                    <div className="border rounded-md p-3">
                      {getChildrenOfParent(selectedParent).map((child) => (
                        <div key={child?.id} className="flex items-center space-x-2 py-1">
                          <Checkbox
                            id={`child-${child?.id}`}
                            checked={selectedChildren.includes(child?.id || "")}
                            onCheckedChange={() => handleChildSelection(child?.id || "")}
                          />
                          <Label htmlFor={`child-${child?.id}`} className="cursor-pointer">
                            {child?.name} - {mockData.classes.find((c) => c.id === child?.class)?.name}{" "}
                            {mockData.sections.find((s) => s.id === child?.section)?.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.children && <p className="text-sm text-red-500">{errors.children}</p>}
                  </div>
                )}

                {/* Parent Children Fee Schedule */}
                {selectedParent && selectedChildren.length > 0 && (
                  <div className="space-y-4 mt-4">
                    <h3 className="text-sm font-medium">Fee Schedule</h3>

                    <Tabs defaultValue={selectedChildren[0]} className="w-full">
                      <TabsList className="w-full">
                        {selectedChildren.map((childId) => {
                          const child = getStudent(childId)
                          return (
                            <TabsTrigger key={childId} value={childId} className="flex-1">
                              {child?.name}
                            </TabsTrigger>
                          )
                        })}
                      </TabsList>

                      {selectedChildren.map((childId) => {
                        const child = getStudent(childId)
                        return (
                          <TabsContent key={childId} value={childId} className="border rounded-md mt-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Fee Item</TableHead>
                                  <TableHead className="text-right">Amount</TableHead>
                                  <TableHead className="text-center">Optional</TableHead>
                                  <TableHead className="text-center">Include</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {child?.balanceBroughtForward > 0 && (
                                  <TableRow>
                                    <TableCell className="font-medium">Balance Brought Forward</TableCell>
                                    <TableCell className="text-right">
                                      {formatCurrency(child.balanceBroughtForward)}
                                    </TableCell>
                                    <TableCell className="text-center">No</TableCell>
                                    <TableCell className="text-center">
                                      <Checkbox checked={true} disabled />
                                    </TableCell>
                                  </TableRow>
                                )}
                                {child?.feeItems.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                                    <TableCell className="text-center">{item.isOptional ? "Yes" : "No"}</TableCell>
                                    <TableCell className="text-center">
                                      {item.isOptional ? (
                                        <Checkbox
                                          checked={selectedOptionalFees[`${childId}-${item.id}`] || false}
                                          onCheckedChange={(checked) => {
                                            setSelectedOptionalFees((prev) => ({
                                              ...prev,
                                              [`${childId}-${item.id}`]: !!checked,
                                            }))
                                          }}
                                        />
                                      ) : (
                                        <Checkbox checked={true} disabled />
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="bg-muted/30">
                                  <TableCell className="font-medium">Total</TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(
                                      (child?.balanceBroughtForward || 0) +
                                        child?.feeItems
                                          .filter(
                                            (item) => !item.isOptional || selectedOptionalFees[`${childId}-${item.id}`],
                                          )
                                          .reduce((sum, item) => sum + item.amount, 0) || 0,
                                    )}
                                  </TableCell>
                                  <TableCell colSpan={2}></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TabsContent>
                        )
                      })}
                    </Tabs>

                    <div className="border rounded-md p-4 bg-muted/30">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Grand Total</h4>
                        <span className="font-bold text-lg">
                          {formatCurrency(
                            selectedChildren.reduce((total, childId) => {
                              const child = getStudent(childId)
                              if (!child) return total

                              return (
                                total +
                                (child.balanceBroughtForward || 0) +
                                child.feeItems
                                  .filter((item) => !item.isOptional || selectedOptionalFees[`${childId}-${item.id}`])
                                  .reduce((sum, item) => sum + item.amount, 0)
                              )
                            }, 0),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Payment Date */}
            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <Input
                id="payment-date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>

            {/* Credit Application */}
            {((collectionType === "student" && selectedStudent) ||
              (collectionType === "parent" && selectedParent && selectedChildren.length > 0)) &&
              getAvailableCredit() > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="apply-credit" className="flex items-center cursor-pointer">
                        <CreditIcon className="h-4 w-4 mr-2" />
                        Apply Credit
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Apply existing credit balance to this payment</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch id="apply-credit" checked={applyCredit} onCheckedChange={setApplyCredit} />
                  </div>

                  {applyCredit && (
                    <div className="pl-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="credit-amount">Credit Amount to Apply</Label>
                        <span className="text-sm text-muted-foreground">
                          Available: {formatCurrency(getAvailableCredit())}
                        </span>
                      </div>
                      <Input
                        id="credit-amount"
                        type="number"
                        placeholder="Enter credit amount to apply"
                        value={creditToApply}
                        onChange={(e) => setCreditToApply(e.target.value)}
                        max={getAvailableCredit()}
                      />
                      {errors.credit && <p className="text-sm text-red-500">{errors.credit}</p>}
                    </div>
                  )}
                </div>
              )}

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Payment Details</h3>

              {/* Payment Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={applyCredit && Number(creditToApply) >= getOutstandingBalance()}
                />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
              </div>

              {/* Payment Method */}
              {(!applyCredit || Number(amount) > 0) && (
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <RadioGroup
                    id="payment-method"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    {mockData.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <RadioGroupItem className="flex items-center space-x-2" value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center cursor-pointer">
                          {getPaymentMethodIcon(method.id)}
                          {method.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}
                </div>
              )}

              {/* Bank Selection (for bank transfer) */}
              {paymentMethod === "bank-transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger id="bank">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockData.banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bank && <p className="text-sm text-red-500">{errors.bank}</p>}
                </div>
              )}

              {/* Reference Number (for bank transfer) */}
              {paymentMethod === "bank-transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input
                    id="reference"
                    placeholder="Enter bank transfer reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                  {errors.reference && <p className="text-sm text-red-500">{errors.reference}</p>}
                </div>
              )}
            </div>

            <Separator />

            {/* Additional Services */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Additional Services</h3>

              {/* Extra Curricular Clubs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="extra-curricular">Extra Curricular Clubs</Label>
                  <Switch
                    id="extra-curricular"
                    checked={includeExtraCurricular}
                    onCheckedChange={setIncludeExtraCurricular}
                  />
                </div>

                {includeExtraCurricular && (
                  <div className="pl-6 space-y-4 mt-2">
                    <Tabs defaultValue={clubsByDayAndTime[0]?.day || "Monday"} className="w-full">
                      <TabsList className="w-full">
                        {clubsByDayAndTime.map(({ day }) => (
                          <TabsTrigger key={day} value={day} className="flex-1">
                            {day}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {clubsByDayAndTime.map(({ day, timeSlots }) => (
                        <TabsContent key={day} value={day} className="mt-2">
                          {Object.entries(timeSlots).map(([timeSlot, clubs]) => (
                            <Collapsible key={timeSlot} className="mb-4 border rounded-md">
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span className="font-medium">{timeSlot}</span>
                                </div>
                                {selectedClubs[`${day}-${timeSlot}`] && (
                                  <Badge variant="outline" className="ml-2">
                                    {
                                      mockData.extraCurricularClubs.find(
                                        (c) => c.id === selectedClubs[`${day}-${timeSlot}`],
                                      )?.name
                                    }
                                  </Badge>
                                )}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-3 border-t">
                                <RadioGroup
                                  value={selectedClubs[`${day}-${timeSlot}`] || ""}
                                  onValueChange={(value) => handleClubSelection(day, timeSlot, value)}
                                >
                                  {clubs.map((club) => (
                                    <div key={club.id} className="flex items-center justify-between py-2">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={club.id} id={`club-${club.id}`} />
                                        <Label htmlFor={`club-${club.id}`} className="cursor-pointer">
                                          {club.name}
                                        </Label>
                                      </div>
                                      <span>{formatCurrency(club.fee)}</span>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </TabsContent>
                      ))}
                    </Tabs>
                    {errors.clubs && <p className="text-sm text-red-500">{errors.clubs}</p>}
                  </div>
                )}
              </div>

              {/* Hot Lunch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hot-lunch">Hot Lunch</Label>
                  <Switch id="hot-lunch" checked={includeHotLunch} onCheckedChange={setIncludeHotLunch} />
                </div>

                {includeHotLunch && (
                  <div className="pl-6 space-y-2 mt-2">
                    <Select value={selectedLunchOption} onValueChange={setSelectedLunchOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lunch option" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockData.hotLunchOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} - {formatCurrency(option.fee)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.lunch && <p className="text-sm text-red-500">{errors.lunch}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Fee Allocation */}
            {(Number(amount) > 0 || (applyCredit && Number(creditToApply) > 0)) && feeAllocation.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Fee Allocation</h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="manual-allocation" className="text-sm">
                      Manual Allocation
                    </Label>
                    <Switch id="manual-allocation" checked={manualAllocation} onCheckedChange={setManualAllocation} />
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Item</TableHead>
                        <TableHead className="text-right">Fee Amount</TableHead>
                        <TableHead className="text-right">Amount Allocated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeAllocation.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                          <TableCell className="text-right">
                            {manualAllocation ? (
                              <Input
                                type="number"
                                value={manualAllocations[index.toString()] || "0"}
                                onChange={(e) => handleManualAllocationChange(index, e.target.value)}
                                className="w-24 ml-auto text-right"
                              />
                            ) : (
                              formatCurrency(item.amount)
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium">Total</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(feeAllocation.reduce((sum, item) => sum + item.amount, 0))}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {manualAllocation ? (
                            <div
                              className={`${
                                Math.abs(
                                  calculateManualTotal() -
                                    (Number(amount) +
                                      (applyCredit ? Math.min(Number(creditToApply) || 0, getAvailableCredit()) : 0)),
                                ) > 0.01
                                  ? "text-red-500"
                                  : ""
                              }`}
                            >
                              {formatCurrency(calculateManualTotal())}
                            </div>
                          ) : (
                            formatCurrency(feeAllocation.reduce((sum, item) => sum + item.amount, 0))
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {manualAllocation && errors.allocation && <p className="text-sm text-red-500">{errors.allocation}</p>}

                {manualAllocation && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Reset to automatic allocation
                        const initialManualAllocations: { [key: string]: string } = {}
                        feeAllocation.forEach((item, index) => {
                          initialManualAllocations[index.toString()] = item.amount.toString()
                        })
                        setManualAllocations(initialManualAllocations)
                      }}
                    >
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Reset Allocation
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Carried Forward Summary */}
            {(Number(amount) > 0 || (applyCredit && Number(creditToApply) > 0)) && (
              <Card className="bg-muted/30">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">After Payment</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Outstanding Carried Forward</p>
                      <p className="font-medium text-red-500">{formatCurrency(outstandingCarriedForward)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Credit Carried Forward</p>
                      <p className="font-medium text-green-600">{formatCurrency(creditCarriedForward)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Add any additional notes about this payment"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => handleSubmit(true)} disabled={isProcessing}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit(false)} disabled={isProcessing}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing..." : "Submit Payment"}
          </Button>
        </CardFooter>
      </Card>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ReceiptIcon className="h-5 w-5 mr-2" />
              Payment Receipt
            </DialogTitle>
          </DialogHeader>
          {receiptData && <Receipt {...receiptData} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
