"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Plus, Trash } from "lucide-react"

// Mock data for fee heads
const mockFeeHeads = [
  {
    id: 1,
    name: "Tuition Fee",
    description: "Regular monthly tuition fee",
    amount: 5000,
    frequency: "Monthly",
    defaultBank: "gtb",
    generalLedger: "FEE-INCOME-001",
    isOptional: false,
    isActive: true,
  },
  {
    id: 2,
    name: "Library Fee",
    description: "Access to library resources",
    amount: 1000,
    frequency: "Term",
    defaultBank: "access",
    generalLedger: "FEE-INCOME-002",
    isOptional: false,
    isActive: true,
  },
  {
    id: 3,
    name: "Sports Fee",
    description: "For sports equipment and activities",
    amount: 1500,
    frequency: "Term",
    defaultBank: "",
    generalLedger: "FEE-INCOME-003",
    isOptional: true,
    isActive: true,
  },
  {
    id: 4,
    name: "Computer Lab Fee",
    description: "Access to computer lab and resources",
    amount: 2000,
    frequency: "Term",
    defaultBank: "",
    generalLedger: "FEE-INCOME-004",
    isOptional: false,
    isActive: true,
  },
  {
    id: 5,
    name: "Science Lab Fee",
    description: "For science lab equipment and materials",
    amount: 1800,
    frequency: "Term",
    defaultBank: "",
    generalLedger: "FEE-INCOME-005",
    isOptional: false,
    isActive: true,
  },
  {
    id: 6,
    name: "Art Supplies",
    description: "Art materials and supplies",
    amount: 1200,
    frequency: "Term",
    defaultBank: "",
    generalLedger: "FEE-INCOME-006",
    isOptional: true,
    isActive: false,
  },
]

const getBankName = (bankCode: string) => {
  const banks = {
    access: "Access Bank",
    gtb: "Guaranty Trust Bank",
    zenith: "Zenith Bank",
    firstbank: "First Bank",
    uba: "United Bank for Africa",
  }
  return banks[bankCode as keyof typeof banks] || bankCode
}

