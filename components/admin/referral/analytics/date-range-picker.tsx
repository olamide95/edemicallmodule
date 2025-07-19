"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  })
  const [preset, setPreset] = useState<string>("custom")

  const handlePresetChange = (value: string) => {
    setPreset(value)

    const now = new Date()
    let from: Date

    switch (value) {
      case "last7days":
        from = new Date()
        from.setDate(now.getDate() - 7)
        setDate({ from, to: now })
        break
      case "last30days":
        from = new Date()
        from.setDate(now.getDate() - 30)
        setDate({ from, to: now })
        break
      case "lastQuarter":
        from = new Date()
        from.setMonth(now.getMonth() - 3)
        setDate({ from, to: now })
        break
      case "ytd":
        from = new Date(now.getFullYear(), 0, 1)
        setDate({ from, to: now })
        break
      case "lastYear":
        from = new Date()
        from.setFullYear(now.getFullYear() - 1)
        setDate({ from, to: now })
        break
      default:
        // Keep current selection for custom
        break
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last7days">Last 7 days</SelectItem>
          <SelectItem value="last30days">Last 30 days</SelectItem>
          <SelectItem value="lastQuarter">Last quarter</SelectItem>
          <SelectItem value="ytd">Year to date</SelectItem>
          <SelectItem value="lastYear">Last year</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              if (newDate?.from && newDate?.to) {
                setPreset("custom")
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button variant="default">Apply</Button>
    </div>
  )
}
