"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { loadGsap, prefersReducedMotion, type GsapLib } from "@/lib/motion";

type Setup = (lib: GsapLib, scope: HTMLElement) => void | (() => void);

/**
 * Runs a GSAP setup inside a `gsap.context` scoped to `scope`, after GSAP has
 * loaded. Everything it creates is reverted on unmount. Skipped entirely for
 * reduced motion unless `allowReduced` is set.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: Setup, deps: DependencyList = [], allowReduced = false) {
  useEffect(() => {
    if (!allowReduced && prefersReducedMotion()) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    loadGsap().then((lib) => {
      const el = scope.current;
      if (cancelled || !el) return;
      let cleanup: void | (() => void);
      const ctx = lib.gsap.context(() => {
        cleanup = setup(lib, el);
      }, el);
      revert = () => {
        if (typeof cleanup === "function") cleanup();
        ctx.revert();
      };
    });
    return () => {
      cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
