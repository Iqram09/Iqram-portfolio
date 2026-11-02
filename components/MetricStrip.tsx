"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clients } from "@/data/experience";
import { evalRun, kong } from "@/data/kong";
import { site } from "@/data/site";

/** One figure per track of work on the CV. Every value traces to data/. */
const highlights = [
  { value: parseInt(site.experienceYears, 10), suffix: "+", label: "Years shipping software", note: "Feb 2023 – present" },
  { value: 3, suffix: "+", label: "Gateway client projects", note: "Kong · Layer7 · Apigee" },
  { value: clients.length, suffix: "", label: "Live client websites", note: "Next.js · Supabase · Shopify" },
  { value: evalRun.passed, suffix: `/${evalRun.cases}`, label: "Agent eval cases passed", note: `Kong MCP agent · ${evalRun.id}` },
];

function useCountUp(target: number, run: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function Metric({
  value,
  suffix,
  label,
  note,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  run: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className="flex flex-col gap-1.5 py-6 md:py-8">
      <div className="font-mono text-4xl font-medium tabular-nums tracking-tight text-fg md:text-[2.75rem]">
        {/* Final value is in the DOM for screen readers; animation is visual only. */}
        <span aria-hidden>{n}{suffix}</span>
        <span className="sr-only">{value}{suffix}</span>
      </div>
      <div className="text-sm font-medium text-fg">{label}</div>
      <div className="truncate font-mono text-[11px] text-fg-dim">{note}</div>
    </div>
  );
}

/** Four career highlights. Counts up once, when visible. */
export default function MetricStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    const fallback = window.setTimeout(() => setRun(true), 2500);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section aria-label="Highlights" className="border-y border-line bg-bg-1/60">
      <div ref={ref} className="container-site">
        <div className="grid grid-cols-2 divide-y divide-line md:grid-cols-4 md:divide-x md:divide-y-0">
          {highlights.map((m, i) => (
            <div key={m.label} className={i % 2 === 1 ? "border-l border-line pl-6 md:border-l-0 md:pl-8" : "md:pr-8 [&:not(:first-child)]:md:pl-8"}>
              <Metric value={m.value} suffix={m.suffix} label={m.label} note={m.note} run={run} />
            </div>
          ))}
        </div>
        <p className="border-t border-line py-3 font-mono text-[11px] text-fg-dim">
          Eval figure from{" "}
          <Link href={`/projects/${kong.slug}#evaluation`} className="text-fg-muted underline-offset-4 hover:text-fg hover:underline">
            {kong.title}
          </Link>{" "}
          · {evalRun.caveat}
        </p>
      </div>
    </section>
  );
}
