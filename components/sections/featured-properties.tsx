"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property/property-card"
import { useEffect, useState } from "react"
import type { Property } from "@/lib/db"

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/properties?type=sale&limit=3')
        const data = await res.json()
        if (data.success && data.data) {
          setProperties(data.data)
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error)
      }
    }
    
    fetchProperties()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties available in Eldoret.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
