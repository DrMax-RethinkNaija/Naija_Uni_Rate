"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-64" : "w-full"}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lecturers, universities..."
          className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-naija-green focus:ring-1 focus:ring-naija-green transition-colors"
        />
      </div>
    </form>
  );
}
