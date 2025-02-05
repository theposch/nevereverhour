'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon, MoreHorizontal, Settings, User, Calendar as CalendarIcon, ChevronDown, CreditCard, LogOut, PlusCircle, UserPlus, Users, ChevronRight, ImageIcon, Folder, BarChart3 } from "lucide-react";
import { createRoot } from 'react-dom/client';
import { CheckIcon } from "lucide-react";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { name: "Jan", revenue: 2000, expenses: 1400, profit: 600 },
  { name: "Feb", revenue: 1800, expenses: 1200, profit: 600 },
  { name: "Mar", revenue: 2200, expenses: 1800, profit: 400 },
  { name: "Apr", revenue: 2500, expenses: 2100, profit: 400 },
  { name: "May", revenue: 2300, expenses: 1900, profit: 400 },
  { name: "Jun", revenue: 3200, expenses: 2300, profit: 900 },
  { name: "Jul", revenue: 3800, expenses: 2800, profit: 1000 },
];

const timeTrackingData = [
  { name: "Mon", billable: 28800, nonBillable: 3600 }, // 8h, 1h in seconds
  { name: "Tue", billable: 25200, nonBillable: 7200 }, // 7h, 2h
  { name: "Wed", billable: 32400, nonBillable: 1800 }, // 9h, 0.5h
  { name: "Thu", billable: 28800, nonBillable: 5400 }, // 8h, 1.5h
  { name: "Fri", billable: 21600, nonBillable: 3600 }, // 6h, 1h
];

const projectAllocationData = [
  { name: "Website Redesign", value: 45 },
  { name: "Mobile App", value: 30 },
  { name: "Marketing", value: 15 },
  { name: "Internal", value: 10 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--primary)/.8)', 'hsl(var(--primary)/.6)', 'hsl(var(--primary)/.4)'];

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
};

// Add new mock data for tables
const timeEntries = [
  {
    id: "TE1",
    date: "2024-02-05",
    user: "John Doe",
    task: "Homepage Redesign",
    project: "Website Revamp",
    time: 28800, // 8 hours in seconds
    billable: true,
    status: "completed"
  },
  {
    id: "TE2",
    date: "2024-02-05",
    user: "Jane Smith",
    task: "API Integration",
    project: "Mobile App",
    time: 21600, // 6 hours in seconds
    billable: true,
    status: "in-progress"
  },
  {
    id: "TE3",
    date: "2024-02-05",
    user: "Mike Johnson",
    task: "Team Meeting",
    project: "Internal",
    time: 3600, // 1 hour in seconds
    billable: false,
    status: "completed"
  }
];

const projectSummary = [
  {
    id: "P1",
    name: "Website Revamp",
    budget: 180000, // 50 hours in seconds
    spent: 144000, // 40 hours in seconds
    remaining: 36000, // 10 hours in seconds
    team: ["John Doe", "Jane Smith"],
    status: "on-track"
  },
  {
    id: "P2",
    name: "Mobile App",
    budget: 360000, // 100 hours in seconds
    spent: 324000, // 90 hours in seconds
    remaining: 36000, // 10 hours in seconds
    team: ["Mike Johnson", "Jane Smith"],
    status: "at-risk"
  },
  {
    id: "P3",
    name: "Marketing Campaign",
    budget: 72000, // 20 hours in seconds
    spent: 25200, // 7 hours in seconds
    remaining: 46800, // 13 hours in seconds
    team: ["John Doe"],
    status: "on-track"
  }
];

const teamMembers = [
  {
    id: "U1",
    name: "John Doe",
    role: "Designer",
    weeklyCapacity: 144000, // 40 hours in seconds
    utilization: 85,
    activeProjects: 2,
    status: "active"
  },
  {
    id: "U2",
    name: "Jane Smith",
    role: "Developer",
    weeklyCapacity: 144000,
    utilization: 95,
    activeProjects: 3,
    status: "active"
  },
  {
    id: "U3",
    name: "Mike Johnson",
    role: "Project Manager",
    weeklyCapacity: 108000, // 30 hours in seconds
    utilization: 75,
    activeProjects: 4,
    status: "away"
  }
];

