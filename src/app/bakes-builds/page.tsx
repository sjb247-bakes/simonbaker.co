import Link from "next/link";
import type { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Bakes Builds | Simon Baker",
  description: "Simon Baker's hands-on build projects — house renovations, car builds, and more.",
};

export default async function BakesBuildsPage() {
  const posts = await client.fetch(`*[_type == "post" && category == "renovation"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    featuredImage,
    noindex
  }`);

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <section className="px-4 py-20 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">#BakesBuilds</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Bakes Builds</h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            Simon's hands-on build projects, house renovations, car builds, bike builds, and the stuff you actually have to get your hands dirty for.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="border border-zinc-800 rounded-2xl p-10 bg-zinc-950 text-center">
              <p className="text-2xl font-semibold mb-3">Coming soon</p>
              <p className="text-zinc-400">Simon's hands-on build projects.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 hover:border-amber-600 transition-colors"
                >
                  {post.featuredImage && (
                    <div className="h-52 bg-zinc-900 overflow-hidden">
                      <img
                        src={urlFor(post.featuredImage).url()}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-amber-400">
                      <span>Bakes Builds</span>
                      <span className="text-zinc-600">•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl font-bold group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
