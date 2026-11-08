import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import prisma from '@/lib/db/prisma';
import { canAccessFeature } from '@/lib/entitlements';

describe('Entitlements & Commercial Quotas', () => {
  it('allows active student to access grammar features', async () => {
    const student = await prisma.user.findUnique({
      where: { email: 'student@shikhopath.com' },
    });
    assert.ok(student, 'Student user must exist');

    const result = await canAccessFeature(student.id, 'grammar_academy');
    assert.equal(result.allowed, true);
  });

  it('denies access to non-existent user', async () => {
    const result = await canAccessFeature('00000000-0000-0000-0000-000000000000', 'grammar_academy');
    assert.equal(result.allowed, false);
    assert.equal(result.reason, 'User account is inactive or suspended');
  });

  it('denies access to suspended user', async () => {
    // Temporarily set to suspended to test enforcement
    const student = await prisma.user.findUnique({
      where: { email: 'student@shikhopath.com' },
    });
    if (student) {
      await prisma.user.update({
        where: { id: student.id },
        data: { status: 'SUSPENDED' },
      });

      const blockedResult = await canAccessFeature(student.id, 'grammar_academy');
      assert.equal(blockedResult.allowed, false);
      assert.equal(blockedResult.reason, 'User account is inactive or suspended');

      // Revert back to active
      await prisma.user.update({
        where: { id: student.id },
        data: { status: 'ACTIVE' },
      });
    }
  });
});
