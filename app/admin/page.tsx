'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setMaintenance(data.maintenance ?? false);
        setStatus('ready');
      })
      .catch(() => setStatus('ready'));
  }, []);

  async function toggleMaintenance() {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maintenance: !maintenance })
    });
    setMaintenance((prev) => !prev);
  }

  async function saveBanner() {
    await fetch('/api/admin/banner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bannerUrl })
    });
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="monotone-container pt-6">
        <header className="mb-8">
          <p className="text-sky-300 uppercase tracking-[0.24em] text-sm">Admin Dashboard</p>
          <h1 className="text-4xl font-black">Streammore control center</h1>
        </header>

        {status === 'loading' ? (
          <p>Loading admin controls…</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold mb-4">System</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-300">Maintenance mode</p>
                    <p className="text-slate-500 text-sm">Enable to redirect users to a maintenance view.</p>
                  </div>
                  <button className="glow-button" onClick={toggleMaintenance}>{maintenance ? 'Disable' : 'Enable'}</button>
                </div>
                <div>
                  <p className="text-slate-300">Banner slider</p>
                  <input className="input-field mt-3" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="Banner image URL" />
                  <button className="glow-button mt-3" onClick={saveBanner}>Save banner</button>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold mb-4">Content Management</h2>
              <div className="space-y-4">
                <button className="glow-button">Add movie</button>
                <button className="glow-button">Add TV show</button>
                <button className="glow-button">Add short drama</button>
                <button className="glow-button">Bulk upload</button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
