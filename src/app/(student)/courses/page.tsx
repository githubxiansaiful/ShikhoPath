import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function CoursesPage() {
  await requireAuth();

  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      category: true,
      modules: {
        include: { lessons: true },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A] dark:text-white">
          English Learning Academy
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Explore structured curriculum from Beginner to Advanced IELTS Preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          return (
            <Card key={course.id} className="hover:border-[#5B4AE6] transition-all flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default" className="text-[10px]">
                    {course.category.nameEn}
                  </Badge>
                  <Badge variant={course.isPremium ? 'premium' : 'outline'} className="text-[10px]">
                    {course.isPremium ? 'PRO' : 'FREE'}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-snug">{course.titleEn}</CardTitle>
                <CardDescription className="text-xs sm:text-sm line-clamp-2 mt-1">
                  {course.descriptionEn}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5B4AE6]" /> {course.durationHours} Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#5B4AE6]" /> {totalLessons} Lessons
                  </span>
                </div>

                <Link href="/grammar">
                  <Button variant="primary" className="w-full text-xs font-bold gap-1.5 cursor-pointer">
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
