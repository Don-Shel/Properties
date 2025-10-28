"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bed, Bath, Ruler } from "lucide-react"
import PropertyGallery from "@/components/property/property-gallery"
import RequestViewingForm from "@/components/property/request-viewing-form"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { Property } from "@/lib/db"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const priceDisplay =
    property.type === "rent"
      ? `KES ${property.price.toLocaleString()}/month`
      : `KES ${(property.price / 1000000).toFixed(1)}M`

  // Hover carousel state
  const [hoverIndex, setHoverIndex] = useState(0)
  const hoverInterval = useRef<number | null>(null)

  const startHoverCarousel = () => {
    if (hoverInterval.current) return
    hoverInterval.current = window.setInterval(() => {
      setHoverIndex((i) => (i >= property.images.length - 1 ? 0 : i + 1))
    }, 2000)
  }

  const stopHoverCarousel = () => {
    if (hoverInterval.current) {
      clearInterval(hoverInterval.current)
      hoverInterval.current = null
    }
  }

  useEffect(() => {
    return () => stopHoverCarousel()
  }, [])

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div
        className="relative h-52 md:h-48 lg:h-52 bg-muted overflow-hidden rounded-t-2xl"
        onMouseEnter={startHoverCarousel}
        onMouseLeave={stopHoverCarousel}
      >
        <img
          src={property.images[hoverIndex] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-md bg-gradient-to-r from-primary/90 to-accent/80 text-primary-foreground">
          {priceDisplay}
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md bg-gradient-to-r from-secondary/80 to-primary/40 text-secondary-foreground">
          {property.type === "sale" ? "For Sale" : property.type === "rent" ? "For Rent" : "Land"}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bed size={16} className="text-primary flex-shrink-0" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Bath size={16} className="text-primary flex-shrink-0" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-primary flex-shrink-0" />
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1 shadow-md hover:shadow-lg transition-shadow">
            <Link href={`/property/${property.id}`}>View Details</Link>
          </Button>

          {/* Quick View Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="shadow-md hover:shadow-lg">Quick View</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <DialogHeader>
                <DialogTitle>{property.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{property.location} • {property.type === "rent" ? `${property.price.toLocaleString()}/month` : `KES ${(property.price/1000000).toFixed(1)}M`}</DialogDescription>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PropertyGallery images={property.images} title={property.title} />
                </div>
                <div className="lg:col-span-1">
                  <RequestViewingForm propertyId={property.id} propertyTitle={property.title} />
                </div>
              </div>

              <DialogFooter />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
 