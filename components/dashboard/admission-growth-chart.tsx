"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import dynamic from "next/dynamic"
import type { ApexOptions } from "apexcharts"

// Dynamically import ApexCharts with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const legendItems = [
  { name: "Form Submitted", color: "#8C57FF" },
  { name: "Assessment", color: "#D77CF7" },
  { name: "Awaiting Payment", color: "#FFB400" },
  { name: "Admitted", color: "#16B1FF" },
]

const sortOptions = ["Grade Level", "Admission Count", "Alphabetical"]

const originalCategories = [
  "Toddlers",
  "Nursery 1",
  "Nursery 2",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "JSS 1",
  "JSS 2",
  "JSS 3",
]

// Original data series - with Awaiting Payment values lower than Admitted
const originalSeries = [
  {
    name: "Form Submitted",
    data: [22, 25, 30, 32, 20, 25, 30, 35, 40, 42, 28, 30],
  },
  {
    name: "Assessment",
    data: [28, 32, 42, 30, 26, 26, 35, 40, 42, 32, 32, 30],
  },
  {
    name: "Awaiting Payment",
    data: [35, 40, 35, 45, 35, 30, 30, 30, 35, 30, 25, 35], // Reduced values to be lower than Admitted
  },
  {
    name: "Admitted",
    data: [43, 53, 42, 65, 42, 38, 39, 35, 42, 35, 38, 41],
  },
]
  
export function AdmissionGrowthChart() {
  const [sortBy, setSortBy] = useState("Grade Level")
  const [isMounted, setIsMounted] = useState(false)

  // Only render the chart on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Calculate total admissions for each grade level
  const totalAdmissions = useMemo(() => {
    return originalCategories.map((_, index) => {
      return originalSeries.reduce((sum, series) => sum + series.data[index], 0)
    })
  }, [])

  // Sort the data based on the selected sorting option
  const { categories, series } = useMemo(() => {
    // Create an array of indices to sort
    const indices = Array.from({ length: originalCategories.length }, (_, i) => i)

    // Sort the indices based on the selected sorting option
    if (sortBy === "Grade Level") {
      // Default order, no sorting needed
    } else if (sortBy === "Admission Count") {
      indices.sort((a, b) => totalAdmissions[b] - totalAdmissions[a])
    } else if (sortBy === "Alphabetical") {
      indices.sort((a, b) => originalCategories[a].localeCompare(originalCategories[b]))
    }

    // Create new categories array based on sorted indices
    const sortedCategories = indices.map((i) => originalCategories[i])

    // Create new series array with data reordered based on sorted indices
    const sortedSeries = originalSeries.map((s) => ({
      name: s.name,
      data: indices.map((i) => s.data[i]),
    }))

    return { categories: sortedCategories, series: sortedSeries }
  }, [sortBy, totalAdmissions])
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 400,
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
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
    colors: ["#8C57FF", "#D77CF7", "#FFB400", "#16B1FF"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      tickAmount: 7,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: (value: number) => Math.round(value).toString(),
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      theme: "light",
      x: {
        show: true,
        formatter: (val: number) => {
          return categories[val - 1]
        },
      },
      y: {
        formatter: (val: number) => {
          return val + " students"
        },
      },
      marker: {
        show: true,
      },
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) => {
        const category = categories[dataPointIndex]

        let tooltipContent = `
          <div class="apexcharts-tooltip-title" style="font-weight: 600; margin-bottom: 6px; color: #111827; font-size: 14px;">
            ${category}
          </div>
          <div style="padding: 0 8px;">
        `

        // Loop through all series to show all values
        w.globals.seriesNames.forEach((seriesName: any, index: string | number) => {
          const value = w.globals.series[index][dataPointIndex]
          const color = w.globals.colors[index]

          tooltipContent += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color}; margin-right: 6px;"></span>
                <span style="color: #4B5563;">${seriesName}:</span>
              </div>
              <span style="font-weight: 600; color: #111827; margin-left: 12px;">${value} students</span>
            </div>
          `
        })

        tooltipContent += `</div>`

        return tooltipContent
      },
    },
}

return (
  <Card className="overflow-hidden border-0 shadow-sm">
      <div className="flex items-center justify-between p-6 pb-0">
        <h2 className="text-xl font-medium text-gray-800">Admission Chart</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 border-gray-200 bg-white px-3 text-sm font-normal text-gray-700">
              <span>Sort By: {sortBy}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={sortBy === option ? "bg-gray-100" : ""}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="p-0 pt-4">
        <div className="mb-4 flex flex-wrap justify-center gap-x-8 px-6">
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="h-[400px] w-full px-4">
          {isMounted ? (
            <Chart options={chartOptions} series={series} type="area" height={400} />
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
