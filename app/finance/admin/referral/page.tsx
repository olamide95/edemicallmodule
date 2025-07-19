import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Referral Program | School Finance Management",
  description: "Manage and track student referrals",
}

export default function ReferralProgramPage() {
  // Redirect to the dashboard page
  redirect("/finance/admin/referral/dashboard")
}
