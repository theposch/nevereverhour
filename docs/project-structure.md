# Project Structure

This document outlines the current structure of the Neverhour Dashboard project.

```
├── app/                    # Next.js App Router directory
│   ├── dashboard/         # Main dashboard view
│   │   ├── page.tsx      # Dashboard page component
│   │   └── loading.tsx   # Loading state
│   ├── projects/         # Projects management
│   │   ├── page.tsx     # Projects list view
│   │   └── [id]/       # Individual project view
│   ├── reports/         # Analytics and reports
│   │   └── time/       # Time-based reports
│   ├── team/           # Team management
│   │   ├── page.tsx   # Team overview
│   │   └── members/   # Team members view
│   ├── time/          # Time tracking
│   │   └── timesheet/ # Timesheet view
│   └── ui-kit/        # UI components showcase
├── components/        # Reusable components
│   ├── ui/           # Shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   ├── sidebar.tsx
│   │   └── table.tsx
│   ├── dashboard/     # Dashboard-specific components
│   │   ├── overview.tsx
│   │   ├── recent-activity.tsx
│   │   └── team-activity.tsx
│   ├── projects/     # Project-specific components
│   │   ├── project-list.tsx
│   │   └── project-stats.tsx
│   ├── team/        # Team-specific components
│   │   ├── team-members.tsx
│   │   └── team-stats.tsx
│   ├── app-sidebar.tsx    # Main sidebar navigation
│   ├── mode-toggle.tsx    # Theme mode switcher
│   ├── nav-main.tsx      # Main navigation
│   ├── nav-projects.tsx  # Projects navigation
│   ├── nav-user.tsx     # User navigation
│   ├── team-switcher.tsx # Team selection
│   └── theme-provider.tsx # Theme configuration
├── lib/             # Utility functions
│   └── utils.ts    # General utilities (cn function)
├── styles/         # Global styles
│   └── globals.css # Global Tailwind styles
├── docs/          # Project documentation
│   ├── development-guide.md    # Development guidelines
│   ├── everhour-api-tests.md  # API testing documentation
│   ├── project-structure.md   # This file
│   └── everhour-dashboard.md  # Dashboard documentation
├── hooks/         # Custom React hooks
│   └── use-mobile.tsx  # Mobile detection hook
└── [configuration files]
    ├── package.json
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── next.config.mjs
    └── components.json
```

## Key Directories

### `/app`
Contains the main application routes and pages using Next.js App Router structure. Each route follows the Next.js 14 conventions with:
- `page.tsx` for route components
- `loading.tsx` for loading states
- `layout.tsx` for shared layouts
- `error.tsx` for error boundaries

### `/components`
Houses all reusable components, organized into:
- `ui/`: Shadcn UI components based on Radix UI primitives
- Feature-specific directories (dashboard/, projects/, team/)
- Shared components at the root level

### `/lib`
Utility functions and shared code, including:
- `utils.ts`: Common utilities like the `cn()` function for class names

### `/styles`
Global styling configuration:
- `globals.css`: Tailwind CSS imports and global styles
- Theme configuration and custom styles

### `/docs`
Comprehensive project documentation:
- Development guidelines
- API documentation
- Project structure
- Component documentation

### `/hooks`
Custom React hooks for shared functionality:
- Mobile detection
- Theme management
- State management utilities

## Component Organization

Components are organized following a clear hierarchy:
1. **Page Components** (`app/*/page.tsx`)
   - Main route components
   - Server components by default
   - Handle data fetching

2. **Feature Components** (`components/[feature]/`)
   - Feature-specific components
   - Organized by domain (dashboard, projects, team)
   - Reusable within their domain

3. **UI Components** (`components/ui/`)
   - Shadcn UI components
   - Built on Radix UI primitives
   - Highly reusable design system components

4. **Shared Components** (`components/*.tsx`)
   - Cross-cutting components
   - Navigation and layout components
   - Theme and configuration components

## Notes
- The project follows Next.js 14 App Router conventions
- Components are organized by feature and reusability
- Documentation is maintained alongside code
- UI components are based on Shadcn UI library
- Styles use Tailwind CSS with custom configuration 