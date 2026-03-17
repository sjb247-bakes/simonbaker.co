'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export const dynamic = 'force-dynamic';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        category,
        featuredImage
      }`;
      
      try {
        const data = await client.fetch(query);
        setRecentPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Simon Baker
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed">
            Racing driver. Hypnotherapist. Home Renovator. AI builder. I help
            high-performers get out of their own way and smash targets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/performance"
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Work with me
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-zinc-600 hover:bg-zinc-900 text-white font-semibold rounded-lg transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Performance */}
            <Link
              href="/performance"
              className="group p-8 border border-zinc-800 hover:border-amber-600 rounded-lg transition-colors bg-black hover:bg-zinc-900"
            >
              <div className="text-4xl mb-4">🏎️</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400">
                Performance
              </h3>
              <p className="text-zinc-400">
                Coaching for people who perform under pressure. Racing-tested,
                science-backed.
              </p>
            </Link>

            {/* Content */}
            <Link
              href="/blog"
              className="group p-8 border border-zinc-800 hover:border-amber-600 rounded-lg transition-colors bg-black hover:bg-zinc-900"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400">
                Content
              </h3>
              <p className="text-zinc-400">
                AI, cars, reno, and the stuff happening between the ears.
              </p>
            </Link>

            {/* Tools */}
            <div className="group p-8 border border-zinc-800 rounded-lg bg-black opacity-50">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3 text-zinc-600">
                Tools
              </h3>
              <p className="text-zinc-600">
                The performance dashboard — biometrics, HRV, sleep, daily brief.
              </p>
              <p className="text-sm text-zinc-700 mt-4">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {!loading && recentPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-16">Latest From the Blog</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col h-full border border-zinc-800 hover:border-amber-600 rounded-lg overflow-hidden transition-colors bg-zinc-950 hover:bg-black"
                >
                  {post.featuredImage && (
                    <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
                      <img
                        src={urlFor(post.featuredImage).url()}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs uppercase tracking-wide text-amber-400">
                        {post.category}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm flex-grow">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link
                    href="/performance"
                    className="hover:text-white transition-colors"
                  >
                    Performance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book"
                    className="hover:text-white transition-colors"
                  >
                    Book a Call
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href="https://instagram.com/simonbakerhypno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@simonbakerhypno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/simonbaker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <p className="text-zinc-400">
                <a
                  href="mailto:simon@simonbaker.co"
                  className="hover:text-white transition-colors"
                >
                  simon@simonbaker.co
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-600 text-sm">
            <p>&copy; 2026 Simon Baker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
