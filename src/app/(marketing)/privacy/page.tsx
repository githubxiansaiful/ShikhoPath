import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

export default async function PrivacyPage() {
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
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 space-y-6 w-full">
        <div className="text-center space-y-2">
          <Shield className="w-10 h-10 mx-auto text-[#5B4AE6] dark:text-indigo-400" />
          <h1 className="text-3xl font-black text-[#0F172A] dark:text-white">Privacy Policy</h1>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Last Updated: November 2026</p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#5B4AE6] dark:text-indigo-400">1. Information We Collect</h2>
            <p>
              ShikhoPath collects only the information necessary to provide our educational services: your name, email address, password hash (encrypted with bcrypt), learning progress, quiz attempts, and user preferences.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-[#5B4AE6] dark:text-indigo-400">2. Data Security & Encryption</h2>
            <p>
              We practice privacy-by-design. All communication with our servers is encrypted in transit using industry-standard TLS/HTTPS. We never store plain text passwords, secret tokens, or sensitive payment details on our servers.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-[#5B4AE6] dark:text-indigo-400">3. Artificial Intelligence & Privacy</h2>
            <p>
              When you interact with our AI English Tutor, conversations are processed solely for educational evaluation. We do not transmit extraneous personal identification to third-party AI model providers.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-[#5B4AE6] dark:text-indigo-400">4. User Rights & Account Deletion</h2>
            <p>
              You have the right to review, export, or permanently delete your learning records and personal account at any time through your Account Settings or by contacting support@shikhopath.com.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
