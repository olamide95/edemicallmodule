"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
import type { ApexOptions } from "apexcharts"

// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const data = [
  { name: "Referral", value: 72, color: "#ffe700" },
  { name: "Website", value: 14, color: "#40d0bd" },
  { name: "Walk-ins", value: 28, color: "#8769ff" },
  { name: "Others", value: 36, color: "#f0f2f8" },
]

export function AdmissionMediumChart() {
  const [isMounted, setIsMounted] = useState(false)

  // Only render the chart on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    colors: data.map((item) => item.color),
    labels: data.map((item) => item.name),
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "inherit",
      markers: {
        size: 12,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "inherit",
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "inherit",
              color: undefined,
              offsetY: 16,
              formatter: (val: any) => `${val}%`,
            },
            total: {
              show: true,
              label: "Referrer",
              color: "#6B7280",
              formatter: () => "72%",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) => {
        const medium = data[seriesIndex].name
        const value = data[seriesIndex].value
        const color = data[seriesIndex].color
        const percentage = ((value / series.reduce((a, b) => a + b, 0)) * 100).toFixed(1)

        return `
          <div class="apexcharts-tooltip-box" style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color}; margin-right: 6px;"></span>
              <span style="font-weight: 500; color: #111827;">${medium}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px;">
              <span style="color: #6B7280;">Students:</span>
              <span style="font-weight: 600; color: #111827;">${value} (${percentage}%)</span>
            </div>
          </div>
        `
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }

  const series = data.map((item) => item.value)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admission Medium Charts</CardTitle>
        <CardDescription>Medium through which Students are Admitted</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-full max-w-md">
          {isMounted ? (
            <Chart options={chartOptions} series={series} type="donut" height={320} />
          ) : (
            <div className="flex h-80 w-full items-center justify-center">
              <p className="text-gray-500">Loading chart...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
