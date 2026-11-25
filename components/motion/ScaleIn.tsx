"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/useGsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Starting scale. */
  from?: number;
};

/**
 * Grows a card to full size as it rises into the viewport. Scroll-linked and
 * transform-only, so it never runs ahead of the reader; static for reduced
 * motion.
 */
export default function ScaleIn({ children, className, from = 0.8 }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(root, ({ gsap }, el) => {
    gsap.fromTo(
      el.firstElementChild,
      { scale: from },
      { scale: 1, ease: "none", transformOrigin: "50% 100%", scrollTrigger: { trigger: el, start: "top 100%", end: "top 38%", scrub: 0.6 } }
    );
  });

  return (
    <div ref={root} className={className}>
      <div>{children}</div>
    </div>
  );
}
