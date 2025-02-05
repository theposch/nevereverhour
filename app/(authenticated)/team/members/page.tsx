import * as React from "react"
import { TeamMembersContent } from "@/components/team/team-members-content"

export default function TeamMembersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
      </div>
      <TeamMembersContent />
    </div>
  )
}

