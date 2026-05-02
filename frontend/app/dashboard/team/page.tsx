'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface DashboardData {
  user: { id: string; name: string; email: string; competitionId?: string };
  competition: { id?: string; name?: string };
  progress: number;
  taskStatuses: Array<{ taskId: string; title: string; type: string; weight: number; status: string }>;
  payments: Array<{ id: string; amount: number; paid: boolean }>;
}

export default function TeamDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/dashboard/me')
      .then((data) => setDashboard(data))
      .catch(() => setError('Unable to load dashboard.'));
  }, []);

  return (
    <main className="container py-20">
      <div className="card p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[.35em] text-slate-500">Team dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold">Progress overview</h1>
          <p className="mt-3 text-slate-600">Monitor task completion, track events, and payment standing in one place.</p>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {!dashboard && !error && <p className="text-slate-600">Loading dashboard…</p>}

        {dashboard && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-slate-500">Competition</p>
                  <p className="mt-2 text-xl font-semibold">{dashboard.competition.name || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Completion</p>
                  <p className="mt-2 text-4xl font-semibold">{dashboard.progress}%</p>
                </div>
              </div>
            </div>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="mt-4 space-y-4">
                  {dashboard.taskStatuses.map((task) => (
                    <div key={task.taskId} className="rounded-3xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-slate-500">{task.type}</p>
                        </div>
                        <span className="text-sm text-slate-600">{task.status}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">Weight: {task.weight}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold">Payments</h2>
                <div className="mt-4 space-y-3">
                  {dashboard.payments.length === 0 && <p className="text-slate-500">No payment records found.</p>}
                  {dashboard.payments.map((payment) => (
                    <div key={payment.id} className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm">Amount: ${payment.amount.toFixed(2)}</p>
                      <p className="mt-1 text-sm text-slate-600">Status: {payment.paid ? 'Paid' : 'Pending'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
