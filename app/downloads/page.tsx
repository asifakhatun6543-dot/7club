'use client';

import { useEffect, useState } from 'react';

interface DownloadItem {
  id: string;
  title: string;
  quality: string;
  status: string;
  expiresAt: string;
}

const storedDownloads: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Neon Horizon',
    quality: '720p',
    status: 'Completed',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString()
  },
  {
    id: 'dl-2',
    title: 'Seoul Avenue',
    quality: '480p',
    status: 'Paused',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString()
  }
];

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [wifiOnly, setWifiOnly] = useState(true);

  useEffect(() => {
    setDownloads(storedDownloads);
  }, []);

  return (
    <main className="min-h-screen pb-20">
      <div className="monotone-container pt-6">
        <header className="mb-8">
          <p className="text-sky-300 uppercase tracking-[0.24em] text-sm">Downloads</p>
          <h1 className="text-4xl font-black">Download queue, storage, and offline management</h1>
        </header>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 mb-8">
          <div className="flex flex-wrap gap-6 md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Storage usage</h2>
              <p className="mt-2 text-slate-400">12.8 GB used of 32 GB reserved for downloads.</p>
            </div>
            <label className="inline-flex items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={wifiOnly} onChange={() => setWifiOnly(!wifiOnly)} />
              WiFi only downloads
            </label>
          </div>
        </div>

        <div className="space-y-5">
          {downloads.map((item) => (
            <article key={item.id} className="rounded-[24px] border border-white/10 bg-slate-950/80 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-slate-400">Quality: {item.quality} · Status: {item.status}</p>
                <p className="mt-2 text-slate-500 text-sm">Expires on {new Date(item.expiresAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="glow-button">Pause</button>
                <button className="glow-button">Resume</button>
                <button className="glow-button">Delete</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
