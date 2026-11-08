import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { GrammarClient } from '@/components/grammar/GrammarClient';

export default async function GrammarPage() {
  await requireAuth();

  const categories = await prisma.grammarCategory.findMany({
    include: {
      topics: {
        include: {
          lessons: {
            include: {
              examples: true,
              exercises: true,
            },
          },
        },
      },
    },
    orderBy: { order: 'asc' },
  });

  return <GrammarClient categories={categories} />;
}
