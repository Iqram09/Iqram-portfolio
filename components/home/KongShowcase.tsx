"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { kong, kongImages, type KongImage } from "@/data/kong";
import Viewfinder from "@/components/brand/Viewfinder";
import Glow from "@/components/brand/Glow";
import { useGsap } from "@/lib/useGsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const slides: { image: KongImage; label: string; title: string }[] = [
  { image: kongImages.agentDiagnosis, label: "Agent diagnosis", title: 'npm run agent -- "Why is authentication failing on /payments?"' },
  { image: kongImages.kongRoutes, label: "Seeded gateway", title: "Kong Manager · routes" },
  { image: kongImages.evalExcerpt, label: "Evaluation", title: "evals/results/run-003.md" },
];

const INTERVAL = 6500;

/**
 * Size each window to its capture so nothing is letterboxed: the image area
 * takes the largest width that fits both a width and a height budget of the
 * frame (4:3 on phones, 16:9 above).
 */
function fit(img: KongImage, frame: number, maxW: number, maxH: number) {
  const r = img.w / img.h;
  const w = Math.min(maxW, (maxH * r) / frame);
  return { w: `${(w * 100).toFixed(2)}%`, h: `${(((w * frame) / r) * 100).toFixed(2)}%` };
}

/**
 * The Kong preview: real captures from the project, cross-fading in a 16:9
 * frame. The frame opens from a clipped window as it scrolls in; slides
 * advance on their own only while in view, pause on hover or focus, and
 * never auto-advance for reduced motion.
 */
export default function KongShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  // Captures mount only once the frame is near, and only the current and next.
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  useGsap(root, ({ gsap }, el) => {
    gsap.fromTo(
      "[data-clip]",
      { clipPath: "inset(10% 8% 10% 8% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 92%", end: "top 30%", scrub: 0.8 },
      }
    );
    gsap.fromTo("[data-zoom]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 30%", scrub: 0.8 } });
  });

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    const nearObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        nearObs.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    obs.observe(el);
    nearObs.observe(el);
    return () => {
      obs.disconnect();
      nearObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    setMounted((m) => new Set(Array.from(m).concat(index, (index + 1) % slides.length)));
  }, [index, inView]);

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, inView]);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-night md:aspect-video">
        <div data-zoom className="absolute inset-0">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,#0b1020,#020309_70%)]" />
          <div aria-hidden className="absolute inset-0 bg-reeded opacity-60" />
          <Glow tone="blue" className="-top-1/3 left-1/2 w-[110%] -translate-x-1/2 [--glow-opacity:0.3]" />

          {slides.map((s, i) => {
            const sm = fit(s.image, 4 / 3, 0.9, 0.66);
            const md = fit(s.image, 16 / 9, 0.8, 0.68);
            return (
            <figure
              key={s.label}
              aria-hidden={i !== index}
              style={{ "--w-sm": sm.w, "--h-sm": sm.h, "--w-md": md.w, "--h-md": md.h } as CSSProperties}
              className={cn(
                "glass absolute left-1/2 top-[45%] flex h-[calc(var(--h-sm)+34px)] w-[var(--w-sm)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-night-1/90 transition-[opacity,transform] duration-[1200ms] ease-out-expo md:h-[calc(var(--h-md)+34px)] md:w-[var(--w-md)]",
                i === index ? "opacity-100" : "pointer-events-none scale-[0.985] opacity-0"
              )}
            >
              <figcaption className="relative flex h-[34px] shrink-0 items-center gap-3 border-b border-fg/[0.07] bg-fg/[0.03] px-3.5">
                <span className="flex gap-1.5" aria-hidden>
                  <i className="h-2 w-2 rounded-full bg-fg/15" />
                  <i className="h-2 w-2 rounded-full bg-fg/15" />
                  <i className="h-2 w-2 rounded-full bg-fg/15" />
                </span>
                <span className="truncate font-mono text-[10.5px] text-fg-muted">{s.title}</span>
              </figcaption>
              <div className="relative flex-1 bg-[#0c0c10]">
                {near && mounted.has(i) ? (
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1320px) 920px, (min-width: 768px) 76vw, 90vw"
                  className="object-cover object-top"
                />
                ) : null}
              </div>
            </figure>
            );
          })}
        </div>

        {/* Glass detail overlays. */}
        <div className="glass glass-blur absolute left-4 top-4 hidden items-center gap-2 rounded-full px-3 py-1.5 md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
          <span className="hud text-fg-muted">Captured {kong.capturedOn}</span>
        </div>
        <Viewfinder inset="inset-4 md:inset-6" />
      </div>

      {/* Slide controls. */}
      <div role="tablist" aria-label="Project captures" className="glass glass-blur glass-strong absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full p-1 md:bottom-6">
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            type="button"
            aria-selected={i === index}
            onClick={() => {
              setMounted((m) => new Set(Array.from(m).concat(i)));
              setIndex(i);
            }}
            className={cn(
              "relative overflow-hidden whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors duration-300 md:px-4",
              i === index ? "bg-fg/10 text-fg" : "text-fg-dim hover:text-fg"
            )}
          >
            <span className="tabular-nums text-warm-soft">0{i + 1}</span> <span className="hidden sm:inline">{s.label}</span>
            {i === index && !paused && inView && (
              <span
                aria-hidden
                key={`p-${index}`}
                className="absolute inset-x-3 bottom-0.5 h-px origin-left animate-[progress_6.5s_linear_forwards] bg-accent/70"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
