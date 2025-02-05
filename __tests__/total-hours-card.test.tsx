import "@testing-library/jest-dom"
import { fetchTimeData } from "@/lib/api/everhour"

// Check if API key is set
console.log("EVERHOUR_API_TOKEN is set:", process.env.EVERHOUR_API_TOKEN ? "✅" : "❌")

describe("Total Hours Card", () => {
  it("should match CSV report data exactly", async () => {
    // Set exact date ranges from CSV files
    const thisWeekStart = "2024-02-02"
    const thisWeekEnd = "2024-02-08"
    const lastWeekStart = "2024-01-26"
    const lastWeekEnd = "2024-02-01"

    console.log("Testing with exact dates from CSV:", {
      thisWeek: `${thisWeekStart} to ${thisWeekEnd}`,
      lastWeek: `${lastWeekStart} to ${lastWeekEnd}`
    })

    // Test Case 1: Pact Studio Inc workspace this week (should be ~210-220 hours)
    // Note: All time entries in Pact Studio Inc workspace are billable unless explicitly marked as non-billable
    const pactStudioData = await fetchTimeData(thisWeekStart, thisWeekEnd, {
      workspaceId: "pact-studio-inc"
    })
    console.log("Pact Studio Inc This Week:", pactStudioData)
    expect(pactStudioData.currentHours).toBeGreaterThanOrEqual(210)
    expect(pactStudioData.currentHours).toBeLessThanOrEqual(220)

    // Test Case 2: Pact Studio Inc workspace last week (should be ~229.35 hours)
    const pactStudioLastWeek = await fetchTimeData(lastWeekStart, lastWeekEnd, {
      workspaceId: "pact-studio-inc"
    })
    console.log("Pact Studio Inc Last Week:", pactStudioLastWeek)
    expect(pactStudioLastWeek.currentHours).toBeCloseTo(229.35, 1)
  }, 30000) // Increase timeout to 30s for API calls
}) 