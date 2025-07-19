"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { CashPayoutProgram } from "@/components/admin/referral/cash-payout-program"
import { TuitionDiscountProgram } from "@/components/admin/referral/tuition-discount-program"

export default function ReferralProgramsClientPage() {
  // State to track which program type tab is active
  const [activeTab, setActiveTab] = useState("cash")

  // State to track whether we're in create mode for each program type
  const [cashCreateMode, setCashCreateMode] = useState(false)
  const [tuitionCreateMode, setTuitionCreateMode] = useState(false)

  // Function to handle creating a new program
  const handleCreateProgram = () => {
    if (activeTab === "cash") {
      setCashCreateMode(true)
    } else {
      setTuitionCreateMode(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Referral Programs</h1>
          <p className="text-muted-foreground">Configure and manage referral program settings</p>
        </div>
        <Button onClick={handleCreateProgram}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Program
        </Button>
      </div>

      <Tabs
        defaultValue="cash"
        className="space-y-4"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          // Reset create mode when switching tabs
          setCashCreateMode(false)
          setTuitionCreateMode(false)
        }}
      >
        <TabsList>
          <TabsTrigger value="cash">Cash Payout Programs</TabsTrigger>
          <TabsTrigger value="tuition">Tuition Discount Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="cash" className="space-y-4">
          {cashCreateMode ? (
            <CashPayoutProgram />
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button onClick={() => setCashCreateMode(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Cash Payout Program
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Staff Cash Payout Program</CardTitle>
                  <CardDescription>Active since: January 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Required Referrals</h3>
                        <p className="text-lg font-medium">5 successful referrals</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Payout Amount</h3>
                        <p className="text-lg font-medium">₦25,000</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Expiry Period</h3>
                        <p className="text-lg font-medium">Every academic session</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p className="text-lg font-medium text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button variant="destructive">Deactivate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent Cash Payout Program</CardTitle>
                  <CardDescription>Active since: March 10, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Required Referrals</h3>
                        <p className="text-lg font-medium">3 successful referrals</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Payout Amount</h3>
                        <p className="text-lg font-medium">₦15,000</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Expiry Period</h3>
                        <p className="text-lg font-medium">Every term</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p className="text-lg font-medium text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button variant="destructive">Deactivate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="tuition" className="space-y-4">
          {tuitionCreateMode ? (
            <TuitionDiscountProgram />
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button onClick={() => setTuitionCreateMode(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Tuition Discount Program
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Staff Tuition Discount Program</CardTitle>
                  <CardDescription>Active since: February 5, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Required Referrals</h3>
                        <p className="text-lg font-medium">2 successful referrals</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Discount Amount</h3>
                        <p className="text-lg font-medium">15% on tuition fees</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Applicable Fee Heads</h3>
                        <p className="text-lg font-medium">Tuition, Development Fee</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p className="text-lg font-medium text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button variant="destructive">Deactivate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent Tuition Discount Program</CardTitle>
                  <CardDescription>Active since: April 20, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Required Referrals</h3>
                        <p className="text-lg font-medium">2 successful referrals</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Discount Amount</h3>
                        <p className="text-lg font-medium">10% on tuition fees</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Applicable Fee Heads</h3>
                        <p className="text-lg font-medium">Tuition only</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p className="text-lg font-medium text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Edit</Button>
                      <Button variant="destructive">Deactivate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
