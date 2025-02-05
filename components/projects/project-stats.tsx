import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, AlertCircle, Timer } from "lucide-react"

const stats = [
  {
    title: "Active Projects",
    value: "12",
    description: "2 added this month",
    icon: Clock,
  },
  {
    title: "Completed",
    value: "24",
    description: "4 this month",
    icon: CheckCircle2,
  },
  {
    title: "Overdue",
    value: "3",
    description: "Requires attention",
    icon: AlertCircle,
  },
  {
    title: "Total Hours",
    value: "1,234",
    description: "245 this month",
    icon: Timer,
  },
]

export function ProjectStats() {
  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
} 