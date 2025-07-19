import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClubsList } from "@/components/clubs-list"
import { PlusIcon } from "lucide-react"

export default function ClubsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clubs</h1>
          <p className="text-muted-foreground">Manage extracurricular activities</p>
        </div>
        <Link href="/admin/clubs/create">
          <Button>
            <PlusIcon className="h-4 w-4 mr-1" />
            Create Club
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <ClubsList />
        </CardContent>
      </Card>
    </div>
  )
}
