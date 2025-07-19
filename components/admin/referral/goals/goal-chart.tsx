"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for goal progress over time
const data = [
  {
    week: "Week 1",
    "Q1 Parent Referral Drive": 10,
    "Staff Referral Challenge": 15,
    "Alumni Network Growth": 5,
    "Student Ambassador Program": 8,
  },
  {
    week: "Week 2",
    "Q1 Parent Referral Drive": 20,
    "Staff Referral Challenge": 25,
    "Alumni Network Growth": 15,
    "Student Ambassador Program": 12,
  },
  {
    week: "Week 3",
    "Q1 Parent Referral Drive": 35,
    "Staff Referral Challenge": 35,
    "Alumni Network Growth": 25,
    "Student Ambassador Program": 15,
  },
  {
    week: "Week 4",
    "Q1 Parent Referral Drive": 45,
    "Staff Referral Challenge": 45,
    "Alumni Network Growth": 30,
    "Student Ambassador Program": 20,
  },
  {
    week: "Week 5",
    "Q1 Parent Referral Drive": 58,
    "Staff Referral Challenge": 60,
    "Alumni Network Growth": 40,
    "Student Ambassador Program": 25,
  },
  {
    week: "Week 6",
    "Q1 Parent Referral Drive": 65,
    "Staff Referral Challenge": 70,
    "Alumni Network Growth": 45,
    "Student Ambassador Program": 30,
  },
  {
    week: "Week 7",
    "Q1 Parent Referral Drive": 75,
    "Staff Referral Challenge": 80,
    "Alumni Network Growth": 50,
    "Student Ambassador Program": 32,
  },
  {
    week: "Week 8",
    "Q1 Parent Referral Drive": 85,
    "Staff Referral Challenge": 84,
    "Alumni Network Growth": 55,
    "Student Ambassador Program": 35,
  },
]

export function GoalChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="Q1 Parent Referral Drive" stroke="#4f46e5" strokeWidth={2} />
        <Line type="monotone" dataKey="Staff Referral Challenge" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="Alumni Network Growth" stroke="#8b5cf6" strokeWidth={2} />
        <Line type="monotone" dataKey="Student Ambassador Program" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
