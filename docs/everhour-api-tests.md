# Everhour API Test Results

This document contains the results of our API test calls and what data we can get from each endpoint. This helps us understand what's available when building new widgets.

## Authentication and Error Handling

### Authentication
All requests must include the `X-Api-Key` header with a valid API key. The API key must have appropriate permissions for the endpoints being accessed.

### Making API calls using curl
When testing the API, we can use curl to make the requests. first ensure the environment variable `EVERHOUR_API_KEY` is set. @env.local

```bash
curl -X GET "https://api.everhour.com/team/users" -H "X-Api-Key: YOUR_API_KEY"
```


Example usage:
```bash
curl -H "X-Api-Key: $EVERHOUR_API_KEY" "https://api.everhour.com/reports/time?from=2024-01-01&to=2024-03-19" | jq
```

### Common Error Responses
```json
{
  "code": 403,
  "message": "Access denied"
}
```

Common error scenarios:
1. Invalid API key
2. Expired API key
3. Insufficient permissions
4. Rate limiting
5. Resource not found (404)

Best Practices:
1. Store API key securely in environment variables
2. Implement proper error handling
3. Add retry logic for rate limits
4. Log errors appropriately
5. Provide user-friendly error messages

## Time Tracking Endpoints

### GET /team/time
Endpoint: `https://api.everhour.com/team/time`

Query Parameters:
- `from` (required): Start date in YYYY-MM-DD format
- `to` (required): End date in YYYY-MM-DD format
- `limit` (optional): Number of entries per page (default: 1000)
- `userId` (optional): Filter by specific user
- `taskId` (optional): Filter by specific task
- `projectId` (optional): Filter by specific project

Returns an array of time entries within the specified date range.

Response Fields:
```json
[
  {
    "id": number,              // Time entry ID
    "date": string,           // Entry date (YYYY-MM-DD)
    "createdAt": string,      // Creation timestamp
    "user": number,           // User ID
    "time": number,           // Time in seconds
    "task": {                 // Associated task details
      "id": string,           // Task ID
      "name": string,         // Task name
      "type": "task",         // Task type
      "status": string,       // Task status
      "url": string,          // Task URL
      "iteration": string,    // Task grouping/sprint
      "projects": string[],   // Associated project IDs
      "parentName": string,   // Optional parent task name
      "parentId": string,     // Optional parent task ID
      "createdAt": string,    // Task creation timestamp
      "dueOn": string,        // Optional due date
      "startOn": string,      // Optional start date
      "labels": string[],     // Task labels
      "time": {              // Task time summary
        "total": number,     // Total time in seconds
        "users": {          // Time per user
          [userId: string]: number
        },
        "timerTime": number // Time from timer
      },
      "attributes": {       // Optional custom attributes
        [key: string]: string
      },
      "completed": boolean,
      "completedAt": string,
      "assignees": [       // Task assignees
        {
          "accountId": string,
          "accountName": string,
          "userId": number
        }
      ]
    },
    "history": [           // Time entry changes
      {
        "id": number,
        "createdAt": string,
        "time": number,    // Time in seconds
        "action": "TIMER" | "EDIT" | "ADD",
        "previousTime": number,
        "previousDate": string | null,
        "previousTask": string | null,
        "createdBy": number,
        "warning": string | null
      }
    ],
    "lockReasons": string[], // Reasons if entry is locked
    "isLocked": boolean,    // Lock status
    "cost": number,         // Cost in cents
    "costRate": number      // Cost rate in cents
  }
]
```

Key Features:
- Detailed time tracking information
- Task associations and details
- Time entry history
- Cost tracking
- Lock status management
- User assignments
- Project relationships

Common Use Cases:
1. Time tracking reports
2. Cost analysis
3. User activity monitoring
4. Project time allocation
5. Billing calculations

Notes:
- Time values are in seconds
- Cost values are in cents
- Dates use YYYY-MM-DD format
- Timestamps include timezone
- History tracks all changes to time entries

### GET /reports/time
Endpoint: `https://api.everhour.com/reports/time`

Query Parameters:
- `from` (required): Start date in YYYY-MM-DD format
- `to` (required): End date in YYYY-MM-DD format
- `userId` (optional): Filter by specific user
- `taskId` (optional): Filter by specific task
- `projectId` (optional): Filter by specific project

Returns aggregated time report data within the specified date range.

