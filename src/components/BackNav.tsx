'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BackNav() {
  const pathname = usePathname();

  // Show back button on all pages except home
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="sticky top-0 z-40 bg-black border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors text-sm font-medium"
        >
          <span>←</span>
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}
