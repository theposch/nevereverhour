"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, AlertTriangle } from "lucide-react"

// Sample data - will be replaced with real data from API
const projects = [
  {
    name: "Pact Studio Inc.",
    projects: [
      {
        name: "ABC Carpet & Home",
        progress: 17,
        budget: "50h",
        budgetType: "/month",
        spent: "8h",
        remains: "42h",
        billing: "Hourly",
        status: "healthy"
      },
      {
        name: "Beautycounter",
        progress: 173,
        budget: "500h",
        spent: "865h",
        remains: "-365h",
        billing: "Fixed",
        status: "overbudget"
      },
      {
        name: "Beautycounter - Great In-Between Sale",
        progress: 9,
        budget: "25h",
        spent: "2h",
        remains: "23h",
        billing: "Fixed",
        status: "healthy"
      }
    ]
  }
]

export function BudgetTable() {
  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Remains</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((workspace) => (
            <React.Fragment key={workspace.name}>
              {/* Workspace Header */}
              <TableRow className="bg-muted/50">
                <TableCell colSpan={7} className="font-medium">
                  {workspace.name}
                </TableCell>
              </TableRow>
              {/* Projects */}
              {workspace.projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <span>{project.name}</span>
                      {project.status === "overbudget" && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[160px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                      <Progress 
                        value={project.progress} 
                        indicatorClassName={project.progress > 100 ? "bg-destructive" : undefined}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.budget}
                    {project.budgetType && (
                      <span className="text-muted-foreground">{project.budgetType}</span>
                    )}
                  </TableCell>
                  <TableCell>{project.spent}</TableCell>
                  <TableCell>
                    <span className={project.remains.startsWith("-") ? "text-destructive" : ""}>
                      {project.remains}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.billing === "Hourly" ? "outline" : "secondary"}>
                      {project.billing}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 