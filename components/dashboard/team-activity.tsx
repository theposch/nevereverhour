"use client"

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
  const data: ActivityData[] = []

  days.forEach(day => {
    hours.forEach(hour => {
      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.floor(Math.random() * 10)
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