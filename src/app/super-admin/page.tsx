import React from 'react';
import { requireSuperAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { SuperAdminDashboard } from '@/components/super-admin/SuperAdminDashboard';
import { serialize } from '@/lib/utils';

export default async function SuperAdminPage() {
  await requireSuperAdmin();

  const [admins, featureFlags, settings, auditLogs] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN'] },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.featureFlag.findMany(),
    prisma.systemSetting.findMany(),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  return (
    <SuperAdminDashboard
      admins={serialize(admins)}
      featureFlags={serialize(featureFlags)}
      settings={serialize(settings)}
      auditLogs={serialize(auditLogs)}
    />
  );
}
