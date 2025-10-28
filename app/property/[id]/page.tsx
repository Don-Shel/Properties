"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PropertyGallery from "@/components/property/property-gallery"
import PropertyMap from "@/components/property/property-map"
import RequestViewingForm from "@/components/property/request-viewing-form"
import SchemaMarkup from "@/components/seo/schema-markup"
import { generatePropertySchema } from "@/lib/seo-utils"
import type { Property } from "@/lib/db"
import { MapPin, Bed, Bath, Ruler, Check } from "lucide-react"

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`)
        const data = await response.json()
        if (data.success) {
          setProperty(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch property:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Property not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const priceDisplay =
    property.type === "rent"
      ? `KES ${property.price.toLocaleString()}/month`
      : `KES ${(property.price / 1000000).toFixed(1)}M`

  const propertySchema = generatePropertySchema(property)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <SchemaMarkup schema={propertySchema} />

      <div className="flex-1 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={20} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">{priceDisplay}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <PropertyGallery images={property.images} title={property.title} />

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <Bed size={32} className="text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  )}
                  <div className="text-center">
                    <Bath size={32} className="text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Ruler size={32} className="text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.area}</p>
                    <p className="text-sm text-muted-foreground">m²</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={20} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Location</h2>
                <PropertyMap latitude={property.latitude} longitude={property.longitude} title={property.title} />
                <p className="text-sm text-muted-foreground mt-4">{property.address}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RequestViewingForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
