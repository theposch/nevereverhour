import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetOverview } from "@/components/projects/budget-overview"
import { BudgetTable } from "@/components/projects/budget-table"
import { BudgetDistribution } from "@/components/projects/budget-distribution"
import { BudgetTrends } from "@/components/projects/budget-trends"

export default function BudgetsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Budgets</h2>
          <p className="text-muted-foreground">
            Monitor and analyze project budgets, spending, and resource allocation
          </p>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <BudgetOverview />

      {/* Budget Distribution and Trends */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Allocation across projects and billing types</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetDistribution />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Trends</CardTitle>
            <CardDescription>Historical budget utilization patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetTrends />
          </CardContent>
        </Card>
      </div>

      {/* Budget Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            Detailed budget information for all projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetTable />
        </CardContent>
      </Card>
    </div>
  )
} 