import { search } from "@/lib/data";
import UniversityCard from "@/components/ui/UniversityCard";
import LecturerCard from "@/components/ui/LecturerCard";
import { getUniversities } from "@/lib/data";
import SearchBar from "@/components/ui/SearchBar";

export const metadata = {
  title: "Search - RateMyNaijaLecturer",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const results = query.length >= 2 ? search(query) : { universities: [], lecturers: [] };
  const allUnis = getUniversities();
  const uniMap = new Map(allUnis.map((u) => [u.id, u.name]));

  const totalResults = results.universities.length + results.lecturers.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-xl mb-8">
        <SearchBar />
      </div>

      {query && (
        <p className="text-sm text-gray-500 mb-6">
          {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;
          <span className="text-white">{query}</span>&rdquo;
        </p>
      )}

      {results.universities.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">Universities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.universities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        </div>
      )}

      {results.lecturers.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">Lecturers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.lecturers.map((lecturer) => (
              <LecturerCard
                key={lecturer.id}
                lecturer={lecturer}
                universityName={uniMap.get(lecturer.universityId)}
              />
            ))}
          </div>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 mb-2">No results found.</p>
          <p className="text-gray-500 text-sm">
            Try searching for a university name, acronym, or lecturer name.
          </p>
        </div>
      )}
    </div>
  );
}
