import { notFound } from "next/navigation";
import Link from "next/link";
import { getLecturerById, getReviews, getUniversityById } from "@/lib/data";
import { ratingColor, safetyLabel } from "@/lib/utils";
import ReviewCard from "@/components/ui/ReviewCard";
import AbuseTag from "@/components/ui/AbuseTag";
import { AbuseTag as AbuseTagType } from "@/lib/types";

export default function LecturerPage({
  params,
}: {
  params: { id: string };
}) {
  const lecturer = getLecturerById(params.id);
  if (!lecturer) notFound();

  const university = getUniversityById(lecturer.universityId);
  const reviews = getReviews({ lecturerId: lecturer.id });

  const tagEntries = Object.entries(lecturer.abuseTags)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      {university && (
        <Link
          href={`/university/${university.slug}`}
          className="text-naija-green text-sm hover:underline mb-4 inline-block"
        >
          &larr; {university.acronym}
        </Link>
      )}

      {/* Lecturer header */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">{lecturer.name}</h1>
        <p className="text-gray-400">
          {lecturer.department}
          {university && ` - ${university.name}`}
        </p>
        {lecturer.courses.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            Courses: {lecturer.courses.join(", ")}
          </p>
        )}

        {/* Rating circles */}
        <div className="flex gap-8 mt-6">
          <div className="text-center">
            <div
              className={`w-20 h-20 rounded-full border-4 ${
                lecturer.avgTeachingRating >= 4
                  ? "border-safe"
                  : lecturer.avgTeachingRating >= 2.5
                  ? "border-warning"
                  : "border-danger"
              } flex items-center justify-center`}
            >
              <span className={`text-2xl font-bold ${ratingColor(lecturer.avgTeachingRating)}`}>
                {lecturer.avgTeachingRating > 0
                  ? lecturer.avgTeachingRating.toFixed(1)
                  : "N/A"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Teaching Quality</p>
          </div>
          <div className="text-center">
            <div
              className={`w-20 h-20 rounded-full border-4 ${
                lecturer.avgSafetyRating >= 4
                  ? "border-safe"
                  : lecturer.avgSafetyRating >= 2.5
                  ? "border-warning"
                  : "border-danger"
              } flex items-center justify-center`}
            >
              <span className={`text-2xl font-bold ${ratingColor(lecturer.avgSafetyRating)}`}>
                {lecturer.avgSafetyRating > 0
                  ? lecturer.avgSafetyRating.toFixed(1)
                  : "N/A"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Safety{" "}
              {lecturer.avgSafetyRating > 0 && (
                <span className={ratingColor(lecturer.avgSafetyRating)}>
                  ({safetyLabel(lecturer.avgSafetyRating)})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Abuse tags summary */}
        {tagEntries.length > 0 && (
          <div className="mt-6 pt-4 border-t border-dark-700">
            <p className="text-xs text-gray-500 mb-2">Reported Issues</p>
            <div className="flex flex-wrap gap-2">
              {tagEntries.map(([tag, count]) => (
                <AbuseTag key={tag} tag={tag as AbuseTagType} count={count} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            href={`/review/new?lecturerId=${lecturer.id}&universityId=${lecturer.universityId}&department=${encodeURIComponent(lecturer.department)}`}
            className="inline-block bg-naija-green hover:bg-naija-green-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Write a Review
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">
          Reviews ({reviews.length})
        </h2>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-dark-800 rounded-xl border border-dark-700">
          <p className="text-gray-400 mb-2">No reviews yet.</p>
          <p className="text-gray-500 text-sm">Be the first to rate this lecturer!</p>
        </div>
      )}
    </div>
  );
}
