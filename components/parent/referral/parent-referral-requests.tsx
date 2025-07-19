"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type RewardRequest = {
  id: string
  type: "cash" | "discount"
  amount: number
  status: "pending" | "approved" | "rejected"
  requestDate: string
  approvalDate?: string
  notes?: string
}

const MOCK_REWARD_REQUESTS: RewardRequest[] = [
  {
    id: "req-001",
    type: "cash",
    amount: 250,
    status: "pending",
    requestDate: "2025-05-10",
    notes: "Requesting payout for 5 successful referrals",
  },
  {
    id: "req-002",
    type: "discount",
    amount: 500,
    status: "approved",
    requestDate: "2025-04-15",
    approvalDate: "2025-04-20",
    notes: "Tuition discount applied for next semester",
  },
  {
    id: "req-003",
    type: "cash",
    amount: 150,
    status: "rejected",
    requestDate: "2025-03-22",
    approvalDate: "2025-03-25",
    notes: "Insufficient referrals completed",
  },
]

export function ParentReferralRequests() {
  const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>(MOCK_REWARD_REQUESTS)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [newRequestType, setNewRequestType] = useState<"cash" | "discount">("cash")
  const [newRequestNotes, setNewRequestNotes] = useState("")

  const handleSubmitRequest = () => {
    const newRequest: RewardRequest = {
      id: `req-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      type: newRequestType,
      amount: newRequestType === "cash" ? 250 : 500,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
      notes: newRequestNotes,
    }

    setRewardRequests([newRequest, ...rewardRequests])
    setIsRequestDialogOpen(false)
    setNewRequestType("cash")
    setNewRequestNotes("")

    toast({
      title: "Reward request submitted",
      description: "Your request has been submitted and is pending approval.",
    })
  }

  const getStatusBadge = (status: RewardRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "approved":
        return <Badge variant="success">Approved</Badge>
      case "rejected":
        return <Badge variant="error">Rejected</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Reward Requests</h3>
          <p className="text-sm text-muted-foreground">Request payouts or discounts for your referral rewards</p>
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>New Reward Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Reward</DialogTitle>
              <DialogDescription>
                Choose the type of reward you'd like to request based on your referral points.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <RadioGroup
                value={newRequestType}
                onValueChange={(value) => setNewRequestType(value as "cash" | "discount")}
              >
                <div className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value="cash" id="cash" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="cash" className="font-medium">
                      Cash Payout
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a direct cash payment to your preferred payment method
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 mt-3">
                  <RadioGroupItem value="discount" id="discount" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="discount" className="font-medium">
                      Tuition Discount
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Apply your rewards as a discount on upcoming tuition fees
                    </p>
                  </div>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any specific details about your request"
                  value={newRequestNotes}
                  onChange={(e) => setNewRequestNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {rewardRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You haven't made any reward requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          rewardRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      {request.type === "cash" ? "Cash Payout" : "Tuition Discount"}
                    </CardTitle>
                    <CardDescription>Requested on {request.requestDate}</CardDescription>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">${request.amount.toFixed(2)}</span>
                  </div>
                  {request.approvalDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processed on:</span>
                      <span>{request.approvalDate}</span>
                    </div>
                  )}
                  {request.notes && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="mt-1">{request.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                {request.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRewardRequests(
                        rewardRequests.map((r) =>
                          r.id === request.id
                            ? { ...r, status: "rejected", approvalDate: new Date().toISOString().split("T")[0] }
                            : r,
                        ),
                      )
                      toast({
                        title: "Request cancelled",
                        description: "Your reward request has been cancelled.",
                      })
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
