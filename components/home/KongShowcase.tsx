"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { kong, kongImages, type KongImage } from "@/data/kong";
import { LetterGlyph } from "@/components/brand/Letterform";
import { Tag } from "@/components/ui/Bits";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const slides: { image: KongImage; label: string; title: string }[] = [
  { image: kongImages.agentDiagnosis, label: "Agent diagnosis", title: 'npm run agent -- "Why is authentication failing on /payments?"' },
  { image: kongImages.kongRoutes, label: "Seeded gateway", title: "Kong Manager · routes" },
  { image: kongImages.evalExcerpt, label: "Evaluation", title: "evals/results/run-003.md" },
];

const INTERVAL = 6500;

/** Where each sheet lies, by its distance behind the front one. */
const poses = [
  "translate(-50%, -50%) rotate(0deg) scale(1)",
  "translate(-43%, -53%) rotate(5deg) scale(0.93)",
  "translate(-57%, -51%) rotate(-5.5deg) scale(0.9)",
];

/**
 * Size each window to its capture so nothing is letterboxed: the image area
 * takes the largest width that fits both a width and a height budget of the
 * frame (4:5 on phones, 16:9 above).
 */
function fit(img: KongImage, frame: number, maxW: number, maxH: number) {
  const r = img.w / img.h;
  const w = Math.min(maxW, (maxH * r) / frame);
  return { w: `${(w * 100).toFixed(2)}%`, h: `${(((w * frame) / r) * 100).toFixed(2)}%` };
}

/**
 * The Kong preview: real captures from the project as three sheets on a flat
 * ground. Choosing one deals it to the front. They turn over on their own
 * only while in view, pause on hover or focus, and never for reduced motion.
 */
export default function KongShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  // Captures mount only once the frame is near.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return setNear(true);
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearObs.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    obs.observe(el);
    nearObs.observe(el);
    return () => {
      obs.disconnect();
      nearObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, inView]);

  return (
    <div
      ref={root}
      className="on-dark relative aspect-[4/5] overflow-hidden rounded-[4px] bg-cobalt sm:aspect-[4/3] md:aspect-video"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <LetterGlyph letter="q" className="absolute -bottom-[34%] right-[4%] h-[128%] w-auto text-[#2A4BD0]" />

      {slides.map((s, i) => {
        const depth = (i - index + slides.length) % slides.length;
        const sm = fit(s.image, 4 / 5, 0.86, 0.6);
        const md = fit(s.image, 16 / 9, 0.74, 0.7);
        return (
          <figure
            key={s.label}
            aria-hidden={depth !== 0}
            style={
              {
                "--w-sm": sm.w,
                "--h-sm": sm.h,
                "--w-md": md.w,
                "--h-md": md.h,
                transform: poses[depth],
                zIndex: 3 - depth,
              } as CSSProperties
            }
            className="absolute left-1/2 top-[46%] flex h-[calc(var(--h-sm)+34px)] w-[var(--w-sm)] flex-col overflow-hidden rounded-lg bg-bg-1 shadow-[0_40px_90px_-30px_rgba(0,0,0,.6)] transition-transform duration-[1100ms] ease-out-expo md:top-[48%] md:h-[calc(var(--h-md)+34px)] md:w-[var(--w-md)]"
          >
            <figcaption className="flex h-[34px] shrink-0 items-center gap-3 border-b border-line px-3.5">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2 w-2 rounded-full bg-bg-3" />
                <i className="h-2 w-2 rounded-full bg-bg-3" />
                <i className="h-2 w-2 rounded-full bg-bg-3" />
              </span>
              <span className="truncate font-mono text-[12px] text-fg-muted">{s.title}</span>
            </figcaption>
            <div className={cn("relative flex-1", i === 1 ? "bg-bg-1" : "bg-term")}>
              {near ? (
                <Image src={s.image.src} alt={s.image.alt} fill quality={90} sizes="(min-width: 1280px) 960px, (min-width: 768px) 74vw, 86vw" className="object-cover object-top" />
              ) : null}
            </div>
          </figure>
        );
      })}

      <Tag className="absolute left-4 top-4 z-10 md:left-6 md:top-6">Captured {kong.capturedOn}</Tag>

      <div role="tablist" aria-label="Project captures" className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-1.5 md:bottom-6 md:left-6 md:gap-2">
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            type="button"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "relative overflow-hidden whitespace-nowrap px-2.5 py-2 text-[14px] leading-tight tracking-[-0.01em] transition-colors duration-300 md:px-3",
              i === index ? "bg-bg-1 text-fg" : "bg-black/25 text-white hover:bg-black/45"
            )}
          >
            <span className="tabular-nums opacity-70">0{i + 1}</span> {s.label}
            {i === index && !paused && inView && (
              <span
                aria-hidden
                key={`p-${index}`}
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left animate-[progress_6.5s_linear_forwards] bg-accent motion-reduce:hidden"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
