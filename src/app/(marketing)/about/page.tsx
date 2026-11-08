import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { GraduationCap, Award, Globe, Users } from 'lucide-react';

export default async function AboutPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] transition-colors">
      <Navbar
        currentUser={
          user
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              }
            : null
        }
      />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 space-y-8 w-full">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] dark:text-white">About ShikhoPath</h1>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-xl mx-auto">
            Democratizing English fluency and high-tier IELTS preparation for students, professionals, and lifelong learners.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
            <h2 className="text-xl font-bold text-[#5B4AE6] dark:text-indigo-400">Our Mission</h2>
            <p>
              Many learners struggle not because English is inherently difficult, but because conventional resources alienate students with dry rules and passive rote memorization.
            </p>
            <p>
              <strong>ShikhoPath</strong> was founded to bridge the cognitive gap with structured grammar formulas, smart spaced-repetition vocabulary with native audio phonetics, authentic Cambridge CBT mock tests, and responsive AI tutor sparring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937] text-center">
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155]">
                <Globe className="w-6 h-6 mx-auto text-[#5B4AE6] dark:text-indigo-400 mb-1" />
                <span className="font-bold block text-sm">Universal Pedagogy</span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Structured & Scientific</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155]">
                <Award className="w-6 h-6 mx-auto text-[#10B981] mb-1" />
                <span className="font-bold block text-sm">IELTS Excellence</span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Target Band 7.5+</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155]">
                <Users className="w-6 h-6 mx-auto text-[#4535C5] dark:text-indigo-300 mb-1" />
                <span className="font-bold block text-sm">Accessible to All</span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Beginner to Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
