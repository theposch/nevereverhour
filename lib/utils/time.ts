/**
 * Converts seconds to hours with one decimal place
 */
export function secondsToHours(seconds: number): number {
  return Math.round((seconds / 3600) * 10) / 10;
}

/**
 * Converts hours to seconds
 */
export function hoursToSeconds(hours: number): number {
  return hours * 3600;
}

/**
 * Calculates percentage change between two numbers
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Formats hours with one decimal place
 */
export function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

/**
 * Formats percentage change with two decimal places and sign
 */
export function formatPercentageChange(percentageChange: number): string {
  const isNegative = percentageChange < 0;
  const formattedValue = Math.abs(percentageChange).toFixed(1);
  return `${isNegative ? '↓' : '↑'} ${formattedValue}%`;
}

/**
 * Formats a date range for display
 */
export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
} 