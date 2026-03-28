import Link from "next/link";
import { getUniversities, getLecturers, getReviews } from "@/lib/data";
import { NIGERIAN_STATES } from "@/lib/constants";
import LecturerCard from "@/components/ui/LecturerCard";
import SearchBar from "@/components/ui/SearchBar";

export default function Home() {
  const universities = getUniversities();
  const lecturers = getLecturers();
  const reviews = getReviews();

  // Top lecturers by review count
  const trending = [...lecturers]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  // Get university names for lecturer cards
  const uniMap = new Map(universities.map((u) => [u.id, u.name]));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-naija-green/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Rate My Naija{" "}
              <span className="text-naija-green">Lecturer</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl mb-8 text-balance">
              Hold them accountable. Anonymously. Help fellow students make
              safer decisions about their education.
            </p>
            <div className="max-w-xl mx-auto mb-6">
              <SearchBar />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/review/new"
                className="bg-naija-green hover:bg-naija-green-dark text-white px-6 py-3 rounded-lg font-medium transition-colors animate-glow-pulse"
              >
                Rate a Lecturer
              </Link>
              <Link
                href="/universities"
                className="bg-dark-800 hover:bg-dark-700 text-gray-300 px-6 py-3 rounded-lg font-medium border border-dark-700 transition-colors"
              >
                Browse Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-dark-700 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-naija-green">
                {universities.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Universities</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-naija-green">
                {lecturers.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Lecturers Rated</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-naija-green">
                {reviews.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Lecturers */}
      {trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-6">
            Most Reviewed Lecturers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((lecturer) => (
              <LecturerCard
                key={lecturer.id}
                lecturer={lecturer}
                universityName={uniMap.get(lecturer.universityId)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Browse by State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-white mb-6">Browse by State</h2>
        <div className="flex flex-wrap gap-2">
          {NIGERIAN_STATES.map((state) => (
            <Link
              key={state}
              href={`/universities?state=${encodeURIComponent(state)}`}
              className="px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-full text-sm text-gray-400 hover:border-naija-green hover:text-naija-green transition-colors"
            >
              {state}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-r from-naija-green/20 to-dark-800 border border-naija-green/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Had an experience with a lecturer?
          </h2>
          <p className="text-gray-400 mb-6">
            Your anonymous review could protect another student. Every voice
            matters.
          </p>
          <Link
            href="/review/new"
            className="inline-block bg-naija-green hover:bg-naija-green-dark text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Share Your Experience
          </Link>
        </div>
      </section>
    </div>
  );
}
