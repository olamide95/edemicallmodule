"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SaveIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// Mock data for general ledger accounts
const mockLedgerAccounts = [
  { id: "1000", name: "Revenue - Club Fees", type: "income" },
  { id: "1001", name: "Revenue - Club Variants", type: "income" },
  { id: "1002", name: "Revenue - Special Events", type: "income" },
  { id: "2000", name: "Expenses - Club Materials", type: "expense" },
  { id: "2001", name: "Expenses - Vendor Payments", type: "expense" },
  { id: "2002", name: "Expenses - Staff Allowances", type: "expense" },
  { id: "2003", name: "Expenses - Venue Maintenance", type: "expense" },
  { id: "3000", name: "Assets - Club Equipment", type: "asset" },
  { id: "4000", name: "Liabilities - Vendor Payables", type: "liability" },
]

export function SettingsForm() {
  const [settings, setSettings] = useState({
    enrollmentDeadline: 14,
    unenrollmentDeadline: 21,
    changeDeadline: 30,
    minimumAttendance: 75,
  })

  const [accountingSettings, setAccountingSettings] = useState({
    incomeLedger: "",
    expenseLedger: "",
    separateVariantIncome: false,
    separateVendorExpense: false,
    autoPostTransactions: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: Number.parseInt(value),
    }))
  }

  const handleAccountingChange = (field: string, value: any) => {
    setAccountingSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Settings:", settings)
    console.log("Accounting Settings:", accountingSettings)
    alert("Settings saved successfully!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="deadlines">
        <TabsList className="mb-6">
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="deadlines" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="enrollmentDeadline">Enrollment Deadline (Days after school resumption)</Label>
              <Input
                id="enrollmentDeadline"
                name="enrollmentDeadline"
                type="number"
                min="1"
                value={settings.enrollmentDeadline}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Number of days after school resumption when enrollment closes
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unenrollmentDeadline">Unenrollment Deadline (Days after school resumption)</Label>
              <Input
                id="unenrollmentDeadline"
                name="unenrollmentDeadline"
                type="number"
                min="1"
                value={settings.unenrollmentDeadline}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Number of days after school resumption when unenrollment closes
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="changeDeadline">Club Change Deadline (Days after school resumption)</Label>
              <Input
                id="changeDeadline"
                name="changeDeadline"
                type="number"
                min="1"
                value={settings.changeDeadline}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Number of days after school resumption when club changes are no longer allowed
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="minimumAttendance">Minimum Attendance Requirement (%)</Label>
            <Input
              id="minimumAttendance"
              name="minimumAttendance"
              type="number"
              min="0"
              max="100"
              value={settings.minimumAttendance}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Minimum attendance percentage required for a student to be included in vendor billing
            </p>
          </div>
        </TabsContent>

        <TabsContent value="accounting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Ledger Configuration</CardTitle>
              <CardDescription>
                Configure how extracurricular activities financial transactions are recorded in the general ledger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="incomeLedger">Income General Ledger Account</Label>
                  <Select
                    value={accountingSettings.incomeLedger}
                    onValueChange={(value) => handleAccountingChange("incomeLedger", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income ledger account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLedgerAccounts
                        .filter((account) => account.type === "income")
                        .map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.id} - {account.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    The general ledger account where club fee income will be recorded
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expenseLedger">Expense General Ledger Account</Label>
                  <Select
                    value={accountingSettings.expenseLedger}
                    onValueChange={(value) => handleAccountingChange("expenseLedger", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expense ledger account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLedgerAccounts
                        .filter((account) => account.type === "expense")
                        .map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.id} - {account.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    The general ledger account where club expenses will be recorded
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="separateVariantIncome">Separate Variant Income</Label>
                    <p className="text-sm text-muted-foreground">
                      Record variant income (e.g., uniforms, equipment) in a separate ledger account
                    </p>
                  </div>
                  <Switch
                    id="separateVariantIncome"
                    checked={accountingSettings.separateVariantIncome}
                    onCheckedChange={(checked) => handleAccountingChange("separateVariantIncome", checked)}
                  />
                </div>

                {accountingSettings.separateVariantIncome && (
                  <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
                    <Label htmlFor="variantIncomeLedger">Variant Income Ledger Account</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variant income ledger" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLedgerAccounts
                          .filter((account) => account.type === "income")
                          .map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.id} - {account.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="separateVendorExpense">Separate Vendor Expense</Label>
                    <p className="text-sm text-muted-foreground">
                      Record vendor payments in a separate ledger account from in-house expenses
                    </p>
                  </div>
                  <Switch
                    id="separateVendorExpense"
                    checked={accountingSettings.separateVendorExpense}
                    onCheckedChange={(checked) => handleAccountingChange("separateVendorExpense", checked)}
                  />
                </div>

                {accountingSettings.separateVendorExpense && (
                  <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
                    <Label htmlFor="vendorExpenseLedger">Vendor Expense Ledger Account</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor expense ledger" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLedgerAccounts
                          .filter((account) => account.type === "expense")
                          .map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.id} - {account.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPostTransactions">Automatic Transaction Posting</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically post transactions to the general ledger when fees are charged or payments are made
                    </p>
                  </div>
                  <Switch
                    id="autoPostTransactions"
                    checked={accountingSettings.autoPostTransactions}
                    onCheckedChange={(checked) => handleAccountingChange("autoPostTransactions", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chart of Accounts</CardTitle>
              <CardDescription>View and manage the chart of accounts for extracurricular activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-2 px-4 text-left font-medium">Account Code</th>
                      <th className="py-2 px-4 text-left font-medium">Account Name</th>
                      <th className="py-2 px-4 text-left font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLedgerAccounts.map((account) => (
                      <tr key={account.id} className="border-b">
                        <td className="py-2 px-4">{account.id}</td>
                        <td className="py-2 px-4">{account.name}</td>
                        <td className="py-2 px-4 capitalize">{account.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Billing settings will appear here
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit">
          <SaveIcon className="h-4 w-4 mr-1" />
          Save Settings
        </Button>
      </div>
    </form>
  )
}
