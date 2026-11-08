import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default async function AdminSubscriptionsPage() {
  await requireAdmin();

  const [plans, overrides] = await Promise.all([
    prisma.subscriptionPlan.findMany({
      include: {
        features: true,
        subscriptions: { where: { status: 'ACTIVE' } },
      },
      orderBy: { order: 'asc' },
    }),
    prisma.entitlementOverride.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Subscription Plans & Entitlement Overrides</h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Monitor active subscriber cohorts, feature quota limits, and administrator manual grants.
        </p>
      </div>

      {/* Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <Card key={p.id} className="p-5 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={p.code.startsWith('PREMIUM') ? 'premium' : 'default'}>
                  {p.code}
                </Badge>
                <span className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400">
                  {p.subscriptions.length} Subscribers
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#0F172A] dark:text-white">{p.nameEn}</h3>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8] block">{p.descriptionEn}</span>
              </div>

              <div className="text-2xl font-black text-[#0F172A] dark:text-white">
                ৳{Number(p.priceAmount).toLocaleString()}{' '}
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">/{p.billingInterval.toLowerCase()}</span>
              </div>

              <div className="border-t border-[#E2E8F0] dark:border-[#1F2937] pt-3 space-y-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <span className="font-bold text-[10px] uppercase text-[#0F172A] dark:text-white block">Configured Entitlements:</span>
                {p.features.map((f) => (
                  <div key={f.id} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="truncate">{f.featureNameEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Manual Entitlement Overrides */}
      <Card className="shadow-xs overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <Sparkles className="w-4 h-4 text-[#5B4AE6]" />
            <span>Active Administrator Entitlement Overrides</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#111827] border-b border-[#E2E8F0] dark:border-[#1F2937] text-[#64748B] dark:text-[#94A3B8] uppercase font-bold text-[10px]">
                <th className="p-4">User</th>
                <th className="p-4">Feature Key</th>
                <th className="p-4">Status</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Expiration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1F2937]">
              {overrides.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-[#64748B] dark:text-[#94A3B8]">
                    No manual overrides active yet. Grant via User Management Directory.
                  </td>
                </tr>
              ) : (
                overrides.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-[#0F172A] dark:text-white">{o.user.name} ({o.user.email})</td>
                    <td className="p-4 font-mono text-[#5B4AE6] dark:text-indigo-400">{o.featureKey}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                        {o.isEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-4 text-[#64748B] dark:text-[#94A3B8]">{o.reason || '-'}</td>
                    <td className="p-4 text-[#64748B] dark:text-[#94A3B8]">
                      {o.expiresAt ? new Date(o.expiresAt).toLocaleDateString() : 'Permanent'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
