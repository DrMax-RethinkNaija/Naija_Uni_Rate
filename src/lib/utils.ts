export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function computeAverage(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

export function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem("rmnl_fingerprint");
  if (!fp) {
    fp = generateId() + generateId();
    localStorage.setItem("rmnl_fingerprint", fp);
  }
  return fp;
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
}

export function ratingColor(rating: number): string {
  if (rating >= 4) return "text-safe";
  if (rating >= 2.5) return "text-warning";
  return "text-danger";
}

export function safetyLabel(rating: number): string {
  if (rating >= 4) return "Safe";
  if (rating >= 2.5) return "Caution";
  return "Unsafe";
}
