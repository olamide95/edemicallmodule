"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, Search, Filter } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ReferralList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // In a real app, this would come from an API
  const allReferrals = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => {
        const statuses = ["enrolled", "pending", "declined"]
        const types = ["parent", "staff", "student", "alumni"]
        const discountTypes = ["tuition", "cash"]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const referrerType = types[Math.floor(Math.random() * types.length)]
        const discountType = discountTypes[Math.floor(Math.random() * discountTypes.length)]

        return {
          id: `REF-${String(i + 1).padStart(3, "0")}`,
          referrer: [
            "Adebayo Olamide",
            "Emeka Johnson",
            "Ngozi Okafor",
            "Oluwaseun Adeleke",
            "Chinedu Eze",
            "Aisha Bello",
            "Emmanuel Okonkwo",
            "Folake Adeniyi",
            "Tochukwu Eze",
            "Bukola Adeleke",
          ][i % 10],
          referrerType,
          referredStudent: [
            "Chioma Nwosu",
            "Fatima Ibrahim",
            "Tunde Bakare",
            "Amina Mohammed",
            "Blessing Okonkwo",
            "Yusuf Musa",
            "Grace Adeyemi",
            "Ibrahim Suleiman",
            "Halima Abubakar",
            "David Okafor",
          ][i % 10],
          date: `May ${15 - (i % 15)}, 2025`,
          status,
          discountType,
          amount: status === "enrolled" ? `₦${((i % 5) + 1) * 10000}` : "-",
          referralCode: `REF${String(1000 + i).substring(1)}`,
          remainingReferrals: Math.max(0, 5 - (i % 6)),
        }
      }),
    [],
  )

  const filteredReferrals = useMemo(() => {
    return allReferrals.filter((referral) => {
      const matchesSearch =
        searchQuery === "" ||
        referral.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.referredStudent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.referralCode.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || referral.status === statusFilter
      const matchesType = typeFilter === "all" || referral.referrerType === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [allReferrals, searchQuery, statusFilter, typeFilter])

  const paginatedReferrals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredReferrals.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredReferrals, currentPage])

  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage)

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
    <Card>
      <CardHeader>
        <CardTitle>All Referrals</CardTitle>
        <CardDescription>Complete list of all referrals in the program</CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
            <Input
              placeholder="Search referrals..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referrer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Referred Student</TableHead>
                <TableHead>Referral Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Discount Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReferrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.referrer}</TableCell>
                  <TableCell className="capitalize">{referral.referrerType}</TableCell>
                  <TableCell>{referral.referredStudent}</TableCell>
                  <TableCell>{referral.referralCode}</TableCell>
                  <TableCell>{referral.date}</TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell>{getDiscountTypeBadge(referral.discountType)}</TableCell>
                  <TableCell>{referral.amount}</TableCell>
                  <TableCell>{referral.remainingReferrals}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4 text-[#2E263D] opacity-90 dark:text-[#E7E3FC] dark:opacity-70" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                } else {
                  pageNumber = currentPage - 2 + i
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNumber)
                      }}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}
