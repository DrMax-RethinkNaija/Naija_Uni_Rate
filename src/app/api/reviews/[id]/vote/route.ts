import { NextRequest, NextResponse } from "next/server";
import { castVote } from "@/lib/data";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { type, fingerprint } = body;

    if (!type || !fingerprint || !["up", "down"].includes(type)) {
      return NextResponse.json(
        { error: "type (up/down) and fingerprint are required" },
        { status: 400 }
      );
    }

    const result = await castVote(params.id, fingerprint, type);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
