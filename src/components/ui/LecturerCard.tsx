import Link from "next/link";
import { Lecturer } from "@/lib/types";
import { AbuseTag } from "@/lib/types";
import { ratingColor, safetyLabel } from "@/lib/utils";
import { ABUSE_TAG_LABELS } from "@/lib/constants";

interface LecturerCardProps {
  lecturer: Lecturer;
  universityName?: string;
}

export default function LecturerCard({ lecturer, universityName }: LecturerCardProps) {
  const topTags = Object.entries(lecturer.abuseTags)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Link href={`/lecturer/${lecturer.id}`}>
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-naija-green/50 hover:shadow-lg hover:shadow-naija-green/5 transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white text-sm">{lecturer.name}</h3>
            <p className="text-xs text-gray-500">{lecturer.department}</p>
            {universityName && (
              <p className="text-xs text-gray-600">{universityName}</p>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-dark-700 px-2 py-0.5 rounded-full">
            {lecturer.reviewCount} review{lecturer.reviewCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex gap-4 mt-3">
          <div>
            <span className="text-xs text-gray-500">Teaching</span>
            <p className={`font-bold text-lg ${ratingColor(lecturer.avgTeachingRating)}`}>
              {lecturer.avgTeachingRating > 0
                ? lecturer.avgTeachingRating.toFixed(1)
                : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Safety</span>
            <p className={`font-bold text-lg ${ratingColor(lecturer.avgSafetyRating)}`}>
              {lecturer.avgSafetyRating > 0 ? (
                <>
                  {lecturer.avgSafetyRating.toFixed(1)}
                  <span className="text-xs font-normal ml-1">
                    {safetyLabel(lecturer.avgSafetyRating)}
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>

        {topTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {topTags.map(([tag, count]) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-900/50"
              >
                {ABUSE_TAG_LABELS[tag as AbuseTag]} ({count})
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
