import { validateEmail } from "@/lib/validation"
import type { FormResponse } from "@/lib/types"

// Mock storage for newsletter subscribers
const subscribers: any[] = []

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

    // Check if already subscribed
    if (subscribers.some((s) => s.email === body.email)) {
      return Response.json(
        {
          success: false,
          message: "Email already subscribed",
        } as FormResponse,
        { status: 400 },
      )
    }

    const subscriber = {
      id: String(subscribers.length + 1),
      email: body.email,
      subscribedAt: new Date(),
    }

    subscribers.push(subscriber)

    return Response.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: subscriber,
    } as FormResponse)
  } catch (error) {
    console.error("Error in newsletter API:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to subscribe",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function GET() {
  return Response.json({
    success: true,
    data: subscribers,
    count: subscribers.length,
  } as FormResponse)
}
