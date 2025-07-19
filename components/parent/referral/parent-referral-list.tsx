"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { UserPlus, Mail, Phone } from "lucide-react"

type ReferralStatus = "pending" | "contacted" | "enrolled" | "completed" | "expired"

type Referral = {
  id: string
  name: string
  email: string
  phone?: string
  status: ReferralStatus
  date: string
  reward?: number
  notes?: string
}

const MOCK_REFERRALS: Referral[] = [
  {
    id: "ref-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    status: "completed",
    date: "2025-04-15",
    reward: 50,
    notes: "Enrolled in 10th grade",
  },
  {
    id: "ref-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "enrolled",
    date: "2025-04-28",
    notes: "Enrollment in progress",
  },
  {
    id: "ref-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "555-987-6543",
    status: "contacted",
    date: "2025-05-10",
  },
  {
    id: "ref-004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "pending",
    date: "2025-05-18",
  },
  {
    id: "ref-005",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    status: "expired",
    date: "2025-03-05",
    notes: "No response after 60 days",
  },
]

export function ParentReferralList() {
  const [referrals, setReferrals] = useState<Referral[]>(MOCK_REFERRALS)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newReferral, setNewReferral] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleAddReferral = () => {
    if (!newReferral.name || !newReferral.email) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and email for your referral.",
        variant: "destructive",
      })
      return
    }

    const referral: Referral = {
      id: `ref-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: newReferral.name,
      email: newReferral.email,
      phone: newReferral.phone,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      notes: newReferral.notes || undefined,
    }

    setReferrals([referral, ...referrals])
    setIsAddDialogOpen(false)
    setNewReferral({
      name: "",
      email: "",
      phone: "",
      notes: "",
    })

    toast({
      title: "Referral added",
      description: "Your referral has been submitted successfully.",
    })
  }

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Pending
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Contacted
          </Badge>
        )
      case "enrolled":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Enrolled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Expired
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">My Referrals</h3>
          <p className="text-sm text-muted-foreground">Track the status of people you've referred</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Referral
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Referral</DialogTitle>
              <DialogDescription>Enter the details of the person you'd like to refer to our school.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={newReferral.name}
                  onChange={(e) => setNewReferral({ ...newReferral, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.smith@example.com"
                  value={newReferral.email}
                  onChange={(e) => setNewReferral({ ...newReferral, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="555-123-4567"
                  value={newReferral.phone}
                  onChange={(e) => setNewReferral({ ...newReferral, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Any additional information"
                  value={newReferral.notes}
                  onChange={(e) => setNewReferral({ ...newReferral, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReferral}>Add Referral</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {referrals.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You haven't made any referrals yet.</p>
            </CardContent>
          </Card>
        ) : (
          referrals.map((referral) => (
            <Card key={referral.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{referral.name}</CardTitle>
                  {getStatusBadge(referral.status)}
                </div>
                <CardDescription>Referred on {referral.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{referral.email}</span>
                  </div>
                  {referral.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{referral.phone}</span>
                    </div>
                  )}
                  {referral.reward && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Reward earned:</span>
                      <span className="ml-2 font-medium">${referral.reward.toFixed(2)}</span>
                    </div>
                  )}
                  {referral.notes && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Notes:</span>
                      <p className="mt-1">{referral.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
