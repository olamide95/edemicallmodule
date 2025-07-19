"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

interface FeeOrderItem {
  id: string
  name: string
}

const SortableItem = ({ id, name }: { id: string; name: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center">
        <button className="mr-2 cursor-grab touch-none" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="font-medium">{name}</span>
      </div>
    </div>
  )
}

export function FeeSettings() {
  const [acceptPartialPayment, setAcceptPartialPayment] = useState(false)
  const [newStudentFee, setNewStudentFee] = useState(true)
  const [existingStudentFee, setExistingStudentFee] = useState(true)
  const [allowPerChildSelection, setAllowPerChildSelection] = useState(true)
  const [parentExemptions, setParentExemptions] = useState([
    { id: "p1", name: "John Smith" },
    { id: "p2", name: "Maria Rodriguez" },
  ])
  const [selectedExemptParent, setSelectedExemptParent] = useState("")
  const [partialPaymentItems, setPartialPaymentItems] = useState([
    { id: 1, feeHead: "Tuition Fee", percentage: 70, days: 30 },
  ])
  const [feeOrderItems, setFeeOrderItems] = useState<FeeOrderItem[]>([
    { id: "1", name: "Tuition Fee" },
    { id: "2", name: "Development Fee" },
    { id: "3", name: "Library Fee" },
    { id: "4", name: "Technology Fee" },
  ])

  // Mock data for available parents
  const availableParents = [
    { id: "p3", name: "Ahmed Khan" },
    { id: "p4", name: "Sarah Johnson" },
    { id: "p5", name: "Michael Brown" },
    { id: "p6", name: "Li Wei" },
  ]

  const handleSelectExemptParent = (value) => {
    setSelectedExemptParent(value)
  }

  const addParentExemption = () => {
    if (!selectedExemptParent) return

    const parentToAdd = availableParents.find((p) => p.id === selectedExemptParent)
    if (parentToAdd && !parentExemptions.some((p) => p.id === parentToAdd.id)) {
      setParentExemptions([...parentExemptions, parentToAdd])
      setSelectedExemptParent("")
    }
  }

  const removeParentExemption = (id) => {
    setParentExemptions(parentExemptions.filter((p) => p.id !== id))
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const addPartialPaymentItem = () => {
    const newId = partialPaymentItems.length > 0 ? Math.max(...partialPaymentItems.map((item) => item.id)) + 1 : 1

    setPartialPaymentItems([...partialPaymentItems, { id: newId, feeHead: "", percentage: 50, days: 30 }])
  }

  const removePartialPaymentItem = (id: number) => {
    setPartialPaymentItems(partialPaymentItems.filter((item) => item.id !== id))
  }

  const updatePartialPaymentItem = (id: number, field: string, value: any) => {
    setPartialPaymentItems(partialPaymentItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setFeeOrderItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = [...items]
        const [movedItem] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, movedItem)

        return newItems
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Fee Settings</CardTitle>
          <CardDescription>Define which student types are required to pay fees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-student"
              checked={newStudentFee}
              onCheckedChange={(checked) => setNewStudentFee(checked as boolean)}
            />
            <Label htmlFor="new-student">Mandatory for New Students</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="existing-student"
              checked={existingStudentFee}
              onCheckedChange={(checked) => setExistingStudentFee(checked as boolean)}
            />
            <Label htmlFor="existing-student">Mandatory for Existing Students</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partial Payment Settings</CardTitle>
          <CardDescription>Configure if and how partial payments are accepted</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="accept-partial" checked={acceptPartialPayment} onCheckedChange={setAcceptPartialPayment} />
            <Label htmlFor="accept-partial">Accept Partial Payments</Label>
          </div>

          {acceptPartialPayment && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4 font-medium bg-muted/50">Partial Payment Configuration</div>
                <div className="p-4 space-y-4">
                  {partialPaymentItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5 sm:col-span-5">
                        <Label htmlFor={`fee-head-${item.id}`}>Fee Head</Label>
                        <Select
                          value={item.feeHead}
                          onValueChange={(value) => updatePartialPaymentItem(item.id, "feeHead", value)}
                        >
                          <SelectTrigger id={`fee-head-${item.id}`}>
                            <SelectValue placeholder="Select fee head" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                            <SelectItem value="Development Fee">Development Fee</SelectItem>
                            <SelectItem value="Library Fee">Library Fee</SelectItem>
                            <SelectItem value="Technology Fee">Technology Fee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-3 sm:col-span-3">
                        <Label htmlFor={`percentage-${item.id}`}>Percentage (%)</Label>
                        <Input
                          id={`percentage-${item.id}`}
                          type="number"
                          min="1"
                          max="99"
                          value={item.percentage}
                          onChange={(e) =>
                            updatePartialPaymentItem(item.id, "percentage", Number.parseInt(e.target.value))
                          }
                        />
                      </div>

                      <div className="col-span-3 sm:col-span-3">
                        <Label htmlFor={`days-${item.id}`}>Days to Pay Balance</Label>
                        <Input
                          id={`days-${item.id}`}
                          type="number"
                          min="1"
                          value={item.days}
                          onChange={(e) => updatePartialPaymentItem(item.id, "days", Number.parseInt(e.target.value))}
                        />
                      </div>

                      <div className="col-span-1 flex items-end justify-end">
                        <Button variant="ghost" size="icon" onClick={() => removePartialPaymentItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" className="mt-2" onClick={addPartialPaymentItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Fee Head
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-amber-50 dark:bg-amber-950/30">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Note: The sum of partial payment percentages should not exceed 100%. The system will validate that the
                  final installment date is not earlier than the fine calculation date.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fee Order Payment</CardTitle>
          <CardDescription>Define the priority order for fee payment allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 font-medium bg-muted/50">Payment Allocation Priority</div>
              <div className="p-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={feeOrderItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1">
                      {feeOrderItems.map((item, index) => (
                        <SortableItem key={item.id} id={item.id} name={`${index + 1}. ${item.name}`} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                <p className="text-sm text-muted-foreground mt-4">
                  Drag and drop items to reorder the payment allocation priority.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multi-child Payment Settings</CardTitle>
          <CardDescription>Configure how parents with multiple children can make payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="allow-per-child" checked={allowPerChildSelection} onCheckedChange={setAllowPerChildSelection} />
            <Label htmlFor="allow-per-child">Allow parents to select individual children when making payments</Label>
          </div>

          <div className="text-sm text-muted-foreground">
            When disabled, parents with multiple children must pay for all their children at once.
          </div>

          {!allowPerChildSelection && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4 font-medium bg-muted/50">Parent Exemptions</div>
                <div className="p-4">
                  <p className="mb-2 text-sm">Add parents who are exempt from the all-children payment requirement:</p>

                  <div className="space-y-2 mb-4">
                    {parentExemptions.map((parent, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-md p-2">
                        <span>{parent.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeParentExemption(parent.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Select onValueChange={handleSelectExemptParent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableParents.map((parent) => (
                          <SelectItem key={parent.id} value={parent.id}>
                            {parent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={addParentExemption}>
                      Add Exemption
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
