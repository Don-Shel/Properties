"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RequestViewingFormProps {
  propertyId: string
  propertyTitle: string
}

export default function RequestViewingForm({ propertyId, propertyTitle }: RequestViewingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")
  const recaptchaRef = useRef<any>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const token = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: "submit",
      })

      const formData = new FormData(e.currentTarget)
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          type: "viewing",
          propertyId,
          propertyTitle,
          captchaToken: token,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Viewing request submitted successfully! We will contact you soon.")
        e.currentTarget.reset()
      } else {
        setMessage(data.message || "Failed to submit request. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Viewing</CardTitle>
        <CardDescription>Schedule a viewing for this property</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="viewing-name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              id="viewing-name"
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="viewing-email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="viewing-email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="viewing-phone" className="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <input
              id="viewing-phone"
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+254 700 000 000"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="viewing-message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="viewing-message"
              name="message"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tell us about your interest in this property..."
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full" aria-busy={isLoading}>
            {isLoading ? "Submitting..." : "Request Viewing"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
              className="underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and
            <a
              href="https://policies.google.com/terms"
              className="underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
