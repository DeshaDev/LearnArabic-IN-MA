import assert from 'node:assert/strict';
import test from 'node:test';
import type { Request, Response } from 'express';
import {
  constantTimeHexEqual,
  createRateLimiter,
  hashSessionToken,
  isSessionExpired,
} from '../src/server/security';

function invokeLimiter(
  limiter: ReturnType<typeof createRateLimiter>,
  ip: string,
  onNext: () => void
): { statusCode: number; headers: Record<string, string>; payload?: unknown } {
  let statusCode = 200;
  const headers: Record<string, string> = {};
  let payload: unknown;
  const req = { ip, socket: { remoteAddress: ip } } as unknown as Request;
  const res = {
    setHeader(name: string, value: string) {
      headers[name] = value;
      return this;
    },
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(value: unknown) {
      payload = value;
      return this;
    },
  } as unknown as Response;

  limiter(req, res, onNext);
  return { statusCode, headers, payload };
}

test('session token hashes are stable and do not expose the original token', () => {
  const token = 'secret-session-token';
  const hash = hashSessionToken(token);
  assert.equal(hash, hashSessionToken(token));
  assert.notEqual(hash, token);
  assert.match(hash, /^[a-f0-9]{64}$/);
});

test('password hash comparison validates hex and compares same-length values', () => {
  assert.equal(constantTimeHexEqual('aabbcc', 'aabbcc'), true);
  assert.equal(constantTimeHexEqual('aabbcc', 'aabbcd'), false);
  assert.equal(constantTimeHexEqual('aabb', 'aabbcc'), false);
  assert.equal(constantTimeHexEqual('not-hex', 'not-hex'), false);
});

test('session expiration is enforced at the exact expiry boundary', () => {
  assert.equal(isSessionExpired(10_000, 9_999), false);
  assert.equal(isSessionExpired(10_000, 10_000), true);
  assert.equal(isSessionExpired(Number.NaN, 0), true);
});

test('rate limiter rejects excess requests and returns Retry-After', () => {
  let time = 1_000;
  const limiter = createRateLimiter({ windowMs: 60_000, max: 2, now: () => time });
  let nextCount = 0;

  assert.equal(invokeLimiter(limiter, '203.0.113.1', () => nextCount++).statusCode, 200);
  assert.equal(invokeLimiter(limiter, '203.0.113.1', () => nextCount++).statusCode, 200);
  const blocked = invokeLimiter(limiter, '203.0.113.1', () => nextCount++);

  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.payload && (blocked.payload as { error: string }).error, 'RATE_LIMITED');
  assert.ok(Number(blocked.headers['Retry-After']) > 0);
  assert.equal(nextCount, 2);

  time += 60_001;
  assert.equal(invokeLimiter(limiter, '203.0.113.1', () => nextCount++).statusCode, 200);
  assert.equal(nextCount, 3);
});

test('rate limits are isolated by client IP', () => {
  const limiter = createRateLimiter({ windowMs: 60_000, max: 1, now: () => 1_000 });
  assert.equal(invokeLimiter(limiter, '203.0.113.1', () => {}).statusCode, 200);
  assert.equal(invokeLimiter(limiter, '203.0.113.1', () => {}).statusCode, 429);
  assert.equal(invokeLimiter(limiter, '203.0.113.2', () => {}).statusCode, 200);
});
