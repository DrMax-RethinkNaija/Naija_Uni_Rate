import ReviewForm from "@/components/forms/ReviewForm";

export const metadata = {
  title: "Rate a Lecturer - RateMyNaijaLecturer",
};

export default function NewReviewPage({
  searchParams,
}: {
  searchParams: { lecturerId?: string; universityId?: string; department?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-2">Rate a Lecturer</h1>
      <p className="text-gray-400 text-sm mb-8">
        Your identity is completely anonymous. Share your honest experience to
        help fellow students.
      </p>
      <ReviewForm
        initialUniversityId={searchParams.universityId}
        initialLecturerId={searchParams.lecturerId}
        initialDepartment={searchParams.department}
      />
    </div>
  );
}
