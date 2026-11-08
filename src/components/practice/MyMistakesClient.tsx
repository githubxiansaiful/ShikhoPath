'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

interface MistakeItem {
  id: string;
  source: string;
  userAnswer: string;
  correctAnswer: string;
  explanationEn?: string;
  explanation?: string;
  count: number;
  isUnderstood: boolean;
  createdAt?: string | Date;
  lastOccurred?: string | Date;
}

interface MyMistakesClientProps {
  initialMistakes: MistakeItem[];
  user?: any;
}

export function MyMistakesClient({ initialMistakes, user }: MyMistakesClientProps) {
  const [mistakes, setMistakes] = useState<MistakeItem[]>(initialMistakes);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'UNDERSTOOD'>('ALL');

  const toggleUnderstood = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isUnderstood;
          if (next) {
            toast.success('Question marked as mastered!');
          }
          return { ...m, isUnderstood: next };
        }
        return m;
      })
    );
  };

  const filteredMistakes = mistakes.filter((m) => {
    if (filter === 'PENDING') return !m.isUnderstood;
    if (filter === 'UNDERSTOOD') return m.isUnderstood;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <span>Personal Mistake Notebook</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Questions you answer incorrectly during quizzes and practice are cataloged here for spaced-repetition mastery.
          </p>
        </div>

        {/* Filter buttons */}
        {mistakes.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-2xs">
            {(['ALL', 'PENDING', 'UNDERSTOOD'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === mode
                    ? 'bg-[#5B4AE6] text-white shadow-2xs'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                {mode === 'ALL' ? 'All Mistakes' : mode === 'PENDING' ? 'Needs Review' : 'Mastered'}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredMistakes.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center border-dashed border-2 border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] rounded-3xl">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-400 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-white">
                {mistakes.length === 0 ? 'No Mistakes Recorded' : 'No Items in this Filter'}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
                {mistakes.length === 0
                  ? 'Great job! Whenever you take a quiz, grammar test, or mock exam, any questions you miss will appear here automatically so you can review and achieve 100% accuracy.'
                  : 'You have cleared all items under this filter. Switch filters above to see other entries.'}
              </p>
            </div>
            {mistakes.length === 0 && (
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/grammar">
                  <Button variant="primary" size="sm" className="w-full sm:w-auto gap-1.5 cursor-pointer">
                    <span>Practice Grammar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href="/mock-tests">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto cursor-pointer">
                    Mock Tests
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((item) => (
            <Card key={item.id} className="hover:border-[#5B4AE6] transition-all bg-white dark:bg-[#111827] shadow-xs">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-[10px]">
                      {item.source}
                    </Badge>
                    {item.count > 1 && (
                      <Badge variant="error" className="text-[10px]">
                        Repeated {item.count}x
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={item.isUnderstood ? 'secondary' : 'outline'}
                    onClick={() => toggleUnderstood(item.id)}
                    className="text-xs gap-1 font-bold cursor-pointer"
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        item.isUnderstood ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.isUnderstood ? 'Mastered' : 'Mark as Understood'}</span>
                  </Button>
                </div>

                {/* Comparison Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                      ❌ Your Previous Answer:
                    </span>
                    <p className="font-mono text-rose-950 dark:text-rose-200">{item.userAnswer}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                      ✔ Correct Construction:
                    </span>
                    <p className="font-mono text-emerald-950 dark:text-emerald-200">{item.correctAnswer}</p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] space-y-2 text-xs sm:text-sm">
                  <span className="font-bold text-[#5B4AE6] dark:text-indigo-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Explanation & Rule:
                  </span>
                  <p className="text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                    {item.explanationEn || item.explanation || 'Review the core grammatical rule and vocabulary definition.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
