'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

interface GrammarClientProps {
  categories: any[];
}

export function GrammarClient({ categories }: GrammarClientProps) {
  const allLessons = categories.flatMap((c) =>
    c.topics.flatMap((t: any) => t.lessons)
  );

  const [activeLesson, setActiveLesson] = useState<any>(
    allLessons[0] || {
      titleEn: 'Present Simple Tense',
      explanationEn: 'Used for general truths, routines, and permanent states.',
      structureEn: 'Affirmative: Subject + Verb(s/es) + Object\nNegative: Subject + do/does not + Verb + Object',
      examples: [],
      exercises: [],
    }
  );

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});

  const handleSelectOption = (quizId: string, option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [quizId]: option,
    });
  };

  const handleCheckAnswer = (quizId: string, correctAnswer: string) => {
    setCheckedAnswers({
      ...checkedAnswers,
      [quizId]: true,
    });
    if (selectedAnswers[quizId] === correctAnswer) {
      toast.success('Correct answer! Well done.');
    } else {
      toast.error('Incorrect. Review the rule and try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white">
            Grammar Academy
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Master English grammar rules with structured formulas, authentic usage examples, and interactive quizzes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Topics Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold text-[#0F172A] dark:text-white">
                Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="px-2 text-[10px] font-black text-[#5B4AE6] dark:text-indigo-400 uppercase tracking-wider block">
                    {cat.nameEn}
                  </span>
                  {cat.topics.map((topic: any) => (
                    <div key={topic.id} className="space-y-0.5">
                      {topic.lessons.map((lesson: any) => {
                        const isSelected = activeLesson.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold shadow-2xs'
                                : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white'
                            }`}
                          >
                            <span className="truncate">
                              {lesson.titleEn}
                            </span>
                            <Badge variant={lesson.isPremium ? 'premium' : 'outline'} className="text-[9px]">
                              {lesson.isPremium ? 'PRO' : 'FREE'}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (3 Cols): Lesson Content & Exercises */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Header Card */}
          <Card className="border-[#DDD8FA] dark:border-[#1F2937] shadow-xs">
            <CardHeader className="bg-gradient-to-r from-[#EDEBFD]/40 to-white dark:from-[#1E1B4B]/30 dark:to-[#111827] pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="text-[10px]">
                  Grammar Rule
                </Badge>
              </div>
              <CardTitle className="text-xl font-black text-[#0F172A] dark:text-white">
                {activeLesson.titleEn}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 space-y-6 text-base">
              {/* Explanation Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] space-y-2">
                <span className="text-sm font-bold text-[#5B4AE6] dark:text-indigo-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Conceptual Explanation
                </span>
                <p className="text-base text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                  {activeLesson.explanationEn}
                </p>
              </div>

              {/* Structural Formula */}
              {activeLesson.structureEn && (
                <div className="p-5 rounded-2xl bg-[#0F172A] dark:bg-[#0B0F19] border border-transparent dark:border-[#334155] text-white space-y-2 shadow-sm">
                  <span className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400 uppercase tracking-wider block">
                    Sentence Formula & Patterns
                  </span>
                  <pre className="text-sm sm:text-base font-mono text-indigo-200 dark:text-indigo-300 whitespace-pre-wrap leading-relaxed">
                    {activeLesson.structureEn}
                  </pre>
                </div>
              )}

              {/* Examples Grid */}
              {activeLesson.examples?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                    Practical Sentences & Usage
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLesson.examples.map((ex: any) => (
                      <div
                        key={ex.id}
                        className="p-3.5 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B]/60 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-[#5B4AE6] dark:text-indigo-400">
                            {ex.type}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">{ex.sentenceEn}</p>
                        {ex.sentenceBn && (
                          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">{ex.sentenceBn}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes */}
              {activeLesson.commonMistakesEn && (
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-2">
                  <span className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Common Pitfalls & Warnings
                  </span>
                  <p className="text-sm sm:text-base text-amber-900 dark:text-amber-200 whitespace-pre-wrap leading-relaxed">
                    {activeLesson.commonMistakesEn}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Exercises Card */}
          {activeLesson.exercises?.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
                  <Sparkles className="w-4 h-4 text-[#5B4AE6]" />
                  <span>Interactive Lesson Practice</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {activeLesson.exercises.map((quiz: any, index: number) => {
                  const options = Array.isArray(quiz.options)
                    ? quiz.options
                    : typeof quiz.options === 'string'
                    ? JSON.parse(quiz.options)
                    : [];

                  const isChecked = checkedAnswers[quiz.id];
                  const userChoice = selectedAnswers[quiz.id];
                  const isCorrect = userChoice === quiz.correctAnswer;

                  return (
                    <div
                      key={quiz.id}
                      className="p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B]/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#5B4AE6] dark:text-indigo-400">Question 0{index + 1}</span>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
                        {quiz.questionEn}
                      </p>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {options.map((opt: string) => {
                          const isSelected = userChoice === opt;
                          return (
                            <button
                              key={opt}
                              disabled={isChecked}
                              onClick={() => handleSelectOption(quiz.id, opt)}
                              className={`p-3 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#5B4AE6] bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold shadow-2xs'
                                  : 'border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#1E293B]/80'
                              } ${
                                isChecked && opt === quiz.correctAnswer
                                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                                  : ''
                              } ${
                                isChecked && isSelected && !isCorrect
                                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                                  : ''
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Actions & Feedback */}
                      {!isChecked ? (
                        <Button
                          size="sm"
                          disabled={!userChoice}
                          onClick={() => handleCheckAnswer(quiz.id, quiz.correctAnswer)}
                          className="mt-2 text-xs"
                        >
                          Check Answer
                        </Button>
                      ) : (
                        <div
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-1 ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-300'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Correct! Excellent job.</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                <span>
                                  Incorrect. The correct answer is: &quot;{quiz.correctAnswer}&quot;
                                </span>
                              </>
                            )}
                          </div>
                          {quiz.explanationEn && (
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                              {quiz.explanationEn}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
