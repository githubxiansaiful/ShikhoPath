import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default async function AdminGrammarPage() {
  await requireAdmin();

  const lessons = await prisma.grammarLesson.findMany({
    include: {
      topic: { include: { category: true } },
      examples: true,
      exercises: true,
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Grammar Modules & Exercises</h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Core grammar rules, structural patterns, common mistake corrections, and interactive practice.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-[10px]">
                  {lesson.topic?.category?.nameEn || 'Grammar'}
                </Badge>
                <Badge variant={lesson.isPremium ? 'premium' : 'outline'} className="text-[10px]">
                  {lesson.isPremium ? 'PRO' : 'FREE'}
                </Badge>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">{lesson.titleEn}</h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-1">{lesson.explanationEn}</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#64748B] dark:text-[#94A3B8] shrink-0">
              <span>{lesson.examples.length} Examples</span>
              <span>{lesson.exercises.length} Quizzes</span>
              <Link href="/grammar">
                <Button variant="outline" size="sm" className="text-xs font-bold">
                  View Live
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
