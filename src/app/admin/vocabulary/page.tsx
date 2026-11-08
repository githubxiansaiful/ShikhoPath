import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default async function AdminVocabularyPage() {
  await requireAdmin();

  const words = await prisma.vocabulary.findMany({
    include: { category: true },
    orderBy: { word: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Vocabulary Repository</h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Spaced repetition vocabulary database with phonetics, definitions, and contextual meanings.
        </p>
      </div>

      <Card className="shadow-xs overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#111827] border-b border-[#E2E8F0] dark:border-[#1F2937] text-[#64748B] dark:text-[#94A3B8] uppercase font-bold text-[10px]">
                <th className="p-4">Word</th>
                <th className="p-4">Phonetic</th>
                <th className="p-4">Part of Speech</th>
                <th className="p-4">Context Meaning</th>
                <th className="p-4">IELTS Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1F2937]">
              {words.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white">{w.word}</td>
                  <td className="p-4 font-mono text-[#5B4AE6] dark:text-indigo-400">{w.phonetic || '-'}</td>
                  <td className="p-4 text-[#64748B] dark:text-[#94A3B8]">{w.partOfSpeech || 'Word'}</td>
                  <td className="p-4 font-semibold text-[#0F172A] dark:text-white">{w.meaningBn || w.definitionEn}</td>
                  <td className="p-4">
                    {w.ieltsRelevance ? (
                      <Badge variant="premium" className="text-[9px]">
                        IELTS Core
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[9px]">
                        General
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
