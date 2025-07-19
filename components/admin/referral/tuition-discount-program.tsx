"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Edit, AlertCircle, CheckCircle2, Percent, DollarSign } from "lucide-react"

export function TuitionDiscountProgram() {
  const [programTitle, setProgramTitle] = useState("")
  const [programDescription, setProgramDescription] = useState("")
  const [eligibleUserTypes, setEligibleUserTypes] = useState({
    parent: true,
    staff: true,
    student: false,
    alumni: false,
  })

  const [userTypeDetails, setUserTypeDetails] = useState({
    parent: { newOnly: false, existingOnly: false, both: true },
    staff: { newOnly: false, existingOnly: false, both: true },
    student: { newOnly: true, existingOnly: false, both: false },
    alumni: { newOnly: false, existingOnly: false, both: true },
  })

  const [discountType, setDiscountType] = useState("percentage") // or "fixed"
  const [discountValue, setDiscountValue] = useState(10) // percentage or amount
  const [minReferrals, setMinReferrals] = useState(3)
  const [expiryPeriod, setExpiryPeriod] = useState("none")
  const [autoApply, setAutoApply] = useState(true)
  const [selectedFeeHeads, setSelectedFeeHeads] = useState<string[]>(["Tuition Fee"])
  const [showFeeHeadSelector, setShowFeeHeadSelector] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingProgram, setEditingProgram] = useState<any>(null)

  // Mock fee heads for selection
  const feeHeads = [
    "Tuition Fee",
    "Development Levy",
    "Technology Fee",
    "Library Fee",
    "Sports Fee",
    "Laboratory Fee",
    "Examination Fee",
    "Transportation Fee",
  ]

  // Active programs - these would normally come from an API
  const [activePrograms, setActivePrograms] = useState([
    {
      id: 1,
      title: "Parent Referral Tuition Discount",
      userType: "Parent",
      minReferrals: 2,
      discountType: "Percentage",
      discountValue: "10%",
      feeHeads: ["Tuition Fee"],
      expiry: "Session",
      status: "Active",
      description: "10% discount on tuition fees for parents who refer new students",
    },
    {
      id: 2,
      title: "Staff Tuition Benefit",
      userType: "Staff",
      minReferrals: 1,
      discountType: "Fixed",
      discountValue: "₦25,000",
      feeHeads: ["All Fees"],
      expiry: "None",
      status: "Active",
      description: "Fixed discount for staff members who refer new students",
    },
    {
      id: 3,
      title: "Student Referral Reward",
      userType: "Student",
      minReferrals: 3,
      discountType: "Percentage",
      discountValue: "5%",
      feeHeads: ["Tuition Fee", "Development Levy"],
      expiry: "Term",
      status: "Inactive",
      description: "Discount for students who bring in new enrollments",
    },
  ])

  const toggleFeeHead = (feeHead: string) => {
    setSelectedFeeHeads(
      selectedFeeHeads.includes(feeHead)
        ? selectedFeeHeads.filter((h) => h !== feeHead)
        : [...selectedFeeHeads, feeHead],
    )
  }

  const selectAllFeeHeads = () => {
    setSelectedFeeHeads([...feeHeads])
  }

  const unselectAllFeeHeads = () => {
    setSelectedFeeHeads([])
  }

  const confirmDeleteProgram = (id: number) => {
    setProgramToDelete(id)
    setShowDeleteConfirm(true)
  }

  const deleteProgram = () => {
    if (programToDelete) {
      setActivePrograms(activePrograms.filter((program) => program.id !== programToDelete))
      setShowDeleteConfirm(false)
      setProgramToDelete(null)
    }
  }

  const editProgram = (program: any) => {
    setEditingProgram(program)
    setShowEditDialog(true)
  }

  const saveEditedProgram = () => {
    if (editingProgram) {
      setActivePrograms(activePrograms.map((program) => (program.id === editingProgram.id ? editingProgram : program)))
      setShowEditDialog(false)
      setEditingProgram(null)
    }
  }

  const toggleProgramStatus = (id: number) => {
    setActivePrograms(
      activePrograms.map((program) =>
        program.id === id ? { ...program, status: program.status === "Active" ? "Inactive" : "Active" } : program,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Program</TabsTrigger>
          <TabsTrigger value="active">Active Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Tuition Discount Referral Program</CardTitle>
              <CardDescription>Configure tuition discount referral programs for different user types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="program-title">Program Title</Label>
                  <Input
                    id="program-title"
                    placeholder="e.g. Parent Referral Tuition Discount"
                    value={programTitle}
                    onChange={(e) => setProgramTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-description">Program Description</Label>
                  <Textarea
                    id="program-description"
                    placeholder="Brief description of the program"
                    className="min-h-[80px]"
                    value={programDescription}
                    onChange={(e) => setProgramDescription(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Eligible User Types</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(eligibleUserTypes).map(([type, enabled]) => (
                    <Card key={type} className={`border ${enabled ? "border-primary" : "border-input"}`}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base capitalize">{type}</CardTitle>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => {
                              setEligibleUserTypes({
                                ...eligibleUserTypes,
                                [type]: checked,
                              })
                            }}
                          />
                        </div>
                      </CardHeader>
                      {enabled && (
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2 pt-2">
                            <Label className="text-xs">Eligibility</Label>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${type}-new-only`}
                                  checked={userTypeDetails[type as keyof typeof userTypeDetails].newOnly}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setUserTypeDetails({
                                        ...userTypeDetails,
                                        [type]: { newOnly: true, existingOnly: false, both: false },
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={`${type}-new-only`} className="text-xs">
                                  New Only
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${type}-existing-only`}
                                  checked={userTypeDetails[type as keyof typeof userTypeDetails].existingOnly}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setUserTypeDetails({
                                        ...userTypeDetails,
                                        [type]: { newOnly: false, existingOnly: true, both: false },
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={`${type}-existing-only`} className="text-xs">
                                  Existing Only
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${type}-both`}
                                  checked={userTypeDetails[type as keyof typeof userTypeDetails].both}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setUserTypeDetails({
                                        ...userTypeDetails,
                                        [type]: { newOnly: false, existingOnly: false, both: true },
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={`${type}-both`} className="text-xs">
                                  Both
                                </Label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reward Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Discount Type</Label>
                    <Select value={discountType} onValueChange={setDiscountType}>
                      <SelectTrigger id="discount-type">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount-value">
                      {discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (₦)"}
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {discountType === "percentage" ? (
                          <Percent className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <Input
                        id="discount-value"
                        type="number"
                        min="0"
                        className="pl-10"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                {discountType === "percentage" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Applicable Fee Heads</Label>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={selectAllFeeHeads}>
                          Select All
                        </Button>
                        <Button variant="outline" size="sm" onClick={unselectAllFeeHeads}>
                          Unselect All
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {feeHeads.map((feeHead) => (
                        <div key={feeHead} className="flex items-center space-x-2">
                          <Checkbox
                            id={`fee-head-${feeHead}`}
                            checked={selectedFeeHeads.includes(feeHead)}
                            onCheckedChange={() => toggleFeeHead(feeHead)}
                          />
                          <Label htmlFor={`fee-head-${feeHead}`}>{feeHead}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reward Conditions</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min-referrals">Minimum Referrals Required</Label>
                    <Input
                      id="min-referrals"
                      type="number"
                      min="1"
                      value={minReferrals}
                      onChange={(e) => setMinReferrals(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-period">Expiry Period</Label>
                    <Select value={expiryPeriod} onValueChange={setExpiryPeriod}>
                      <SelectTrigger id="expiry-period">
                        <SelectValue placeholder="Select expiry period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Expiry</SelectItem>
                        <SelectItem value="term">Every Term</SelectItem>
                        <SelectItem value="session">Every Session</SelectItem>
                        <SelectItem value="2sessions">Every 2 Sessions</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      If set, referrals that don't meet the minimum count by this period will be reset
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-apply" checked={autoApply} onCheckedChange={setAutoApply} />
                    <Label htmlFor="auto-apply">Auto-apply to first child's bill</Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    If disabled, parents can choose which child to apply the discount to
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset form
                  setProgramTitle("")
                  setProgramDescription("")
                  setDiscountValue(10)
                  setMinReferrals(3)
                  setExpiryPeriod("none")
                  setAutoApply(true)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Validate form
                  if (!programTitle) {
                    alert("Please enter a program title")
                    return
                  }

                  // Check if at least one user type is selected
                  if (!Object.values(eligibleUserTypes).some((value) => value)) {
                    alert("Please select at least one eligible user type")
                    return
                  }

                  // Generate a new ID (in a real app, this would come from the backend)
                  const newId = Math.max(...activePrograms.map((p) => p.id)) + 1

                  // Create the new program object
                  const newProgram = {
                    id: newId,
                    title: programTitle,
                    userType:
                      Object.keys(eligibleUserTypes).find(
                        (type) => eligibleUserTypes[type as keyof typeof eligibleUserTypes],
                      ) || "Parent",
                    minReferrals: minReferrals,
                    discountType: discountType === "percentage" ? "Percentage" : "Fixed",
                    discountValue:
                      discountType === "percentage" ? `${discountValue}%` : `₦${discountValue.toLocaleString()}`,
                    feeHeads:
                      discountType === "percentage"
                        ? selectedFeeHeads.length > 0
                          ? selectedFeeHeads
                          : ["All Fees"]
                        : ["All Fees"],
                    expiry:
                      expiryPeriod === "none" ? "None" : expiryPeriod.charAt(0).toUpperCase() + expiryPeriod.slice(1),
                    status: "Active",
                    description: programDescription || `Discount for users who refer new students`,
                  }

                  // Add the new program to the list
                  setActivePrograms([...activePrograms, newProgram])

                  // Reset form fields
                  setProgramTitle("")
                  setProgramDescription("")
                  setDiscountValue(10)
                  setMinReferrals(3)
                  setExpiryPeriod("none")
                  setAutoApply(true)

                  // Show success message (in a real app, you would use a toast notification)
                  alert("Program created successfully!")
                }}
              >
                Create Program
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Tuition Discount Programs</CardTitle>
                <CardDescription>Manage existing tuition discount referral programs</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Program
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Title</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Min. Referrals</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Fee Heads</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activePrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.title}</TableCell>
                      <TableCell>{program.userType}</TableCell>
                      <TableCell>{program.minReferrals}</TableCell>
                      <TableCell>{program.discountValue}</TableCell>
                      <TableCell>
                        {program.feeHeads.length > 1
                          ? `${program.feeHeads[0]} +${program.feeHeads.length - 1}`
                          : program.feeHeads[0]}
                      </TableCell>
                      <TableCell>{program.expiry}</TableCell>
                      <TableCell>
                        <Badge className={program.status === "Active" ? "bg-green-500" : "bg-slate-500"}>
                          {program.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleProgramStatus(program.id)}
                            title={program.status === "Active" ? "Deactivate" : "Activate"}
                          >
                            {program.status === "Active" ? (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => editProgram(program)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => confirmDeleteProgram(program.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this referral program. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProgram} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Program Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tuition Discount Program</DialogTitle>
            <DialogDescription>Update the details of this referral program</DialogDescription>
          </DialogHeader>
          {editingProgram && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Program Title</Label>
                <Input
                  id="edit-title"
                  value={editingProgram.title}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProgram.description}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-min-referrals">Min. Referrals</Label>
                  <Input
                    id="edit-min-referrals"
                    type="number"
                    min="1"
                    value={editingProgram.minReferrals}
                    onChange={(e) =>
                      setEditingProgram({ ...editingProgram, minReferrals: Number.parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-expiry">Expiry</Label>
                  <Select
                    value={
                      editingProgram.expiry.toLowerCase() === "none" ? "none" : editingProgram.expiry.toLowerCase()
                    }
                    onValueChange={(value) =>
                      setEditingProgram({
                        ...editingProgram,
                        expiry: value === "none" ? "None" : value.charAt(0).toUpperCase() + value.slice(1),
                      })
                    }
                  >
                    <SelectTrigger id="edit-expiry">
                      <SelectValue placeholder="Select expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="term">Term</SelectItem>
                      <SelectItem value="session">Session</SelectItem>
                      <SelectItem value="2sessions">2 Sessions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-discount-value">Discount Value</Label>
                <Input
                  id="edit-discount-value"
                  value={editingProgram.discountValue.replace(/[^\d%]/g, "")}
                  onChange={(e) => {
                    const value = e.target.value
                    const isPercentage = editingProgram.discountType === "Percentage"
                    const formattedValue = isPercentage ? `${value}%` : `₦${Number.parseInt(value).toLocaleString()}`
                    setEditingProgram({ ...editingProgram, discountValue: formattedValue })
                  }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedProgram}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fee Head Selection Dialog */}
      <Dialog open={showFeeHeadSelector} onOpenChange={setShowFeeHeadSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Fee Heads</DialogTitle>
            <DialogDescription>Choose which fee heads the discount will apply to</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between mb-2">
              <Button variant="outline" size="sm" onClick={selectAllFeeHeads}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={unselectAllFeeHeads}>
                Unselect All
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {feeHeads.map((feeHead) => (
                <div key={feeHead} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dialog-fee-head-${feeHead}`}
                    checked={selectedFeeHeads.includes(feeHead)}
                    onCheckedChange={() => toggleFeeHead(feeHead)}
                  />
                  <Label htmlFor={`dialog-fee-head-${feeHead}`}>{feeHead}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowFeeHeadSelector(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
