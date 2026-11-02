"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Glint from "@/components/brand/Glint";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

/*
 * A horizon of light (adapted from Sky Digital Lab's CutLine): a thin curve
 * rising left to right across its box — quadratic from (0,100) through
 * (520,38) to (1000,0) in a 1000×100 box. It draws in, a glint glides up to
 * rest on it, and every few seconds a beam travels the line and the glint
 * flares as the light passes.
 */
const PATH = "M0,100Q520,38 1000,0";

function pointAt(t: number) {
  const u = 1 - t;
  return { x: (2 * u * t * 520 + t * t * 1000) / 10, y: u * u * 100 + 2 * u * t * 38 };
}
function pointAtX(x: number) {
  return pointAt((1040 - Math.sqrt(1040 * 1040 - 1600 * x)) / 80);
}

// Keep in step with `cut-sweep` / `glint-flare` in globals.css.
const SWEEP_DELAY = 2.6;
const CYCLE = 9;
const BEAM = 0.3;
const FLARE_PEAK = 0.03;
function flareDelay(x: number) {
  const position = (x / 100 - BEAM / 2) / (1 - BEAM);
  return SWEEP_DELAY + ((position + 0.45) / 1.9) * 0.4 * CYCLE - FLARE_PEAK * CYCLE;
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type CutLineProps = {
  className?: string;
  /** Where the glint rests along the line (0–1), or `false` for none. */
  glint?: number | false;
  glintClassName?: string;
  animate?: boolean;
  /** Line colour class. */
  tone?: string;
};

export default function CutLine({
  className,
  glint = 0.64,
  glintClassName = "w-4 text-accent-soft",
  animate = false,
  tone = "text-warm",
}: CutLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGSVGElement>(null);
  const travelRef = useRef<HTMLSpanElement>(null);
  const arrivalRef = useRef<HTMLSpanElement>(null);
  const rest = glint === false ? null : pointAt(glint);

  useEffect(() => {
    const root = rootRef.current;
    if (!animate || !root) return;
    if (prefersReducedMotion() || typeof root.animate !== "function") {
      root.dataset.ready = "";
      return;
    }
    const resting = glint === false ? null : pointAt(glint);
    const animations: Animation[] = [];
    if (baseRef.current) {
      animations.push(
        baseRef.current.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], {
          duration: 1800,
          delay: 300,
          easing: EASE,
          fill: "both",
        })
      );
    }
    if (resting && travelRef.current && arrivalRef.current) {
      const steps = 40;
      const glide = Array.from({ length: steps + 1 }, (_, i) => {
        const p = pointAtX((resting.x * i) / steps);
        return { transform: `translate(${p.x}%, ${p.y}%)` };
      });
      animations.push(
        travelRef.current.animate(glide, { duration: 2600, delay: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "both" }),
        arrivalRef.current.animate(
          [
            { opacity: 0, transform: "scale(0.25) rotate(-90deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          { duration: 1800, delay: 700, easing: EASE, fill: "both" }
        )
      );
    }
    root.dataset.ready = "";
    return () => animations.forEach((a) => a.cancel());
  }, [animate, glint]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-cut-intro={animate ? "" : undefined}
      className={cn("cut-line pointer-events-none absolute", className)}
    >
      <svg
        ref={baseRef}
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        focusable="false"
        className={cn("cut-base absolute inset-0 h-full w-full overflow-visible", tone)}
      >
        <path d={PATH} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {animate ? (
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          focusable="false"
          className="cut-light absolute inset-0 h-full w-full overflow-visible text-accent-soft"
        >
          <path d={PATH} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}
      {rest ? (
        // A box-sized layer, so translate percentages are percentages of the line's box.
        <span ref={travelRef} className="cut-glint absolute inset-0" style={{ transform: `translate(${rest.x}%, ${rest.y}%)` }}>
          <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <span ref={arrivalRef} className="relative block">
              {animate ? <span className="glint-halo" /> : null}
              <span
                className={cn("relative block", animate && "glint-flare")}
                style={animate ? ({ animationDelay: `${flareDelay(rest.x)}s` } as CSSProperties) : undefined}
              >
                <Glint className={cn("block", glintClassName)} />
              </span>
            </span>
          </span>
        </span>
      ) : null}
    </div>
  );
}
