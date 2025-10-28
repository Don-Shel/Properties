// Shared TypeScript types and interfaces

export type PropertyType = "sale" | "rent" | "land"
export type LeadType = "contact" | "valuation" | "viewing" | "alert"

export interface FormResponse {
  success: boolean
  message: string
  data?: any
}

export interface ApiError {
  code: string
  message: string
  details?: any
}
