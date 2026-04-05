'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BackNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-white font-semibold tracking-tight hover:text-amber-400 transition-colors"
        >
          Simon Baker
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/hypnotherapy"
            className={`transition-colors ${pathname === '/hypnotherapy' ? 'text-amber-400' : 'text-zinc-300 hover:text-white'}`}
          >
            Hypnotherapy
          </Link>
          <Link
            href="/blog"
            className={`transition-colors ${pathname.startsWith('/blog') ? 'text-amber-400' : 'text-zinc-300 hover:text-white'}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${pathname === '/about' ? 'text-amber-400' : 'text-zinc-300 hover:text-white'}`}
          >
            About
          </Link>
          <Link
            href="/book"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
          >
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
