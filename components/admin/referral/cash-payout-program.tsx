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
import { Plus, Trash2, Edit, AlertCircle, CheckCircle2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function CashPayoutProgram() {
  const [userTypes, setUserTypes] = useState({
    parent: true,
    staff: true,
    student: false,
    alumni: true,
  })

  const [variablePayout, setVariablePayout] = useState({
    parent: false,
    staff: false,
    student: false,
    alumni: false,
  })

  const [payoutDetails, setPayoutDetails] = useState({
    parent: { minReferrals: 3, amount: 15000, expiry: "none" },
    staff: { minReferrals: 3, amount: 15000, expiry: "term" },
    student: { minReferrals: 5, amount: 10000, expiry: "session" },
    alumni: { minReferrals: 4, amount: 20000, expiry: "none" },
  })

  const [programTitle, setProgramTitle] = useState("")
  const [programDescription, setProgramDescription] = useState("")

  const [selectedTab, setSelectedTab] = useState("parent")
  const [showNewScheduleDialog, setShowNewScheduleDialog] = useState(false)
  const [newScheduleItem, setNewScheduleItem] = useState({ referrals: 0, amount: 0 })
  const [currentUserType, setCurrentUserType] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingProgram, setEditingProgram] = useState<any>(null)

  // Variable payout schedules - these would normally be dynamically managed
  const [payoutSchedules, setPayoutSchedules] = useState({
    parent: [
      { referrals: 3, amount: 15000 },
      { referrals: 5, amount: 30000 },
      { referrals: 10, amount: 75000 },
    ],
    staff: [
      { referrals: 3, amount: 15000 },
      { referrals: 5, amount: 30000 },
      { referrals: 10, amount: 75000 },
    ],
    student: [
      { referrals: 3, amount: 10000 },
      { referrals: 5, amount: 20000 },
      { referrals: 8, amount: 40000 },
    ],
    alumni: [
      { referrals: 3, amount: 15000 },
      { referrals: 5, amount: 30000 },
      { referrals: 8, amount: 60000 },
    ],
  })

  // Active programs - these would normally come from an API
  const [activePrograms, setActivePrograms] = useState([
    {
      id: 1,
      title: "Parent Referral Bonus Q1 2023",
      userType: "Parent",
      minReferrals: 3,
      amount: "₦15,000",
      expiry: "None",
      status: "Active",
      variable: true,
      description: "Cash payout for parents who refer new students",
    },
    {
      id: 2,
      title: "Staff Referral Program 2023",
      userType: "Staff",
      minReferrals: 3,
      amount: "₦15,000",
      expiry: "Term",
      status: "Active",
      variable: false,
      description: "Incentive program for staff members who refer new students",
    },
    {
      id: 3,
      title: "Alumni Referral Initiative",
      userType: "Alumni",
      minReferrals: 4,
      amount: "₦20,000",
      expiry: "None",
      status: "Active",
      variable: true,
      description: "Rewards for alumni who help grow our school community",
    },
    {
      id: 4,
      title: "Student Referral Bonus",
      userType: "Student",
      minReferrals: 5,
      amount: "₦10,000",
      expiry: "Session",
      status: "Inactive",
      variable: false,
      description: "Program for students to earn by referring friends",
    },
  ])

  const handleAddScheduleItem = (userType: string) => {
    setCurrentUserType(userType)
    setNewScheduleItem({ referrals: 0, amount: 0 })
    setShowNewScheduleDialog(true)
  }

  const saveNewScheduleItem = () => {
    if (newScheduleItem.referrals > 0 && newScheduleItem.amount > 0) {
      setPayoutSchedules({
        ...payoutSchedules,
        [currentUserType]: [...payoutSchedules[currentUserType as keyof typeof payoutSchedules], newScheduleItem].sort(
          (a, b) => a.referrals - b.referrals,
        ),
      })
      setShowNewScheduleDialog(false)
    }
  }

  const removeScheduleItem = (userType: string, index: number) => {
    const newSchedule = [...payoutSchedules[userType as keyof typeof payoutSchedules]]
    newSchedule.splice(index, 1)
    setPayoutSchedules({
      ...payoutSchedules,
      [userType]: newSchedule,
    })
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
      <Tabs defaultValue="create" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="create">Create Program</TabsTrigger>
          <TabsTrigger value="active">Active Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Cash Payout Referral Program</CardTitle>
              <CardDescription>Configure cash payout referral programs for different user types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="program-title">Program Title</Label>
                  <Input
                    id="program-title"
                    placeholder="e.g. Q1 2023 Referral Cash Payout Program"
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

              <div className="space-y-2">
                <Label>Eligible User Types</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parent"
                      checked={userTypes.parent}
                      onCheckedChange={(checked) => setUserTypes({ ...userTypes, parent: checked === true })}
                    />
                    <Label htmlFor="parent">Parents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="staff"
                      checked={userTypes.staff}
                      onCheckedChange={(checked) => setUserTypes({ ...userTypes, staff: checked === true })}
                    />
                    <Label htmlFor="staff">Staff</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="student"
                      checked={userTypes.student}
                      onCheckedChange={(checked) => setUserTypes({ ...userTypes, student: checked === true })}
                    />
                    <Label htmlFor="student">Students</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="alumni"
                      checked={userTypes.alumni}
                      onCheckedChange={(checked) => setUserTypes({ ...userTypes, alumni: checked === true })}
                    />
                    <Label htmlFor="alumni">Alumni</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="parent" disabled={!userTypes.parent}>
                    Parents
                  </TabsTrigger>
                  <TabsTrigger value="staff" disabled={!userTypes.staff}>
                    Staff
                  </TabsTrigger>
                  <TabsTrigger value="student" disabled={!userTypes.student}>
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="alumni" disabled={!userTypes.alumni}>
                    Alumni
                  </TabsTrigger>
                </TabsList>

                {Object.keys(userTypes).map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`min-referrals-${type}`}>Minimum Referrals Required</Label>
                          <Input
                            id={`min-referrals-${type}`}
                            type="number"
                            min="1"
                            value={payoutDetails[type as keyof typeof payoutDetails].minReferrals}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value) || 1
                              setPayoutDetails({
                                ...payoutDetails,
                                [type]: {
                                  ...payoutDetails[type as keyof typeof payoutDetails],
                                  minReferrals: value,
                                },
                              })
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`expiry-${type}`}>Expiry Period</Label>
                          <Select
                            value={payoutDetails[type as keyof typeof payoutDetails].expiry}
                            onValueChange={(value) => {
                              setPayoutDetails({
                                ...payoutDetails,
                                [type]: {
                                  ...payoutDetails[type as keyof typeof payoutDetails],
                                  expiry: value,
                                },
                              })
                            }}
                          >
                            <SelectTrigger id={`expiry-${type}`}>
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

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`variable-payout-${type}`}
                          checked={variablePayout[type as keyof typeof variablePayout]}
                          onCheckedChange={(checked) => {
                            setVariablePayout({
                              ...variablePayout,
                              [type]: checked,
                            })
                          }}
                        />
                        <Label htmlFor={`variable-payout-${type}`}>Variable Payout Schedule</Label>
                      </div>

                      {!variablePayout[type as keyof typeof variablePayout] ? (
                        <div className="space-y-2">
                          <Label htmlFor={`fixed-amount-${type}`}>Payout Amount (₦)</Label>
                          <Input
                            id={`fixed-amount-${type}`}
                            type="number"
                            min="0"
                            value={payoutDetails[type as keyof typeof payoutDetails].amount}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value) || 0
                              setPayoutDetails({
                                ...payoutDetails,
                                [type]: {
                                  ...payoutDetails[type as keyof typeof payoutDetails],
                                  amount: value,
                                },
                              })
                            }}
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Variable Payout Schedule</Label>
                            <Button variant="outline" size="sm" onClick={() => handleAddScheduleItem(type)}>
                              <Plus className="mr-1 h-3.5 w-3.5" /> Add Level
                            </Button>
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Referrals</TableHead>
                                <TableHead>Amount (₦)</TableHead>
                                <TableHead className="w-16"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {payoutSchedules[type as keyof typeof payoutSchedules].map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.referrals}</TableCell>
                                  <TableCell>{item.amount.toLocaleString()}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => removeScheduleItem(type, index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedTab("active")}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Generate a new ID (in a real app, this would come from the backend)
                  const newId = Math.max(...activePrograms.map((p) => p.id)) + 1

                  // Create the new program object
                  const newProgram = {
                    id: newId,
                    title: programTitle || "New Cash Payout Program",
                    userType:
                      Object.keys(userTypes).find((type) => userTypes[type as keyof typeof userTypes]) || "Parent",
                    minReferrals: payoutDetails[selectedTab as keyof typeof payoutDetails].minReferrals,
                    amount: `₦${payoutDetails[selectedTab as keyof typeof payoutDetails].amount.toLocaleString()}`,
                    expiry:
                      payoutDetails[selectedTab as keyof typeof payoutDetails].expiry === "none"
                        ? "None"
                        : payoutDetails[selectedTab as keyof typeof payoutDetails].expiry.charAt(0).toUpperCase() +
                          payoutDetails[selectedTab as keyof typeof payoutDetails].expiry.slice(1),
                    status: "Active",
                    variable: variablePayout[selectedTab as keyof typeof variablePayout],
                    description: programDescription || `Cash payout for ${selectedTab}s who refer new students`,
                  }

                  // Add the new program to the list
                  setActivePrograms([...activePrograms, newProgram])

                  // Reset form fields
                  setProgramTitle("")
                  setProgramDescription("")

                  // Switch to the active programs tab
                  setSelectedTab("parent")

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
                <CardTitle>Active Cash Payout Programs</CardTitle>
                <CardDescription>Manage existing cash payout referral programs</CardDescription>
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
                    <TableHead>Amount</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Variable</TableHead>
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
                      <TableCell>{program.amount}</TableCell>
                      <TableCell>{program.expiry}</TableCell>
                      <TableCell>{program.variable ? "Yes" : "No"}</TableCell>
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

      {/* Add New Schedule Item Dialog */}
      <Dialog open={showNewScheduleDialog} onOpenChange={setShowNewScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payout Level</DialogTitle>
            <DialogDescription>Define a new referral level and its corresponding payout amount</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="referrals-required">Referrals Required</Label>
              <Input
                id="referrals-required"
                type="number"
                min="1"
                value={newScheduleItem.referrals}
                onChange={(e) =>
                  setNewScheduleItem({ ...newScheduleItem, referrals: Number.parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payout-amount">Payout Amount (₦)</Label>
              <Input
                id="payout-amount"
                type="number"
                min="0"
                value={newScheduleItem.amount}
                onChange={(e) =>
                  setNewScheduleItem({ ...newScheduleItem, amount: Number.parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewScheduleItem}>Add Level</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <DialogTitle>Edit Referral Program</DialogTitle>
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
                    value={editingProgram.expiry.toLowerCase()}
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-variable"
                    checked={editingProgram.variable}
                    onCheckedChange={(checked) => setEditingProgram({ ...editingProgram, variable: checked })}
                  />
                  <Label htmlFor="edit-variable">Variable Payout</Label>
                </div>
              </div>
              {!editingProgram.variable && (
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount (₦)</Label>
                  <Input
                    id="edit-amount"
                    value={editingProgram.amount.replace(/[^\d]/g, "")}
                    onChange={(e) =>
                      setEditingProgram({
                        ...editingProgram,
                        amount: `₦${Number.parseInt(e.target.value).toLocaleString()}`,
                      })
                    }
                  />
                </div>
              )}
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
    </div>
  )
}
