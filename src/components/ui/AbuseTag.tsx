import { AbuseTag as AbuseTagType } from "@/lib/types";
import { ABUSE_TAG_LABELS, ABUSE_TAG_COLORS } from "@/lib/constants";

interface AbuseTagProps {
  tag: AbuseTagType;
  count?: number;
}

export default function AbuseTag({ tag, count }: AbuseTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${ABUSE_TAG_COLORS[tag]}`}
    >
      {ABUSE_TAG_LABELS[tag]}
      {count !== undefined && count > 0 && (
        <span className="opacity-70">({count})</span>
      )}
    </span>
  );
}
