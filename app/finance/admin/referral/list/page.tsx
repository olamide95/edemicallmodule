import type { Metadata } from "next"
import { ReferralList } from "@/components/admin/referral/referral-list"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Referral List | School Finance Management",
  description: "Manage all referrals in the system",
}

export default function ReferralListPage() {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Referral List</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Referral Program</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">All Referrals</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Comprehensive view of all referral activities and their current status
                </p>

                <div className="flex gap-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Referral
                  </Button>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search referrals..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/referral-list-illustration.png"
                  alt="Referral List Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">All Referral Activities</h2>
                <p className="text-sm text-muted-foreground">
                  Filter and manage referrals across all user types
                </p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>

            <ReferralList />
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