"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, prefersReducedMotion, registerLenis } from "@/lib/motion";

/**
 * Lenis smoothing for wheel input only (configuration from Sky Digital Lab).
 * Scrolling stays native underneath — keyboard, touch, find-in-page and
 * scrollbars behave as usual — and it never starts for reduced motion.
 * Anchor targets clear the floating nav via `scroll-margin-top`, which Lenis
 * honours.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    registerLenis(lenis);
    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  // A new route changes the page height.
  useEffect(() => {
    getLenis()?.resize();
  }, [pathname]);

  return null;
}
