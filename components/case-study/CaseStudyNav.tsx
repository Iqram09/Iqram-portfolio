"use client";

import { useEffect, useState } from "react";
import { caseSections } from "./sections";

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
    <nav aria-label="Case study sections" className="lg:sticky lg:top-24">
      <p className="label-mono mb-3 hidden lg:block">contents</p>
      <ol className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0 [scrollbar-width:none]">
        {caseSections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors lg:-ml-2.5 ${
                  on ? "bg-bg-2 text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                <span className={`font-mono text-[10px] tabular-nums ${on ? "text-accent" : "text-fg-dim"}`}>{s.n}</span>
                <span className="whitespace-nowrap">{s.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
