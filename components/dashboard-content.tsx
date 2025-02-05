"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const timeData = [
  { name: "Mon", hours: 6 },
  { name: "Tue", hours: 7 },
  { name: "Wed", hours: 8 },
  { name: "Thu", hours: 7.5 },
  { name: "Fri", hours: 6.5 },
  { name: "Sat", hours: 4 },
  { name: "Sun", hours: 2 },
]

const projectData = [
  { name: "Website Redesign", hours: 24, budget: 40, progress: 60 },
  { name: "Mobile App", hours: 18, budget: 30, progress: 60 },
  { name: "Marketing Campaign", hours: 12, budget: 20, progress: 60 },
]

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Hours This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">41 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projects in Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Hours Logged</TableHead>
                <TableHead>Budget (hours)</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project) => (
                <TableRow key={project.name}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.hours}</TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>{project.progress}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

