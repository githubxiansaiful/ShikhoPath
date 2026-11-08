import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { SettingsClient } from '@/components/settings/SettingsClient';
import { serialize } from '@/lib/utils';

export default async function SettingsPage() {
  const user = await requireAuth();

  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <SettingsClient
      user={serialize(user)}
      subscription={serialize(subscription)}
    />
  );
}
