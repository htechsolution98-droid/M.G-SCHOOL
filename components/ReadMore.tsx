"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
  limit?: number;
  className?: string;
}

export default function ReadMore({ text, limit = 150, className = "" }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;

  return (
    <span className={className}>
      {isLong && !expanded ? text.slice(0, limit) + "…" : text}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-sm font-black text-primary uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer whitespace-nowrap"
        >
          {expanded ? "Read Less ▲" : "Read More ▼"}
        </button>
      )}
    </span>
  );
}
