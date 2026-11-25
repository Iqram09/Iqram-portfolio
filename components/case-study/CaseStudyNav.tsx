"use client";

import { useEffect, useState } from "react";
import { caseSections } from "./sections";
import { cn } from "@/lib/cn";

/** Sticky table of contents with an active-section indicator. Desktop only; a compact strip on mobile. */
export default function CaseStudyNav() {
  const [active, setActive] = useState<string>(caseSections[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = caseSections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.05] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Case study sections" className="lg:sticky lg:top-28">
      <p className="label mb-3 hidden lg:block">contents</p>
      <ol className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:pb-0">
        {caseSections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-[15px] tracking-[-0.01em] transition-colors max-lg:rounded-md max-lg:border lg:-ml-px lg:border-l-2 lg:py-1.5 lg:pl-4",
                  on ? "border-accent text-fg max-lg:bg-bg-1" : "text-fg-muted hover:text-fg max-lg:border-line lg:border-transparent"
                )}
              >
                <span className={cn("text-[13px] tabular-nums", on ? "text-accent" : "text-fg-dim")}>{s.n}</span>
                <span className="whitespace-nowrap">{s.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
