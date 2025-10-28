import { getBlogPostBySlug } from "@/lib/mock-blog-data"
import type { FormResponse } from "@/lib/types"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
      return Response.json(
        {
          success: false,
          message: "Blog post not found",
        } as FormResponse,
        { status: 404 },
      )
    }

    return Response.json({
      success: true,
      data: post,
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch blog post",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}
