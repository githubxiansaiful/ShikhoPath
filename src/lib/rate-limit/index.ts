// In-memory sliding window rate limiter with Redis-readiness

interface RateLimitEntry {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 60, windowMs: 60 * 1000 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now();
  const windowStart = now - options.windowMs;

  let entry = memoryStore.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    memoryStore.set(identifier, entry);
  }

  // Filter timestamps within current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  if (entry.timestamps.length >= options.limit) {
    const oldest = entry.timestamps[0];
    const reset = Math.ceil((oldest + options.windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      reset: Math.max(reset, 1),
    };
  }

  entry.timestamps.push(now);
  const remaining = options.limit - entry.timestamps.length;
  const reset = Math.ceil(options.windowMs / 1000);

  return {
    success: true,
    remaining,
    reset,
  };
}
