import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParentReferralDashboard } from "@/components/parent/referral/parent-referral-dashboard"
import { ParentReferralList } from "@/components/parent/referral/parent-referral-list"
import { ParentReferralRequests } from "@/components/parent/referral/parent-referral-requests"
import { LayoutWrapper } from "@/components/layout-wrapper" // You'll need to create this component

export const metadata: Metadata = {
  title: "Referral Program",
  description: "Manage your referrals and earn rewards",
}

export default function ParentReferralPage() {
  return (
    <LayoutWrapper
      title="Referral Program"
      breadcrumbs={[
        { label: "Parent Portal", href: "#" },
        { label: "Referral Program", href: "#", isCurrent: true }
      ]}
      description="Refer new students and earn rewards"
      headerAction={
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
          How It Works
        </button>
      }
    >
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Reward Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ParentReferralDashboard />
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <ParentReferralList />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <ParentReferralRequests />
        </TabsContent>
      </Tabs>
    </LayoutWrapper>
  )
}