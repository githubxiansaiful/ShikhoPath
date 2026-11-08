'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Search, Sparkles, UserX, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AdminUsersClientProps {
  initialUsers: any[];
}

export function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [userToSuspend, setUserToSuspend] = useState<any | null>(null);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleGrantPremium = async (userId: string) => {
    setActionLoading(`grant-${userId}`);

    try {
      const res = await fetch('/api/admin/users/grant-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, durationDays: 30, reason: 'Manual Admin override' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to grant access');

      toast.success('Successfully granted 30-day Premium access!');
      setUsers(
        users.map((u) => {
          if (u.id === userId) {
            return {
              ...u,
              subscriptions: [{ status: 'ACTIVE', plan: { code: 'PREMIUM_MONTHLY', nameEn: 'Premium Pro' } }],
            };
          }
          return u;
        })
      );
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error granting access');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setActionLoading(`status-${userId}`);
    setUserToSuspend(null);
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    try {
      const res = await fetch('/api/admin/users/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      toast.success(`User status updated to ${nextStatus}.`);
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
      );
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error updating status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">User Management Directory</h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Browse accounts, audit learning profiles, suspend bad actors, and grant manual Premium entitlements.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card className="shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full pl-9 pr-3 py-1.5 border border-[#E2E8F0] dark:border-[#1F2937] rounded-xl text-xs bg-white dark:bg-[#111827] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mr-1">Role:</span>
            {['ALL', 'USER', 'ADMIN', 'SUPER_ADMIN'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  roleFilter === r
                    ? 'bg-[#5B4AE6] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#1F2937] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-xs overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#111827] border-b border-[#E2E8F0] dark:border-[#1F2937] text-[#64748B] dark:text-[#94A3B8] uppercase font-bold text-[10px]">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1F2937]">
              {filtered.map((u) => {
                const sub = u.subscriptions?.[0]?.plan?.code || 'FREE';
                const isPremium = sub.startsWith('PREMIUM');
                return (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="font-bold text-[#0F172A] dark:text-white">{u.name}</div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.role === 'SUPER_ADMIN' ? 'premium' : u.role === 'ADMIN' ? 'default' : 'outline'}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={isPremium ? 'premium' : 'outline'}>
                        {sub}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#64748B] dark:text-[#94A3B8]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {!isPremium && (
                        <Button
                          size="sm"
                          variant="secondary"
                          isLoading={actionLoading === `grant-${u.id}`}
                          onClick={() => handleGrantPremium(u.id)}
                          className="text-[11px] h-7 px-2 font-bold cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Grant 30D Pro
                        </Button>
                      )}

                      {u.role !== 'SUPER_ADMIN' && (
                        u.status === 'ACTIVE' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            isLoading={actionLoading === `status-${u.id}`}
                            onClick={() => setUserToSuspend(u)}
                            className="text-[11px] h-7 px-2 cursor-pointer text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <UserX className="w-3 h-3 mr-1" />
                            Suspend
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="success"
                            isLoading={actionLoading === `status-${u.id}`}
                            onClick={() => handleToggleStatus(u.id, u.status)}
                            className="text-[11px] h-7 px-2 cursor-pointer"
                          >
                            <UserCheck className="w-3 h-3 mr-1" />
                            Reactivate
                          </Button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Shadcn Alert Dialog for Suspend Confirmation */}
      <AlertDialog open={!!userToSuspend} onOpenChange={(open) => !open && setUserToSuspend(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend User Account?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend <span className="font-bold text-[#0F172A] dark:text-white">{userToSuspend?.name}</span> ({userToSuspend?.email})? They will immediately lose access to authenticated routes until reactivated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
              onClick={() => {
                if (userToSuspend) {
                  handleToggleStatus(userToSuspend.id, userToSuspend.status);
                }
              }}
            >
              Yes, Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
