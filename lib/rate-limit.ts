// Simple rate limiting utility

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const store: RateLimitStore = {}

export function rateLimit(identifier: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const key = identifier

  if (!store[key]) {
    store[key] = { count: 1, resetTime: now + windowMs }
    return true
  }

  if (now > store[key].resetTime) {
    store[key] = { count: 1, resetTime: now + windowMs }
    return true
  }

  if (store[key].count < limit) {
    store[key].count++
    return true
  }

  return false
}
