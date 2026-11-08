import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { IELTSClient } from '@/components/ielts/IELTSClient';

export default async function IELTSPage() {
  await requireAuth();

  const [modules, mockTests] = await Promise.all([
    prisma.iELTSModule.findMany({
      include: {
        practices: true,
      },
      orderBy: { order: 'asc' },
    }),
    prisma.mockTest.findMany({
      where: { isPublished: true },
    }),
  ]);

  return <IELTSClient modules={modules} mockTests={mockTests} />;
}
