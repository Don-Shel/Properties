"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Successfully subscribed! Check your email for confirmation.")
        setEmail("")
      } else {
        setMessage(data.message || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground" aria-label="Newsletter subscription">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4" aria-hidden="true">
            <Mail size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest property listings, market insights, and real estate tips.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              aria-label="Email address for newsletter subscription"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
            />
            <Button type="submit" disabled={isLoading} variant="secondary" aria-busy={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm ${message.includes("Successfully") ? "text-green-200" : "text-red-200"}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
