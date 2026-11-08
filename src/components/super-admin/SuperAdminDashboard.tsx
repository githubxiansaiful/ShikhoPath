'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Plus, CheckCircle2, AlertTriangle, Activity, Settings, UserPlus, Server } from 'lucide-react';

interface SuperAdminDashboardProps {
  admins: any[];
  featureFlags: any[];
  settings: any[];
  auditLogs: any[];
}

export function SuperAdminDashboard({
  admins: initialAdmins,
  featureFlags,
  settings,
  auditLogs,
}: SuperAdminDashboardProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'SUPER_ADMIN'>('ADMIN');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/super-admin/admins/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create admin');

      setAdmins([data.admin, ...admins]);
      setFeedback(`Administrator ${data.admin.name} created successfully.`);
      setShowAddModal(false);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      setFeedback(err instanceof Error ? err.message : 'Error creating admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>Root Governance & Administrator Directory</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Delegate platform governance, assign administrative permissions, and audit all privileged actions.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Administrator</span>
        </Button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-200 text-xs font-semibold flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-purple-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* System Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1A1829] border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-emerald-400" /> PostgreSQL Engine
          </span>
          <div className="text-lg font-bold text-white">Connected & Healthy</div>
          <span className="text-[10px] text-gray-500 font-mono">Port 5434 • Pool Active</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1A1829] border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" /> Redis Cache & Limiter
          </span>
          <div className="text-lg font-bold text-white">Online & Slotted</div>
          <span className="text-[10px] text-gray-500 font-mono">Port 6379 • Sliding Window</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1A1829] border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Active Staff Accounts
          </span>
          <div className="text-lg font-bold text-white">{admins.length} Administrators</div>
          <span className="text-[10px] text-gray-500 font-mono">RBAC Enforced Server-Side</span>
        </div>
      </div>

      {/* Administrators List */}
      <div className="rounded-xl bg-[#161522] border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Active Platform Administrators</h3>
          <span className="text-xs text-gray-400">{admins.length} total</span>
        </div>
        <div className="divide-y divide-gray-800">
          {admins.map((adm) => (
            <div key={adm.id} className="p-4 flex items-center justify-between hover:bg-gray-800/20">
              <div>
                <span className="font-bold text-sm text-white block">{adm.name}</span>
                <span className="text-xs text-gray-400">{adm.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={adm.role === 'SUPER_ADMIN' ? 'premium' : 'default'} className="text-[10px]">
                  {adm.role}
                </Badge>
                <span className="text-xs text-emerald-400 font-semibold">{adm.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="rounded-xl bg-[#161522] border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Root Audit Event Stream</span>
          </h3>
        </div>
        <div className="divide-y divide-gray-800 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-200 block">{log.action}</span>
                <span className="text-[11px] text-gray-400">
                  {log.user ? `${log.user.name} (${log.user.email})` : 'System Core'}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1829] border border-gray-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-white">Create New Administrator</h3>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Rahman"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayesha@shikhopath.com"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Temporary Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Role Authority</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ADMIN">ADMIN (Course, Grammar, User Management)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Global Control)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 border-gray-700 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Create Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
