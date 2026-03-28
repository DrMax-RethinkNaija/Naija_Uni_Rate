import { NextRequest, NextResponse } from "next/server";
import { getLecturers, addLecturer } from "@/lib/data";
import { Lecturer } from "@/lib/types";
import { generateId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const universityId = searchParams.get("universityId") || undefined;
  const department = searchParams.get("department") || undefined;
  const search = searchParams.get("search") || undefined;

  const lecturers = getLecturers({ universityId, department, search });
  return NextResponse.json(lecturers);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, universityId, department, courses } = body;

    if (!name || !universityId || !department) {
      return NextResponse.json(
        { error: "name, universityId, and department are required" },
        { status: 400 }
      );
    }

    const lecturer: Lecturer = {
      id: generateId(),
      name: name.trim(),
      universityId,
      department,
      courses: courses || [],
      avgTeachingRating: 0,
      avgSafetyRating: 0,
      reviewCount: 0,
      abuseTags: {},
      createdAt: new Date().toISOString(),
    };

    await addLecturer(lecturer);
    return NextResponse.json(lecturer, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
