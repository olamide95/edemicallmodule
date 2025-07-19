"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("admin")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate credentials against an API
    // For now, we'll just redirect to the appropriate dashboard
    if (activeTab === "admin") {
      router.push("/admin/dashboard")
    } else if (activeTab === "parent") {
      router.push("/parent/dashboard")
    } else if (activeTab === "student") {
      router.push("/student/dashboard")
    } else if (activeTab === "staff") {
      router.push("/staff/dashboard")
    } else if (activeTab === "alumni") {
      router.push("/alumni/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">SchoolFinance</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Choose your account type and enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" type="email" placeholder="admin@school.edu" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="admin-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login to Admin Portal
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="staff">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-email">Email</Label>
                  <Input id="staff-email" type="email" placeholder="staff@school.edu" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="staff-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="staff-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login to Staff Portal
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="parent">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Email</Label>
                  <Input id="parent-email" type="email" placeholder="parent@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="parent-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="parent-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login to Parent Portal
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="student">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input id="student-id" placeholder="STU12345" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="student-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login to Student Portal
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="alumni">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="alumni-email">Email</Label>
                  <Input id="alumni-email" type="email" placeholder="alumni@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alumni-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="alumni-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login to Alumni Portal
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account? Contact your school administrator
          </div>
          <div className="text-xs text-center text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
