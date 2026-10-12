'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileDock() {
  const pathname = usePathname();

  // Don't render dock on admin pages
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isServices = pathname === '/services';
  const isTraining = pathname === '/training';
  const isAbout = pathname === '/about';

  return (
    <nav className="mobile-app-dock" aria-label="Mobile Bottom App Navigation">
      <Link href="/" className={`mobile-dock-btn ${isHome ? 'active' : ''}`} aria-label="Home">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Home</span>
      </Link>

      <Link href="/services" className={`mobile-dock-btn ${isServices ? 'active' : ''}`} aria-label="Services">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
        <span>Services</span>
      </Link>

      <Link href="/about" className={`mobile-dock-btn ${isAbout ? 'active' : ''}`} aria-label="About">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>About</span>
      </Link>

      <Link href="/training" className={`mobile-dock-btn ${isTraining ? 'active' : ''}`} aria-label="Training">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <span>Training</span>
      </Link>

      <a
        href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20grow%20my%20business%20digitally"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-dock-btn mobile-dock-cta"
        aria-label="WhatsApp"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Chat</span>
      </a>
    </nav>
  );
}
