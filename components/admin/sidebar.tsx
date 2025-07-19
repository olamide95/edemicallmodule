"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Percent,
  Receipt,
  Settings,
  Award,
  ChevronDown,
  ChevronRight,
  DollarSign,
  FileBarChart,
  ListChecks,
  UserPlus,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isReferralOpen, setIsReferralOpen] = useState(false)

  // Check if current path is under referral section
  useEffect(() => {
    if (pathname?.includes("/admin/referral")) {
      setIsReferralOpen(true)
    }
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  const isActiveSection = (section: string) => {
    return pathname?.includes(section)
  }

  // Replace the handleReferralClick function with this updated version
  const handleReferralClick = (e: React.MouseEvent) => {
    // Only toggle the dropdown state, don't navigate
    setIsReferralOpen(!isReferralOpen)
  }

  // Define icon colors
  const iconColors = {
    dashboard: "#56CA00",
    collections: "#16B1FF",
    feeManagement: "#FFB400",
    credits: "#8C57FF",
    discounts: "#FF4C51",
    fines: "#FF4C51",
    writeOff: "#8A8D93",
    statements: "#16B1FF",
    reports: "#56CA00",
    referral: "#FFB400",
    settings: "#8A8D93",
    chat: "#8C57FF",
  }

  return (
    <ScrollArea className="h-full py-6 pl-4 pr-6">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Finance & Facility</h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={isActive("/admin/dashboard") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/dashboard" className="flex items-center w-full">
                <LayoutDashboard
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/dashboard") ? "#FFFFFF" : iconColors.dashboard }}
                />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/collections") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/collections" className="flex items-center w-full">
                <Receipt
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/collections") ? "#FFFFFF" : iconColors.collections }}
                />
                <span>Collections</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/fee-management") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/fee-management" className="flex items-center w-full">
                <FileText
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/fee-management") ? "#FFFFFF" : iconColors.feeManagement }}
                />
                <span>Fee Management</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/credits") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/credits" className="flex items-center w-full">
                <CreditCard
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/credits") ? "#FFFFFF" : iconColors.credits }}
                />
                <span>Credits</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/discounts") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/discounts" className="flex items-center w-full">
                <Percent
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/discounts") ? "#FFFFFF" : iconColors.discounts }}
                />
                <span>Discounts</span>
              </Link>
            </Button>
            <Button asChild variant={isActive("/admin/fines") ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/admin/fines" className="flex items-center w-full">
                <DollarSign
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/fines") ? "#FFFFFF" : iconColors.fines }}
                />
                <span>Fines</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/write-off") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/write-off" className="flex items-center w-full">
                <FileBarChart
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/write-off") ? "#FFFFFF" : iconColors.writeOff }}
                />
                <span>Write-off</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/statements") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/statements" className="flex items-center w-full">
                <FileText
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/statements") ? "#FFFFFF" : iconColors.statements }}
                />
                <span>Statements</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/admin/reports") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/reports" className="flex items-center w-full">
                <BarChart3
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/reports") ? "#FFFFFF" : iconColors.reports }}
                />
                <span>Reports</span>
              </Link>
            </Button>

            {/* Referral Program Section */}
            <div className="space-y-1">
              <Button
                variant={isActiveSection("/admin/referral") ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={handleReferralClick}
              >
                <Award
                  className="mr-2 h-4 w-4"
                  style={{ color: isActiveSection("/admin/referral") ? "#FFFFFF" : iconColors.referral }}
                />
                <span>Referral Program</span>
                {isReferralOpen ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Button>

              {isReferralOpen && (
                <div className="ml-4 space-y-1 pt-1">
                  <Button
                    asChild
                    variant={isActive("/admin/referral/dashboard") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/dashboard" className="flex items-center w-full">
                      <LayoutDashboard
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/dashboard") ? "#FFFFFF" : iconColors.dashboard }}
                      />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/list") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/list" className="flex items-center w-full">
                      <ListChecks
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/list") ? "#FFFFFF" : iconColors.collections }}
                      />
                      <span>Referral List</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/goals") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/goals" className="flex items-center w-full">
                      <Target
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/goals") ? "#FFFFFF" : iconColors.feeManagement }}
                      />
                      <span>Goals</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/analytics") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/analytics" className="flex items-center w-full">
                      <BarChart3
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/analytics") ? "#FFFFFF" : iconColors.reports }}
                      />
                      <span>Analytics</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/programs") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/programs" className="flex items-center w-full">
                      <UserPlus
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/programs") ? "#FFFFFF" : iconColors.credits }}
                      />
                      <span>Programs</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/payouts") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/payouts" className="flex items-center w-full">
                      <DollarSign
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/payouts") ? "#FFFFFF" : iconColors.fines }}
                      />
                      <span>Payouts</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={isActive("/admin/referral/settings") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Link href="/admin/referral/settings" className="flex items-center w-full">
                      <Settings
                        className="mr-2 h-4 w-4"
                        style={{ color: isActive("/admin/referral/settings") ? "#FFFFFF" : iconColors.settings }}
                      />
                      <span>Settings</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <Button
              asChild
              variant={isActive("/admin/settings") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/admin/settings" className="flex items-center w-full">
                <Settings
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/settings") ? "#FFFFFF" : iconColors.settings }}
                />
                <span>Settings</span>
              </Link>
            </Button>
            <Button asChild variant={isActive("/admin/chat") ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/admin/chat" className="flex items-center w-full">
                <MessageSquare
                  className="mr-2 h-4 w-4"
                  style={{ color: isActive("/admin/chat") ? "#FFFFFF" : iconColors.chat }}
                />
                <span>Chat Support</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
