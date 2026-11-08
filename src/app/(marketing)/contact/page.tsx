import React from 'react';
import { getCurrentUser } from '@/lib/auth/session';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default async function ContactPage() {
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-[#0F172A] dark:text-white">Contact ShikhoPath Support</h1>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8]">
            Have a question about courses, IELTS preparation, or institutional accounts? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-5 text-center space-y-2">
            <Mail className="w-6 h-6 mx-auto text-[#5B4AE6] dark:text-indigo-400" />
            <h3 className="font-bold text-sm">Email Support</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">support@shikhopath.com</p>
          </Card>
          <Card className="p-5 text-center space-y-2">
            <Phone className="w-6 h-6 mx-auto text-[#10B981]" />
            <h3 className="font-bold text-sm">Helpline</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">+880 1700 000000</p>
          </Card>
          <Card className="p-5 text-center space-y-2">
            <MapPin className="w-6 h-6 mx-auto text-[#4535C5] dark:text-indigo-300" />
            <h3 className="font-bold text-sm">Location</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Dhaka, Bangladesh</p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Send Us a Direct Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    className="w-full px-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry topic"
                  className="w-full px-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our educational team assist you?"
                  className="w-full px-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
                />
              </div>
              <Button type="submit" variant="primary" className="font-bold gap-2 cursor-pointer">
                <span>Submit Message</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
