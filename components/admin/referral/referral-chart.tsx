"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ReferralChart() {
  // In a real app, this would come from an API
  const data = useMemo(
    () => [
      {
        name: "Jan",
        parents: 12,
        staff: 8,
        students: 5,
        alumni: 3,
      },
      {
        name: "Feb",
        parents: 15,
        staff: 10,
        students: 7,
        alumni: 4,
      },
      {
        name: "Mar",
        parents: 18,
        staff: 12,
        students: 9,
        alumni: 6,
      },
      {
        name: "Apr",
        parents: 22,
        staff: 14,
        students: 11,
        alumni: 7,
      },
      {
        name: "May",
        parents: 25,
        staff: 16,
        students: 13,
        alumni: 8,
      },
      {
        name: "Jun",
        parents: 20,
        staff: 13,
        students: 10,
        alumni: 6,
      },
      {
        name: "Jul",
        parents: 18,
        staff: 11,
        students: 8,
        alumni: 5,
      },
      {
        name: "Aug",
        parents: 16,
        staff: 9,
        students: 7,
        alumni: 4,
      },
      {
        name: "Sep",
        parents: 14,
        staff: 8,
        students: 6,
        alumni: 3,
      },
      {
        name: "Oct",
        parents: 17,
        staff: 10,
        students: 8,
        alumni: 5,
      },
      {
        name: "Nov",
        parents: 19,
        staff: 12,
        students: 9,
        alumni: 6,
      },
      {
        name: "Dec",
        parents: 21,
        staff: 13,
        students: 10,
        alumni: 7,
      },
    ],
    [],
  )

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="parents" name="Parents" fill="#3b82f6" />
          <Bar dataKey="staff" name="Staff" fill="#10b981" />
          <Bar dataKey="students" name="Students" fill="#f59e0b" />
          <Bar dataKey="alumni" name="Alumni" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
