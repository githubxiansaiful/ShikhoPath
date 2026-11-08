'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Award,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  Clock,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';

interface IELTSClientProps {
  modules: any[];
  mockTests: any[];
}

export function IELTSClient({ modules, mockTests }: IELTSClientProps) {
  const [selectedTrack, setSelectedTrack] = useState<'ACADEMIC' | 'GENERAL'>('ACADEMIC');

  const moduleCards = [
    {
      type: 'READING',
      title: 'Reading Module',
      desc: '3 authentic passages, 40 questions, 60 minutes. Matching headings, True/False/Not Given, sentence completion, and diagram labeling.',
      icon: BookOpen,
      duration: '60 Mins',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40',
    },
    {
      type: 'LISTENING',
      title: 'Listening Module',
      desc: '4 distinct audio sections, 40 questions, approx 30 minutes audio. Form filling, map labeling, and multiple-choice questions.',
      icon: Headphones,
      duration: '30 Mins',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40',
    },
    {
      type: 'WRITING',
      title: 'Writing Module',
      desc: 'Task 1 (Academic Graph/Letter, 150 words) + Task 2 (Discursive Essay, 250 words) with real-time AI band scoring and diagnostic feedback.',
      icon: PenTool,
      duration: '60 Mins',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40',
    },
    {
      type: 'SPEAKING',
      title: 'Speaking Module',
      desc: 'Part 1 (Personal Intro), Part 2 (Cue Card with 1-min preparation), and Part 3 (In-depth Discussion) with AI fluency scoring and pronunciation analysis.',
      icon: Mic,
      duration: '11-14 Mins',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white">
            IELTS Preparation Center
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Cambridge-standard practice questions, AI essay feedback, speaking cue cards, and authentic computer-delivered mock tests.
          </p>
        </div>

        {/* Track Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-2xs">
          <button
            onClick={() => setSelectedTrack('ACADEMIC')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTrack === 'ACADEMIC'
                ? 'bg-[#5B4AE6] text-white shadow-2xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            Academic
          </button>
          <button
            onClick={() => setSelectedTrack('GENERAL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTrack === 'GENERAL'
                ? 'bg-[#5B4AE6] text-white shadow-2xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            General Training
          </button>
        </div>
      </div>

      {/* 1. Full Mock Exam Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#2E2850] to-[#4338CA] text-white p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-200 border border-white/10">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Examination Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            ShikhoPath Cambridge Academic Mock Exam #01
          </h3>
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Authentic exam interface, live countdown timers, section jumping, and estimated Band score with detailed question reviews.
          </p>
        </div>
        <Link href="/mock-tests">
          <Button size="lg" className="bg-[#5B4AE6] hover:bg-[#4535C5] text-white font-extrabold gap-2 cursor-pointer shadow-md">
            <PlayCircle className="w-5 h-5" />
            <span>Launch Mock Exam</span>
          </Button>
        </Link>
      </div>

      {/* 2. Four Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {moduleCards.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.type} className="hover:border-[#5B4AE6] transition-all shadow-xs">
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${m.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {m.title}
                    </CardTitle>
                    <span className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> {m.duration}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {selectedTrack}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  {m.desc}
                </p>

                <div className="pt-3 flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Auto Scoring Ready
                  </span>
                  <Link href="/mock-tests">
                    <Button variant="secondary" size="sm" className="text-xs font-bold gap-1 cursor-pointer">
                      <span>Practice Section</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
