'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <h1 className="navbar-logo">
            <img
              className="navbar-logo-image"
              src="/logo.png"
              alt="WorkHop"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const mark = e.currentTarget.parentElement?.querySelector(
                  '.navbar-mark'
                ) as HTMLSpanElement | null;
                if (mark) mark.style.display = 'inline-block';
              }}
            />
            <span className="navbar-mark" aria-hidden="true" />
            <button
              type="button"
              className="navbar-title"
              onClick={() => {
                router.push('/');
              }}
            >
              WorkHop
            </button>
          </h1>
          <div className="navbar-right">
            <Link href="/owner" className="navbar-link">
              For cafés
            </Link>
            <p className="navbar-tagline">Book your station</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
