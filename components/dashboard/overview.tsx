"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: 8.2,
  },
  {
    name: "Tue",
    total: 7.8,
  },
  {
    name: "Wed",
    total: 9.1,
  },
  {
    name: "Thu",
    total: 8.5,
  },
  {
    name: "Fri",
    total: 7.2,
  },
  {
    name: "Sat",
    total: 2.5,
  },
  {
    name: "Sun",
    total: 1.2,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}h`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 