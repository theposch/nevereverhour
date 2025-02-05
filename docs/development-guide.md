# Neverhour Dashboard Development Guide

## Overview
The Neverhour Dashboard is a modern Next.js application that provides a comprehensive interface for visualizing and managing team activity data from Everhour. This guide outlines our development practices, component architecture, and workflow guidelines.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **Type Safety**: TypeScript
- **API Integration**: Everhour REST API

## Project Structure
```
neverhour-dashboard/
├── app/                    # Next.js App Router directory
│   ├── dashboard/         # Dashboard page
│   ├── projects/         # Projects section
│   ├── reports/          # Reports and analytics
│   ├── team/            # Team management
│   ├── time/            # Time tracking
│   └── ui-kit/          # UI components showcase
├── components/           # Reusable components
│   ├── ui/              # Shadcn UI components
│   └── [feature]/       # Feature-specific components
├── lib/                 # Utility functions and services
└── docs/               # Project documentation
```

## Key Features

### Team Activity Heatmap
- Located in the dashboard section
- Uses Recharts for visualization
- Shows team activity patterns over time
- Customizable color scale for activity intensity
- Responsive design that adapts to different screen sizes

### UI Components
We use Shadcn UI components, which are built on top of Radix UI primitives. Key components include:
- Cards for content organization
- Navigation menus for routing
- Data tables for information display
- Charts and graphs for data visualization
- Form elements for user input

## Development Workflow

### Getting Started
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Setup
Required environment variables:
- `EVERHOUR_API_KEY`: Your Everhour API key
- Add other environment variables as needed

## Development Guidelines

### 1. Component Architecture

#### Server vs Client Components
- Use Server Components by default
- Add 'use client' directive only when needed:
  - Interactive components
  - Components using hooks
  - Components requiring browser APIs

Example Server Component:
```tsx
// app/projects/page.tsx
export default async function ProjectsPage() {
  const projects = await fetchProjects()
  return <ProjectList projects={projects} />
}
```

Example Client Component:
```tsx
// components/nav-user.tsx
"use client"

export function NavUser({ user }: NavUserProps) {
  const [isOpen, setIsOpen] = useState(false)
  // ... rest of the component
}
```

#### Component Organization
1. **Page Components** (`app/*/page.tsx`)
   - Handle data fetching
   - Define page layout
   - Implement error boundaries

2. **Feature Components** (`components/[feature]/`)
   - Implement specific feature logic
   - Maintain single responsibility
   - Handle feature-specific state

3. **UI Components** (`components/ui/`)
   - Import from '@/components/ui'
   - Keep stateless when possible
   - Follow accessibility guidelines

### 2. Styling Best Practices

#### Tailwind CSS Usage
- Use utility classes for styling
- Create consistent spacing with standard values
- Maintain responsive design patterns

Example:
```tsx
<div className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
  <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
  <div className="flex items-center space-x-2">
    <Button>Action</Button>
  </div>
</div>
```

#### Theme Customization
- Use CSS variables for theme values
- Implement dark mode support
- Follow the design system tokens

### 3. Data Fetching

#### Server Components
```tsx
async function getData() {
  const res = await fetch('https://api.everhour.com/...')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}
```

#### Loading States
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">...</div>
}
```

#### Error Handling
```tsx
// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-4">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
```

### 4. State Management

#### Local State
- Use React hooks for component state
- Implement controlled components
- Keep state close to where it's used

Example:
```tsx
function TeamSwitcher() {
  const [selectedTeam, setSelectedTeam] = useState<Team>()
  const [open, setOpen] = useState(false)
  // ... rest of the component
}
```

#### Global State
- Use Context for shared state
- Implement proper provider hierarchy
- Consider server state management

### 5. Performance Optimization

#### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src={user.avatar}
  alt={user.name}
  width={40}
  height={40}
  className="rounded-full"
/>
```

#### Code Splitting
- Use dynamic imports for large components
- Implement proper loading states
- Monitor bundle sizes

### 6. Accessibility

#### Keyboard Navigation
- Ensure proper tab order
- Implement focus management
- Use proper ARIA attributes

#### Screen Readers
- Add descriptive alt text
- Use semantic HTML
- Implement proper landmarks

### 7. Testing

#### Component Testing
- Write unit tests for components
- Test user interactions
- Verify accessibility

#### API Integration Testing
- Test API endpoints
- Verify error handling
- Test loading states

## Common Tasks

### Adding New Features
1. Create new components in appropriate directories
2. Update routing if needed
3. Add necessary API endpoints
4. Update documentation

### Modifying the UI
1. Use Shadcn UI components when possible
2. Customize using Tailwind CSS
3. Maintain consistency with existing design
4. Test responsiveness

### Working with Data
1. Use Server Components for data fetching
2. Implement proper loading states
3. Handle errors gracefully
4. Update visualizations as needed

## Best Practices

### Code Quality
- Follow TypeScript best practices
- Implement proper error handling
- Write clear, self-documenting code
- Use consistent naming conventions

### Performance
- Optimize images and assets
- Implement proper caching
- Monitor and optimize bundle size
- Use performance monitoring tools

### Security
- Validate user input
- Implement proper authentication
- Follow security best practices
- Keep dependencies updated

## Documentation
- Keep documentation up to date
- Document key decisions
- Maintain API documentation
- Update component documentation

## Contributing
1. Follow the established code style
2. Write clear commit messages
3. Update documentation as needed
4. Test thoroughly before submitting changes

Remember to keep this guide updated as our practices evolve. 