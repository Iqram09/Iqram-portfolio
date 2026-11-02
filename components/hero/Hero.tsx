"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import GlassSphere from "@/components/hero/GlassSphere";
import Glow from "@/components/brand/Glow";
import PointerParallax from "@/components/brand/PointerParallax";
import CutLine from "@/components/brand/CutLine";
import Viewfinder from "@/components/brand/Viewfinder";
import MumbaiClock from "@/components/brand/MumbaiClock";
import { ArrowDown, ArrowRight, Download } from "@/components/ui/Icons";
import { useGsap } from "@/lib/useGsap";
import { untilSinceStart } from "@/lib/motion";

const lines = ["I build", "intelligent", "systems."];

/**
 * Scene 01. The headline rises in CSS (it is the LCP element and must paint
 * before hydration); GSAP then brings in the identity, copy, calls to action
 * and HUD, and on desktop eases the whole composition back as the visitor
 * scrolls into the story.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap }, el) => {
    const intro = gsap.utils.toArray<HTMLElement>("[data-hero-intro]", el);
    // Past the CSS failsafe (3.2 s) the copy is already showing — don't replay it.
    const late = performance.now() > 3000;
    if (!late) gsap.set(intro, { opacity: 0, y: 18 });
    intro.forEach((n) => (n.dataset.introDone = ""));
    if (!late) gsap.to(intro, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.09, delay: untilSinceStart(0.9), clearProps: "transform" });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to("[data-hero-copy]", { yPercent: -14, opacity: 0.15, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-sphere]", { yPercent: 18, scale: 0.82, opacity: 0.35, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  });

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night"
      aria-labelledby="hero-title"
    >
      {/* Atmosphere: navy above, warm black below, reeded glass behind the sphere. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020309_0%,#060914_46%,#050200_100%)]" />
        <div className="absolute inset-y-0 right-0 w-full bg-reeded opacity-70 [mask-image:radial-gradient(55%_70%_at_70%_40%,black,transparent)] lg:w-[68%]" />
        <span className="light-streak absolute right-[33%] top-[4%] h-[60%] w-[3px] bg-gradient-to-b from-transparent via-accent/15 to-transparent blur-[3px]" />
        <PointerParallax depth={-22}>
          <Glow tone="blue" drift className="-top-[16rem] right-[-10rem] w-[min(1100px,140vw)] [--glow-opacity:0.38]" />
          <Glow tone="lavender" className="right-[18%] top-[30%] w-[420px] [--glow-opacity:0.12]" />
        </PointerParallax>
        <Glow tone="warm" className="-bottom-[22rem] -left-[18rem] w-[900px] [--glow-opacity:0.42]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* The object. */}
      <div
        data-hero-sphere
        className="pointer-events-none absolute left-1/2 top-[13svh] -translate-x-1/2 lg:left-auto lg:right-[5vw] lg:top-[15svh] lg:translate-x-0"
      >
        <GlassSphere className="[--size:min(74vw,360px)] sm:[--size:min(60vw,440px)] lg:[--size:clamp(440px,42vw,640px)]" />
      </div>

      {/* HUD frame (decorative). */}
      <div aria-hidden className="pointer-events-none absolute inset-3 hidden md:block lg:inset-5">
        <Viewfinder />
        <span className="hud absolute left-3 top-1/2 hidden -translate-y-1/2 rotate-180 whitespace-nowrap [writing-mode:vertical-rl] lg:block">
          {site.coordinates}
        </span>
        <span className="hud absolute right-5 top-[5.5rem] hidden lg:block">Scene 01 / Intro</span>
        <div className="absolute inset-x-10 bottom-12 ticks opacity-50" />
      </div>
      <CutLine
        animate
        glint={0.62}
        className="left-[-10%] top-[41svh] h-[6svh] w-[120%] opacity-70 sm:top-[50svh] lg:left-[40%] lg:top-auto lg:bottom-[21%] lg:h-[8%] lg:w-[65%]"
      />

      {/* Copy. */}
      <div data-hero-copy className="container-site relative z-10 mt-auto pb-24 pt-[calc(var(--nav-h)+42svh)] sm:pt-[calc(var(--nav-h)+48svh)] md:pb-28 lg:pt-[calc(var(--nav-h)+16svh)]">
        <p data-hero-intro data-intro="" className="hud flex flex-wrap items-center gap-x-3 gap-y-2 text-fg-muted">
          <span className="h-px w-8 bg-warm" aria-hidden />
          {site.identity.split(" | ").map((part, i) => (
            <span key={part} className="inline-flex items-center gap-3">
              {i > 0 && (
                <>
                  <span aria-hidden className="hidden text-line-strong sm:inline">|</span>
                  <span className="sr-only">, </span>
                </>
              )}
              {part}
            </span>
          ))}
        </p>

        <h1 id="hero-title" className="display mt-5 text-[clamp(2.9rem,10.4vw,10.75rem)] lg:mt-7">
          {lines.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line-rise text-chrome" style={{ animationDelay: `${120 + i * 120}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-12 lg:grid-cols-12">
          {/* On phones this paragraph is the LCP element: it rises but never starts transparent. */}
          <p className="rise-only max-w-md text-pretty text-[17px] leading-relaxed text-fg-muted [animation-delay:380ms] lg:col-span-5">
            {site.intro}
          </p>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:items-end">
            <div data-hero-intro data-intro="" className="flex flex-wrap items-center gap-3">
              <Button href="/#work">
                Selected work <ArrowRight size={16} />
              </Button>
              <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
                <Download size={16} /> Download CV
              </Button>
            </div>
            <div data-hero-intro data-intro="" className="hud flex flex-wrap items-center gap-x-6 gap-y-2 text-fg-muted">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 node-pulse" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                </span>
                {site.availability}
              </span>
              <span>{site.location}</span>
              <span className="inline-flex items-center gap-2">
                IST <MumbaiClock className="tabular-nums text-fg" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue. */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="relative h-8 w-px overflow-hidden bg-line-strong">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-fg" />
        </span>
        <ArrowDown size={12} className="text-fg-dim" />
      </div>
    </section>
  );
}
