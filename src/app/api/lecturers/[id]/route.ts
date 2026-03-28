import { NextRequest, NextResponse } from "next/server";
import { getLecturerById } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lecturer = getLecturerById(params.id);
  if (!lecturer) {
    return NextResponse.json({ error: "Lecturer not found" }, { status: 404 });
  }
  return NextResponse.json(lecturer);
}
