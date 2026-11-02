"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useRevealOnce } from "@/lib/useRevealOnce";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  className?: string;
  as?: ElementType;
};

/**
 * The standard entrance: a short rise + fade once in view (Sky Digital Lab's
 * pattern). Server and client render identical markup — the hidden state
 * lives in CSS and applies only when JS runs and motion is welcome.
 */
export default function Reveal({ children, delay = 0, y = 24, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useRevealOnce(ref);
  const style = { "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <Tag ref={ref} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
