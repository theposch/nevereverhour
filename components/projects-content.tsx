"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const projectsData = [
  {
    name: "Website Redesign",
    client: "Acme Inc",
    status: "In Progress",
    progress: 60,
    budget: "40 hours",
    spent: "24 hours",
  },
  {
    name: "Mobile App",
    client: "TechCorp",
    status: "In Progress",
    progress: 40,
    budget: "80 hours",
    spent: "32 hours",
  },
  {
    name: "Marketing Campaign",
    client: "Global Services",
    status: "Planning",
    progress: 10,
    budget: "20 hours",
    spent: "2 hours",
  },
  {
    name: "E-commerce Platform",
    client: "Fashion Outlet",
    status: "On Hold",
    progress: 75,
    budget: "120 hours",
    spent: "90 hours",
  },
  {
    name: "CRM Integration",
    client: "Sales Pro",
    status: "Completed",
    progress: 100,
    budget: "60 hours",
    spent: "58 hours",
  },
]

export function ProjectsContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Time Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={project.progress} className="w-[60px] mr-2" />
                      <span>{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>{project.spent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

