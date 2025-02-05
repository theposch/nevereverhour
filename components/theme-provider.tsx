"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  themes?: string[]
  defaultTheme?: string
  enableSystem?: boolean
  attribute?: string
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "system", "default", "monochrome", "forest", "ocean"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 