"use client"

import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function ReferralPerformanceTable() {
  // In a real app, this would come from an API
  const topPerformers = useMemo(
    () => [
      {
        id: 1,
        name: "Adebayo Olamide",
        type: "parent",
        referrals: 12,
        conversions: 9,
        conversionRate: 75,
        totalValue: 765000,
        reward: 225000,
      },
      {
        id: 2,
        name: "Emeka Johnson",
        type: "staff",
        referrals: 10,
        conversions: 8,
        conversionRate: 80,
        totalValue: 736000,
        reward: 200000,
      },
      {
        id: 3,
        name: "Ngozi Okafor",
        type: "parent",
        referrals: 8,
        conversions: 6,
        conversionRate: 75,
        totalValue: 510000,
        reward: 150000,
      },
      {
        id: 4,
        name: "Oluwaseun Adeleke",
        type: "alumni",
        referrals: 7,
        conversions: 5,
        conversionRate: 71,
        totalValue: 410000,
        reward: 125000,
      },
      {
        id: 5,
        name: "Chinedu Eze",
        type: "staff",
        referrals: 7,
        conversions: 6,
        conversionRate: 86,
        totalValue: 552000,
        reward: 150000,
      },
      {
        id: 6,
        name: "Aisha Bello",
        type: "parent",
        referrals: 6,
        conversions: 4,
        conversionRate: 67,
        totalValue: 340000,
        reward: 100000,
      },
      {
        id: 7,
        name: "Emmanuel Okonkwo",
        type: "staff",
        referrals: 6,
        conversions: 5,
        conversionRate: 83,
        totalValue: 460000,
        reward: 125000,
      },
      {
        id: 8,
        name: "Folake Adeniyi",
        type: "alumni",
        referrals: 5,
        conversions: 3,
        conversionRate: 60,
        totalValue: 246000,
        reward: 75000,
      },
      {
        id: 9,
        name: "Tochukwu Eze",
        type: "student",
        referrals: 5,
        conversions: 3,
        conversionRate: 60,
        totalValue: 234000,
        reward: 75000,
      },
      {
        id: 10,
        name: "Bukola Adeleke",
        type: "parent",
        referrals: 4,
        conversions: 3,
        conversionRate: 75,
        totalValue: 255000,
        reward: 75000,
      },
    ],
    [],
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "parent":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Parent</Badge>
      case "staff":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Staff</Badge>
      case "student":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Student</Badge>
      case "alumni":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Alumni</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const getAvatarColor = (type: string) => {
    switch (type) {
      case "parent":
        return "bg-blue-100 text-blue-800"
      case "staff":
        return "bg-green-100 text-green-800"
      case "student":
        return "bg-amber-100 text-amber-800"
      case "alumni":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Referrer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Referrals</TableHead>
          <TableHead className="text-right">Conversions</TableHead>
          <TableHead className="text-right">Conv. Rate</TableHead>
          <TableHead className="text-right">Total Value</TableHead>
          <TableHead className="text-right">Reward</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topPerformers.map((performer) => (
          <TableRow key={performer.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={getAvatarColor(performer.type)}>
                    {getInitials(performer.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{performer.name}</span>
              </div>
            </TableCell>
            <TableCell>{getTypeBadge(performer.type)}</TableCell>
            <TableCell className="text-right">{performer.referrals}</TableCell>
            <TableCell className="text-right">{performer.conversions}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Progress value={performer.conversionRate} className="h-2 w-16" />
                <span>{performer.conversionRate}%</span>
              </div>
            </TableCell>
            <TableCell className="text-right">₦{performer.totalValue.toLocaleString()}</TableCell>
            <TableCell className="text-right font-medium">₦{performer.reward.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
