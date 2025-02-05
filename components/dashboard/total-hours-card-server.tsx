'use server'

import { format, startOfWeek, endOfWeek, subWeeks } from "date-fns"
import { TimeDataOptions, WeeklyHoursData } from "../../lib/types/time"

async function getErrorMessage(response: Response) {
  try {
    const data = await response.json()
    return data.message || 'Failed to fetch hours data'
  } catch (e) {
    return `HTTP error! status: ${response.status}`
  }
}

export async function fetchWeeklyHours(options: TimeDataOptions): Promise<WeeklyHoursData> {
  if (!process.env.EVERHOUR_API_TOKEN) {
    throw new Error('Everhour API token is not configured')
  }

  // Debug: Log incoming options
  console.log('Server: Received options:', {
    workspaceId: options.workspaceId || 'Not specified (all workspaces)',
  })

  // Get current week's start and end dates
  const today = new Date()
  const currentWeekStart = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd")
  const currentWeekEnd = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd")
  
  // Get previous week's start and end dates
  const lastWeekStart = format(startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }), "yyyy-MM-dd")
  const lastWeekEnd = format(endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }), "yyyy-MM-dd")

  // Debug logging for date ranges
  console.log('Server: Date Ranges:', {
    currentWeek: { start: currentWeekStart, end: currentWeekEnd },
    previousWeek: { start: lastWeekStart, end: lastWeekEnd }
  })

  // Function to create query parameters with consistent options
  function createQueryParams(from: string, to: string, workspaceId?: string): URLSearchParams {
    const params = new URLSearchParams()
    params.append('from', from)
    params.append('to', to)
    
    if (workspaceId) {
      params.append('workspace', workspaceId)
    }

    // Debug: Log final query string
    console.log('Server: Query string:', params.toString())
    
    return params
  }

  // Create separate query parameters for each request
  const currentWeekParams = createQueryParams(currentWeekStart, currentWeekEnd, options.workspaceId)
  const previousWeekParams = createQueryParams(lastWeekStart, lastWeekEnd, options.workspaceId)

  try {
    const [currentData, previousData] = await Promise.all([
      fetch(`https://api.everhour.com/team/time?${currentWeekParams.toString()}`, {
        headers: {
          'X-Api-Key': process.env.EVERHOUR_API_TOKEN,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }),
      fetch(`https://api.everhour.com/team/time?${previousWeekParams.toString()}`, {
        headers: {
          'X-Api-Key': process.env.EVERHOUR_API_TOKEN,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
    ])

    if (!currentData.ok || !previousData.ok) {
      const errorMessage = await getErrorMessage(currentData.ok ? previousData : currentData)
      console.error('Server: API Error:', {
        status: currentData.ok ? previousData.status : currentData.status,
        message: errorMessage
      })
      throw new Error(errorMessage)
    }

    const [currentWeekData, previousWeekData] = await Promise.all([
      currentData.json(),
      previousData.json()
    ])

    // Calculate total hours from seconds
    const currentHours = currentWeekData.reduce((acc: number, entry: { time: number }) => acc + entry.time, 0) / 3600
    const previousHours = previousWeekData.reduce((acc: number, entry: { time: number }) => acc + entry.time, 0) / 3600

    // Debug: Log final calculated hours
    console.log('Server: Calculated hours:', {
      currentHours,
      previousHours,
      workspace: options.workspaceId || 'All workspaces'
    })

    return {
      currentHours,
      previousHours
    }
  } catch (error) {
    console.error('Server: Error fetching time data:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch hours data')
  }
}