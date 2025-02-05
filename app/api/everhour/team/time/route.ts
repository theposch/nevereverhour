import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  if (!from || !to) {
    return NextResponse.json(
      { error: "Missing required date parameters" },
      { status: 400 }
    )
  }

  const apiToken = process.env.EVERHOUR_API_TOKEN
  if (!apiToken) {
    console.error("EVERHOUR_API_TOKEN environment variable is not set")
    return NextResponse.json(
      { error: "API configuration error" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.everhour.com/team/time?from=${from}&to=${to}`,
      {
        headers: {
          "X-Api-Key": apiToken,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Everhour API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`Everhour API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from Everhour:", error)
    return NextResponse.json(
      { error: "Failed to fetch data from Everhour. Please check server logs for details." },
      { status: 500 }
    )
  }
} 