// SEO utility functions for schema markup and meta tags

export interface PropertySchemaMarkup {
  "@context": string
  "@type": string
  name: string
  description: string
  image: string[]
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  geo: {
    "@type": string
    latitude: number
    longitude: number
  }
  price: string
  priceCurrency: string
  availability: string
}

export function generatePropertySchema(property: any): PropertySchemaMarkup {
  return {
    "@context": "https://schema.org/",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    image: property.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.location,
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.latitude,
      longitude: property.longitude,
    },
    price: property.price.toString(),
    priceCurrency: "KES",
    availability: "https://schema.org/InStock",
  }
}

export interface OrganizationSchema {
  "@context": string
  "@type": string
  name: string
  url: string
  logo: string
  description: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint: {
    "@type": string
    telephone: string
    contactType: string
  }
  sameAs: string[]
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Joshina International Properties",
    url: "https://joshina.com",
    logo: "https://joshina.com/logo.png",
    description: "Professional real estate consultancy in Eldoret, Kenya",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Street",
      addressLocality: "Eldoret",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-700-000-000",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/joshinaproperties",
      "https://www.twitter.com/joshinaproperties",
      "https://www.linkedin.com/company/joshinaproperties",
    ],
  }
}

export interface BlogPostSchema {
  "@context": string
  "@type": string
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    "@type": string
    name: string
  }
}

// Safely convert a value to an ISO date string.
// Accepts Date, number (ms since epoch), or string (ISO or parseable).
function safeToISOString(value: any): string {
  if (!value && value !== 0) return new Date().toISOString()

  // If it's already a Date-like with toISOString, call it.
  if (typeof value?.toISOString === "function") {
    try {
      return value.toISOString()
    } catch (e) {
      // fallthrough to parsing
    }
  }

  // Numbers are treated as epoch milliseconds
  if (typeof value === "number") {
    const d = new Date(value)
    if (!isNaN(d.getTime())) return d.toISOString()
    return new Date().toISOString()
  }

  // Strings: try to parse
  if (typeof value === "string") {
    const d = new Date(value)
    if (!isNaN(d.getTime())) return d.toISOString()
    // If not parseable, return the original string (best-effort)
    return value
  }

  // Fallback: stringify
  try {
    return String(value)
  } catch (e) {
    return new Date().toISOString()
  }
}

export function generateBlogPostSchema(post: any): BlogPostSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: safeToISOString(post.createdAt),
    dateModified: safeToISOString(post.updatedAt),
    author: {
      "@type": "Person",
      name: post.author,
    },
  }
}

export interface LocalBusinessSchema {
  "@context": string
  "@type": string
  name: string
  image: string
  description: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressCountry: string
    postalCode: string
  }
  telephone: string
  url: string
  priceRange: string
  openingHoursSpecification: Array<{
    "@type": string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
}

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    name: "Joshina International Properties",
    image: "https://joshina.com/logo.png",
    description: "Professional real estate consultancy serving Eldoret and surrounding areas",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Street",
      addressLocality: "Eldoret",
      addressCountry: "KE",
      postalCode: "30100",
    },
    telephone: "+254-700-000-000",
    url: "https://joshina.com",
    priceRange: "KES 1000000 - KES 50000000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
  }
}
