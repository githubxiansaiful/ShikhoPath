import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminCoursesPage() {
  await requireAdmin();

  const courses = await prisma.course.findMany({
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Course Management</h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Curate structured English courses, learning levels, and lesson modules.
          </p>
        </div>

        <Link href="/courses">
          <Button size="sm" className="font-bold text-xs gap-1.5 cursor-pointer shadow-xs">
            <Plus className="w-4 h-4" />
            <span>New Course</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {courses.map((course) => {
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          return (
            <Card key={course.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-[10px]">
                    {course.category.nameEn}
                  </Badge>
                  <Badge variant={course.isPremium ? 'premium' : 'outline'} className="text-[10px]">
                    {course.isPremium ? 'PREMIUM' : 'FREE'}
                  </Badge>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">{course.titleEn}</h3>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <span>{totalLessons} Lessons</span>
                <span>{course.durationHours} Hours</span>
                <Link href="/courses">
                  <Button variant="outline" size="sm" className="text-xs font-bold">
                    Edit Modules
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
