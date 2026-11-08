'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Award,
  Sparkles,
  BrainCircuit,
  MessageSquare,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Settings,
  LogOut,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface StudentSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    subscriptions?: Array<{
      status: string;
      plan: {
        code: string;
        nameEn: string;
        nameBn: string;
      };
    }>;
  };
  onNavigate?: () => void;
}

export const studentNavSections = [
  {
    title: 'LEARNING',
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/courses', label: 'All Courses', icon: BookOpen },
      { href: '/grammar', label: 'Grammar Academy', icon: GraduationCap },
      { href: '/vocabulary', label: 'Vocabulary Builder', icon: BrainCircuit },
      { href: '/general-english', label: 'General English', icon: MessageSquare },
    ],
  },
  {
    title: 'IELTS PREP',
    links: [
      { href: '/ielts', label: 'IELTS Center', icon: Award },
      { href: '/mock-tests', label: 'IELTS Mock Tests', icon: CheckCircle2 },
      { href: '/ai-tutor', label: 'AI English Tutor', icon: Sparkles, badge: 'AI' },
    ],
  },
  {
    title: 'PRACTICE & TOOLS',
    links: [
      { href: '/practice', label: 'Daily Practice', icon: Zap },
      { href: '/my-mistakes', label: 'Mistake Notebook', icon: AlertTriangle },
      { href: '/study-plan', label: 'Study Planner', icon: Calendar },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function StudentSidebar({ user, onNavigate }: StudentSidebarProps) {
  const pathname = usePathname();

  const isPremium = user.subscriptions?.some(
    (s) => s.status === 'ACTIVE' && s.plan.code.startsWith('PREMIUM')
  );

  return (
    <aside className="w-64 border-r border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] flex-col shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen z-30 transition-colors">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-[#E2E8F0] dark:border-[#1F2937] flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-base text-[#0F172A] dark:text-white tracking-tight">
              Shikho<span className="text-[#5B4AE6]">Path</span>
            </span>
          </div>
        </Link>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            isPremium
              ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-2xs'
              : 'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]'
          }`}
        >
          {isPremium ? 'PRO' : 'FREE'}
        </span>
      </div>

      {/* Grouped Navigation List */}
      <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {studentNavSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold text-[#94A3B8] tracking-widest block uppercase">
              {section.title}
            </span>
            <div className="space-y-0.5 pt-0.5">
              {section.links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/dashboard' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold shadow-2xs'
                        : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#5B4AE6] dark:text-indigo-400'
                            : 'text-[#94A3B8] group-hover:text-[#475569] dark:group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-black bg-gradient-to-r from-[#5B4AE6] to-[#7C69EF] text-white rounded-full shadow-2xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Callout if Free Tier */}
      {!isPremium && (
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-[#EDEBFD]/80 to-purple-50/90 dark:from-[#1E1B4B]/60 dark:to-purple-950/40 border border-[#DDD8FA] dark:border-[#3730A3]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4535C5] dark:text-indigo-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#5B4AE6] dark:text-indigo-400" />
            <span>Unlock Premium Access</span>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-tight mb-2.5">
            Full Cambridge mock tests, unlimited AI evaluations, and full grammar rules.
          </p>
          <Link
            href="/pricing"
            className="flex items-center justify-center gap-1 w-full py-1.5 text-center text-xs font-bold bg-[#5B4AE6] text-white rounded-xl hover:bg-[#4535C5] shadow-xs transition-all"
          >
            <span>Upgrade to Pro</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#E2E8F0] dark:border-[#1F2937] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0B0F19]">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-2 ring-white dark:ring-gray-800">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="truncate min-w-0">
            <span className="block text-xs font-bold text-[#0F172A] dark:text-white truncate">
              {user.name}
            </span>
            <span className="block text-[10px] text-[#64748B] dark:text-[#94A3B8] truncate">
              {user.email}
            </span>
          </div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-white dark:hover:bg-[#1E293B] rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
