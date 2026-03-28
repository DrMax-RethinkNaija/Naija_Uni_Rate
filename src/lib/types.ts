export type AbuseTag =
  | "sexual_harassment"
  | "extortion"
  | "intimidation"
  | "grade_manipulation"
  | "verbal_abuse";

export interface University {
  id: string;
  name: string;
  slug: string;
  acronym: string;
  type: "federal" | "state" | "private";
  state: string;
  departments: string[];
}

export interface Lecturer {
  id: string;
  name: string;
  universityId: string;
  department: string;
  courses: string[];
  avgTeachingRating: number;
  avgSafetyRating: number;
  reviewCount: number;
  abuseTags: Partial<Record<AbuseTag, number>>;
  createdAt: string;
}

export interface Review {
  id: string;
  lecturerId: string;
  universityId: string;
  department: string;
  courseCode: string | null;
  teachingRating: number;
  safetyRating: number;
  reviewText: string;
  yearInfo: string;
  abuseTags: AbuseTag[];
  status: "unreviewed" | "reviewed";
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

export interface Vote {
  reviewId: string;
  fingerprint: string;
  type: "up" | "down";
  createdAt: string;
}
