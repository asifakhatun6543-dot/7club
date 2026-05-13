'use client';

import { useEffect, useMemo, useState } from 'react';
import StreamPlayer from '../../../components/StreamPlayer';
import NavBar from '../../../components/NavBar';

interface WatchContent {
  title: string;
  description: string;
  poster: string;
  externalUrl: string;
  slug: string;
  isVip: boolean;
  categories: string[];
  year: number;
  qualityUrls: Record<string, string>;
  subtitles: Array<{ label: string; src: string; srclang: string }>;
}

const recommendations = [
  {
    id: 'neon-horizon',
    title: 'Neon Horizon',
    poster: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    slug: 'neon-horizon'
  },
  {
    id: 'seoul-avenue',
    title: 'Seoul Avenue',
    poster: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    slug: 'seoul-avenue'
  }
];

export default function WatchPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState<WatchContent | null>(null);

  useEffect(() => {
    fetch(`/api/content/watch/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContent(data.item))
      .catch(() => setContent(null));
  }, [params.id]);

  const watchSources = useMemo(() => content?.qualityUrls || {}, [content]);

  return (
    <main className="min-h-screen bg-[#05070f] pb-20">
      <NavBar />
      <div className="monotone-container pt-6">
        {content ? (
          <div className="grid gap-8 lg:grid-cols-[2.1fr_1fr]">
            <div>
              <StreamPlayer
                title={content.title}
                description={content.description}
                sources={watchSources}
                subtitles={content.subtitles}
                externalUrl={content.externalUrl}
                onNext={() => window.location.assign('/home')}
              />
              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <h2 className="text-2xl font-semibold">About this title</h2>
                <p className="mt-4 text-slate-400">{content.description}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span>{content.year}</span>
                  <span>{content.categories.join(' · ')}</span>
                </div>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <h2 className="text-xl font-semibold mb-4">Up next</h2>
                <ul className="space-y-3">
                  {recommendations.map((item) => (
                    <li key={item.id} className="rounded-2xl border border-white/10 p-4 bg-slate-900/80">
                      <a href={`/watch/${item.slug}`} className="flex items-center gap-4">
                        <img src={item.poster} alt={item.title} className="w-16 h-16 rounded-2xl object-cover" />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-slate-400">AI recommended for you</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <h2 className="text-xl font-semibold mb-4">Quick actions</h2>
                <div className="grid gap-3">
                  <button className="glow-button">Add to watchlist</button>
                  <button className="glow-button">Report</button>
                  <button className="glow-button">Share</button>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-10 text-center">
            <p className="text-slate-400">Loading watch content…</p>
          </div>
        )}
      </div>
    </main>
  );
}
