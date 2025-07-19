"use client"

import { useMemo } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReferralSourceAnalysisProps {
  metric?: "performance" | "geography"
}

export function ReferralSourceAnalysis({ metric }: ReferralSourceAnalysisProps) {
  // In a real app, this would come from an API
  const sourceData = useMemo(
    () => [
      { name: "Email", value: 35, fill: "#3b82f6" },
      { name: "WhatsApp", value: 25, fill: "#10b981" },
      { name: "SMS", value: 15, fill: "#f59e0b" },
      { name: "In Person", value: 12, fill: "#8b5cf6" },
      { name: "Social Media", value: 8, fill: "#ec4899" },
      { name: "School Website", value: 5, fill: "#06b6d4" },
    ],
    [],
  )

  const channelPerformance = useMemo(
    () => [
      { channel: "Email", sent: 1250, opened: 875, clicked: 420, converted: 145, rate: "11.6%" },
      { channel: "WhatsApp", sent: 980, opened: 920, clicked: 385, converted: 105, rate: "10.7%" },
      { channel: "SMS", sent: 750, opened: 680, clicked: 210, converted: 65, rate: "8.7%" },
      { channel: "Social Media", sent: 450, opened: 380, clicked: 125, converted: 35, rate: "7.8%" },
      { channel: "School Website", sent: 320, opened: "-", clicked: 85, converted: 22, rate: "6.9%" },
    ],
    [],
  )

  const geographyData = useMemo(
    () => [
      { location: "Lagos", referrals: 485, converted: 325, rate: "67.0%" },
      { location: "Abuja", referrals: 245, converted: 158, rate: "64.5%" },
      { location: "Port Harcourt", referrals: 185, converted: 112, rate: "60.5%" },
      { location: "Ibadan", referrals: 125, converted: 72, rate: "57.6%" },
      { location: "Kano", referrals: 95, converted: 52, rate: "54.7%" },
      { location: "Other", referrals: 113, converted: 58, rate: "51.3%" },
    ],
    [],
  )

  if (metric === "performance") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Sent</TableHead>
            <TableHead className="text-right">Opened</TableHead>
            <TableHead className="text-right">Clicked</TableHead>
            <TableHead className="text-right">Converted</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channelPerformance.map((row) => (
            <TableRow key={row.channel}>
              <TableCell className="font-medium">{row.channel}</TableCell>
              <TableCell className="text-right">{row.sent.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.opened === "-" ? "-" : row.opened.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.clicked.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.converted.toLocaleString()}</TableCell>
              <TableCell className="text-right font-medium">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (metric === "geography") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Referrals</TableHead>
            <TableHead className="text-right">Converted</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {geographyData.map((row) => (
            <TableRow key={row.location}>
              <TableCell className="font-medium">{row.location}</TableCell>
              <TableCell className="text-right">{row.referrals.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.converted.toLocaleString()}</TableCell>
              <TableCell className="text-right font-medium">{row.rate}</TableCell>
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
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-medium mb-4">Channel Effectiveness</h3>
        <ul className="space-y-3">
          {sourceData.map((source, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.fill }}></div>
                <span>{source.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{source.value}%</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${source.value * 2}%`, backgroundColor: source.fill }}
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
