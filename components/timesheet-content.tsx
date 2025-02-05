"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const timesheetData = [
  { date: "2023-05-01", project: "Website Redesign", task: "UI Design", duration: "4:30" },
  { date: "2023-05-01", project: "Mobile App", task: "API Integration", duration: "3:45" },
  { date: "2023-05-02", project: "Marketing Campaign", task: "Content Creation", duration: "5:15" },
  { date: "2023-05-02", project: "Website Redesign", task: "Frontend Development", duration: "6:00" },
  { date: "2023-05-03", project: "Mobile App", task: "Testing", duration: "3:30" },
]

export function TimesheetContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Timesheet</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Time Entry
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>This Week's Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

