"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marks the element with `data-revealed` the first time it scrolls into view
 * (pattern from Sky Digital Lab). Hidden starting states live in CSS and only
 * apply while JS runs and motion is welcome.
 */
export function useRevealOnce(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      element.dataset.revealed = "";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.revealed = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}
