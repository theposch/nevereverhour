# Neverhour Dashboard Development Guide

## Overview
The Neverhour Dashboard is a Next.js application that provides a modern interface for visualizing and managing team activity data from Everhour. This guide will help you understand the project structure, key components, and development workflow.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React

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
3. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Setup
Required environment variables:
- `EVERHOUR_API_KEY`: Your Everhour API key
- Add other environment variables as needed

### Code Organization
- Use Server Components by default
- Add 'use client' directive only when client-side interactivity is needed
- Keep components focused and reusable
- Follow the established file structure for new features

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color scheme and design system
- Use the `cn()` utility for conditional class names
- Maintain responsive design principles

### Best Practices
1. **Component Structure**
   - Keep components small and focused
   - Use TypeScript for type safety
   - Implement proper error boundaries
   - Add loading states using Suspense

2. **Data Fetching**
   - Use Server Components for data fetching when possible
   - Implement proper error handling
   - Use appropriate caching strategies

3. **Performance**
   - Optimize images using Next.js Image component
   - Implement code splitting where beneficial
   - Monitor and optimize bundle size

4. **Accessibility**
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Test with screen readers
   - Ensure keyboard navigation works

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

## Troubleshooting

### Common Issues
1. **Build Errors**
   - Check for missing dependencies
   - Verify environment variables
   - Clear `.next` cache if needed

2. **Runtime Errors**
   - Check browser console
   - Verify API endpoints
   - Check component props

### Getting Help
- Check existing documentation
- Review component examples
- Consult the Next.js documentation
- Reach out to the team for support

## Future Development
- Implement additional visualizations
- Enhance team activity tracking
- Add more customization options
- Improve performance and optimization

## Contributing
1. Follow the established code style
2. Write clear commit messages
3. Update documentation as needed
4. Test thoroughly before submitting changes

Remember to keep this documentation updated as the project evolves. 