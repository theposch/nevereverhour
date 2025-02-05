# Project Structure

This document outlines the current structure of the Neverhour Dashboard project.

```
neverhour-dashboard/
├── app/                    # Next.js App Router directory
│   ├── dashboard/         # Main dashboard view
│   │   └── page.tsx      # Dashboard page component
│   ├── projects/         # Projects management
│   │   └── all/         # All projects view
│   ├── reports/         # Analytics and reports
│   │   └── time/       # Time-based reports
│   ├── team/           # Team management
│   │   └── members/    # Team members view
│   ├── time/          # Time tracking
│   │   └── timesheet/ # Timesheet view
│   └── ui-kit/        # UI components showcase
├── components/        # Reusable components
│   ├── ui/           # Shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   └── ... (other UI components)
│   ├── app-sidebar.tsx    # Main sidebar navigation
│   ├── dashboard-content.tsx  # Dashboard layout
│   ├── nav-main.tsx      # Main navigation
│   ├── nav-projects.tsx  # Projects navigation
│   ├── nav-user.tsx     # User navigation
│   ├── team-members-content.tsx  # Team members view
│   └── timesheet-content.tsx    # Timesheet view
├── docs/             # Project documentation
│   ├── development-guide.md     # Development guidelines
│   ├── everhour-api-tests.md   # API testing documentation
│   ├── everhour-dashboard.md   # Dashboard documentation
│   └── project-structure.md    # This file
├── hooks/           # Custom React hooks
│   └── use-mobile.tsx   # Mobile detection hook
├── lib/            # Utility functions
│   └── utils.ts   # General utilities
├── package.json    # Project dependencies
└── tailwind.config.ts   # Tailwind configuration
```

## Key Directories

### `/app`
Contains the main application routes and pages using Next.js App Router structure.

### `/components`
Houses all reusable components, including Shadcn UI components and feature-specific components.

### `/docs`
Project documentation and guides.

### `/hooks`
Custom React hooks for shared functionality.

### `/lib`
Utility functions and shared code.

## Notes
- The project follows Next.js 14 App Router conventions
- Components are organized by feature and reusability
- Documentation is maintained alongside code
- UI components are based on Shadcn UI library 