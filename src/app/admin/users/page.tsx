import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { AdminUsersClient } from '@/components/admin/AdminUsersClient';
import { serialize } from '@/lib/utils';

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      profile: true,
      subscriptions: {
        include: { plan: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return <AdminUsersClient initialUsers={serialize(users)} />;
}
