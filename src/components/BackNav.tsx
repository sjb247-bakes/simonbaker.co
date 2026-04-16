'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function BackNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItemClass = (path: string) =>
    `transition-colors ${pathname === path || (path === '/blog' && pathname.startsWith('/blog')) ? 'text-amber-400' : 'text-zinc-300 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-white font-semibold tracking-tight hover:text-amber-400 transition-colors">
          Simon Baker
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link href="/hypnotherapy" className={navItemClass('/hypnotherapy')}>
              Hypnotherapy
            </Link>
            <Link href="/blog" className={navItemClass('/blog')}>
              Blog
            </Link>
            <Link href="/about" className={navItemClass('/about')}>
              About
            </Link>
            <Link href="/book" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium">
              Book
            </Link>
          </nav>

          <Link
            href="/book"
            className="lg:hidden px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
          >
            Book
          </Link>

          <div ref={menuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
                <div className="flex flex-col p-2 text-sm">
                  <Link href="/hypnotherapy" className={`${navItemClass('/hypnotherapy')} rounded-lg px-3 py-2 hover:bg-zinc-900`}>
                    Hypnotherapy
                  </Link>
                  <Link href="/blog" className={`${navItemClass('/blog')} rounded-lg px-3 py-2 hover:bg-zinc-900`}>
                    Blog
                  </Link>
                  <Link href="/about" className={`${navItemClass('/about')} rounded-lg px-3 py-2 hover:bg-zinc-900`}>
                    About
                  </Link>
                  <Link href="/book" className="mt-2 px-3 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
