import fs from "fs";
import path from "path";
import { University, Lecturer, Review, Vote, AbuseTag } from "./types";
import { computeAverage } from "./utils";

const DATA_DIR = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

let writeQueue = Promise.resolve();

function writeJSON<T>(filename: string, data: T): Promise<void> {
  writeQueue = writeQueue.then(() => {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  });
  return writeQueue;
}

// Universities
export function getUniversities(filters?: {
  state?: string;
  type?: string;
}): University[] {
  let unis = readJSON<University[]>("universities.json");
  if (filters?.state) {
    unis = unis.filter(
      (u) => u.state.toLowerCase() === filters.state!.toLowerCase()
    );
  }
  if (filters?.type) {
    unis = unis.filter(
      (u) => u.type.toLowerCase() === filters.type!.toLowerCase()
    );
  }
  return unis;
}

export function getUniversityById(id: string): University | undefined {
  const unis = readJSON<University[]>("universities.json");
  return unis.find((u) => u.id === id);
}

export function getUniversityBySlug(slug: string): University | undefined {
  const unis = readJSON<University[]>("universities.json");
  return unis.find((u) => u.slug === slug);
}

// Lecturers
export function getLecturers(filters?: {
  universityId?: string;
  department?: string;
  search?: string;
}): Lecturer[] {
  let lecturers = readJSON<Lecturer[]>("lecturers.json");
  if (filters?.universityId) {
    lecturers = lecturers.filter(
      (l) => l.universityId === filters.universityId
    );
  }
  if (filters?.department) {
    lecturers = lecturers.filter(
      (l) => l.department.toLowerCase() === filters.department!.toLowerCase()
    );
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    lecturers = lecturers.filter((l) => l.name.toLowerCase().includes(q));
  }
  return lecturers;
}

export function getLecturerById(id: string): Lecturer | undefined {
  const lecturers = readJSON<Lecturer[]>("lecturers.json");
  return lecturers.find((l) => l.id === id);
}

export async function addLecturer(lecturer: Lecturer): Promise<void> {
  const lecturers = readJSON<Lecturer[]>("lecturers.json");
  lecturers.push(lecturer);
  await writeJSON("lecturers.json", lecturers);
}

export async function updateLecturerStats(lecturerId: string): Promise<void> {
  const lecturers = readJSON<Lecturer[]>("lecturers.json");
  const reviews = readJSON<Review[]>("reviews.json").filter(
    (r) => r.lecturerId === lecturerId
  );

  const idx = lecturers.findIndex((l) => l.id === lecturerId);
  if (idx === -1) return;

  lecturers[idx].avgTeachingRating = computeAverage(
    reviews.map((r) => r.teachingRating)
  );
  lecturers[idx].avgSafetyRating = computeAverage(
    reviews.map((r) => r.safetyRating)
  );
  lecturers[idx].reviewCount = reviews.length;

  const tagCounts: Partial<Record<AbuseTag, number>> = {};
  for (const review of reviews) {
    for (const tag of review.abuseTags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }
  lecturers[idx].abuseTags = tagCounts;

  await writeJSON("lecturers.json", lecturers);
}

// Reviews
export function getReviews(filters?: {
  lecturerId?: string;
}): Review[] {
  let reviews = readJSON<Review[]>("reviews.json");
  if (filters?.lecturerId) {
    reviews = reviews.filter((r) => r.lecturerId === filters.lecturerId);
  }
  return reviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addReview(review: Review): Promise<void> {
  const reviews = readJSON<Review[]>("reviews.json");
  reviews.push(review);
  await writeJSON("reviews.json", reviews);
  await updateLecturerStats(review.lecturerId);
}

// Votes
export function getVotes(reviewId: string): Vote[] {
  const votes = readJSON<Vote[]>("votes.json");
  return votes.filter((v) => v.reviewId === reviewId);
}

export async function castVote(
  reviewId: string,
  fingerprint: string,
  voteType: "up" | "down"
): Promise<{ upvotes: number; downvotes: number }> {
  const votes = readJSON<Vote[]>("votes.json");
  const reviews = readJSON<Review[]>("reviews.json");

  const existingIdx = votes.findIndex(
    (v) => v.reviewId === reviewId && v.fingerprint === fingerprint
  );

  if (existingIdx !== -1) {
    if (votes[existingIdx].type === voteType) {
      // Toggle off
      votes.splice(existingIdx, 1);
    } else {
      // Switch vote
      votes[existingIdx].type = voteType;
    }
  } else {
    votes.push({
      reviewId,
      fingerprint,
      type: voteType,
      createdAt: new Date().toISOString(),
    });
  }

  await writeJSON("votes.json", votes);

  // Update review vote counts
  const reviewVotes = votes.filter((v) => v.reviewId === reviewId);
  const upvotes = reviewVotes.filter((v) => v.type === "up").length;
  const downvotes = reviewVotes.filter((v) => v.type === "down").length;

  const reviewIdx = reviews.findIndex((r) => r.id === reviewId);
  if (reviewIdx !== -1) {
    reviews[reviewIdx].upvotes = upvotes;
    reviews[reviewIdx].downvotes = downvotes;
    await writeJSON("reviews.json", reviews);
  }

  return { upvotes, downvotes };
}

// Search
export function search(query: string): {
  universities: University[];
  lecturers: Lecturer[];
} {
  const q = query.toLowerCase();
  const universities = readJSON<University[]>("universities.json").filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.acronym.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q)
  );
  const lecturers = readJSON<Lecturer[]>("lecturers.json").filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.department.toLowerCase().includes(q)
  );
  return { universities: universities.slice(0, 20), lecturers: lecturers.slice(0, 20) };
}
