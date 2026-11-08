import React from 'react';
import { requireSuperAdmin } from '@/lib/auth/session';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme/ThemeToggle';

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const superAdmin = await requireSuperAdmin();

  return (
    <div className="min-h-screen bg-[#0F0E17] text-gray-100 flex flex-col transition-colors">
      {/* Super Admin Topbar */}
      <header className="h-16 border-b border-gray-800/80 bg-[#161522] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="font-black text-xs sm:text-sm tracking-tight text-white block truncate">
              ShikhoPath <span className="text-purple-400">Super Admin Core</span>
            </span>
            <span className="text-[10px] text-gray-400 -mt-0.5 hidden sm:block">
              Root Level Authority & Governance
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0 text-xs">
          <ThemeToggleButton />
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            SUPER ADMIN: {superAdmin.name}
          </span>
          <Link
            href="/admin"
            className="flex items-center gap-1 text-xs text-gray-300 hover:text-white px-2 py-1 rounded-lg border border-gray-800 hover:bg-gray-800/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Portal</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300"
          >
            Student App
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
