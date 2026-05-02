'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminDashboardPage() {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      apiFetch('/api/competitions'),
      apiFetch('/api/registrations'),
    ])
      .then(([competitionData, registrationData]) => {
        setCompetitions(competitionData);
        setRegistrations(registrationData);
      })
      .catch(() => setError('Unable to load admin dashboard.'));
  }, []);

  return (
    <main className="container py-20">
      <div className="card p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[.35em] text-slate-500">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold">Operational oversight</h1>
          <p className="mt-3 text-slate-600">Manage competition setup and review team registrations from a single place.</p>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">Competitions</h2>
            {competitions.length === 0 ? (
              <p className="mt-4 text-slate-500">No competitions available.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {competitions.map((competition) => (
                  <li key={competition.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">{competition.name}</p>
                    <p className="text-sm text-slate-500">Status: {competition.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">Pending registrations</h2>
            {registrations.length === 0 ? (
              <p className="mt-4 text-slate-500">No pending registration requests.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {registrations.map((registration) => (
                  <li key={registration.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">{registration.teamName}</p>
                    <p className="text-sm text-slate-500">{registration.email} · {registration.country}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
