"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, TrendingUp, Clock, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Budget Utilization",
    value: "73%",
    description: "Across all projects",
    trend: "+5% from last month",
    trendUp: true,
    progress: 73,
    icon: TrendingUp,
  },
  {
    title: "Projects Over Budget",
    value: "2",
    description: "Requires attention",
    alert: true,
    progress: 0,
    icon: AlertTriangle,
  },
  {
    title: "Average Time to Budget",
    value: "45 days",
    description: "Time until budget depletion",
    progress: 65,
    icon: Clock,
  },
  {
    title: "Total Budget Remaining",
    value: "$45,230",
    description: "Available budget",
    progress: 45,
    icon: DollarSign,
  },
]

export function BudgetOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {stat.trend && (
                  <span className={`text-xs ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              {stat.progress > 0 && (
                <Progress 
                  value={stat.progress} 
                  className="mt-3"
                  indicatorClassName={stat.progress > 90 ? "bg-red-500" : undefined}
                />
              )}
              {stat.alert && (
                <Alert variant="destructive" className="mt-3 py-2">
                  <AlertDescription>
                    2 projects exceed budget limits
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 