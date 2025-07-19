"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, FilterIcon, DownloadIcon, TrashIcon, PlusIcon } from "lucide-react"

// Mock data for general ledger entries
const mockLedgerEntries = [
  {
    id: "GL-2023-001",
    date: "2023-11-15",
    account: "2001 - Expenses - Vendor Payments",
    description: "Vendor Payment - Chess Club",
    debit: 150000,
    credit: 0,
    balance: -150000,
  },
  {
    id: "GL-2023-002",
    date: "2023-11-10",
    account: "1000 - Revenue - Club Fees",
    description: "Club Fee - Robotics Club",
    debit: 0,
    credit: 300000,
    balance: 300000,
  },
  {
    id: "GL-2023-003",
    date: "2023-11-05",
    account: "2000 - Expenses - Club Materials",
    description: "Materials Purchase - Science Club",
    debit: 45000,
    credit: 0,
    balance: -45000,
  },
  {
    id: "GL-2023-004",
    date: "2023-11-01",
    account: "1000 - Revenue - Club Fees",
    description: "Club Fee - Art Club",
    debit: 0,
    credit: 180000,
    balance: 180000,
  },
  {
    id: "GL-2023-005",
    date: "2023-10-28",
    account: "2001 - Expenses - Vendor Payments",
    description: "Vendor Payment - Music Club",
    debit: 80000,
    credit: 0,
    balance: -80000,
  },
  {
    id: "GL-2023-006",
    date: "2023-10-20",
    account: "1001 - Revenue - Club Variants",
    description: "Club Variant Fee - Chess Club (Chess Sets)",
    debit: 0,
    credit: 75000,
    balance: 75000,
  },
  {
    id: "GL-2023-007",
    date: "2023-10-15",
    account: "2000 - Expenses - Club Materials",
    description: "Materials Purchase - Art Club",
    debit: 35000,
    credit: 0,
    balance: -35000,
  },
  {
    id: "GL-2023-008",
    date: "2023-10-10",
    account: "1000 - Revenue - Club Fees",
    description: "Club Fee - Music Club",
    debit: 0,
    credit: 175000,
    balance: 175000,
  },
  {
    id: "GL-2023-009",
    date: "2023-10-05",
    account: "2001 - Expenses - Vendor Payments",
    description: "Vendor Payment - Robotics Club",
    debit: 120000,
    credit: 0,
    balance: -120000,
  },
  {
    id: "GL-2023-010",
    date: "2023-10-01",
    account: "1001 - Revenue - Club Variants",
    description: "Club Variant Fee - Robotics Club (Robot Kits)",
    debit: 0,
    credit: 150000,
    balance: 150000,
  },
]

export function GeneralLedger() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  // Filter ledger entries based on search, account, and date range
  const filteredEntries = mockLedgerEntries.filter((entry) => {
    const matchesSearch =
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAccount = selectedAccount === "all" || entry.account.includes(selectedAccount)

    const matchesDateRange = true // Implement date range filtering if needed

    return matchesSearch && matchesAccount && matchesDateRange
  })

  // Calculate totals
  const totals = filteredEntries.reduce(
    (acc, entry) => {
      acc.debit += entry.debit
      acc.credit += entry.credit
      return acc
    },
    { debit: 0, credit: 0 },
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Ledger</CardTitle>
          <CardDescription>View and filter general ledger entries for extracurricular activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search by description or account..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="1000">1000 - Revenue - Club Fees</SelectItem>
                  <SelectItem value="1001">1001 - Revenue - Club Variants</SelectItem>
                  <SelectItem value="2000">2000 - Expenses - Club Materials</SelectItem>
                  <SelectItem value="2001">2001 - Expenses - Vendor Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
                <span>to</span>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-1" />
              Reset Filters
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entry ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length > 0 ? (
                  <>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell className="text-right">
                          {entry.debit > 0 ? `₦${entry.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {entry.credit > 0 ? `₦${entry.credit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className={`text-right ${entry.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {entry.balance >= 0 ? "+" : ""}₦{Math.abs(entry.balance).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-medium">
                      <TableCell colSpan={4} className="text-right">
                        Totals
                      </TableCell>
                      <TableCell className="text-right">₦{totals.debit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₦{totals.credit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {totals.credit - totals.debit >= 0 ? "+" : ""}₦
                        {Math.abs(totals.credit - totals.debit).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No ledger entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Journal Entry</CardTitle>
          <CardDescription>Create a manual journal entry for extracurricular activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="entry-date">Date</Label>
              <Input id="entry-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-description">Description</Label>
              <Input id="entry-description" placeholder="Enter description" />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">1000 - Revenue - Club Fees</SelectItem>
                          <SelectItem value="1001">1001 - Revenue - Club Variants</SelectItem>
                          <SelectItem value="2000">2000 - Expenses - Club Materials</SelectItem>
                          <SelectItem value="2001">2001 - Expenses - Vendor Payments</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" type="button">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Line
              </Button>
              <Button type="button">Post Journal Entry</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
