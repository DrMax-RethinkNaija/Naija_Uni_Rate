"use client";

import { useState } from "react";
import { getFingerprint } from "@/lib/utils";

interface VoteButtonsProps {
  reviewId: string;
  initialUpvotes: number;
  initialDownvotes: number;
}

export default function VoteButtons({
  reviewId,
  initialUpvotes,
  initialDownvotes,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [voting, setVoting] = useState(false);

  const vote = async (type: "up" | "down") => {
    if (voting) return;
    setVoting(true);
    try {
      const res = await fetch(`/api/reviews/${reviewId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fingerprint: getFingerprint() }),
      });
      if (res.ok) {
        const data = await res.json();
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
      }
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        onClick={() => vote("up")}
        className="flex items-center gap-1 text-gray-400 hover:text-naija-green transition-colors"
        aria-label="Upvote"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span>{upvotes}</span>
      </button>
      <button
        onClick={() => vote("down")}
        className="flex items-center gap-1 text-gray-400 hover:text-danger transition-colors"
        aria-label="Downvote"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span>{downvotes}</span>
      </button>
    </div>
  );
}
