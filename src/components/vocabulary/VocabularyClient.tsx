'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Volume2,
  Search,
  Sparkles,
  RotateCw,
  ChevronRight,
  BrainCircuit,
} from 'lucide-react';
import { toast } from 'sonner';

interface VocabularyClientProps {
  words: any[];
  categories?: any[];
  userVocab?: any[];
}

export function VocabularyClient({ words }: VocabularyClientProps) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'IELTS' | 'BEGINNER'>('ALL');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Play Native Speech Audio Pronunciation via Web Speech API
  const handleSpeak = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Audio pronunciation not supported on your browser.');
    }
  };

  const filteredWords = words.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.definitionEn?.toLowerCase().includes(search.toLowerCase()) ||
      w.partOfSpeech?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'IELTS') return w.ieltsRelevance;
    if (selectedFilter === 'BEGINNER') return w.difficulty === 'BEGINNER';
    return true;
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const nextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % (filteredWords.length || 1));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#5B4AE6]" />
            <span>Smart Vocabulary Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Build unshakeable lexical resource with native phonetics, contextual examples, and spaced repetition.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-2xs">
          <Button
            size="sm"
            variant={selectedFilter === 'ALL' ? 'primary' : 'ghost'}
            onClick={() => setSelectedFilter('ALL')}
            className="text-xs cursor-pointer"
          >
            All Lexicon
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === 'IELTS' ? 'primary' : 'ghost'}
            onClick={() => setSelectedFilter('IELTS')}
            className="text-xs gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>IELTS High-Yield</span>
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === 'BEGINNER' ? 'primary' : 'ghost'}
            onClick={() => setSelectedFilter('BEGINNER')}
            className="text-xs cursor-pointer"
          >
            Foundations
          </Button>
        </div>
      </div>

      {/* 1. Interactive Flashcard Section */}
      {currentFlashcard && (
        <div className="max-w-xl mx-auto">
          <Card
            onClick={() => setIsFlipped(!isFlipped)}
            className="border-2 border-[#5B4AE6]/30 dark:border-[#5B4AE6]/40 shadow-md cursor-pointer hover:shadow-lg transition-all min-h-[260px] flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#111827] dark:to-[#0B0F19] rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <Badge variant="default" className="text-[10px]">
                {currentFlashcard.partOfSpeech || 'Word'}
              </Badge>
              <div className="flex items-center gap-2">
                {currentFlashcard.ieltsRelevance && (
                  <Badge variant="premium" className="text-[9px]">
                    IELTS Band 7+
                  </Badge>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentFlashcard.word);
                  }}
                  className="p-2 rounded-full bg-[#EDEBFD] dark:bg-[#1E1B4B] text-[#5B4AE6] dark:text-indigo-400 hover:bg-[#5B4AE6] hover:text-white transition-colors cursor-pointer shadow-2xs"
                  title="Listen to native audio pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center my-auto space-y-2 py-4">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentFlashcard.word}
              </h2>
              {currentFlashcard.phonetic && (
                <p className="text-xs sm:text-sm font-mono text-[#5B4AE6] dark:text-indigo-400 font-semibold">
                  {currentFlashcard.phonetic}
                </p>
              )}

              {isFlipped ? (
                <div className="pt-3 space-y-2 animate-in fade-in">
                  <p className="text-sm sm:text-base text-[#0F172A] dark:text-white max-w-md mx-auto font-medium">
                    {currentFlashcard.definitionEn}
                  </p>
                  {currentFlashcard.exampleEn && (
                    <p className="text-sm italic text-[#64748B] dark:text-[#94A3B8]">
                      &quot;{currentFlashcard.exampleEn}&quot;
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] pt-4 flex items-center justify-center gap-1 font-semibold">
                  <RotateCw className="w-3.5 h-3.5 text-[#5B4AE6] dark:text-indigo-400" />
                  <span>Click card to reveal definition & example sentence</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937] text-xs">
              <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8]">
                {flashcardIndex + 1} of {filteredWords.length}
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  nextFlashcard();
                }}
                className="text-xs font-bold gap-1 cursor-pointer"
              >
                <span>Next Word</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 2. Search & Word List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search words, definitions, or parts of speech..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6] shadow-2xs"
            />
          </div>
          <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-bold">
            {filteredWords.length} words found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => (
            <Card key={item.id} className="hover:border-[#5B4AE6] transition-all shadow-2xs">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0F172A] dark:text-white flex items-center gap-1.5">
                      <span>{item.word}</span>
                      <button
                        onClick={() => handleSpeak(item.word)}
                        className="text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5] cursor-pointer"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </h3>
                    {item.phonetic && (
                      <span className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">{item.phonetic}</span>
                    )}
                  </div>
                  <Badge variant="default" className="text-[9px]">
                    {item.partOfSpeech || 'Word'}
                  </Badge>
                </div>

                <p className="text-base text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                  {item.definitionEn}
                </p>

                {item.exampleEn && (
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] text-sm space-y-0.5">
                    <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      &quot;{item.exampleEn}&quot;
                    </p>
                  </div>
                )}

                {item.synonyms && item.synonyms.length > 0 && (
                  <div className="text-[10px] text-[#64748B] dark:text-[#94A3B8] truncate">
                    <span className="font-bold text-[#0F172A] dark:text-white">Synonyms:</span> {item.synonyms.join(', ')}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
