"use client"
// ... existing imports ...
import { api } from '@/lib/api';
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Facebook, Twitter, Github } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

type UserRole = "admin" | "teacher" | "parent" | "student" | "alumni"

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<UserRole>("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()
 

// Then in handleLogin:

// In your handleLogin function:
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    // Store in localStorage
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('userRole', response.role);
    localStorage.setItem('tenantId', response.tenantId);
    if (response.branchId) {
      localStorage.setItem('branchId', response.branchId);
    }

    // Also set as HTTP-only cookie
    document.cookie = `accessToken=${response.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax; Secure`;

    // Verify role
    if (response.role !== activeRole) {
      throw new Error(`Please login using the ${response.role} tab`);
    }
    const roleRoutes = {
      admin: './onboarding',
      teacher: '/teacher/dashboard',
      parent: '/parent/dashboard',
      student: '/student/dashboard',
      alumni: '/alumni/dashboard'
    };


    // Redirect
    router.push(roleRoutes[response.role]);
  } catch (error) {
    toast.error(error.message || 'Login failed');
  } finally {
    setIsLoading(false);
  }
};

  const getRoleDisplayName = (role: UserRole) => {
    const roleNames = {
      admin: "Admin",
      teacher: "Teacher",
      parent: "Parent",
      student: "Student",
      alumni: "Alumni",
    }
    return roleNames[role]
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#F4F5FA] dark:bg-[#28243D]">
        <div className="absolute top-6 left-6 z-10">
          <Logo collapsed={false} />
        </div>

        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-center w-full h-full p-8">
          <div className="relative w-full max-w-lg">
            <Image
              src="/login-illustration.png"
              alt="Login Illustration"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-[#312D4B]">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo and Theme Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Logo collapsed={false} />
            <ThemeToggle />
          </div>

          {/* Welcome Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Edemics ERP! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400 italic">"one platform, endless possibilities."</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Please sign-in to your account with your default password and start the adventure
            </p>
          </div>

          {/* Role Selection Tabs - Line Style */}
          <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-transparent border-b border-gray-200 dark:border-gray-700">
              <TabsTrigger
                value="admin"
                className="text-xs bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#8C57FF] data-[state=active]:border-b-2 data-[state=active]:border-[#8C57FF] rounded-none"
              >
                Admin
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="text-xs bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#8C57FF] data-[state=active]:border-b-2 data-[state=active]:border-[#8C57FF] rounded-none"
              >
                Teacher
              </TabsTrigger>
              <TabsTrigger
                value="parent"
                className="text-xs bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#8C57FF] data-[state=active]:border-b-2 data-[state=active]:border-[#8C57FF] rounded-none"
              >
                Parent
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="text-xs bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#8C57FF] data-[state=active]:border-b-2 data-[state=active]:border-[#8C57FF] rounded-none"
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="alumni"
                className="text-xs bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#8C57FF] data-[state=active]:border-b-2 data-[state=active]:border-[#8C57FF] rounded-none"
              >
                Alumni
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeRole} className="space-y-6">
              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#8C57FF] hover:bg-[#7C3AED] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Signing in..." : "Login →"}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-gray-600 dark:text-gray-400">New on our platform? </span>
                <Link href="/register" className="text-[#8C57FF] hover:text-[#7C3AED] font-medium">
                  Create an account
                </Link>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#312D4B] text-gray-500 dark:text-gray-400">or</span>
                </div>
              </div>

              {/* Social Login - Updated Google Icon */}
              <div className="flex justify-center space-x-4">
                <button className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Facebook size={20} className="text-blue-600" />
                </button>
                <button className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Twitter size={20} className="text-blue-400" />
                </button>
                <button className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Github size={20} className="text-gray-900 dark:text-white" />
                </button>
                <button className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}