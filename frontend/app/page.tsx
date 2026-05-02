import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container py-20">
      <section className="grid gap-8">
        <div className="rounded-3xl border border-black/10 bg-black text-white p-12 shadow-xl">
          <p className="text-sm uppercase tracking-[.35em] text-white/70">FMAE-TMS</p>
          <h1 className="mt-6 text-5xl font-semibold">Team Management System</h1>
          <p className="mt-4 max-w-2xl leading-8 text-white/80">A production-grade competition operations platform with registration, approvals, task submissions, tracking, financial status, and leaderboard reporting.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">Apply as Team</Link>
            <Link href="/dashboard/team" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100">Team Dashboard</Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold">Admin Control</h2>
            <p className="mt-3 text-sm text-slate-600">Manage competitions, approve registrations, assign roles, and view leaderboard insights.</p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-semibold">Team Operations</h2>
            <p className="mt-3 text-sm text-slate-600">Submit tasks, review progress, and monitor payments in a clean dashboard experience.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
