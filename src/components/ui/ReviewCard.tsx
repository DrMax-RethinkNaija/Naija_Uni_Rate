import { Review } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import StarRating from "./StarRating";
import AbuseTag from "./AbuseTag";
import Badge from "./Badge";
import VoteButtons from "./VoteButtons";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 sm:p-5 hover:border-dark-600 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <Badge status={review.status} />
          <span className="text-xs text-gray-500">{timeAgo(review.createdAt)}</span>
        </div>
        <span className="text-xs text-gray-500">{review.yearInfo}</span>
      </div>

      <div className="flex flex-wrap gap-4 mb-3">
        <div>
          <span className="text-xs text-gray-500 block">Teaching</span>
          <StarRating rating={review.teachingRating} size="sm" />
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Safety</span>
          <StarRating rating={review.safetyRating} size="sm" />
        </div>
      </div>

      {review.abuseTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {review.abuseTags.map((tag) => (
            <AbuseTag key={tag} tag={tag} />
          ))}
        </div>
      )}

      <p className="text-gray-300 text-sm leading-relaxed mb-3">
        {review.reviewText}
      </p>

      {review.courseCode && (
        <p className="text-xs text-gray-500 mb-3">
          Course: <span className="text-gray-400">{review.courseCode}</span>
        </p>
      )}

      <VoteButtons
        reviewId={review.id}
        initialUpvotes={review.upvotes}
        initialDownvotes={review.downvotes}
      />
    </div>
  );
}
