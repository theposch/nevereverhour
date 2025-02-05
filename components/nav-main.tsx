"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  items?: { title: string; url: string }[]
}

interface NavMainProps {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.url || pathname?.startsWith(item.url + "/")

        if (!item.items) {
          return (
            <Button
              key={item.url}
              variant={isActive ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href={item.url}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          )
        }

        return (
          <Collapsible key={item.url} defaultOpen={isActive}>
            <CollapsibleTrigger asChild>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("justify-start w-full", isActive && "mb-1")}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6">
              <div className="flex flex-col gap-1">
                {item.items.map((subItem) => {
                  const isSubItemActive = pathname === subItem.url
                  return (
                    <Button
                      key={subItem.url}
                      variant={isSubItemActive ? "secondary" : "ghost"}
                      className="justify-start"
                      asChild
                    >
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </Button>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </div>
  )
}

