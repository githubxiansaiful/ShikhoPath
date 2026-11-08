import React from 'react';
import { requireAuth } from '@/lib/auth/session';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageSquare, BookOpen, PenTool, Mic, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function GeneralEnglishPage() {
  await requireAuth();

  const sections = [
    {
      titleEn: 'Everyday Dialogues & Scenarios',
      descEn: 'Master shopping, restaurant ordering, asking directions, doctor visits, and social gatherings.',
      icon: MessageSquare,
      color: 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-400',
      topics: ['At the Airport', 'Ordering at a Cafe', 'Asking Directions', 'Meeting New Friends'],
    },
    {
      titleEn: 'Speaking & Pronunciation Confidence',
      descEn: 'Accent clarity, common contractions, linking words, and smooth verbal fluency.',
      icon: Mic,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      topics: ['Phonetics & Word Stress', 'Connected Speech', 'Self-Introductions', 'Storytelling in English'],
    },
    {
      titleEn: 'Practical Reading & Comprehension',
      descEn: 'Short articles, real-world emails, news summaries, and contextual vocabulary acquisition.',
      icon: BookOpen,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 text-[#5B4AE6] dark:text-indigo-400',
      topics: ['Short Stories with Vocab', 'News Articles', 'Workplace Email Comprehension'],
    },
    {
      titleEn: 'Guided Sentence & Paragraph Writing',
      descEn: 'From simple affirmative sentences to coherent descriptive paragraphs with AI feedback.',
      icon: PenTool,
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
      topics: ['Daily Journaling Prompts', 'Describing a Person or Place', 'Personal Opinions'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A] dark:text-white">
          General & Everyday English
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Develop natural spoken fluency and practical communication skills for daily life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <Card key={idx} className="hover:border-[#5B4AE6] transition-all flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-snug">{sec.titleEn}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm leading-relaxed">
                  {sec.descEn}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Curriculum Modules:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {sec.topics.map((t) => (
                      <div
                        key={t}
                        className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] text-xs text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/ai-tutor">
                    <Button variant="primary" size="sm" className="w-full text-xs font-bold gap-1.5 cursor-pointer">
                      <span>Practice in AI Conversation</span>
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
