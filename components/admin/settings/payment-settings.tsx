"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export function PaymentSettings() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Default Accounts</TabsTrigger>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Bank Accounts</CardTitle>
              <CardDescription>Set default accounts for different payment types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-bank">Default Bank Account</Label>
                  <Select defaultValue="bank-1">
                    <SelectTrigger id="default-bank">
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-1">School Main Account - 1234567890</SelectItem>
                      <SelectItem value="bank-2">Development Fund - 0987654321</SelectItem>
                      <SelectItem value="bank-3">Scholarship Fund - 1122334455</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="petty-cash">Default Petty Cash Account</Label>
                  <Select defaultValue="petty-1">
                    <SelectTrigger id="petty-cash">
                      <SelectValue placeholder="Select petty cash account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petty-1">Admin Office Petty Cash</SelectItem>
                      <SelectItem value="petty-2">Principal's Office Petty Cash</SelectItem>
                      <SelectItem value="petty-3">Department Petty Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>Configure online payment gateways for fee collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="paystack" />
                  <Label htmlFor="paystack">Paystack</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="flutterwave" />
                  <Label htmlFor="flutterwave">Flutterwave</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="gtsquad" />
                  <Label htmlFor="gtsquad">GTSquad</Label>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-blue-50 mt-4">
                <p className="text-sm text-blue-800">
                  Note: You will need to configure API keys and credentials for each payment gateway in their respective
                  settings pages.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
