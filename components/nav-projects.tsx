"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Project {
  name: string
  url: string
  icon: React.ElementType
}

interface NavProjectsProps {
  projects: Project[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const pathname = usePathname()

  if (!projects.length) return null

  return (
    <div className="py-2">
      <h2 className="relative px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Recent Projects
      </h2>
      <div className="grid gap-1 p-2">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <Link
              key={index}
              href={project.url}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted",
                pathname === project.url && "bg-muted font-medium"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {project.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

