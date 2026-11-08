'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Globe, Shield, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#0B0F19] pt-12 pb-8 text-[#64748B] dark:text-[#94A3B8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
                Shikho<span className="text-[#5B4AE6]">Path</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm text-[#64748B] dark:text-[#94A3B8]">
              ShikhoPath is a comprehensive English learning platform and IELTS preparation ecosystem. Empowering learners from absolute zero to Band 8.5+ fluency.
            </p>
            <div className="flex items-center space-x-3 text-xs text-[#0F172A] dark:text-[#F8FAFC] font-semibold">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#5B4AE6] dark:text-indigo-400" /> English Medium
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" /> Bank-Grade Security
              </span>
            </div>
          </div>

          {/* Academic Paths */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172A] dark:text-white mb-3">
              Learning Academy
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/general-english" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  General English
                </Link>
              </li>
              <li>
                <Link href="/grammar" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Grammar Academy
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Vocabulary Builder
                </Link>
              </li>
              <li>
                <Link href="/ielts" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  IELTS Preparation
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  IELTS Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & Features */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172A] dark:text-white mb-3">
              Tools & AI
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/ai-tutor" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors flex items-center gap-1">
                  <span>AI Personal Tutor</span>
                  <Sparkles className="w-3 h-3 text-[#5B4AE6] dark:text-indigo-400" />
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Daily Practice
                </Link>
              </li>
              <li>
                <Link href="/study-plan" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Study Planner
                </Link>
              </li>
              <li>
                <Link href="/my-mistakes" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Mistake Notebook
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Pricing & Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172A] dark:text-white mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  About ShikhoPath
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#5B4AE6] dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] dark:border-[#1F2937] flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0 text-[#94A3B8]">
          <p>© {new Date().getFullYear()} ShikhoPath Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#64748B] dark:text-[#94A3B8]">
            Built with modern technology for English learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
