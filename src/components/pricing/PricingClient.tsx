'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PricingClientProps {
  plans: any[];
  user: any;
}

export function PricingClient({ plans, user }: PricingClientProps) {
  const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleUpgradeClick = (planCode: string) => {
    setSelectedPlanCode(planCode);
    setShowComingSoon(true);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="default" className="text-xs font-bold uppercase tracking-wider">
          Predictable & Transparent Pricing
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
          Invest in Your English & IELTS Fluency
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8]">
          Start free forever. Upgrade to Premium for unrestricted full mock exams, priority AI tutor evaluations, and the complete grammar curriculum.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => {
          const isFree = p.code === 'FREE';
          const isPopular = p.code === 'PREMIUM_MONTHLY';

          return (
            <Card
              key={p.id}
              className={`flex flex-col justify-between transition-all relative rounded-3xl ${
                isPopular
                  ? 'border-2 border-[#5B4AE6] shadow-lg shadow-indigo-500/10 scale-102 bg-white dark:bg-[#111827]'
                  : 'border-[#E2E8F0] dark:border-[#1F2937] shadow-xs bg-white dark:bg-[#111827]'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-black bg-[#5B4AE6] text-white tracking-wider uppercase shadow-xs">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-black text-[#0F172A] dark:text-white">
                    {p.nameEn}
                  </CardTitle>
                  <Badge variant={isFree ? 'default' : 'premium'}>
                    {isFree ? 'FREE' : 'PRO'}
                  </Badge>
                </div>
                <CardDescription className="min-h-[36px] mt-1">
                  {p.descriptionEn}
                </CardDescription>

                {/* Price Display */}
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0F172A] dark:text-white">
                    ৳{Number(p.priceAmount).toLocaleString()}
                  </span>
                  <span className="text-sm text-[#64748B] dark:text-[#94A3B8] font-bold">
                    /{p.billingInterval.toLowerCase()}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-2">
                <div className="space-y-3 border-t border-[#E2E8F0] dark:border-[#1F2937] pt-4">
                  <span className="text-xs font-black text-[#94A3B8] uppercase tracking-wider block">
                    What&apos;s Included:
                  </span>
                  {p.features?.map((f: any) => (
                    <div key={f.id} className="flex items-center gap-2.5 text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC]">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{f.featureNameEn}</span>
                      {f.limitValue && (
                        <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-medium">
                          (Max {f.limitValue})
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  {isFree ? (
                    <Link href={user ? '/dashboard' : '/register'} className="block">
                      <Button variant="outline" className="w-full font-bold cursor-pointer">
                        {user ? 'Current Plan' : 'Get Started Free'}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={isPopular ? 'primary' : 'secondary'}
                      onClick={() => handleUpgradeClick(p.code)}
                      className="w-full font-bold cursor-pointer"
                    >
                      Upgrade to Pro
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Shadcn Dialog for Checkout notice */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5B4AE6]" />
              <span>Payment Gateways Integration</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] pt-2">
              Automated checkout via bKash, Nagad, and Cards is scheduled for our upcoming release. In the interim, Administrators can grant direct Premium entitlement overrides instantly from the Admin Portal.
            </DialogDescription>
          </DialogHeader>
          <div className="p-3.5 rounded-2xl bg-[#EDEBFD] dark:bg-[#1E1B4B] text-xs sm:text-sm text-[#5B4AE6] dark:text-indigo-300 font-bold">
            Selected Plan: <span className="font-mono font-black">{selectedPlanCode}</span>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowComingSoon(false)}
            className="w-full font-bold text-xs cursor-pointer"
          >
            Understood
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
