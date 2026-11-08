import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

const grantSchema = z.object({
  userId: z.string().uuid(),
  durationDays: z.number().min(1).max(365).default(30),
  reason: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const parsed = grantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { userId, durationDays, reason } = parsed.data;

    // Find Premium Plan
    const premiumPlan = await prisma.subscriptionPlan.findUnique({
      where: { code: 'PREMIUM_MONTHLY' },
    });

    if (!premiumPlan) {
      return NextResponse.json({ error: 'Premium plan not found' }, { status: 404 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Create or update subscription
    await prisma.$transaction(async (tx) => {
      await tx.subscription.create({
        data: {
          userId,
          planId: premiumPlan.id,
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: expiresAt,
        },
      });

      // Also set an entitlement override for safety
      await tx.entitlementOverride.upsert({
        where: { userId_featureKey: { userId, featureKey: 'all_courses' } },
        update: { isEnabled: true, expiresAt, reason: reason || 'Granted by Admin' },
        create: {
          userId,
          featureKey: 'all_courses',
          isEnabled: true,
          expiresAt,
          grantedByAdminId: admin.id,
          reason: reason || 'Manual grant from Admin Portal',
        },
      });

      // Log activity
      await tx.adminActivity.create({
        data: {
          adminId: admin.id,
          action: 'MANUAL_GRANT_PREMIUM',
          targetType: 'USER',
          targetId: userId,
          metadata: { durationDays, reason },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `Successfully granted Premium access for ${durationDays} days.`,
    });
  } catch (error) {
    console.error('Grant premium error:', error);
    return NextResponse.json({ error: 'Failed to grant Premium access' }, { status: 500 });
  }
}
