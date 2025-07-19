import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReferralAnalyticsOverview } from "@/components/admin/referral/analytics/overview"
import { ReferralConversionFunnel } from "@/components/admin/referral/analytics/conversion-funnel"
import { ReferralSourceAnalysis } from "@/components/admin/referral/analytics/source-analysis"
import { ReferralFinancialImpact } from "@/components/admin/referral/analytics/financial-impact"
import { ReferralTrendAnalysis } from "@/components/admin/referral/analytics/trend-analysis"
import { ReferralUserTypeComparison } from "@/components/admin/referral/analytics/user-type-comparison"
import { ReferralPerformanceTable } from "@/components/admin/referral/analytics/performance-table"
import { DateRangePicker } from "@/components/admin/referral/analytics/date-range-picker"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Referral Analytics | School Finance Management",
  description: "Detailed analytics and insights for the school's referral program",
}

export default function ReferralAnalyticsPage() {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Referral Analytics</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Referral Program</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Comprehensive analytics and insights for your school's referral program performance and impact
                </p>

                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                  View Documentation
                </button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/analytics-illustration.png"
                  alt="Analytics Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-end">
              <DateRangePicker />
            </div>

            <ReferralAnalyticsOverview />

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="conversion">Conversion</TabsTrigger>
                <TabsTrigger value="sources">Sources</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Referral Trends</CardTitle>
                      <CardDescription>Monthly referral activity over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralTrendAnalysis />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>User Type Performance</CardTitle>
                      <CardDescription>Referral performance by user type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralUserTypeComparison />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Individuals with the highest referral success</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReferralPerformanceTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conversion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>Referral journey from invitation to enrollment</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ReferralConversionFunnel />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion by User Type</CardTitle>
                      <CardDescription>How different user types convert</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralUserTypeComparison metric="conversion" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion Timeline</CardTitle>
                      <CardDescription>Average time from referral to enrollment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralTrendAnalysis metric="conversionTime" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Sources</CardTitle>
                    <CardDescription>Where referrals are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReferralSourceAnalysis />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Channel Performance</CardTitle>
                      <CardDescription>Effectiveness of different referral channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralSourceAnalysis metric="performance" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Distribution</CardTitle>
                      <CardDescription>Referral activity by location</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralSourceAnalysis metric="geography" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Impact</CardTitle>
                    <CardDescription>Revenue and cost analysis of the referral program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReferralFinancialImpact />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>ROI Analysis</CardTitle>
                      <CardDescription>Return on investment for the referral program</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralFinancialImpact metric="roi" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cost per Acquisition</CardTitle>
                      <CardDescription>Average cost to acquire a new student through referrals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralFinancialImpact metric="cpa" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Comparison</CardTitle>
                      <CardDescription>Performance across different referral programs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralUserTypeComparison metric="programs" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Year-over-Year</CardTitle>
                      <CardDescription>Referral performance compared to previous years</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReferralTrendAnalysis metric="yoy" />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Demographic Analysis</CardTitle>
                    <CardDescription>Referral performance across different demographic segments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReferralUserTypeComparison metric="demographics" />
                  </CardContent>
                </Card>
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