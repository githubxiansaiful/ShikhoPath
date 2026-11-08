import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { MyMistakesClient } from '@/components/practice/MyMistakesClient';
import { serialize } from '@/lib/utils';

export default async function MyMistakesPage() {
  const user = await requireAuth();

  const mistakes = await prisma.userMistake.findMany({
    where: { userId: user.id },
    orderBy: { lastOccurred: 'desc' },
  });

  return (
    <MyMistakesClient
      user={serialize(user)}
      initialMistakes={serialize(mistakes)}
    />
  );
}
