"use client"

import type * as React from "react"
import { BarChart3, Clock, Folder, Users, Calendar, Settings, Palette } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeCustomizer } from "@/components/theme-customizer"

// This is sample data for Everhour.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john-doe.jpg",
  },
  teams: [
    {
      name: "Design Team",
      logo: Users,
      plan: "Pro",
    },
    {
      name: "Development Team",
      logo: Users,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Time",
      url: "#",
      icon: Clock,
      isActive: true,
      items: [
        { title: "Timesheet", url: "#" },
        { title: "Timer", url: "#" },
        { title: "Time Off", url: "#" },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder,
      items: [
        { title: "All Projects", url: "#" },
        { title: "Tasks", url: "#" },
        { title: "Budgets", url: "#" },
      ],
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
      items: [
        { title: "Members", url: "#" },
        { title: "Schedule", url: "#" },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Dashboard", url: "#" },
        { title: "Time Reports", url: "#" },
        { title: "Expenses", url: "#" },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "UI Kit",
      url: "/ui-kit",
      icon: Palette,
      isExternal: true,
    },
  ],
  projects: [
    { name: "Website Redesign", url: "#", icon: Folder },
    { name: "Mobile App", url: "#", icon: Folder },
    { name: "Marketing Campaign", url: "#", icon: Folder },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <div className="mt-auto p-4 flex items-center gap-2">
        <ModeToggle />
        <ThemeCustomizer />
      </div>
    </Sidebar>
  )
}

