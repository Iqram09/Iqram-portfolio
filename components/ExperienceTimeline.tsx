import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

const highlighted = new Set(["Kong", "CA Layer7", "Apigee", "React", "TypeScript", "MongoDB", "REST APIs", "CI/CD"]);

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="exp-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow="Experience"
            id="exp-title"
            title="Experience"
            lede="Enterprise API gateway work and full-stack delivery, in Mumbai."
          />
        </Reveal>

        <ol className="mt-12 md:mt-16">
          {experience.map((e, i) => (
            <Reveal
              key={`${e.company}-${e.start}`}
              as="li"
              delay={i * 60}
              className={`relative grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 ${
                e.minor ? "md:py-6" : "md:py-10"
              } ${i === experience.length - 1 ? "border-b" : ""}`}
            >
              {/* Period column */}
              <div className="md:col-span-3">
                <div className={`font-mono tabular-nums text-fg-muted ${e.minor ? "text-xs" : "text-sm"}`}>
                  {e.start} — {e.end}
                </div>
                <div className="mt-1 font-mono text-[11px] text-fg-dim">{e.location}</div>
              </div>

              {/* Role */}
              <div className="md:col-span-4">
                <h3 className={`font-semibold tracking-tight text-fg ${e.minor ? "text-base" : "text-xl md:text-2xl"}`}>
                  {e.role}
                </h3>
                <div className={`mt-1 text-fg-muted ${e.minor ? "text-sm" : "text-base"}`}>{e.company}</div>
                {!e.minor && (
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
                )}
              </div>

              {/* Summary */}
              <div className="md:col-span-5">
                <ul className={`flex flex-col gap-2.5 text-pretty leading-relaxed text-fg-muted ${e.minor ? "text-sm" : "text-[15px]"}`}>
                  {e.summary.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line-strong" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
