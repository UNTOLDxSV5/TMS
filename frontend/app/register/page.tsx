'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

const steps = [
  { id: 'team', title: 'Team details' },
  { id: 'contact', title: 'Contact info' },
  { id: 'competition', title: 'Competition' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ teamName: '', email: '', phone: '', country: '', competitionId: '' });
  const [status, setStatus] = useState<string>('');

  const handleChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await apiFetch('/api/registrations', { method: 'POST', body: JSON.stringify(form) });
      setStatus('Registration submitted successfully.');
    } catch (error) {
      setStatus('Submission failed. Please try again.');
    }
  };

  return (
    <main className="container py-20">
      <div className="card p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[.3em] text-slate-500">Public registration</p>
          <h1 className="mt-3 text-4xl font-semibold">Register your team</h1>
          <p className="mt-3 text-slate-600">Complete the multi-step form to register for the selected competition.</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 text-sm text-slate-500">
          {steps.map((item, index) => (
            <div key={item.id} className={`rounded-2xl border p-4 ${index === step ? 'border-black bg-black text-white' : 'bg-slate-50'}`}>
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Team name</span>
                <input value={form.teamName} onChange={(e) => handleChange('teamName', e.target.value)} required className="w-full rounded-2xl border px-4 py-3" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Country</span>
                <input value={form.country} onChange={(e) => handleChange('country', e.target.value)} required className="w-full rounded-2xl border px-4 py-3" />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Email</span>
                <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required className="w-full rounded-2xl border px-4 py-3" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Phone</span>
                <input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required className="w-full rounded-2xl border px-4 py-3" />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6 sm:grid-cols-1">
              <label className="space-y-2">
                <span className="text-sm font-medium">Competition ID</span>
                <input value={form.competitionId} onChange={(e) => handleChange('competitionId', e.target.value)} required className="w-full rounded-2xl border px-4 py-3" placeholder="Competition UUID" />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border px-6 py-3 text-sm">Back</button>}
            {step < steps.length - 1 && <button type="button" onClick={() => setStep(step + 1)} className="rounded-full bg-black px-6 py-3 text-sm text-white">Next</button>}
            {step === steps.length - 1 && <button type="submit" className="rounded-full bg-black px-6 py-3 text-sm text-white">Submit registration</button>}
          </div>
        </form>

        {status && <p className="mt-6 text-sm text-slate-700">{status}</p>}
      </div>
    </main>
  );
}
