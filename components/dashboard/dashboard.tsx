import { AdmissionMetrics } from "@/components/dashboard/admission-metrics"
import { AdmissionStatistics } from "@/components/dashboard/admission-statistics"
import { AdmissionStatusTable } from "@/components/dashboard/admission-status-table"
import { DashboardSummary } from "@/components/dashboard/dashboard-summary"
import { AdmissionGrowthChart } from "@/components/dashboard/admission-growth-chart"
import { AdmissionStats } from "@/components/dashboard/admission-stats"
import { AdmissionMediumChart } from "@/components/dashboard/admission-medium-chart"
import { NoticeBoard } from "@/components/dashboard/notice-board"
import { PopulationByGender } from "@/components/dashboard/population-by-gender"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import  AdmissionByClassChart  from "@/components/dashboard/admission-by-class-chart"
import  SiblingAdmissionChart  from "@/components/dashboard/sibling-admission-chart"
import  ConversionRateCard  from "@/components/dashboard/conversion-rate-card"
import  GrowthRateCard  from "@/components/dashboard/growth-rate-card"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admissions Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Top metrics and statistics */}
        <AdmissionMetrics />
        <AdmissionStatistics />

        {/* New components from Figma design */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AdmissionMediumChart />
          <NoticeBoard />
          <PopulationByGender />
        </div>

        {/* Existing components */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Admission by Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdmissionByClassChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Sibling vs Single Admission</CardTitle>
                </CardHeader>
                <CardContent>
                  <SiblingAdmissionChart />
                </CardContent>
              </Card>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversionRateCard />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <GrowthRateCard />
                </CardContent>
              </Card>
            </div>
          
      </div>
    </div>
  )
}
