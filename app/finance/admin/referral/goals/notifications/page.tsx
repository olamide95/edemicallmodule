import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "@/components/admin/referral/goals/notification-settings"
import { NotificationPreview } from "@/components/admin/referral/goals/notification-preview"
import { NotificationHistory } from "@/components/admin/referral/goals/notification-history"
import { NotificationCenter } from "@/components/admin/referral/goals/notification-center"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BellPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "Goal Notifications | School Finance Management",
  description: "Manage notifications for referral goal milestones",
}

export default function GoalNotificationsPage() {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Goal Notifications</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Referral Program</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Notifications</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Configure and manage notifications for goal milestones and participant progress
                </p>

                <Button>
                  <BellPlus className="mr-2 h-4 w-4" />
                  New Notification Template
                </Button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/notifications-illustration.png"
                  alt="Notifications Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="settings" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="center">Notification Center</TabsTrigger>
                </TabsList>
                <Button variant="outline" className="ml-4">
                  Quick Test
                </Button>
              </div>

              <TabsContent value="settings" className="space-y-4">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="preview" className="space-y-4">
                <NotificationPreview />
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <NotificationHistory />
              </TabsContent>
              <TabsContent value="center" className="space-y-4">
                <NotificationCenter />
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