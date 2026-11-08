import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Award, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default async function AdminMockTestsPage() {
  await requireAdmin();

  const mockTests = await prisma.mockTest.findMany({
    include: {
      sections: true,
      attempts: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">IELTS Mock Examination Management</h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Full mock tests, test section configurations, timing rules, and student attempt history.
        </p>
      </div>

      <div className="space-y-3">
        {mockTests.map((t) => (
          <Card key={t.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-[10px]">
                  {t.testType}
                </Badge>
                <Badge variant={t.isPremium ? 'premium' : 'outline'} className="text-[10px]">
                  {t.isPremium ? 'PRO' : 'FREE'}
                </Badge>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">{t.titleEn}</h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Complete 4-module simulated test</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#64748B] dark:text-[#94A3B8] shrink-0">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#5B4AE6]" /> {t.durationMinutes} Mins
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-[#10B981]" /> {t.attempts.length} Submissions
              </span>
              <Link href="/mock-tests">
                <Button variant="outline" size="sm" className="text-xs font-bold">
                  Preview Test
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
