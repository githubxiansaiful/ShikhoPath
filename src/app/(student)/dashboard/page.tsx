import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { serialize } from '@/lib/utils';

export default async function DashboardPage() {
  const user = await requireAuth();

  // Load real user progress, enrollments, vocabulary stats, and recommendations
  const [
    enrollments,
    completedLessonsCount,
    userVocabCount,
    mistakesCount,
    recommendedCourses,
    grammarLessons,
    learningStreak,
    questionAttemptsTotal,
    questionAttemptsCorrect,
  ] = await Promise.all([
    prisma.courseEnrollment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: { category: true },
        },
      },
      take: 3,
    }),
    prisma.lessonProgress.count({
      where: { userId: user.id, status: 'COMPLETED' },
    }),
    prisma.userVocabulary.count({
      where: { userId: user.id },
    }),
    prisma.userMistake.count({
      where: { userId: user.id, isUnderstood: false },
    }),
    prisma.course.findMany({
      where: { isPublished: true },
      include: { category: true },
      take: 4,
    }),
    prisma.grammarLesson.findMany({
      take: 3,
      include: { topic: true },
    }),
    prisma.learningStreak.findUnique({
      where: { userId: user.id },
    }),
    prisma.questionAttempt.count({
      where: { userId: user.id },
    }),
    prisma.questionAttempt.count({
      where: { userId: user.id, isCorrect: true },
    }),
  ]);

  const grammarAccuracy =
    questionAttemptsTotal > 0
      ? Math.round((questionAttemptsCorrect / questionAttemptsTotal) * 100)
      : 0;

  return (
    <DashboardClient
      user={serialize(user)}
      stats={{
        completedLessons: completedLessonsCount,
        wordsLearned: userVocabCount,
        grammarAccuracy,
        pendingMistakes: mistakesCount,
        currentStreak: learningStreak?.currentStreak ?? 0,
      }}
      enrollments={serialize(enrollments)}
      recommendedCourses={serialize(recommendedCourses)}
      grammarLessons={serialize(grammarLessons)}
    />
  );
}
