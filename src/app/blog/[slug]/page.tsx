'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: {
    slug: string;
  };
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  featuredImage?: any;
  excerpt: string;
  content: any[];
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Post image'}
          className="w-full rounded-lg"
        />
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-lg leading-relaxed">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mb-4 mt-6">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-600 pl-4 italic my-6 text-zinc-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-amber-400 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[_type == "post" && slug.current == "${params.slug}"][0] {
        _id,
        title,
        slug,
        publishedAt,
        category,
        featuredImage,
        excerpt,
        content
      }`;

      try {
        const postData = await client.fetch(query);
        setPost(postData);

        if (postData) {
          const relatedQuery = `*[_type == "post" && category == "${postData.category}" && slug.current != "${params.slug}"] | order(publishedAt desc) [0...2] {
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            featuredImage
          }`;
          const related = await client.fetch(relatedQuery);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-amber-400 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Estimate reading time
  const content = post.content || [];
  const wordCount = content
    .filter((block: any) => block._type === 'block')
    .reduce((count: number, block: any) => {
      const text = block.children?.map((child: any) => child.text).join(' ') || '';
      return count + text.split(/\s+/).length;
    }, 0);
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="w-full h-96 bg-zinc-900 rounded-lg overflow-hidden">
            <img
              src={urlFor(post.featuredImage).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="max-w-3xl mx-auto px-4 pb-8 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="uppercase tracking-wide text-amber-400">
            {post.category}
          </span>
          <span className="text-zinc-600">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-600">{readingTime} min read</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-zinc-400">{post.excerpt}</p>
      </div>

      {/* Post Content */}
      <article className="max-w-3xl mx-auto px-4 py-12 text-zinc-300">
        {content && content.length > 0 ? (
          <PortableText value={content} components={portableTextComponents} />
        ) : (
          <p className="text-zinc-400">No content available for this post yet.</p>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-20 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relPost: any) => (
              <Link
                key={relPost._id}
                href={`/blog/${relPost.slug.current}`}
                className="group flex flex-col border border-zinc-800 hover:border-amber-600 rounded-lg overflow-hidden transition-colors bg-zinc-950 hover:bg-black"
              >
                {relPost.featuredImage && (
                  <div className="relative w-full h-40 bg-zinc-900 overflow-hidden">
                    <img
                      src={urlFor(relPost.featuredImage).url()}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-zinc-600 mb-2">
                    {new Date(relPost.publishedAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400">
                    {relPost.title}
                  </h3>
                  <p className="text-zinc-400 text-sm flex-grow">
                    {relPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}


    </div>
  );
}
