"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: {
      name: "John Doe",
      image: "/avatars/john-doe.jpg",
      initials: "JD",
    },
    project: "Website Redesign",
    time: "4.5h",
    task: "Homepage layout",
    timestamp: "2 hours ago",
  },
  {
    user: {
      name: "Sarah Smith",
      image: "/avatars/sarah-smith.jpg",
      initials: "SS",
    },
    project: "Mobile App",
    time: "2h",
    task: "User authentication",
    timestamp: "4 hours ago",
  },
  {
    user: {
      name: "Mike Johnson",
      image: "/avatars/mike-johnson.jpg",
      initials: "MJ",
    },
    project: "Marketing Campaign",
    time: "3h",
    task: "Social media assets",
    timestamp: "6 hours ago",
  },
  {
    user: {
      name: "Emily Brown",
      image: "/avatars/emily-brown.jpg",
      initials: "EB",
    },
    project: "Website Redesign",
    time: "1.5h",
    task: "Contact form",
    timestamp: "8 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
              <span className="text-muted-foreground"> logged </span>
              {activity.time}
              <span className="text-muted-foreground"> on </span>
              {activity.project}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.task} • {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
} 