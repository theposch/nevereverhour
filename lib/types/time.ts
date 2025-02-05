export interface TimeData {
  currentHours: number;
  previousHours: number;
  workspaceId?: string;
  isBillable?: boolean;
}

export interface TimeDataOptions {
  workspaceId?: string;
  isBillable?: boolean;
}

export interface WeeklyHoursData {
  currentHours: number;
  previousHours: number;
}

export interface TimeEntry {
  id: number;
  date: string;
  time: number;
  user: number;
  task?: {
    id: string;
    name: string;
    type: string;
    status: string;
  };
  isBillable?: boolean;
  workspace?: string;
}

// Constants
export const PACT_STUDIO_WORKSPACE = "pact-studio-inc" as const; 