"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export function PendingPayouts() {
  // In a real app, this would come from an API
  const pendingPayouts = useMemo(
    () => [
      {
        id: "PAY-001",
        referrer: "Adebayo Olamide",
        referrerType: "parent",
        discountType: "cash",
        referrals: 5,
        amount: "₦50,000",
        requestDate: "May 14, 2025",
      },
      {
        id: "PAY-002",
        referrer: "Emeka Johnson",
        referrerType: "staff",
        discountType: "cash",
        referrals: 6,
        amount: "₦60,000",
        requestDate: "May 12, 2025",
      },
      {
        id: "PAY-003",
        referrer: "Chinedu Eze",
        referrerType: "student",
        discountType: "tuition",
        referrals: 3,
        amount: "₦30,000",
        requestDate: "May 10, 2025",
      },
      {
        id: "PAY-004",
        referrer: "Folake Adeniyi",
        referrerType: "alumni",
        discountType: "cash",
        referrals: 4,
        amount: "₦40,000",
        requestDate: "May 8, 2025",
      },
      {
        id: "PAY-005",
        referrer: "Bukola Adeleke",
        referrerType: "parent",
        discountType: "tuition",
        referrals: 5,
        amount: "₦50,000",
        requestDate: "May 6, 2025",
      },
    ],
    [],
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "parent":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Parent
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Staff
          </Badge>
        )
      case "student":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Student
          </Badge>
        )
      case "alumni":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Alumni
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Referrer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Discount Type</TableHead>
          <TableHead>Referrals</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Request Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingPayouts.map((payout) => (
          <TableRow key={payout.id}>
            <TableCell className="font-medium">{payout.referrer}</TableCell>
            <TableCell>{getTypeIcon(payout.referrerType)}</TableCell>
            <TableCell className="capitalize">{payout.discountType}</TableCell>
            <TableCell>{payout.referrals}</TableCell>
            <TableCell>{payout.amount}</TableCell>
            <TableCell>{payout.requestDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
