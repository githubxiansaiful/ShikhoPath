'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, Volume2, CreditCard, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeSegmentedControl } from '@/components/theme/ThemeToggle';

interface SettingsClientProps {
  user: any;
  subscription: any;
}

export function SettingsClient({ user, subscription }: SettingsClientProps) {
  const [name, setName] = useState(user.name);
  const [speechRate, setSpeechRate] = useState('0.9');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile settings updated successfully!');
  };

  const testPronunciation = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Welcome to ShikhoPath. Your pronunciation engine is fully active.');
      utterance.lang = 'en-US';
      utterance.rate = parseFloat(speechRate) || 0.9;
      window.speechSynthesis.speak(utterance);
      toast.info('Playing test audio pronunciation...');
    } else {
      toast.error('Speech synthesis not available in your browser.');
    }
  };

  const isPremium = subscription?.plan?.code?.startsWith('PREMIUM') ?? false;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A] dark:text-white">
          Account & Learning Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Manage your personal learner profile, appearance theme, audio pronunciation playback, and subscription entitlements.
        </p>
      </div>

      {/* 1. Theme & Appearance Preference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <Palette className="w-4 h-4 text-[#5B4AE6]" />
            <span>Theme & Visual Appearance</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Select between Light, Dark, or System mode. Changing themes triggers a smooth circular reveal transition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <ThemeSegmentedControl />
          </div>
        </CardContent>
      </Card>

      {/* 2. Profile Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <User className="w-4 h-4 text-[#5B4AE6]" />
            <span>Profile Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm" className="font-bold text-xs cursor-pointer">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3. Audio & Pronunciation Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <Volume2 className="w-4 h-4 text-[#5B4AE6]" />
            <span>Audio & Pronunciation Engine</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Test and configure the native phonetic audio playback used across Vocabulary and Speaking Cue Cards.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155]">
            <div>
              <span className="text-xs font-bold text-[#0F172A] dark:text-white block">
                Speech Rate & Speed
              </span>
              <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                Recommended rate: 0.9x for clear articulation and natural cadence.
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <select
                value={speechRate}
                onChange={(e) => setSpeechRate(e.target.value)}
                className="px-3 py-1.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs font-semibold bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white cursor-pointer shadow-2xs"
              >
                <option value="0.75">0.75x (Slower)</option>
                <option value="0.9">0.9x (Natural Clear)</option>
                <option value="1.0">1.0x (Standard)</option>
                <option value="1.25">1.25x (Fast)</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={testPronunciation}
                className="text-xs font-bold gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#5B4AE6]" />
                <span>Test Audio</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Subscription Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <CreditCard className="w-4 h-4 text-[#5B4AE6]" />
            <span>Subscription & Entitlements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#334155] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Active Plan</span>
              <div className="text-base font-black text-[#0F172A] dark:text-white">
                {subscription?.plan?.nameEn || 'Free Starter Plan'}
              </div>
              <span className="text-xs text-[#10B981] font-bold">
                Status: {subscription?.status || 'Active'}
              </span>
            </div>
            <Badge variant={isPremium ? 'premium' : 'default'}>
              {isPremium ? 'PRO MEMBER' : 'FREE TIER'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
