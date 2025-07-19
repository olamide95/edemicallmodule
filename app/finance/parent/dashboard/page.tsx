import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ParentDashboardStats } from "@/components/parent/dashboard-stats"
import { UpcomingPayments } from "@/components/parent/upcoming-payments"
import { RecentPayments } from "@/components/parent/recent-payments"
import { PaymentSummaryChart } from "@/components/parent/payment-summary-chart"
import { ChildrenFeeStatus } from "@/components/parent/children-fee-status"

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Parent Dashboard</h1>

      <ParentDashboardStats />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Overview of your fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentSummaryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Children Fee Status</CardTitle>
            <CardDescription>Fee status for each child</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildrenFeeStatus />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Payments due in the near future</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingPayments />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your recent payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPayments />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