// Add new mock data for visualizations
const weeklyActivityData = [
  { hour: "0", Mon: 3, Tue: 2, Wed: 1, Thu: 3, Fri: 4, Sat: 0, Sun: 0 },
  { hour: "1", Mon: 1, Tue: 0, Wed: 0, Thu: 1, Fri: 2, Sat: 0, Sun: 0 },
  { hour: "2", Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "3", Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "4", Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "5", Mon: 0, Tue: 1, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "6", Mon: 1, Tue: 2, Wed: 3, Thu: 2, Fri: 1, Sat: 0, Sun: 0 },
  { hour: "7", Mon: 4, Tue: 5, Wed: 6, Thu: 4, Fri: 3, Sat: 1, Sun: 0 },
  { hour: "8", Mon: 8, Tue: 9, Wed: 8, Thu: 7, Fri: 8, Sat: 2, Sun: 1 },
  { hour: "9", Mon: 10, Tue: 11, Wed: 12, Thu: 10, Fri: 9, Sat: 3, Sun: 2 },
  { hour: "10", Mon: 12, Tue: 13, Wed: 14, Thu: 12, Fri: 11, Sat: 4, Sun: 2 },
  { hour: "11", Mon: 11, Tue: 12, Wed: 13, Thu: 11, Fri: 10, Sat: 3, Sun: 2 },
  { hour: "12", Mon: 8, Tue: 9, Wed: 10, Thu: 8, Fri: 7, Sat: 2, Sun: 1 },
  { hour: "13", Mon: 9, Tue: 10, Wed: 11, Thu: 9, Fri: 8, Sat: 2, Sun: 1 },
  { hour: "14", Mon: 11, Tue: 12, Wed: 13, Thu: 11, Fri: 10, Sat: 3, Sun: 2 },
  { hour: "15", Mon: 10, Tue: 11, Wed: 12, Thu: 10, Fri: 9, Sat: 2, Sun: 1 },
  { hour: "16", Mon: 9, Tue: 10, Wed: 11, Thu: 9, Fri: 8, Sat: 1, Sun: 0 },
  { hour: "17", Mon: 7, Tue: 8, Wed: 9, Thu: 7, Fri: 6, Sat: 0, Sun: 0 },
  { hour: "18", Mon: 5, Tue: 6, Wed: 7, Thu: 5, Fri: 4, Sat: 0, Sun: 0 },
  { hour: "19", Mon: 3, Tue: 4, Wed: 5, Thu: 3, Fri: 2, Sat: 0, Sun: 0 },
  { hour: "20", Mon: 2, Tue: 3, Wed: 4, Thu: 2, Fri: 1, Sat: 0, Sun: 0 },
  { hour: "21", Mon: 1, Tue: 2, Wed: 3, Thu: 1, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "22", Mon: 0, Tue: 1, Wed: 2, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  { hour: "23", Mon: 0, Tue: 0, Wed: 1, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
];

const taskCompletionData = [
  { name: "Week 1", completed: 23, inProgress: 12, blocked: 3 },
  { name: "Week 2", completed: 28, inProgress: 10, blocked: 2 },
  { name: "Week 3", completed: 32, inProgress: 8, blocked: 1 },
  { name: "Week 4", completed: 25, inProgress: 15, blocked: 4 },
];

const teamWorkloadData = [
  { name: "Design", tasks: 12, hours: 45, capacity: 60 },
  { name: "Development", tasks: 18, hours: 52, capacity: 50 },
  { name: "Marketing", tasks: 8, hours: 30, capacity: 40 },
  { name: "Management", tasks: 15, hours: 38, capacity: 45 },
];

// Modify the heatmap data structure to be a grid
const activityHeatmapData = Array.from({ length: 16 }, (_, row) => ({
  row,
  cells: Array.from({ length: 16 }, (_, col) => ({
    value: Math.floor(Math.random() * 100),
    col
  }))
}));

// Update color scale helper
const getHeatmapColor = (value: number) => {
  // Using our theme's primary color with varying opacity
  if (value < 20) return 'hsl(var(--primary)/.1)';
  if (value < 40) return 'hsl(var(--primary)/.3)';
  if (value < 60) return 'hsl(var(--primary)/.5)';
  if (value < 80) return 'hsl(var(--primary)/.7)';
  return 'hsl(var(--primary))';
};

export default function UIKitPage() {
  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="container space-y-8 py-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">UI Kit</h2>
              <p className="text-muted-foreground">
                A collection of UI components built with shadcn/ui.
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          
          <Tabs defaultValue="layout" className="space-y-6">
            <TabsList className="bg-muted w-full justify-start">
              <TabsTrigger value="basic">Basic Components</TabsTrigger>
              <TabsTrigger value="forms">Form Components</TabsTrigger>
              <TabsTrigger value="data">Data Display</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="overlay">Overlay</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>A collection of button variants.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button disabled>Disabled</Button>
                      <Button variant="secondary" disabled>Disabled</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Status indicators and labels.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Avatars</CardTitle>
                    <CardDescription>A visual representation of a user or entity.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/124599" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/14985020" alt="@vercel" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="@johndoe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Components</CardTitle>
                    <CardDescription>Components for user interaction.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="flex items-center gap-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Open Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link">Hover me</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">@shadcn</h4>
                              <p className="text-sm text-muted-foreground">
                                The creator of this UI library.
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Dimensions</h4>
                              <p className="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                              </p>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex items-center gap-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">Open Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                              Make changes to your profile here.
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <Button
                        variant="outline"
                        onClick={() => {
                          const dialog = document.createElement("dialog")
                          dialog.setAttribute("open", "true")
                          document.body.appendChild(dialog)
                          const command = document.createElement("div")
                          dialog.appendChild(command)
                          const root = createRoot(command)
                          root.render(
                            <CommandDialog>
                              <CommandInput placeholder="Type a command or search..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                  <CommandItem>Calendar</CommandItem>
                                  <CommandItem>Search</CommandItem>
                                  <CommandItem>Settings</CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </CommandDialog>
                          )
                        }}
                      >
                        Show Command
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accordion</CardTitle>
                    <CardDescription>A vertically stacked set of interactive headings.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that matches the other components.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Controls</CardTitle>
                  <CardDescription>A collection of form components.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter your email" />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>

                  <div className="grid gap-4">
                    <Label>Subscription</Label>
                    <RadioGroup defaultValue="monthly" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly ($10/month)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly">Yearly ($100/year)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>

                  <div className="grid gap-2 pt-2">
                    <Label htmlFor="slider">Slider</Label>
                    <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Form Submitted",
                        description: "Your form has been submitted successfully.",
                      })
                    }}
                  >
                    Submit Form
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Tables</CardTitle>
                  <CardDescription>Table variations for displaying different types of data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Time Entries Table */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Time Entries</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Task</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Billable</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeEntries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.user}</TableCell>
                            <TableCell>{entry.task}</TableCell>
                            <TableCell>{entry.project}</TableCell>
                            <TableCell>{formatTime(entry.time)}</TableCell>
                            <TableCell>
                              <Badge variant={entry.status === "completed" ? "default" : "secondary"}>
                                {entry.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {entry.billable ? (
                                <Badge variant="outline" className="text-green-500 border-green-500">Billable</Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">Non-billable</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Project Summary Table */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Summary</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Spent</TableHead>
                          <TableHead>Remaining</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectSummary.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>
                              <div className="flex -space-x-2">
                                {project.team.map((member, i) => (
                                  <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                    <AvatarFallback className="text-xs">
                                      {member.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{formatTime(project.budget)}</TableCell>
                            <TableCell>{formatTime(project.spent)}</TableCell>
                            <TableCell>{formatTime(project.remaining)}</TableCell>
                            <TableCell>
                              <Badge variant={project.status === "at-risk" ? "destructive" : "default"}>
                                {project.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Team Members Table */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Member</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Weekly Capacity</TableHead>
                          <TableHead>Utilization</TableHead>
                          <TableHead>Active Projects</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>
                                    {member.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {member.name}
                              </div>
                            </TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{formatTime(member.weeklyCapacity)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={member.utilization} className="w-[60px]" />
                                <span className="text-sm text-muted-foreground">
                                  {member.utilization}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{member.activeProjects}</TableCell>
                            <TableCell>
                              <Badge variant={member.status === "active" ? "default" : "secondary"}>
                                {member.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Keep existing table example */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Table</h3>
                    <Table>
                      <TableCaption>Recent transactions</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Payment to John</TableCell>
                          <TableCell><Badge variant="outline">Completed</Badge></TableCell>
                          <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Payment to Sarah</TableCell>
                          <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                          <TableCell>$150.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Keep other existing content */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Components</CardTitle>
                  <CardDescription>Components for user feedback and notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert message.
                    </AlertDescription>
                  </Alert>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Show Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Success",
                          description: "Your action was completed successfully.",
                        })
                      }}
                    >
                      Show Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="navigation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation Components</CardTitle>
                  <CardDescription>Components for navigation and menus.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </CommandItem>
                        <CommandItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>
                          <span>Profile</span>
                          <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overlay" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overlay Components</CardTitle>
                  <CardDescription>Components that appear above the page content.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover for Tooltip</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>New Window</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Share</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>Undo</MenubarItem>
                          <MenubarItem>Redo</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <span>Account</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          <span>Invite users</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>New Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">Open Sheet</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit Profile</SheetTitle>
                          <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">Username</Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                          </div>
                        </div>
                        <SheetFooter>
                          <Button type="submit">Save changes</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">Show Dialog</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Command Menu</CardTitle>
                  <CardDescription>Command menu for quick actions and navigation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Team</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Layout Components</CardTitle>
                  <CardDescription>Components for building responsive layouts.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="space-y-4">
                    <Label>Aspect Ratio Container</Label>
                    <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-lg">
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </AspectRatio>
                  </div>

                  <div className="space-y-4">
                    <Label>Collapsible Section</Label>
                    <Collapsible className="w-full space-y-2">
                      <div className="flex items-center justify-between space-x-4 rounded-lg border px-4 py-3">
                        <h4 className="text-sm font-semibold">
                          Collapsible Section
                        </h4>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-2">
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                          Content that can be collapsed and expanded
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                          Additional collapsible content
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  <div className="space-y-4">
                    <Label>Resizable Layout</Label>
                    <ResizablePanelGroup
                      direction="horizontal"
                      className="min-h-[200px] max-w-full rounded-lg border"
                    >
                      <ResizablePanel defaultSize={25} minSize={20}>
                        <div className="flex h-full items-center justify-center p-6">
                          <div className="flex flex-col items-center gap-2">
                            <span className="font-semibold">Sidebar</span>
                            <span className="text-xs text-muted-foreground">Resize me!</span>
                          </div>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                          <div className="flex flex-col items-center gap-2">
                            <span className="font-semibold">Main Content</span>
                            <span className="text-xs text-muted-foreground">Flexible width</span>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>

                  <div className="space-y-4">
                    <Label>Loading States</Label>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-8 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsive Grid Layouts</CardTitle>
                  <CardDescription>Common responsive grid patterns for modern applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label>Card Grid</Label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Card key={i} className="flex flex-col justify-between">
                            <CardHeader>
                              <CardTitle className="text-sm">Card {i + 1}</CardTitle>
                              <CardDescription>Interactive card example</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Skeleton className="h-24" />
                            </CardContent>
                            <CardFooter>
                              <Button variant="ghost" size="sm">View</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Dashboard Layout</Label>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                        <Card className="md:col-span-4">
                          <CardHeader>
                            <CardTitle className="text-sm">Main Content Area</CardTitle>
                            <CardDescription>Primary content section</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <Skeleton className="h-8 w-full" />
                              <Skeleton className="h-32 w-full" />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="md:col-span-2">
                          <CardHeader>
                            <CardTitle className="text-sm">Sidebar</CardTitle>
                            <CardDescription>Secondary content</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <Skeleton className="h-8 w-full" />
                              <Skeleton className="h-8 w-full" />
                              <Skeleton className="h-8 w-full" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Cards</CardTitle>
                  <CardDescription>Data visualization cards for time tracking and project analytics.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Time Tracking Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Weekly Time Tracking</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{formatTime(28800)}</div>
                        <p className="text-xs text-muted-foreground">Average daily hours tracked</p>
                        <div className="h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timeTrackingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="name" className="text-xs" />
                              <YAxis tickFormatter={formatTime} className="text-xs" />
                              <RechartsTooltip 
                                formatter={(value: number) => formatTime(value)}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                              <Legend />
                              <Bar dataKey="billable" name="Billable" fill="hsl(var(--primary))" stackId="a" />
                              <Bar dataKey="nonBillable" name="Non-Billable" fill="hsl(var(--primary)/.4)" stackId="a" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>

                    {/* Project Allocation Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Project Time Allocation</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">4 Active Projects</div>
                        <p className="text-xs text-muted-foreground">Time distribution across projects</p>
                        <div className="h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={projectAllocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="hsl(var(--primary))"
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, value }) => `${name} (${value}%)`}
                                labelLine={{ stroke: 'hsl(var(--foreground))' }}
                              >
                                {projectAllocationData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                formatter={(value: number) => `${value}%`}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>

                    {/* Revenue vs Expenses Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Revenue vs Expenses</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">$3,800</div>
                        <p className="text-xs text-muted-foreground">Revenue this month</p>
                        <div className="h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <defs>
                                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="name" className="text-xs" />
                              <YAxis className="text-xs" />
                              <RechartsTooltip 
                                formatter={(value: number) => `$${value}`}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                name="Revenue"
                                stroke="hsl(var(--primary))" 
                                fillOpacity={1} 
                                fill="url(#revenue)" 
                              />
                              <Area 
                                type="monotone" 
                                dataKey="expenses" 
                                name="Expenses"
                                stroke="hsl(var(--destructive))" 
                                fillOpacity={1} 
                                fill="url(#expenses)" 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>

                    {/* Team Productivity Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Team Productivity</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">Average utilization rate</p>
                        <div className="h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="name" className="text-xs" />
                              <YAxis className="text-xs" />
                              <RechartsTooltip 
                                formatter={(value: number) => `$${value}`}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="profit" 
                                name="Profit Margin"
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                dot={{ 
                                  r: 4, 
                                  fill: 'hsl(var(--background))', 
                                  strokeWidth: 2 
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Add new visualization cards after the existing cards */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Activity Heatmap Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Activity Heatmap</CardTitle>
                        <CardDescription>Team activity patterns (16x16 grid)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-16 gap-[1px] bg-muted p-1 rounded-lg">
                          {activityHeatmapData.flatMap((row) =>
                            row.cells.map((cell, i) => (
                              <div
                                key={`${row.row}-${cell.col}`}
                                className="aspect-square rounded-[2px] transition-colors hover:ring-1 hover:ring-ring"
                                style={{
                                  backgroundColor: getHeatmapColor(cell.value),
                                  cursor: 'pointer',
                                }}
                                title={`Value: ${cell.value}%`}
                              />
                            ))
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-[2px]" style={{ background: getHeatmapColor(10) }} />
                            <span className="text-xs text-muted-foreground">Low</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-[2px]" style={{ background: getHeatmapColor(50) }} />
                            <span className="text-xs text-muted-foreground">Medium</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-[2px]" style={{ background: getHeatmapColor(90) }} />
                            <span className="text-xs text-muted-foreground">High</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Task Completion Trends Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Task Completion Trends</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">Task Progress</div>
                        <p className="text-xs text-muted-foreground">Weekly task status distribution</p>
                        <div className="h-[300px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={taskCompletionData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <defs>
                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="name" className="text-xs" />
                              <YAxis className="text-xs" />
                              <RechartsTooltip
                                contentStyle={{
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="completed"
                                stroke="hsl(var(--primary))"
                                fillOpacity={1}
                                fill="url(#colorCompleted)"
                                stackId="1"
                              />
                              <Area
                                type="monotone"
                                dataKey="inProgress"
                                stroke="hsl(var(--secondary))"
                                fillOpacity={1}
                                fill="url(#colorInProgress)"
                                stackId="1"
                              />
                              <Area
                                type="monotone"
                                dataKey="blocked"
                                stroke="hsl(var(--destructive))"
                                fillOpacity={1}
                                fill="url(#colorBlocked)"
                                stackId="1"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>

                    {/* Team Workload Distribution Card */}
                    <Card>
                      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="tracking-tight text-sm font-normal">Team Workload Distribution</div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">Team Capacity</div>
                        <p className="text-xs text-muted-foreground">Department workload analysis</p>
                        <div className="h-[300px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={teamWorkloadData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="name" className="text-xs" />
                              <YAxis className="text-xs" />
                              <RechartsTooltip
                                contentStyle={{
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: 'var(--radius)'
                                }}
                              />
                              <Bar dataKey="hours" fill="hsl(var(--primary))" name="Hours Logged">
                                {teamWorkloadData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`}
                                    fill={entry.hours > entry.capacity ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'}
                                  />
                                ))}
                              </Bar>
                              <Bar dataKey="capacity" fill="hsl(var(--primary)/.3)" name="Capacity" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Keep existing card variations */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Simple Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Simple Card</CardTitle>
                        <CardDescription>Basic card with header and content.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This is a simple card that can be used for displaying basic information.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Interactive Card */}
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>Card with hover state and actions.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Hover over this card to see the interactive state.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm">Cancel</Button>
                        <Button size="sm">Continue</Button>
                      </CardFooter>
                    </Card>

                    {/* Media Card */}
                    <Card>
                      <CardHeader>
                        <div className="aspect-video rounded-md bg-muted relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="h-10 w-10 text-muted-foreground" />
                          </div>
                        </div>
                        <CardTitle className="mt-2">Media Card</CardTitle>
                        <CardDescription>Card with media content.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This card includes an image or video placeholder.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Statistics Card</CardTitle>
                        <CardDescription>Card displaying key metrics.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Total Users</p>
                            <p className="text-2xl font-bold">2,543</p>
                          </div>
                          <Progress value={75} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Horizontal Card */}
                  <Card className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <div className="h-48 md:h-full bg-muted rounded-t-lg md:rounded-l-lg md:rounded-tr-none relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle>Horizontal Card</CardTitle>
                        <CardDescription>A card with horizontal layout on larger screens.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This card uses a horizontal layout on desktop and stacks vertically on mobile.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Learn More</Button>
                      </CardFooter>
                    </div>
                  </Card>

                  {/* Action Cards Grid */}
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Documents",
                        description: "Manage your files",
                        icon: Folder,
                        color: "text-blue-500"
                      },
                      {
                        title: "Settings",
                        description: "Customize your workspace",
                        icon: Settings,
                        color: "text-purple-500"
                      },
                      {
                        title: "Analytics",
                        description: "View your statistics",
                        icon: BarChart3,
                        color: "text-green-500"
                      }
                    ].map((item, i) => (
                      <Card key={i} className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${item.color}`}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="mt-2">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Cards</CardTitle>
                  <CardDescription>Example pricing tier cards.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Basic",
                        price: "$9",
                        description: "Essential features for small teams",
                        features: ["Up to 5 users", "Basic analytics", "24/7 support"]
                      },
                      {
                        title: "Pro",
                        price: "$29",
                        description: "Advanced features for growing teams",
                        features: ["Up to 20 users", "Advanced analytics", "Priority support", "Custom integrations"],
                        featured: true
                      },
                      {
                        title: "Enterprise",
                        price: "$99",
                        description: "Complete solution for large teams",
                        features: ["Unlimited users", "Full analytics suite", "Dedicated support", "Custom solutions"]
                      }
                    ].map((plan, i) => (
                      <Card key={i} className={`relative ${plan.featured ? 'border-primary shadow-lg' : ''}`}>
                        {plan.featured && (
                          <Badge className="absolute -top-2 right-4">Popular</Badge>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.title}</CardTitle>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                          </div>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, j) => (
                              <li key={j} className="flex items-center">
                                <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                            Get Started
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Toaster />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
} 