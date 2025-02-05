"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"

interface ActivityData {
  day: string
  hour: string
  value: number
}

// Generate sample data for the heatmap
const generateHeatmapData = (): ActivityData[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 8 PM
  
  // Static activity values instead of random
  const activityValues = {
    Mon: [4, 3, 2, 7, 0, 2, 8, 7, 6, 4, 5, 2],
    Tue: [3, 5, 6, 2, 8, 4, 3, 7, 8, 5, 4, 3],
    Wed: [5, 4, 7, 3, 6, 8, 2, 4, 5, 7, 3, 6],
    Thu: [2, 6, 3, 8, 4, 5, 7, 3, 6, 4, 5, 2],
    Fri: [6, 3, 5, 4, 7, 2, 8, 5, 3, 6, 4, 7]
  }

  const data: ActivityData[] = []

  days.forEach((day, dayIndex) => {
    hours.forEach((hour, hourIndex) => {
      data.push({
        day,
        hour: `${hour}:00`,
        value: activityValues[day][hourIndex]
      })
    })
  })

  return data
}

const data = generateHeatmapData()

export function TeamActivity() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {/* Time labels */}
        <div className="space-y-6 py-2">
          {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
            <div key={hour} className="text-sm text-muted-foreground">
              {`${hour}:00`}
            </div>
          ))}
        </div>
        {/* Heatmap grid */}
        <div className="grid grid-cols-5 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <div key={day} className="space-y-1">
              <div className="text-sm font-medium text-center">{day}</div>
              {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => {
                const cellData = data.find(d => d.day === day && d.hour === `${hour}:00`)
                const intensity = cellData ? cellData.value / 10 : 0
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-8 rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${intensity})`,
                      opacity: 0.2 + intensity * 0.8
                    }}
                    title={`${day} ${hour}:00 - Activity: ${Math.round(intensity * 100)}%`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="mt-6 flex items-center justify-end space-x-2">
        <div className="text-sm text-muted-foreground">Less</div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 rounded-sm"
              style={{
                backgroundColor: `hsl(var(--primary) / ${(i + 1) / 5})`,
                opacity: 0.2 + ((i + 1) / 5) * 0.8
              }}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">More</div>
      </div>
    </div>
  )
} 