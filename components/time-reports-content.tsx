"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeReportData = [
  { name: "Week 1", "Website Redesign": 20, "Mobile App": 15, "Marketing Campaign": 10 },
  { name: "Week 2", "Website Redesign": 25, "Mobile App": 18, "Marketing Campaign": 12 },
  { name: "Week 3", "Website Redesign": 22, "Mobile App": 20, "Marketing Campaign": 15 },
  { name: "Week 4", "Website Redesign": 28, "Mobile App": 22, "Marketing Campaign": 18 },
]

export function TimeReportsContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Time Reports</h1>
        <Select defaultValue="lastMonth">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastQuarter">Last Quarter</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Time Spent per Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeReportData}>
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Website Redesign" fill="#8884d8" />
                <Bar dataKey="Mobile App" fill="#82ca9d" />
                <Bar dataKey="Marketing Campaign" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

