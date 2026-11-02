"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type PointerParallaxProps = {
  /** Furthest the layer travels, in px. Negative values move against the pointer. */
  depth?: number;
  className?: string;
  children: ReactNode;
};

/**
 * A decorative layer that drifts gently with the pointer and eases back
 * (from Sky Digital Lab). Fills its positioned parent; off for touch and
 * reduced motion.
 */
export default function PointerParallax({ depth = 28, className, children }: PointerParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer || !hasFinePointer() || prefersReducedMotion()) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      layer.style.translate = `${(x * depth).toFixed(2)}px ${(y * depth).toFixed(2)}px`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [depth]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {children}
    </div>
  );
}
