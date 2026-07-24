/**
 * Simple in-memory rate limiter.
 * For production, replace with @upstash/ratelimit + Redis.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  })
}, 10 * 60 * 1000)

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number // Time window in milliseconds
}

/**
 * Check if a request should be rate limited.
 * Returns true if the request is allowed, false if rate limited.
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    // First request or window expired
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

/**
 * Get a rate limit key from a request.
 */
export function getRateLimitKey(request: Request, prefix: string): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown"
  return `${prefix}:${ip}`
}

// Pre-configured rate limiters
export const RATE_LIMITS = {
  guest: { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  free: { maxRequests: 20, windowMs: 24 * 60 * 60 * 1000 }, // 20 per day
  pro: { maxRequests: 200, windowMs: 24 * 60 * 60 * 1000 }, // 200 per day
  upload: { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 uploads per hour
} as const
