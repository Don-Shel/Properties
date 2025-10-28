import type { FormResponse } from "@/lib/types"
import { searchProperties, createProperty } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const type = searchParams.get("type") as "sale" | "rent" | "land" | null
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
    const minBedrooms = searchParams.get("minBedrooms") ? Number.parseInt(searchParams.get("minBedrooms")!) : undefined

    const properties = await searchProperties({
      type: type || undefined,
      location: location || undefined,
      minPrice,
      maxPrice,
      minBedrooms,
    })

    return Response.json({
      success: true,
      message: 'Properties fetched successfully',
      data: properties,
      count: properties.length,
    } as FormResponse)
  } catch (error) {
    console.error('API Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const detail = error instanceof Error && error.cause ? `Cause: ${error.cause}` : ''
    
    return Response.json(
      {
        success: false,
        message: "Failed to fetch properties",
        data: `${errorMessage}${detail ? '\n' + detail : ''}`,
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation
    if (!body.title || !body.price || !body.type) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields: title, price, type",
        } as FormResponse,
        { status: 400 },
      )
    }

    const property = await createProperty(body)

    return Response.json({
      success: true,
      message: "Property created successfully",
      data: property,
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create property",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}
