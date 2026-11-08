import React from 'react';
import { requireAdmin } from '@/lib/auth/session';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] flex transition-colors">
      <AdminSidebar
        admin={{
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          admin={{
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
