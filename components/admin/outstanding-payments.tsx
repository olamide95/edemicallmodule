"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface OutstandingPayment {
  id: string
  student: string
  class: string
  amount: string
  dueDate: string
  daysOverdue: number
}

const outstandingPayments: OutstandingPayment[] = [
  {
    id: "1",
    student: "Ravi Kumar",
    class: "Grade 10-A",
    amount: "₹15,800",
    dueDate: "2023-03-15",
    daysOverdue: 45,
  },
  {
    id: "2",
    student: "Neha Gupta",
    class: "Grade 11-B",
    amount: "₹18,500",
    dueDate: "2023-03-20",
    daysOverdue: 40,
  },
  {
    id: "3",
    student: "Arjun Singh",
    class: "Grade 9-C",
    amount: "₹12,200",
    dueDate: "2023-03-25",
    daysOverdue: 35,
  },
  {
    id: "4",
    student: "Meera Patel",
    class: "Grade 8-A",
    amount: "₹9,500",
    dueDate: "2023-03-30",
    daysOverdue: 30,
  },
]

export function OutstandingPayments() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Outstanding Payments</CardTitle>
          <CardDescription>Students with overdue fee payments</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {outstandingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {payment.student
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{payment.student}</div>
                  <div className="text-sm text-muted-foreground">{payment.class}</div>
                </div>
              </div>
              <div className="hidden md:block text-sm text-muted-foreground">
                Due: {new Date(payment.dueDate).toLocaleDateString()}
              </div>
              <div className="text-right">
                <div className="font-medium">{payment.amount}</div>
                <Badge variant="destructive" className="mt-1">
                  {payment.daysOverdue} days overdue
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
