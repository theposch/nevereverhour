"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

interface TeamSwitcherProps {
  teams: Team[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState(teams[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="h-12 w-full justify-between px-4"
        >
          <div className="flex items-center gap-2">
            {selectedTeam && (
              <>
                {React.createElement(selectedTeam.logo, {
                  className: "h-4 w-4",
                })}
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{selectedTeam.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {selectedTeam.plan}
                  </span>
                </div>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandEmpty>No team found.</CommandEmpty>
          <CommandGroup>
            {teams.map((team) => (
              <CommandItem
                key={team.name}
                onSelect={() => {
                  setSelectedTeam(team)
                  setOpen(false)
                }}
                className="text-sm"
              >
                <div className="flex items-center gap-2">
                  {React.createElement(team.logo, {
                    className: "h-4 w-4",
                  })}
                  <div className="flex flex-col items-start">
                    <span>{team.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {team.plan}
                    </span>
                  </div>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedTeam.name === team.name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

