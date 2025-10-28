// Email service integration for form submissions

export interface EmailPayload {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn("[v0] Email service not configured, skipping email")
      return true
    }

    // Using Resend API (recommended for Next.js)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Joshina Properties <noreply@joshina.com>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo || "info@joshina.com",
      }),
    })

    if (!response.ok) {
      console.error("[v0] Email send failed:", await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Email service error:", error)
    return false
  }
}

export function generateContactEmailHTML(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7033ff;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <hr style="border: none; border-top: 1px solid #e7e7ee; margin: 20px 0;">
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `
}

export function generateViewingRequestEmailHTML(data: {
  name: string
  email: string
  phone: string
  propertyTitle: string
  message: string
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7033ff;">New Viewing Request</h2>
      <p><strong>Property:</strong> ${escapeHtml(data.propertyTitle)}</p>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <hr style="border: none; border-top: 1px solid #e7e7ee; margin: 20px 0;">
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `
}

export function generateValuationEmailHTML(data: {
  name: string
  email: string
  phone: string
  propertyType: string
  location: string
  area: string
  description: string
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7033ff;">New Valuation Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <hr style="border: none; border-top: 1px solid #e7e7ee; margin: 20px 0;">
      <h3>Property Details:</h3>
      <p><strong>Type:</strong> ${escapeHtml(data.propertyType)}</p>
      <p><strong>Location:</strong> ${escapeHtml(data.location)}</p>
      <p><strong>Area:</strong> ${escapeHtml(data.area)} m²</p>
      <p><strong>Description:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(data.description)}</p>
    </div>
  `
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
