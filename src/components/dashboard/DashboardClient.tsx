'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  Target,
  ArrowRight,
  PlayCircle,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardClientProps {
  user: any;
  stats: {
    completedLessons: number;
    wordsLearned: number;
    grammarAccuracy: number;
    pendingMistakes: number;
    currentStreak: number;
  };
  enrollments: any[];
  recommendedCourses: any[];
  grammarLessons: any[];
}

export function DashboardClient({
  user,
  stats,
  enrollments,
  recommendedCourses,
  grammarLessons,
}: DashboardClientProps) {
  // Fresh tasks for the day - all uncompleted by default so fresh account starts at 0%
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete Present Simple Exercise', completed: false, type: 'Grammar', time: '10m' },
    { id: '2', title: 'Review 5 Spaced Repetition Words', completed: false, type: 'Vocabulary', time: '5m' },
    { id: '3', title: 'IELTS Academic Reading Passage 1', completed: false, type: 'IELTS', time: '20m' },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          if (next) {
            toast.success(`Completed: "${t.title}"`);
          }
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const completedTaskCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTaskCount / tasks.length) * 100);

  const isIELTSUser =
    user.profile?.learningGoal?.toLowerCase().includes('ielts') ?? false;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Hero Learner Command Center */}
      <div className="rounded-3xl bg-gradient-to-br from-[#2E2850] via-[#3C3270] to-[#5B4AE6] text-white p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-80 h-80 bg-[#7C69EF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-12 w-60 h-60 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-indigo-200">
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>{user.profile?.learningGoal || 'Personalized English Learning'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Welcome back, {user.name}! 👋
            </h1>

            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-xl">
              {stats.currentStreak > 0 ? (
                <>
                  You are on a <span className="font-bold text-amber-300">{stats.currentStreak}-day learning streak</span>. 
                  Keep going to build unshakeable grammatical confidence and exam mastery.
                </>
              ) : (
                <>
                  Welcome to ShikhoPath! Complete your first lesson or practice drill today to begin your active study streak.
                </>
              )}
            </p>

            {/* Daily Goal Mini-Progress Bar */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex items-center justify-between text-xs text-indigo-200 font-semibold">
                <span>Daily Milestone Progress</span>
                <span>{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-[#2E2850] hover:bg-indigo-50 font-extrabold shadow-md gap-2"
              >
                <PlayCircle className="w-5 h-5 text-[#5B4AE6]" />
                <span>Browse Courses</span>
              </Button>
            </Link>
            <Link href="/ai-tutor" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold backdrop-blur-md gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Tutor Chat</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card className="hover:border-[#5B4AE6] transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                Study Streak
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white mt-1 flex items-baseline gap-1">
                {stats.currentStreak} <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-semibold">{stats.currentStreak === 1 ? 'Day' : 'Days'}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 mt-1">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                {stats.currentStreak > 0 ? 'Active Streak' : 'Start Today'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
          </CardContent>
        </Card>

        {/* Completed Lessons */}
        <Card className="hover:border-[#5B4AE6] transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                Lessons Finished
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white mt-1">
                {stats.completedLessons}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {stats.completedLessons > 0 ? `${stats.completedLessons} completed` : 'First step ready'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#EDEBFD] dark:bg-[#1E1B4B] border border-[#DDD8FA] dark:border-[#3730A3] text-[#5B4AE6] dark:text-indigo-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary */}
        <Card className="hover:border-[#5B4AE6] transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                Words Mastered
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white mt-1">
                {stats.wordsLearned}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mt-1">
                <BrainCircuit className="w-3 h-3 text-[#5B4AE6] dark:text-indigo-400" />
                {stats.wordsLearned > 0 ? `${stats.wordsLearned} saved` : 'Spaced flashcards'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Target IELTS Band or Accuracy */}
        <Card className="hover:border-[#5B4AE6] transition-all">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                {isIELTSUser ? 'Target IELTS Band' : 'Quiz Accuracy'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white mt-1">
                {isIELTSUser ? `Band 7.5+` : stats.grammarAccuracy > 0 ? `${stats.grammarAccuracy}%` : `0%`}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-400 mt-1">
                <Award className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                {stats.grammarAccuracy > 0 ? 'Verified Score' : 'Take first quiz'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Dashboard Workspace (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column (2 Cols): Tasks & Recommended Lessons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#5B4AE6]" />
                  <span>Today&apos;s Study Action Items</span>
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Complete these recommended milestones to sustain your study momentum
                </CardDescription>
              </div>
              <Link
                href="/study-plan"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] transition-colors"
              >
                Manage Plan
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-[#F8FAFC] dark:bg-[#1E293B]/60 border-[#E2E8F0] dark:border-[#334155] hover:border-[#5B4AE6] hover:bg-white dark:hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                        task.completed
                          ? 'bg-[#10B981] border-[#10B981] text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111827]'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span
                      className={`text-sm sm:text-base font-semibold truncate ${
                        task.completed
                          ? 'line-through text-[#94A3B8] dark:text-slate-500'
                          : 'text-[#0F172A] dark:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8]">
                      {task.time}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {task.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Grammar Modules */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#5B4AE6]" />
                  <span>Recommended Grammar Lessons</span>
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Curated core principles for your proficiency level
                </CardDescription>
              </div>
              <Link
                href="/grammar"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] transition-colors"
              >
                All Lessons
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {grammarLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] bg-[#F8FAFC] dark:bg-[#1E293B]/40 hover:bg-white dark:hover:bg-[#1E293B] hover:border-[#5B4AE6] hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-[#5B4AE6] dark:text-indigo-400 uppercase tracking-wider">
                        {lesson.topic?.titleEn || 'Grammar'}
                      </span>
                      <Badge variant={lesson.isPremium ? 'premium' : 'default'} className="text-[9px]">
                        {lesson.isPremium ? 'PRO' : 'FREE'}
                      </Badge>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white line-clamp-1">
                      {lesson.titleEn}
                    </h4>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0]/80 dark:border-[#334155]/60">
                    <Link
                      href="/grammar"
                      className="inline-flex items-center text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] transition-colors"
                    >
                      <span>Start Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Assistant Quick Launch & Mistake Notebook */}
        <div className="space-y-6">
          {/* AI Tutor Card */}
          <Card className="border-[#DDD8FA] dark:border-[#3730A3] bg-gradient-to-b from-[#EDEBFD]/50 to-white dark:from-[#1E1B4B]/30 dark:to-[#111827] shadow-xs">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center mb-1.5 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-[#0F172A] dark:text-white">
                AI Personal English Tutor
              </CardTitle>
              <CardDescription className="text-xs">
                Available 24/7 for instant sentence diagnosis, conversation practice, and IELTS writing band scoring.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                💡 <em>&quot;Explain the exact difference between Present Perfect and Past Simple.&quot;</em>
              </div>
              <Link href="/ai-tutor" className="block">
                <Button variant="primary" className="w-full text-xs font-bold gap-1.5">
                  <span>Start AI Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Mistake Notebook Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Mistake Notebook</span>
                </CardTitle>
                <Badge variant={stats.pendingMistakes > 0 ? 'warning' : 'outline'} className="text-[10px]">
                  {stats.pendingMistakes} Pending
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {stats.pendingMistakes > 0
                  ? 'Review and clear missed questions through spaced repetition practice.'
                  : 'Zero pending mistakes! All answered questions are mastered.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/my-mistakes" className="block">
                <Button variant="outline" className="w-full text-xs font-bold">
                  Open Mistake Notebook
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
