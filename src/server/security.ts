import crypto from 'node:crypto';
import type { Request, RequestHandler } from 'express';

export function hashSessionToken(token: string): string {
  return crypto.createHash('sha256').update(token, 'utf8').digest('hex');
}

export function constantTimeHexEqual(leftHex: string, rightHex: string): boolean {
  if (!/^(?:[a-f0-9]{2})+$/i.test(leftHex) || !/^(?:[a-f0-9]{2})+$/i.test(rightHex)) {
    return false;
  }

  const left = Buffer.from(leftHex, 'hex');
  const right = Buffer.from(rightHex, 'hex');
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function isSessionExpired(expiresAt: number, now = Date.now()): boolean {
  return !Number.isFinite(expiresAt) || expiresAt <= now;
}

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  errorCode?: string;
  now?: () => number;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

/**
 * Lightweight single-process rate limiter for this single-instance JSON-backed MVP.
 * For multi-instance production deployments, use a shared store (for example Redis).
 */
export function createRateLimiter(options: RateLimitOptions): RequestHandler {
  const { windowMs, max, errorCode = 'RATE_LIMITED', now = Date.now } = options;
  const buckets = new Map<string, RateLimitBucket>();
  let callsSinceCleanup = 0;

  return (req, res, next) => {
    const currentTime = now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    let bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= currentTime) {
      bucket = { count: 0, resetAt: currentTime + windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;

    if (bucket.count > max) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((bucket.resetAt - currentTime) / 1000))));
      res.status(429).json({ ok: false, error: errorCode });
      return;
    }

    callsSinceCleanup += 1;
    if (callsSinceCleanup >= 256) {
      callsSinceCleanup = 0;
      for (const [bucketKey, value] of buckets) {
        if (value.resetAt <= currentTime) buckets.delete(bucketKey);
      }
    }

    next();
  };
}