Response Fields:
```json
{
  "data": {
    "rows": [
      [
        string,           // Task ID
        number,           // User ID
        string,           // Date (YYYY-MM-DD)
        number,           // Total time in seconds
        number,           // Timer time in seconds
        number,           // Adjusted time in seconds
        string | null,    // Optional comment
        number | null,    // Rate in cents
        number | null,    // Cost in cents
        number | null,    // Billable time in seconds
        number | null,    // Non-billable time in seconds
        number | null,    // Expenses in cents
        number            // User rate in cents
      ]
    ]
  }
}
```

Key Features:
- Aggregated time data
- User-specific rates and costs
- Billable vs non-billable time
- Timer vs manual time entries
- Expense tracking
- Rate management

Common Use Cases:
1. Financial reporting
2. Billing summaries
3. Resource utilization analysis
4. Cost tracking
5. Performance metrics

Notes:
- Time values are in seconds
- Monetary values are in cents
- Dates use YYYY-MM-DD format
- Null values indicate optional or unavailable data
- Data is organized in a tabular format for easy processing

## Project Endpoints

### GET /projects
Endpoint: `https://api.everhour.com/projects`

Returns an array of all projects accessible to the authenticated user.

Response Fields:
```json
[
  {
    "id": string,                // Project ID
    "name": string,             // Project name
    "platform": string,         // Platform identifier (e.g. "as" for Asana)
    "createdAt": string,        // Creation date (YYYY-MM-DD)
    "workspaceId": string,      // Workspace ID
    "workspaceName": string,    // Workspace name
    "status": "open" | "archived", // Project status
    "users": number[],          // Array of user IDs assigned to project
    "attributes": {             // Custom project attributes
      [key: string]: string
    },
    "foreign": boolean,         // Whether project is from external platform
    "favorite": boolean,        // Whether project is marked as favorite
    "hasWebhook": boolean,      // Whether project has webhooks configured
    "estimatesType": string,    // Type of estimates used
    "billing": {               // Optional billing configuration
      "type": "fixed_fee" | "hourly",
      "fee": number           // Fee amount in cents (for fixed_fee)
    },
    "budget": {                // Optional budget configuration
      "excludeUnbillableTime": boolean,
      "excludeExpenses": boolean,
      "period": "general" | "monthly",
      "monthStartDate": number, // For monthly budgets
      "appliedFrom": string,   // Budget start date
      "type": "time",         // Budget type
      "budget": number,       // Budget amount in seconds
      "disallowOverbudget": boolean,
      "showToUsers": boolean,
      "threshold": number,    // Budget threshold percentage
      "thresholdNotificationUsers": number[], // Users to notify
      "progress": number,     // Current progress in seconds
      "timeProgress": number, // Time progress in seconds
      "expenseProgress": number // Expense progress in cents
    },
    "rate": {                 // Optional rate configuration
      "type": "project_rate" | "user_rate",
      "rate": number         // Rate amount in cents
    },
    "enableResourcePlanner": boolean,
    "isTemplate": boolean,
    "privacy": "private" | "public",
    "connectionStatus": string,
    "client": number,        // Optional client ID
    "viewSettings": any      // Custom view settings
  }
]
```

Key Features:
- Comprehensive project information
- Billing and budget tracking
- Resource planning settings
- Client associations
- Team member assignments
- Custom attributes support
- Webhook integration status

Common Use Cases:
1. Project portfolio management
2. Budget monitoring
3. Resource allocation
4. Client reporting
5. Team workload analysis

Notes:
- Time values are in seconds
- Monetary values are in cents
- Dates use YYYY-MM-DD format

### GET /dashboards/projects
Endpoint: `https://api.everhour.com/dashboards/projects`

Query Parameters:
- `date_gte` (optional): Filter by start date (YYYY-MM-DD)
- `date_lte` (optional): Filter by end date (YYYY-MM-DD)
- `status` (optional): Filter by project status
- `workspaceId` (optional): Filter by workspace
- `limit` (optional): Number of projects per page
- `page` (optional): Page number for pagination

Returns project metrics and status information:
```json
{
  "projectId": "as:1208022973601710",
  "projectName": "Beautycounter",
  "projectStatus": "open",
  "workspaceName": "Pact Studio Inc.",
  "billing": {
    "type": "fixed_fee",
    "fee": 12500000
  },
  "budget": {
    "type": "time",
    "budget": 1800000,
    "progress": 3028740
  }
}
```

Key data points:
- Project status (open/archived)
- Billing type and amounts
- Budget information and progress
- Time tracking metrics
- Profit/cost calculations

## User Endpoints

### GET /users/me
Endpoint: `https://api.everhour.com/users/me`

Returns detailed information about the authenticated user.

