import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, BookOpen, CreditCard, Award, Activity } from 'lucide-react';
import Link from 'next/link';

export default async function AdminOverviewPage() {
  await requireAdmin();

  const [
    totalUsers,
    premiumUsers,
    totalCourses,
    totalGrammar,
    recentUsers,
    auditLogs,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({
      where: {
        status: 'ACTIVE',
        plan: { code: { startsWith: 'PREMIUM' } },
      },
    }),
    prisma.course.count(),
    prisma.grammarLesson.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        subscriptions: {
          include: { plan: true },
          take: 1,
        },
      },
    }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Administrative Dashboard</h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Platform health, live user counts, subscription statuses, and content metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Total Registered</span>
              <div className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white mt-1">{totalUsers}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Active Premium</span>
              <div className="text-xl sm:text-2xl font-black text-[#5B4AE6] dark:text-indigo-400 mt-1">{premiumUsers}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#EDEBFD] dark:bg-[#5B4AE6]/20 text-[#5B4AE6] dark:text-indigo-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Courses & Modules</span>
              <div className="text-xl sm:text-2xl font-black text-[#10B981] mt-1">{totalCourses}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#10B981] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Grammar Lessons</span>
              <div className="text-xl sm:text-2xl font-black text-amber-500 mt-1">{totalGrammar}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <Card className="shadow-xs">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-[#0F172A] dark:text-white">Recent Registered Learners</CardTitle>
            <Link href="/admin/users" className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#1F2937]">
              {recentUsers.map((u) => {
                const subPlan = u.subscriptions[0]?.plan?.code || 'FREE';
                return (
                  <div key={u.id} className="p-3.5 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-[#0F172A] dark:text-white">{u.name}</span>
                      <span className="block text-[11px] text-[#64748B] dark:text-[#94A3B8]">{u.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={subPlan.startsWith('PREMIUM') ? 'premium' : 'outline'} className="text-[9px]">
                        {subPlan}
                      </Badge>
                      <Badge variant="default" className="text-[9px]">
                        {u.role}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card className="shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
              <Activity className="w-4 h-4 text-[#5B4AE6]" />
              <span>Platform Audit Trail</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#1F2937]">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#0F172A] dark:text-white block">{log.action}</span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      {log.user?.email || 'System Operation'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