export function FeeHead() {
  const [feeHeads, setFeeHeads] = useState(mockFeeHeads)
  const [newFeeHead, setNewFeeHead] = useState({
    name: "",
    description: "",
    amount: 0,
    frequency: "Monthly",
    defaultBank: "",
    generalLedger: "",
    isOptional: false,
    isActive: true,
  })
  const [editingFeeHead, setEditingFeeHead] = useState<null | typeof newFeeHead>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingFeeTerm, setEditingFeeTerm] = useState<null | typeof newFeeHead>(null)
  const [selectedTab, setSelectedTab] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Optimize FeeHead component with memoization and performance improvements

  // 1. Add useMemo for filtered fee heads
  const filteredFeeHeads = useMemo(() => {
    if (selectedTab === "all") return feeHeads
    return feeHeads.filter((feeHead) => (selectedTab === "active" ? feeHead.isActive : !feeHead.isActive))
  }, [feeHeads, selectedTab])

  // 3. Add useCallback for handlers to prevent unnecessary re-renders
  const handleAddFeeHead = useCallback(() => {
    setFeeHeads([...feeHeads, { ...newFeeHead, id: feeHeads.length + 1 }])
    setNewFeeHead({
      name: "",
      description: "",
      amount: 0,
      frequency: "Monthly",
      defaultBank: "",
      generalLedger: "",
      isOptional: false,
      isActive: true,
    })
    setIsAddDialogOpen(false)
  }, [feeHeads, newFeeHead])

  const handleEditFeeHead = useCallback(() => {
    if (editingId !== null && editingFeeHead !== null) {
      setFeeHeads(
        feeHeads.map((feeHead) => (feeHead.id === editingId ? { ...editingFeeHead, id: editingId } : feeHead)),
      )
      setEditingFeeTerm(null)
      setEditingId(null)
      setIsEditDialogOpen(false)
    }
  }, [editingId, editingFeeHead, feeHeads])

  const startEdit = useCallback((feeHead: any) => {
    setEditingFeeHead({ ...feeHead })
    setEditingId(feeHead.id)
    setIsEditDialogOpen(true)
  }, [])

  const handleViewFeeHead = useCallback((feeHead: any) => {
    // Set the viewing fee head and open a view dialog
    setEditingFeeHead({ ...feeHead })
    setIsViewDialogOpen(true)
  }, [])

  const handleDeleteFeeHead = useCallback(
    (id: number) => {
      setFeeHeads(feeHeads.filter((feeHead) => feeHead.id !== id))
    },
    [feeHeads],
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Fee Heads</CardTitle>
          <CardDescription>Manage fee categories and their configurations</CardDescription>
        </div>
        <Button className="ml-auto" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Fee Head
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Fee Heads</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Default Bank</TableHead>
                    <TableHead>General Ledger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeeHeads.map((feeHead) => (
                    <TableRow key={feeHead.id}>
                      <TableCell className="font-medium">{feeHead.name}</TableCell>
                      <TableCell>{feeHead.description}</TableCell>
                      <TableCell>₦{feeHead.amount.toLocaleString()}</TableCell>
                      <TableCell>{feeHead.frequency}</TableCell>
                      <TableCell>{feeHead.defaultBank ? getBankName(feeHead.defaultBank) : "Not set"}</TableCell>
                      <TableCell>{feeHead.generalLedger || "Not assigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {feeHead.isActive ? (
                            <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00]">Active</Badge>
                          ) : (
                            <Badge className="bg-[#8A8D93] bg-opacity-[0.16] text-[#8A8D93]">Inactive</Badge>
                          )}
                          {feeHead.isOptional && (
                            <Badge className="bg-[#16B1FF] bg-opacity-[0.16] text-[#16B1FF]">Optional</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewFeeHead(feeHead)}>
                              <Eye className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startEdit(feeHead)}>
                              <Edit className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteFeeHead(feeHead.id)}>
                              <Trash className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Default Bank</TableHead>
                    <TableHead>General Ledger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeeHeads.map((feeHead) => (
                    <TableRow key={feeHead.id}>
                      <TableCell className="font-medium">{feeHead.name}</TableCell>
                      <TableCell>{feeHead.description}</TableCell>
                      <TableCell>₦{feeHead.amount.toLocaleString()}</TableCell>
                      <TableCell>{feeHead.frequency}</TableCell>
                      <TableCell>{feeHead.defaultBank ? getBankName(feeHead.defaultBank) : "Not set"}</TableCell>
                      <TableCell>{feeHead.generalLedger || "Not assigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00]">Active</Badge>
                          {feeHead.isOptional && (
                            <Badge className="bg-[#16B1FF] bg-opacity-[0.16] text-[#16B1FF]">Optional</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewFeeHead(feeHead)}>
                              <Eye className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startEdit(feeHead)}>
                              <Edit className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteFeeHead(feeHead.id)}>
                              <Trash className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="inactive">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Default Bank</TableHead>
                    <TableHead>General Ledger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeeHeads.map((feeHead) => (
                    <TableRow key={feeHead.id}>
                      <TableCell className="font-medium">{feeHead.name}</TableCell>
                      <TableCell>{feeHead.description}</TableCell>
                      <TableCell>₦{feeHead.amount.toLocaleString()}</TableCell>
                      <TableCell>{feeHead.frequency}</TableCell>
                      <TableCell>{feeHead.defaultBank ? getBankName(feeHead.defaultBank) : "Not set"}</TableCell>
                      <TableCell>{feeHead.generalLedger || "Not assigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#8A8D93] bg-opacity-[0.16] text-[#8A8D93]">Inactive</Badge>
                          {feeHead.isOptional && (
                            <Badge className="bg-[#16B1FF] bg-opacity-[0.16] text-[#16B1FF]">Optional</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewFeeHead(feeHead)}>
                              <Eye className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startEdit(feeHead)}>
                              <Edit className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteFeeHead(feeHead.id)}>
                              <Trash className="mr-2 h-4 w-4 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Fee Head</DialogTitle>
            <DialogDescription>Create a new fee category for your institution.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Fee Name</Label>
              <Input
                id="name"
                value={newFeeHead.name}
                onChange={(e) => setNewFeeHead({ ...newFeeHead, name: e.target.value })}
                placeholder="e.g., Tuition Fee"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newFeeHead.description}
                onChange={(e) => setNewFeeHead({ ...newFeeHead, description: e.target.value })}
                placeholder="Brief description of the fee"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Default Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newFeeHead.amount}
                  onChange={(e) => setNewFeeHead({ ...newFeeHead, amount: Number.parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <select
                  id="frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newFeeHead.frequency}
                  onChange={(e) => setNewFeeHead({ ...newFeeHead, frequency: e.target.value })}
                >
                  <option value="One-time">One-time</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Term">Term</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultBank">Default Bank for Payment Gateway</Label>
              <select
                id="defaultBank"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newFeeHead.defaultBank || ""}
                onChange={(e) => setNewFeeHead({ ...newFeeHead, defaultBank: e.target.value })}
              >
                <option value="">Select a bank</option>
                <option value="access">Access Bank</option>
                <option value="gtb">Guaranty Trust Bank</option>
                <option value="zenith">Zenith Bank</option>
                <option value="firstbank">First Bank</option>
                <option value="uba">United Bank for Africa</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="generalLedger">General Ledger</Label>
              <Input
                id="generalLedger"
                value={newFeeHead.generalLedger}
                onChange={(e) => setNewFeeHead({ ...newFeeHead, generalLedger: e.target.value })}
                placeholder="e.g., FEE-INCOME-001"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="optional"
                checked={newFeeHead.isOptional}
                onCheckedChange={(checked) => setNewFeeHead({ ...newFeeHead, isOptional: checked })}
              />
              <Label htmlFor="optional">Optional Fee (can be opted out)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newFeeHead.isActive}
                onCheckedChange={(checked) => setNewFeeHead({ ...newFeeHead, isActive: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFeeHead}>Save Fee Head</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fee Head</DialogTitle>
            <DialogDescription>Modify the details of this fee head.</DialogDescription>
          </DialogHeader>
          {editingFeeHead && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Fee Name</Label>
                <Input
                  id="edit-name"
                  value={editingFeeHead.name}
                  onChange={(e) => setEditingFeeHead({ ...editingFeeHead, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingFeeHead.description}
                  onChange={(e) => setEditingFeeHead({ ...editingFeeHead, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-amount">Default Amount</Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    value={editingFeeHead.amount}
                    onChange={(e) =>
                      setEditingFeeHead({ ...editingFeeHead, amount: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-frequency">Frequency</Label>
                  <select
                    id="edit-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingFeeHead.frequency}
                    onChange={(e) => setEditingFeeHead({ ...editingFeeHead, frequency: e.target.value })}
                  >
                    <option value="One-time">One-time</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Term">Term</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-defaultBank">Default Bank for Payment Gateway</Label>
                <select
                  id="edit-defaultBank"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editingFeeHead.defaultBank || ""}
                  onChange={(e) => setEditingFeeHead({ ...editingFeeHead, defaultBank: e.target.value })}
                >
                  <option value="">Select a bank</option>
                  <option value="access">Access Bank</option>
                  <option value="gtb">Guaranty Trust Bank</option>
                  <option value="zenith">Zenith Bank</option>
                  <option value="firstbank">First Bank</option>
                  <option value="uba">United Bank for Africa</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-generalLedger">General Ledger</Label>
                <Input
                  id="edit-generalLedger"
                  value={editingFeeHead.generalLedger}
                  onChange={(e) => setEditingFeeHead({ ...editingFeeHead, generalLedger: e.target.value })}
                  placeholder="e.g., FEE-INCOME-001"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-optional"
                  checked={editingFeeHead.isOptional}
                  onCheckedChange={(checked) => setEditingFeeHead({ ...editingFeeHead, isOptional: checked })}
                />
                <Label htmlFor="edit-optional">Optional Fee (can be opted out)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingFeeHead.isActive}
                  onCheckedChange={(checked) => setEditingFeeHead({ ...editingFeeHead, isActive: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFeeHead}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fee Head Details</DialogTitle>
            <DialogDescription>View the details of this fee head.</DialogDescription>
          </DialogHeader>
          {editingFeeHead && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Fee Name</Label>
                  <p className="font-medium">{editingFeeHead.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {editingFeeHead.isActive ? (
                      <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00]">Active</Badge>
                    ) : (
                      <Badge className="bg-[#8A8D93] bg-opacity-[0.16] text-[#8A8D93]">Inactive</Badge>
                    )}
                    {editingFeeHead.isOptional && (
                      <Badge className="bg-[#16B1FF] bg-opacity-[0.16] text-[#16B1FF]">Optional</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <p>{editingFeeHead.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Default Amount</Label>
                  <p className="font-medium">₦{editingFeeHead.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Frequency</Label>
                  <p>{editingFeeHead.frequency}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Default Bank</Label>
                <p>{editingFeeHead.defaultBank ? getBankName(editingFeeHead.defaultBank) : "Not set"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">General Ledger</Label>
                <p>{editingFeeHead.generalLedger || "Not assigned"}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
