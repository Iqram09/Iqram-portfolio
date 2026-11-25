"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clients } from "@/data/experience";
import { evalRun, kong } from "@/data/kong";
import { site } from "@/data/site";
import { useGsap } from "@/lib/useGsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** One figure per track of work. Every value traces to data/. */
const figures = {
  years: { value: parseInt(site.experienceYears, 10), suffix: "+", label: "Years shipping software", note: "Feb 2023 – present" },
  gateways: { value: 3, suffix: "+", label: "Gateway client projects", note: "Kong · Layer7 · Apigee" },
  sites: { value: clients.length, suffix: "", label: "Live client websites", note: "Next.js · Supabase · Shopify" },
  evals: { value: evalRun.passed, suffix: `/${evalRun.cases}`, label: "Agent eval cases passed", note: `Kong MCP agent · ${evalRun.id}` },
};

type FigureKey = keyof typeof figures;

/**
 * The statement, from the CV's profile summary: each claim is followed by the
 * figure that backs it. Words wrapped in [brackets] take the accent.
 */
const claims: { text: string; figure: FigureKey }[] = [
  { text: "I’m Iqram — an engineer in Mumbai with 3+ years of shipping software end to end.", figure: "years" },
  { text: "[Enterprise API integrations] on-site at a leading private-sector bank.", figure: "gateways" },
  { text: "[Live websites] for freelance clients.", figure: "sites" },
  { text: "And an [LLM agent] that diagnoses Kong Gateway through an MCP server I built.", figure: "evals" },
];

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

const plain = claims.map((c) => c.text.replace(/[[\]]/g, "")).join(" ");

/* Each receipt is its own small object, set into the line of type. */
const looks: Record<FigureKey, { box: string; num: string; tilt: number }> = {
  years: { box: "bg-camel text-fg", num: "text-fg", tilt: -4 },
  gateways: { box: "bg-cobalt text-white", num: "text-white", tilt: 3 },
  sites: { box: "bg-leaf text-white rounded-full pl-[0.34em] pr-[0.42em]", num: "text-white", tilt: -3 },
  evals: { box: "bg-accent text-white", num: "text-accent-soft", tilt: 4 },
};

function Receipt({ id }: { id: FigureKey }) {
  const { value, suffix, label, note } = figures[id];
  const look = looks[id];
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  // Counts up once, when it arrives.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    let raf = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1300);
          setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.8 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      data-receipt={look.tilt}
      style={{ transform: `rotate(${look.tilt}deg)` }}
      className={cn(
        "mx-[0.06em] inline-flex h-[0.94em] min-h-[52px] items-center gap-[0.16em] whitespace-nowrap rounded-[4px] px-[0.2em] align-middle font-sans leading-none tracking-normal shadow-[0_18px_34px_-18px_rgba(22,22,22,.5)]",
        look.box
      )}
    >
      <span aria-hidden className={cn("font-display text-[0.78em] font-medium tabular-nums tracking-[-0.03em]", look.num)}>
        {n}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}{" "}
      </span>
      <span className="flex flex-col gap-1 text-left">
        <span className="text-[13px] font-semibold leading-none tracking-[-0.01em] md:text-[15px]">{label}</span>
        <span className="text-[12px] leading-none opacity-85 md:text-[13px]">{note}</span>
      </span>
    </span>
  );
}

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  // The statement inks in letter by letter as it crosses the viewport. It
  // starts from a mid grey, not low opacity, so every state still clears
  // WCAG AA for large text (#8B8B87 is 3.2:1 on the ground).
  useGsap(root, ({ gsap }, el) => {
    const chars = gsap.utils.toArray<HTMLElement>("[data-char]", el);
    gsap.fromTo(
      chars,
      { color: "#8B8B87" },
      {
        color: (_: number, t: HTMLElement) => (t.dataset.em !== undefined ? "#7F1330" : "#161616"),
        ease: "none",
        duration: 0.4,
        stagger: 0.04,
        scrollTrigger: { trigger: "[data-statement]", start: "top 76%", end: "bottom 62%", scrub: 0.6 },
      }
    );
    gsap.utils.toArray<HTMLElement>("[data-receipt]", el).forEach((r) => {
      const tilt = Number(r.dataset.receipt);
      gsap.fromTo(
        r,
        { scale: 0.55, opacity: 0, rotation: tilt * -3 },
        { scale: 1, opacity: 1, rotation: tilt, duration: 0.9, ease: "back.out(1.7)", scrollTrigger: { trigger: r, start: "top 88%", once: true } }
      );
    });
  });

  return (
    <section ref={root} id="intro" className="bg-bg-2 py-24 md:py-36" aria-labelledby="intro-title">
      <div className="container-site">
        <h2 id="intro-title" className="eyebrow">
          In brief
        </h2>

        <div
          data-statement
          className="mt-12 font-display text-[clamp(2.2rem,6.1vw,5.75rem)] font-normal leading-[1.1] tracking-[-0.025em] md:mt-16 [&>*]:leading-[1.1]"
        >
          <p className="sr-only">{plain}</p>
          {claims.map((c, ci) => (
            <span key={c.figure} className="max-md:mb-6 max-md:block">
              <span aria-hidden className={ci === 0 ? "md:ml-[1.4em]" : undefined}>
                {tokens(c.text).map((t, i) => (
                  <span key={i}>
                    <span className="whitespace-nowrap">
                      {Array.from(t.word).map((ch, j) => (
                        <span key={j} data-char data-em={t.em ? "" : undefined} className={t.em ? "text-accent" : undefined}>
                          {ch}
                        </span>
                      ))}
                    </span>{" "}
                  </span>
                ))}
              </span>
              <span className="max-md:mt-2 max-md:block">
                <Receipt id={c.figure} />{" "}
              </span>
            </span>
          ))}
        </div>

        <p className="mt-14 max-w-xl text-[15px] leading-relaxed text-fg-muted md:mt-20">
          Eval figure from{" "}
          <Link
            href={`/projects/${kong.slug}#evaluation`}
            className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
          >
            {kong.title}
          </Link>{" "}
          — {evalRun.caveat}
        </p>
      </div>
    </section>
  );
}
