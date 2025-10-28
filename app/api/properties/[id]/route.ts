import type { FormResponse } from "@/lib/types"
import { getPropertyById, updateProperty } from "@/lib/supabase"
import { deleteProperty } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const property = await getPropertyById(id)

    if (!property) {
      return Response.json(
        {
          success: false,
          message: "Property not found",
        } as FormResponse,
        { status: 404 },
      )
    }

    return Response.json({
      success: true,
      data: property,
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch property",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const property = await updateProperty(id, body)
    return Response.json({
      success: true,
      message: "Property updated successfully",
      data: property,
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to update property",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await deleteProperty(id)
    return Response.json({
      success: true,
      message: "Property deleted successfully",
      data: { id },
    } as FormResponse)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to delete property",
        data: error instanceof Error ? error.message : "Unknown error",
      } as FormResponse,
      { status: 500 },
    )
  }
}
