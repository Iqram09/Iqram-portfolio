"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/useGsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Corner radius kept while clipping, in px. */
  radius?: number;
};

/**
 * Opens an image from a clipped window as it scrolls into view, while the
 * image inside settles from a slight zoom — a cinematic cut-in. Scroll-linked
 * (scrubbed), so it never runs ahead of the reader; static for reduced motion.
 */
export default function ClipReveal({ children, className, radius = 24 }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(root, ({ gsap }, el) => {
    const inner = el.querySelector("[data-clip-inner]");
    const st = { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.8 };
    gsap.fromTo(
      el,
      { clipPath: `inset(12% 10% 12% 10% round ${radius}px)` },
      { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, ease: "none", scrollTrigger: st }
    );
    if (inner) gsap.fromTo(inner, { scale: 1.14 }, { scale: 1, ease: "none", scrollTrigger: st });
  });

  return (
    <div ref={root} className={cn("relative overflow-hidden", className)} style={{ borderRadius: radius }}>
      <div data-clip-inner className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
