import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { rateLimit } from '@/lib/rate-limit';

describe('Rate Limiter Protection', () => {
  it('allows requests within threshold', async () => {
    const key = `test-user-${Date.now()}`;
    const result1 = await rateLimit(key, { limit: 3, windowMs: 1000 });
    assert.equal(result1.success, true);
    assert.equal(result1.remaining, 2);

    const result2 = await rateLimit(key, { limit: 3, windowMs: 1000 });
    assert.equal(result2.success, true);
    assert.equal(result2.remaining, 1);
  });

  it('rejects requests exceeding threshold', async () => {
    const key = `test-burst-${Date.now()}`;
    await rateLimit(key, { limit: 2, windowMs: 1000 });
    await rateLimit(key, { limit: 2, windowMs: 1000 });

    const blocked = await rateLimit(key, { limit: 2, windowMs: 1000 });
    assert.equal(blocked.success, false);
    assert.equal(blocked.remaining, 0);
    assert.ok(blocked.reset > 0);
  });
});
