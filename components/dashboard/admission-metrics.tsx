"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, FileText, Users, Clock, CreditCard } from "lucide-react"

export function AdmissionMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Completed Enrollment Forms */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eff2ff]">
                  <FileText className="h-5 w-5 text-[#8c57ff]" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Completed Enrollment Forms</span>
              </div>
              <div className="mt-3 flex items-baseline">
                <h3 className="text-3xl font-bold">42</h3>
                <span className="ml-2 rounded bg-[#eff2ff] px-2 py-0.5 text-xs font-medium text-[#8c57ff]">12,345</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <ArrowUp className="mr-1 h-3 w-3 text-[#56ca00]" />
                <span className="font-medium text-[#56ca00]">3.25%</span>
                <span className="ml-1 text-muted-foreground">this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admission in Progress */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e6f7ff]">
                  <Clock className="h-5 w-5 text-[#16b1ff]" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Admission in Progress</span>
              </div>
              <div className="mt-3 flex items-baseline">
                <h3 className="text-3xl font-bold">320</h3>
                <span className="ml-2 rounded bg-[#e6f7ff] px-2 py-0.5 text-xs font-medium text-[#16b1ff]">4,176</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <ArrowDown className="mr-1 h-3 w-3 text-[#ff4c51]" />
                <span className="font-medium text-[#ff4c51]">1.16%</span>
                <span className="ml-1 text-muted-foreground">this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admitted Students */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e6f9e6]">
                  <Users className="h-5 w-5 text-[#56ca00]" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Admitted Students</span>
              </div>
              <div className="mt-3 flex items-baseline">
                <h3 className="text-3xl font-bold">81</h3>
                <span className="ml-2 rounded bg-[#e6f9e6] px-2 py-0.5 text-xs font-medium text-[#56ca00]">7,064</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <ArrowUp className="mr-1 h-3 w-3 text-[#56ca00]" />
                <span className="font-medium text-[#56ca00]">0.25%</span>
                <span className="ml-1 text-muted-foreground">this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awaiting Payment confirmation */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff8e6]">
                  <CreditCard className="h-5 w-5 text-[#ffb400]" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Awaiting Payment confirmation</span>
              </div>
              <div className="mt-3 flex items-baseline">
                <h3 className="text-3xl font-bold">33k</h3>
                <span className="ml-2 rounded bg-[#fff8e6] px-2 py-0.5 text-xs font-medium text-[#ffb400]">1,105</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <ArrowDown className="mr-1 h-3 w-3 text-[#ff4c51]" />
                <span className="font-medium text-[#ff4c51]">0.46%</span>
                <span className="ml-1 text-muted-foreground">this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
