import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClubChangeTable } from "@/components/club-change-table"
import { AdminClubChangeForm } from "@/components/admin-club-change-form"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function AdminChangeClubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Change Requests</h1>
          <p className="text-muted-foreground">Manage club change requests and process transfers between clubs.</p>
        </div>
      </div>

      <Tabs defaultValue="requests">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="requests">Change Requests</TabsTrigger>
            <TabsTrigger value="new">New Change Request</TabsTrigger>
          </TabsList>
          <Button className="gap-1">
            <PlusIcon className="h-4 w-4" />
            Create Club Change
          </Button>
        </div>
        <TabsContent value="requests" className="mt-6">
          <ClubChangeTable />
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          <AdminClubChangeForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
