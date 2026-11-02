"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clients } from "@/data/experience";
import { evalRun, kong } from "@/data/kong";
import { site } from "@/data/site";
import Glow from "@/components/brand/Glow";
import Glint from "@/components/brand/Glint";
import { useGsap } from "@/lib/useGsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The statement, from the CV's profile summary. Words wrapped in [brackets]
 * carry the warm accent.
 */
const statement =
  "I'm Iqram — an engineer in Mumbai with 3+ years of shipping software end to end. [Enterprise API integrations] on-site at a leading private-sector bank. [Live websites] for freelance clients. And an [LLM agent] that diagnoses Kong Gateway through an MCP server I built.";

function tokens(text: string) {
  const out: { word: string; em: boolean }[] = [];
  let em = false;
  for (const raw of text.split(/\s+/)) {
    let w = raw;
    if (w.startsWith("[")) {
      em = true;
      w = w.slice(1);
    }
    const closes = w.includes("]");
    out.push({ word: w.replace("]", ""), em });
    if (closes) em = false;
  }
  return out;
}

/** One figure per track of work. Every value traces to data/. */
const figures = [
  { value: parseInt(site.experienceYears, 10), suffix: "+", label: "Years shipping software", note: "Feb 2023 – present" },
  { value: 3, suffix: "+", label: "Gateway client projects", note: "Kong · Layer7 · Apigee" },
  { value: clients.length, suffix: "", label: "Live client websites", note: "Next.js · Supabase · Shopify" },
  { value: evalRun.passed, suffix: `/${evalRun.cases}`, label: "Agent eval cases passed", note: `Kong MCP agent · ${evalRun.id}` },
];

function Figure({ value, suffix, label, note, run }: (typeof figures)[number] & { run: boolean }) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!run || prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-6">
      <div className="font-display text-5xl font-medium tabular-nums tracking-tightest text-fg md:text-6xl">
        <span aria-hidden>
          {n}
          <span className="text-fg-dim">{suffix}</span>
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </div>
      <div className="text-sm font-medium text-fg">{label}</div>
      <div className="hud">{note}</div>
    </div>
  );
}

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const figuresRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const words = tokens(statement);

  // The statement lights up word by word as it crosses the viewport. It
  // starts from a dim colour, not low opacity, so every state still clears
  // WCAG AA for large text (#66677A is 3.8:1 on the ground).
  useGsap(root, ({ gsap }, el) => {
    const ws = gsap.utils.toArray<HTMLElement>("[data-word]", el);
    gsap.fromTo(
      ws,
      { color: "#66677A" },
      {
        color: (_: number, t: HTMLElement) => (t.dataset.em ? "#C49A76" : "#D9CFC9"),
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 52%", scrub: 0.8 },
      }
    );
  });

  useEffect(() => {
    const el = figuresRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return setRun(true);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRun(true);
        obs.disconnect();
      }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={root} id="intro" className="relative overflow-hidden bg-bg py-28 md:py-40" aria-labelledby="intro-title">
      <Glow tone="warm" className="-right-[24rem] top-[10%] w-[820px] [--glow-opacity:0.28]" />
      <div className="container-site relative">
        <div className="hud flex items-center gap-4">
          <span className="text-warm-soft">Scene 02</span>
          <span aria-hidden className="ticks h-2 flex-1 opacity-40" />
          <span className="hidden sm:inline">Introduction</span>
          <span aria-hidden>02 / 09</span>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="intro-title" className="hud inline-flex items-center gap-2 text-fg-muted">
              <Glint className="w-2.5 text-warm-soft" /> In brief
            </h2>
          </div>
          <p
            data-statement
            className="text-pretty font-display text-[clamp(1.75rem,3.6vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.03em] text-fg lg:col-span-9"
          >
            {words.map((t, i) => (
              <span key={i}>
                <span data-word data-em={t.em ? "" : undefined} className={t.em ? "text-warm-soft" : undefined}>
                  {t.word}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>

        <div ref={figuresRef} className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-32 lg:grid-cols-4 lg:gap-x-10">
          {figures.map((f) => (
            <Figure key={f.label} {...f} run={run} />
          ))}
        </div>
        <p className="hud mt-10 normal-case tracking-normal">
          Eval figure from{" "}
          <Link href={`/projects/${kong.slug}#evaluation`} className="text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
            {kong.title}
          </Link>{" "}
          — {evalRun.caveat}
        </p>
      </div>
    </section>
  );
}
