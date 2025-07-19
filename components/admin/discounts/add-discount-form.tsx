"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Check, ChevronsUpDown, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

// Sample fee heads data
const feeHeads = [
  { id: "tuition", name: "Tuition Fee" },
  { id: "development", name: "Development Levy" },
  { id: "technology", name: "Technology Fee" },
  { id: "sports", name: "Sports Fee" },
  { id: "library", name: "Library Fee" },
  { id: "laboratory", name: "Laboratory Fee" },
  { id: "transport", name: "Transport Fee" },
  { id: "uniform", name: "Uniform Fee" },
  { id: "examination", name: "Examination Fee" },
]

// Sample ledger accounts
const ledgerAccounts = [
  { id: "disc-tuition", name: "Discount - Tuition" },
  { id: "disc-general", name: "Discount - General" },
  { id: "disc-scholarship", name: "Discount - Scholarship" },
  { id: "disc-sibling", name: "Discount - Sibling" },
  { id: "disc-staff", name: "Discount - Staff" },
]

export function AddDiscountForm() {
  // Form state
  const [discountType, setDiscountType] = useState("fixed")
  const [discountCategory, setDiscountCategory] = useState("general")
  const [assignmentType, setAssignmentType] = useState("global")
  const [discountRange, setDiscountRange] = useState("absolute")
  const [isSiblingDiscount, setIsSiblingDiscount] = useState(false)
  const [selectedFeeHeads, setSelectedFeeHeads] = useState<string[]>([])
  const [siblingNumber, setSiblingNumber] = useState("1")
  const [effectiveDate, setEffectiveDate] = useState<Date>()
  const [isActive, setIsActive] = useState(true)
  const [openFeeHeads, setOpenFeeHeads] = useState(false)
  const [openLedger, setOpenLedger] = useState(false)
  const [selectedLedger, setSelectedLedger] = useState("")

  // Handle fee head selection
  const toggleFeeHead = (feeHeadId: string) => {
    setSelectedFeeHeads((current) =>
      current.includes(feeHeadId) ? current.filter((id) => id !== feeHeadId) : [...current, feeHeadId],
    )
  }

  // Remove a fee head from selection
  const removeFeeHead = (feeHeadId: string) => {
    setSelectedFeeHeads((current) => current.filter((id) => id !== feeHeadId))
  }

  // Select all fee heads
  const selectAllFeeHeads = () => {
    setSelectedFeeHeads(feeHeads.map((feeHead) => feeHead.id))
  }

  // Unselect all fee heads
  const unselectAllFeeHeads = () => {
    setSelectedFeeHeads([])
  }

  // Handle discount category change
  const handleDiscountCategoryChange = (value: string) => {
    setDiscountCategory(value)
    setIsSiblingDiscount(value === "sibling")
  }

  // Get fee head name by id
  const getFeeHeadName = (id: string) => {
    return feeHeads.find((feeHead) => feeHead.id === id)?.name || id
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form data here
    console.log("Form submitted")
    // In a real application, you would send this data to your backend
    alert("Discount created successfully!")
  }

  return (
    <Card className="border rounded-md">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Headers */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-medium text-sm uppercase text-foreground">
            <div>Discount Name</div>
            <div>Discount Type</div>
            <div>Discount Assignment Type</div>
            <div>Discount on Fee Heads</div>
            <div>Discount Range</div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {/* Discount Name */}
            <div>
              <Input placeholder="Discount Name" className="w-full" />
              <Textarea placeholder="Description" className="mt-2 h-20 text-sm" />
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <RadioGroup defaultValue={discountType} onValueChange={setDiscountType} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" className="text-[#8c57ff]" />
                  <Label htmlFor="fixed">Fixed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" className="text-[#8c57ff]" />
                  <Label htmlFor="percentage">Percent</Label>
                </div>
              </RadioGroup>
              <Input
                type="number"
                placeholder={discountType === "fixed" ? "Amount" : "Percentage"}
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
                step="0.01"
                className="w-full"
              />
            </div>

            {/* Discount Assignment Type */}
            <div className="space-y-2">
              <RadioGroup defaultValue={assignmentType} onValueChange={setAssignmentType} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="global" id="global" className="text-[#8c57ff]" />
                  <Label htmlFor="global" className="text-sm">
                    Global - All Students in a Fee Term
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="special" id="special" className="text-[#8c57ff]" />
                  <Label htmlFor="special" className="text-sm">
                    Special - Students
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" className="text-[#8c57ff]" />
                  <Label htmlFor="new" className="text-sm">
                    New - Students
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Discount on Fee Heads - Multi-select */}
            <div className="space-y-2">
              <Popover open={openFeeHeads} onOpenChange={setOpenFeeHeads}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openFeeHeads}
                    className="w-full justify-between h-auto min-h-10"
                  >
                    <span className="truncate">
                      {selectedFeeHeads.length > 0 ? (
                        <span className="flex flex-wrap gap-1 max-w-full">
                          {selectedFeeHeads.length <= 2 ? (
                            selectedFeeHeads.map((id) => (
                              <Badge key={id} variant="secondary" className="mr-1 mb-1">
                                {getFeeHeadName(id)}
                              </Badge>
                            ))
                          ) : (
                            <span>{selectedFeeHeads.length} fee heads selected</span>
                          )}
                        </span>
                      ) : (
                        "Nothing selected"
                      )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <div className="flex justify-between p-2 border-b">
                    <Button type="button" variant="ghost" size="sm" onClick={selectAllFeeHeads}>
                      Select All
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={unselectAllFeeHeads}>
                      Unselect All
                    </Button>
                  </div>
                  <Command>
                    <CommandInput placeholder="Search fee heads..." />
                    <CommandList>
                      <CommandEmpty>No fee head found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {feeHeads.map((feeHead) => (
                          <CommandItem
                            key={feeHead.id}
                            value={feeHead.id}
                            onSelect={() => toggleFeeHead(feeHead.id)}
                            className="flex items-center"
                          >
                            <Checkbox
                              checked={selectedFeeHeads.includes(feeHead.id)}
                              onCheckedChange={() => toggleFeeHead(feeHead.id)}
                              className="mr-2 text-[#8c57ff]"
                              id={`fee-${feeHead.id}`}
                            />
                            <Label htmlFor={`fee-${feeHead.id}`} className="flex-1 cursor-pointer">
                              {feeHead.name}
                            </Label>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedFeeHeads.length > 0 && (
                <ScrollArea className="h-20 w-full border rounded-md p-2 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedFeeHeads.map((id) => (
                      <Badge key={id} variant="secondary" className="flex items-center gap-1 mb-1">
                        {getFeeHeadName(id)}
                        <button
                          type="button"
                          onClick={() => removeFeeHead(id)}
                          className="rounded-full h-4 w-4 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {getFeeHeadName(id)}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            {/* Discount Range */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Days</span>
                <div className="relative group">
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-popover text-popover-foreground text-sm rounded-md shadow-md z-50">
                    For Absolute, discount is applied per fee term invoice. For Per Annum, days are divided by 360 per
                    fee term.
                  </div>
                </div>
              </div>
              <RadioGroup defaultValue={discountRange} onValueChange={setDiscountRange} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absolute" id="absolute" className="text-[#8c57ff]" />
                  <Label htmlFor="absolute" className="text-sm">
                    Absolute
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="perAnnum" id="perAnnum" className="text-[#8c57ff]" />
                  <Label htmlFor="perAnnum" className="text-sm">
                    Per Annum
                  </Label>
                </div>
              </RadioGroup>
              <Input type="number" placeholder="Enter Days" min="1" className="w-full" />
            </div>
          </div>

          {/* Discount Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Discount Category</Label>
              <RadioGroup
                defaultValue={discountCategory}
                onValueChange={handleDiscountCategoryChange}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" className="text-[#8c57ff]" />
                  <Label htmlFor="general" className="text-sm">
                    General Discount
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sibling" id="sibling" className="text-[#8c57ff]" />
                  <Label htmlFor="sibling" className="text-sm">
                    Sibling Discount
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scholarship" id="scholarship" className="text-[#8c57ff]" />
                  <Label htmlFor="scholarship" className="text-sm">
                    Scholarship
                  </Label>
                </div>
              </RadioGroup>

              {isSiblingDiscount && (
                <div className="mt-2">
                  <Label htmlFor="siblingNumber" className="text-sm">
                    Applies to Sibling Number
                  </Label>
                  <Select value={siblingNumber} onValueChange={setSiblingNumber}>
                    <SelectTrigger id="siblingNumber" className="mt-1">
                      <SelectValue placeholder="Select sibling number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Sibling</SelectItem>
                      <SelectItem value="2">2nd Sibling</SelectItem>
                      <SelectItem value="3">3rd Sibling</SelectItem>
                      <SelectItem value="4">4th Sibling</SelectItem>
                      <SelectItem value="5+">5th Sibling and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* General Ledger */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Ledger</Label>
              <Popover open={openLedger} onOpenChange={setOpenLedger}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openLedger}
                    className="w-full justify-between"
                  >
                    {selectedLedger
                      ? ledgerAccounts.find((ledger) => ledger.id === selectedLedger)?.name
                      : "Select Ledger"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search ledger accounts..." />
                    <CommandList>
                      <CommandEmpty>No ledger account found.</CommandEmpty>
                      <CommandGroup>
                        {ledgerAccounts.map((ledger) => (
                          <CommandItem
                            key={ledger.id}
                            value={ledger.id}
                            onSelect={() => {
                              setSelectedLedger(ledger.id)
                              setOpenLedger(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", selectedLedger === ledger.id ? "opacity-100" : "opacity-0")}
                            />
                            {ledger.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Status and Effective Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="active" className="text-sm font-medium">
                  Active Status
                </Label>
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-[#8c57ff]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Effective Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !effectiveDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {effectiveDate ? format(effectiveDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={effectiveDate} onSelect={setEffectiveDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-40 bg-[#8c57ff] hover:bg-[#8c57ff]/90">
              Setup Discount
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
