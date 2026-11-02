"use client";

import { useRef, type CSSProperties } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";
import { cn } from "@/lib/cn";

type SplitTextProps = {
  children: string;
  /** Seconds before the first word moves. */
  delay?: number;
  className?: string;
};

/**
 * A heading line that rises in word by word, each from behind its own mask,
 * once it scrolls into view (from Sky Digital Lab). The text stays one
 * continuous string for assistive technology.
 */
export default function SplitText({ children, delay = 0, className }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useRevealOnce(ref);
  const words = children.split(/\s+/).filter(Boolean);
  return (
    <span ref={ref} data-split="" className={cn("block", className)} style={{ "--split-delay": `${delay}s` } as CSSProperties}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="split-word">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
