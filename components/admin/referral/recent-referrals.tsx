"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

interface RecentReferralsProps {
  userType?: "parent" | "staff" | "student" | "alumni"
  limit?: number
}

export function RecentReferrals({ userType, limit = 10 }: RecentReferralsProps) {
  // In a real app, this would come from an API and be filtered by userType
  const referrals = useMemo(
    () => [
      {
        id: "REF-001",
        referrer: "Adebayo Olamide",
        referrerType: "parent",
        referredStudent: "Chioma Nwosu",
        date: "May 15, 2025",
        status: "enrolled",
        discountType: "tuition",
        amount: "₦50,000",
      },
      {
        id: "REF-002",
        referrer: "Emeka Johnson",
        referrerType: "staff",
        referredStudent: "Fatima Ibrahim",
        date: "May 12, 2025",
        status: "enrolled",
        discountType: "cash",
        amount: "₦50,000",
      },
      {
        id: "REF-003",
        referrer: "Ngozi Okafor",
        referrerType: "parent",
        referredStudent: "Tunde Bakare",
        date: "May 10, 2025",
        status: "pending",
        discountType: "tuition",
        amount: "-",
      },
      {
        id: "REF-004",
        referrer: "Oluwaseun Adeleke",
        referrerType: "alumni",
        referredStudent: "Amina Mohammed",
        date: "May 8, 2025",
        status: "declined",
        discountType: "cash",
        amount: "-",
      },
      {
        id: "REF-005",
        referrer: "Chinedu Eze",
        referrerType: "student",
        referredStudent: "Blessing Okonkwo",
        date: "May 5, 2025",
        status: "enrolled",
        discountType: "tuition",
        amount: "₦50,000",
      },
      {
        id: "REF-006",
        referrer: "Aisha Bello",
        referrerType: "parent",
        referredStudent: "Yusuf Musa",
        date: "May 3, 2025",
        status: "enrolled",
        discountType: "cash",
        amount: "₦50,000",
      },
      {
        id: "REF-007",
        referrer: "Emmanuel Okonkwo",
        referrerType: "staff",
        referredStudent: "Grace Adeyemi",
        date: "May 1, 2025",
        status: "pending",
        discountType: "tuition",
        amount: "-",
      },
      {
        id: "REF-008",
        referrer: "Folake Adeniyi",
        referrerType: "alumni",
        referredStudent: "Ibrahim Suleiman",
        date: "Apr 28, 2025",
        status: "enrolled",
        discountType: "cash",
        amount: "₦50,000",
      },
      {
        id: "REF-009",
        referrer: "Tochukwu Eze",
        referrerType: "student",
        referredStudent: "Halima Abubakar",
        date: "Apr 25, 2025",
        status: "declined",
        discountType: "tuition",
        amount: "-",
      },
      {
        id: "REF-010",
        referrer: "Bukola Adeleke",
        referrerType: "parent",
        referredStudent: "David Okafor",
        date: "Apr 22, 2025",
        status: "enrolled",
        discountType: "cash",
        amount: "₦50,000",
      },
    ],
    [],
  )

  const filteredReferrals = useMemo(() => {
    let filtered = referrals
    if (userType) {
      filtered = referrals.filter((ref) => ref.referrerType === userType)
    }
    return filtered.slice(0, limit)
  }, [referrals, userType, limit])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enrolled":
        return <Badge variant="success">Enrolled</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "declined":
        return <Badge variant="error">Declined</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getDiscountTypeBadge = (type: string) => {
    switch (type) {
      case "tuition":
        return <Badge variant="info">Tuition Discount</Badge>
      case "cash":
        return <Badge variant="primary">Cash Payout</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Referrer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Referred Student</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Discount Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredReferrals.map((referral) => (
          <TableRow key={referral.id}>
            <TableCell className="font-medium">{referral.referrer}</TableCell>
            <TableCell className="capitalize">{referral.referrerType}</TableCell>
            <TableCell>{referral.referredStudent}</TableCell>
            <TableCell>{referral.date}</TableCell>
            <TableCell>{getStatusBadge(referral.status)}</TableCell>
            <TableCell>{getDiscountTypeBadge(referral.discountType)}</TableCell>
            <TableCell>{referral.amount}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
