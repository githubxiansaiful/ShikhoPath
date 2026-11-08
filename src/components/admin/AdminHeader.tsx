'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ShieldAlert,
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  BrainCircuit,
  Award,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/Badge';
import { ThemeToggleButton, ThemeSegmentedControl } from '@/components/theme/ThemeToggle';

interface AdminHeaderProps {
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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
    <header className="h-16 border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      <div className="flex items-center space-x-3">
        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-xl text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#1F2937] focus:outline-hidden cursor-pointer"
                aria-label="Open Admin Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-xs p-5 flex flex-col justify-between overflow-y-auto bg-white dark:bg-[#111827] border-r border-[#E2E8F0] dark:border-[#1F2937]">
              <div className="space-y-5">
                <SheetHeader className="text-left pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-base font-black text-[#0F172A] dark:text-white">
                      Admin<span className="text-[#5B4AE6]">Center</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
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
                    <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                      <Link
                        href="/super-admin"
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                        <span>Super Admin Portal</span>
                      </Link>
                    </div>
                  )}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937] space-y-3">
                <div>
                  <span className="text-[10px] font-black text-[#94A3B8] dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Theme Mode
                  </span>
                  <ThemeSegmentedControl className="w-full justify-between" />
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] px-2 py-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit to Student App</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
            Administrative Portal
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDEBFD] dark:bg-[#5B4AE6]/20 text-[#5B4AE6] dark:text-indigo-400">
            {admin.role}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 text-xs">
        <ThemeToggleButton />

        <Link
          href="/dashboard"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] dark:hover:text-indigo-400 px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Student App</span>
        </Link>
        <span className="font-bold text-[#0F172A] dark:text-white hidden xs:inline">{admin.name}</span>
      </div>
    </header>
  );
}
