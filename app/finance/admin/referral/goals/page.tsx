import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GoalsList } from "@/components/admin/referral/goals/goals-list"
import { ActiveGoals } from "@/components/admin/referral/goals/active-goals"
import { CompletedGoals } from "@/components/admin/referral/goals/completed-goals"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Referral Goals | School Finance Management",
  description: "Set and track goals for your referral campaigns",
}

export default function ReferralGoalsPage() {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Referral Goals</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Referral Program</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Goals Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Set, track, and achieve your referral program objectives with measurable goals
                </p>

                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Goal
                </Button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/goals-illustration.png"
                  alt="Goals Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="active">Active Goals</TabsTrigger>
                  <TabsTrigger value="all">All Goals</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <Button variant="outline" className="ml-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Quick Goal
                </Button>
              </div>
              
              <TabsContent value="active" className="space-y-4">
                <ActiveGoals />
              </TabsContent>
              <TabsContent value="all" className="space-y-4">
                <GoalsList />
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                <CompletedGoals />
              </TabsContent>
            </Tabs>
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