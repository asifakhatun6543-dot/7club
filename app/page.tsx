'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ready' | 'maintenance'>('loading');

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        if (!res.ok || data.maintenance) {
          setStatus('maintenance');
          return;
        }
        const userRes = await fetch('/api/auth/me');
        const authData = await userRes.json();
        const destination = authData?.email ? '/home' : '/login';
        setStatus('ready');
        setTimeout(() => router.push(destination), 2800);
      } catch {
        setStatus('maintenance');
      }
    }
    check();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.14),_transparent_28%),_linear-gradient(180deg,_#03040b_0%,_#05070f_100%)]">
      <div className="text-center px-6 py-10 rounded-[32px] backdrop-blur-2xl border border-white/10 shadow-[0_0_120px_rgba(56,189,248,0.15)] max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 ring-1 ring-sky-400/20 mb-8 animate-pulse">
          <span className="text-4xl font-black tracking-[0.3em] text-slate-100">S</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-300 to-cyan-200">
          Streammore
        </h1>
        <p className="max-w-xl mx-auto mt-6 text-sm uppercase tracking-[0.24em] text-slate-400">Cinematic streaming, external URL player, clean immersive playback.</p>
        <div className="mt-10 text-sm text-slate-400">
          {status === 'loading' && 'Checking server status and authentication…'}
          {status === 'maintenance' && 'Streammore is currently in maintenance mode. Please try again later.'}
        </div>
      </div>
    </main>
  );
}
