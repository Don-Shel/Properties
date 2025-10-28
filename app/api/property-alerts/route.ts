import { validateEmail } from "@/lib/validation"
import type { FormResponse } from "@/lib/types"

// Mock storage for alerts (in production, this would be a database)
const alerts: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.email) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        } as FormResponse,
        { status: 400 },
      )
    }

    const emailValidation = validateEmail(body.email)
    if (!emailValidation.isValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid email address",
        } as FormResponse,
        { status: 400 },
      )
    }

    const alert = {
      id: String(alerts.length + 1),
      ...body,
      createdAt: new Date(),
    }

    alerts.push(alert)

    return Response.json({
      success: true,
      message: "Alert subscription created successfully",
      data: alert,
    } as FormResponse)
  } catch (error) {
    console.error("Error in property alerts API:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to create alert subscription",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function GET() {
  return Response.json({
    success: true,
    data: alerts,
    count: alerts.length,
  } as FormResponse)
}
