import { getPublishedBlogPosts, getBlogPostsByCategory } from "@/lib/mock-blog-data"
import type { FormResponse } from "@/lib/types"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
    const limit = 10

    let posts = getPublishedBlogPosts()

    if (category) {
      posts = getBlogPostsByCategory(category)
    }

    const total = posts.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const paginatedPosts = posts.slice(start, start + limit)

    return Response.json({
      success: true,
      data: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch blog posts",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}
