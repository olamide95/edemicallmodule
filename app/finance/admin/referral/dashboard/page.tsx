'use client'
import type { Metadata } from "next"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReferralStats } from "@/components/admin/referral/referral-stats"
import { ReferralChart } from "@/components/admin/referral/referral-chart"
import { RecentReferrals } from "@/components/admin/referral/recent-referrals"
import { PendingPayouts } from "@/components/admin/referral/pending-payouts"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"



export default function ReferralDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Referral Program Dashboard</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Program Overview</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Track and analyze the performance of your school's referral program
                </p>

                <div className="flex gap-4">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/referral-dashboard-illustration.png"
                  alt="Referral Dashboard Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ReferralStats />

            <div className="grid gap-6 md:grid-cols-7">
              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle>Referral Trends</CardTitle>
                  <CardDescription>Monthly referral activity by user type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReferralChart />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Pending Payouts</CardTitle>
                  <CardDescription>Referrals ready for payout</CardDescription>
                </CardHeader>
                <CardContent>
                  <PendingPayouts />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
                <CardDescription>Latest referral activity across all user types</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="parent">Parents</TabsTrigger>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                    <TabsTrigger value="student">Students</TabsTrigger>
                    <TabsTrigger value="alumni">Alumni</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <RecentReferrals />
                  </TabsContent>
                  <TabsContent value="parent">
                    <RecentReferrals userType="parent" />
                  </TabsContent>
                  <TabsContent value="staff">
                    <RecentReferrals userType="staff" />
                  </TabsContent>
                  <TabsContent value="student">
                    <RecentReferrals userType="student" />
                  </TabsContent>
                  <TabsContent value="alumni">
                    <RecentReferrals userType="alumni" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2 bg-light-card-bg dark:bg-dark-card-bg">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}