Response Fields:
```json
{
  "id": number,                    // User ID
  "email": string,                 // User email
  "name": string,                  // Full name
  "headline": string,              // Job title/role
  "status": "active" | "inactive", // Account status
  "role": "admin" | "user",        // User role
  "type": "employee",              // User type
  "cost": number,                  // Cost rate in cents
  "rate": number,                  // Billing rate in cents
  "capacity": number,              // Weekly capacity in seconds
  "timezone": number,              // Timezone offset
  "avatarUrl": string,             // Profile image URL
  "team": {
    "id": number,                  // Team ID
    "name": string,                // Team name
    "workdays": string[],          // Working days ["MON", "TUE", etc]
    "workHoursFrom": string,       // Work start time "09:00"
    "workHoursTo": string,         // Work end time "17:00"
    "workTimeMin": number,         // Min work hours in seconds
    "workTimeMax": number,         // Max work hours in seconds
    "billing": {
      "plan": string,             // Subscription plan
      "status": string,           // Billing status
      "seats": number             // Total seats
    }
  },
  "groups": [                     // Department/group assignments
    {
      "id": number,
      "name": string
    }
  ],
  "timeTrackingPolicy": {         // Time tracking permissions
    "allowTimeWithoutTask": boolean,
    "allowManualTimeInput": boolean,
    "allowFutureTime": boolean,
    "allowCompletedTaskTime": boolean,
    "allowTimeWithoutEstimate": boolean,
    "allowExceedEstimate": boolean,
    "allowManageEstimates": boolean
  },
  "permissions": {                // User permissions
    "billingBudgets": "write" | "read" | "none",
    "userLimits": "write" | "read" | "none",
    "costs": "write" | "read" | "none",
    "invoices": "write" | "read" | "none",
    "expenses": "write" | "read" | "none"
  }
}
```

Key Features:
- Complete user profile information
- Team settings and work hours
- Department/group assignments
- Detailed permissions
- Time tracking policies
- Billing rates and capacity

### GET /team/users
Endpoint: `https://api.everhour.com/team/users`

Returns an array of all users in the team.

Response Fields:
```json
[
  {
    "id": number,              // User ID
    "email": string,          // User email
    "name": string,           // User name
    "headline": string,       // User title/role
    "createdAt": string,      // Creation timestamp
    "status": "active" | "removed", // User status
    "role": "admin" | "member" | "supervisor", // User role
    "type": "employee" | "contractor", // User type
    "isEmailVerified": boolean,
    "costHistory": [         // Cost rate history
      {
        "id": number,
        "cost": number,     // Cost in cents
        "createdAt": string // Timestamp
      }
    ],
    "cost": number,         // Current cost rate in cents
    "rate": number,         // Billing rate in cents
    "capacity": number,     // Work capacity in seconds
    "groups": [             // Department/team groups
      {
        "id": number,
        "name": string
      }
    ],
    "resourcePlannerAccess": { // Resource planning permissions
      "viewMine": boolean,
      "editMine": boolean,
      "viewAll": boolean,
      "editAll": boolean
    },
    "timeTrackingPolicy": {   // Time tracking permissions
      "allowTimeWithoutTask": boolean,
      "allowManualTimeInput": boolean,
      "allowFutureTime": boolean,
      "allowCompletedTaskTime": boolean,
      "allowTimeWithoutEstimate": boolean,
      "allowExceedEstimate": boolean,
      "allowManageEstimates": boolean
    },
    "avatarUrl": string,     // Small avatar URL
    "avatarUrlLarge": string, // Large avatar URL
    "permissions": {         // Administrative permissions
      "billingBudgets": "write",
      "userLimits": "write",
      "costs": "write",
      "invoices": "write",
      "expenses": "write"
    },
    "budget": {             // Optional budget settings
      "excludeUnbillableTime": boolean,
      "excludeExpenses": boolean,
      "period": "monthly",
      "monthStartDate": number,
      "type": "time",
      "budget": number,    // Budget in seconds
      "disallowOverbudget": boolean,
      "showToUsers": boolean,
      "threshold": number, // Budget threshold percentage
      "thresholdNotificationUsers": number[],
      "progress": number, // Progress in seconds
      "timeProgress": number,
      "expenseProgress": number
    },
    "enableResourcePlanner": boolean
  }
]
```

Key Features:
- Comprehensive user information
- Role and permission management
- Cost and rate tracking
- Time tracking policies
- Resource planning access
- Budget management
- Group/department organization

Common Use Cases:
1. User management
2. Permission control
3. Cost tracking
4. Resource planning
5. Team organization

