import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Staff Dashboard",
  description: "Staff dashboard for school management system",
}

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Staff Member!</h2>
        <p className="text-muted-foreground">Here's an overview of your referrals and activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Referrals</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Successful Enrollments</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">66% conversion rate</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rewards Earned</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">$450</p>
            <p className="text-xs text-muted-foreground">Next payout: June 15</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-muted-foreground">Grade 9 • May 15, 2023</p>
              </div>
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">Enrolled</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Grade 5 • May 10, 2023</p>
              </div>
              <span className="text-sm bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Pending</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Michael Brown</p>
                <p className="text-sm text-muted-foreground">Grade 7 • May 5, 2023</p>
              </div>
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">Enrolled</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Your Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Monthly Goal (5 referrals)</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Quarterly Goal (15 referrals)</span>
                <span className="text-sm font-medium">53%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "53%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Annual Goal (40 referrals)</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
