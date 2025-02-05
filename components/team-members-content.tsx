"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembersData = [
  { name: "Alice Johnson", role: "UI/UX Designer", email: "alice@example.com", avatar: "/avatars/alice.jpg" },
  { name: "Bob Smith", role: "Frontend Developer", email: "bob@example.com", avatar: "/avatars/bob.jpg" },
  { name: "Charlie Brown", role: "Backend Developer", email: "charlie@example.com", avatar: "/avatars/charlie.jpg" },
  { name: "Diana Ross", role: "Project Manager", email: "diana@example.com", avatar: "/avatars/diana.jpg" },
  { name: "Ethan Hunt", role: "QA Engineer", email: "ethan@example.com", avatar: "/avatars/ethan.jpg" },
]

export function TeamMembersContent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembersData.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split("")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

