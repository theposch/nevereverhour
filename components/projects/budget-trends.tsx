"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - will be replaced with real data from API
const data = [
  { month: "Jan", budget: 100, spent: 85, projected: 90 },
  { month: "Feb", budget: 100, spent: 88, projected: 92 },
  { month: "Mar", budget: 100, spent: 95, projected: 98 },
  { month: "Apr", budget: 100, spent: 92, projected: 95 },
  { month: "May", budget: 100, spent: 98, projected: 102 },
  { month: "Jun", budget: 100, spent: 105, projected: 108 },
]

export function BudgetTrends() {
  const [timeframe, setTimeframe] = React.useState("6m")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="budget"
              name="Budget Baseline"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="spent"
              name="Actual Spent"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="projected"
              name="Projected Spend"
              stroke="hsl(var(--warning))"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="text-sm font-medium">Trend Analysis</div>
          <p className="text-sm text-muted-foreground mt-1">
            Budget utilization is trending upward, with a projected 8% overspend in the next month.
          </p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <div className="text-sm font-medium">Recommendations</div>
          <p className="text-sm text-muted-foreground mt-1">
            Consider reviewing resource allocation and implementing cost-saving measures.
          </p>
        </div>
      </div>
    </div>
  )
} 