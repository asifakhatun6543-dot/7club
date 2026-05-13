'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(result.message || 'Unable to sign in');
      return;
    }
    router.push('/home');
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#02030a]">
      <section className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-slate-900/40">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Welcome back</p>
          <h1 className="mt-4 text-4xl font-black">Login to Streammore</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              className="input-field mt-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              className="input-field mt-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button className="glow-button w-full text-center" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>
        <div className="mt-6 text-sm text-slate-400">
          New to Streammore? <a className="text-sky-300" href="/signup">Create your account</a>
        </div>
      </section>
    </main>
  );
}
