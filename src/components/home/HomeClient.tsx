'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface HomeClientProps {
  isLoggedIn: boolean;
  stats: {
    courses: number;
    grammarLessons: number;
    vocabularyWords: number;
    mockTests: number;
  };
}

export function HomeClient({ isLoggedIn, stats }: HomeClientProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const levels = [
    {
      level: 'Absolute Beginner',
      target: 'Phonics, basic everyday vocabulary, simple sentence formation, and present simple patterns.',
    },
    {
      level: 'Elementary & Pre-Intermediate',
      target: 'Daily spoken conversations, self-introduction, forming questions, and past/continuous tenses.',
    },
    {
      level: 'Intermediate & Upper-Intermediate',
      target: 'Complex sentences, perfect tenses, formal professional correspondence, and fluid dialogue.',
    },
    {
      level: 'IELTS Academic & Professional',
      target: 'Band 7.5+ strategies, academic discursive essays, formal presentations, and Cambridge CBT exams.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDEBFD]/40 dark:from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEBFD] dark:bg-[#1E1B4B] border border-[#DDD8FA] dark:border-[#3730A3] text-[#5B4AE6] dark:text-indigo-300 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5B4AE6] dark:text-indigo-400" />
              <span>Next-Gen English Learning & IELTS Ecosystem</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] dark:text-white tracking-tight leading-[1.15]">
              Master English with Ease, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4535C5] via-[#5B4AE6] to-[#7C69EF]">
                Conquer IELTS
              </span>{' '}
              with Confidence
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-normal">
              From foundational concepts to Band 8.5+ fluency: structured grammar rules, smart spaced-repetition vocabulary with native audio phonetics, and authentic Cambridge-standard computer-delivered mock tests.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href={isLoggedIn ? '/dashboard' : '/register'} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 font-bold gap-2 cursor-pointer shadow-md">
                  <span>{isLoggedIn ? 'Go to Dashboard' : 'Start Learning Free'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/grammar" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 font-bold cursor-pointer">
                  Explore Grammar Academy
                </Button>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Free Starter Tier
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Native Audio Pronunciation
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Cambridge CBT Standard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] shadow-xs text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#5B4AE6] dark:text-indigo-400">{stats.courses}+</div>
            <div className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] mt-1.5">Structured Courses</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#4535C5] dark:text-indigo-300">{stats.grammarLessons}+</div>
            <div className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] mt-1.5">Grammar Lessons & Quizzes</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#5B4AE6] dark:text-indigo-400">{stats.vocabularyWords}+</div>
            <div className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] mt-1.5">Vocabulary Flashcards</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#10B981]">{stats.mockTests}+</div>
            <div className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] mt-1.5">IELTS Mock Exams</div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Pillars of ShikhoPath */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="default" className="text-xs font-bold uppercase tracking-wider">
            Comprehensive Platform
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Everything You Need for Complete English Mastery
          </h2>
          <p className="text-base text-[#64748B] dark:text-[#94A3B8] max-w-xl mx-auto">
            Designed with scientific pedagogy: structured lessons, spaced repetition, personal mistake tracking, and responsive AI guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Grammar Academy */}
          <Card className="hover:border-[#5B4AE6] transition-all group shadow-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Grammar Academy</CardTitle>
              <CardDescription>
                Clear rules, affirmative/negative structural formulas, common pitfalls, and immediate interactive exercises.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/grammar"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] inline-flex items-center gap-1"
              >
                <span>Browse Grammar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 2: Smart Vocabulary Builder */}
          <Card className="hover:border-[#5B4AE6] transition-all group shadow-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Vocabulary Builder</CardTitle>
              <CardDescription>
                Interactive flashcards, native audio speech phonetics, and academic word lists organized by CEFR levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/vocabulary"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] inline-flex items-center gap-1"
              >
                <span>Explore Vocabulary</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 3: IELTS Prep Center */}
          <Card className="hover:border-[#5B4AE6] transition-all group shadow-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">IELTS Prep Center</CardTitle>
              <CardDescription>
                Authentic passages, audio questions, writing essay reviews, and speaking cue-card training.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/ielts"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] inline-flex items-center gap-1"
              >
                <span>Start IELTS Prep</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 4: AI English Tutor */}
          <Card className="hover:border-[#5B4AE6] transition-all group shadow-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">AI Personal Tutor</CardTitle>
              <CardDescription>
                Round-the-clock sentence correction, conversational sparring, and instant band scoring estimates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/ai-tutor"
                className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] inline-flex items-center gap-1"
              >
                <span>Chat with AI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Interactive Level Pathway */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] p-6 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              Tailored Pathway for Every Learner
            </h3>
            <p className="text-base text-[#64748B] dark:text-[#94A3B8]">
              Select your current proficiency stage to discover your step-by-step milestone progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {levels.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLevel(idx)}
                className={`p-3.5 text-left rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  selectedLevel === idx
                    ? 'border-[#5B4AE6] bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 shadow-2xs'
                    : 'border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/80'
                }`}
              >
                <span className="block text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">
                  Level 0{idx + 1}
                </span>
                <span className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white mt-0.5 block">
                  {item.level}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 uppercase tracking-wider block">
                Target Learning Objectives
              </span>
              <p className="text-base font-semibold text-[#0F172A] dark:text-white">
                {levels[selectedLevel].target}
              </p>
            </div>
            <Link href="/courses">
              <Button variant="primary" size="md" className="shrink-0 font-bold gap-1.5 cursor-pointer shadow-xs">
                <span>Enroll in Level</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Pricing Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#2E2850] to-[#4338CA] text-white p-6 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#EDEBFD] border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Transparent Pricing Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              Start 100% Free or Unlock Full Power with Premium
            </h3>
            <p className="text-sm text-indigo-100/90 leading-relaxed font-normal">
              Foundational courses and vocabulary are available free forever. Upgrade to Premium for full Cambridge mock tests, unlimited AI tutor sessions, and automated IELTS band diagnostics.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Link href="/pricing" className="block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-6 bg-white text-[#0F172A] hover:bg-indigo-50 font-extrabold shadow-lg cursor-pointer">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
