'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggleButton } from '@/components/theme/ThemeToggle';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success('Password reset link sent to your email.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4535C5] to-[#5B4AE6] flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
            Shikho<span className="text-[#5B4AE6]">Path</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
          Reset your password
        </h2>
        <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">
          Enter your email address and we will send you a secure reset link
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-xs rounded-3xl p-2 sm:p-4">
          <CardContent className="pt-6">
            {submitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                  Password reset link sent!
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  We&apos;ve sent a password recovery link to <span className="font-bold text-[#0F172A] dark:text-white">{email}</span>. Check your inbox to proceed.
                </p>
                <div className="pt-2">
                  <Link href="/login">
                    <Button variant="secondary" className="w-full cursor-pointer font-bold">
                      Return to Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-[#E2E8F0] dark:border-slate-800 rounded-xl text-sm bg-white dark:bg-[#111827] text-[#0F172A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                    />
                  </div>
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full h-11 text-sm font-bold cursor-pointer shadow-xs">
                  Send Reset Link
                </Button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] dark:hover:text-indigo-400"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
