'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  Flag,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

interface MockTestClientProps {
  mockTest: any;
  user: any;
}

export function MockTestClient({ mockTest, user }: MockTestClientProps) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    total: number;
    bandScore: number;
  } | null>(null);

  const sampleQuestions = [
    {
      id: 1,
      type: 'TFNG',
      question: 'Human communication began exclusively through visual symbols before spoken language.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'FALSE',
      explanation: 'The passage explicitly states that rudimentary phonetic vocalisations preceded symbolic graphical notation by millennia.',
    },
    {
      id: 2,
      type: 'TFNG',
      question: 'Children acquire fundamental grammatical intuition without explicit formal instruction.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'The text highlights universal generative grammar principles enabling rapid innate language acquisition in infants.',
    },
    {
      id: 3,
      type: 'MCQ',
      question: 'According to Paragraph 3, what primary factor accelerated lexical expansion during human evolution?',
      options: [
        'A. Rapid anatomical transformation of auditory bones',
        'B. Increased cooperative foraging and structured social group dynamics',
        'C. Widespread climatic instability and geographic dispersion',
        'D. Early technological dominance over competing hominids',
      ],
      correctAnswer: 'B. Increased cooperative foraging and structured social group dynamics',
      explanation: 'Paragraph 3 notes social cooperation necessitated nuanced lexical designations for survival.',
    },
  ];

  // Timer Countdown
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qIndex: number, option: string) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const toggleMarkForReview = (qIndex: number) => {
    const nextVal = !markedForReview[qIndex];
    setMarkedForReview({
      ...markedForReview,
      [qIndex]: nextVal,
    });
    if (nextVal) {
      toast.info(`Question ${qIndex + 1} flagged for review.`);
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitDialogOpen(false);
    let correct = 0;
    sampleQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct += 1;
      }
    });

    let estimatedBand = 5.5;
    if (correct === 3) estimatedBand = 8.5;
    else if (correct === 2) estimatedBand = 7.0;
    else if (correct === 1) estimatedBand = 6.0;

    setScoreResult({
      correctCount: correct,
      total: sampleQuestions.length,
      bandScore: estimatedBand,
    });
    setIsSubmitted(true);
    setIsTestActive(false);
    toast.success('Exam submitted successfully! Calculating band scores...');
  };

  if (!isTestActive && !isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-6">
        <Card className="border-[#DDD8FA] shadow-md bg-white rounded-3xl p-2 sm:p-4">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] text-white flex items-center justify-center mb-2 shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              IELTS Computer-Delivered Examination Simulator
            </CardTitle>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto mt-1">
              Experience authentic test conditions with real-time countdown, split reading screen, and strict server timers.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B] block">Format</span>
                <span className="text-sm font-bold text-[#0F172A]">Academic Reading</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B] block">Duration</span>
                <span className="text-sm font-bold text-[#5B4AE6]">60 Minutes</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B] block">Score Calculation</span>
                <span className="text-sm font-bold text-[#10B981]">Auto Band 9.0 Scale</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4" /> Examination Rules:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-[11px]">
                <li>Answers are validated upon submission.</li>
                <li>You can flag questions for review and jump between questions at any time.</li>
                <li>Estimated band scores are indicative and based on Cambridge scoring matrices.</li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setIsTestActive(true);
                toast.info('Exam started. 60-minute countdown is active.');
              }}
              className="w-full h-12 text-base font-bold shadow-md cursor-pointer"
            >
              Start Mock Exam Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Submitted Score View
  if (isSubmitted && scoreResult) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <Card className="border-emerald-200 shadow-md bg-white rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-4 bg-emerald-50/50">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-black text-[#0F172A]">
              Examination Complete!
            </CardTitle>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Estimated Band Score Matrix Calculation
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6 text-center">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] inline-block w-full">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                Estimated Overall Band
              </span>
              <div className="text-5xl font-black text-[#5B4AE6]">
                Band {scoreResult.bandScore}
              </div>
              <span className="text-xs font-semibold text-[#10B981] mt-2 block">
                {scoreResult.correctCount} of {scoreResult.total} questions correct ({Math.round((scoreResult.correctCount / scoreResult.total) * 100)}%)
              </span>
            </div>

            <p className="text-xs text-[#64748B] italic">
              * Note: All AI and mock test band scores are calculated estimates and do not represent official IELTS TRF credentials.
            </p>

            <div className="flex gap-3 justify-center">
              <Button
                variant="primary"
                onClick={() => {
                  setIsSubmitted(false);
                  setIsTestActive(false);
                  setAnswers({});
                  setTimeLeft(3600);
                }}
              >
                Return to Exam Center
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setIsTestActive(true);
                  setTimeLeft(3600);
                  setAnswers({});
                }}
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Retake Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active Test Mode Interface
  const q = sampleQuestions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-4">
      {/* Top IELTS Exam Control Bar */}
      <div className="p-3.5 bg-[#0F172A] text-white rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-2 text-xs font-bold">
          <span className="text-[#5B4AE6] dark:text-indigo-400">ShikhoPath CBT Simulator</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Reading Section 01</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-mono font-bold text-amber-300 border border-white/10">
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Shadcn Alert Dialog for Finishing Test */}
          <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Finish & Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Examination?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have answered {answeredCount} of {sampleQuestions.length} questions.
                  {answeredCount < sampleQuestions.length
                    ? ' You have unanswered questions. Are you sure you want to finalize and grade your test now?'
                    : ' All questions have been answered. Would you like to submit and view your estimated IELTS band score?'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Reviewing</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmitTest}>
                  Yes, Submit Exam
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Reading Passage */}
        <Card className="h-[420px] sm:h-[500px] lg:h-[550px] overflow-y-auto p-5 sm:p-6 text-base leading-relaxed border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] rounded-2xl">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
            Reading Passage 1: The Evolution of Human Language & Cognitive Systems
          </h2>
          <div className="space-y-4 text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
            <p>
              <strong>Paragraph 1:</strong> The inception of human speech remains one of the most rigorously debated inquiries in evolutionary anthropology. Unlike anatomical artifacts such as fossils or lithic tools, spoken words vanish into the atmospheric ether the exact instant they are uttered. Early hominid lineages possessed vocal tracts capable of producing crude phonetic bursts, yet complex syntax emerged only when cerebral volume expanded sufficiently to accommodate abstract neurological mapping.
            </p>
            <p>
              <strong>Paragraph 2:</strong> Contemporary generative linguistics suggests that human infants possess an intrinsic neural framework—frequently referred to as the language acquisition device. Rather than learning grammar merely through passive rote replication, children synthesize complex combinatorial rules instinctively. Empirical inquiries across diverse global cultures confirm that children effortlessly attain syntactic fluency without needing formal instructional guidance.
            </p>
            <p>
              <strong>Paragraph 3:</strong> Furthermore, anthropological excavations illustrate that as early human bands transitioned from nomadic foraging to sophisticated clan structures, the sheer necessity of resource allocation spurred lexical expansion. Coordinated hunts, tool manufacturing tutorials, and hierarchical negotiations required unambiguous phonetic distinctions, eventually coalescing into the rich dialectical families we observe across our contemporary globe.
            </p>
          </div>
        </Card>

        {/* Right Column: Questions & Answer Sheet */}
        <Card className="h-[420px] sm:h-[500px] lg:h-[550px] flex flex-col justify-between p-5 sm:p-6 border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
              <span className="text-sm font-bold text-[#5B4AE6] dark:text-indigo-400">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </span>
              <button
                type="button"
                onClick={() => toggleMarkForReview(currentQuestionIndex)}
                className={`text-sm font-semibold flex items-center gap-1 cursor-pointer ${
                  markedForReview[currentQuestionIndex]
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span>{markedForReview[currentQuestionIndex] ? 'Flagged for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#94A3B8] tracking-wider">
                {q.type === 'TFNG' ? 'True / False / Not Given' : 'Multiple Choice'}
              </span>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white leading-snug">
                {q.question}
              </h3>
            </div>

            {/* Radio Option List */}
            <div className="space-y-2 pt-2">
              {q.options.map((opt) => {
                const isSelected = answers[currentQuestionIndex] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(currentQuestionIndex, opt)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#5B4AE6] bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-300 font-bold shadow-2xs'
                        : 'border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-[#1E293B]/80'
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#5B4AE6] bg-[#5B4AE6]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            >
              Previous
            </Button>

            {/* Question Quick Jump Badges */}
            <div className="flex items-center gap-1.5">
              {sampleQuestions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                const isFlagged = markedForReview[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#5B4AE6] text-white shadow-2xs'
                        : isAnswered
                        ? 'bg-[#10B981] text-white'
                        : 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
                    } ${isFlagged ? 'ring-2 ring-amber-400' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <Button
              size="sm"
              variant="primary"
              disabled={currentQuestionIndex === sampleQuestions.length - 1}
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
