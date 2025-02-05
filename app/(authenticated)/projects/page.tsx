import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectStats } from "@/components/projects/project-stats"

export default function ProjectsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProjectStats />
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              List of all active and completed projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 