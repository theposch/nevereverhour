# Everhour Dashboard

A modern dashboard that displays time tracking data from the Everhour API. It is built with Next.js 14, Supabase, and Radix UI.
The dashboard is used by project managers, the CEO and CFO to get insights into the company's time tracking data, and to better manage the company's resources. 

Key Design Considerations
	•	Reusable Components – Components should be flexible and reusable across different views.
	•	Accurate Data Calculations – Everhour’s data structure must be correctly interpreted, especially when dealing with complex billing models.
	•	Handling Unclear Scenarios – When data inconsistencies arise, provide clarification options to the user instead of making assumptions.

### Edge Cases & Scenarios

1. Mixed Billing Models
	- A project can have a fixed fee but also billable tasks that are charged hourly.
	- A retainer client might have a set monthly fee but also billable overages.
    - In Everhour, when a project is designated with a fixed-fee billing method, the total billable amount is set to a predetermined fixed sum and does not fluctuate based on the time tracked. This means that regardless of the number of hours logged, the billable amount remains constant. However, Everhour does allow for the tracking of both billable and non-billable time within such projects. Admins can mark specific tasks as non-billable, ensuring that time logged for these tasks is excluded from invoices and project budgets. This flexibility enables teams to monitor internal costs and assess any additional time spent beyond the fixed fee.
 

2. Time Tracking Beyond Budget or Project Status
	- A project might be over budget, but team members can still track time on it.
	- A project might be archived, but users can continue logging time.
	- Time logged after project completion could still be billable under certain conditions.

3. Salary-Based Payroll vs. Hourly Billing
	- Employees are salaried, meaning their pay remains the same regardless of hours worked.
	- Everhour assumes an hourly-based model, which does not align with how agencies pay staff.
	- Some employees work overtime, but it does not affect their pay. However, it may affect utilization rates.

4. Variable Billing Rates
	- Different projects have different billing rates (e.g., Project A = $205/hr, Project B = $250/hr).
	- The same employee could work on multiple projects at different hourly rates.
	- Certain team members may have special rates

5. Non-Billable Time
	-  Some non-billable internal work (e.g., meetings, training) needs to be accounted for, even though it doesn’t contribute to billable hours.
    - The way my company for which we are building this dashboard for tracks billable time is by using the "Pact Studio Inc" workspace in Everhour.
    - All other workspaces are non-billable.

6. Non-Billable vs. Billable Time
	- Not all tracked time is billable; some internal tasks (e.g., admin work, research) must be excluded from invoicing but still reported.
	- Some projects might have blended rates (e.g., Strategy = non-billable, Design = billable).

7. Adjustments & Corrections
	- Users might need to retroactively edit time entries.
	- Invoices may be generated before time adjustments are made. How should adjustments be handled?
	- Time could be logged after a billing period closes, requiring either a carry-over or manual adjustment.

8. Capacity Planning & Utilization
	- If an employee is working on multiple projects, how do we accurately show workload distribution?
	- How do we handle non-tracked activities that still impact capacity (e.g., vacations, sick days, holidays)?
	- A team member’s allocation might change mid-sprint, affecting forecasting.


Example data to show in the app:

1. Project Metrics
   - Project status (open/archived)
   - Billing type (billable/non-billable, hourly/fixed_fee)
   - Time tracked (Everhour is tracking time in seconds, we need to convert this to hours)
   - Budget amounts (there are time budgets and money budgets)
   - Costs and profits 
   - Client associations 
   - Workspace organization

2. Time Tracking
   - Detailed time entries
   - User assignments
   - Task associations
   - Billable vs non-billable time
   - Timer usage percentage

3. Financial Data
   - Revenue (billableAmount)
   - Costs breakdown
   - Profit calculations
   - Budget utilization

4. Usability vs. Billing
   - User utilization
   - Billing rate vs. utilization
   - Billing rate vs. profitability

5. 

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (email and password)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **API Layer**: [TanStack Query](https://tanstack.com/query)


## Workflow

1. Create a new branch for each feature or bug fix
2. Ask the user for clarification if needed
3. Check the entire project file structure and make sure the new feature or bug fix is in the correct place. Refer to @project-structure.md
4. Review any existing documentation in the /docs folder
4. Make a plan for the feature and save it in the docs folder
5. Review your plan and make sure you have considered all the edge cases and scenarios
6. When working with API, make sure to test the API using curl before and after the feature or bug fix. see @everhour-api-tests.md for more information
7. Review the API responses and make sure they are correct. 
8. If you get an error when making an API call, identify the root cause of the error and try to fix it. If you cannot get the API to work, ask the user for help.
8. When the API is working as expected, map the API responses to the UI components and save the mapped components in the correct folder.
9. When using raw data to do calculations, make sure to save the calculations in the lib folder. Ensure the calculations are correct. double check the calculations by testing the API.
10. Make changes
11. Take a deep breath and review the code again. If you are happy with the code, continue with step 12.If not, repeat steps 10 and 11.
12. Test your changes by running the app locally or through other means. If you encounter an error, take a deep breath and review the code again. Try to find the root cause of the error. If you cannot find the root cause, ask the user for help.
13. If the changes work as expected, save the changes and push to the branch.


## Project Structure
```
docs/               # Documentation. 
├── instructions.md # This file
├── everhour-api-tests.md # Everhour API tests
├── supabase-schema.md # Supabase schema
├── tech-stack.md # Tech stack
├── project-structure.md # Project structure
└── README.md # README
src/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Authentication routes
│   └── (dashboard)/      # Dashboard routes
├── components/           # Reusable components
│   ├── ui/              # UI components
│   ├── layouts/         # Layout components
│   └── charts/          # Chart components
├── lib/                 # Utility functions
│   ├── utils/           # Helper functions
│   └── supabase/        # Supabase client
├── store/               # Zustand store
├── types/               # TypeScript types
└── styles/              # Global styles
```

### Authentication
All requests must include the `X-Api-Key` header with a valid API key. The API key must have appropriate permissions for the endpoints being accessed.

### Making API calls using curl
When testing the API, we can use curl to make the requests. first ensure the environment variable `EVERHOUR_API_KEY` is set. @env.local
THE USER HAS AN EXISTING .env.local file with the API key.
```bash
curl -X GET "https://api.everhour.com/team/users" -H "X-Api-Key: YOUR_API_KEY"
```


Example usage:
```bash
curl -H "X-Api-Key: $EVERHOUR_API_KEY" "https://api.everhour.com/reports/time?from=2024-01-01&to=2024-03-19" | jq
```
### Everhour Team Settings
General Settings
	•	Currency: USD - US Dollar
	•	First Day of the Week: Sunday
	•	Hourly Rate: $250  # this might be different for different projects
	•	Cost Per Hour: $180  # this might be different for different projects
	•	Capacity: 30 hours per week

Work Schedule
	•	Working Days: Monday - Friday (Saturday & Sunday are non-working days)
	•	Standard Working Hours: 9:00 AM - 5:00 PM
	•	Daily Normal Hours of Work: 6 - 8 hours