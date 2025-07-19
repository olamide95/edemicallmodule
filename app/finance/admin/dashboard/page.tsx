import type { Metadata } from "next"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentTransactions } from "@/components/admin/recent-transactions"
import { OutstandingPayments } from "@/components/admin/outstanding-payments"
import { CollectionChart } from "@/components/admin/dashboard/collection-chart"
import { PaymentMethodsChart } from "@/components/admin/dashboard/payment-methods-chart"
import { FeeDistributionChart } from "@/components/admin/dashboard/fee-distribution-chart"
import { CollectionRateChart } from "@/components/admin/dashboard/collection-rate-chart"

export const metadata: Metadata = {
  title: "Admin Dashboard | School Finance Management",
  description: "Financial overview and key metrics for school administrators",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Financial overview and key metrics for your institution</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CollectionChart />
        </div>
        <div>
          <PaymentMethodsChart />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions />
        <OutstandingPayments />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeeDistributionChart />
        <CollectionRateChart />
      </div>
    </div>
  )
}
