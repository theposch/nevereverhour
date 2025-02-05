"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TotalHoursSettings } from "./total-hours-settings"
import { calculatePercentageChange, formatHours, formatPercentageChange } from "../../lib/utils/time"
import { fetchWeeklyHours } from "./total-hours-card-server"
import { WeeklyHoursData, PACT_STUDIO_WORKSPACE } from "../../lib/types/time"

export function TotalHoursCard() {
  // By default, show only Pact Studio workspace
  const [showAllWorkspaces, setShowAllWorkspaces] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [data, setData] = React.useState<WeeklyHoursData>({
    currentHours: 0,
    previousHours: 0
  })

  const fetchHours = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Debug: Log current filter state
      console.log("Current filter state:", {
        showAllWorkspaces,
        defaultWorkspace: PACT_STUDIO_WORKSPACE
      })

      const options = {
        workspaceId: showAllWorkspaces ? undefined : PACT_STUDIO_WORKSPACE
      }

      // Debug: Log API request options
      console.log("API request options:", {
        options,
        willFilterByWorkspace: !showAllWorkspaces,
        workspaceBeingUsed: showAllWorkspaces ? 'All Workspaces' : PACT_STUDIO_WORKSPACE
      })

      const result = await fetchWeeklyHours(options)

      // Debug: Log API response
      console.log("API Response:", {
        result,
        requestedWorkspace: options.workspaceId
      })

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch time data")
      console.error("Error fetching time data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    console.log("Effect triggered with:", {
      showAllWorkspaces,
      workspace: showAllWorkspaces ? 'All Workspaces' : PACT_STUDIO_WORKSPACE
    })
    fetchHours()
  }, [showAllWorkspaces])

  const percentageChange = calculatePercentageChange(data.currentHours, data.previousHours)

  if (error) {
    return (
      <Card className="relative">
        <CardHeader>
          <CardTitle>Total Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  const title = `Total Hours${!showAllWorkspaces ? ' (Pact Studio)' : ''}`

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{formatHours(data.currentHours)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatPercentageChange(percentageChange)} from last week ({formatHours(data.previousHours)})
            </p>
          </>
        )}
      </CardContent>
      <TotalHoursSettings
        showAllWorkspaces={showAllWorkspaces}
        onShowAllWorkspacesChange={(value) => {
          console.log("Toggling workspaces:", {
            from: showAllWorkspaces ? 'All Workspaces' : 'Pact Studio Only',
            to: value ? 'All Workspaces' : 'Pact Studio Only',
            workspaceId: PACT_STUDIO_WORKSPACE
          })
          setShowAllWorkspaces(value)
        }}
      />
    </Card>
  )
}