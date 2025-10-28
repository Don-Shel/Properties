import { MetadataRoute } from "next"
import { searchProperties } from "@/lib/supabase"
import { getPublishedBlogPosts } from "@/lib/mock-blog-data"

async function getDynamicPages() {
  try {
    // Get all properties
    const properties = await searchProperties({})
    const propertyPages = properties.map((property) => ({
      url: `https://joshina.com/property/${property.id}`,
      lastModified: property.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    // Get all blog posts
    const blogPosts = await getPublishedBlogPosts()
    const blogPages = blogPosts.map((post) => ({
      url: `https://joshina.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [...propertyPages, ...blogPages]
  } catch (error) {
    console.error('Error generating dynamic sitemap pages:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://joshina.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/valuation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/alerts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Get dynamic pages (properties and blog posts)
  const dynamicPages = await getDynamicPages()

  return [...staticPages, ...dynamicPages]
}
