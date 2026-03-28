import { NextRequest, NextResponse } from "next/server";
import { getReviews, addReview, getLecturers, addLecturer } from "@/lib/data";
import { Review, Lecturer, AbuseTag } from "@/lib/types";
import { generateId } from "@/lib/utils";

const VALID_ABUSE_TAGS: AbuseTag[] = [
  "sexual_harassment",
  "extortion",
  "intimidation",
  "grade_manipulation",
  "verbal_abuse",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lecturerId = searchParams.get("lecturerId") || undefined;

  const reviews = getReviews({ lecturerId });
  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lecturerName,
      lecturerId: existingLecturerId,
      universityId,
      department,
      courseCode,
      teachingRating,
      safetyRating,
      reviewText,
      yearInfo,
      abuseTags,
    } = body;

    // Validation
    if (!universityId || !department || !teachingRating || !safetyRating || !reviewText || !yearInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (reviewText.trim().length < 20) {
      return NextResponse.json(
        { error: "Review must be at least 20 characters" },
        { status: 400 }
      );
    }

    if (teachingRating < 1 || teachingRating > 5 || safetyRating < 1 || safetyRating > 5) {
      return NextResponse.json(
        { error: "Ratings must be between 1 and 5" },
        { status: 400 }
      );
    }

    const validTags = (abuseTags || []).filter((t: string) =>
      VALID_ABUSE_TAGS.includes(t as AbuseTag)
    ) as AbuseTag[];

    // Find or create lecturer
    let lecturerId = existingLecturerId;
    if (!lecturerId && lecturerName) {
      // Check if lecturer already exists at this university + department
      const existing = getLecturers({
        universityId,
        department,
      }).find(
        (l) => l.name.toLowerCase() === lecturerName.trim().toLowerCase()
      );

      if (existing) {
        lecturerId = existing.id;
      } else {
        // Create new lecturer
        const newLecturer: Lecturer = {
          id: generateId(),
          name: lecturerName.trim(),
          universityId,
          department,
          courses: courseCode ? [courseCode] : [],
          avgTeachingRating: 0,
          avgSafetyRating: 0,
          reviewCount: 0,
          abuseTags: {},
          createdAt: new Date().toISOString(),
        };
        await addLecturer(newLecturer);
        lecturerId = newLecturer.id;
      }
    }

    if (!lecturerId) {
      return NextResponse.json(
        { error: "Lecturer name or ID is required" },
        { status: 400 }
      );
    }

    const review: Review = {
      id: generateId(),
      lecturerId,
      universityId,
      department,
      courseCode: courseCode?.trim() || null,
      teachingRating: Math.round(teachingRating),
      safetyRating: Math.round(safetyRating),
      reviewText: reviewText.trim(),
      yearInfo,
      abuseTags: validTags,
      status: "unreviewed",
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
    };

    await addReview(review);
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
