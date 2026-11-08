import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Zap, BookOpen, BrainCircuit, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function PracticePage() {
  await requireAuth();

  const practiceModules = [
    {
      titleEn: 'Daily Grammar Blitz',
      descEn: '10 quick multiple-choice questions focusing on tenses, modal verbs, and common preposition traps.',
      icon: BookOpen,
      questions: 10,
      time: '5 mins',
      href: '/grammar',
      color: 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-400',
    },
    {
      titleEn: 'Speed Vocabulary Flash Drill',
      descEn: 'Rapid synonym and antonym recognition for high-yield IELTS academic and general words.',
      icon: BrainCircuit,
      questions: 15,
      time: '7 mins',
      href: '/vocabulary',
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    },
    {
      titleEn: 'Sentence Correction Challenge',
      descEn: 'Find and fix grammatical errors, agreement mistakes, and awkward phrasing in real sentences.',
      icon: Zap,
      questions: 8,
      time: '6 mins',
      href: '/ai-tutor',
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    },
    {
      titleEn: 'IELTS Speed Reading Drill',
      descEn: 'Skim a short academic passage and answer 5 True / False / Not Given questions under timed pressure.',
      icon: Award,
      questions: 5,
      time: '8 mins',
      href: '/mock-tests',
      color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
          <span>Daily Practice & Mini Drills</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Bite-sized active recall quizzes designed to build long-term English muscle memory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practiceModules.map((drill, idx) => {
          const Icon = drill.icon;
          return (
            <Card key={idx} className="hover:border-[#5B4AE6] transition-all">
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${drill.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">{drill.titleEn}</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {drill.time}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3 pt-1">
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  {drill.descEn}
                </p>

                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1F2937] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10B981]">
                    {drill.questions} Questions
                  </span>
                  <Link href={drill.href}>
                    <Button variant="primary" size="sm" className="text-xs font-bold gap-1 cursor-pointer">
                      <span>Start Drill</span>
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
