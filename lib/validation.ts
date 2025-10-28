// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface EmailValidationResult {
  isValid: boolean
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(email)
  return {
    isValid,
    errors: isValid ? {} : { email: "Please enter a valid email address" },
  }
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+254|0)[1-9]\d{8}$|^\d{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .substring(0, 1000)
}

export function validateContactForm(data: {
  name: string
  email: string
  phone: string
  message: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!validateName(data.name)) {
    errors.name = "Name must be between 2 and 100 characters"
  }

  if (!validateEmail(data.email).isValid) {
    errors.email = "Please enter a valid email address"
  }

  if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)"
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  if (data.message.length > 5000) {
    errors.message = "Message must not exceed 5000 characters"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validatePropertyData(data: any): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.title || data.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters"
  }

  if (!data.price || data.price < 0) {
    errors.price = "Price must be a positive number"
  }

  if (!["sale", "rent", "land"].includes(data.type)) {
    errors.type = "Invalid property type"
  }

  if (!data.location || data.location.trim().length < 2) {
    errors.location = "Location is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
