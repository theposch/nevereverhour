"use client"

import * as React from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export function TimesheetContent() {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    to: new Date()
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Timesheet</h2>
          <p className="text-muted-foreground">
            Track and manage your time entries
          </p>
        </div>
        <DateRangePicker
          value={dateRange}
          onChange={(range) => setDateRange(range)}
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Time Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Time entries table will be added here */}
            <div className="text-center text-muted-foreground py-8">
              Loading time entries...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

