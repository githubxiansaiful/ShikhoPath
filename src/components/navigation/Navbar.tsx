'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Layers,
  Sparkles,
  Award,
  FileCheck2,
  Menu,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronDown,
  ArrowRight,
  ShieldAlert,
  Calendar,
  AlertTriangle,
  Compass,
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
import { ThemeSegmentedControl, ThemeToggleButton } from '@/components/theme/ThemeToggle';

interface NavbarProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isPracticeActive =
    pathname.startsWith('/grammar') ||
    pathname.startsWith('/vocabulary') ||
    pathname.startsWith('/general-english') ||
    pathname.startsWith('/my-mistakes');

  const isIeltsActive =
    pathname.startsWith('/ielts') || pathname.startsWith('/mock-tests');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-[#0F172A] dark:text-white">
              Shikho<span className="text-[#5B4AE6]">Path</span>
            </span>
            <span className="block text-[10px] font-bold text-[#94A3B8] -mt-1 tracking-wider uppercase">
              English & IELTS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Clean, Clutter-Free */}
        <nav className="hidden lg:flex items-center space-x-1.5">
          {/* 1. Courses */}
          <Link
            href="/courses"
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              pathname.startsWith('/courses')
                ? 'text-[#5B4AE6] dark:text-indigo-300 bg-[#EDEBFD] dark:bg-[#1E1B4B] font-bold'
                : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
            }`}
          >
            Courses
          </Link>

          {/* 2. Practice Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer outline-hidden ${
                  isPracticeActive
                    ? 'text-[#5B4AE6] dark:text-indigo-300 bg-[#EDEBFD] dark:bg-[#1E1B4B] font-bold'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                }`}
              >
                <span>Practice</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60 p-2 shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/grammar" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">Grammar Academy</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Rules, formulas & quizzes</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/vocabulary" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">Vocabulary Builder</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Audio phonetics & flashcards</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/general-english" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">General English</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Everyday spoken fluency</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/my-mistakes" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">Mistake Notebook</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Review unmastered questions</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 3. IELTS Hub Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer outline-hidden ${
                  isIeltsActive
                    ? 'text-[#5B4AE6] dark:text-indigo-300 bg-[#EDEBFD] dark:bg-[#1E1B4B] font-bold'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                }`}
              >
                <span>IELTS</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60 p-2 shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/ielts" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">IELTS Prep Hub</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">4-skill band strategies</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/mock-tests" className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A] dark:text-white">Mock Exams</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Cambridge CBT timed tests</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 4. AI Tutor */}
          <Link
            href="/ai-tutor"
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              pathname.startsWith('/ai-tutor')
                ? 'text-[#5B4AE6] dark:text-indigo-300 bg-[#EDEBFD] dark:bg-[#1E1B4B] font-bold'
                : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
            }`}
          >
            <span>AI Tutor</span>
            <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wide bg-gradient-to-r from-[#5B4AE6] to-[#7C69EF] text-white rounded-full shadow-2xs">
              AI
            </span>
          </Link>

          {/* 5. Pricing */}
          <Link
            href="/pricing"
            className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              pathname.startsWith('/pricing')
                ? 'text-[#5B4AE6] dark:text-indigo-300 bg-[#EDEBFD] dark:bg-[#1E1B4B] font-bold'
                : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Desktop Right Actions - Clean: Only Theme + User Name Card OR Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-3 shrink-0">
          {/* Quick Theme Toggle */}
          <ThemeToggleButton />

          {currentUser ? (
            /* User Name Card Dropdown - No Redundant Dashboard Button */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2.5 py-1.5 px-3 rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#374151] transition-all cursor-pointer outline-hidden shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2.5 shadow-xl">
                <DropdownMenuLabel className="font-normal px-2 py-1.5">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-xs font-black leading-tight text-[#0F172A] dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] leading-none text-[#64748B] dark:text-[#94A3B8] truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer font-semibold">
                    <LayoutDashboard className="w-4 h-4 text-[#5B4AE6]" />
                    <span>Student Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/study-plan" className="flex items-center gap-2 cursor-pointer font-semibold">
                    <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Study Planner</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-mistakes" className="flex items-center gap-2 cursor-pointer font-semibold">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Mistake Notebook</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer font-semibold">
                    <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>

                {(currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2 text-[#4535C5] dark:text-indigo-300 font-bold cursor-pointer">
                        <ShieldAlert className="w-4 h-4 text-[#5B4AE6]" />
                        <span>Admin Portal</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {currentUser.role === 'SUPER_ADMIN' && (
                  <DropdownMenuItem asChild>
                    <Link href="/super-admin" className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-black cursor-pointer">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Super Admin Portal</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                {/* Theme Switcher in Dropdown */}
                <DropdownMenuSeparator />
                <div className="py-1 px-1">
                  <ThemeSegmentedControl />
                </div>

                <DropdownMenuSeparator />
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer text-left font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-xs">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="font-bold text-xs gap-1.5 shadow-xs">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile & Tablet Drawer Trigger (Smooth animated shadcn Sheet) */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Quick theme toggle on mobile top header */}
          <ThemeToggleButton />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-xl text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#1F2937] focus:outline-hidden cursor-pointer shadow-2xs"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#0F172A] dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm flex flex-col justify-between p-6 overflow-y-auto">
              <div className="space-y-6">
                <SheetHeader className="text-left pb-4 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <SheetTitle className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-lg font-black tracking-tight text-[#0F172A] dark:text-white">
                        Shikho<span className="text-[#5B4AE6]">Path</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Theme Selector inside mobile drawer */}
                <div className="px-1">
                  <ThemeSegmentedControl />
                </div>

                {/* User quick status in mobile drawer */}
                {currentUser && (
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-black text-xs text-[#0F172A] dark:text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Categorized Mobile Navigation Links */}
                <div className="space-y-4">
                  <div>
                    <span className="px-3 text-[10px] font-black text-[#94A3B8] dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Learning Academy
                    </span>
                    <nav className="flex flex-col space-y-1">
                      <Link
                        href="/courses"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/courses')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-[#5B4AE6]" />
                        <span>Structured Courses</span>
                      </Link>
                      <Link
                        href="/grammar"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/grammar')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <Layers className="w-4 h-4 text-[#5B4AE6]" />
                        <span>Grammar Academy</span>
                      </Link>
                      <Link
                        href="/vocabulary"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/vocabulary')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-[#5B4AE6]" />
                        <span>Vocabulary Builder</span>
                      </Link>
                      <Link
                        href="/general-english"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/general-english')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 text-[#5B4AE6]" />
                        <span>General English</span>
                      </Link>
                    </nav>
                  </div>

                  <div>
                    <span className="px-3 text-[10px] font-black text-[#94A3B8] dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      IELTS & AI
                    </span>
                    <nav className="flex flex-col space-y-1">
                      <Link
                        href="/ielts"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/ielts')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>IELTS Preparation</span>
                      </Link>
                      <Link
                        href="/mock-tests"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/mock-tests')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <FileCheck2 className="w-4 h-4 text-purple-500" />
                        <span>Mock Examinations</span>
                      </Link>
                      <Link
                        href="/ai-tutor"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/ai-tutor')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-[#5B4AE6]" />
                          <span>AI Tutor</span>
                        </div>
                        <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#5B4AE6] text-white rounded-full">
                          AI
                        </span>
                      </Link>
                      <Link
                        href="/pricing"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          pathname.startsWith('/pricing')
                            ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                        }`}
                      >
                        <Compass className="w-4 h-4 text-[#10B981]" />
                        <span>Pricing Plans</span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Bottom Actions inside Drawer */}
              <div className="pt-6 border-t border-[#E2E8F0] dark:border-[#1F2937] space-y-2">
                {currentUser ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button variant="primary" className="w-full gap-2 font-bold cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Student Dashboard</span>
                      </Button>
                    </Link>

                    {currentUser.role === 'SUPER_ADMIN' && (
                      <Link
                        href="/super-admin"
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        <Button variant="secondary" className="w-full font-bold cursor-pointer">
                          Super Admin Portal
                        </Button>
                      </Link>
                    )}

                    <form action="/api/auth/logout" method="POST">
                      <Button variant="outline" className="w-full text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Sign Out</span>
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button variant="outline" className="w-full font-bold cursor-pointer">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button variant="primary" className="w-full font-bold cursor-pointer">
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
