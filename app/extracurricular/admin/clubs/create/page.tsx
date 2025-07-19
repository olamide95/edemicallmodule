import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreateClubForm } from "@/components/create-club-form"

export default function CreateClubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Club</h1>
          <p className="text-muted-foreground">Add a new extracurricular activity</p>
        </div>
        <Link href="/admin/clubs">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <CreateClubForm />
    </div>
  )
}
