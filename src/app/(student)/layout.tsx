import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { StudentSidebar } from '@/components/dashboard/StudentSidebar';
import { StudentHeader } from '@/components/dashboard/StudentHeader';
import { serialize } from '@/lib/utils';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  const streak = await prisma.learningStreak.findUnique({
    where: { userId: user.id },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex transition-colors duration-200">
      {/* Sidebar for Desktop */}
      <StudentSidebar user={serialize(user)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <StudentHeader
          user={{
            id: user.id,
            name: user.name,
            role: user.role,
            streak: streak?.currentStreak ?? 0,
          }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
