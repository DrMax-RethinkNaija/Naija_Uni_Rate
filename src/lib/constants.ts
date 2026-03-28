import { AbuseTag } from "./types";

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

export const ABUSE_TAG_LABELS: Record<AbuseTag, string> = {
  sexual_harassment: "Sexual Harassment",
  extortion: "Extortion",
  intimidation: "Intimidation",
  grade_manipulation: "Grade Manipulation",
  verbal_abuse: "Verbal Abuse",
};

export const ABUSE_TAG_COLORS: Record<AbuseTag, string> = {
  sexual_harassment: "bg-red-900/50 text-red-300 border-red-700",
  extortion: "bg-orange-900/50 text-orange-300 border-orange-700",
  intimidation: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
  grade_manipulation: "bg-purple-900/50 text-purple-300 border-purple-700",
  verbal_abuse: "bg-pink-900/50 text-pink-300 border-pink-700",
};

export const COMMON_DEPARTMENTS = [
  "Accounting",
  "Agricultural Science",
  "Architecture",
  "Biochemistry",
  "Biology",
  "Business Administration",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science",
  "Economics",
  "Education",
  "Electrical Engineering",
  "English",
  "Environmental Science",
  "Estate Management",
  "Fine Arts",
  "Geography",
  "Geology",
  "History",
  "Industrial Chemistry",
  "International Relations",
  "Law",
  "Library Science",
  "Linguistics",
  "Mass Communication",
  "Mathematics",
  "Mechanical Engineering",
  "Medicine & Surgery",
  "Microbiology",
  "Nursing",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Administration",
  "Sociology",
  "Statistics",
  "Theatre Arts",
] as const;

export const YEAR_OPTIONS = [
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
] as const;
