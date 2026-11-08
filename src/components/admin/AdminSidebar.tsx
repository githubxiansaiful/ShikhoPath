'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  BrainCircuit,
  Award,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
    { href: '/admin/users', label: 'User Directory', icon: Users },
    { href: '/admin/courses', label: 'Course Management', icon: BookOpen },
    { href: '/admin/grammar', label: 'Grammar Modules', icon: GraduationCap },
    { href: '/admin/vocabulary', label: 'Vocabulary Library', icon: BrainCircuit },
    { href: '/admin/mock-tests', label: 'IELTS Mock Exams', icon: Award },
    { href: '/admin/subscriptions', label: 'Plans & Overrides', icon: CreditCard },
  ];

  return (
    <aside className="w-64 border-r border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] hidden md:flex flex-col shrink-0 min-h-screen sticky top-0 h-screen z-30 transition-colors">
      <div className="h-16 px-5 border-b border-[#E2E8F0] dark:border-[#1F2937] flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-black text-base text-[#0F172A] dark:text-white tracking-tight">
            Admin<span className="text-[#5B4AE6]">Center</span>
          </span>
        </Link>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#EDEBFD] dark:bg-[#5B4AE6]/20 text-[#5B4AE6] dark:text-indigo-400">
          STAFF
        </span>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span className="px-3 text-[10px] font-black text-[#94A3B8] dark:text-slate-400 tracking-widest block uppercase mb-2">
          ADMINISTRATION
        </span>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-[#EDEBFD] dark:bg-[#5B4AE6]/20 text-[#5B4AE6] dark:text-indigo-300 font-bold shadow-2xs'
                  : 'text-[#475569] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#5B4AE6] dark:text-indigo-400' : 'text-[#94A3B8] dark:text-slate-400'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {admin.role === 'SUPER_ADMIN' && (
          <div className="pt-4 mt-4 border-t border-[#E2E8F0] dark:border-[#1F2937]">
            <span className="px-3 text-[10px] font-black text-[#94A3B8] dark:text-slate-400 uppercase tracking-wider block mb-1">
              Elevated Controls
            </span>
            <Link
              href="/super-admin"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <span>Super Admin Portal</span>
            </Link>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-[#F8FAFC] dark:bg-[#111827]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Student App</span>
        </Link>
      </div>
    </aside>
  );
}
