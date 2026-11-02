import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/experience";
import { ArrowUpRight } from "@/components/ui/Icons";

const highlighted = new Set(["Kong", "Broadcom Layer7", "Apigee", "Oracle FLEXCUBE", "Next.js", "TypeScript", "React", "Kubernetes"]);

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="exp-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Experience"
            id="exp-title"
            title="Experience"
            lede="3+ years of full-stack delivery and enterprise API integration in Mumbai — now freelancing."
          />
        </Reveal>

        <ol className="mt-12 md:mt-16">
          {experience.map((e, i) => (
            <Reveal
              key={`${e.company}-${e.start}`}
              as="li"
              delay={i * 60}
              className={`relative grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10 ${
                i === experience.length - 1 ? "border-b" : ""
              }`}
            >
              {/* Period column */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 font-mono text-sm tabular-nums text-fg-muted">
                  {e.current && (
                    <span className="relative flex h-1.5 w-1.5" aria-label="current role">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 node-pulse" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                    </span>
                  )}
                  {e.start} — {e.end}
                </div>
                <div className="mt-1 font-mono text-[11px] text-fg-dim">{e.location}</div>
              </div>

              {/* Role */}
              <div className="md:col-span-4">
                <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{e.role}</h3>
                <div className="mt-1 text-base text-fg-muted">{e.company}</div>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {e.technologies.map((t) => (
                    <li
                      key={t}
                      className={`rounded border px-2 py-0.5 font-mono text-[11px] ${
                        highlighted.has(t) ? "border-line-strong bg-bg-2 text-fg" : "border-line text-fg-muted"
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="md:col-span-5">
                {e.clients ? (
                  <ul className="flex flex-col gap-3">
                    {e.clients.map((c) => (
                      <li key={c.name} className="rounded-lg border border-line bg-bg-1 p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
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
                        <p className="mt-0.5 font-mono text-[11px] text-fg-dim">{c.sector}</p>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{c.summary}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2.5 text-pretty text-[15px] leading-relaxed text-fg-muted">
                    {e.summary.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line-strong" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
