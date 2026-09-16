"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Reveals children once when they enter the viewport.
 * Pure CSS transition; JS only toggles a class. Reduced-motion users see
 * content immediately (handled in globals.css).
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    // Safety net: never leave content hidden if the observer is never delivered
    // (background tabs, print, some crawlers).
    const fallback = window.setTimeout(() => el.classList.add("is-visible"), 2500);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
