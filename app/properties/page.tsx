"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PropertyCard from "@/components/property/property-card"
import type { Property } from "@/lib/db"
import { Button } from "@/components/ui/button"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter states
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch properties')
        }
        // Ensure we always have arrays, even if empty
        const propertyData = Array.isArray(result.data) ? result.data : []
        setProperties(propertyData)
        setFilteredProperties(propertyData)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
        // Set empty arrays on error to maintain array type
        setProperties([])
        setFilteredProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    let filtered = properties

    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type)
    }
    if (filters.location) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(filters.location.toLowerCase()))
    }
    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number.parseInt(filters.maxPrice))
    }
    if (filters.minBedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= Number.parseInt(filters.minBedrooms))
    }

    setFilteredProperties(filtered)
  }

  const resetFilters = () => {
    setFilters({
      type: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
    })
    setFilteredProperties(properties)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold text-foreground mb-4">Properties</h1>
            <p className="text-lg text-muted-foreground">Browse our complete listing of properties in Eldoret</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <h2 className="text-lg font-semibold text-foreground mb-4">Filter Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">All Locations</option>
                  <option value="Eldoret CBD">Eldoret CBD</option>
                  <option value="Kapseret">Kapseret</option>
                  <option value="Langas">Langas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Min Price (KES)</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="0"
                  aria-label="Minimum price filter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max Price (KES)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="999999999"
                  aria-label="Maximum price filter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Min Bedrooms</label>
                <select
                  name="minBedrooms"
                  value={filters.minBedrooms}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={applyFilters} className="shadow-md hover:shadow-lg transition-shadow">
                Apply Filters
              </Button>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="hover:bg-secondary transition-colors bg-transparent"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-muted-foreground mt-4">Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
              <Button onClick={resetFilters} variant="outline" className="mt-4 bg-transparent">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 animate-in fade-in duration-500">
                <p className="text-sm text-muted-foreground">Showing {filteredProperties.length} properties</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
