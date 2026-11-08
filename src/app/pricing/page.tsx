import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PricingClient } from '@/components/pricing/PricingClient';
import { serialize } from '@/lib/utils';

export default async function PricingPage() {
  const user = await getCurrentUser();

  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    include: { features: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PricingClient
          plans={serialize(plans)}
          user={
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
      </main>
      <Footer />
    </div>
  );
}
