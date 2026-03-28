"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UniversityCard from "@/components/ui/UniversityCard";
import Link from "next/link";
import { NIGERIAN_STATES } from "@/lib/constants";

interface University {
  id: string;
  name: string;
  slug: string;
  acronym: string;
  type: "federal" | "state" | "private";
  state: string;
  departments: string[];
}

export default function UniversitiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "";
  const type = searchParams.get("type") || "";

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (type) params.set("type", type);
    fetch(`/api/universities?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setUniversities(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [state, type]);

  const types = ["federal", "state", "private"] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        Browse Universities
        {state && <span className="text-naija-green"> in {state}</span>}
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <select
            value={state}
            onChange={(e) => {
              const params = new URLSearchParams();
              if (e.target.value) params.set("state", e.target.value);
              if (type) params.set("type", type);
              router.push(`/universities${params.toString() ? "?" + params : ""}`);
            }}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-naija-green focus:outline-none"
          >
            <option value="">All States</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/universities${state ? `?state=${state}` : ""}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !type
                ? "bg-naija-green text-white"
                : "bg-dark-800 text-gray-400 border border-dark-700 hover:border-naija-green"
            }`}
          >
            All
          </Link>
          {types.map((t) => (
            <Link
              key={t}
              href={`/universities?${state ? `state=${state}&` : ""}type=${t}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                type === t
                  ? "bg-naija-green text-white"
                  : "bg-dark-800 text-gray-400 border border-dark-700 hover:border-naija-green"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-dark-800 border border-dark-700 rounded-xl p-4 h-32 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {universities.length} universit{universities.length === 1 ? "y" : "ies"} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {universities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No universities found for this filter.</p>
              <Link href="/universities" className="text-naija-green text-sm mt-2 inline-block">
                Clear filters
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
