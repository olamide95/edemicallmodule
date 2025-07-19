import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alumni Dashboard",
  description: "Alumni dashboard for school management system",
}

export default function AlumniDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Alumni!</h2>
        <p className="text-muted-foreground">Here's an overview of your referrals and activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Referrals</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">7</p>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Successful Enrollments</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">71% conversion rate</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rewards Earned</span>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">$250</p>
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
                <p className="font-medium">Emma Wilson</p>
                <p className="text-sm text-muted-foreground">Grade 10 • May 12, 2023</p>
              </div>
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">Enrolled</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">James Taylor</p>
                <p className="text-sm text-muted-foreground">Grade 6 • May 8, 2023</p>
              </div>
              <span className="text-sm bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Pending</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Olivia Davis</p>
                <p className="text-sm text-muted-foreground">Grade 8 • April 30, 2023</p>
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
                <span className="text-sm font-medium">Monthly Goal (3 referrals)</span>
                <span className="text-sm font-medium">33%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "33%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Quarterly Goal (10 referrals)</span>
                <span className="text-sm font-medium">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Annual Goal (25 referrals)</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
