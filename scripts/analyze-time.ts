import { secondsToHours } from '../lib/utils/time';

const timeEntries = [
  // Copy the filtered entries from the test output
];

const projectTotals = timeEntries.reduce((acc, entry) => {
  const taskUrl = entry.taskUrl || '';
  const projectId = taskUrl.split('/')[4] || 'unknown';
  
  if (!acc[projectId]) {
    acc[projectId] = {
      totalSeconds: 0,
      entries: []
    };
  }
  
  acc[projectId].totalSeconds += entry.time;
  acc[projectId].entries.push(entry);
  
  return acc;
}, {} as Record<string, { totalSeconds: number, entries: any[] }>);

console.log('\nProject Totals:');
Object.entries(projectTotals).forEach(([projectId, data]) => {
  console.log(`\nProject ${projectId}:`);
  console.log(`Total Hours: ${secondsToHours(data.totalSeconds)}`);
  console.log(`Number of Entries: ${data.entries.length}`);
}); 