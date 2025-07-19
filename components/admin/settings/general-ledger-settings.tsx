"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

export function GeneralLedgerSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Ledger Configuration</CardTitle>
          <CardDescription>Configure general ledger accounts for financial transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="write-off-account">Default Write-Off Account</Label>
            <Select defaultValue="account-1">
              <SelectTrigger id="write-off-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-1">Bad Debt Expense</SelectItem>
                <SelectItem value="account-2">Uncollectible Accounts Expense</SelectItem>
                <SelectItem value="account-3">Write-Off Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label>General Ledger Accounts</Label>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1001</TableCell>
                  <TableCell>Tuition Revenue</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Income from student tuition fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1002</TableCell>
                  <TableCell>Development Fee Revenue</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Income from development fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2001</TableCell>
                  <TableCell>Bad Debt Expense</TableCell>
                  <TableCell>Expense</TableCell>
                  <TableCell>Expense for uncollectible fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3001</TableCell>
                  <TableCell>Scholarship Fund</TableCell>
                  <TableCell>Liability</TableCell>
                  <TableCell>Fund for student scholarships</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
