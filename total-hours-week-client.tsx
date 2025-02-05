'use client'

import { useEffect, useState } from 'react'
import { getTotalHours } from './total-hours-week'
import { TimerIcon } from '@radix-ui/react-icons'
import { useDateRange } from '@/contexts/date-range-context'
import { MetricCard } from '@/components/ui/metric-card'

type WeeklyData = {
  currentHours: number
  previousHours: number
  percentageChange: number
}

export default function TotalHoursWeekClient() {
  const { dateRange } = useDateRange()
  const [data, setData] = useState<WeeklyData | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHours = async () => {
      try {
        setLoading(true)
        const result = await getTotalHours(dateRange)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hours'))
      } finally {
        setLoading(false)
      }
    }

    fetchHours()
  }, [dateRange]) // Re-fetch when date range changes

  if (error) {
    return (
      <MetricCard
        title="Total Hours"
        value="Error"
        icon={{
          icon: <TimerIcon />,
          background: "bg-[#EEF4FF]",
          color: "text-[#2E90FA]"
        }}
        isLoading={false}
      />
    )
  }

  return (
    <MetricCard
      title="Total Hours"
      value={data ? data.currentHours.toFixed(1) : '0'}
      change={data ? {
        value: data.percentageChange,
        label: "from previous period"
      } : undefined}
      icon={{
        icon: <TimerIcon />,
        background: "bg-[#EEF4FF]",
        color: "text-[#2E90FA]"
      }}
      isLoading={loading}
    />
  )
} 