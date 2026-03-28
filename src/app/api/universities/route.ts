import { NextRequest, NextResponse } from "next/server";
import { getUniversities } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state") || undefined;
  const type = searchParams.get("type") || undefined;

  const universities = getUniversities({ state, type });
  return NextResponse.json(universities);
}
