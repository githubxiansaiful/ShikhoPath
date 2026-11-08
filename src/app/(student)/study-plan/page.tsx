import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { StudyPlanClient } from '@/components/study/StudyPlanClient';
import { serialize } from '@/lib/utils';

export default async function StudyPlanPage() {
  const user = await requireAuth();

  const studyPlan = await prisma.studyPlan.findFirst({
    where: { userId: user.id, isActive: true },
    include: { tasks: true },
  });

  return (
    <StudyPlanClient
      user={serialize(user)}
      initialPlan={serialize(studyPlan)}
    />
  );
}
