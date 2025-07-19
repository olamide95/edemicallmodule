"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RefreshCw, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function StaffReferralList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReferral, setSelectedReferral] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  // Mock data for referrals
  const referrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+234 801 234 5678",
      status: "Admitted",
      date: "2023-05-15",
      admissionDate: "2023-06-01",
      childName: "Emma Smith",
      grade: "Grade 3",
      notes: "Parent was referred through school event",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+234 802 345 6789",
      status: "Admitted",
      date: "2023-06-02",
      admissionDate: "2023-06-20",
      childName: "James Johnson",
      grade: "Grade 5",
      notes: "Interested in science program",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+234 803 456 7890",
      status: "Form Filled",
      date: "2023-07-10",
      admissionDate: null,
      childName: "David Brown",
      grade: "Grade 1",
      notes: "Following up on admission status",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+234 804 567 8901",
      status: "Shared",
      date: "2023-07-15",
      admissionDate: null,
      childName: null,
      grade: null,
      notes: "Sent follow-up email on 2023-07-20",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.w@example.com",
      phone: "+234 805 678 9012",
      status: "Shared",
      date: "2023-07-20",
      admissionDate: null,
      childName: null,
      grade: null,
      notes: "",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
      phone: "+234 806 789 0123",
      status: "Form Filled",
      date: "2023-08-05",
      admissionDate: null,
      childName: "Thomas Lee",
      grade: "Grade 2",
      notes: "Requested information about scholarship options",
    },
    {
      id: 7,
      name: "David Miller",
      email: "david.m@example.com",
      phone: "+234 807 890 1234",
      status: "Shared",
      date: "2023-08-10",
      admissionDate: null,
      childName: null,
      grade: null,
      notes: "",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Admitted":
        return <Badge variant="success">Admitted</Badge>
      case "Form Filled":
        return <Badge variant="info">Form Filled</Badge>
      case "Shared":
        return <Badge variant="secondary">Shared</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.childName && referral.childName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || referral.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const viewReferralDetails = (referral: any) => {
    setSelectedReferral(referral)
    setShowDetailsDialog(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>Track and manage all your referrals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
              <Input
                placeholder="Search by name, email or child..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="admitted">Admitted</SelectItem>
                <SelectItem value="form filled">Form Filled</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
            >
              <RefreshCw className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Referral Date</TableHead>
                  <TableHead>Child/Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.length > 0 ? (
                  filteredReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.name}</TableCell>
                      <TableCell>{referral.email}</TableCell>
                      <TableCell>{getStatusBadge(referral.status)}</TableCell>
                      <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                      <TableCell>{referral.childName ? `${referral.childName} (${referral.grade})` : "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewReferralDetails(referral)}>
                          <Eye className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No referrals found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Referral Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Referral Details</DialogTitle>
            <DialogDescription>Detailed information about this referral</DialogDescription>
          </DialogHeader>
          {selectedReferral && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-sm">{selectedReferral.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-sm">{getStatusBadge(selectedReferral.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedReferral.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{selectedReferral.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Referral Date</p>
                  <p className="text-sm">{new Date(selectedReferral.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Admission Date</p>
                  <p className="text-sm">
                    {selectedReferral.admissionDate
                      ? new Date(selectedReferral.admissionDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Child Name</p>
                  <p className="text-sm">{selectedReferral.childName || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Grade</p>
                  <p className="text-sm">{selectedReferral.grade || "-"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="text-sm mt-1 rounded-md border p-2 min-h-[60px]">
                  {selectedReferral.notes || "No notes available"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
