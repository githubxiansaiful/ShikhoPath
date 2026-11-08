'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggleButton } from '@/components/theme/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      toast.success('Signed in successfully!');
      router.push(data.redirectUrl || '/dashboard');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
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
          Welcome back to ShikhoPath
        </h2>
        <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-bold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5]">
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-xs rounded-3xl p-2 sm:p-4">
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] dark:text-white mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="block w-full pl-10 pr-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-white">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#5B4AE6] dark:text-indigo-400 hover:text-[#4535C5]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                  />
                </div>
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full h-11 text-sm font-bold cursor-pointer shadow-xs">
                Sign In
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
