import { validateContactForm } from "@/lib/validation"
import { rateLimit } from "@/lib/rate-limit"
import { verifyCaptcha } from "@/lib/captcha"
import {
  sendEmail,
  generateContactEmailHTML,
  generateViewingRequestEmailHTML,
  generateValuationEmailHTML,
} from "@/lib/email"
import type { FormResponse } from "@/lib/types"

// Mock storage for leads
const leads: any[] = []

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!rateLimit(ip, 5, 60000)) {
      return Response.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        } as FormResponse,
        { status: 429 },
      )
    }

    const body = await request.json()

    if (body.captchaToken) {
      const captchaValid = await verifyCaptcha(body.captchaToken)
      if (!captchaValid) {
        return Response.json(
          {
            success: false,
            message: "CAPTCHA verification failed. Please try again.",
          } as FormResponse,
          { status: 400 },
        )
      }
    }

    const validation = validateContactForm({
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      message: body.message || "",
    })

    if (!validation.isValid) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          data: validation.errors,
        } as FormResponse,
        { status: 400 },
      )
    }

    const lead = {
      id: String(leads.length + 1),
      ...body,
      createdAt: new Date(),
    }

    leads.push(lead)

    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@joshina.com"

    if (body.type === "contact") {
      await sendEmail({
        to: contactEmail,
        subject: `New Contact Form Submission: ${body.subject || "General Inquiry"}`,
        html: generateContactEmailHTML({
          name: body.name,
          email: body.email,
          phone: body.phone,
          subject: body.subject || "General Inquiry",
          message: body.message,
        }),
        replyTo: body.email,
      })
    } else if (body.type === "viewing") {
      await sendEmail({
        to: contactEmail,
        subject: `New Viewing Request: ${body.propertyTitle || "Property"}`,
        html: generateViewingRequestEmailHTML({
          name: body.name,
          email: body.email,
          phone: body.phone,
          propertyTitle: body.propertyTitle || "Property",
          message: body.message,
        }),
        replyTo: body.email,
      })
    } else if (body.type === "valuation") {
      await sendEmail({
        to: contactEmail,
        subject: `New Valuation Request from ${body.name}`,
        html: generateValuationEmailHTML({
          name: body.name,
          email: body.email,
          phone: body.phone,
          propertyType: body.propertyType || "Not specified",
          location: body.location || "Not specified",
          area: body.area || "Not specified",
          description: body.description || "No description provided",
        }),
        replyTo: body.email,
      })
    }

    return Response.json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    } as FormResponse)
  } catch (error) {
    console.error("Error in leads API:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to submit lead",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function GET() {
  return Response.json({
    success: true,
    data: leads,
    count: leads.length,
  } as FormResponse)
}
