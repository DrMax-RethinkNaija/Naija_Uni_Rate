"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarRating from "@/components/ui/StarRating";
import { ABUSE_TAG_LABELS } from "@/lib/constants";
import { AbuseTag } from "@/lib/types";
import Link from "next/link";

interface University {
  id: string;
  name: string;
  acronym: string;
  departments: string[];
}

interface LecturerOption {
  id: string;
  name: string;
}

interface ReviewFormProps {
  initialUniversityId?: string;
  initialLecturerId?: string;
  initialDepartment?: string;
}

export default function ReviewForm({
  initialUniversityId,
  initialLecturerId,
  initialDepartment,
}: ReviewFormProps) {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [lecturers, setLecturers] = useState<LecturerOption[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [universityId, setUniversityId] = useState(initialUniversityId || "");
  const [department, setDepartment] = useState(initialDepartment || "");
  const [lecturerId, setLecturerId] = useState(initialLecturerId || "");
  const [lecturerName, setLecturerName] = useState("");
  const [isNewLecturer, setIsNewLecturer] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [teachingRating, setTeachingRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [abuseTags, setAbuseTags] = useState<AbuseTag[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [yearInfo, setYearInfo] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Load universities
  useEffect(() => {
    fetch("/api/universities")
      .then((r) => r.json())
      .then(setUniversities)
      .catch(() => {});
  }, []);

  // Load lecturers when university + department change
  useEffect(() => {
    if (universityId && department) {
      fetch(
        `/api/lecturers?universityId=${universityId}&department=${encodeURIComponent(department)}`
      )
        .then((r) => r.json())
        .then(setLecturers)
        .catch(() => {});
    } else {
      setLecturers([]);
    }
  }, [universityId, department]);

  const selectedUni = universities.find((u) => u.id === universityId);

  const toggleTag = (tag: AbuseTag) => {
    setAbuseTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const yearOptions = [
    "100 Level",
    "200 Level",
    "300 Level",
    "400 Level",
    "500 Level",
    "600 Level",
    "Postgraduate",
    "Graduated - 2024",
    "Graduated - 2023",
    "Graduated - 2022",
    "Graduated - 2021",
    "Graduated - 2020",
    "Graduated - Before 2020",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!universityId) return setError("Please select a university");
    if (!department) return setError("Please select a department");
    if (!lecturerId && !lecturerName.trim())
      return setError("Please select or enter a lecturer name");
    if (!teachingRating) return setError("Please rate teaching quality");
    if (!safetyRating) return setError("Please rate safety");
    if (reviewText.trim().length < 20)
      return setError("Review must be at least 20 characters");
    // yearInfo is optional for maximum anonymity
    if (!agreedToTerms)
      return setError("You must agree to the disclaimer and terms");

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lecturerId: isNewLecturer ? undefined : lecturerId,
          lecturerName: isNewLecturer ? lecturerName.trim() : undefined,
          universityId,
          department,
          courseCode: courseCode.trim() || null,
          teachingRating,
          safetyRating,
          reviewText: reviewText.trim(),
          yearInfo,
          abuseTags,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-naija-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-naija-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Review Submitted!</h2>
        <p className="text-gray-400">Thank you for helping fellow students. Redirecting...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* University */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          University <span className="text-danger">*</span>
        </label>
        <select
          value={universityId}
          onChange={(e) => {
            setUniversityId(e.target.value);
            setDepartment("");
            setLecturerId("");
          }}
          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-naija-green focus:outline-none"
        >
          <option value="">Select university...</option>
          {universities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name} ({uni.acronym})
              </option>
            ))}
        </select>
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Department <span className="text-danger">*</span>
        </label>
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setLecturerId("");
          }}
          disabled={!universityId}
          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-naija-green focus:outline-none disabled:opacity-50"
        >
          <option value="">Select department...</option>
          {selectedUni?.departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Lecturer */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Lecturer <span className="text-danger">*</span>
        </label>
        {!isNewLecturer ? (
          <div className="space-y-2">
            <select
              value={lecturerId}
              onChange={(e) => setLecturerId(e.target.value)}
              disabled={!department}
              className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-naija-green focus:outline-none disabled:opacity-50"
            >
              <option value="">Select lecturer...</option>
              {lecturers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsNewLecturer(true)}
              className="text-naija-green text-xs hover:underline"
            >
              Lecturer not listed? Add new
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={lecturerName}
              onChange={(e) => setLecturerName(e.target.value)}
              placeholder="e.g. Dr. A.B. Surname"
              className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-naija-green focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setIsNewLecturer(false);
                setLecturerName("");
              }}
              className="text-naija-green text-xs hover:underline"
            >
              Select existing lecturer instead
            </button>
          </div>
        )}
      </div>

      {/* Course Code */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Course Code <span className="text-gray-600">(optional)</span>
        </label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="e.g. CSC 301"
          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-naija-green focus:outline-none"
        />
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Teaching Quality <span className="text-danger">*</span>
          </label>
          <StarRating
            rating={teachingRating}
            onChange={setTeachingRating}
            size="lg"
          />
          <p className="text-xs text-gray-500 mt-1">
            1 = Terrible, 5 = Excellent
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Safety Rating <span className="text-danger">*</span>
          </label>
          <StarRating
            rating={safetyRating}
            onChange={setSafetyRating}
            size="lg"
          />
          <p className="text-xs text-gray-500 mt-1">
            1 = Very Unsafe, 5 = Very Safe
          </p>
        </div>
      </div>

      {/* Abuse Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Report Issues <span className="text-gray-600">(if applicable)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(ABUSE_TAG_LABELS) as [AbuseTag, string][]).map(
            ([tag, label]) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  abuseTags.includes(tag)
                    ? "bg-red-900/50 text-red-300 border-red-700"
                    : "bg-dark-800 text-gray-400 border-dark-600 hover:border-red-800"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Review text */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Review <span className="text-danger">*</span>
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={5}
          placeholder="Share your experience with this lecturer. Be honest and specific, but avoid false accusations. Minimum 20 characters."
          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-naija-green focus:outline-none resize-y"
        />
        <p className="text-xs text-gray-500 mt-1">
          {reviewText.length}/20 minimum characters
        </p>
      </div>

      {/* Year */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Year/Level <span className="text-gray-600">(optional)</span>
        </label>
        <select
          value={yearInfo}
          onChange={(e) => setYearInfo(e.target.value)}
          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-naija-green focus:outline-none"
        >
          <option value="">Select...</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 rounded border-dark-600 bg-dark-800 text-naija-green focus:ring-naija-green"
        />
        <label htmlFor="terms" className="text-sm text-gray-400">
          I confirm this review is based on my genuine experience. I understand
          that false accusations are not tolerated and may be removed. I have read
          the{" "}
          <Link href="/disclaimer" className="text-naija-green hover:underline">
            Disclaimer & Terms
          </Link>
          .
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-naija-green hover:bg-naija-green-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
      >
        {submitting ? "Submitting..." : "Submit Anonymous Review"}
      </button>
    </form>
  );
}
