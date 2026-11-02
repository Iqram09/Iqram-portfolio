"use client";

import { useRef } from "react";
import { experience } from "@/data/experience";
import SceneHeader from "@/components/home/SceneHeader";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { useGsap } from "@/lib/useGsap";
import { cn } from "@/lib/cn";

/**
 * Scene 06. A spine draws itself down the timeline as it scrolls past
 * (Sky Digital Lab's GSAP pattern); each role's marker lights as the line
 * reaches it.
 */
export default function ExperienceTimeline() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap }, el) => {
    const line = el.querySelector("[data-spine]");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        }
      );
    }
    gsap.utils.toArray<HTMLElement>("[data-node]", el).forEach((node) => {
      gsap.fromTo(
        node,
        { backgroundColor: "rgba(53,48,58,1)", boxShadow: "0 0 0 0 rgba(196,154,118,0)" },
        {
          backgroundColor: "rgba(196,154,118,1)",
          boxShadow: "0 0 0 6px rgba(196,154,118,0.14)",
          duration: 0.6,
          scrollTrigger: { trigger: node, start: "top 62%", toggleActions: "play none none reverse" },
        }
      );
    });
  });

  return (
    <section ref={root} id="experience" className="relative bg-bg py-28 md:py-40" aria-labelledby="exp-title">
      <div className="container-site">
        <SceneHeader
          index="06"
          label="Experience"
          id="exp-title"
          title="Where I've built"
          lede="3+ years of full-stack delivery and enterprise API integration in Mumbai — now freelancing."
        />

        <ol data-timeline className="relative mt-16 md:mt-24">
          <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line md:left-[calc(25%+5px)]" />
          <span aria-hidden data-spine className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-warm-soft via-warm to-accent/60 md:left-[calc(25%+5px)]" />

          {experience.map((e, i) => (
            <li key={`${e.company}-${e.start}`} className={cn("relative grid gap-6 pb-20 pl-10 md:grid-cols-4 md:gap-10 md:pl-0", i === experience.length - 1 && "pb-2")}>
              <span
                aria-hidden
                data-node
                className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-warm-soft md:left-[25%]"
              />

              {/* Period */}
              <Reveal className="md:pr-10 md:text-right">
                <p className="font-mono text-sm tabular-nums text-fg">
                  {e.start} — {e.end}
                </p>
                <p className="hud mt-2">{e.location}</p>
                {e.current && (
                  <p className="hud mt-3 inline-flex items-center gap-2 text-ok">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden /> Current
                  </p>
                )}
              </Reveal>

              {/* Role */}
              <div className="md:col-span-3 md:pl-12">
                <Reveal>
                  <h3 className="display text-[clamp(1.9rem,3.2vw,3rem)] text-fg">{e.role}</h3>
                  <p className="mt-2 text-lg text-fg-muted">{e.company}</p>
                </Reveal>

                <Reveal delay={100} className="mt-8 grid gap-10 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    {e.clients ? (
                      <ul className="flex flex-col divide-y divide-line border-y border-line">
                        {e.clients.map((c) => (
                          <li key={c.name} className="py-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <span className="font-medium text-fg">{c.name}</span>
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-muted transition-colors hover:text-fg"
                              >
                                {c.domain} <ArrowUpRight size={11} />
                              </a>
                            </div>
                            <p className="hud mt-1">{c.sector}</p>
                            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fg-muted">{c.summary}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="flex flex-col gap-4 text-pretty text-[15px] leading-relaxed text-fg-muted">
                        {e.summary.map((s) => (
                          <li key={s} className="flex gap-4">
                            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-warm" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ul className="flex flex-wrap content-start gap-x-4 gap-y-2 lg:col-span-2" aria-label="Technologies">
                    {e.technologies.map((t) => (
                      <li key={t} className="hud text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
