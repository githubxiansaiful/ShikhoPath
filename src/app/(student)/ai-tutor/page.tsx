import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { AITutorClient } from '@/components/ai-tutor/AITutorClient';
import { serialize } from '@/lib/utils';

export default async function AITutorPage() {
  const user = await requireAuth();

  const conversations = await prisma.aIConversation.findMany({
    where: { userId: user.id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  return (
    <AITutorClient
      user={serialize(user)}
      initialConversations={serialize(conversations)}
    />
  );
}