Notes:
- Time values are in seconds
- Monetary values are in cents
- Timestamps include timezone
- Permissions are role-based
- Budget tracking is optional

## Timer Endpoints

### GET /timers/current
Endpoint: `https://api.everhour.com/timers/current`

Returns the current timer status and details if active.

Response Fields:
```json
{
  "status": "active" | "stopped", // Timer status
  "duration": number,            // Duration in seconds (if active)
  "user": {                      // User details (if active)
    "id": number,
    "email": string,
    "name": string,
    "headline": string,
    "capacity": number,
    "avatarUrl": string,
    "avatarUrlLarge": string
  },
  "startedAt": string,          // Start timestamp (if active)
  "userDate": string,           // User's local date (if active)
  "task": {                     // Task details (if active)
    "id": string,
    "type": "task",
    "name": string,
    "url": string,
    "status": string,
    "iteration": string,
    "projects": string[],
    "labels": string[],
    "createdAt": string,
    "dueOn": string,
    "completed": boolean,
    "completedAt": string,
    "time": {
      "total": number,
      "users": {
        [userId: string]: number
      },
      "timerTime": number
    },
    "assignees": [
      {
        "accountId": string,
        "accountName": string,
        "userId": number
      }
    ]
  },
  "timecard": {                // Timecard details (if active)
    "weekId": number,
    "lockReasons": string[],
    "user": number,
    "isLocked": boolean,
    "date": string,
    "clockIn": string,
    "history": [
      {
        "action": string,
        "trigger": string,
        "createdBy": number,
        "createdAt": string,
        "time": string
      }
    ]
  }
}
```

### POST /timers
Endpoint: `https://api.everhour.com/timers`

Starts a timer for a specific task.

Request Body:
```json
{
  "task": string  // Task ID
}
```

Response: Same as GET /timers/current when timer is active.

### DELETE /timers/current
Endpoint: `https://api.everhour.com/timers/current`

Stops the current timer.

Response Fields:
```json
{
  "status": "stopped",
  "taskTime": {              // Time entry details
    "id": number,
    "user": number,
    "date": string,
    "time": number,         // Total time in seconds
    "manualTime": number,   // Manual time in seconds
    "timerTime": number,    // Timer time in seconds
    "pastDateTime": number,
    "cost": number,        // Cost in cents
    "costRate": number,    // Cost rate in cents
    "isLocked": boolean,
    "lockReasons": string[],
    "createdAt": string,
    "history": [           // Time entry changes
      {
        "id": number,
        "time": number,
        "previousTime": number,
        "action": string,
        "source": string,
        "createdAt": string,
        "createdBy": number
      }
    ],
    "task": {             // Task details
      // Same structure as in GET /timers/current
    }
  }
}
```

Key Features:
- Timer status tracking
- Task association
- Time entry creation
- Cost tracking
- History logging
- Timecard integration

Common Use Cases:
1. Time tracking
2. Task progress monitoring
3. Cost calculation
4. Timecard management
5. Activity logging

Notes:
- Time values are in seconds
- Cost values are in cents
- Timestamps include timezone
- Timer actions are logged in history
- Task details are included in responses

## Webhook Integration

Everhour provides webhook integration through project settings. Each project can have its own webhook configuration.

### Project Webhook Status
The project response includes a `hasWebhook` boolean field indicating if webhooks are enabled:
```json
{
  "id": "as:1207473432386805",
  "name": "Project Name",
  "hasWebhook": true
}
```

### Webhook Events
Projects can be configured to send webhooks for the following events:
- Time entries created/updated/deleted
- Timer started/stopped
- Tasks created/updated/deleted
- Project settings changed
- Budget thresholds reached

### Webhook Configuration
Webhooks must be configured through the Everhour web interface:
1. Navigate to Project Settings
2. Select Integrations
3. Configure webhook URL and events
4. Test webhook connection

### Security
- Webhooks are sent with an `X-Everhour-Signature` header
- The signature is a HMAC SHA-256 hash of the request body
- Use the signature to verify webhook authenticity

### Best Practices
1. Implement webhook endpoint with proper security validation
2. Handle webhook retries (Everhour will retry failed deliveries)
3. Process webhooks asynchronously
4. Respond quickly to webhook requests (under 3 seconds)
5. Monitor webhook delivery status in project settings

## Best Practices

1. Date Formatting:
   - Use ISO format (YYYY-MM-DD) for date parameters
   - Server returns dates in the same format

2. Time Values:
   - All time values are in seconds
   - Need to convert to hours/minutes for display
   - Use helper functions for consistent formatting

