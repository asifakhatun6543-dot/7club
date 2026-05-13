'use client';

import { useEffect, useState } from 'react';
import SectionRow from '../../components/SectionRow';

interface Episode {
  id: string;
  title: string;
  number: number;
  isLocked: boolean;
  poster: string;
  description: string;
}

const sections = ['Trending', 'Ongoing', 'Completed', 'Romance', 'Action', 'Thriller', 'Emotional'];

const episodes: Episode[] = Array.from({ length: 12 }, (_, index) => ({
  id: `ep-${index + 1}`,
  title: `Episode ${index + 1}`,
  number: index + 1,
  isLocked: index > 7,
  poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80',
  description: 'Short drama episode specially curated with cinematic mood and cliffhanger flow.'
}));

export default function ShortDramaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed');
  const [activeSection, setActiveSection] = useState('Trending');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    setSelectedEpisode(episodes[0]);
  }, []);

  const sectionEpisodes = episodes.filter((_, index) => index % sections.length === sections.indexOf(activeSection));

  return (
    <main className="min-h-screen pb-20">
      <div className="monotone-container pt-6">
        <header className="mb-8">
          <p className="text-sky-300 uppercase tracking-[0.24em] text-sm">Short Drama</p>
          <h1 className="text-4xl font-black">Vertical episode feed with VIP locking</h1>
        </header>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="glow-button" onClick={() => setViewMode('feed')}>Reels feed</button>
          <button className="glow-button" onClick={() => setViewMode('grid')}>Grid view</button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {sections.map((section) => (
            <button
              key={section}
              className={`glow-button ${section === activeSection ? 'bg-sky-400/20 border-sky-400/40' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        <section className={viewMode === 'feed' ? 'space-y-6' : 'card-grid'}>
          {sectionEpisodes.map((episode) => (
            <article key={episode.id} className="rounded-[24px] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-900/40">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <img src={episode.poster} alt={episode.title} className="w-full h-64 rounded-3xl object-cover md:w-64" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sky-300 uppercase tracking-[0.24em] text-xs">Episode {episode.number}</span>
                    {episode.isLocked && <span className="px-3 py-1 text-[11px] uppercase tracking-[0.2em] bg-rose-500/20 rounded-full">VIP</span>}
                  </div>
                  <h3 className="text-2xl font-semibold">{episode.title}</h3>
                  <p className="mt-3 text-slate-400">{episode.description}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="glow-button">Like</button>
                    <button className="glow-button">Follow series</button>
                    <button className="glow-button">Share</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="section-title">Episode progress</h2>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-6">
            <div className="flex flex-col gap-3">
              <span className="text-slate-300">Currently watching:</span>
              <strong className="text-xl">{selectedEpisode?.title}</strong>
              <p className="max-w-2xl text-slate-400">Auto scroll next episode and continue watching progress saved. Episodes 1–100 management with locked VIP content and smart feed layout.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
