import { experience } from "@/data/experience";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { Dot, DotList } from "@/components/ui/Bits";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/* Newest to oldest, each card set a step lower than the last. */
const steps = ["", "lg:mt-20", "lg:mt-40"];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-bg py-24 md:py-36" aria-labelledby="exp-title">
      <div className="container-site">
        <SectionHead
          eyebrow="Experience"
          id="exp-title"
          title="Where I’ve built"
          lede="3+ years of full-stack delivery and enterprise API integration in Mumbai — now freelancing."
        />

        <ol className="mt-14 grid items-start gap-5 md:mt-20 lg:grid-cols-3">
          {experience.map((e, i) => {
            const on = Boolean(e.current);
            return (
              <Reveal
                as="li"
                key={`${e.company}-${e.start}`}
                delay={i * 110}
                y={48}
                className={cn("rounded-[18px] p-6 md:p-8", on ? "on-dark bg-accent text-white" : "bg-bg-1", steps[i])}
              >
                <div className="flex items-center justify-between gap-4 text-[16px] tracking-[-0.01em]">
                  <p className="tabular-nums">
                    {e.start} — {e.end}
                  </p>
                  {on ? (
                    <p className="inline-flex items-center gap-2">
                      <Dot pulse tone="soft" /> Current
                    </p>
                  ) : null}
                </div>

                <h3 className="display mt-7 text-[clamp(2.3rem,3.1vw,2.9rem)] leading-[0.98]">{e.role}</h3>
                <p className={cn("dots mt-3 text-[17px] tracking-[-0.015em]", on ? "text-white/80" : "text-fg-dim")}>
                  <span className={on ? "text-white" : "text-fg"}>{e.company}</span>
                  <span>{e.location}</span>
                </p>

                {e.clients ? (
                  <ul className="mt-8">
                    {e.clients.map((c) => (
                      <li key={c.name} className="border-t border-white/25 py-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <span className="text-[19px] font-medium tracking-[-0.02em]">{c.name}</span>
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[15px] text-white/85 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                          >
                            {c.domain} <ArrowUpRight size={13} />
                          </a>
                        </div>
                        <p className="mt-0.5 text-[15px] text-white/75">{c.sector}</p>
                        <p className="mt-3 text-pretty text-[16px] leading-[1.5] text-white/90">{c.summary}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-8">
                    {e.summary.map((s) => (
                      <li key={s} className="border-t border-line py-4 text-pretty text-[16px] leading-[1.5] text-fg-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}

                <DotList items={e.technologies} label="Technologies" tone={on ? "onAccent" : "dim"} className={cn("mt-4 border-t pt-5", on ? "border-white/25" : "border-line")} />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
