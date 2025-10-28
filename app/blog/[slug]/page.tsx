"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SchemaMarkup from "@/components/seo/schema-markup"
import { generateBlogPostSchema } from "@/lib/seo-utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { BlogPost } from "@/lib/db"
import { Calendar, User, Tag, Share2 } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`)
        const data = await response.json()
        if (data.success) {
          setPost(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Blog post not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const blogSchema = generateBlogPostSchema(post)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <SchemaMarkup schema={blogSchema} />

      <div className="flex-1 py-12 bg-background">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden h-96 bg-muted">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span>{post.category}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12 text-foreground">
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                    {paragraph.replace("# ", "")}
                  </h1>
                )
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                )
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {paragraph.replace("- ", "")}
                  </li>
                )
              }
              if (paragraph.trim() === "") {
                return <div key={index} className="mb-4" />
              }
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Share & CTA */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Share2 size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Share this article</span>
            </div>
            <Button asChild>
              <Link href="/contact">Get Expert Advice</Link>
            </Button>
          </div>

          {/* Related Posts CTA */}
          <div className="mt-12 p-6 bg-secondary rounded-lg text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Want to learn more?</h3>
            <p className="text-muted-foreground mb-4">
              Explore more articles and insights about real estate in Eldoret.
            </p>
            <Button asChild variant="outline">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  )
}
