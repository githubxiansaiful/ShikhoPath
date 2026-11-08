import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { VocabularyClient } from '@/components/vocabulary/VocabularyClient';
import { serialize } from '@/lib/utils';

export default async function VocabularyPage() {
  const user = await requireAuth();

  const [words, categories, userVocab] = await Promise.all([
    prisma.vocabulary.findMany({
      include: { category: true },
      orderBy: { word: 'asc' },
    }),
    prisma.vocabularyCategory.findMany(),
    prisma.userVocabulary.findMany({
      where: { userId: user.id },
    }),
  ]);

  return (
    <VocabularyClient
      words={serialize(words)}
      categories={serialize(categories)}
      userVocab={serialize(userVocab)}
    />
  );
}