3. Rate Limiting:
   - Haven't hit any rate limits in testing
   - Should still implement retry logic for production

4. Authentication:
   - Use X-Api-Key header for all requests
   - API key can be found in user profile
   - Store API key securely in environment variables

## TODO
- [x] Document all available query parameters
- [ ] Test pagination limits
- [ ] Document error responses
- [ ] Test bulk operations
- [ ] Document webhook integration options
- [ ] Test rate limits and document thresholds

## Task Endpoints

### GET /projects/{projectId}/tasks
Endpoint: `https://api.everhour.com/projects/{projectId}/tasks`

Returns an array of all tasks for a specific project.

Response Fields:
```json
[
  {
    "id": string,                // Task ID
    "name": string,             // Task name
    "type": "task",             // Task type
    "status": "open" | "completed", // Task status
    "url": string,              // Task URL in platform
    "iteration": string,        // Task grouping/sprint
    "projects": string[],       // Associated project IDs
    "parentName": string,       // Optional parent task name
    "parentId": string,         // Optional parent task ID
    "createdAt": string,        // Creation timestamp
    "dueOn": string,           // Optional due date
    "startOn": string,         // Optional start date
    "labels": string[],        // Task labels
    "time": {                  // Optional time tracking data
      "total": number,         // Total time in seconds
      "users": {               // Time per user
        [userId: string]: number
      },
      "timerTime": number      // Time from timer
    },
    "attributes": {            // Optional custom attributes
      [key: string]: string
    },
    "completed": boolean,      // Completion status
    "completedAt": string,     // Completion timestamp
    "assignees": [             // Task assignees
      {
        "accountId": string,   // Platform account ID
        "accountName": string, // Platform account name
        "userId": number       // Everhour user ID
      }
    ]
  }
]
```

Key Features:
- Detailed task information
- Time tracking per task and user
- Task relationships (parent/child)
- Assignment tracking
- Custom attributes
- Label support
- Iteration/sprint grouping

Common Use Cases:
1. Project task management
2. Time tracking analysis
3. Sprint planning
4. Resource allocation
5. Progress monitoring

Notes:
- Time values are in seconds
- Timestamps include timezone
- Dates use YYYY-MM-DD format
- Tasks can be hierarchical (parent/child)

## API Authentication Testing Results

### Authentication Status
- API Key successfully configured and tested
- Full admin-level access confirmed
- All tested endpoints responding correctly

### Tested Endpoints
1. `/users/me`
   - Status: ✅ Working
   - Returns complete user profile
   - Includes team settings, permissions, and work hours
   - Confirmed admin role and access levels

2. `/team/users`
   - Status: ✅ Working
   - Returns full team roster
   - Includes detailed user information
   - Shows cost history and resource planning access
   - Provides group/department assignments

3. `/projects`
   - Status: ✅ Working
   - Returns all accessible projects
   - Includes billing and budget information
   - Shows team assignments and client relationships
   - Webhook integration status available

4. `/projects/{projectId}/tasks`
   - Status: ✅ Working
   - Returns complete task list for a project
   - Includes task details, status, assignments
   - Shows time tracking data per task
   - Supports hierarchical task structure
   - Provides iteration/sprint grouping

5. `/dashboards/projects`
   - Status: ✅ Working
   - Returns project metrics and financial data
   - Includes billing types and amounts
   - Shows time tracking summaries
   - Provides profit/cost calculations
   - Workspace and client relationships

### Access Levels Confirmed
- Admin-level permissions verified
- Full access to user management
- Complete project visibility
- Budget and billing information accessible
- Resource planning capabilities enabled

### API Key Configuration
```bash
# API key should be set in environment
export EVERHOUR_API_KEY='your-api-key'

# For production, add to .env.local
EVERHOUR_API_KEY=your-api-key
```

### Response Times
- All endpoints responding within expected timeframes
- No rate limiting issues encountered
- Pagination working correctly
- Large dataset handling confirmed

### Test Summary
All major endpoints have been tested and are working correctly:
- ✅ User endpoints (`/users/me`, `/team/users`)
- ✅ Project endpoints (`/projects`, `/projects/{id}/tasks`, `/dashboards/projects`)
- ✅ Time tracking endpoints (`/team/time`, `/reports/time`)
- ✅ Timer endpoints (`/timers/current`, `/timers`, `/timers/current` DELETE)

### Next Steps
- [x] Test remaining endpoints
- [ ] Document rate limiting thresholds
- [ ] Test bulk operations
- [ ] Verify webhook functionality
- [ ] Test error scenarios