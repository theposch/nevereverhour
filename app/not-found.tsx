import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </Button>
    </div>
  )
} 