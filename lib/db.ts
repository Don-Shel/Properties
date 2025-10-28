// Database configuration and utilities
// This will be expanded in Phase 2 with actual database connection

export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: "sale" | "rent" | "land"
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  features: string[]
  address: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  message: string
  type: "contact" | "valuation" | "viewing" | "alert"
  propertyId?: string
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  image: string
  category: string
  published: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface PropertyAlert {
  id: string
  email: string
  propertyType: "sale" | "rent" | "land"
  location: string
  minPrice: number
  maxPrice: number
  minBedrooms: number
  createdAt: Date
}
