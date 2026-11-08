import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { MockTestClient } from '@/components/ielts/MockTestClient';
import { serialize } from '@/lib/utils';

export default async function MockTestsPage() {
  const user = await requireAuth();

  const mockTest = await prisma.mockTest.findFirst({
    where: { isPublished: true },
    include: {
      sections: true,
    },
  });

  return (
    <MockTestClient
      mockTest={serialize(mockTest)}
      user={{ id: user.id, name: user.name, role: user.role }}
    />
  );
}
