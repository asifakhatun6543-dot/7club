'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  return (
    <main className="min-h-screen pb-20">
      <div className="monotone-container pt-6">
        <header className="mb-8">
          <p className="text-sky-300 uppercase tracking-[0.24em] text-sm">Profile</p>
          <h1 className="text-4xl font-black">Your Streammore account</h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold mb-4">User information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl">S</div>
                <div>
                  <p className="text-slate-300">StreammoreFan</p>
                  <p className="text-sm text-slate-500">admin@streammore.test</p>
                </div>
              </div>
              <button className="glow-button">Edit profile</button>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>
            <div className="space-y-3">
              <p className="text-slate-300">VIP Badge: <strong className="text-sky-300">Active</strong></p>
              <p className="text-slate-400">Plan: VIP Premium</p>
              <p className="text-slate-400">Validity: 2026-12-31</p>
              <button className="glow-button">Upgrade plan</button>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
          <h2 className="text-xl font-semibold mb-4">Activity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 p-4 bg-slate-900/70">
              <p className="text-slate-300">Watch history</p>
              <p className="mt-2 text-slate-400">Neon Horizon, Seoul Avenue, Mumbai Midnight</p>
            </div>
            <div className="rounded-2xl border border-white/5 p-4 bg-slate-900/70">
              <p className="text-slate-300">Liked videos</p>
              <p className="mt-2 text-slate-400">3 items saved</p>
            </div>
            <div className="rounded-2xl border border-white/5 p-4 bg-slate-900/70">
              <p className="text-slate-300">Comments</p>
              <p className="mt-2 text-slate-400">No comments yet</p>
            </div>
            <div className="rounded-2xl border border-white/5 p-4 bg-slate-900/70">
              <p className="text-slate-300">Downloads</p>
              <p className="mt-2 text-slate-400">2 items</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300">Language</label>
              <select className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Korean</option>
              </select>
            </div>
            <label className="inline-flex items-center gap-3 text-slate-300">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              Notifications enabled
            </label>
            <div className="flex flex-wrap gap-3">
              <button className="glow-button">Change password</button>
              <button
                className="glow-button"
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.assign('/login');
                }}
              >
                Logout
              </button>
            </div>
            <p className="text-sm text-slate-500">App version: 1.0.0</p>
          </div>
        </section>
      </div>
    </main>
  );
}
