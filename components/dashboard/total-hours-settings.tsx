"use client"

import * as React from "react"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Settings2 } from "lucide-react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

interface TotalHoursSettingsProps {
  showAllWorkspaces: boolean
  onShowAllWorkspacesChange: (value: boolean) => void
}

export function TotalHoursSettings({
  showAllWorkspaces,
  onShowAllWorkspacesChange,
}: TotalHoursSettingsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="absolute right-4 top-4">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open total hours settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Total Hours Settings</SheetTitle>
          <SheetDescription>
            Configure how total hours are calculated and displayed.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Switch
                id="show-all-workspaces"
                checked={showAllWorkspaces}
                onCheckedChange={onShowAllWorkspacesChange}
              />
              <Label htmlFor="show-all-workspaces" className="flex flex-col space-y-1">
                <span>Include all workspaces</span>
                <span className="text-xs text-muted-foreground">
                  {showAllWorkspaces 
                    ? "Currently showing time from all workspaces" 
                    : "Currently showing time from Pact Studio Inc only"}
                </span>
              </Label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 