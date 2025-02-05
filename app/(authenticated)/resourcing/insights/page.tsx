"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResourceInsights } from "@/components/resourcing/resource-insights"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

export default function InsightsPage() {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Last 90 days
    to: new Date()
  })

  const dateRangeText = `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resource Insights</h2>
          <p className="text-muted-foreground">
            Where are we spending our resources? Analyze task distribution and team allocation.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Task Distribution Analysis</CardTitle>
                <CardDescription>
                  Understand which projects have taken most attention recently
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRangeText}
                </Button>
                <Select defaultValue="tasks">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select measure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tasks">Task count</SelectItem>
                    <SelectItem value="time">Time spent</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResourceInsights dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 