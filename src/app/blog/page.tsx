'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

const categories = [
  { title: 'All', value: 'all' },
  { title: 'Performance', value: 'performance' },
  { title: 'Renovation', value: 'renovation' },
  { title: 'Cars', value: 'cars' },
  { title: 'Bakes Builds', value: 'builds' },
  { title: 'Blog', value: 'blog' },
];

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  category: string;
  featuredImage?: any;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = selectedCategory === 'all'
        ? `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            category,
            featuredImage
          }`
        : `*[_type == "post" && category == "${selectedCategory}"] | order(publishedAt desc) {
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
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-16 px-4 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">The Blog</h1>
          <p className="text-xl text-zinc-400">
            Performance, hypnotherapy, cars, renovations, and the stuff that
            connects them.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 bg-black bg-opacity-95 backdrop-blur z-10 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center text-zinc-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-zinc-400">
              No posts in this category yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
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
                    <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <p className="text-amber-400 text-sm mt-4 group-hover:underline">
                      Read more →
                    </p>
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
