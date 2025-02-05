# Neverhour Dashboard

A modern Next.js application for visualizing and managing team activity data from Everhour. Built with Next.js 14, Shadcn UI, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React

## Project Structure

```
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

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
- `EVERHOUR_API_KEY`: Your Everhour API key

4. Start the development server:
```bash
npm run dev
```

## Development Guidelines

### File Structure

- Use the App Router directory structure (`app/` folder)
- Place reusable components in `components/` directory
- Use `page.tsx` for route components
- Use `layout.tsx` for shared layouts
- Use `loading.tsx` for loading states
- Use `error.tsx` for error boundaries

### React and JavaScript

- Use functional components and hooks
- Prefer Server Components by default
- Use 'use client' directive only when needed
- Use ES6+ syntax and features
- Implement proper TypeScript types

### UI Components

We use Shadcn UI components, which are built on top of Radix UI primitives:
- Import from `@/components/ui`
- Use Radix UI primitives for complex interactive components
- Customize using the provided configuration options

### Styling

- Use Tailwind CSS utility classes
- Follow the established color scheme and design system
- Use the `cn()` utility for conditional class names
- Maintain responsive design principles

### Data Fetching

- Use Server Components for data fetching when possible
- Implement loading states with React Suspense
- Use `loading.tsx` files for loading UI
- Handle errors gracefully with error boundaries

### State Management

- Use React hooks (useState, useReducer) for local state
- Consider server-side state management with Server Components
- Use context for global state when necessary

### Performance

- Implement code splitting with dynamic imports
- Use Next.js Image component for optimized images
- Utilize Next.js built-in optimizations
- Monitor and optimize bundle size

### Accessibility

- Use semantic HTML elements
- Implement proper ARIA attributes
- Test with screen readers
- Ensure keyboard navigation works

## Key Features

### Team Activity Heatmap
- Located in the dashboard section
- Uses Recharts for visualization
- Shows team activity patterns over time
- Customizable color scale for activity intensity
- Responsive design

### Project Management
- Task tracking and organization
- Time tracking integration
- Team member assignments
- Progress monitoring
- Budget tracking

### Time Tracking
- Real-time timer functionality
- Manual time entry
- Detailed time reports
- User activity monitoring
- Project time allocation

## Contributing

1. Follow the established code style
2. Write clear commit messages
3. Update documentation as needed
4. Test thoroughly before submitting changes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Documentation

Additional documentation can be found in the `docs/` directory:
- [Development Guide](docs/development-guide.md)
- [Project Structure](docs/project-structure.md)
- [API Documentation](docs/everhour-api-tests.md)

## License

[License Type] - See LICENSE file for details
