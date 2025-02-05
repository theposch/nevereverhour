import { TimeData } from '@/types/time'
import { secondsToHours } from '@/lib/utils/time'

const EVERHOUR_API_BASE = 'https://api.everhour.com'

// Define workspace project IDs
const WORKSPACE_PROJECT_IDS = {
  'pact-studio-inc': [
    '1199103705309832', // Studs
    '1203627380790131', // Beekman 1802
    '1205953029710683', // Rifle Paper Co. - Design
    '1198939696041013', // Hill House Home
    '1198970874253750', // goTenna
    '1203657781254275', // ABC Carpet & Home
    '1204717391454062', // Pehr
    '1205874142742698', // Mateina
    '1205943586153660', // Cash by Cash App
    '1208022973601710', // Beautycounter
    '1208691981535028', // Beautycounter – Great In-Between Sale
  ],
  // Add other workspace project IDs here
};

// Add this function before fetchTimeData
async function fetchProjectStatuses(): Promise<Record<string, boolean>> {
  const response = await fetch(`${EVERHOUR_API_BASE}/projects`, {
    headers: {
      'X-Api-Key': process.env.EVERHOUR_API_TOKEN || '',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch project statuses: ${response.statusText}`);
  }

  const projects = await response.json();
  return projects.reduce((acc, project) => {
    acc[project.id] = project.status !== 'archived';
    return acc;
  }, {});
}

export async function fetchTimeData(
  from: string,
  to: string,
  settings: { workspaceId: string; isBillable?: boolean } = { workspaceId: 'pact-studio-inc' }
): Promise<TimeData> {
  const workspaceProjectIds = WORKSPACE_PROJECT_IDS[settings.workspaceId] || [];

  // Add debug logging for date range
  console.log('Fetching time data for:', {
    from,
    to,
    workspaceId: settings.workspaceId,
    isBillable: settings.isBillable
  });

  const response = await fetch(`${EVERHOUR_API_BASE}/team/time?from=${from}&to=${to}&limit=1000`, {
    headers: {
      'X-Api-Key': process.env.EVERHOUR_API_TOKEN || '',
      'Content-Type': 'application/json',
    },
    cache: 'no-store' // Disable caching to always get fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch time data: ${response.statusText}`);
  }

  const timeEntries = await response.json();
  
  // Filter entries by workspace projects and billable status
  const filteredEntries = timeEntries.filter((entry) => {
    const taskUrl = entry.task?.url;
    const projectId = taskUrl?.split('/')[4];

    // Skip entries without task URL or project ID
    if (!taskUrl || !projectId) {
      return false;
    }

    // Only include entries from the specified workspace
    if (settings.workspaceId === 'pact-studio-inc' && !workspaceProjectIds.includes(projectId)) {
      return false;
    }

    // Check billable status - consider billable by default unless explicitly marked as non-billable
    const isBillable = entry.task?.billing?.billable !== false;
    if (settings.isBillable !== undefined && settings.isBillable !== isBillable) {
      return false;
    }

    return true;
  });

  // Calculate total hours
  const totalSeconds = filteredEntries.reduce((acc, entry) => acc + entry.time, 0);
  const totalHours = totalSeconds / 3600;

  // Log the results
  console.log('Hours calculation:', {
    totalEntries: timeEntries.length,
    filteredEntries: filteredEntries.length,
    totalHours,
    dateRange: { from, to }
  });

  return {
    currentHours: totalHours,
    previousHours: 0,
    workspaceId: settings.workspaceId,
    isBillable: settings.isBillable,
  };
} 