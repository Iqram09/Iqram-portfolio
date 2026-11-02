"use client";

import type Lenis from "lenis";

type GsapModule = typeof import("gsap")["gsap"];
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger")["ScrollTrigger"];
export type GsapLib = { gsap: GsapModule; ScrollTrigger: ScrollTriggerModule };

let lenis: Lenis | null = null;
let gsapLib: GsapLib | null = null;
let loading: Promise<GsapLib> | null = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Resolves once the page has loaded and the main thread is idle, so
 * animation code is fetched after the first paint has settled.
 */
export function afterIdle(timeout = 1200): Promise<void> {
  return new Promise((resolve) => {
    const go = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => resolve(), { timeout });
      else setTimeout(resolve, 120);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  });
}

/** Seconds left until `at` seconds after navigation start — for entrances that should keep their timing even when code arrives late. */
export function untilSinceStart(at: number) {
  return Math.max(0, at - performance.now() / 1000);
}

/** Keeps ScrollTrigger in step with Lenis once both exist, whichever loads first. */
function connect() {
  if (lenis && gsapLib) lenis.on("scroll", gsapLib.ScrollTrigger.update);
}

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
  connect();
}

export const getLenis = () => lenis;

/**
 * GSAP is code-split and fetched only after load + idle, the first time a
 * component asks for it, so it never sits in the critical path.
 */
export function loadGsap(): Promise<GsapLib> {
  if (!loading) {
    loading = afterIdle()
      .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
      .then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      gsapLib = { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
      connect();
      return gsapLib;
    });
  }
  return loading;
}

/** In-page navigation through Lenis when it is running, natively otherwise. Keeps focus with the view. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { duration: 1.5 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
  return true;
}
