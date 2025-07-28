"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ApexOptions } from "apexcharts"

// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// Define the session keys as a union type
type SessionKey = "This Term" | "Last Term" | "Last Session"

// Session data with different values for each period
const sessionData: Record<SessionKey, { name: string; label: string; value: number; color: string }[]> = {
  "This Term": [
    { name: "Male", label: "male", value: 41, color: "#16b1ff" },
    { name: "Female", label: "female", value: 80, color: "#8c57ff" },
  ],
  "Last Term": [
    { name: "Male", label: "male", value: 38, color: "#16b1ff" },
    { name: "Female", label: "female", value: 72, color: "#8c57ff" },
  ],
  "Last Session": [
    { name: "Male", label: "male", value: 45, color: "#16b1ff" },
    { name: "Female", label: "female", value: 65, color: "#8c57ff" },
  ],
}
  // Remove this duplicate state declaration
export function PopulationByGender() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedSession, setSelectedSession] = useState<SessionKey>("This Term")
  const [sessionTitle, setSessionTitle] = useState<string>("2024-2025 Session")

  // Update session title when selected session changes
  useEffect(() => {
    if (selectedSession === "This Term") {
      setSessionTitle("2024-2025 Session")
    } else if (selectedSession === "Last Term") {
      setSessionTitle("2023-2024 Term 3")
    } else {
      setSessionTitle("2023-2024 Session")
    }
  }, [selectedSession])

  // Only render the chart on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const data = sessionData[selectedSession]
  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "inherit",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: data.map((item) => item.color),
    labels: data.map((item) => item.label),
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: any, opts: { w: { globals: { labels: { [x: string]: any }; series: { [x: string]: any } } }; seriesIndex: string | number }) => {
        const name = opts.w.globals.labels[opts.seriesIndex]
        const value = opts.w.globals.series[opts.seriesIndex]
        return [name, value]
      },
      style: {
        fontSize: "16px",
        fontFamily: "inherit",
        fontWeight: "bold",
        colors: ["#fff"],
      },
      background: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: "light",
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: (val: number) => val + " students",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
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
    <Card className="overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="relative mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{sessionTitle}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm outline-none">
                <span>{selectedSession}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(sessionData) as SessionKey[]).map((session) => (
                  <DropdownMenuItem
                    key={session}
                    onClick={() => setSelectedSession(session)}
                    className={selectedSession === session ? "bg-muted" : ""}
                  >
                    {session}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="absolute top-[14px] left-0 w-full h-[1px] bg-gray-200">
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-[#16b1ff]"></div>
          </div>
        </div>
        <div className="p-0">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              {isMounted ? (
                <Chart options={chartOptions} series={series} type="pie" height={350} />
              ) : (
                <div className="flex h-[350px] w-full items-center justify-center">
                  <p className="text-gray-500">Loading chart...</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-8">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
