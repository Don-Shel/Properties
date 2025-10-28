"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check } from "lucide-react"

export default function PropertyAlertsPage() {
  const [formData, setFormData] = useState({
    email: "",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/property-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          propertyType: formData.propertyType || undefined,
          location: formData.location || undefined,
          minPrice: formData.minPrice ? Number.parseInt(formData.minPrice) : undefined,
          maxPrice: formData.maxPrice ? Number.parseInt(formData.maxPrice) : undefined,
          minBedrooms: formData.minBedrooms ? Number.parseInt(formData.minBedrooms) : undefined,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Successfully subscribed! You'll receive alerts for matching properties.")
        setFormData({
          email: "",
          propertyType: "",
          location: "",
          minPrice: "",
          maxPrice: "",
          minBedrooms: "",
        })
      } else {
        setSubmitMessage("Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Property Alerts</h1>
            <p className="text-lg text-muted-foreground">
              Get notified automatically when new properties matching your criteria are listed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={20} className="text-primary" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Get notified first",
                    "Save time searching",
                    "Never miss opportunities",
                    "Customize your preferences",
                    "Unsubscribe anytime",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscribe to Alerts</CardTitle>
                  <CardDescription>
                    Set your preferences and we'll send you email alerts for new properties.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">All Types</option>
                          <option value="sale">For Sale</option>
                          <option value="rent">For Rent</option>
                          <option value="land">Land</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">All Locations</option>
                          <option value="Eldoret CBD">Eldoret CBD</option>
                          <option value="Kapseret">Kapseret</option>
                          <option value="Langas">Langas</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Min Price (KES)</label>
                        <input
                          type="number"
                          name="minPrice"
                          value={formData.minPrice}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Max Price (KES)</label>
                        <input
                          type="number"
                          name="maxPrice"
                          value={formData.maxPrice}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="999999999"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Min Bedrooms</label>
                        <select
                          name="minBedrooms"
                          value={formData.minBedrooms}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    </div>

                    {submitMessage && (
                      <div
                        className={`p-3 rounded-lg text-sm ${submitMessage.includes("Successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {submitMessage}
                      </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Subscribing..." : "Subscribe to Alerts"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
