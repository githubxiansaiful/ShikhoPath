import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HomeClient } from '@/components/home/HomeClient';
import prisma from '@/lib/db/prisma';

export default async function HomePage() {
  const user = await getCurrentUser();

  // Fetch summary stats for display
  const [coursesCount, grammarCount, vocabCount, mockTestsCount] = await Promise.all([
    prisma.course.count({ where: { isPublished: true } }),
    prisma.grammarLesson.count(),
    prisma.vocabulary.count(),
    prisma.mockTest.count({ where: { isPublished: true } }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
      <Navbar
        currentUser={
          user
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              }
            : null
        }
      />
      <main className="flex-1">
        <HomeClient
          isLoggedIn={!!user}
          stats={{
            courses: coursesCount || 12,
            grammarLessons: grammarCount || 48,
            vocabularyWords: vocabCount || 1500,
            mockTests: mockTestsCount || 10,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
