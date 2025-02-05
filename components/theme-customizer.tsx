"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Paintbrush } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const themes = [
  { name: "Default", id: "default" },
  { name: "Monochrome", id: "monochrome" },
  { name: "Forest", id: "forest" },
  { name: "Ocean", id: "ocean" },
]

// Define base HSL values for each color
const colors = [
  { name: "Slate", value: "slate", hsl: { h: 215.9, s: 16.3, l: 46.9 } },
  { name: "Gray", value: "gray", hsl: { h: 220, s: 8.9, l: 46.1 } },
  { name: "Zinc", value: "zinc", hsl: { h: 240, s: 5.2, l: 47.1 } },
  { name: "Red", value: "red", hsl: { h: 0, s: 84.2, l: 60.2 } },
  { name: "Orange", value: "orange", hsl: { h: 24.6, s: 95, l: 53.1 } },
  { name: "Amber", value: "amber", hsl: { h: 37.7, s: 92.1, l: 50.2 } },
  { name: "Yellow", value: "yellow", hsl: { h: 47.9, s: 95.8, l: 53.1 } },
  { name: "Lime", value: "lime", hsl: { h: 84.3, s: 80.4, l: 44.3 } },
  { name: "Green", value: "green", hsl: { h: 142.1, s: 76.2, l: 36.3 } },
  { name: "Emerald", value: "emerald", hsl: { h: 160.1, s: 84.1, l: 39.4 } },
  { name: "Teal", value: "teal", hsl: { h: 172.5, s: 66, l: 36.3 } },
  { name: "Cyan", value: "cyan", hsl: { h: 189.5, s: 94.5, l: 42.7 } },
  { name: "Sky", value: "sky", hsl: { h: 198.6, s: 88.7, l: 48.4 } },
  { name: "Blue", value: "blue", hsl: { h: 221.2, s: 83.2, l: 53.3 } },
  { name: "Indigo", value: "indigo", hsl: { h: 226.5, s: 70.7, l: 40.2 } },
  { name: "Violet", value: "violet", hsl: { h: 250.5, s: 95.2, l: 51.8 } },
  { name: "Purple", value: "purple", hsl: { h: 258.3, s: 89.5, l: 66.3 } },
  { name: "Fuchsia", value: "fuchsia", hsl: { h: 289.1, s: 100, l: 58 } },
  { name: "Pink", value: "pink", hsl: { h: 330.4, s: 81.2, l: 60.4 } },
  { name: "Rose", value: "rose", hsl: { h: 346.8, s: 77.2, l: 49.8 } },
]

const radiusOptions = [
  { label: "None", value: "0" },
  { label: "Small", value: "0.3rem" },
  { label: "Medium", value: "0.5rem" },
  { label: "Large", value: "0.75rem" },
  { label: "Full", value: "1rem" },
]

