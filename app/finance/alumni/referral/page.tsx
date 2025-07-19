import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Alumni Referral Program",
  description: "Alumni referral program for school management system",
}

export default function AlumniReferralPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Referral Program</h2>
        <p className="text-muted-foreground">
          Refer new students and earn rewards for successful enrollments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">71% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">Next payout: June 15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Last updated: May 20</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="refer">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="refer">Refer a Student</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
        </TabsList>
        <TabsContent value="refer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refer a New Student</CardTitle>
              <CardDescription>
                Fill out the form below to refer a new student to our school.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="parent-name" className="text-sm font-medium">Parent Name</label>
                  <input
                    id="parent-name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter parent name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="parent-email" className="text-sm font-medium">Parent Email</label>
                  <input
                    id="parent-email"
                    type="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter parent email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="parent-phone" className="text-sm font-medium">Parent Phone</label>
                  <input
                    id="parent-phone"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter parent phone"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="student-grade" className="text-sm font-medium">Student Grade</label>
                  <select
                    id="student-grade"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select grade</option>
                    <option value="K">Kindergarten</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">\
