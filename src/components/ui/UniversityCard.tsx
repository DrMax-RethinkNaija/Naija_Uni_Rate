import Link from "next/link";
import { University } from "@/lib/types";

interface UniversityCardProps {
  university: University;
  lecturerCount?: number;
}

export default function UniversityCard({
  university,
  lecturerCount,
}: UniversityCardProps) {
  const typeColors = {
    federal: "bg-blue-900/30 text-blue-400 border-blue-800",
    state: "bg-purple-900/30 text-purple-400 border-purple-800",
    private: "bg-amber-900/30 text-amber-400 border-amber-800",
  };

  return (
    <Link href={`/university/${university.slug}`}>
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-naija-green/50 hover:shadow-lg hover:shadow-naija-green/5 transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[university.type]}`}
          >
            {university.type}
          </span>
          <span className="text-xs text-gray-500">{university.state}</span>
        </div>
        <h3 className="font-semibold text-white text-sm mb-1">
          {university.name}
        </h3>
        <p className="text-naija-green font-bold text-xs mb-2">
          {university.acronym}
        </p>
        {lecturerCount !== undefined && (
          <p className="text-xs text-gray-500">
            {lecturerCount} lecturer{lecturerCount !== 1 ? "s" : ""} rated
          </p>
        )}
      </div>
    </Link>
  );
}
