"use client"

import * as React from "react"
import { BarChart3, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface ResourceInsightsProps {
  dateRange: {
    from: Date
    to: Date
  }
}

interface TimeEntry {
  id: string
  task: {
    id: string
    name: string
    projects: string[]
  }
  time: number
  date: string
  user: {
    id: number
    name: string
    team?: string // We'll group by team for better insights
  }
}

interface ProjectInsight {
  name: string
  count: number
  time: number
  team: string
}

export function ResourceInsights({ dateRange }: ResourceInsightsProps) {
  const [filter, setFilter] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [insights, setInsights] = React.useState<{
    projects: ProjectInsight[]
    total: {
      tasks: number
      time: number
      teams: number
      mostActiveTeam: { name: string; tasks: number }
      peakProject: { name: string; tasks: number }
    }
  }>({
    projects: [],
    total: {
      tasks: 0,
      time: 0,
      teams: 0,
      mostActiveTeam: { name: "", tasks: 0 },
      peakProject: { name: "", tasks: 0 }
    }
  })

  // Fetch data from Everhour API
  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Format dates for API
        const from = format(dateRange.from, "yyyy-MM-dd")
        const to = format(dateRange.to, "yyyy-MM-dd")

        // Fetch time entries
        const response = await fetch(`/api/everhour/team/time?from=${from}&to=${to}`)
        if (!response.ok) throw new Error("Failed to fetch data")
        
        const data: TimeEntry[] = await response.json()

        // Process data
        const projectMap = new Map<string, ProjectInsight>()
        const teamSet = new Set<string>()
        const teamTaskCount = new Map<string, number>()

        data.forEach(entry => {
          const projectId = entry.task.projects[0]
          const projectName = entry.task.name
          const team = entry.user.team || "Unassigned"
          
          // Update project insights
          if (!projectMap.has(projectId)) {
            projectMap.set(projectId, {
              name: projectName,
              count: 0,
              time: 0,
              team
            })
          }
          
          const project = projectMap.get(projectId)!
          project.count++
          project.time += entry.time

          // Track teams
          teamSet.add(team)
          teamTaskCount.set(team, (teamTaskCount.get(team) || 0) + 1)
        })

        // Find most active team
        let mostActiveTeam = { name: "", tasks: 0 }
        teamTaskCount.forEach((tasks, team) => {
          if (tasks > mostActiveTeam.tasks) {
            mostActiveTeam = { name: team, tasks }
          }
        })

        // Sort projects by task count
        const sortedProjects = Array.from(projectMap.values())
          .sort((a, b) => b.count - a.count)

        setInsights({
          projects: sortedProjects,
          total: {
            tasks: data.length,
            time: data.reduce((sum, entry) => sum + entry.time, 0),
            teams: teamSet.size,
            mostActiveTeam,
            peakProject: sortedProjects[0] || { name: "", tasks: 0 }
          }
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  // Filter projects based on search input
  const filteredProjects = insights.projects.filter(project =>
    project.name.toLowerCase().includes(filter.toLowerCase()) ||
    project.team.toLowerCase().includes(filter.toLowerCase())
  )

  const maxValue = Math.max(...filteredProjects.map(p => p.count))

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Input
            placeholder="Filter projects or teams..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Badge variant="secondary" className="ml-auto">
          {insights.total.tasks} total tasks
        </Badge>
      </div>

      {/* Project List */}
      <div className="space-y-2">
        {filteredProjects.map((project) => (
          <div key={project.name} className="group relative">
            <div className="absolute inset-0 bg-primary/10 rounded-lg" style={{
              width: `${(project.count / maxValue) * 100}%`
            }} />
            <div className="relative flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.team}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm tabular-nums">
                  {project.count} tasks ({Math.round(project.time / 3600)}h)
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm font-medium">Most Active Team</div>
          <div className="mt-1 text-2xl font-bold">{insights.total.mostActiveTeam.name}</div>
          <div className="text-xs text-muted-foreground">
            {insights.total.mostActiveTeam.tasks} tasks completed
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Peak Activity</div>
          <div className="mt-1 text-2xl font-bold">{insights.total.peakProject.name}</div>
          <div className="text-xs text-muted-foreground">
            {insights.total.peakProject.tasks} tasks this period
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Resource Distribution</div>
          <div className="mt-1 text-2xl font-bold">{insights.total.teams} Teams</div>
          <div className="text-xs text-muted-foreground">
            {Math.round(insights.total.time / 3600)} hours tracked
          </div>
        </Card>
      </div>
    </div>
  )
} 