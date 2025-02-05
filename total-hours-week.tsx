'use server'

import { DateRange } from '@/lib/date-range'

type WeeklyHoursData = {
  currentHours: number
  previousHours: number
  percentageChange: number
}

async function getTotalHours(dateRange: DateRange): Promise<WeeklyHoursData> {
  // Calculate previous period
  const currentStart = new Date(dateRange.startDate)
  const currentEnd = new Date(dateRange.endDate)
  const daysDiff = Math.ceil((currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24))
  
  const previousStart = new Date(currentStart)
  previousStart.setDate(previousStart.getDate() - daysDiff - 1)
  const previousEnd = new Date(currentEnd)
  previousEnd.setDate(previousEnd.getDate() - daysDiff - 1)
  
  const [currentPeriod, previousPeriod] = await Promise.all([
    fetch(
      `https://api.everhour.com/team/time?from=${dateRange.startDate}&to=${dateRange.endDate}`,
      {
        headers: {
          'X-Api-Key': process.env.EVERHOUR_API_KEY || '',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    ),
    fetch(
      `https://api.everhour.com/team/time?from=${previousStart.toISOString().split('T')[0]}&to=${previousEnd.toISOString().split('T')[0]}`,
      {
        headers: {
          'X-Api-Key': process.env.EVERHOUR_API_KEY || '',
        },
        next: { revalidate: 300 },
      }
    )
  ])

  if (!currentPeriod.ok || !previousPeriod.ok) {
    throw new Error('Failed to fetch hours data')
  }

  const [currentData, previousData] = await Promise.all([
    currentPeriod.json(),
    previousPeriod.json()
  ])

  const currentHours = currentData.reduce((acc: number, entry: { time: number }) => acc + entry.time, 0) / 3600
  const previousHours = previousData.reduce((acc: number, entry: { time: number }) => acc + entry.time, 0) / 3600
  
  const percentageChange = previousHours === 0 
    ? 100 
    : ((currentHours - previousHours) / previousHours) * 100

  return {
    currentHours,
    previousHours,
    percentageChange
  }
}

export { getTotalHours } 