// Function to generate a color scale with darker shades for dark mode
function generateColorScale(baseHsl: { h: number; s: number; l: number }) {
  const { h } = baseHsl
  return {
    '50': `${h} ${Math.min(baseHsl.s * 0.3, 10)}% 97%`,
    '100': `${h} ${Math.min(baseHsl.s * 0.4, 15)}% 92%`,
    '200': `${h} ${Math.min(baseHsl.s * 0.5, 30)}% 84%`,
    '300': `${h} ${Math.min(baseHsl.s * 0.6, 40)}% 76%`,
    '400': `${h} ${Math.min(baseHsl.s * 0.7, 50)}% 67%`,
    '500': `${h} ${baseHsl.s}% ${baseHsl.l}%`,
    '600': `${h} ${Math.min(baseHsl.s * 1.1, 90)}% ${Math.max(baseHsl.l * 0.9, 30)}%`,
    '700': `${h} ${Math.min(baseHsl.s * 1.2, 90)}% ${Math.max(baseHsl.l * 0.8, 25)}%`,
    '800': `${h} ${Math.min(baseHsl.s * 1.3, 90)}% ${Math.max(baseHsl.l * 0.7, 15)}%`,
    '900': `${h} ${Math.min(baseHsl.s * 1.4, 95)}% ${Math.max(baseHsl.l * 0.6, 8)}%`,
    '950': `${h} ${Math.min(baseHsl.s * 1.5, 98)}% ${Math.max(baseHsl.l * 0.3, 3)}%`,
    // Extra dark shades for cards and elevated surfaces
    '975': `${h} ${Math.min(baseHsl.s * 1.6, 98)}% ${Math.max(baseHsl.l * 0.15, 2)}%`,
    '990': `${h} ${Math.min(baseHsl.s * 1.7, 98)}% ${Math.max(baseHsl.l * 0.1, 1)}%`,
  }
}

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [accentColor, setAccentColor] = React.useState("blue")
  const [radius, setRadius] = React.useState("0.5rem")

  // Update CSS variables when accent color changes
  React.useEffect(() => {
    const root = document.documentElement
    const color = colors.find(c => c.value === accentColor)
    if (color) {
      const colorScale = generateColorScale(color.hsl)
      const isDark = theme === "dark"
      
      // Set the entire color scale
      Object.entries(colorScale).forEach(([shade, value]) => {
        root.style.setProperty(`--${color.value}-${shade}`, value)
      })

      // Set primary colors
      root.style.setProperty('--primary', colorScale['600'])
      root.style.setProperty('--primary-foreground', colorScale['50'])

      // Background colors
      root.style.setProperty('--background', isDark ? colorScale['990'] : colorScale['50'])
      root.style.setProperty('--foreground', isDark ? colorScale['100'] : colorScale['950'])

      // Card colors - using darkest shades for cards in dark mode
      root.style.setProperty('--card', isDark ? colorScale['975'] : colorScale['50'])
      root.style.setProperty('--card-foreground', isDark ? colorScale['100'] : colorScale['950'])

      // Popover colors
      root.style.setProperty('--popover', isDark ? colorScale['975'] : colorScale['50'])
      root.style.setProperty('--popover-foreground', isDark ? colorScale['100'] : colorScale['950'])

      // Muted colors
      root.style.setProperty('--muted', isDark ? colorScale['900'] : colorScale['100'])
      root.style.setProperty('--muted-foreground', isDark ? colorScale['300'] : colorScale['800'])

      // Accent colors
      root.style.setProperty('--accent', isDark ? colorScale['900'] : colorScale['100'])
      root.style.setProperty('--accent-foreground', isDark ? colorScale['100'] : colorScale['900'])

      // Secondary colors
      root.style.setProperty('--secondary', isDark ? colorScale['900'] : colorScale['100'])
      root.style.setProperty('--secondary-foreground', isDark ? colorScale['100'] : colorScale['900'])

      // Destructive colors (keeping red for error states)
      root.style.setProperty('--destructive', isDark ? '0 62.8% 30.6%' : '0 84.2% 60.2%')
      root.style.setProperty('--destructive-foreground', isDark ? '0 0% 98%' : '0 0% 98%')

      // Border and input colors
      root.style.setProperty('--border', isDark ? colorScale['900'] : colorScale['200'])
      root.style.setProperty('--input', isDark ? colorScale['900'] : colorScale['200'])
      root.style.setProperty('--ring', colorScale['800'])
    }
  }, [accentColor, theme])

  // Update CSS variables when radius changes
  React.useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--radius', radius)
  }, [radius])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed bottom-[4.5rem] left-4 w-[320px] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-bottom-2">
        <DialogHeader className="px-2">
          <DialogTitle className="text-lg">Customize Theme</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-2 pb-4">
          {/* Theme Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs">Primary color</Label>
            <div className="grid grid-cols-5 gap-1">
              {colors.map((color) => {
                const scale = generateColorScale(color.hsl)
                return (
                  <Button
                    key={color.value}
                    variant="outline"
                    className={cn(
                      "w-full h-8 rounded-md p-0 overflow-hidden",
                      accentColor === color.value && "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => setAccentColor(color.value)}
                  >
                    <div className="w-full h-full flex flex-col">
                      <div style={{ backgroundColor: `hsl(${scale['600']})` }} className="w-full h-1/2" />
                      <div style={{ backgroundColor: `hsl(${scale['300']})` }} className="w-full h-1/2" />
                    </div>
                    <span className="sr-only">{color.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-1.5">
            <Label className="text-xs">Appearance</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={theme !== "dark" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="w-full justify-center"
                size="sm"
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="w-full justify-center"
                size="sm"
              >
                Dark
              </Button>
            </div>
          </div>

          {/* Radius */}
          <div className="space-y-1.5">
            <Label className="text-xs">Radius</Label>
            <div className="grid grid-cols-5 gap-1">
              {radiusOptions.map((r) => (
                <Button
                  key={r.value}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full h-10 p-0",
                    radius === r.value && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => setRadius(r.value)}
                >
                  <div
                    className="w-5 h-5 bg-primary"
                    style={{ borderRadius: r.value }}
                  />
                  <span className="sr-only">{r.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 