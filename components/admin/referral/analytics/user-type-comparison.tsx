"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReferralUserTypeComparisonProps {
  metric?: "conversion" | "programs" | "demographics"
}

export function ReferralUserTypeComparison({ metric }: ReferralUserTypeComparisonProps) {
  // In a real app, this would come from an API
  const userData = useMemo(
    () => [
      {
        name: "Parents",
        referrals: 520,
        conversions: 364,
        conversionRate: 70,
        avgValue: 85000,
        fill: "#3b82f6",
      },
      {
        name: "Staff",
        referrals: 380,
        conversions: 285,
        conversionRate: 75,
        avgValue: 92000,
        fill: "#10b981",
      },
      {
        name: "Students",
        referrals: 210,
        conversions: 126,
        conversionRate: 60,
        avgValue: 78000,
        fill: "#f59e0b",
      },
      {
        name: "Alumni",
        referrals: 138,
        conversions: 90,
        conversionRate: 65,
        avgValue: 82000,
        fill: "#8b5cf6",
      },
    ],
    [],
  )

  const programData = useMemo(
    () => [
      {
        program: "Parent Tuition Discount",
        referrals: 320,
        conversions: 224,
        conversionRate: "70%",
        cost: "₦6.72M",
        roi: "380%",
      },
      {
        program: "Staff Cash Payout",
        referrals: 280,
        conversions: 210,
        conversionRate: "75%",
        cost: "₦8.40M",
        roi: "420%",
      },
      {
        program: "Alumni Network Bonus",
        referrals: 138,
        conversions: 90,
        conversionRate: "65%",
        cost: "₦3.60M",
        roi: "350%",
      },
      {
        program: "Student Merit Points",
        referrals: 210,
        conversions: 126,
        conversionRate: "60%",
        cost: "₦2.52M",
        roi: "310%",
      },
      {
        program: "Community Partner",
        referrals: 85,
        conversions: 55,
        conversionRate: "65%",
        cost: "₦1.65M",
        roi: "330%",
      },
    ],
    [],
  )

  const demographicData = useMemo(
    () => [
      {
        segment: "High Income",
        referrals: 285,
        conversions: 214,
        conversionRate: "75%",
        avgValue: "₦95,000",
      },
      {
        segment: "Middle Income",
        referrals: 425,
        conversions: 298,
        conversionRate: "70%",
        avgValue: "₦85,000",
      },
      {
        segment: "Urban",
        referrals: 520,
        conversions: 364,
        conversionRate: "70%",
        avgValue: "₦88,000",
      },
      {
        segment: "Suburban",
        referrals: 310,
        conversions: 217,
        conversionRate: "70%",
        avgValue: "₦82,000",
      },
      {
        segment: "New Families",
        referrals: 180,
        conversions: 126,
        conversionRate: "70%",
        avgValue: "₦90,000",
      },
      {
        segment: "Existing Families",
        referrals: 650,
        conversions: 455,
        conversionRate: "70%",
        avgValue: "₦82,000",
      },
    ],
    [],
  )

  if (metric === "conversion") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value}%`, "Conversion Rate"]} />
            <Legend />
            <Bar dataKey="conversionRate" name="Conversion Rate (%)" radius={[0, 4, 4, 0]}>
              {userData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (metric === "programs") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program</TableHead>
            <TableHead className="text-right">Referrals</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
            <TableHead className="text-right">Program Cost</TableHead>
            <TableHead className="text-right">ROI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programData.map((row) => (
            <TableRow key={row.program}>
              <TableCell className="font-medium">{row.program}</TableCell>
              <TableCell className="text-right">{row.referrals}</TableCell>
              <TableCell className="text-right">{row.conversions}</TableCell>
              <TableCell className="text-right">{row.conversionRate}</TableCell>
              <TableCell className="text-right">{row.cost}</TableCell>
              <TableCell className="text-right font-medium">{row.roi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (metric === "demographics") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Demographic Segment</TableHead>
            <TableHead className="text-right">Referrals</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
            <TableHead className="text-right">Avg. Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demographicData.map((row) => (
            <TableRow key={row.segment}>
              <TableCell className="font-medium">{row.segment}</TableCell>
              <TableCell className="text-right">{row.referrals}</TableCell>
              <TableCell className="text-right">{row.conversions}</TableCell>
              <TableCell className="text-right">{row.conversionRate}</TableCell>
              <TableCell className="text-right">{row.avgValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-1/2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="referrals" name="Referrals" fill="#3b82f6" />
            <Bar dataKey="conversions" name="Conversions" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-1/2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="referrals"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {userData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Referrals"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
