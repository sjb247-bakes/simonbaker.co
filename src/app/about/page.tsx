'use client';

import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-[calc(100vh-57px)] flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-4xl w-full text-center">
          {/* Placeholder for photo */}
          <div className="w-48 h-48 bg-zinc-900 rounded-full mx-auto mb-8 flex items-center justify-center">
            <p className="text-zinc-400 text-xl">Simon Baker</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Racing Driver. Hypnotherapist. Builder.
          </h1>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">The Story</h2>
          <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
            <p>
              I've done 180mph in a race car. I've sat with people at their lowest point and helped them rewrite the story they tell themselves. I've renovated houses with my hands and built software with AI. The thread through all of it is the same: understanding how the mind works, and using that to perform at the edge of your capability.
            </p>
            <p>
              I'm a certified clinical hypnotherapist, a racing driver, and someone who's genuinely obsessed with the intersection of neuroscience, performance, and human potential. I built this site to bring all of that together.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-4">🏎️</div>
              <h3 className="text-2xl font-bold mb-4">Racing</h3>
              <p className="text-zinc-400">
                I race cars. I know what it means to perform when everything's on the line.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-4">Hypnotherapy</h3>
              <p className="text-zinc-400">
                Certified clinical hypnotherapist. Evidence-based. Outcomes-focused.
              </p>
            </div>

            <div className="p-8 border border-zinc-800 rounded-lg bg-black">
              <div className="text-6xl mb-4">🔨</div>
              <h3 className="text-2xl font-bold mb-4">Builder</h3>
              <p className="text-zinc-400">
                House reno, software, content. I build things.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I Believe */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">What I Believe</h2>
          <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1 text-amber-600">•</div>
              <p>Mindset isn't soft — it's the hardest performance lever you have</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1 text-amber-600">•</div>
              <p>Real change happens below the level of conscious thought</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1 text-amber-600">•</div>
              <p>You don't need more information. You need to act differently.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-1 text-amber-600">•</div>
              <p>The goal is always performance — in racing, business, and life</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Work with me</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            If you're ready to stop spinning your wheels and start making real progress, let's talk about what that looks like for you.
          </p>
          <Link
            href="/hypnotherapy"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            Start with Hypnotherapy
          </Link>
        </div>
      </section>
    </div>
  );
}