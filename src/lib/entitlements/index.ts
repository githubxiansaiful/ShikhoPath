import prisma from '@/lib/db/prisma';
import { UserStatus } from '@prisma/client';

export interface EntitlementCheckResult {
  allowed: boolean;
  reason?: string;
  isPremium: boolean;
  planCode?: string;
  currentUsage?: number;
  limit?: number | null;
}

export async function canAccessFeature(
  userId: string,
  featureKey: string
): Promise<EntitlementCheckResult> {
  // 1. Verify user exists and is active
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, status: true },
  });

  if (!user || user.status !== UserStatus.ACTIVE) {
    return {
      allowed: false,
      reason: 'User account is inactive or suspended',
      isPremium: false,
    };
  }

  // 2. Check for manual Administrative Overrides
  const override = await prisma.entitlementOverride.findUnique({
    where: {
      userId_featureKey: { userId, featureKey },
    },
  });

  if (override) {
    if (!override.expiresAt || override.expiresAt > new Date()) {
      if (override.isEnabled) {
        return {
          allowed: true,
          isPremium: true,
          reason: override.reason || 'Granted by Administrator override',
          limit: override.limitOverride,
        };
      } else {
        return {
          allowed: false,
          isPremium: false,
          reason: 'Access disabled by Administrator override',
        };
      }
    }
  }

  // 3. Check for Active Subscription
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      OR: [{ endDate: null }, { endDate: { gt: new Date() } }],
    },
    include: {
      plan: {
        include: {
          features: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const isPremiumUser =
    activeSubscription?.plan.code.startsWith('PREMIUM') ?? false;

  // Plan to inspect (either active subscription plan or default FREE plan)
  let plan = activeSubscription?.plan;
  if (!plan) {
    plan =
      (await prisma.subscriptionPlan.findUnique({
        where: { code: 'FREE' },
        include: { features: true },
      })) || undefined;
  }

  if (!plan) {
    return {
      allowed: false,
      reason: 'No subscription plan found',
      isPremium: false,
    };
  }

  // 4. Check if feature is configured in this plan
  const planFeature = plan.features.find((f) => f.featureKey === featureKey);

  if (!planFeature || !planFeature.isEnabled) {
    return {
      allowed: false,
      reason: isPremiumUser
        ? 'Feature not enabled in your current plan'
        : 'This feature requires a ShikhoPath Premium subscription',
      isPremium: isPremiumUser,
      planCode: plan.code,
    };
  }

  // 5. If feature has a usage quota limit, check usage in current period
  if (planFeature.limitValue !== null) {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const usage = await prisma.usageRecord.findUnique({
      where: {
        userId_featureKey_periodStart: {
          userId,
          featureKey,
          periodStart,
        },
      },
    });

    const currentUsage = usage?.currentUsage || 0;
    if (currentUsage >= planFeature.limitValue) {
      return {
        allowed: false,
        reason: `Monthly limit reached (${currentUsage}/${planFeature.limitValue}). Upgrade to Premium for unlimited access.`,
        isPremium: isPremiumUser,
        planCode: plan.code,
        currentUsage,
        limit: planFeature.limitValue,
      };
    }

    return {
      allowed: true,
      isPremium: isPremiumUser,
      planCode: plan.code,
      currentUsage,
      limit: planFeature.limitValue,
    };
  }

  // Unlimited access
  return {
    allowed: true,
    isPremium: isPremiumUser,
    planCode: plan.code,
    limit: null,
  };
}

export async function trackFeatureUsage(userId: string, featureKey: string, increment = 1) {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  return prisma.usageRecord.upsert({
    where: {
      userId_featureKey_periodStart: {
        userId,
        featureKey,
        periodStart,
      },
    },
    update: {
      currentUsage: { increment },
      periodEnd,
    },
    create: {
      userId,
      featureKey,
      periodStart,
      periodEnd,
      currentUsage: increment,
    },
  });
}
