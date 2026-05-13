'use client';

import { useEffect, useMemo, useState } from 'react';
import SectionRow from '../../components/SectionRow';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  categories: string[];
  genres: string[];
  country: string;
  year: number;
  slug: string;
  isVip: boolean;
}

const categories = ['Trending', 'Movies', 'TV Shows', 'Korean', 'Hindi', 'South', 'Asian', 'Western', 'Kids', 'Anime', 'Live TV', 'Short Drama', 'Cartoon', 'Recently Added', 'Continue Watching', 'Top 10 Today', 'Recommended For You'];

export default function HomePage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('/api/content/home')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setStatus('ready');
      })
      .catch(() => setStatus('ready'));
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.genres.join(' ').toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || item.categories.includes(filter) || item.country === filter;
      return matchSearch && matchFilter;
    });
  }, [items, search, filter]);

  return (
    <main className="min-h-screen pb-20">
      <div className="monotone-container pt-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sky-300 uppercase tracking-[0.24em] text-sm">Streammore</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Your cinematic entertainment hub</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-[360px]">
              <input
                className="input-field"
                placeholder="Search movies, shows, drama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="glow-button">Notifications</button>
            <button className="glow-button">Profile</button>
          </div>
        </header>

        <section className="mb-10">
          <div className="banner-slider rounded-[28px] overflow-hidden border border-white/10 bg-slate-950/80 shadow-[0_40px_120px_rgba(15,23,42,0.55)]">
            <div className="banner-content p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300 mb-4">Featured Banner</p>
              <h2 className="text-5xl font-black leading-tight">Stream premium movies and series from external sources</h2>
              <p className="mt-4 max-w-2xl text-slate-300">Streammore is a smart middle platform with a smooth cinematic player, auto recommendations, and instant playback of external video URLs.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="glow-button">Browse Trending</button>
                <button className="glow-button">Continue Watching</button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="section-title">Filters & recommendations</h2>
            <div className="flex flex-wrap gap-3">
              <select className="input-field" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>Trending</option>
                <option>Movies</option>
                <option>TV Shows</option>
                <option>Korean</option>
                <option>Hindi</option>
                <option>Western</option>
              </select>
              <button className="glow-button">Smart sort</button>
            </div>
          </div>
        </section>

        {status === 'loading' ? (
          <p>Loading content…</p>
        ) : (
          categories.map((category) => {
            const sectionItems = filteredItems.filter((item) => item.categories.includes(category));
            if (!sectionItems.length) return null;
            return <SectionRow key={category} title={category} items={sectionItems} />;
          })
        )}
      </div>
    </main>
  );
}
