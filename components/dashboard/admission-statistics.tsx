"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// Sample data for the chart
const data = [
  {
    name: "Early Years",
    Applied: 50,
    Accepted: 40,
    Enrolled: 35,
    Waitlisted: 10,
  },
  {
    name: "Toddlers",
    Applied: 60,
    Accepted: 45,
    Enrolled: 40,
    Waitlisted: 15,
  },
  {
    name: "Grade 1",
    Applied: 80,
    Accepted: 65,
    Enrolled: 60,
    Waitlisted: 20,
  },
  {
    name: "Grade 2",
    Applied: 100,
    Accepted: 85,
    Enrolled: 75,
    Waitlisted: 25,
  },
  {
    name: "Grade 3",
    Applied: 70,
    Accepted: 60,
    Enrolled: 55,
    Waitlisted: 15,
  },
  {
    name: "Grade 4",
    Applied: 75,
    Accepted: 65,
    Enrolled: 60,
    Waitlisted: 10,
  },
  {
    name: "Grade 5",
    Applied: 85,
    Accepted: 70,
    Enrolled: 65,
    Waitlisted: 20,
  },
  {
    name: "Grade 6",
    Applied: 65,
    Accepted: 55,
    Enrolled: 50,
    Waitlisted: 10,
  },
  {
    name: "JSS1",
    Applied: 90,
    Accepted: 75,
    Enrolled: 70,
    Waitlisted: 20,
  },
  {
    name: "JSS2",
    Applied: 80,
    Accepted: 70,
    Enrolled: 65,
    Waitlisted: 15,
  },
  {
    name: "JSS3",
    Applied: 95,
    Accepted: 80,
    Enrolled: 75,
    Waitlisted: 20,
  },
  {
    name: "SS1",
    Applied: 70,
    Accepted: 60,
    Enrolled: 55,
    Waitlisted: 15,
  },
]

export function AdmissionStatistics() {
  const [isMounted, setIsMounted] = useState(false)

  // Only render the chart on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const chartOptions = {
    chart: {
      type: "bar" as "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
    },
    colors: ["#ffb400", "#56ca00", "#16b1ff", "#8c57ff"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.map((item) => item.name),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      max: 400,
      tickAmount: 4,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: (value: number) => Math.round(value).toString(),
      },
    },
    grid: {
      borderColor: "#f0f0f0",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[][],
        seriesIndex: number,
        dataPointIndex: number,
        w: any
      }) => {
        const gradeName = data[dataPointIndex].name
        const colors = ["#ffb400", "#56ca00", "#16b1ff", "#8c57ff"]
        const categories = ["Waitlisted", "Applied", "Accepted", "Enrolled"]

        let tooltipContent = `
          <div class="apexcharts-tooltip-box" style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 8px; color: #111827;">${gradeName}</div>
        `

        // Loop through each series in reverse to match the stacking order
        for (let i = series.length - 1; i >= 0; i--) {
          const value = series[i][dataPointIndex]
          tooltipContent += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${colors[i]}; margin-right: 6px;"></span>
                <span style="color: #6B7280;">${categories[i]}:</span>
              </div>
              <span style="font-weight: 500; color: #111827;">${value} students</span>
            </div>
          `
        }

        tooltipContent += `</div>`
        return tooltipContent
      },
    },
  }

  const series = [
    {
      name: "Waitlisted",
      data: data.map((item) => item.Waitlisted),
    },
    {
      name: "Applied",
      data: data.map((item) => item.Applied),
    },
    {
      name: "Accepted",
      data: data.map((item) => item.Accepted),
    },
    {
      name: "Enrolled",
      data: data.map((item) => item.Enrolled),
    },
  ]

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase">Admission Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {isMounted ? (
            <Chart options={chartOptions} series={series} type="bar" height={300} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-500">Loading chart...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
