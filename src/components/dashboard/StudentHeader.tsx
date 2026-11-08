'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Globe,
  Shield,
  Menu,
  GraduationCap,
  Sparkles,
  LogOut,
  Settings,
  Calendar,
  AlertTriangle,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { studentNavSections } from './StudentSidebar';
import { ThemeSegmentedControl, ThemeToggleButton } from '@/components/theme/ThemeToggle';

interface StudentHeaderProps {
  user: {
    id: string;
    name: string;
    role: string;
    streak?: number;
  };
}

export function StudentHeader({ user }: StudentHeaderProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();
  const streakCount = user.streak ?? 0;

  // Determine current page title
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Overview';
    if (pathname.startsWith('/courses')) return 'All Courses';
    if (pathname.startsWith('/grammar')) return 'Grammar Academy';
    if (pathname.startsWith('/vocabulary')) return 'Vocabulary Builder';
    if (pathname.startsWith('/general-english')) return 'General English';
    if (pathname.startsWith('/ielts')) return 'IELTS Center';
    if (pathname.startsWith('/mock-tests')) return 'Mock Tests';
    if (pathname.startsWith('/ai-tutor')) return 'AI English Tutor';
    if (pathname.startsWith('/practice')) return 'Daily Practice';
    if (pathname.startsWith('/my-mistakes')) return 'Mistake Notebook';
    if (pathname.startsWith('/study-plan')) return 'Study Planner';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <header className="h-16 border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Left: Mobile Drawer Trigger + Breadcrumb */}
      <div className="flex items-center space-x-3">
        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="p-2 h-9 w-9 cursor-pointer"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5 text-[#0F172A] dark:text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-xs sm:max-w-sm p-4 flex flex-col justify-between">
              <div className="space-y-6 overflow-y-auto pr-1">
                <SheetHeader className="text-left pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <Link
                    href="/"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center space-x-2.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <SheetTitle className="text-base font-black">
                      Shikho<span className="text-[#5B4AE6]">Path</span>
                    </SheetTitle>
                  </Link>
                </SheetHeader>

                {/* Theme Selector inside Mobile Drawer */}
                <div className="px-1">
                  <ThemeSegmentedControl />
                </div>

                {/* Nav Links */}
                <div className="space-y-4">
                  {studentNavSections.map((section) => (
                    <div key={section.title} className="space-y-1">
                      <span className="px-2 text-[10px] font-black text-[#94A3B8] tracking-widest block uppercase">
                        {section.title}
                      </span>
                      <nav className="space-y-0.5">
                        {section.links.map((link) => {
                          const isActive =
                            pathname === link.href ||
                            (link.href !== '/dashboard' && pathname.startsWith(link.href));
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileDrawerOpen(false)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                isActive
                                  ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                                  : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4" />
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="px-1.5 py-0.2 text-[9px] font-black bg-[#5B4AE6] text-white rounded-full">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Sign Out */}
              <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-rose-600 bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-100/70 border border-rose-200/60 dark:border-rose-900/50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Breadcrumb Title */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-medium text-[#64748B] dark:text-[#94A3B8] hidden sm:inline">Student</span>
          <span className="text-[#CBD5E1] dark:text-[#334155] hidden sm:inline">/</span>
          <span className="font-extrabold text-[#0F172A] dark:text-white text-sm sm:text-base">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Streak Counter (Real count, defaults to 0 Days Streak) */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-extrabold shadow-2xs">
          <Flame className={`w-4 h-4 text-amber-500 fill-amber-500 ${streakCount > 0 ? 'animate-pulse' : 'opacity-70'}`} />
          <span>{streakCount} {streakCount === 1 ? 'Day' : 'Days'} Streak</span>
        </div>

        {/* Quick Theme Toggle Button */}
        <ThemeToggleButton />

        {/* Quick AI Tutor Button */}
        <Link
          href="/ai-tutor"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 hover:bg-[#DDD8FA] dark:hover:bg-[#2E2850] border border-[#DDD8FA] dark:border-[#3730A3] text-xs font-bold transition-all shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#5B4AE6] dark:text-indigo-400" />
          <span>Ask AI</span>
        </Link>

        {/* Staff Switcher if role is ADMIN or SUPER_ADMIN */}
        {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
          <Link
            href={user.role === 'SUPER_ADMIN' ? '/super-admin' : '/admin'}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-100 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}</span>
          </Link>
        )}

        {/* Explore Public Site */}
        <Link
          href="/"
          className="p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#334155] transition-all hidden sm:flex items-center gap-1 text-xs font-semibold"
          title="Visit Public Website"
        >
          <Globe className="w-4 h-4" />
        </Link>

        {/* Profile Dropdown with Theme Segmented Control (Screenshot_23.png) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-1.5 pl-2 pr-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#374151] transition-all cursor-pointer outline-hidden shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2.5">
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <div className="flex flex-col space-y-0.5">
                <p className="text-xs font-black leading-tight text-[#0F172A] dark:text-white">
                  {user.name}
                </p>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-medium capitalize">
                  {user.role.toLowerCase().replace('_', ' ')}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="w-4 h-4 text-[#5B4AE6]" />
                <span>Dashboard Overview</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/study-plan" className="flex items-center gap-2 cursor-pointer">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Study Planner</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-mistakes" className="flex items-center gap-2 cursor-pointer">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Mistake Notebook</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            
            {/* Theme Segmented Control matching Screenshot_23.png */}
            <DropdownMenuSeparator />
            <div className="py-1 px-1">
              <ThemeSegmentedControl />
            </div>

            <DropdownMenuSeparator />
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer text-left font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
