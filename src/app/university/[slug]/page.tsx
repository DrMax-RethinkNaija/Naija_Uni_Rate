import { notFound } from "next/navigation";
import Link from "next/link";
import { getUniversityBySlug, getLecturers } from "@/lib/data";
import LecturerCard from "@/components/ui/LecturerCard";

export default function UniversityPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { dept?: string };
}) {
  const university = getUniversityBySlug(params.slug);
  if (!university) notFound();

  const dept = searchParams.dept;
  let lecturers = getLecturers({ universityId: university.id });
  if (dept) {
    lecturers = lecturers.filter(
      (l) => l.department.toLowerCase() === dept.toLowerCase()
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/universities"
          className="text-naija-green text-sm hover:underline mb-2 inline-block"
        >
          &larr; All Universities
        </Link>
        <h1 className="text-2xl font-bold text-white">{university.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-naija-green font-bold">{university.acronym}</span>
          <span className="text-gray-500 text-sm">{university.state}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-gray-400 capitalize">
            {university.type}
          </span>
        </div>
      </div>

      {/* Department filter */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 mb-3">
          Filter by Department
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/university/${university.slug}`}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              !dept
                ? "bg-naija-green text-white"
                : "bg-dark-800 text-gray-400 border border-dark-700 hover:border-naija-green"
            }`}
          >
            All
          </Link>
          {university.departments.map((d) => (
            <Link
              key={d}
              href={`/university/${university.slug}?dept=${encodeURIComponent(d)}`}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                dept === d
                  ? "bg-naija-green text-white"
                  : "bg-dark-800 text-gray-400 border border-dark-700 hover:border-naija-green"
              }`}
            >
              {d}
            </Link>
          ))}
        </div>
      </div>

      {/* Lecturers */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {lecturers.length} lecturer{lecturers.length !== 1 ? "s" : ""} rated
          {dept && ` in ${dept}`}
        </p>
      </div>

      {lecturers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lecturers.map((lecturer) => (
            <LecturerCard key={lecturer.id} lecturer={lecturer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-dark-800 rounded-xl border border-dark-700">
          <p className="text-gray-400 mb-2">No lecturers rated yet{dept ? ` in ${dept}` : ""}.</p>
          <p className="text-gray-500 text-sm mb-4">Be the first to share your experience!</p>
          <Link
            href={`/review/new?universityId=${university.id}${dept ? `&department=${encodeURIComponent(dept)}` : ""}`}
            className="inline-block bg-naija-green hover:bg-naija-green-dark text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Rate a Lecturer
          </Link>
        </div>
      )}
    </div>
  );
}
