import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaffReferralDashboard } from "@/components/staff/referral/staff-referral-dashboard"
import { StaffReferralList } from "@/components/staff/referral/staff-referral-list"
import { StaffReferralRequests } from "@/components/staff/referral/staff-referral-requests"
import { StaffReferralEnrollment } from "@/components/staff/referral/staff-referral-enrollment"

export const metadata: Metadata = {
  title: "Staff Referral Program",
  description: "Manage your referrals and earn rewards",
}

export default function StaffReferralPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Referral Program</h2>
        <p className="text-muted-foreground">Refer new students and earn rewards</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Reward Requests</TabsTrigger>
          <TabsTrigger value="enrollment">Program Enrollment</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <StaffReferralDashboard />
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <StaffReferralList />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <StaffReferralRequests />
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-6">
          <StaffReferralEnrollment />
        </TabsContent>
      </Tabs>
    </div>
  )
}
