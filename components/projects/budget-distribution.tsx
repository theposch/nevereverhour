"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { name: "Fixed Price Projects", value: 65, color: "hsl(var(--primary))" },
  { name: "Hourly Projects", value: 35, color: "hsl(var(--primary) / 0.5)" },
]

const budgetStatusData = [
  { name: "Under Budget", value: 45, color: "hsl(var(--success))" },
  { name: "Near Limit", value: 35, color: "hsl(var(--warning))" },
  { name: "Over Budget", value: 20, color: "hsl(var(--destructive))" },
]

export function BudgetDistribution() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Billing Type Distribution */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Billing Type Distribution</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Status Distribution */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Budget Status Distribution</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {budgetStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Average Budget Size", value: "$15,000" },
            { label: "Budget Utilization Rate", value: "78%" },
            { label: "Projects at Risk", value: "3" },
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 