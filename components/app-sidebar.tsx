"use client"

import * as React from "react"
import { BarChart3, Clock, Folder, Users, Calendar, Settings, Palette, LayoutDashboard } from "lucide-react"

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
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
      items: [
        { title: "All Projects", url: "/projects" },
        { title: "Tasks", url: "/projects/tasks" },
        { title: "Budgets", url: "/projects/budgets" },
      ],
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
      items: [
        { title: "Members", url: "/team/members" },
        { title: "Schedule", url: "/team/schedule" },
      ],
    },
    {
      title: "Time",
      url: "/time",
      icon: Clock,
      items: [
        { title: "Timesheet", url: "/time/timesheet" },
        { title: "Timer", url: "/time/timer" },
        { title: "Time Off", url: "/time/off" },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
      items: [
        { title: "Dashboard", url: "/reports/dashboard" },
        { title: "Time Reports", url: "/reports/time" },
        { title: "Expenses", url: "/reports/expenses" },
      ],
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "UI Kit",
      url: "/ui-kit",
      icon: Palette,
    },
  ],
  projects: [
    { name: "Website Redesign", url: "/projects/website-redesign", icon: Folder },
    { name: "Mobile App", url: "/projects/mobile-app", icon: Folder },
    { name: "Marketing Campaign", url: "/projects/marketing", icon: Folder },
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