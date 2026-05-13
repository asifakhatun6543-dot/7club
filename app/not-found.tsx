export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl rounded-[32px] border border-white/10 bg-slate-950/90 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">404</p>
        <h1 className="mt-4 text-4xl font-black">Page not found</h1>
        <p className="mt-4 text-slate-400">The requested Streammore page does not exist.</p>
        <a href="/home" className="mt-8 inline-flex glow-button">Return home</a>
      </div>
    </main>
  );
}
