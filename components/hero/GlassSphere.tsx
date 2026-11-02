"use client";

import { useRef, type CSSProperties } from "react";
import { useGsap } from "@/lib/useGsap";
import { hasFinePointer, untilSinceStart } from "@/lib/motion";
import { cn } from "@/lib/cn";

const FINS = 18;

/**
 * The hero object: a glass sphere built from translucent meridian fins and
 * latitude rings in CSS 3D, under a camera-facing shell that carries the
 * specular highlight, bounce light and fresnel rim. The slow spin and float
 * are CSS (compositor-only, stopped for reduced motion); GSAP adds the
 * entrance and a gentle tilt toward the pointer on fine-pointer devices.
 *
 * Why not WebGL: a CSS build costs no extra JavaScript, renders on the server
 * as its own static fallback, and keeps the hero's main thread free.
 */
export default function GlassSphere({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGsap(root, ({ gsap }, el) => {
    if (performance.now() < 3000) gsap.fromTo(
      el,
      { opacity: 0, scale: 0.86, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 2.4, ease: "power3.out", delay: untilSinceStart(0.6), clearProps: "opacity" }
    );
    el.dataset.introDone = "";

    if (!hasFinePointer() || !tilt.current) return;
    const rx = gsap.quickTo(tilt.current, "rotationX", { duration: 1.4, ease: "power3.out" });
    const ry = gsap.quickTo(tilt.current, "rotationY", { duration: 1.4, ease: "power3.out" });
    const tx = gsap.quickTo(tilt.current, "x", { duration: 1.8, ease: "power3.out" });
    const ty = gsap.quickTo(tilt.current, "y", { duration: 1.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      ry(nx * 16);
      rx(-ny * 12);
      tx(nx * 18);
      ty(ny * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  return (
    <div ref={root} data-intro="" aria-hidden className={cn("sphere", className)}>
      <div className="sphere-float">
        <div ref={tilt} className="sphere-tilt">
          <div className="sphere-axis">
            <div className="sphere-spin">
              <div className="sphere-fins">
                {Array.from({ length: FINS }, (_, i) => (
                  <span key={i} className="sphere-fin" style={{ "--i": i, "--n": FINS } as CSSProperties} />
                ))}
              </div>
              <div className="sphere-rings">
                <span className="sphere-ring sphere-ring-0" />
                <span className="sphere-ring sphere-ring-1" />
                <span className="sphere-ring sphere-ring-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="sphere-core" />
        <div className="sphere-shell" />
      </div>
      <div className="sphere-floor" />
    </div>
  );
}
