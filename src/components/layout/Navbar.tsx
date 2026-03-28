"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-naija-green flex items-center justify-center font-bold text-white text-sm">
              RM
            </div>
            <span className="font-bold text-white text-lg hidden sm:block">
              RateMyNaija<span className="text-naija-green">Lecturer</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <SearchBar compact />
            <Link
              href="/universities"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Browse
            </Link>
            <Link
              href="/review/new"
              className="bg-naija-green hover:bg-naija-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Rate a Lecturer
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <SearchBar />
            <Link
              href="/universities"
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-white py-2 text-sm"
            >
              Browse Universities
            </Link>
            <Link
              href="/review/new"
              onClick={() => setMobileOpen(false)}
              className="block bg-naija-green hover:bg-naija-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              Rate a Lecturer
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
